"""
Bill-of-Materials (BOM) aware filtering.
Prunes trade relationships to only include upstream inputs
that are actual components of the traced commodity.
"""
import json
import os
from engine.hs_normalizer import matches_prefix, normalize_to_heading, normalize_to_chapter

# Load BOM map
_BOM_MAP_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "hs_bom_map.json")
_bom_map: dict = {}


def _load_bom_map():
    global _bom_map
    if not _bom_map:
        with open(_BOM_MAP_PATH, "r") as f:
            raw = json.load(f)
        # Remove comment keys
        _bom_map = {k: v for k, v in raw.items() if not k.startswith("_")}
    return _bom_map


def get_expected_inputs(hs_code: str) -> list[str]:
    """
    Given a product's HS code, return the HS prefixes of valid upstream inputs.
    Checks exact match, then 4-digit heading, then 2-digit chapter.
    """
    bom = _load_bom_map()

    # Try exact match first (most specific)
    if hs_code in bom:
        return bom[hs_code]

    # Try 4-digit heading
    heading = normalize_to_heading(hs_code)
    if heading in bom:
        return bom[heading]

    # Try 2-digit chapter
    chapter = normalize_to_chapter(hs_code)
    if chapter in bom:
        return bom[chapter]

    # No known BOM — return empty (will accept all)
    return []


def is_relevant_shipment(shipment_hs: str, anchor_hs_codes: list[str]) -> bool:
    """
    Determine if a shipment's HS code is a legitimate upstream input
    to any of the anchor HS codes being traced.
    """
    for anchor in anchor_hs_codes:
        # Same product family (same heading) — always relevant
        if normalize_to_heading(shipment_hs) == normalize_to_heading(anchor):
            return True

        # Check if shipment HS matches any known BOM input
        expected_inputs = get_expected_inputs(anchor)
        for input_prefix in expected_inputs:
            if matches_prefix(shipment_hs, input_prefix):
                return True

    return False


def relevance_score(shipment_hs: str, anchor_hs_codes: list[str]) -> float:
    """
    Compute a 0.0–1.0 relevance score for a shipment relative to anchor codes.
    Higher = more relevant (direct input vs tangential).
    """
    best = 0.0

    for anchor in anchor_hs_codes:
        # Exact HS match or same subheading → highest relevance
        if shipment_hs.startswith(anchor[:6]) or anchor.startswith(shipment_hs[:6]):
            return 1.0

        # Same heading → very relevant
        if normalize_to_heading(shipment_hs) == normalize_to_heading(anchor):
            best = max(best, 0.9)
            continue

        # Same chapter → moderately relevant
        if normalize_to_chapter(shipment_hs) == normalize_to_chapter(anchor):
            best = max(best, 0.6)
            continue

        # Known BOM input → high relevance
        expected_inputs = get_expected_inputs(anchor)
        for input_prefix in expected_inputs:
            if matches_prefix(shipment_hs, input_prefix):
                # Longer prefix match = more specific = more relevant
                prefix_len = len(input_prefix)
                score = 0.7 + (prefix_len / 20)  # 0.7 – 1.0
                best = max(best, min(score, 0.95))
                break

    return best


def filter_shipments(shipments: list[dict], anchor_hs_codes: list[str],
                     min_relevance: float = 0.0) -> list[dict]:
    """
    Filter shipments to only include BOM-relevant trade flows.
    Returns shipments with relevance_score attached.
    """
    if not anchor_hs_codes:
        return shipments

    filtered = []
    for shipment in shipments:
        hs = shipment.get("hs_code", "")
        score = relevance_score(hs, anchor_hs_codes)
        if score > min_relevance:
            shipment_copy = dict(shipment)
            shipment_copy["bom_relevance"] = round(score, 3)
            filtered.append(shipment_copy)

    # Sort by relevance (highest first)
    filtered.sort(key=lambda x: x.get("bom_relevance", 0), reverse=True)
    return filtered
