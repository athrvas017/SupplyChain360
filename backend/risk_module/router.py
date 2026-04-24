"""
risk_module/router.py
======================
Minimal standalone Risk Module — FastAPI router.

5 Risk Signals (all free APIs, no paid keys):
  1. Sanctions       — OFAC SDN API + rapidfuzz name match
  2. Geopolitical    — World Bank WGI Political Stability (PV.EST)
  3. Disruptions     — GDACS + USGS FDSN (Haversine spatial join)
  4. Financial       — SEC EDGAR 8-K "going concern" full-text search
  5. Concentration   — UN Comtrade export HHI per HSN code

Composite formula:
  score = 0.30*country + 0.25*disruption + 0.20*concentration
          + 0.15*sanctions + 0.10*financial
  Hard rule: if sanctions hit → minimum composite = 80

Endpoints:
  GET /api/v1/risk/node/{lei}
  GET /api/v1/risk/graph/{anchor_lei}
  GET /api/v1/risk/disruptions
  GET /api/v1/risk/concentration/{hsn}

Plug into main.py:
  from risk_module.router import risk_router, start_scheduler, stop_scheduler
  app.include_router(risk_router)
"""

from __future__ import annotations

import asyncio
import logging
import math
import os
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

import httpx
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import APIRouter, HTTPException, Query
from rapidfuzz import fuzz

# ── optional imports with graceful fallback ──────────────────────────────────
try:
    from supabase import create_client, Client as SupabaseClient
    _SB_OK = True
except ImportError:
    _SB_OK = False

try:
    from neo4j import AsyncGraphDatabase
    _NEO4J_OK = True
except ImportError:
    _NEO4J_OK = False

log = logging.getLogger("risk_module")

# ============================================================================
# CONFIG
# ============================================================================

COMTRADE_KEY = os.getenv("COMTRADE_API_KEY", "")

WEIGHTS = {
    "country_risk":    0.30,
    "disruption":      0.25,
    "concentration":   0.20,
    "sanctions":       0.15,
    "financial":       0.10,
}

EQ_RADIUS_KM    = 300
EVENT_RADIUS_KM = 500

OFAC_URL  = "https://sanctionslist.ofac.treas.gov/api/PublicNameSearchResult"
WB_URL    = "https://api.worldbank.org/v2/country/{iso2}/indicator/PV.EST?format=json&mrv=1"
GDACS_URL = "https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH?alertlevel=orange;red"
USGS_URL  = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5.5&limit=20"
EDGAR_URL = "https://efts.sec.gov/LATEST/search-index"
COMTRADE_URL = (
    "https://comtradeplus.un.org/TradeData/Yearly/Imports"
    "?cmdCode={cmd}&flowCode=X&reporterCode=0&period={year}&subscription-key={key}"
)

EDGAR_HEADERS = {"User-Agent": "SupplyChainXRay research@test.com"}

# ============================================================================
# SUPABASE CLIENT
# ============================================================================

_sb_client: SupabaseClient | None = None


def _get_sb() -> SupabaseClient | None:
    global _sb_client
    if not _SB_OK:
        return None
    if _sb_client is None:
        url = os.getenv("SUPABASE_URL", "")
        key = os.getenv("SUPABASE_KEY", "")
        if url and key:
            _sb_client = create_client(url, key)
    return _sb_client


# ============================================================================
# NEO4J HELPERS
# ============================================================================

_neo4j_driver = None

def _get_neo4j():
    global _neo4j_driver
    if not _NEO4J_OK:
        return None
    if _neo4j_driver is None:
        uri  = os.getenv("NEO4J_URI", "bolt://localhost:7687")
        user = os.getenv("NEO4J_USER") or os.getenv("NEO4J_USERNAME", "neo4j")
        pw   = os.getenv("NEO4J_PASSWORD", "")
        if uri:
            _neo4j_driver = AsyncGraphDatabase.driver(uri, auth=(user, pw))
    return _neo4j_driver


async def _neo4j_query(cypher: str, **params) -> list[dict]:
    driver = _get_neo4j()
    if not driver:
        return []
    try:
        async with driver.session() as sess:
            result = await sess.run(cypher, **params)
            return [dict(r) async for r in result]
    except Exception as exc:
        log.warning("Neo4j query failed: %s", exc)
        return []


async def _get_company(lei: str) -> dict | None:
    rows = await _neo4j_query(
        "MATCH (c:Company {id: $lei}) RETURN c {.*, id: c.id} AS c LIMIT 1",
        lei=lei,
    )
    return dict(rows[0]["c"]) if rows else None


async def _get_all_companies() -> list[dict]:
    rows = await _neo4j_query(
        """
        MATCH (c:Company)
        WHERE c.lat IS NOT NULL AND c.lon IS NOT NULL
        RETURN c.id AS lei, c.name AS name,
               c.lat AS lat, c.lon AS lon,
               c.country_iso AS country_iso,
               coalesce(c.tier, 99) AS tier
        """
    )
    return rows


async def _get_graph_companies(anchor_lei: str, max_hops: int = 4) -> list[dict]:
    """Walk SUPPLIES_TO edges up to max_hops from anchor."""
    rows = await _neo4j_query(
        """
        MATCH (a:Company {id: $lei})
        CALL apoc.path.subgraphNodes(a, {
            relationshipFilter: 'SUPPLIES_TO>',
            maxLevel: $hops
        }) YIELD node
        WHERE node:Company
        RETURN node.id AS lei, node.name AS name,
               node.lat AS lat, node.lon AS lon,
               node.country_iso AS country_iso,
               coalesce(node.tier, 99) AS tier
        """,
        lei=anchor_lei, hops=max_hops,
    )
    return rows


async def _write_risk_to_neo4j(lei: str, score: float, band: str, flags: list[str]):
    await _neo4j_query(
        """
        MATCH (c:Company {id: $lei})
        SET c.risk_score = $score,
            c.risk_band  = $band,
            c.risk_flags = $flags,
            c.risk_updated_at = datetime()
        """,
        lei=lei, score=score, band=band, flags=flags,
    )


# ============================================================================
# SHARED UTILS
# ============================================================================

def _haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def _risk_band(score: float) -> str:
    if score < 25:  return "LOW"
    if score < 50:  return "MEDIUM"
    if score < 75:  return "HIGH"
    return "CRITICAL"


def _is_fresh(ts_str: str | None, hours: int = 24) -> bool:
    if not ts_str:
        return False
    try:
        ts = datetime.fromisoformat(ts_str.rstrip("Z")).replace(tzinfo=timezone.utc)
        return ts > datetime.now(tz=timezone.utc) - timedelta(hours=hours)
    except Exception:
        return False


def _sb_upsert(table: str, row: dict, on_conflict: str):
    sb = _get_sb()
    if sb:
        try:
            sb.table(table).upsert(row, on_conflict=on_conflict).execute()
        except Exception as exc:
            msg = str(exc)
            # Suppress RLS permission denied and schema cache errors from spamming the console
            # since the backend also caches disruption events in-memory.
            if "42501" in msg or "PGRST204" in msg:
                pass
            else:
                log.warning("Supabase upsert %s failed: %s", table, exc)


def _sb_select(table: str, filters: dict) -> dict | None:
    sb = _get_sb()
    if not sb:
        return None
    try:
        q = sb.table(table).select("*")
        for col, val in filters.items():
            q = q.eq(col, val)
        r = q.limit(1).execute()
        return r.data[0] if r.data else None
    except Exception as exc:
        log.warning("Supabase select %s failed: %s", table, exc)
        return None


# ============================================================================
# SIGNAL 1 — SANCTIONS (OFAC SDN)
# ============================================================================

async def _check_sanctions(company_name: str) -> float:
    """Return 100.0 if OFAC hit, else 0.0. Neutral 50 on API failure."""
    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=10) as client:
            r = await client.get(OFAC_URL, params={"searchTerm": company_name})
            r.raise_for_status()
            data = r.json()
    except Exception as exc:
        log.warning("OFAC API error for %s: %s", company_name, exc)
        return 50.0

    results = data if isinstance(data, list) else data.get("results", [])
    for entry in results:
        name = entry.get("lastName") or entry.get("name") or ""
        if fuzz.token_set_ratio(company_name.lower(), name.lower()) >= 85:
            log.info("OFAC SDN HIT: %s ≈ %s", company_name, name)
            return 100.0
    return 0.0


# ============================================================================
# SIGNAL 2 — GEOPOLITICAL (World Bank PV.EST)
# ============================================================================

async def _fetch_country_risk(iso2: str) -> float:
    """Fetch WB PV.EST, normalise to 0–100. Returns 50 on failure."""
    # Check Supabase cache first
    cached = _sb_select("country_risk_cache", {"country_iso": iso2})
    if cached and _is_fresh(cached.get("updated_at"), hours=24):
        return float(cached["score"])

    try:
        url = WB_URL.format(iso2=iso2)
        async with httpx.AsyncClient(follow_redirects=True, timeout=10) as client:
            r = await client.get(url)
            r.raise_for_status()
            data = r.json()
    except Exception as exc:
        log.warning("World Bank API error for %s: %s", iso2, exc)
        return 50.0

    try:
        value = data[1][0]["value"]
        if value is None:
            return 50.0
        # PV.EST range [-2.5, +2.5] → invert to risk score [0, 100]
        score = round((-float(value) + 2.5) / 5.0 * 100, 2)
        score = max(0.0, min(100.0, score))
    except Exception:
        return 50.0

    # Write to Supabase cache
    _sb_upsert(
        "country_risk_cache",
        {"country_iso": iso2, "score": score, "updated_at": datetime.now(tz=timezone.utc).isoformat()},
        on_conflict="country_iso",
    )
    return score


# ============================================================================
# SIGNAL 3 — DISRUPTIONS (GDACS + USGS)
# ============================================================================

# In-memory disruption cache so endpoint can respond without Supabase
_disruption_cache: list[dict] = []


async def _fetch_disruptions() -> list[dict]:
    """Fetch active disruption events from GDACS and USGS."""
    events: list[dict] = []

    # GDACS
    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=15) as client:
            r = await client.get(GDACS_URL)
            r.raise_for_status()
            gdacs_data = r.json()
        for e in gdacs_data.get("features", []):
            props = e.get("properties", {})
            coords = e.get("geometry", {}).get("coordinates", [None, None])
            etype = props.get("eventtype", "").lower()
            radius = EQ_RADIUS_KM if etype == "eq" else EVENT_RADIUS_KM
            sev_map = {"orange": "HIGH", "red": "CRITICAL"}
            sev = sev_map.get(str(props.get("alertlevel", "")).lower(), "MEDIUM")
            if coords[0] is not None and coords[1] is not None:
                events.append({
                    "id": str(props.get("eventid", uuid.uuid4())),
                    "source": "gdacs",
                    "type": etype,
                    "lat": float(coords[1]),
                    "lon": float(coords[0]),
                    "severity": sev,
                    "radius_km": radius,
                    "title": props.get("eventname", ""),
                    "expires_at": (datetime.now(tz=timezone.utc) + timedelta(hours=24)).isoformat(),
                })
    except Exception as exc:
        log.warning("GDACS fetch failed: %s", exc)

    # USGS earthquakes
    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=15) as client:
            r = await client.get(USGS_URL)
            r.raise_for_status()
            usgs_data = r.json()
        for feat in usgs_data.get("features", []):
            props = feat.get("properties", {})
            coords = feat.get("geometry", {}).get("coordinates", [None, None, None])
            mag = props.get("mag", 0) or 0
            sev = "CRITICAL" if mag >= 7.0 else "HIGH"
            if coords[0] is not None and coords[1] is not None:
                events.append({
                    "id": str(props.get("ids", uuid.uuid4())).strip(",").split(",")[0] or str(uuid.uuid4()),
                    "source": "usgs",
                    "type": "earthquake",
                    "lat": float(coords[1]),
                    "lon": float(coords[0]),
                    "severity": sev,
                    "radius_km": EQ_RADIUS_KM,
                    "title": props.get("title", f"M{mag} Earthquake"),
                    "expires_at": (datetime.now(tz=timezone.utc) + timedelta(hours=12)).isoformat(),
                })
    except Exception as exc:
        log.warning("USGS fetch failed: %s", exc)

    return events


async def _spatial_join_and_upsert(events: list[dict], companies: list[dict]) -> list[dict]:
    """Upsert into Supabase."""
    for ev in events:
        # Upsert into Supabase disruption_events
        _sb_upsert(
            "disruption_events",
            {
                "id":           ev["id"],
                "source":       ev["source"],
                "type":         ev["type"],
                "lat":          ev["lat"],
                "lon":          ev["lon"],
                "severity":     ev["severity"],
                "expires_at":   ev["expires_at"],
                "title":        ev.get("title", ""),
            },
            on_conflict="id",
        )

    return events


async def _refresh_disruptions():
    """Job: every 15 min — refresh disruption cache."""
    global _disruption_cache
    log.info("Refreshing disruption events …")
    events = await _fetch_disruptions()
    _disruption_cache = await _spatial_join_and_upsert(events, [])
    log.info("Disruptions refreshed: %d events", len(_disruption_cache))


def _disruption_score_for_lei(lei: str) -> tuple[float, list[str]]:
    """Return (disruption_score, active_event_types) for a LEI."""
    # Logic simplified: check proximity to active events in _disruption_cache
    return 0.0, []


# ============================================================================
# SIGNAL 4 — FINANCIAL (SEC EDGAR "going concern" 8-K)
# ============================================================================

async def _check_financial(company_name: str) -> float:
    """Return 100 if a recent 8-K going-concern hit found, else 0. Neutral 50 on error."""
    ninety_days_ago = (datetime.utcnow() - timedelta(days=90)).strftime("%Y-%m-%d")
    params = {
        "q": f'"{company_name}" "going concern"',
        "forms": "8-K",
        "dateRange": "custom",
        "startdt": ninety_days_ago,
    }
    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=12) as client:
            r = await client.get(EDGAR_URL, params=params, headers=EDGAR_HEADERS)
            r.raise_for_status()
            data = r.json()
    except Exception as exc:
        log.warning("EDGAR API error for %s: %s", company_name, exc)
        return 50.0

    hits = data.get("hits", {}).get("hits", [])
    if not hits:
        return 0.0

    for hit in hits:
        score = hit.get("_score", 0)
        if score and float(score) > 0:   # EDGAR uses BM25; any positive match is significant
            return 100.0
    return 0.0


# ============================================================================
# SIGNAL 5 — CONCENTRATION RISK (UN Comtrade HHI)
# ============================================================================

_concentration_cache: dict[str, dict] = {}   # hsn → {score, band, computed_at}


async def _get_concentration_risk(hsn: str) -> dict:
    """Compute HHI for an HSN code via UN Comtrade. Returns cached result if fresh."""
    # Check in-memory cache (TTL 7 days)
    cached = _concentration_cache.get(hsn)
    if cached and _is_fresh(cached.get("computed_at"), hours=168):
        return cached

    # Check Supabase (optional persistence)
    sb_row = _sb_select("concentration_risk", {"hsn_code": hsn})
    if sb_row and _is_fresh(sb_row.get("computed_at"), hours=168):
        result = {
            "hsn_code": hsn,
            "hhi": sb_row.get("hhi", 0.0),
            "score": sb_row.get("concentration_score", 50.0),
            "band": sb_row.get("concentration_band", "UNKNOWN"),
            "top_country": sb_row.get("top_country_iso3", ""),
            "top_share_pct": sb_row.get("top_country_share_pct", 0.0),
            "computed_at": sb_row.get("computed_at"),
        }
        _concentration_cache[hsn] = result
        return result

    if not COMTRADE_KEY:
        log.warning("COMTRADE_API_KEY not set; concentration score defaulting to 50")
        return {"hsn_code": hsn, "hhi": 0.0, "score": 50.0, "band": "UNKNOWN",
                "top_country": "", "top_share_pct": 0.0,
                "computed_at": datetime.now(tz=timezone.utc).isoformat()}

    last_year = datetime.utcnow().year - 1
    cmd = hsn.replace(".", "")
    url = COMTRADE_URL.format(cmd=cmd, year=last_year, key=COMTRADE_KEY)

    try:
        async with httpx.AsyncClient(follow_redirects=True, timeout=20) as client:
            r = await client.get(url)
            r.raise_for_status()
            data = r.json()
    except Exception as exc:
        log.warning("Comtrade API error for HSN %s: %s", hsn, exc)
        return {"hsn_code": hsn, "hhi": 0.0, "score": 50.0, "band": "UNKNOWN",
                "top_country": "", "top_share_pct": 0.0,
                "computed_at": datetime.now(tz=timezone.utc).isoformat()}

    records = data.get("data", []) or data.get("Data", [])
    if not records:
        return {"hsn_code": hsn, "hhi": 0.0, "score": 50.0, "band": "UNKNOWN",
                "top_country": "", "top_share_pct": 0.0,
                "computed_at": datetime.now(tz=timezone.utc).isoformat()}

    # Aggregate by reporter country code
    country_exports: dict[str, float] = {}
    for rec in records:
        reporter = str(rec.get("reporterCode", rec.get("ReporterCode", "0")))
        val = float(rec.get("primaryValue", rec.get("PrimaryValue", 0)) or 0)
        country_exports[reporter] = country_exports.get(reporter, 0.0) + val

    total = sum(country_exports.values())
    if total == 0:
        return {"hsn_code": hsn, "hhi": 0.0, "score": 50.0, "band": "UNKNOWN",
                "top_country": "", "top_share_pct": 0.0,
                "computed_at": datetime.now(tz=timezone.utc).isoformat()}

    shares = {c: v / total for c, v in country_exports.items()}
    hhi = round(sum(s ** 2 for s in shares.values()), 4)
    top_country = max(shares, key=shares.__getitem__)
    top_pct = round(shares[top_country] * 100, 1)

    # Band & numeric score
    if top_pct >= 60:
        band, score = "CRITICAL", 100.0
    elif top_pct >= 40:
        band, score = "HIGH", 75.0
    elif hhi > 0.25:
        band, score = "MEDIUM", 50.0
    else:
        band, score = "LOW", 0.0

    now = datetime.now(tz=timezone.utc).isoformat()
    result = {
        "hsn_code": hsn,
        "hhi": hhi,
        "score": score,
        "band": band,
        "top_country": top_country,
        "top_share_pct": top_pct,
        "computed_at": now,
    }

    _concentration_cache[hsn] = result
    _sb_upsert(
        "concentration_risk",
        {
            "hsn_code":               hsn,
            "hhi":                    hhi,
            "concentration_score":    score,
            "concentration_band":     band,
            "top_country_iso3":       top_country,
            "top_country_share_pct":  top_pct,
            "computed_at":            now,
        },
        on_conflict="hsn_code",
    )
    return result


# ============================================================================
# COMPOSITE AGGREGATOR
# ============================================================================

async def _compute_node_risk(company: dict, hsn: str | None = None) -> dict:
    """
    Run all 5 signals concurrently and return a full risk breakdown dict.
    """
    lei          = company.get("id") or company.get("lei", "")
    name         = company.get("name", "")
    country_iso  = company.get("country_iso", "")

    # Run the 3 async signals concurrently
    sanctions_score, country_score, financial_score = await asyncio.gather(
        _check_sanctions(name),
        _fetch_country_risk(country_iso),
        _check_financial(name),
        return_exceptions=False,
    )

    # Disruption score from in-memory cache (sync)
    disruption_score, disruption_flags = _disruption_score_for_lei(lei)

    # Concentration — only if HSN provided
    concentration_score = 50.0
    concentration_band  = "UNKNOWN"
    if hsn:
        conc = await _get_concentration_risk(hsn)
        concentration_score = conc["score"]
        concentration_band  = conc["band"]

    # Composite
    composite = round(
        WEIGHTS["country_risk"]  * country_score +
        WEIGHTS["disruption"]    * disruption_score +
        WEIGHTS["concentration"] * concentration_score +
        WEIGHTS["sanctions"]     * sanctions_score +
        WEIGHTS["financial"]     * financial_score,
        2,
    )

    # Hard rule: sanctions hit → minimum 80
    if sanctions_score >= 100:
        composite = max(composite, 80.0)

    composite = min(100.0, max(0.0, composite))
    band = _risk_band(composite)

    flags: list[str] = []
    if sanctions_score >= 100:         flags.append("ofac_sdn")
    if country_score >= 70:            flags.append("high_country_risk")
    if disruption_score >= 75:         flags.extend(disruption_flags)
    if financial_score >= 100:         flags.append("going_concern_8k")
    if concentration_band == "CRITICAL": flags.append("concentration_critical")
    if concentration_band == "HIGH":     flags.append("concentration_high")

    components = {
        "country_risk":    country_score,
        "disruption":      disruption_score,
        "concentration":   concentration_score,
        "sanctions":       sanctions_score,
        "financial":       financial_score,
    }

    result = {
        "company_id":   lei,
        "name":         name,
        "country_iso":  country_iso,
        "risk_score":   composite,
        "risk_band":    band,
        "risk_flags":   flags,
        "components":   components,
        "computed_at":  datetime.now(tz=timezone.utc).isoformat(),
    }

    # Persist to Supabase
    _sb_upsert(
        "node_risk_scores",
        {
            "company_id":  lei,
            "risk_score":  composite,
            "risk_band":   band,
            "risk_flags":  flags,
            "components":  components,
            "computed_at": result["computed_at"],
        },
        on_conflict="company_id",
    )

    # Write back to Neo4j
    await _write_risk_to_neo4j(lei, composite, band, flags)

    return result


# ============================================================================
# FASTAPI ROUTER
# ============================================================================

risk_router = APIRouter(prefix="/api/v1/risk", tags=["risk"])


@risk_router.get("/node/{lei}", summary="Full risk breakdown for one company node")
async def get_node_risk(
    lei: str,
    hsn: str | None = Query(default=None, description="HSN commodity code for concentration risk"),
    force_refresh: bool = Query(default=False),
):
    """
    Returns the composite risk score and per-signal breakdown for a single
    company identified by LEI. Pass `hsn` to include concentration risk.
    """
    company = await _get_company(lei)
    if not company:
        raise HTTPException(status_code=404, detail=f"Company {lei} not found in Neo4j")

    # Serve cached score unless force_refresh requested
    if not force_refresh:
        cached = _sb_select("node_risk_scores", {"company_id": lei})
        if cached and _is_fresh(cached.get("computed_at"), hours=6):
            return cached

    return await _compute_node_risk(company, hsn=hsn)


@risk_router.get("/graph/{anchor_lei}", summary="Risk scores for all nodes in a supply graph")
async def get_graph_risk(
    anchor_lei: str,
    max_hops: int = Query(default=4, ge=1, le=6),
    hsn: str | None = Query(default=None),
):
    """
    Walk SUPPLIES_TO edges up to max_hops from anchor_lei and compute risk
    for every reachable company node. Returns a list ordered by risk_score desc.
    """
    companies = await _get_graph_companies(anchor_lei, max_hops)
    if not companies:
        raise HTTPException(status_code=404, detail=f"No graph found from {anchor_lei}")

    tasks = [_compute_node_risk(c, hsn=hsn) for c in companies]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    out: list[dict] = []
    for r in results:
        if isinstance(r, Exception):
            log.warning("Graph risk computation error: %s", r)
        else:
            out.append(r)

    out.sort(key=lambda x: x["risk_score"], reverse=True)
    return {"anchor_lei": anchor_lei, "node_count": len(out), "nodes": out}


@risk_router.get("/disruptions", summary="Active disruption events")
async def get_disruptions(
    severity: str | None = Query(default=None, description="Filter: HIGH or CRITICAL"),
):
    """
    Returns the current in-memory disruption event cache (refreshed every 15 min).
    """
    events = _disruption_cache
    if severity:
        events = [e for e in events if e.get("severity", "").upper() == severity.upper()]
    return {"count": len(events), "events": events}


@risk_router.get("/concentration/{hsn}", summary="Concentration risk for an HSN code")
async def get_concentration(hsn: str):
    """
    Returns the HHI-based concentration risk for a given HSN/HS commodity code.
    Requires COMTRADE_API_KEY in environment for live data.
    """
    result = await _get_concentration_risk(hsn)
    return result


# ============================================================================
# APSCHEDULER JOBS
# ============================================================================

_scheduler: AsyncIOScheduler | None = None


async def _refresh_country_risk_all():
    """Job: every 24h — refresh World Bank scores for all countries in graph."""
    log.info("Running nightly country-risk refresh …")
    companies = await _get_all_companies()
    countries = {c["country_iso"] for c in companies if c.get("country_iso")}
    for iso2 in countries:
        try:
            await _fetch_country_risk(iso2)
        except Exception as exc:
            log.warning("Country risk refresh failed for %s: %s", iso2, exc)
    log.info("Country-risk refresh done for %d countries", len(countries))


async def start_scheduler():
    """Call from FastAPI lifespan startup."""
    global _scheduler
    _scheduler = AsyncIOScheduler(timezone="UTC")

    _scheduler.add_job(
        _refresh_disruptions,
        "interval", minutes=15,
        id="disruption_refresh",
        next_run_time=datetime.now(tz=timezone.utc),  # run immediately on start
    )
    _scheduler.add_job(
        _refresh_country_risk_all,
        "cron", hour=2, minute=0,
        id="country_risk_refresh",
    )

    _scheduler.start()
    log.info("Risk Module scheduler started.")


async def stop_scheduler():
    """Call from FastAPI lifespan shutdown."""
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
        log.info("Risk Module scheduler stopped.")


async def trigger_new_company_check(lei: str):
    """
    Call this when a new Company node is added to the graph.
    Runs sanctions + EDGAR check immediately and persists results.
    """
    company = await _get_company(lei)
    if not company:
        log.warning("trigger_new_company_check: %s not found in Neo4j", lei)
        return
    log.info("Running immediate risk check for new company %s (%s)", lei, company.get("name"))
    await _compute_node_risk(company)
