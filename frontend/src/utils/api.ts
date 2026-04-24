/**
 * SupplyLens 360 API Client
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001';
const WS_BASE = API_BASE.replace('http', 'ws');

export async function searchCompanies(query) {
  const res = await fetch(`${API_BASE}/api/company/${encodeURIComponent(query)}/search`);
  return res.json();
}

export async function getCompanyHSCodes(companyName) {
  const res = await fetch(`${API_BASE}/api/company/${encodeURIComponent(companyName)}/hs-codes`);
  return res.json();
}

export async function getCompanyRisk(companyName, country = '') {
  const params = country ? `?country=${country}` : '';
  const res = await fetch(`${API_BASE}/api/company/${encodeURIComponent(companyName)}/risk${params}`);
  return res.json();
}

export async function startBuild(companyName, selectedHSCodes, maxTiers = 6) {
  const res = await fetch(`${API_BASE}/api/supply-chain/build`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      company_name: companyName,
      selected_hs_codes: selectedHSCodes,
      max_tiers: maxTiers,
      max_nodes_per_tier: 4
    })
  });
  return res.json();
}

export async function getJobStatus(jobId) {
  const res = await fetch(`${API_BASE}/api/supply-chain/${jobId}/status`);
  return res.json();
}

export async function getGraph(jobId) {
  const res = await fetch(`${API_BASE}/api/supply-chain/${jobId}/graph`);
  return res.json();
}

export async function saveToDashboard(companyName, hsCodes = [], tier1Count = 0, riskFlags = []) {
  const params = new URLSearchParams({
    company_name: companyName,
    tier1_count: tier1Count.toString()
  });
  hsCodes.forEach(c => params.append('hs_codes', c));
  riskFlags.forEach(f => params.append('risk_flags', f));
  const res = await fetch(`${API_BASE}/api/dashboard/save?${params}`, { method: 'POST' });
  return res.json();
}

export async function getDashboardHistory() {
  const res = await fetch(`${API_BASE}/api/dashboard/history`);
  return res.json();
}

export async function getHSNContext(hsnCode) {
  const res = await fetch(`${API_BASE}/api/company/hsn/${hsnCode}/context`);
  return res.json();
}

/**
 * AI Insights
 */
export async function getNodeInsight(nodeData, selectedHSCodes) {
  const res = await fetch(`${API_BASE}/api/ai/node-insight`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ node_data: nodeData, selected_hs_codes: selectedHSCodes })
  });
  return res.json();
}

export async function getChainSummary(companyName, nodes, risks) {
  const res = await fetch(`${API_BASE}/api/ai/chain-summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_name: companyName, nodes, risks })
  });
  return res.json();
}

export async function getDashboardInsights(companyName: string, nodes: any[] = [], edges: any[] = [], hsCodes: string[] = []) {
  const countries = [...new Set(nodes.map((n: any) => n.country).filter(Boolean))];
  const res = await fetch(`${API_BASE}/api/ai/dashboard-insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_name: companyName, nodes, edges, countries, hs_codes: hsCodes })
  });
  return res.json();
}

/**
 * Risk Intelligence — Trade risk (PRD §6.2)
 */
export async function getCountryTradeRisk(iso2: string) {
  const res = await fetch(`${API_BASE}/api/v1/risk/country/${encodeURIComponent(iso2)}`);
  if (!res.ok) throw new Error(`Risk API error ${res.status}`);
  return res.json();
}

export async function listRiskCountries() {
  const res = await fetch(`${API_BASE}/api/v1/risk/countries`);
  return res.json();
}

/**
 * @deprecated Use getCountryTradeRisk(iso2) instead.
 * Stub retained for backward compatibility with RiskPanel / NodeDetail.
 * Routes to the country endpoint using the country field.
 */
export async function getRiskByName(companyName: string, country = '', _hsn = '') {
  const iso2 = (country || 'US').toUpperCase().slice(0, 2);
  const res = await fetch(`${API_BASE}/api/v1/risk/country/${encodeURIComponent(iso2)}`);
  if (!res.ok) return { risk_score: 0, risk_band: 'UNKNOWN', components: {}, risk_flags: [] };
  const data = await res.json();
  // Map country response → legacy shape expected by NodeDetail/RiskPanel
  return {
    risk_score: data.overall_score ?? 0,
    risk_band: data.risk_band ?? 'UNKNOWN',
    company_id: companyName,
    name: companyName,
    country_iso: iso2,
    components: {
      sanctions: { score: data.sanctions_status === 'SANCTIONED' ? 100 : 0, is_sanctioned: data.sanctions_status === 'SANCTIONED', lists: [], source: 'intelligence' },
      country_risk: { score: data.overall_score ?? 0, source: 'intelligence', reasoning: data.summary ?? '' },
      disruption: { score: 0, source: 'none' },
      financial: { score: 0, signals: [], source: 'none' },
      concentration: { score: 0, source: 'none' },
    },
    risk_flags: data.sanctions_status === 'SANCTIONED' ? ['sanctioned'] : [],
    fallback_sources: ['intelligence'],
  };
}

/**
 * @deprecated Active disruptions are no longer polled from a separate endpoint.
 * Returns empty for backward-compat.
 */
export async function getDisruptions(_severity = '') {
  return { count: 0, events: [] };
}

export function createWebSocket(jobId) {
  return new WebSocket(`${WS_BASE}/api/supply-chain/ws/${jobId}`);
}

export async function getDynamicRisk(companyName: string) {
  const res = await fetch(`${API_BASE}/api/intelligence/dynamic-risk/${encodeURIComponent(companyName)}`);
  if (!res.ok) throw new Error('Failed to fetch dynamic risk');
  return res.json();
}

export async function getBenchmarking(companies: string[]) {
  const res = await fetch(`${API_BASE}/api/intelligence/benchmark`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ companies })
  });
  if (!res.ok) throw new Error('Failed to fetch benchmark');
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// Resilience & Playbook APIs
// ─────────────────────────────────────────────────────────────────────────────

export async function getDynamicScenarios(companyName: string) {
  const res = await fetch(`${API_BASE}/api/resilience/scenarios/${encodeURIComponent(companyName)}`);
  if (!res.ok) throw new Error('Failed to fetch scenarios');
  return res.json();
}

export async function getResilienceScore(companyName: string) {
  const res = await fetch(`${API_BASE}/api/resilience/score/${encodeURIComponent(companyName)}`);
  if (!res.ok) throw new Error('Failed to fetch resilience score');
  return res.json();
}

export async function generatePlaybook(companyName: string, scenarioType: string) {
  const res = await fetch(`${API_BASE}/api/resilience/playbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_name: companyName, scenario_type: scenarioType })
  });
  if (!res.ok) throw new Error('Failed to generate playbook');
  return res.json();
}

export async function uploadSuppliers(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/api/resilience/upload-suppliers`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Failed to upload suppliers');
  return res.json();
}

export async function gmailLogin() {
  const res = await fetch(`${API_BASE}/api/resilience/auth/login`);
  if (!res.ok) throw new Error('Failed to start Gmail auth');
  return res.json();
}

export async function checkAuthStatus() {
  const res = await fetch(`${API_BASE}/api/resilience/check-auth`);
  if (!res.ok) return { linked: false };
  return res.json();
}

export async function resetAuthStatus() {
  const res = await fetch(`${API_BASE}/api/resilience/auth/reset`, { method: 'DELETE' });
  return res.json();
}

export async function generateDraftContent(companyName: string, score: number, context: string) {
  const res = await fetch(`${API_BASE}/api/resilience/generate-draft-content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_name: companyName, score, context })
  });
  if (!res.ok) throw new Error('Failed to generate draft content');
  return res.json();
}

export async function saveDraft(toEmail: string, subject: string, body: string) {
  const res = await fetch(`${API_BASE}/api/resilience/save-draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to_email: toEmail, subject, body })
  });
  if (!res.ok) throw new Error('Failed to save draft');
  return res.json();
}

// ── Disruption Simulation ──────────────────────────────────────────────────

export interface AlternativeSupplier {
  name: string;
  country: string;
  hsn_match: string;
  rank: number;
  rank_label: string;
  capacity_status: string;
  historical_volume: string;
  risk_level: string;
}

export interface SimulationResult {
  event: string;
  disrupted_node: string;
  disrupted_node_id: string;
  duration_days: number;
  blast_radius_ids: string[];
  blast_radius_names: string[];
  total_shipments_halted: number;
  estimated_daily_loss: number;
  estimated_total_loss: number;
  estimated_financial_loss: string;
  available_alternatives: AlternativeSupplier[];
  /** Node IDs that the disrupted node was directly supplying — healing edge targets */
  direct_customer_ids: string[];
}

export interface SimulateRequest {
  node_id: string;
  node_name: string;
  event: string;
  duration_days: number;
  hs_codes: string[];
  country: string;
}

export async function simulateDisruption(req: SimulateRequest): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/api/supply-chain/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Simulation failed (${res.status}): ${err}`);
  }
  return res.json();
}

export async function getDisruptionAnalysis(scenario: SimulationResult): Promise<{ briefing: string }> {
  const res = await fetch(`${API_BASE}/api/ai/disruption-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario }),
  });
  if (!res.ok) throw new Error(`AI briefing failed (${res.status})`);
  return res.json();
}

/**
 * Graph API — Check, Retrieve, and List traced graphs (Neo4j + Supabase backed)
 */
export async function checkGraphExists(companyName: string) {
  const res = await fetch(`${API_BASE}/api/graph/check/${encodeURIComponent(companyName)}`);
  return res.json();
}

export async function getGraphByCompany(companyName: string) {
  const res = await fetch(`${API_BASE}/api/graph/${encodeURIComponent(companyName)}`);
  return res.json();
}

export async function getLatestGraph() {
  const res = await fetch(`${API_BASE}/api/graph/latest`);
  return res.json();
}

export async function getTracedNodeIds() {
  const res = await fetch(`${API_BASE}/api/graph/traced-nodes/list`);
  return res.json();
}

/**
 * Graph Library — all cached supply chain summaries
 */
export async function getCachedGraphLibrary(): Promise<{ entries: GraphLibraryEntry[] }> {
  const res = await fetch(`${API_BASE}/api/graph-library/list`);
  return res.json();
}

export async function getGraphSummary(companyName: string): Promise<GraphLibraryEntry> {
  const res = await fetch(`${API_BASE}/api/graph-library/summary/${encodeURIComponent(companyName)}`);
  return res.json();
}

export async function clearGraphLibrary(): Promise<{ status: string }> {
  const res = await fetch(`${API_BASE}/api/graph-library/clear`, { method: 'DELETE' });
  return res.json();
}

export interface GraphLibraryEntry {
  company: string;
  canonical: string;
  country: string;
  total_nodes: number;
  total_tiers: number;
  total_edges: number;
  total_volume_kg: number;
  hs_codes: string[];
  countries_exposed: string[];
  country_distribution: Record<string, number>;
  top_suppliers: {
    name: string;
    country: string;
    city: string;
    hs_codes: string[];
    shipment_volume: number;
    tier: number;
  }[];
  hub_locations: {
    name: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    tier: number;
    role: string;
    inbound_edges: number;
  }[];
  risk_distribution: { low: number; medium: number; high: number; critical: number };
  high_risk_count: number;
  cached_at: string;
}

