import asyncio
import os
import sys

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from graph.neo4j_store import Neo4jStore
from models import CompanyNode, CompanyRole, TradeEdge

def test_neo4j():
    try:
        print("Connecting to Neo4j...")
        store = Neo4jStore()
        print("Driver connected:", store.driver)
        
        node = CompanyNode(
            id="test_node_1",
            name="Test Company",
            canonical_name="test_company",
            country="US",
            city="New York",
            role=CompanyRole.MANUFACTURER,
            hs_codes=["8542"]
        )
        print("Attempting to add node...")
        store.add_company(node)
        print("Node added successfully.")
        
        node2 = CompanyNode(
            id="test_node_2",
            name="Test Supplier",
            canonical_name="test_supplier",
            country="JP",
            role=CompanyRole.RAW_SUPPLIER,
            hs_codes=["8542"]
        )
        store.add_company(node2)
        print("Node 2 added successfully.")
        
        edge = TradeEdge(
            source="test_node_2",
            target="test_node_1",
            hs_code="8542",
            hs_description="Test HS",
            shipment_count=5,
            total_weight_kg=100
        )
        print("Attempting to add edge...")
        store.add_edge(edge)
        print("Edge added successfully.")
        
        count = store.node_count()
        print(f"Total nodes in DB: {count}")
        
    except Exception as e:
        print(f"Test Failed: {e}")

if __name__ == "__main__":
    test_neo4j()
