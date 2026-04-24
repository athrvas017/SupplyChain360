from fastapi import APIRouter
from pydantic import BaseModel
import asyncio
from engine.ai_engine import _safe_generate
import random

router = APIRouter(prefix="/api/intelligence", tags=["Strategic Analytics"])

class BenchmarkRequest(BaseModel):
    companies: list[str]

@router.get("/dynamic-risk/{company_name}")
async def get_dynamic_risk(company_name: str):
    """
    Simulates dynamic risk tracking over the past 6 months with real-time AI explanations.
    """
    # Base risk delta logic
    current_score = round(random.uniform(4.5, 8.5), 1)
    historical_score = round(max(1.0, current_score - random.uniform(1.0, 4.0)), 1)
    
    prompt = f"""
    Act as a Supply Chain Risk Analyst.
    Explain why the risk score for {company_name} increased from {historical_score}/10 (30 days ago) to {current_score}/10 (today).
    Invent realistic, current geopolitical/financial reasons (e.g., typhoons, export restrictions, fab delays).
    Format output exactly as JSON:
    {{
        "reasons": ["🔴 reason 1", "🟡 reason 2"],
        "recommendations": ["✅ rec 1", "✅ rec 2"]
    }}
    """
    
    try:
        raw_insights = await _safe_generate(prompt)
        # Attempt minimal parsing or just return a default if it fails (using mock data for resilience)
        import json
        if "```json" in raw_insights:
            body = raw_insights.split("```json")[1].split("```")[0].strip()
        else:
            body = raw_insights
        parsed = json.loads(body)
    except:
        parsed = {
            "reasons": [
                f"🔴 Geopolitical tensions in supplier regions (+{round(current_score-historical_score, 1)} pts)",
                "🟡 Logistics delays due to global chokepoints (+0.5 pts)"
            ],
            "recommendations": [
                "✅ Diversify Tier 1 manufacturing",
                "✅ Increase safety stock by 30% for critical components"
            ]
        }
        
    # Generate timeline points
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    timeline = []
    base = historical_score
    for m in months:
        if m == "Jun":
            val = current_score
        else:
            val = round(base + random.uniform(-0.5, 1.5), 1)
            base = val
        timeline.append({"month": m, "score": val})
        
    return {
        "company": company_name,
        "current_score": current_score,
        "historical_score": historical_score,
        "change": round(current_score - historical_score, 1),
        "timeline": timeline,
        "reasons": parsed.get("reasons", []),
        "recommendations": parsed.get("recommendations", [])
    }


@router.post("/benchmark")
async def get_benchmarking(request: BenchmarkRequest):
    """
    Compare multiple companies' supply chain risks.
    """
    metrics = []
    for comp in request.companies:
        metrics.append({
            "name": comp,
            "concentration": f"{random.randint(40, 85)}%",
            "risk_score": round(random.uniform(3.5, 8.5), 1),
            "sanctions_hits": random.randint(0, 3),
            "countries_at_risk": random.randint(1, 5),
            "exposure": random.choice(["Taiwan Strait", "US-China", "EU Regulations", "Red Sea"])
        })
        
    metrics = sorted(metrics, key=lambda x: x["risk_score"])
    
    winner = metrics[0]["name"]
    loser = metrics[-1]["name"]
    
    prompt = f"""
    Act as a Supply Chain Executive.
    Benchmark these companies based on these stats: {metrics}.
    Return exactly this JSON:
    {{
        "verdict": ["🥇 {winner} (Most diversified)", "🥈 ...", "🥉 {loser} (Highest risk)"],
        "strategic_insights": ["Insight 1", "Insight 2"]
    }}
    """
    
    try:
        raw_insights = await _safe_generate(prompt)
        import json
        if "```json" in raw_insights:
            body = raw_insights.split("```json")[1].split("```")[0].strip()
        else:
            body = raw_insights
        parsed = json.loads(body)
    except:
        parsed = {
            "verdict": [
                f"🥇 {winner} (Strong diversification)",
                f"🥈 {metrics[1]['name'] if len(metrics)>1 else ''} (Balanced)",
                f"🥉 {loser} (High exposure / Risk)"
            ],
            "strategic_insights": [
                f"{winner} is significantly more resilient.",
                f"{loser} needs immediate geographic diversification."
            ]
        }
        
    return {
        "metrics": metrics,
        "verdict": parsed.get("verdict", []),
        "insights": parsed.get("strategic_insights", [])
    }
