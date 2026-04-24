from neo4j import GraphDatabase
import config
from config import NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, NEO4J_DATABASE
from models import CompanyNode, TradeEdge, SupplyChainGraph
import logging

logger = logging.getLogger(__name__)

class Neo4jStore:
    def __init__(self):
        logger.info(f"Connecting to Neo4j at {NEO4J_URI}...")
        try:
            self.driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))
            self.driver.verify_connectivity()
            # We use the config-provided database or None to use default
            self.database = NEO4J_DATABASE if hasattr(config, 'NEO4J_DATABASE') and NEO4J_DATABASE else None
            self.initialize_schema()
            logger.info("✅ Neo4j Connection & Schema check complete.")
        except Exception as e:
            logger.error(f"❌ Failed to connect to Neo4j: {e}")
            raise e

    def initialize_schema(self):
        """Create constraints for performance and data integrity."""
        with self.driver.session(database=self.database) as session:
            try:
                # Standard Cypher for Neo4j 4.4+ and Aura
                session.run("CREATE CONSTRAINT company_id IF NOT EXISTS FOR (c:Company) REQUIRE c.id IS UNIQUE")
            except Exception as e:
                logger.warning(f"Constraint creation skipped. This is usually fine if it already exists or on some Aura tiers: {e}")

    def close(self):
        self.driver.close()

    def add_company(self, node: CompanyNode):
        """Add or update a company node in Neo4j."""
        with self.driver.session(database=self.database) as session:
            session.execute_write(self._create_node_tx, node)

    @staticmethod
    def _create_node_tx(tx, node: CompanyNode):
        # Neo4j doesn't handle nested dicts well, so we flatten/serialize
        props = node.model_dump(mode='json')
        if props.get('risk'):
            import json
            props['risk'] = json.dumps(props['risk'])
        if props.get('hs_codes'):
            import json
            props['hs_codes'] = json.dumps(props['hs_codes'])
            
        query = (
            "MERGE (c:Company {id: $id}) "
            "SET c += $props"
        )
        tx.run(query, id=node.id, props=props)

    def add_edge(self, edge: TradeEdge):
        """Add a trade relationship edge in Neo4j."""
        with self.driver.session(database=self.database) as session:
            session.execute_write(self._create_edge_tx, edge)

    @staticmethod
    def _create_edge_tx(tx, edge: TradeEdge):
        # We can also capture the tier belonging to the source supplier
        # However, $props already receives edge.model_dump()
        query = (
            "MATCH (a:Company {id: $source}), (b:Company {id: $target}) "
            "MERGE (a)-[r:SUPPLIES_TO {hs_code: $hs_code}]->(b) "
            "SET r += $props "
            "SET r.tier = a.tier"
        )
        tx.run(query, source=edge.source, target=edge.target, hs_code=edge.hs_code, props=edge.model_dump(mode='json'))

    def get_full_subgraph(self, company_id: str, max_depth: int = 4) -> SupplyChainGraph:
        """Fetch the supply chain graph centered at company_id from Neo4j."""
        with self.driver.session(database=self.database) as session:
            result = session.execute_read(self._get_subgraph_tx, company_id, max_depth)
            return result

    @staticmethod
    def _get_subgraph_tx(tx, company_id: str, max_depth: int):
        query = (
            "MATCH (start:Company {id: $company_id}) "
            "MATCH path = (start)<-[:SUPPLIES_TO*0..%d]-(supplier:Company) "
            "WITH nodes(path) as nodes, relationships(path) as rels "
            "UNWIND nodes as n "
            "WITH DISTINCT n, rels "
            "UNWIND rels as r "
            "RETURN COLLECT(DISTINCT n) as nodes, COLLECT(DISTINCT r) as rels"
        ) % max_depth
        result = tx.run(query, company_id=company_id)
        record = result.single()
        
        nodes = []
        if record and record["nodes"]:
            import json
            for n in record["nodes"]:
                d = dict(n)
                if isinstance(d.get('risk'), str):
                    d['risk'] = json.loads(d['risk'])
                if isinstance(d.get('hs_codes'), str):
                    d['hs_codes'] = json.loads(d['hs_codes'])
                nodes.append(CompanyNode(**d))
        # Neo4j rels need extraction
        edges = []
        for r in record["rels"]:
            props = dict(r)
            edges.append(TradeEdge(**props))
            
        return SupplyChainGraph(
            nodes=nodes,
            edges=edges,
            tiers_built=max_depth
        )

    def get_countries_distribution(self) -> dict[str, int]:
        """Get supplier count per country from Neo4j."""
        with self.driver.session(database=self.database) as session:
            result = session.run("MATCH (n:Company) RETURN n.country as country, count(n) as count")
            return {r["country"]: r["count"] for r in result}

    def export_for_frontend(self) -> dict:
        """Fetch all nodes and edges for the frontend."""
        with self.driver.session(database=self.database) as session:
            import json

            nodes = []
            nodes_res = session.run("MATCH (n:Company) RETURN n")
            for record in nodes_res:
                d = dict(record["n"])
                if isinstance(d.get('risk'), str):
                    try: d['risk'] = json.loads(d['risk'])
                    except Exception: d['risk'] = None
                if isinstance(d.get('hs_codes'), str):
                    try: d['hs_codes'] = json.loads(d['hs_codes'])
                    except Exception: d['hs_codes'] = []
                nodes.append(d)

            edges = []
            # Explicitly return start/end node IDs so frontend has source/target
            edges_res = session.run(
                "MATCH (a:Company)-[r:SUPPLIES_TO]->(b:Company) "
                "RETURN a.id AS source, b.id AS target, "
                "r.hs_code AS hs_code, r.hs_description AS hs_description, "
                "r.shipment_count AS shipment_count, "
                "r.total_weight_kg AS total_weight_kg, "
                "r.bom_relevance AS bom_relevance"
            )
            for record in edges_res:
                edges.append({
                    "source": record["source"],
                    "target": record["target"],
                    "hs_code": record["hs_code"] or "",
                    "hs_description": record["hs_description"] or "",
                    "shipment_count": record["shipment_count"] or 0,
                    "total_weight_kg": record["total_weight_kg"] or 0.0,
                    "bom_relevance": record["bom_relevance"] or 0.5,
                })

            return {"nodes": nodes, "edges": edges}

    def get_suppliers(self, company_id: str) -> list[dict]:
        with self.driver.session(database=self.database) as session:
            query = "MATCH (s:Company)-[r:SUPPLIES_TO]->(c:Company {id: $id}) RETURN s, r"
            result = session.run(query, id=company_id)
            return [{**dict(r["s"]), "edge": dict(r["r"])} for r in result]

    def get_customers(self, company_id: str) -> list[dict]:
        with self.driver.session(database=self.database) as session:
            query = "MATCH (c:Company {id: $id})-[r:SUPPLIES_TO]->(s:Company) RETURN s, r"
            result = session.run(query, id=company_id)
            return [{**dict(r["s"]), "edge": dict(r["r"])} for r in result]

    def clear(self):
        """Clear the entire database (Development only)."""
        with self.driver.session(database=self.database) as session:
            session.execute_write(lambda tx: tx.run("MATCH (n) DETACH DELETE n"))

    def node_count(self) -> int:
        with self.driver.session(database=self.database) as session:
            result = session.run("MATCH (n) RETURN count(n) as count")
            return result.single()["count"]

    def edge_count(self) -> int:
        with self.driver.session(database=self.database) as session:
            result = session.run("MATCH ()-[r]->() RETURN count(r) as count")
            return result.single()["count"]
