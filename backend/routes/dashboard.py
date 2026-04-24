"""
Dashboard routes — search history and saved searches.
"""
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter

from graph.neo4j_store import Neo4jStore
from config import NEO4J_PASSWORD

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

# Fallback in-memory store
_search_history: list[dict] = []

@router.get("/history")
async def get_search_history():
    """Get all saved searches from Neo4j (persistent) or memory."""
    if NEO4J_PASSWORD:
        try:
            store = Neo4jStore()
            # Fetch all Tier 0 nodes (Anchors)
            with store.driver.session(database=store.database) as session:
                result = session.run("MATCH (n:Company {tier: 0}) RETURN n")
                history = []
                for record in result:
                    node = record["n"]
                    # Map to dashboard format
                    history.append({
                        "id": node["id"],
                        "company_name": node["name"],
                        "hs_codes": [], # Could extract from relationships or props
                        "timestamp": datetime.now(timezone.utc).isoformat(), # Graph doesn't store this yet
                        "tier1_count": 0,
                        "risk_flags": []
                    })
                return {"history": history}
        except Exception:
            pass

    return {"history": _search_history}


@router.post("/save")
async def save_search(
    company_name: str,
    hs_codes: list[str] = [],
    tier1_count: int = 0,
    risk_flags: list[str] = []
):
    """Save a search to history."""
    entry = {
        "id": str(uuid.uuid4())[:8],
        "company_name": company_name,
        "hs_codes": hs_codes,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "tier1_count": tier1_count,
        "risk_flags": risk_flags
    }
    _search_history.insert(0, entry)  # most recent first
    # Keep last 50
    if len(_search_history) > 50:
        _search_history.pop()
    return {"status": "saved", "entry": entry}


@router.delete("/{entry_id}")
async def delete_search(entry_id: str):
    """Delete a search from history."""
    global _search_history
    _search_history = [e for e in _search_history if e["id"] != entry_id]
    return {"status": "deleted"}


@router.get("/stats")
async def get_stats():
    """Get aggregate platform stats."""
    return {
        "total_searches": len(_search_history),
        "companies_traced": len(set(e["company_name"] for e in _search_history)),
        "risk_flags_found": sum(len(e.get("risk_flags", [])) for e in _search_history)
    }
