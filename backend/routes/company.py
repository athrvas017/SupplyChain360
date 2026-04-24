"""
Company-related API routes.
"""
from fastapi import APIRouter, Query
from adapters.trade_adapter import CustomsLedgerAdapter
from adapters.hsn_adapter import get_hsn_description
from adapters.comtrade_adapter import get_macro_trade_context
from models import CompanyNode, CompanyRole
from engine.entity_resolver import generate_id, canonical_name

router = APIRouter(prefix="/api/company", tags=["Company"])
adapter = CustomsLedgerAdapter()


@router.get("/{name}/search")
async def search_companies(name: str):
    """Fuzzy search for companies by name."""
    results = await adapter.search_companies(name)
    return {"query": name, "results": results}


@router.get("/{name}/hs-codes")
async def get_company_hs_codes(name: str):
    """Get all HS codes for a company and resolve descriptions via Sandbox API."""
    hs_codes = await adapter.get_company_hs_codes(name)
    
    # Enrich with Sandbox descriptions where possible
    for hs in hs_codes:
        live_desc = await get_hsn_description(hs["hs_code"])
        if live_desc:
            hs["description"] = f"{live_desc} (Verified)"
            
    return {
        "company": name,
        "hs_codes": hs_codes,
        "total_codes": len(hs_codes)
    }


@router.get("/hsn/{code}/context")
async def get_hsn_trade_context(code: str, period: str = "2023"):
    """Get macro-level trade volume context from UN Comtrade."""
    context = await get_macro_trade_context(code, period)
    return {"hs_code": code, "context": context}


@router.get("/{name}/risk")
async def get_company_risk(name: str, country: str = ""):
    """Redirects to the Gemini-powered country trade risk endpoint.
    Use GET /api/v1/risk/country/{iso2} for full analysis.
    """
    iso2 = country.upper() if country else "US"
    return {
        "company": name,
        "note": "Company-level risk now uses Gemini AI. Use /api/v1/risk/country/{iso2} for full analysis.",
        "redirect": f"/api/v1/risk/country/{iso2}",
    }


@router.get("/{name}/info")
async def get_company_info(name: str):
    """Get basic company information."""
    info = await adapter.get_company_info(name)
    return {"company": name, **info}
