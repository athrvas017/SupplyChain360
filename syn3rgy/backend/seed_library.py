"""Seed the graph library from the existing graph_cache.json."""
import json, sys, os
sys.path.insert(0, os.path.dirname(__file__))

with open("data/graph_cache.json", "r") as f:
    cache = json.load(f)

raw_nodes = list(cache.get("nodes", {}).values())
raw_edges = [e[2] if isinstance(e, (list, tuple)) and len(e) == 3 else e for e in cache.get("edges", [])]

anchor = next((n for n in raw_nodes if n.get("tier") == 0), None)
company = anchor["name"] if anchor else "Unknown"

from routes.graph_library import build_summary, _load_library, _save_library
summary = build_summary(company, raw_nodes, raw_edges)
lib = _load_library()
lib.setdefault("entries", {})[company.upper()] = summary
_save_library(lib)
print(f"Seeded: {company} — {summary['total_nodes']} nodes, {summary['total_tiers']} tiers, {len(summary['top_suppliers'])} top suppliers")
print("Library saved to data/graph_library.json")
