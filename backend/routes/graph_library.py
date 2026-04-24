"""
Graph Library API — returns all cached supply chain graphs as structured summaries.
Each summary includes: company, node count, tier count, top-3 suppliers,
hub locations, HS codes, and concentration risk.
"""
import json
import os
from datetime import datetime
from fastapi import APIRouter

router = APIRouter(prefix="/api/graph-library", tags=["Graph Library"])

LIBRARY_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "graph_library.json")
GRAPH_PERSIST_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "graph_cache.json")


def _load_library() -> dict:
    if os.path.exists(LIBRARY_PATH):
        with open(LIBRARY_PATH, "r") as f:
            return json.load(f)
    return {"entries": {}}


def _save_library(lib: dict):
    os.makedirs(os.path.dirname(LIBRARY_PATH), exist_ok=True)
    with open(LIBRARY_PATH, "w") as f:
        json.dump(lib, f, indent=2)


def _node_is_real(node: dict) -> bool:
    """Filter out heuristic/AI-generated unknown nodes."""
    country = (node.get("country") or "").upper()
    name = node.get("name") or ""
    if country in ("UNKNOWN", "", "XX"):
        return False
    if name.startswith(("FEN-", "SHE-", "JIA-", "AI-")):
        return False
    return True


def build_summary(company_name: str, nodes: list, edges: list) -> dict:
    """
    Derive a rich summary from raw graph nodes/edges.
    Filters out 'UNKNOWN' nodes before computing any stats.
    """
    real_nodes = [n for n in nodes if _node_is_real(n)]

    # Tier distribution
    tier_map: dict[int, list] = {}
    for n in real_nodes:
        t = n.get("tier", 0)
        tier_map.setdefault(t, []).append(n)

    total_tiers = max(tier_map.keys(), default=0)

    # Top-3 Tier-1 suppliers by shipment volume (no unknown)
    tier1_nodes = [n for n in tier_map.get(1, []) if _node_is_real(n)]
    top_suppliers = sorted(tier1_nodes, key=lambda n: n.get("shipment_volume") or 0, reverse=True)[:3]

    # Hub locations — nodes with city data and highest connectivity
    location_candidates = [n for n in real_nodes if n.get("city") and n.get("lat") and n.get("lng")]
    # Count inbound edges per node
    in_degree: dict[str, int] = {}
    for e in edges:
        tgt = e.get("target", "")
        in_degree[tgt] = in_degree.get(tgt, 0) + 1

    hub_nodes = sorted(location_candidates, key=lambda n: in_degree.get(n["id"], 0), reverse=True)[:5]
    hubs = [
        {
            "name": h["name"],
            "city": h.get("city", ""),
            "country": h.get("country", ""),
            "lat": h.get("lat"),
            "lng": h.get("lng"),
            "tier": h.get("tier"),
            "role": h.get("role", ""),
            "inbound_edges": in_degree.get(h["id"], 0),
        }
        for h in hub_nodes
    ]

    # Country distribution
    country_count: dict[str, int] = {}
    for n in real_nodes:
        c = n.get("country") or "??"
        country_count[c] = country_count.get(c, 0) + 1

    # HS Codes
    all_hs = list({hs for n in real_nodes for hs in (n.get("hs_codes") or [])})

    # Anchor node (tier 0)
    anchor = next((n for n in real_nodes if n.get("tier") == 0), None)

    # Risk distribution
    risk_dist = {"low": 0, "medium": 0, "high": 0, "critical": 0}
    for n in real_nodes:
        lvl = (n.get("risk") or {}).get("overall_level", "low")
        if lvl in risk_dist:
            risk_dist[lvl] += 1

    # Total trade volume
    total_volume = sum(n.get("shipment_volume") or 0 for n in real_nodes)

    return {
        "company": company_name,
        "canonical": anchor["canonical_name"] if anchor else company_name,
        "country": anchor.get("country", "US") if anchor else "US",
        "total_nodes": len(real_nodes),
        "total_tiers": total_tiers,
        "total_edges": len(edges),
        "total_volume_kg": int(total_volume),
        "hs_codes": all_hs[:8],
        "countries_exposed": list(country_count.keys()),
        "country_distribution": country_count,
        "top_suppliers": [
            {
                "name": s["name"],
                "country": s.get("country", ""),
                "city": s.get("city", ""),
                "hs_codes": s.get("hs_codes", []),
                "shipment_volume": int(s.get("shipment_volume") or 0),
                "tier": s.get("tier", 1),
            }
            for s in top_suppliers
        ],
        "hub_locations": hubs,
        "risk_distribution": risk_dist,
        "high_risk_count": risk_dist["high"] + risk_dist["critical"],
        "cached_at": datetime.utcnow().isoformat() + "Z",
    }


@router.get("/list")
async def list_graphs():
    """Return all cached graph summaries."""
    lib = _load_library()
    return {"entries": list(lib.get("entries", {}).values())}


@router.post("/cache")
async def cache_graph(payload: dict):
    """
    Called by the WebSocket handler after a build completes.
    Stores a rich summary of the graph in the library.
    """
    company = payload.get("company_name", "Unknown")
    nodes = payload.get("nodes", [])
    edges = payload.get("edges", [])

    summary = build_summary(company, nodes, edges)

    lib = _load_library()
    lib.setdefault("entries", {})[company.upper()] = summary
    _save_library(lib)

    return {"status": "cached", "company": company, "node_count": summary["total_nodes"]}


@router.get("/summary/{company_name}")
async def get_graph_summary(company_name: str):
    """Get the cached summary for a specific company."""
    lib = _load_library()
    key = company_name.upper()
    entry = lib.get("entries", {}).get(key)
    if not entry:
        return {"error": "No cached graph found for this company"}
    return entry


@router.delete("/clear")
async def clear_library():
    """Clear all cached graphs."""
    _save_library({"entries": {}})
    return {"status": "cleared"}
