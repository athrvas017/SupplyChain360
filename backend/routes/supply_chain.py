"""
Supply chain traversal API routes + WebSocket endpoint.
"""
import uuid
import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from models import BuildRequest, SimulateRequest, SimulationResult, AlternativeSupplier
from engine.traversal import build_supply_chain
from adapters.trade_adapter import CustomsLedgerAdapter
from graph.graph_store import GraphStore
from graph.neo4j_store import Neo4jStore
from config import NEO4J_PASSWORD

router = APIRouter(prefix="/api/supply-chain", tags=["Supply Chain"])

# In-memory job store (in production: Redis)
_jobs: dict[str, dict] = {}
_graph_stores: dict[str, any] = {}
_adapter = CustomsLedgerAdapter()

def get_graph_store():
    if NEO4J_PASSWORD:
        try:
            return Neo4jStore()
        except Exception:
            pass
    return GraphStore()


def _compute_concentration_risk(countries: dict) -> list:
    """HHI-based supplier concentration risk per country."""
    total = sum(countries.values())
    if total == 0:
        return []
    shares = {c: count / total for c, count in countries.items()}
    hhi = sum(s * s for s in shares.values())
    results = []
    for country, count in sorted(countries.items(), key=lambda x: x[1], reverse=True):
        share = shares[country]
        results.append({
            "country": country,
            "supplier_count": count,
            "percentage": round(share * 100, 1),
            "hhi_score": round(hhi, 4),
            "is_critical": share > 0.5,
        })
    return results


# Null risk scorer stub — traversal still works, risk is handled by /api/v1/risk/* now
class _NullRiskScorer:
    async def score(self, company):
        from models import RiskProfile, RiskLevel
        return RiskProfile(
            overall_level=RiskLevel.LOW,
            is_sanctioned=False,
            sanctions_programs=[],
            forced_labor_risk=RiskLevel.LOW,
            country_political_stability=0.0,
            active_disruptions=[],
            risk_factors=[],
        )

_null_risk_scorer = _NullRiskScorer()


@router.post("/build")
async def start_build(request: BuildRequest):
    """
    Initiate a supply chain traversal.
    Returns a job_id — use the WebSocket endpoint to get live updates.
    """
    job_id = str(uuid.uuid4())[:8]

    _jobs[job_id] = {
        "status": "pending",
        "company": request.company_name,
        "hs_codes": request.selected_hs_codes,
        "max_tiers": request.max_tiers,
        "max_nodes_per_tier": request.max_nodes_per_tier,
        "nodes_found": 0,
        "edges_found": 0,
        "tiers_completed": 0,
        "updates": [],
    }

    store = get_graph_store()
    # Wire JSON persistence path to GraphStore so data survives backend reloads
    if isinstance(store, GraphStore):
        from config import GRAPH_PERSIST_PATH
        store.persist_path = GRAPH_PERSIST_PATH

    _graph_stores[job_id] = store

    return {"job_id": job_id, "status": "pending"}


@router.get("/{job_id}/status")
async def get_job_status(job_id: str):
    """Poll the status of a traversal job."""
    if job_id not in _jobs:
        return {"error": "Job not found"}
    job = _jobs[job_id]
    graph_store = _graph_stores.get(job_id)
    graph_data = graph_store.export_for_frontend() if graph_store else {"nodes": [], "edges": []}
    return {
        "job_id": job_id,
        "status": job["status"],
        "nodes_found": job["nodes_found"],
        "edges_found": job["edges_found"],
        "tiers_completed": job["tiers_completed"],
        "graph": graph_data
    }


@router.get("/{job_id}/graph")
async def get_graph(job_id: str):
    """Get the complete graph for a completed job."""
    if job_id not in _graph_stores:
        return {"error": "Job not found"}
    graph_store = _graph_stores[job_id]
    graph_data = graph_store.export_for_frontend()
    countries = graph_store.get_countries_distribution()
    concentration = _compute_concentration_risk(countries)

    return {
        "graph": graph_data,
        "stats": {
            "total_nodes": graph_store.node_count(),
            "total_edges": graph_store.edge_count(),
        },
        "concentration_risk": concentration
    }



@router.post("/simulate", response_model=SimulationResult)
async def simulate_disruption(request: SimulateRequest):
    """
    Blast-radius simulation: given a disrupted node, trace forward BFS
    through the most recently built graph and compute financial impact.
    """
    import logging
    logger = logging.getLogger(__name__)

    # --- Grab the most recent graph store (last completed or running job) ---
    store = None
    for jid in reversed(list(_graph_stores.keys())):
        if _jobs.get(jid, {}).get("status") in ("complete", "running"):
            store = _graph_stores[jid]
            break

    # Fallback 1: any job store regardless of status
    if store is None and _graph_stores:
        store = list(_graph_stores.values())[-1]

    graph_data = store.export_for_frontend() if store else {"nodes": [], "edges": []}
    all_nodes = {n["id"]: n for n in graph_data.get("nodes", [])}
    all_edges = graph_data.get("edges", [])

    logger.info(f"[simulate] in-memory store: {len(all_nodes)} nodes, {len(all_edges)} edges")

    # Fallback 2: If in-memory is empty, load from persisted JSON file (survives reloads)
    if not all_nodes:
        from config import GRAPH_PERSIST_PATH
        fallback = GraphStore(persist_path=GRAPH_PERSIST_PATH)
        fallback.load()
        fallback_data = fallback.export_for_frontend()
        all_nodes = {n["id"]: n for n in fallback_data.get("nodes", [])}
        all_edges = fallback_data.get("edges", [])
        logger.info(f"[simulate] JSON fallback: {len(all_nodes)} nodes, {len(all_edges)} edges")

    # Fallback 3: If still empty, try fresh Neo4j query
    if not all_nodes and NEO4J_PASSWORD:
        try:
            neo = Neo4jStore()
            neo_data = neo.export_for_frontend()
            all_nodes = {n["id"]: n for n in neo_data.get("nodes", [])}
            all_edges = neo_data.get("edges", [])
            logger.info(f"[simulate] Neo4j fallback: {len(all_nodes)} nodes, {len(all_edges)} edges")
        except Exception as e:
            logger.warning(f"[simulate] Neo4j fallback failed: {e}")

    # --- Forward BFS from disrupted node toward Tier-0 ---
    blast_ids: set[str] = set()
    queue = [request.node_id]
    visited = {request.node_id}

    while queue:
        current = queue.pop(0)
        # Find every edge where current is the SOURCE (supplies to downstream)
        for edge in all_edges:
            tgt = edge.get("target")
            if edge.get("source") == current and tgt not in visited:
                visited.add(tgt)
                blast_ids.add(tgt)
                queue.append(tgt)

    # --- Direct customers of disrupted node (immediate downstream edges) ---
    direct_customer_ids = [
        edge.get("target")
        for edge in all_edges
        if edge.get("source") == request.node_id
    ]

    blast_names = [all_nodes[nid]["name"] for nid in blast_ids if nid in all_nodes]
    total_shipments = sum(
        e.get("shipment_count", 1)
        for e in all_edges
        if e.get("source") == request.node_id or e.get("source") in blast_ids
    ) or len(blast_ids) * 60

    # --- Heuristic financial math ---
    downstream_count = len(blast_ids)
    daily_loss = downstream_count * 500_000.0
    total_loss = daily_loss * request.duration_days

    # --- Lateral traversal: find alternative suppliers ---
    # Strictly data-driven: only return alternatives that genuinely exist in the
    # graph and meet real compatibility criteria. No hardcoded results.
    source_node = all_nodes.get(request.node_id, {})
    source_tier = source_node.get("tier", 1)
    source_hs = set(request.hs_codes or source_node.get("hs_codes", []) or [])
    source_country = request.country or source_node.get("country", "")

    # Base pool: STRICTLY same tier as the disrupted node, exclude self and blast radius.
    # Lower/higher tier nodes are NOT valid drop-in replacements.
    valid_pool = [
        node for node in all_nodes.values()
        if node["id"] != request.node_id
        and node["id"] not in blast_ids
        and node.get("tier") == source_tier   # same tier only — strict
    ]

    alternatives: list[AlternativeSupplier] = []

    if valid_pool and source_hs:
        def score_candidate(node):
            """
            Scoring (same-tier is guaranteed by the pool filter, no need to weight it):
              - HSN overlap count  (weight x3) — most critical for drop-in compatibility
              - Different country  (weight x2) — geographic diversification is the whole point
            """
            node_hs = set(node.get("hs_codes", []) or [])
            hsn_overlap = len(source_hs & node_hs)
            diff_country = 1 if node.get("country", "") != source_country else 0
            return (hsn_overlap * 3) + (diff_country * 2)

        # Score and filter: only keep candidates with a positive score
        scored = [(node, score_candidate(node)) for node in valid_pool]
        scored = [(n, s) for n, s in scored if s > 0]
        scored.sort(key=lambda x: x[1], reverse=True)

        seen_alt_names: set[str] = set()
        for node, total_score in scored:
            if node["name"] in seen_alt_names:
                continue

            node_hs = set(node.get("hs_codes", []) or [])
            matched = list(source_hs & node_hs)

            # Determine HSN match description from real data
            if matched:
                hsn_str = f"Exact HSN match ({matched[0]})" + (f" +{len(matched)-1} more" if len(matched) > 1 else "")
            else:
                # No HSN overlap but scored > 0 means tier + country matched
                hsn_str = "Same tier, different region"

            # Determine rank label based on match quality
            seen_alt_names.add(node["name"])
            rank = len(alternatives) + 1

            if matched and node.get("tier") == source_tier and node.get("country", "") != source_country:
                label = "BEST MATCH"
            elif matched:
                label = "COMPATIBLE"
            elif node.get("tier") == source_tier:
                label = "TIER MATCH"
            else:
                label = "PARTIAL MATCH"

            # Capacity from real shipment data only
            shipments = node.get("shipment_volume", 0) or 0
            needed = max(total_shipments, 1)
            if shipments > needed * 0.8:
                cap_status = f"✅ Sufficient capacity ({int(shipments):,} units on record)"
            elif shipments > 0:
                cap_status = f"⚠️ Limited capacity ({int(shipments):,} units on record)"
            else:
                cap_status = "⚠️ No historical volume data"

            hist_vol = f"{int(shipments):,} units" if shipments > 0 else "No data"

            # Risk derived strictly from computed risk profile — no hardcoded assumptions
            risk_level = "UNKNOWN"
            node_risk = node.get("risk") or {}
            if isinstance(node_risk, dict) and node_risk.get("overall_level"):
                risk_level = str(node_risk["overall_level"]).upper()

            alternatives.append(AlternativeSupplier(
                name=node["name"],
                country=node.get("country", "Unknown") or "Unknown",
                hsn_match=hsn_str,
                rank=rank,
                rank_label=label,
                capacity_status=cap_status,
                historical_volume=hist_vol,
                risk_level=risk_level,
            ))
            # Dynamic cap: up to 5 if available, but never forced
            if len(alternatives) >= 5:
                break

    return SimulationResult(
        event=request.event,
        disrupted_node=request.node_name,
        disrupted_node_id=request.node_id,
        duration_days=request.duration_days,
        blast_radius_ids=list(blast_ids),
        blast_radius_names=blast_names,
        total_shipments_halted=total_shipments,
        estimated_daily_loss=daily_loss,
        estimated_total_loss=total_loss,
        estimated_financial_loss=f"${total_loss:,.0f}",
        available_alternatives=alternatives,
        direct_customer_ids=direct_customer_ids,
    )


@router.websocket("/ws/{job_id}")
async def supply_chain_ws(websocket: WebSocket, job_id: str):
    """
    WebSocket endpoint for live graph updates.
    Streams node_added, edge_added, tier_complete, and complete events.
    """
    await websocket.accept()

    if job_id not in _jobs:
        await websocket.send_json({"type": "error", "data": {"message": "Job not found"}})
        await websocket.close()
        return

    job = _jobs[job_id]
    graph_store = _graph_stores[job_id]
    job["status"] = "running"

    try:
        await websocket.send_json({
            "type": "started",
            "data": {"company": job["company"], "hs_codes": job["hs_codes"]}
        })

        async for update in build_supply_chain(
            company_name=job["company"],
            selected_hs_codes=job["hs_codes"],
            trade_adapter=_adapter,
            risk_scorer=_null_risk_scorer,
            graph_store=graph_store,
            max_tiers=job["max_tiers"],
            max_nodes_per_tier=job["max_nodes_per_tier"]
        ):
            await websocket.send_json(update.to_dict())

            if update.type == "node_added":
                job["nodes_found"] += 1
            elif update.type == "edge_added":
                job["edges_found"] += 1
            elif update.type == "tier_complete":
                job["tiers_completed"] = update.data.get("tier", 0)

        job["status"] = "complete"

        # ── Persist graph to JSON so simulate survives backend reloads ──────
        try:
            if isinstance(graph_store, GraphStore):
                from config import GRAPH_PERSIST_PATH
                graph_store.persist_path = GRAPH_PERSIST_PATH
                graph_store.save()
        except Exception as save_err:
            import logging
            logging.getLogger(__name__).warning(f"Graph save failed: {save_err}")

        # ── Cache rich summary into graph library for the Library page ────────
        try:
            from routes.graph_library import build_summary, _load_library, _save_library
            gd = graph_store.export_for_frontend()
            raw_nodes = list(gd.get("nodes", {}).values()) if isinstance(gd.get("nodes"), dict) else gd.get("nodes", [])
            raw_edges = [e[2] if isinstance(e, (list, tuple)) and len(e) == 3 else e for e in gd.get("edges", [])]
            summary = build_summary(job["company"], raw_nodes, raw_edges)
            lib = _load_library()
            lib.setdefault("entries", {})[job["company"].upper()] = summary
            _save_library(lib)
        except Exception as lib_err:
            import logging
            logging.getLogger(__name__).warning(f"Graph library cache failed: {lib_err}")

        graph_data = graph_store.export_for_frontend()
        countries = graph_store.get_countries_distribution()
        concentration = _compute_concentration_risk(countries)

        await websocket.send_json({
            "type": "final_graph",
            "data": {
                "graph": graph_data,
                "concentration_risk": concentration,
                "stats": {
                    "total_nodes": graph_store.node_count(),
                    "total_edges": graph_store.edge_count()
                }
            }
        })

    except WebSocketDisconnect:
        job["status"] = "disconnected"
    except Exception as e:
        job["status"] = "error"
        try:
            await websocket.send_json({"type": "error", "data": {"message": str(e)}})
        except Exception:
            pass
    finally:
        try:
            await websocket.close()
        except Exception:
            pass
