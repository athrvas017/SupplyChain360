import httpx
import os
from config import HSN_API_KEY, HSN_API_SECRET
from utils.cache import cache
import logging
logger = logging.getLogger(__name__)


class HSNApiAdapter:
    """
    Real API adapter for HSN details via Sandbox.co.in
    """
    def __init__(self):
        self.base_url = "https://api.sandbox.co.in/gst/compliance/e-way-bill/tax-payer/hsn"
        self.api_key = HSN_API_KEY
        self.api_secret = HSN_API_SECRET

    async def get_hsn_details(self, hsn_code: str) -> dict:
        """Fetch real HSN names and details."""
        cache_key = f"hsn:{hsn_code}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        # In a real scenario, we'd exchange keys for an auth token
        # For now, we simulate the request using the user's provided pattern
        headers = {
            "x-api-version": "1.0.0",
            "x-api-key": self.api_key,
            "Authorization": self.api_secret # Assuming secret acts as auth or similar
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.base_url}/{hsn_code}", headers=headers, timeout=5)
                if response.status_code == 200:
                    data = response.json()
                    cache.set(cache_key, data)
                    return data
        except Exception as e:
            logger.error(f"HSN API error: {e}")
            
_hsn_adapter = HSNApiAdapter()

async def get_hsn_description(hsn_code: str) -> str:
    """Helper to get just the name/description of an HS code."""
    data = await _hsn_adapter.get_hsn_details(hsn_code)
    try:
        if data and isinstance(data, dict):
            return data.get("name", "Unknown Category")
    except Exception:
        pass
    return ""
