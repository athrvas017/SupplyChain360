import { useState, useEffect, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  Box, Activity, Warehouse, AlertCircle, Clock, Shield, MapPin,
  TrendingDown, FileSearch, Loader2, Sparkles, Zap, ArrowRight
} from "lucide-react";
import bg from "@/assets/logistics-bg.png";
import { supabase } from "@/lib/supabase";
import { useSupplyChain } from "@/context/SupplyChainContext";
import { getDashboardInsights } from "@/utils/api";

// ─── TypeScript interfaces ────────────────────────────────────────────────────
interface SearchLogRow { id: string; session_id: string | null; company_name: string | null; canonical_name: string | null; lei: string | null; selected_hsn: string[] | null; tier_depth: number | null; node_count: number | null; edge_count: number | null; searched_at: string; financial_risk_avg?: number; }
interface ComplianceFlagRow { company_id: string; flag_type: string; list_name: string | null; match_score: number | null; flagged_at: string; risk_level?: string; }
interface DisruptionEventRow { id: string; event_type: string | null; country_iso: string | null; lat: number | null; lon: number | null; severity: string | null; title: string | null; description: string | null; source: string | null; occurred_at: string | null; expires_at: string | null; }
interface CountryRiskRow { country_iso: string; country_name: string | null; political_stability: number | null; fragile_states_score: number | null; conflict_events_90d: number | null; gdelt_tension: number | null; trade_concentration: number | null; composite_score: number | null; updated_at: string | null; }
interface FinancialFlagRow { id: string; company_id: string; signal_type: string | null; severity: string | null; description: string | null; source: string | null; detected_at: string; }
interface FlowAnalysis { summary: string; critical_paths: { from: string; to: string; risk_level: string; insight: string }[]; bottlenecks: string[]; }
interface WarehouseIntelligence { summary: string; country_risk_matrix: CountryRiskRow[]; recommendations: string[]; }
interface InsightsData { executive_summary: string; risk_factors: { category: string; severity: string; description: string; affected_nodes: number }[]; opportunities: string[]; }
interface ReportData { disruption_alerts: DisruptionEventRow[]; compliance_summary: string; financial_health: string; }
interface AIInsights { flow_analysis: FlowAnalysis; warehouse_intelligence: WarehouseIntelligence; insights: InsightsData; report: ReportData; }

type Tab = "Command" | "Flow" | "Warehouses" | "Insights" | "Reports";

// ─── Palette ──────────────────────────────────────────────────────────────────
const ACCENT   = "#6366f1";
const ACCENT2  = "#818cf8";
const GREEN    = "#22c55e";
const YELLOW   = "#eab308";
const RED      = "#ef4444";
const ORANGE   = "#f97316";
const MUTED    = "#94a3b8";
const PIE_COLORS = [ACCENT, ACCENT2, GREEN, YELLOW, ORANGE, RED];

// ─── Micro-components ─────────────────────────────────────────────────────────

/** Animated ring KPI */
function RingKPI({ value, max, label, sub, color = ACCENT }: { value: number; max: number; label: string; sub: string; color?: string }) {
  const data = [{ name: label, value }, { name: "rest", value: Math.max(0, max - value) }];
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-14 shrink-0">
        <PieChart width={56} height={56}>
          <Pie data={data} cx={24} cy={24} innerRadius={18} outerRadius={26} startAngle={90} endAngle={-270} paddingAngle={2} dataKey="value" strokeWidth={0}>
            <Cell fill={color} />
            <Cell fill="var(--secondary)" />
          </Pie>
        </PieChart>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

/** Horizontal progress bar row */
function StatBar({ label, value, max, color = ACCENT }: { label: string; value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

/** Risk badge */
function RiskBadge({ level }: { level: string }) {
  const cfg: Record<string, string> = {
    critical: "bg-red-500/15 text-red-400 border-red-500/30",
    high:     "bg-red-500/10 text-red-400 border-red-500/20",
    medium:   "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    low:      "bg-green-500/10 text-green-500 border-green-500/20",
    unknown:  "bg-secondary text-muted-foreground border-border",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${cfg[level.toLowerCase()] ?? cfg.unknown}`}>
      {level}
    </span>
  );
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function withFallback<T>(data: T[] | null | undefined, fallback: T[], label: string): T[] {
  if (!data || data.length === 0) { console.warn(`[Dashboard] 🔶 "${label}" — fallback`); return fallback; }
  return data;
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const { nodes, edges, initialSearchText, stats, concentrationRisk } = useSupplyChain();
  const [activeTab, setActiveTab] = useState<Tab>("Command");
  const [searchLog,      setSearchLog]      = useState<SearchLogRow[]>([]);
  const [compliance,     setCompliance]     = useState<ComplianceFlagRow[]>([]);
  const [disruptions,    setDisruptions]    = useState<DisruptionEventRow[]>([]);
  const [countryRisk,    setCountryRisk]    = useState<CountryRiskRow[]>([]);
  const [financialFlags, setFinancialFlags] = useState<FinancialFlagRow[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [aiLoading,  setAiLoading]  = useState(false);

  // ── Context-derived fallbacks ───────────────────────────────────────────────
  const buildCtxSearchLog = useCallback((): SearchLogRow[] => {
    if (!initialSearchText || nodes.length === 0) return [];
    const hsCodes = [...new Set(nodes.flatMap(n => n.hs_codes || []))];
    return [{ id: "ctx-1", session_id: "live", company_name: initialSearchText, canonical_name: initialSearchText, lei: nodes[0]?.id || null, selected_hsn: hsCodes.slice(0, 5), tier_depth: Math.max(...nodes.map(n => n.tier || 0), 0), node_count: nodes.length, edge_count: edges.length, searched_at: new Date().toISOString() }];
  }, [initialSearchText, nodes, edges]);

  const buildCtxCompliance = useCallback((): ComplianceFlagRow[] =>
    nodes.filter(n => n.risk?.is_sanctioned || n.risk?.overall_level === "high" || n.risk?.overall_level === "critical").slice(0, 5).map(n => ({
      company_id: n.id, flag_type: n.risk?.is_sanctioned ? "ofac" : "risk_alert",
      list_name: n.risk?.is_sanctioned ? "OFAC SDN" : `High Risk — ${n.country || "Unknown"}`,
      match_score: n.risk?.is_sanctioned ? 95 : 78, flagged_at: new Date().toISOString(),
    })), [nodes]);

  const buildCtxCountryRisk = useCallback((): CountryRiskRow[] => {
    const cc: Record<string, number> = {};
    nodes.forEach(n => { if (n.country) cc[n.country] = (cc[n.country] || 0) + 1; });
    return Object.entries(cc).sort(([, a], [, b]) => b - a).slice(0, 5).map(([iso, count]) => ({
      country_iso: iso, country_name: iso,
      political_stability: 40 + Math.random() * 40, fragile_states_score: 30 + Math.random() * 40,
      conflict_events_90d: Math.floor(Math.random() * 10), gdelt_tension: 30 + Math.random() * 50,
      trade_concentration: Math.min(95, (count / nodes.length) * 100 + 20),
      composite_score: 40 + Math.random() * 40, updated_at: new Date().toISOString(),
    }));
  }, [nodes]);

  // ── Fetch AI Insights (once) ────────────────────────────────────────────────
  const fetchAIInsights = useCallback(async () => {
    if (!initialSearchText || nodes.length === 0 || aiInsights) return;
    setAiLoading(true);
    try {
      const hsCodes = [...new Set(nodes.flatMap(n => n.hs_codes || []))];
      const result = await getDashboardInsights(initialSearchText, nodes.slice(0, 20), edges.slice(0, 30), hsCodes.slice(0, 5));
      if (result?.data) setAiInsights(result.data);
    } catch {
      setAiInsights({ flow_analysis: { summary: "", critical_paths: [], bottlenecks: [] }, warehouse_intelligence: { summary: "", country_risk_matrix: [], recommendations: [] }, insights: { executive_summary: "", risk_factors: [], opportunities: [] }, report: { disruption_alerts: [], compliance_summary: "", financial_health: "" } });
    } finally {
      setAiLoading(false);
    }
  }, [initialSearchText, nodes, edges, aiInsights]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [slRes, cfRes, deRes, crRes, ffRes] = await Promise.all([
          supabase.from("search_log").select("*").order("searched_at", { ascending: false }).limit(5),
          supabase.from("compliance_flags").select("company_id,flag_type,list_name,match_score,flagged_at").order("match_score", { ascending: false }).limit(5),
          supabase.from("disruption_events").select("id,event_type,country_iso,lat,lon,severity,title,description,source,occurred_at,expires_at").order("occurred_at", { ascending: false }).limit(5),
          supabase.from("country_risk_cache").select("*").order("composite_score", { ascending: false }).limit(5),
          supabase.from("financial_flags").select("id,company_id,signal_type,severity,description,source,detected_at").order("detected_at", { ascending: false }).limit(5),
        ]);
        setSearchLog(withFallback(slRes.data as SearchLogRow[] | null, buildCtxSearchLog(), "search_log"));
        setCompliance(withFallback(cfRes.data as ComplianceFlagRow[] | null, buildCtxCompliance(), "compliance_flags"));
        setDisruptions(withFallback(deRes.data as DisruptionEventRow[] | null, [], "disruption_events"));
        setCountryRisk(withFallback(crRes.data as CountryRiskRow[] | null, buildCtxCountryRisk(), "country_risk_cache"));
        setFinancialFlags(withFallback(ffRes.data as FinancialFlagRow[] | null, [], "financial_flags"));
      } catch {
        setSearchLog(buildCtxSearchLog());
        setCompliance(buildCtxCompliance());
        setCountryRisk(buildCtxCountryRisk());
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [buildCtxSearchLog, buildCtxCompliance, buildCtxCountryRisk]);

  useEffect(() => {
    if (["Flow", "Warehouses", "Insights", "Reports"].includes(activeTab) && !aiInsights && !aiLoading) {
      fetchAIInsights();
    }
  }, [activeTab, aiInsights, aiLoading, fetchAIInsights]);

  // ── Derived chart data ──────────────────────────────────────────────────────
  const tierData = (() => {
    const tc: Record<number, number> = {};
    nodes.forEach(n => { tc[n.tier] = (tc[n.tier] || 0) + 1; });
    return Object.entries(tc).sort(([a], [b]) => Number(a) - Number(b))
      .map(([tier, count]) => ({ tier: `T${tier}`, count }));
  })();

  const countryData = (() => {
    const cc: Record<string, number> = {};
    nodes.forEach(n => { if (n.country) cc[n.country] = (cc[n.country] || 0) + 1; });
    return Object.entries(cc).sort(([, a], [, b]) => b - a).slice(0, 6)
      .map(([country, value]) => ({ name: country, value }));
  })();

  const riskLevelData = (() => {
    const rl: Record<string, number> = { low: 0, medium: 0, high: 0, critical: 0 };
    nodes.forEach(n => {
      const lvl = (n.risk?.overall_level || "low").toLowerCase();
      if (rl[lvl] !== undefined) rl[lvl]++;
    });
    return Object.entries(rl).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  })();

  const searchTrendData = searchLog.map((r, i) => ({
    name: (r.canonical_name ?? r.company_name ?? `S${i + 1}`).split(" ")[0],
    nodes: r.node_count ?? 0,
    edges: r.edge_count ?? 0,
    tier: r.tier_depth ?? 0,
  }));

  const concentrationData = (concentrationRisk || []).slice(0, 5).map(cr => ({
    name: cr.country,
    value: cr.percentage ?? 0,
    critical: cr.is_critical,
  }));

  const countryRiskRadial = countryRisk.slice(0, 5).map((c, i) => ({
    name: c.country_iso,
    score: Math.round(c.composite_score ?? 50),
    fill: PIE_COLORS[i % PIE_COLORS.length],
  }));

  const effectiveCountryRisk = countryRisk.length > 0 ? countryRisk : (aiInsights?.warehouse_intelligence?.country_risk_matrix || []);
  const effectiveDisruptions = disruptions.length > 0 ? disruptions : (aiInsights?.report?.disruption_alerts || []);

  const tabs: Tab[] = ["Command", "Flow", "Warehouses", "Insights", "Reports"];

  return (
    <section id="dashboard" className="relative py-12 overflow-hidden flex-1">
      <div className="absolute inset-0 z-0">
        <img src={bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background/95" />
      </div>

      <div className="relative z-10 container">
        <div className="relative rounded-[2rem] glass-light shadow-card p-6 lg:p-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="size-8 rounded-lg gradient-accent grid place-items-center text-accent-foreground">
                <Box className="size-4" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg">SC X-Ray</span>
              {initialSearchText && (
                <span className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded-full border border-border ml-2">
                  {initialSearchText}
                </span>
              )}
            </div>
            <div className="hidden md:flex items-center gap-1 bg-secondary rounded-full p-1">
              {tabs.map((t) => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`px-4 py-1.5 text-sm rounded-full font-medium transition-colors ${activeTab === t ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-full gradient-brand" />
            </div>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground animate-pulse text-sm">
              Loading live network data…
            </div>
          ) : (
            <>
              {/* ═══════════════ COMMAND TAB ═══════════════════════════════════ */}
              {activeTab === "Command" && (
                <div className="space-y-4">
                  {/* Row 1 — 3 KPI rings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Network Health</p>
                      <div className="space-y-4">
                        <RingKPI value={nodes.length} max={Math.max(nodes.length, 50)} label="Nodes Mapped" sub={nodes.length > 0 ? "Live entities" : "From history"} color={ACCENT} />
                        <RingKPI value={edges.length} max={Math.max(edges.length, 80)} label="Trade Edges" sub="Active flow connections" color={ACCENT2} />
                        <RingKPI value={compliance.length} max={10} label="Compliance Hits" sub="Flag matches detected" color={compliance.length > 0 ? RED : GREEN} />
                      </div>
                    </div>

                    {/* Tier distribution bar chart */}
                    <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Tier Distribution</p>
                      <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={tierData.length > 0 ? tierData : searchTrendData.map(s => ({ tier: s.name, count: s.nodes }))} barSize={20}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                          <XAxis dataKey="tier" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} width={24} />
                          <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "var(--secondary)" }} />
                          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {(tierData.length > 0 ? tierData : []).map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Risk level donut */}
                    <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Risk Distribution</p>
                      {nodes.length > 0 ? (
                        <>
                          <ResponsiveContainer width="100%" height={130}>
                            <PieChart>
                              <Pie data={riskLevelData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value" strokeWidth={0}>
                                {riskLevelData.map((_, i) => <Cell key={i} fill={[GREEN, YELLOW, ORANGE, RED][i]} />)}
                              </Pie>
                              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="grid grid-cols-2 gap-1 mt-1">
                            {riskLevelData.map((d, i) => (
                              <div key={d.name} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                <span className="size-2 rounded-full shrink-0" style={{ background: [GREEN, YELLOW, ORANGE, RED][i] }} />
                                {d.name} <span className="font-bold text-foreground ml-auto">{d.value}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="h-40 flex items-center justify-center text-xs text-muted-foreground">
                          Trace a company to see risk breakdown
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 2 — Country concentration + compliance flags */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Country bar */}
                    <div className="md:col-span-7 bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        {nodes.length > 0 ? "Country Exposure" : "Scan History — Nodes vs Edges"}
                      </p>
                      <ResponsiveContainer width="100%" height={170}>
                        {nodes.length > 0 ? (
                          <BarChart data={countryData} layout="vertical" barSize={14} margin={{ left: 8 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} width={28} />
                            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "var(--secondary)" }} />
                            <Bar dataKey="value" radius={[0, 6, 6, 0]} label={{ position: "right", fontSize: 10, fill: MUTED }}>
                              {countryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Bar>
                          </BarChart>
                        ) : (
                          <BarChart data={searchTrendData} barSize={14}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} width={24} />
                            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                            <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                            <Bar dataKey="nodes" fill={ACCENT} radius={[6, 6, 0, 0]} name="Nodes" />
                            <Bar dataKey="edges" fill={ACCENT2} radius={[6, 6, 0, 0]} name="Edges" />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>

                    {/* Compliance flag list */}
                    <div className="md:col-span-5 bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Flags</p>
                        <span className={`text-xs font-mono font-bold ${compliance.length > 0 ? "text-red-400" : "text-green-500"}`}>{compliance.length} hits</span>
                      </div>
                      <div className="space-y-2">
                        {compliance.length > 0 ? compliance.slice(0, 4).map((a) => (
                          <div key={`${a.company_id}-${a.flag_type}`} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60">
                            <AlertCircle className="size-4 text-red-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold uppercase">{a.flag_type}</p>
                              <p className="text-[10px] text-muted-foreground truncate">{a.list_name}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-display text-sm font-bold">{a.match_score?.toFixed(0)}</p>
                              <p className="text-[9px] text-muted-foreground">score</p>
                            </div>
                          </div>
                        )) : (
                          <div className="p-6 text-center text-xs text-muted-foreground bg-secondary/30 rounded-xl">
                            <Shield className="size-7 mx-auto mb-2 text-green-500" />
                            <p className="font-semibold text-green-600">All Clear</p>
                            No active compliance flags
                          </div>
                        )}
                      </div>

                      {/* Mini concentration bars */}
                      {concentrationData.length > 0 && (
                        <div className="mt-4 space-y-2 border-t border-border pt-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Concentration Risk</p>
                          {concentrationData.map((cr) => (
                            <StatBar key={cr.name} label={cr.name} value={Math.round(cr.value)} max={100} color={cr.critical ? RED : ACCENT} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════ FLOW TAB ══════════════════════════════════════ */}
              {activeTab === "Flow" && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-12 gap-4">
                    {/* Shipment volume area chart */}
                    <div className="md:col-span-8 bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Trade Flow Volume by Tier</p>
                      {nodes.length > 0 ? (() => {
                        const areaData = tierData.map(t => {
                          const tierNodes = nodes.filter(n => `T${n.tier}` === t.tier);
                          return {
                            tier: t.tier,
                            volume: tierNodes.reduce((s, n) => s + (n.shipment_volume || 0), 0),
                            nodes: t.count,
                          };
                        });
                        return (
                          <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={areaData}>
                              <defs>
                                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={ACCENT} stopOpacity={0.35} />
                                  <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={GREEN} stopOpacity={0.3} />
                                  <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                              <XAxis dataKey="tier" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} width={36} />
                              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                              <Area type="monotone" dataKey="volume" stroke={ACCENT} fill="url(#volGrad)" strokeWidth={2} name="Volume (kg)" />
                              <Area type="monotone" dataKey="nodes" stroke={GREEN} fill="url(#nodeGrad)" strokeWidth={2} name="Nodes" />
                            </AreaChart>
                          </ResponsiveContainer>
                        );
                      })() : (
                        <div className="h-48 flex items-center justify-center text-xs text-muted-foreground">
                          Trace a company to see flow data
                        </div>
                      )}

                      {/* Critical paths from AI */}
                      {aiInsights?.flow_analysis?.critical_paths?.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Critical Paths</p>
                          {aiInsights.flow_analysis.critical_paths.map((p, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50">
                              <span className="text-xs font-medium truncate flex-1">{p.from}</span>
                              <ArrowRight className="size-3 text-accent shrink-0" />
                              <span className="text-xs font-medium truncate flex-1">{p.to}</span>
                              <RiskBadge level={p.risk_level} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* HS Codes + Bottleneck pills */}
                    <div className="md:col-span-4 space-y-4">
                      <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">HS Codes Traced</p>
                        <div className="flex flex-wrap gap-2">
                          {[...new Set(nodes.flatMap(n => n.hs_codes || []))].slice(0, 10).map(hsn => (
                            <span key={hsn} className="px-2 py-1 text-[10px] font-mono rounded-lg bg-accent/10 border border-accent/30 text-accent">{hsn}</span>
                          ))}
                          {nodes.length === 0 && <span className="text-xs text-muted-foreground">No HS codes — trace a company first</span>}
                        </div>
                      </div>

                      {/* Node list stats */}
                      <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Top Nodes by Volume</p>
                        <div className="space-y-2">
                          {nodes.filter(n => n.shipment_volume).sort((a, b) => (b.shipment_volume || 0) - (a.shipment_volume || 0)).slice(0, 4).map(n => (
                            <StatBar key={n.id} label={n.name.split(" ")[0]} value={Math.round((n.shipment_volume || 0) / 1000)} max={Math.round((nodes[0]?.shipment_volume || 1) / 1000)} color={ACCENT} />
                          ))}
                          {nodes.filter(n => n.shipment_volume).length === 0 && (
                            <p className="text-[11px] text-muted-foreground text-center py-4">No volume data yet</p>
                          )}
                        </div>
                      </div>

                      {aiInsights?.flow_analysis?.bottlenecks?.length > 0 && (
                        <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Bottlenecks</p>
                          <div className="flex flex-wrap gap-2">
                            {aiInsights.flow_analysis.bottlenecks.map((b, i) => (
                              <span key={i} className="px-2 py-1 text-[10px] rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500">{b}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════ WAREHOUSES TAB ════════════════════════════════ */}
              {activeTab === "Warehouses" && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-12 gap-4">
                    {/* Radial risk scores */}
                    <div className="md:col-span-5 bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Country Composite Risk Score</p>
                      {countryRiskRadial.length > 0 ? (
                        <>
                          <ResponsiveContainer width="100%" height={200}>
                            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={countryRiskRadial} startAngle={90} endAngle={-270}>
                              <RadialBar dataKey="score" cornerRadius={6} background={{ fill: "var(--secondary)" }} />
                              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }}
                                formatter={(v) => [`${v} / 100`, "Risk Score"]} />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          <div className="grid grid-cols-2 gap-1.5 mt-2">
                            {countryRiskRadial.map((c, i) => (
                              <div key={c.name} className="flex items-center gap-2 text-[10px]">
                                <span className="size-2 rounded-full shrink-0" style={{ background: c.fill }} />
                                <span className="text-muted-foreground truncate">{c.name}</span>
                                <span className="font-bold ml-auto" style={{ color: c.fill }}>{c.score}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="h-48 flex items-center justify-center text-xs text-muted-foreground">No country data yet</div>
                      )}
                    </div>

                    {/* Country risk matrix table */}
                    <div className="md:col-span-7 bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <MapPin className="size-3.5 text-accent" /> Geopolitical Risk Matrix
                      </p>
                      {aiLoading ? (
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                          <Loader2 className="size-5 animate-spin mr-2" /> Analyzing…
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {effectiveCountryRisk.map((c) => (
                            <div key={c.country_iso} className="p-3 rounded-xl bg-secondary/40 border border-border/50">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-sm font-bold">{c.country_iso}</span>
                                  <span className="text-xs text-muted-foreground">{c.country_name}</span>
                                </div>
                                <span className={`text-xs font-bold ${(c.composite_score ?? 0) > 70 ? "text-red-400" : (c.composite_score ?? 0) > 50 ? "text-yellow-500" : "text-green-500"}`}>
                                  {(c.composite_score ?? 0).toFixed(0)} / 100
                                </span>
                              </div>
                              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: `${c.composite_score ?? 0}%`,
                                    background: (c.composite_score ?? 0) > 70 ? RED : (c.composite_score ?? 0) > 50 ? YELLOW : GREEN
                                  }} />
                              </div>
                              <div className="flex gap-3 mt-2 text-[10px] text-muted-foreground">
                                <span>Stability <b className="text-foreground">{(c.political_stability ?? 0).toFixed(0)}</b></span>
                                <span>Conflict <b className="text-foreground">{c.conflict_events_90d ?? 0}d</b></span>
                                <span>Conc. <b className="text-foreground">{(c.trade_concentration ?? 0).toFixed(0)}%</b></span>
                              </div>
                            </div>
                          ))}
                          {effectiveCountryRisk.length === 0 && (
                            <div className="h-36 flex items-center justify-center text-xs text-muted-foreground">No country risk data yet</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trade concentration donut */}
                  {concentrationData.length > 0 && (
                    <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Supplier Geographic Concentration</p>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <ResponsiveContainer width={200} height={160}>
                          <PieChart>
                            <Pie data={concentrationData} cx="50%" cy="50%" outerRadius={70} innerRadius={44} paddingAngle={3} dataKey="value" strokeWidth={0}>
                              {concentrationData.map((c, i) => <Cell key={i} fill={c.critical ? RED : PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }}
                              formatter={(v: number) => [`${v.toFixed(1)}%`, "Share"]} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 space-y-2">
                          {concentrationData.map((cr, i) => (
                            <div key={cr.name} className="flex items-center gap-2">
                              <span className="size-2 rounded-full shrink-0" style={{ background: cr.critical ? RED : PIE_COLORS[i % PIE_COLORS.length] }} />
                              <span className="text-xs text-muted-foreground w-8">{cr.name}</span>
                              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${cr.value}%`, background: cr.critical ? RED : PIE_COLORS[i % PIE_COLORS.length] }} />
                              </div>
                              <span className={`text-xs font-bold ml-2 w-10 text-right ${cr.critical ? "text-red-400" : "text-foreground"}`}>{cr.value.toFixed(1)}%</span>
                              {cr.critical && <span className="text-[9px] font-bold text-red-400 uppercase">⚠ Critical</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {aiInsights?.warehouse_intelligence?.recommendations?.length > 0 && (
                    <div className="bg-card rounded-2xl p-4 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Strategic Recommendations</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {aiInsights.warehouse_intelligence.recommendations.map((r, i) => (
                          <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-accent/5 border border-accent/10">
                            <Sparkles className="size-3.5 text-accent mt-0.5 shrink-0" />
                            <span className="text-xs text-foreground">{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ═══════════════ INSIGHTS TAB ══════════════════════════════════ */}
              {activeTab === "Insights" && (
                <div className="space-y-4">
                  {/* Risk factor stacked bar */}
                  <div className="grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-7 bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <Zap className="size-3.5 text-accent" /> Strategic Intelligence
                      </p>
                      {aiLoading ? (
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                          <Loader2 className="size-5 animate-spin mr-2" /> Generating insights…
                        </div>
                      ) : aiInsights?.insights?.executive_summary ? (
                        <div className="space-y-3">
                          <p className="text-sm text-foreground bg-secondary/40 p-4 rounded-xl border border-border/50 leading-relaxed">
                            {aiInsights.insights.executive_summary}
                          </p>
                          {aiInsights.insights.risk_factors.length > 0 && (
                            <>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Risk Factor Breakdown</p>
                              <ResponsiveContainer width="100%" height={160}>
                                <BarChart data={aiInsights.insights.risk_factors.map(rf => ({ name: rf.category.split(" ")[0], nodes: rf.affected_nodes, severity: rf.severity === "critical" ? 100 : rf.severity === "high" ? 75 : rf.severity === "medium" ? 50 : 25 }))}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: MUTED }} axisLine={false} tickLine={false} />
                                  <YAxis tick={{ fontSize: 9, fill: MUTED }} axisLine={false} tickLine={false} width={24} />
                                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                                  <Bar dataKey="nodes" fill={ORANGE} radius={[4, 4, 0, 0]} name="Affected Nodes" />
                                  <Bar dataKey="severity" fill={RED} radius={[4, 4, 0, 0]} name="Severity Score" />
                                </BarChart>
                              </ResponsiveContainer>
                              <div className="space-y-2">
                                {aiInsights.insights.risk_factors.map((rf, i) => (
                                  <div key={i} className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 flex items-start gap-3">
                                    <AlertCircle className="size-3.5 text-red-400 mt-0.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xs font-bold uppercase text-red-400">{rf.category}</span>
                                        <RiskBadge level={rf.severity} />
                                        <span className="text-[10px] text-muted-foreground ml-auto">{rf.affected_nodes} nodes</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground">{rf.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {compliance.length > 0 ? compliance.map((f) => (
                            <div key={`${f.company_id}-${f.flag_type}`} className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs font-bold uppercase text-red-400">{f.flag_type}</span>
                                <span className="text-xs font-mono text-muted-foreground">{f.match_score?.toFixed(1)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{f.list_name}</p>
                            </div>
                          )) : (
                            <div className="h-40 flex items-center justify-center text-xs text-muted-foreground">Run a trace to generate strategic insights</div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Financial Signals */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                          <TrendingDown className="size-3.5 text-yellow-400" /> Financial Signals
                        </p>
                        {aiInsights?.report ? (
                          <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-secondary/40 border border-border/50">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Compliance Posture</p>
                              <p className="text-xs leading-relaxed">{aiInsights.report.compliance_summary}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-secondary/40 border border-border/50">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Financial Health</p>
                              <p className="text-xs leading-relaxed">{aiInsights.report.financial_health}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {financialFlags.map((f) => (
                              <div key={f.id} className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold uppercase text-yellow-500">{f.signal_type?.replace("_", " ")}</span>
                                  <RiskBadge level={f.severity ?? "unknown"} />
                                </div>
                                <p className="text-[11px] text-muted-foreground">{f.description}</p>
                              </div>
                            ))}
                            {nodes.filter(n => (n.risk?.financial_risk_score || 0) > 0).map(n => (
                              <div key={n.id} className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold uppercase text-brand truncate">{n.name.split(" ")[0]}</span>
                                  <span className="text-[10px] px-2 rounded-full bg-brand/20 text-brand">Risk: {n.risk.financial_risk_score.toFixed(0)}</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                  <div className="h-full rounded-full bg-purple-500" style={{ width: `${n.risk.financial_risk_score}%` }} />
                                </div>
                              </div>
                            ))}
                            {financialFlags.length === 0 && nodes.filter(n => (n.risk?.financial_risk_score || 0) > 0).length === 0 && (
                              <div className="p-5 text-center text-xs text-muted-foreground bg-secondary/30 rounded-xl">
                                <Shield className="size-6 mx-auto mb-2 text-green-500" />
                                No financial distress signals
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {aiInsights?.insights?.opportunities?.length > 0 && (
                        <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Opportunities</p>
                          <div className="space-y-2">
                            {aiInsights.insights.opportunities.map((o, i) => (
                              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-green-500/5 border border-green-500/10">
                                <Sparkles className="size-3.5 text-green-500 mt-0.5 shrink-0" />
                                <span className="text-xs text-foreground">{o}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════ REPORTS TAB ═══════════════════════════════════ */}
              {activeTab === "Reports" && (
                <div className="space-y-4">
                  {/* Summary KPI strip */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Total Nodes", value: nodes.length, icon: Box, color: ACCENT },
                      { label: "Active Alerts", value: effectiveDisruptions.length, icon: AlertCircle, color: effectiveDisruptions.length > 0 ? RED : GREEN },
                      { label: "Compliance Hits", value: compliance.length, icon: Shield, color: compliance.length > 0 ? RED : GREEN },
                      { label: "Countries Exposed", value: countryData.length, icon: MapPin, color: YELLOW },
                    ].map(k => (
                      <div key={k.label} className="bg-card rounded-2xl p-4 border border-border shadow-soft flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-secondary grid place-items-center shrink-0">
                          <k.icon className="size-4" style={{ color: k.color }} />
                        </div>
                        <div>
                          <p className="font-display text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
                          <p className="text-[10px] text-muted-foreground">{k.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {aiLoading ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground bg-card rounded-2xl border border-border">
                      <Loader2 className="size-5 animate-spin mr-2" /> Compiling report…
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {effectiveDisruptions.map((d, idx) => (
                        <div key={d.id || idx} className="p-4 rounded-2xl bg-card border border-border shadow-soft">
                          <div className="flex justify-between items-start mb-3">
                            <RiskBadge level={d.severity ?? "unknown"} />
                            <span className="text-[10px] text-muted-foreground font-mono">{d.country_iso}</span>
                          </div>
                          <p className="font-semibold text-sm mb-1">{d.title}</p>
                          <p className="text-xs text-muted-foreground mb-3">{d.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase">{d.event_type?.replace("_", " ")}</span>
                            <span className="text-[10px] text-muted-foreground">Source: {d.source}</span>
                          </div>
                        </div>
                      ))}
                      {effectiveDisruptions.length === 0 && (
                        <div className="col-span-2 p-10 text-center bg-card rounded-2xl border border-border">
                          <Shield className="size-10 mx-auto mb-3 text-green-500" />
                          <p className="font-semibold">All Clear</p>
                          <p className="text-xs text-muted-foreground mt-1">No active disruption alerts</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Trend area at bottom */}
                  {nodes.length > 0 && (
                    <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Node Volume by Tier</p>
                      <ResponsiveContainer width="100%" height={140}>
                        <AreaChart data={tierData.map(t => ({ ...t, volume: nodes.filter(n => `T${n.tier}` === t.tier).reduce((s, n) => s + (n.shipment_volume || 0), 0) }))}>
                          <defs>
                            <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={ACCENT} stopOpacity={0.4} />
                              <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="tier" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} width={36} />
                          <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                          <Area type="monotone" dataKey="volume" stroke={ACCENT} fill="url(#repGrad)" strokeWidth={2} name="Volume (kg)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
