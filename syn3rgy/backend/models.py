"""
Pydantic models for all API request/response types.
"""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


# ─── Enums ───────────────────────────────────────────────────────
class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class CompanyRole(str, Enum):
    IMPORTER = "importer"
    MANUFACTURER = "manufacturer"
    RAW_SUPPLIER = "raw_supplier"
    UNKNOWN = "unknown"


# ─── HS Code ─────────────────────────────────────────────────────
class HSCodeEntry(BaseModel):
    hs_code: str
    description: str
    shipment_count: int = 0
    total_weight_kg: float = 0.0
    supplier_count: int = 0


# ─── Shipment ────────────────────────────────────────────────────
class ShipmentRecord(BaseModel):
    consignee: str
    shipper: str
    shipper_country: str
    hs_code: str
    hs_description: str
    weight_kg: float = 0.0
    port_of_loading: str = ""
    port_of_unlading: str = ""
    shipment_date: str = ""


# ─── Risk ────────────────────────────────────────────────────────
class RiskProfile(BaseModel):
    overall_level: RiskLevel = RiskLevel.LOW
    is_sanctioned: bool = False
    sanctions_programs: list[str] = Field(default_factory=list)
    forced_labor_risk: RiskLevel = RiskLevel.LOW
    country_political_stability: float = 0.0  # -2.5 to 2.5
    concentration_risk: bool = False
    concentration_hhi: float = 0.0  # 0-1
    active_disruptions: list[dict] = Field(default_factory=list)
    risk_factors: list[str] = Field(default_factory=list)


# ─── Graph Nodes & Edges ─────────────────────────────────────────
class CompanyNode(BaseModel):
    id: str
    name: str
    canonical_name: str
    country: str = ""
    city: str = ""
    lat: float = 0.0
    lng: float = 0.0
    tier: int = 0
    role: CompanyRole = CompanyRole.UNKNOWN
    hs_codes: list[str] = Field(default_factory=list)
    shipment_volume: float = 0.0
    risk: Optional[RiskProfile] = None


class TradeEdge(BaseModel):
    source: str  # company id
    target: str  # company id
    hs_code: str = ""
    hs_description: str = ""
    shipment_count: int = 0
    total_weight_kg: float = 0.0
    bom_relevance: float = 0.0
    port_of_loading: str = ""
    port_of_unlading: str = ""


class SupplyChainGraph(BaseModel):
    nodes: list[CompanyNode] = Field(default_factory=list)
    edges: list[TradeEdge] = Field(default_factory=list)
    tiers_built: int = 0
    total_shipments_analyzed: int = 0


# ─── API Request/Response ────────────────────────────────────────
class CompanySearchResult(BaseModel):
    name: str
    country: str = ""
    shipment_count: int = 0
    hs_code_count: int = 0


class BuildRequest(BaseModel):
    company_name: str
    selected_hs_codes: list[str]
    max_tiers: int = 4
    max_nodes_per_tier: int = 15


class BuildJobStatus(BaseModel):
    job_id: str
    status: str = "pending"  # pending | running | complete | error
    tiers_completed: int = 0
    nodes_found: int = 0
    edges_found: int = 0
    graph: Optional[SupplyChainGraph] = None
    error: Optional[str] = None


class ConcentrationRiskResult(BaseModel):
    country: str
    supplier_count: int
    percentage: float
    hhi_score: float
    is_critical: bool


class DashboardEntry(BaseModel):
    id: str
    company_name: str
    hs_codes: list[str] = Field(default_factory=list)
    timestamp: str = ""
    tier1_count: int = 0
    risk_flags: list[str] = Field(default_factory=list)
    graph: Optional[SupplyChainGraph] = None


# ─── Disruption Simulation ───────────────────────────────────────
class SimulateRequest(BaseModel):
    node_id: str
    node_name: str
    event: str = "Unspecified disruption"
    duration_days: int = 14
    hs_codes: list[str] = Field(default_factory=list)
    country: str = ""

class AlternativeSupplier(BaseModel):
    name: str
    country: str
    hsn_match: str
    rank: int = 1
    rank_label: str = "BEST MATCH"
    capacity_status: str = "Capacity unknown"
    historical_volume: str = "0 shipments on record"
    risk_level: str = "MEDIUM"

class SimulationResult(BaseModel):
    event: str
    disrupted_node: str
    disrupted_node_id: str
    duration_days: int
    blast_radius_ids: list[str] = Field(default_factory=list)
    blast_radius_names: list[str] = Field(default_factory=list)
    total_shipments_halted: int = 0
    estimated_daily_loss: float = 0.0
    estimated_total_loss: float = 0.0
    estimated_financial_loss: str = "$0"
    available_alternatives: list[AlternativeSupplier] = Field(default_factory=list)
    # IDs of nodes that the disrupted node was DIRECTLY supplying to
    direct_customer_ids: list[str] = Field(default_factory=list)
