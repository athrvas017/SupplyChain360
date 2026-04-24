import asyncio
import os
from pprint import pprint
import sys

# Ensure backend folder is in path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

# Disable DB connections to test pure API fetching locally
os.environ["NEO4J_URI"] = ""
os.environ["SUPABASE_URL"] = ""

from risk_module.router import _compute_node_risk, _refresh_disruptions

async def main():
    print("--- 1. Fetching GDACS & USGS Disruptions ---")
    await _refresh_disruptions()
    
    print("\n--- 2. Computing Risk for Apple Inc. (USA) ---")
    apple = {
        "lei": "HWUPKR0MPOU8FGXBT394",
        "name": "Apple Inc.",
        "country_iso": "US",
        "lat": 37.3346,
        "lon": -122.0090
    }
    # Test with electronic HSN 8517
    res_1 = await _compute_node_risk(apple, hsn="8517")
    pprint(res_1)

    print("\n--- 3. Computing Risk for Huawei (China) ---")
    huawei = {
        "lei": "5493000G00O5Y2XOM046",
        "name": "Huawei Technologies",
        "country_iso": "CN",
        "lat": 22.6534,
        "lon": 114.0531
    }
    res_2 = await _compute_node_risk(huawei, hsn="8517")
    pprint(res_2)

if __name__ == "__main__":
    asyncio.run(main())
