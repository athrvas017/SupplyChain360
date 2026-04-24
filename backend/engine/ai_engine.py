import os
import asyncio
from google import genai
from dotenv import load_dotenv
import logging
import random

load_dotenv()
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize the new Google GenAI client
client = genai.Client(api_key=GEMINI_API_KEY)

_generation_cache = {}

async def _safe_generate(prompt, model="gemini-2.5-pro", retries=2):
    """Internal helper to handle 429 quota errors with exponential backoff and localized caching."""
    if not GEMINI_API_KEY:
        return None
        
    cache_key = hash(prompt)
    if cache_key in _generation_cache:
        logger.info("Serving LLM response from in-memory cache to save API quota.")
        return _generation_cache[cache_key]
        
    for i in range(retries + 1):
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt
            )
            result = response.text.strip()
            _generation_cache[cache_key] = result
            return result
        except Exception as e:
            if "429" in str(e) and i < retries:
                wait_time = (i + 1) * 3  # Increase wait time
                logger.warning(f"AI Quota exceeded (429). Retrying in {wait_time}s... (Attempt {i+1}/{retries})")
                await asyncio.sleep(wait_time)
                continue
            logger.error(f"AI Gemini error [Retries: {i}]: {e}")
            break
    return None

async def get_node_insight(node_data: dict, selected_hs_codes: list) -> str:
    """Provides fast financial heuristics without consuming LLM API quota."""
    from engine.financial_insights import get_financial_risk
    
    comp_name = node_data.get('name', 'Unknown')
    country = node_data.get('country', 'Unknown')
    tier = node_data.get('tier', 0)
    
    try:
        f_risk = await get_financial_risk(comp_name, country, tier)
        warnings = f_risk.get("warnings", [])
        metrics = f_risk.get("metrics", {})
        
        status = []
        if metrics:
            m_str = ", ".join([f"{k.replace('_', ' ').title()}: {v}" for k, v in metrics.items()])
            status.append(f"Financials - {m_str}")
        
        if warnings:
            status.append(f"Risk alerts: {'; '.join(warnings)}")
            
        if not status:
            return f"Operational at Tier {tier}. System detected no active compliance friction."
        
        return " | ".join(status)
    except Exception as e:
        logger.error(f"Heuristic insight failed for {comp_name}: {e}")
        return f"Operational at Tier {tier} in {country}."

async def get_supply_chain_summary(company_name: str, nodes: list, risks: list) -> str:
    """Provides a high-level strategic summary of the entire traced supply chain."""
    node_summary = [f"{n['name']} (Tier {n.get('tier', '?')})" for n in nodes[:10]]
    prompt = f"""
    You are a Strategic Risk Consultant. Summarize the supply chain resilience for {company_name}.
    
    Found {len(nodes)} entities.
    Key entities: {', '.join(node_summary)}
    Risk flags found: {risks}
    
    Provide an 'Executive Insight' (2-3 sentences) on the overall vulnerability and one recommendation 
    for diversification.
    """
    result = await _safe_generate(prompt)
    return result if result else "Intelligence summary temporarily offline."

async def predict_upstream_suppliers(company_name: str, hs_codes: list) -> list[str]:
    """
    Predicts real-world upstream suppliers using:
    1. Gemini LLM (once, no retry) for known companies
    2. HSN-chapter-aware heuristic lookup for clean, readable graph fallback
    """
    prompt = f"""
    Supply Chain Intelligence Request for '{company_name}'.
    HS Codes: {hs_codes}
    
    List 4-6 major REAL-WORLD companies that supply specific upstream inputs to {company_name}
    relevant to these HS code categories. Focus on Tier-1 direct suppliers and Tier-2 component makers.
    Return ONLY a comma-separated list of company names with no extra text.
    Example: TSMC, ASML, Samsung Electronics, SK Hynix
    """

    # Call Gemini once only — no retry
    text = await _safe_generate(prompt, retries=0)
    if text:
        try:
            names = [n.strip() for n in text.split(',')
                     if n.strip() and len(n.strip()) > 2]
            if len(names) >= 2:
                return names[:6]
        except Exception:
            pass

    # --- HSN-Chapter Heuristic Knowledge Base ---
    # Maps HS chapter -> list of (company_name, country) tuples
    # Structured to produce readable, accurate tier graphs
    logger.info(f"[predict_upstream] HSN heuristic fallback for {company_name} | HS: {hs_codes}")

    _HSN_SUPPLIER_MAP = {
        # Chapter 85 — Electrical machinery, motors, generators
        "85": [
            ("Nidec Corporation", "JP"), ("BorgWarner Inc.", "US"),
            ("Denso Corporation", "JP"), ("Valeo SA", "FR"),
        ],
        # Chapter 84 — Mechanical appliances, machinery
        "84": [
            ("Caterpillar Inc.", "US"), ("Komatsu Ltd.", "JP"),
            ("Atlas Copco", "SE"), ("SKF Group", "SE"),
        ],
        # Chapter 74 — Copper and copper articles
        "74": [
            ("Jiangxi Copper Co.", "CN"), ("Aurubis AG", "DE"),
            ("Furukawa Electric", "JP"), ("LS Cable & System", "KR"),
        ],
        # Chapter 72/73 — Iron, steel and articles
        "72": [
            ("POSCO", "KR"), ("Nippon Steel Corp.", "JP"),
            ("Thyssenkrupp Steel", "DE"), ("ArcelorMittal", "LU"),
        ],
        # Chapter 26 — Ores, slag, ash (mining)
        "26": [
            ("Codelco", "CL"), ("BHP Group", "AU"),
            ("Freeport-McMoRan", "US"), ("Rio Tinto", "AU"),
        ],
        # Chapter 38/28 — Industrial chemicals & reagents
        "38": [
            ("BASF SE", "DE"), ("Cytec Solvay", "BE"),
            ("Orica Ltd.", "AU"), ("Nouryon", "NL"),
        ],
        # Chapter 27 — Fuels, petroleum
        "27": [
            ("Shell plc", "NL"), ("BP plc", "GB"),
            ("TotalEnergies", "FR"), ("ExxonMobil", "US"),
        ],
        # Chapter 76 — Aluminium and articles
        "76": [
            ("Norsk Hydro", "NO"), ("Alcoa Corporation", "US"),
            ("Rio Tinto Aluminium", "AU"), ("Chalco", "CN"),
        ],
        # Chapter 39 — Plastics and articles thereof
        "39": [
            ("LyondellBasell", "NL"), ("Dow Chemical", "US"),
            ("SABIC", "SA"), ("Covestro AG", "DE"),
        ],
        # Chapter 90 — Optical, precision, medical instruments
        "90": [
            ("ASML Holding", "NL"), ("Carl Zeiss AG", "DE"),
            ("Keyence Corporation", "JP"), ("Mettler-Toledo", "CH"),
        ],
        # Default: General industrial suppliers
        "default": [
            ("Siemens AG", "DE"), ("ABB Ltd.", "CH"),
            ("Honeywell International", "US"), ("Parker Hannifin", "US"),
        ]
    }

    # Match on HS chapter (first 2 digits of each HS code)
    matched_suppliers = []
    seen_chapters: set[str] = set()

    for hs in (hs_codes or []):
        chapter = str(hs).replace(".", "").replace(" ", "")[:2]
        if chapter in seen_chapters:
            continue
        seen_chapters.add(chapter)
        pool = _HSN_SUPPLIER_MAP.get(chapter, _HSN_SUPPLIER_MAP["default"])
        matched_suppliers.extend(pool)

    if not matched_suppliers:
        matched_suppliers = _HSN_SUPPLIER_MAP["default"]

    # Deduplicate and pick exactly 4 — clean, not cluttered
    seen_names: set[str] = set()
    result = []
    for name, _country in matched_suppliers:
        if name not in seen_names:
            seen_names.add(name)
            result.append(name)
        if len(result) >= 4:
            break

    return result


async def generate_disruption_analysis(scenario: dict) -> str:
    """
    Generates an executive-level crisis briefing for a supply chain disruption.
    Accepts a SimulationResult dict and returns Markdown-formatted analysis.
    """
    disrupted = scenario.get("disrupted_node", "Unknown Supplier")
    event = scenario.get("event", "Unspecified disruption")
    duration = scenario.get("duration_days", 14)
    blast_names = scenario.get("blast_radius_names", [])
    financial_loss = scenario.get("estimated_financial_loss", "$0")
    daily_loss = scenario.get("estimated_daily_loss", 0)
    shipments = scenario.get("total_shipments_halted", 0)
    alternatives = scenario.get("available_alternatives", [])

    alt_text = "\n".join(
        f"  - **{a.get('name')}** ({a.get('country')}) — HSN {a.get('hsn_match')}"
        for a in alternatives
    ) or "  - No alternatives identified in current graph."

    prompt = f"""
You are a Senior Enterprise Supply Chain Risk Analyst. A critical disruption has been simulated.
Analyze the following scenario and produce a professional, executive-level crisis briefing.

## SCENARIO DATA
- **Disrupted Supplier:** {disrupted}
- **Disruption Event:** {event}
- **Duration:** {duration} days
- **Downstream Nodes Impacted:** {', '.join(blast_names) if blast_names else 'None identified'}
- **Shipments Halted:** {shipments:,}
- **Available Alternatives:**
{alt_text}

## REQUIRED OUTPUT FORMAT (strict Markdown, no preamble)

### 🚨 Executive Summary
[2-3 decisive sentences on the immediate business impact of {disrupted} going offline.]

### 📡 Blast Radius Analysis
[Bullet each affected downstream company from the list above. State WHY each is critical.]

### 🔄 Mitigation Roadmap
[Exactly 3 numbered action steps. Reference the specific alternative suppliers listed above by name and country.]

Be precise, decisive, and data-driven. No generic filler. Executive audience.
"""

    result = await _safe_generate(prompt)
    if result:
        return result

    # Structured fallback if Gemini is unavailable
    return f"""### 🚨 Executive Summary
**{disrupted}** has gone offline due to: *{event}*. Over the next **{duration} days**, {len(blast_names)} downstream entities face direct supply disruption.

### 📡 Blast Radius Analysis
{chr(10).join(f'- **{n}** — direct downstream dependency' for n in blast_names) or '- No downstream nodes identified in current graph.'}

### 📦 Operational Impact
**{shipments:,}** active historical shipments are currently at risk. Logistics routing must be audited.

### 🔄 Mitigation Roadmap
1. **Activate alternatives immediately** — contact {alternatives[0]['name'] if alternatives else 'alternative suppliers'} for emergency procurement.
2. **Audit inventory buffers** across all Tier-1 entities in the blast radius for 30-day coverage.
3. **Escalate to C-suite** with this briefing and initiate business continuity protocol for affected product lines.

*⚠️ AI briefing offline — structured fallback generated.*
"""
