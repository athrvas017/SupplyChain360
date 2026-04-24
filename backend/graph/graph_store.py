"""
In-memory graph store using NetworkX with JSON persistence.
Interface designed for easy Neo4j swap later.
"""
import json
import os
import networkx as nx
from models import CompanyNode, TradeEdge, SupplyChainGraph
from engine.entity_resolver import generate_id


class GraphStore:
    """
    NetworkX-backed graph store.
    Nodes = companies, Edges = trade relationships.
    """

    def __init__(self, persist_path: str = None):
        self.G = nx.DiGraph()
        self.persist_path = persist_path
        self._company_cache: dict[str, CompanyNode] = {}

    def add_company(self, node: CompanyNode):
        """Add or update a company node."""
        self.G.add_node(node.id, **node.model_dump())
        self._company_cache[node.id] = node
        # Also index by canonical name
        self._company_cache[node.canonical_name] = node

    def add_edge(self, edge: TradeEdge):
        """Add a trade relationship edge."""
        # Check for duplicate edges
        if self.G.has_edge(edge.source, edge.target):
            existing = self.G[edge.source][edge.target]
            # Merge: keep the one with higher relevance
            if edge.bom_relevance > existing.get("bom_relevance", 0):
                self.G[edge.source][edge.target].update(edge.model_dump())
        else:
            self.G.add_edge(edge.source, edge.target, **edge.model_dump())

    def get_company(self, name_or_id: str) -> dict | None:
        """Get company node data by name or ID."""
        node_id = generate_id(name_or_id) if " " in name_or_id else name_or_id
        if node_id in self.G.nodes:
            return dict(self.G.nodes[node_id])
        return None

    def get_suppliers(self, company_name: str) -> list[dict]:
        """Get all suppliers (predecessors) for a company."""
        node_id = generate_id(company_name)
        if node_id not in self.G.nodes:
            return []
        suppliers = []
        for pred in self.G.predecessors(node_id):
            node_data = dict(self.G.nodes[pred])
            edge_data = dict(self.G[pred][node_id])
            suppliers.append({**node_data, "edge": edge_data})
        return suppliers

    def get_customers(self, company_name: str) -> list[dict]:
        """Get all customers (successors) for a company."""
        node_id = generate_id(company_name)
        if node_id not in self.G.nodes:
            return []
        customers = []
        for succ in self.G.successors(node_id):
            node_data = dict(self.G.nodes[succ])
            edge_data = dict(self.G[node_id][succ])
            customers.append({**node_data, "edge": edge_data})
        return customers

    def get_full_subgraph(self, company_name: str, max_depth: int = 4) -> SupplyChainGraph:
        """Get the complete N-tier supply chain for a company."""
        node_id = generate_id(company_name)
        nodes = []
        edges = []
        visited = set()

        def _traverse(current_id: str, depth: int):
            if current_id in visited or depth > max_depth:
                return
            visited.add(current_id)

            if current_id in self.G.nodes:
                node_data = dict(self.G.nodes[current_id])
                nodes.append(CompanyNode(**node_data))

            for pred in self.G.predecessors(current_id):
                edge_data = dict(self.G[pred][current_id])
                edges.append(TradeEdge(**edge_data))
                _traverse(pred, depth + 1)

        _traverse(node_id, 0)

        return SupplyChainGraph(
            nodes=nodes,
            edges=edges,
            tiers_built=max_depth
        )

    def export_for_frontend(self) -> dict:
        """Serialize the entire graph for D3.js rendering."""
        nodes = []
        for node_id in self.G.nodes:
            node_data = dict(self.G.nodes[node_id])
            nodes.append(node_data)

        edges = []
        for source, target in self.G.edges:
            edge_data = dict(self.G[source][target])
            edges.append(edge_data)

        return {"nodes": nodes, "edges": edges}

    def get_countries_distribution(self) -> dict[str, int]:
        """Get supplier count per country."""
        distribution: dict[str, int] = {}
        for node_id in self.G.nodes:
            country = self.G.nodes[node_id].get("country", "Unknown")
            distribution[country] = distribution.get(country, 0) + 1
        return distribution

    def node_count(self) -> int:
        return self.G.number_of_nodes()

    def edge_count(self) -> int:
        return self.G.number_of_edges()

    def clear(self):
        """Clear the entire graph."""
        self.G.clear()
        self._company_cache.clear()

    def save(self):
        """Persist graph to JSON file."""
        if not self.persist_path:
            return
        data = {
            "nodes": {n: dict(self.G.nodes[n]) for n in self.G.nodes},
            "edges": [(u, v, dict(self.G[u][v])) for u, v in self.G.edges]
        }
        os.makedirs(os.path.dirname(self.persist_path), exist_ok=True)
        with open(self.persist_path, "w") as f:
            json.dump(data, f, indent=2, default=str)

    def load(self):
        """Load graph from JSON file."""
        if not self.persist_path or not os.path.exists(self.persist_path):
            return
        with open(self.persist_path, "r") as f:
            data = json.load(f)
        for node_id, node_data in data.get("nodes", {}).items():
            self.G.add_node(node_id, **node_data)
        for u, v, edge_data in data.get("edges", []):
            self.G.add_edge(u, v, **edge_data)
