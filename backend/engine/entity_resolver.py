"""
Entity resolution for company names in trade data.
Handles variant spellings, legal suffixes, and fuzzy matching.
"""
import re
from rapidfuzz import fuzz


NOISE_TOKENS = {
    "INC", "LLC", "LTD", "CO", "CORP", "CORPORATION", "LIMITED",
    "PTE", "PVT", "GMBH", "SRL", "SA", "BV", "AG", "NV", "SE",
    "KG", "OY", "AB", "AS", "SPA", "SARL", "EURL", "KK",
    "THE", "AND", "&", "OF", "GROUP", "HOLDINGS", "HOLDING",
    "INTERNATIONAL", "INTL", "MFG", "MANUFACTURING", "INDUSTRIES",
    "INDUSTRY", "ENTERPRISE", "ENTERPRISES", "TECHNOLOGY", "TECH"
}


def normalize_name(name: str) -> str:
    """Normalize a company name to canonical form."""
    name = name.upper().strip()
    # Remove punctuation except apostrophes (for names like DIVI'S)
    name = re.sub(r"[^\w\s']", " ", name)
    # Collapse whitespace
    name = re.sub(r"\s+", " ", name).strip()
    return name


def strip_legal_suffixes(name: str) -> str:
    """Remove legal entity suffixes for matching purposes."""
    normalized = normalize_name(name)
    tokens = normalized.split()
    # Remove trailing noise tokens
    while tokens and tokens[-1] in NOISE_TOKENS:
        tokens.pop()
    # Remove leading noise tokens
    while tokens and tokens[0] in NOISE_TOKENS:
        tokens.pop(0)
    return " ".join(tokens) if tokens else normalized


def are_same_entity(name_a: str, name_b: str,
                    country_a: str = None, country_b: str = None,
                    threshold: int = 85) -> bool:
    """
    Determine if two company names refer to the same entity.
    Uses fuzzy matching with country-aware confidence adjustment.
    """
    stripped_a = strip_legal_suffixes(name_a)
    stripped_b = strip_legal_suffixes(name_b)

    # Exact match after normalization
    if stripped_a == stripped_b:
        return True

    # Token sort ratio handles word order variations
    score = fuzz.token_sort_ratio(stripped_a, stripped_b)

    # Country mismatch reduces confidence
    if country_a and country_b and country_a != country_b:
        score = int(score * 0.8)

    return score >= threshold


def canonical_name(name: str) -> str:
    """Generate a canonical form for graph storage."""
    return normalize_name(name)


def generate_id(name: str) -> str:
    """Generate a stable ID from company name."""
    canonical = canonical_name(name)
    # Replace spaces and special chars with underscores
    return re.sub(r"[^A-Z0-9]", "_", canonical).strip("_")


def fuzzy_search(query: str, company_names: list[str],
                 limit: int = 10) -> list[tuple[str, int]]:
    """
    Search for companies matching a query string.
    Returns list of (company_name, score) tuples.
    """
    query_normalized = normalize_name(query)
    results = []

    for name in company_names:
        name_normalized = normalize_name(name)
        # Try multiple matching strategies
        ratio = fuzz.ratio(query_normalized, name_normalized)
        partial = fuzz.partial_ratio(query_normalized, name_normalized)
        token = fuzz.token_sort_ratio(query_normalized, name_normalized)
        # Use the best score
        best = max(ratio, partial, token)
        if best >= 40:  # low threshold for search suggestions
            results.append((name, best))

    results.sort(key=lambda x: x[1], reverse=True)
    return results[:limit]
