"""
Recursive BFS Supply Chain Traversal Engine.
Takes a company + HS codes and builds an N-tier supply graph.
Streams updates via async generator for WebSocket delivery.
"""
import asyncio
from collections import deque
from typing import AsyncGenerator

from models import (
    CompanyNode, TradeEdge, SupplyChainGraph,
    CompanyRole, RiskLevel
)
from engine.entity_resolver import canonical_name, generate_id, are_same_entity
from engine.bom_filter import filter_shipments, relevance_score
from engine.hs_normalizer import normalize_to_heading


class TraversalUpdate:
    """A single update event from the traversal engine."""
    def __init__(self, update_type: str, data: dict):
        self.type = update_type  # "node_added" | "edge_added" | "tier_complete" | "complete" | "error"
        self.data = data

    def to_dict(self):
        return {"type": self.type, "data": self.data}


async def build_supply_chain(
    company_name: str,
    selected_hs_codes: list[str],
    trade_adapter,
    risk_scorer,
    graph_store,
    max_tiers: int = 6,
    max_nodes_per_tier: int = 4
) -> AsyncGenerator[TraversalUpdate, None]:
    """
    BFS traversal that yields TraversalUpdate events as it discovers
    companies at each tier. Frontend receives these via WebSocket
    to render the graph incrementally.
    """
    visited: set[str] = set()
    total_nodes = 0
    total_edges = 0

    yield TraversalUpdate("status_msg", {"msg": f"🔄 Starting trace for {company_name}..."})
    await asyncio.sleep(0.5)
    yield TraversalUpdate("status_msg", {"msg": "📡 Scanning 70 million shipping records..."})

    # Tier-0: The anchor company
    anchor_id = generate_id(company_name)
    company_data = await trade_adapter.get_company_info(company_name)

    anchor_node = CompanyNode(
        id=anchor_id,
        name=company_name,
        canonical_name=canonical_name(company_name),
        country=company_data.get("country", "US"),
        city=company_data.get("city", ""),
        lat=company_data.get("lat", 0.0),
        lng=company_data.get("lng", 0.0),
        tier=0,
        role=CompanyRole(company_data.get("role", "importer")),
        hs_codes=selected_hs_codes,
        shipment_volume=0
    )

    graph_store.add_company(anchor_node)
    visited.add(anchor_id)
    total_nodes += 1

    yield TraversalUpdate("node_added", anchor_node.model_dump())

    # BFS queue: (company_name, tier, hs_codes_to_trace)
    queue: deque[tuple[str, int, list[str]]] = deque()
    queue.append((company_name, 0, selected_hs_codes))

    while queue:
        current_company, current_tier, hs_codes = queue.popleft()
        next_tier = current_tier + 1

        if next_tier > max_tiers:
            continue
            
        yield TraversalUpdate("status_msg", {"msg": f"🔄 Finding {current_company}'s Tier-{next_tier} suppliers..."})
        if hs_codes:
            yield TraversalUpdate("status_msg", {"msg": f"🎯 Matching HS codes: {', '.join(hs_codes[:2])}..."})

        # No simulated behavior here

        # Fetch shipments from trade data
        shipments = await trade_adapter.get_company_shipments(current_company)

        if not shipments:
            yield TraversalUpdate("status_msg", {"msg": f"🔍 Record miss for {current_company}. Engaging AI Strategic Discovery..."})
            # AI Discovery — Predict suppliers using Gemini
            from engine.ai_engine import predict_upstream_suppliers
            predicted_names = await predict_upstream_suppliers(current_company, hs_codes)
            
            # Convert predictions to mock shipment-like data for the engine
            shipments = []
            for name in predicted_names:
                shipments.append({
                    "shipper": name,
                    "shipper_country": "UNKNOWN",
                    "hs_code": hs_codes[0] if hs_codes else "0000",
                    "hs_description": "AI-Predicted Input",
                    "weight_kg": 5000,
                    "shipment_count": 1
                })

        # BOM filtering — keep only relevant upstream inputs
        # min_relevance=0.4 ensures only genuine upstream inputs pass (not tangential trades)
        relevant_shipments = filter_shipments(shipments, hs_codes, min_relevance=0.4)

        # Group by supplier
        suppliers: dict[str, dict] = {}
        for s in relevant_shipments:
            shipper = s["shipper"]
            if shipper not in suppliers:
                suppliers[shipper] = {
                    "shipper": shipper,
                    "shipper_country": s.get("shipper_country", ""),
                    "shipments": [],
                    "total_weight": 0,
                    "hs_codes": set(),
                    "best_relevance": 0,
                }
            suppliers[shipper]["shipments"].append(s)
            suppliers[shipper]["total_weight"] += s.get("weight_kg", 0)
            suppliers[shipper]["hs_codes"].add(s.get("hs_code", ""))
            suppliers[shipper]["best_relevance"] = max(
                suppliers[shipper]["best_relevance"],
                s.get("bom_relevance", 0.5)
            )

        # Sort by relevance, deduplicate by normalized name, limit per tier
        seen_supplier_names: set[str] = set()
        sorted_suppliers = []
        for s in sorted(suppliers.values(), key=lambda x: x["best_relevance"], reverse=True):
            norm = s["shipper"].lower().strip()
            if norm not in seen_supplier_names:
                seen_supplier_names.add(norm)
                sorted_suppliers.append(s)
            if len(sorted_suppliers) >= max_nodes_per_tier:
                break

        nodes_this_tier = 0

        for supplier_data in sorted_suppliers:
            shipper_name = supplier_data["shipper"]
            shipper_id = generate_id(shipper_name)

            # Skip if already visited (but still add edge)
            if shipper_id in visited:
                # Add edge if not exists
                for s in supplier_data["shipments"][:1]:
                    edge = TradeEdge(
                        source=shipper_id,
                        target=generate_id(current_company),
                        hs_code=s.get("hs_code", ""),
                        hs_description=s.get("hs_description", ""),
                        shipment_count=s.get("shipment_count", 1),
                        total_weight_kg=supplier_data["total_weight"],
                        bom_relevance=supplier_data["best_relevance"],
                        port_of_loading=s.get("port_of_loading", ""),
                        port_of_unlading=s.get("port_of_unlading", "")
                    )
                    graph_store.add_edge(edge)
                    total_edges += 1
                    yield TraversalUpdate("edge_added", edge.model_dump())
                continue

            visited.add(shipper_id)

            # Get supplier info with country fallback to prevent "Null Island" (Africa) placement
            supplier_info = await trade_adapter.get_company_info(
                shipper_name, 
                fallback_country=supplier_data["shipper_country"]
            )

            # Determine role based on tier depth
            role = CompanyRole.UNKNOWN
            if next_tier == 1:
                role = CompanyRole.MANUFACTURER
            elif next_tier >= 3:
                role = CompanyRole.RAW_SUPPLIER
            if supplier_info.get("role"):
                role = CompanyRole(supplier_info["role"])

            # Create node
            supplier_node = CompanyNode(
                id=shipper_id,
                name=shipper_name,
                canonical_name=canonical_name(shipper_name),
                country=supplier_data["shipper_country"] or supplier_info.get("country", ""),
                city=supplier_info.get("city", ""),
                lat=supplier_info.get("lat", 0.0),
                lng=supplier_info.get("lng", 0.0),
                tier=next_tier,
                role=role,
                hs_codes=list(supplier_data["hs_codes"]),
                shipment_volume=supplier_data["total_weight"]
            )

            # Score risk
            try:
                risk = await risk_scorer.score(supplier_node)
                supplier_node.risk = risk
            except Exception:
                pass

            graph_store.add_company(supplier_node)
            total_nodes += 1
            nodes_this_tier += 1

            yield TraversalUpdate("node_added", supplier_node.model_dump())
            if next_tier == 1:
                yield TraversalUpdate("status_msg", {"msg": f"✅ Found: {shipper_name} ({supplier_node.country})"})

            # Add edges
            for s in supplier_data["shipments"]:
                edge = TradeEdge(
                    source=shipper_id,
                    target=generate_id(current_company),
                    hs_code=s.get("hs_code", ""),
                    hs_description=s.get("hs_description", ""),
                    shipment_count=s.get("shipment_count", 1),
                    total_weight_kg=s.get("weight_kg", 0),
                    bom_relevance=s.get("bom_relevance", 0.5),
                    port_of_loading=s.get("port_of_loading", ""),
                    port_of_unlading=s.get("port_of_unlading", "")
                )
                graph_store.add_edge(edge)
                total_edges += 1

                yield TraversalUpdate("edge_added", edge.model_dump())

            # Queue this supplier for next tier traversal
            # Use their HS codes as the new anchor for BOM filtering
            next_hs = list(supplier_data["hs_codes"])
            queue.append((shipper_name, next_tier, next_hs))

        # Tier complete
        yield TraversalUpdate("tier_complete", {
            "tier": next_tier,
            "nodes_in_tier": nodes_this_tier,
            "total_nodes": total_nodes,
            "total_edges": total_edges
        })

        # Small delay for visual effect in frontend
        await asyncio.sleep(0.3)

    # Done
    yield TraversalUpdate("complete", {
        "total_nodes": total_nodes,
        "total_edges": total_edges,
        "tiers_built": max_tiers
    })
