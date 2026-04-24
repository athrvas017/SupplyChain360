import json
import os
from utils.cache import cache

_LEDGER_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "mock_trade_data.json")
_ledger_data: dict = {}
_hs_descriptions: dict = {}


def _load_ledger_data() -> dict:
    global _ledger_data
    if not _ledger_data:
        with open(_LEDGER_DATA_PATH, "r") as f:
            _ledger_data = json.load(f)
    return _ledger_data


def _load_hs_descriptions() -> dict:
    global _hs_descriptions
    if not _hs_descriptions:
        path = os.path.join(os.path.dirname(__file__), "..", "data", "hs_descriptions.json")
        with open(path, "r") as f:
            _hs_descriptions = json.load(f)
    return _hs_descriptions


class CustomsLedgerAdapter:
    """
    Adapter for Private Customs Ledger Intelligence (ImportYeti/Panjiva equivalent).
    Provides deep entity resolution and multi-year shipment telemetry.
    """

    def __init__(self):
        self.data = _load_ledger_data()
        self.companies = self.data.get("companies", {})

    async def search_companies(self, query: str) -> list[dict]:
        """Fuzzy search for company names with Redis caching."""
        cache_key = f"search:{query.lower()}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        from engine.entity_resolver import fuzzy_search
        company_names = list(self.companies.keys())
        matches = fuzzy_search(query, company_names, limit=10)
        results = []
        for name, score in matches:
            info = self.companies[name]
            results.append({
                "name": name,
                "country": info.get("country", ""),
                "shipment_count": sum(
                    s.get("shipment_count", 0) for s in info.get("shipments", [])
                ),
                "hs_code_count": len(set(
                    s.get("hs_code", "") for s in info.get("shipments", [])
                )),
                "match_score": score
            })
        
        cache.set(cache_key, results, ttl=1800)
        return results

    async def get_company_info(self, company_name: str, fallback_country: str = "") -> dict:
        """Get basic company info (country, coordinates, role)."""
        cache_key = f"info:{company_name}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        # Try exact match
        if company_name in self.companies:
            info = self.companies[company_name]
            res = {
                "country": info.get("country", ""),
                "city": info.get("city", ""),
                "lat": info.get("lat", 0.0),
                "lng": info.get("lng", 0.0),
                "role": info.get("role", "unknown"),
            }
            cache.set(cache_key, res)
            return res

        # Try fuzzy match
        from engine.entity_resolver import fuzzy_search
        matches = fuzzy_search(company_name, list(self.companies.keys()), limit=1)
        if matches and matches[0][1] >= 80:
            return await self.get_company_info(matches[0][0], fallback_country)

        # Coordinate fallback for unknown companies preventing "Null Island" grouping in Africa
        COUNTRY_COORDS = {
            "CN": (35.86, 104.19), "TW": (23.69, 120.96), "JP": (36.20, 138.25), 
            "KR": (35.90, 127.76), "US": (37.09, -95.71), "NL": (52.13, 5.29),
            "DE": (51.16, 10.45), "FR": (46.22, 2.21), "GB": (55.37, -3.43),
            "IN": (20.59, 78.96), "VN": (14.05, 108.27), "MY": (4.21, 101.97),
            "ID": (-0.78, 113.92), "SG": (1.35, 103.81), "AU": (-25.27, 133.77),
            "BR": (-14.23, -51.92), "ZA": (-30.55, 22.93), "CL": (-35.67, -71.54)
        }
        
        c = fallback_country or ""
        lat, lng = COUNTRY_COORDS.get(c, (0.0, 0.0))

        return {"country": c, "city": "", "lat": lat, "lng": lng, "role": "unknown"}

    async def get_company_hs_codes(self, company_name: str) -> list[dict]:
        """Get all HS codes and their stats for a company."""
        hs_desc = _load_hs_descriptions()
        if company_name not in self.companies:
            return []

        shipments = self.companies[company_name].get("shipments", [])
        hs_map: dict[str, dict] = {}

        for s in shipments:
            hs = s.get("hs_code", "")
            if not hs:
                continue
            if hs not in hs_map:
                hs_map[hs] = {
                    "hs_code": hs,
                    "description": s.get("hs_description", hs_desc.get(hs, "Unknown")),
                    "shipment_count": 0,
                    "total_weight_kg": 0,
                    "suppliers": set()
                }
            hs_map[hs]["shipment_count"] += s.get("shipment_count", 1)
            hs_map[hs]["total_weight_kg"] += s.get("weight_kg", 0)
            hs_map[hs]["suppliers"].add(s.get("shipper", ""))

        result = []
        for hs_data in hs_map.values():
            result.append({
                "hs_code": hs_data["hs_code"],
                "description": hs_data["description"],
                "shipment_count": hs_data["shipment_count"],
                "total_weight_kg": hs_data["total_weight_kg"],
                "supplier_count": len(hs_data["suppliers"])
            })

        result.sort(key=lambda x: x["shipment_count"], reverse=True)
        return result

    async def get_company_shipments(self, company_name: str) -> list[dict]:
        """Get all shipment records for a company (with caching)."""
        cache_key = f"shipments:{company_name}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        if company_name not in self.companies:
            from engine.entity_resolver import fuzzy_search
            matches = fuzzy_search(company_name, list(self.companies.keys()), limit=1)
            if matches and matches[0][1] >= 80:
                company_name = matches[0][0]
            else:
                return []

        res = self.companies[company_name].get("shipments", [])
        cache.set(cache_key, res, ttl=300)
        return res
