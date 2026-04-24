"""
HS code normalization for cross-country compatibility.
Strips to 6-digit WCO standard and handles country-specific extensions.
"""
import re


# Country-specific HS code digit lengths
COUNTRY_HS_DIGITS = {
    "US": 10, "IN": 8, "CN": 10, "DE": 8, "GB": 10,
    "JP": 9, "KR": 10, "VN": 8, "TH": 8, "ID": 8,
    "BR": 8, "MX": 8, "TW": 10, "NL": 8, "FR": 8,
    "CH": 8, "BE": 8, "IT": 8, "AU": 8, "CL": 8,
    "IE": 8, "SE": 8, "CA": 10, "SG": 8, "MY": 8,
    "PH": 8, "BD": 8, "CD": 8, "ZA": 8, "CG": 8,
}


def clean_hs_code(hs_code: str) -> str:
    """Remove dots, spaces, dashes from HS code."""
    return re.sub(r"[\.\s\-]", "", hs_code.strip())


def normalize_to_wco6(hs_code: str) -> str:
    """
    Strip national extensions, keep 6-digit WCO standard.
    This is the universal key for cross-country matching.
    """
    clean = clean_hs_code(hs_code)
    return clean[:6]


def normalize_to_heading(hs_code: str) -> str:
    """Get the 4-digit heading."""
    clean = clean_hs_code(hs_code)
    return clean[:4]


def normalize_to_chapter(hs_code: str) -> str:
    """Get the 2-digit chapter."""
    clean = clean_hs_code(hs_code)
    return clean[:2]


def are_compatible(hs_a: str, hs_b: str) -> bool:
    """
    Check if two HS codes (possibly from different countries) match
    at the WCO 6-digit level.
    """
    return normalize_to_wco6(hs_a) == normalize_to_wco6(hs_b)


def are_same_heading(hs_a: str, hs_b: str) -> bool:
    """Check if two HS codes share the same 4-digit heading."""
    return normalize_to_heading(hs_a) == normalize_to_heading(hs_b)


def are_same_chapter(hs_a: str, hs_b: str) -> bool:
    """Check if two HS codes share the same 2-digit chapter."""
    return normalize_to_chapter(hs_a) == normalize_to_chapter(hs_b)


def get_hierarchy(hs_code: str) -> dict:
    """
    Return the full hierarchical breakdown of an HS code.
    """
    clean = clean_hs_code(hs_code)
    return {
        "full": clean,
        "subheading": clean[:6] if len(clean) >= 6 else clean,
        "heading": clean[:4] if len(clean) >= 4 else clean,
        "chapter": clean[:2] if len(clean) >= 2 else clean,
    }


def matches_prefix(hs_code: str, prefix: str) -> bool:
    """Check if an HS code starts with a given prefix."""
    clean = clean_hs_code(hs_code)
    clean_prefix = clean_hs_code(prefix)
    return clean.startswith(clean_prefix)


def get_country_digits(country: str) -> int:
    """Get expected HS code digit count for a country."""
    return COUNTRY_HS_DIGITS.get(country, 6)
