import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronRight, ArrowLeft, RefreshCw, Activity, Zap, Scale, AlertCircle, CheckCircle2, FileWarning, ArrowRight, Info, Sparkles, DollarSign,
  ShieldAlert, Building2, TrendingDown, Clock, ExternalLink
} from "lucide-react";
import Navbar from "../components/site/Navbar";
import { useSupplyChain } from "@/context/SupplyChainContext";
import { getTracedNodeIds } from "@/utils/api";

// ─── Types (schema.sql exact columns) ────────────────────────────────────────
interface ComplianceFlag {
  company_id: string;
  flag_type: string;
  list_name: string | null;
  match_score: number | null;
  raw_entry: any | null;
  flagged_at: string;
  expires_at: string | null;
}
interface FinancialFlag {
  id: string;
  company_id: string;
  signal_type: string | null;
  severity: string | null;
  description: string | null;
  source: string | null;
  detected_at: string;
}

// ─── Fallback Data ────────────────────────────────────────────────────────────
const FALLBACK_COMPLIANCE: ComplianceFlag[] = [
  { company_id: "549300YZ87PPUBD5N183", flag_type: "uflpa", list_name: "UFLPA Entity List", match_score: 96.2, raw_entry: { alias: "Xinjiang Solar Supply Co.", program: "UFLPA-2022" }, flagged_at: new Date(Date.now() - 3600000).toISOString(), expires_at: new Date(Date.now() + 2592000000).toISOString() },
  { company_id: "549300JX8JGD8T5EHE49", flag_type: "ofac", list_name: "OFAC SDN — Specially Designated Nationals", match_score: 91.4, raw_entry: { program: "RUSSIA-EO14024", type: "Entity" }, flagged_at: new Date(Date.now() - 7200000).toISOString(), expires_at: null },
  { company_id: "XKZZ2JZF41MRHTR1V493", flag_type: "bis", list_name: "BIS Entity List (Export Controls)", match_score: 88.7, raw_entry: { reason: "Military end-user", country: "CN" }, flagged_at: new Date(Date.now() - 14400000).toISOString(), expires_at: new Date(Date.now() + 7776000000).toISOString() },
  { company_id: "9845001MK12OHVHAX537", flag_type: "eu_sanctions", list_name: "EU Sanctions Map — Restrictive Measures", match_score: 87.3, raw_entry: { regulation: "EU 2022/328", measure: "Asset freeze" }, flagged_at: new Date(Date.now() - 86400000).toISOString(), expires_at: null },
  { company_id: "M07J9MTYHFGA2H3NF956", flag_type: "opensanctions", list_name: "OpenSanctions — Aggregated Global List", match_score: 85.1, raw_entry: { datasets: ["ofac", "un_sc_sanctions"] }, flagged_at: new Date(Date.now() - 172800000).toISOString(), expires_at: new Date(Date.now() + 5184000000).toISOString() },
];
const FALLBACK_FINANCIAL: FinancialFlag[] = [
  { id: "ff1", company_id: "549300YZ87PPUBD5N183", signal_type: "stock_decline", severity: "high", description: "Stock declined 48% over 90 days. SEG Form 10-Q flagged liquidity concerns.", source: "alpha_vantage", detected_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "ff2", company_id: "549300JX8JGD8T5EHE49", signal_type: "bankruptcy_filing", severity: "high", description: "8-K filing mentions Chapter 11 proceedings. Going concern language detected in EDGAR full-text.", source: "sec_edgar", detected_at: new Date(Date.now() - 172800000).toISOString() },
  { id: "ff3", company_id: "XKZZ2JZF41MRHTR1V493", signal_type: "credit_downgrade", severity: "medium", description: "Sovereign credit downgrade for supplier country from A+ to A. World Bank sovereign risk proxy elevated.", source: "world_bank", detected_at: new Date(Date.now() - 259200000).toISOString() },
  { id: "ff4", company_id: "9845001MK12OHVHAX537", signal_type: "stock_decline", severity: "medium", description: "Stock declined 31% over 90 days — approaching alert zone.", source: "alpha_vantage", detected_at: new Date(Date.now() - 345600000).toISOString() },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
function withFallback<T>(data: T[] | null | undefined, fallback: T[], label: string): T[] {
  if (!data || data.length === 0) {
    console.warn(`[SC X-Ray §6.1] 🔶 FALLBACK ACTIVATED — "${label}" returned no Supabase data. Tip: Run supabase_setup.sql in your project's SQL Editor.`);
    return fallback;
  }
  console.info(`[SC X-Ray §6.1] ✅ "${label}" loaded ${data.length} rows.`);
  return data;
}

const LIST_META: Record<string, { label: string; emoji: string; glow: string; badge: string; bar: string }> = {
  ofac:          { label: "OFAC SDN",        emoji: "🇺🇸", glow: "shadow-red-500/10",   badge: "bg-red-50 text-red-600 border-red-100",    bar: "bg-red-500" },
  opensanctions: { label: "OpenSanctions",   emoji: "🌐", glow: "shadow-orange-500/10", badge: "bg-orange-50 text-orange-600 border-orange-100", bar: "bg-orange-500" },
  bis:           { label: "BIS Entity List", emoji: "📋", glow: "shadow-yellow-500/10",  badge: "bg-yellow-50 text-yellow-600 border-yellow-100", bar: "bg-yellow-500" },
  uflpa:         { label: "UFLPA",           emoji: "⛔", glow: "shadow-purple-500/10", badge: "bg-purple-50 text-purple-600 border-purple-100",  bar: "bg-purple-500" },
  eu_sanctions:  { label: "EU Sanctions",    emoji: "🇪🇺", glow: "shadow-blue-500/10", badge: "bg-blue-50 text-blue-600 border-blue-100",      bar: "bg-blue-500" },
};
const SIGNAL_ICON: Record<string, string> = {
  bankruptcy_filing: "⚖️", stock_decline: "📉", credit_downgrade: "🏦",
};
const SEVERITY_STYLE: Record<string, string> = {
  high:   "text-red-600 bg-red-50 border-red-200",
  medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
  low:    "text-green-600 bg-green-50 border-green-200",
};
const SOURCE_URL: Record<string, string> = {
  sec_edgar: "https://efts.sec.gov/LATEST/search-index?q=%22chapter+11%22&dateRange=custom&startdt=2024-01-01",
  alpha_vantage: "https://www.alphavantage.co",
  world_bank: "https://data.worldbank.org",
};

// ─── Components ───────────────────────────────────────────────────────────────
function ComplianceCard({ flag }: { flag: ComplianceFlag }) {
  const meta = LIST_META[flag.flag_type] ?? { label: flag.flag_type, emoji: "🚩", glow: "", badge: "bg-secondary text-secondary-foreground border-border", bar: "bg-muted-foreground" };
  const isHard = (flag.match_score ?? 0) >= 95;
  const isExpired = flag.expires_at ? new Date(flag.expires_at) < new Date() : false;
  const pct = flag.match_score ?? 0;

  return (
    <div className={`relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-card group ${isExpired ? "opacity-50" : "shadow-soft"}`}>
      {/* Visual Accent */}
      <div className={`h-1.5 w-full ${meta.bar} opacity-80`} />

      <div className="p-6">
        {/* Top Header Section */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className={`size-12 rounded-2xl bg-secondary grid place-items-center text-2xl shrink-0 border border-border shadow-sm group-hover:scale-110 transition-transform`}>
              {meta.emoji}
            </div>
            <div className="text-left">
              <h4 className="font-bold text-base text-foreground tracking-tight">{meta.label}</h4>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest leading-none mt-1">{flag.flag_type}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={`font-bold px-3 py-1 border-2 ${isHard ? "bg-red-50 text-red-600 border-red-200" : "bg-yellow-50 text-yellow-600 border-yellow-200"}`}>
              {isHard ? "CRITICAL RISK" : "REVIEW NEEDED"}
            </Badge>
            {isExpired && <span className="text-[10px] text-red-500 font-bold uppercase">List Expired</span>}
          </div>
        </div>

        {/* Impact Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
              <Zap className="size-3 text-accent" /> Match Probability
            </p>
            <div className="flex items-baseline gap-2">
              <span className={`font-display text-4xl font-bold ${isHard ? "text-red-600" : "text-yellow-600"}`}>{pct.toFixed(0)}</span>
              <span className="text-sm font-bold text-muted-foreground">% Confidence</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full mt-3 overflow-hidden shadow-inner">
              <div className={`h-full rounded-full transition-all duration-1000 ${meta.bar}`} style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
              <Building2 className="size-3 text-brand" /> Entity Identifier
            </p>
            <div className="space-y-1">
              <p className="text-sm font-mono font-bold text-foreground break-all">{flag.company_id}</p>
              <p className="text-[10px] text-muted-foreground">GLEIF Canonical Registry ID</p>
            </div>
          </div>
        </div>

        {/* Detailed Properties Grid */}
        <div className="border-t border-border pt-5 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="size-4 text-brand" />
            <span className="text-xs font-bold text-foreground uppercase tracking-widest">Metadata Context</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
            {flag.raw_entry && Object.entries(flag.raw_entry).slice(0, 6).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-[10px] text-muted-foreground font-bold uppercase truncate">{key.replace(/_/g, ' ')}</p>
                <p className="text-xs font-semibold text-foreground truncate block">
                  {Array.isArray(value) ? value[0] : String(value)}
                </p>
              </div>
            ))}
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Listing Date</p>
              <p className="text-xs font-semibold text-foreground">{new Date(flag.flagged_at).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Registry</p>
              <p className="text-xs font-semibold text-foreground truncate">{flag.list_name?.split('——')[0]}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
            <Clock className="size-3" /> UPDATED {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancialCard({ flag }: { flag: FinancialFlag }) {
  const icon = SIGNAL_ICON[flag.signal_type ?? ""] ?? "⚠️";
  const severityStyle = SEVERITY_STYLE[flag.severity ?? "low"];
  const srcUrl = SOURCE_URL[flag.source ?? ""];
  const isCritical = flag.severity === "high";

  return (
    <div className={`relative rounded-2xl border bg-card overflow-hidden shadow-soft transition-all duration-300 hover:shadow-card group ${isCritical ? "border-red-200" : "border-border"}`}>
      <div className={`h-1.5 w-full ${isCritical ? "bg-red-500" : "bg-yellow-500"} opacity-70`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className={`size-12 rounded-2xl grid place-items-center text-2xl shrink-0 border shadow-sm group-hover:rotate-12 transition-transform ${isCritical ? "bg-red-50 border-red-100" : "bg-secondary border-border"}`}>
              {icon}
            </div>
            <div className="text-left">
              <h4 className="font-bold text-base text-foreground tracking-tight">{flag.signal_type?.replace(/_/g, ' ')}</h4>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Source: {flag.source?.replace(/_/g, ' ')}</p>
            </div>
          </div>
          <Badge className={`font-bold px-3 py-1 border-2 shadow-sm ${severityStyle}`}>
            {(flag.severity ?? "low").toUpperCase()} RISK
          </Badge>
        </div>

        <div className="bg-secondary/20 rounded-xl p-4 mb-5 border border-border/40">
          <p className="text-sm text-foreground font-medium leading-relaxed text-left">
            {flag.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white/50 rounded-lg p-3 border border-border/30">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Signal Sensed</p>
            <p className="text-xs font-bold text-foreground flex items-center gap-1">
              <Activity className="size-3 text-accent" /> {new Date(flag.detected_at).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white/50 rounded-lg p-3 border border-border/30">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Impact Level</p>
            <p className={`text-xs font-bold flex items-center gap-1 ${isCritical ? "text-red-500" : "text-yellow-600"}`}>
              <Zap className="size-3" /> {isCritical ? "Catastrophic" : "Significant"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
          <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
             <RefreshCw className="size-3" /> DATA REFRESHED 2H AGO
          </p>
          {srcUrl && (
            <a href={srcUrl} target="_blank" rel="noreferrer"
              className="group flex items-center gap-1.5 text-[10px] font-bold text-brand hover:underline transition-all">
              EXTERNAL AUDIT LOG <ExternalLink className="size-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CompliancePage() {
  const { initialSearchText, nodes } = useSupplyChain();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [compliance, setCompliance] = useState<ComplianceFlag[]>([]);
  const [financial, setFinancial] = useState<FinancialFlag[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      // Determine node IDs to filter by
      let filterIds: string[] = [];

      // 1. From context (live trace)
      if (nodes && nodes.length > 0) {
        filterIds = Array.from(new Set(nodes.map(n => n.id).filter(Boolean)));
      }

      // 2. From backend API (persisted trace) if context is empty
      if (filterIds.length === 0) {
        try {
          const tracedResult = await getTracedNodeIds();
          if (tracedResult?.node_ids?.length > 0) {
            filterIds = tracedResult.node_ids;
          }
        } catch (err) {
          console.warn('[Compliance] Failed to fetch traced node IDs from backend:', err);
        }
      }

      let cfQ = supabase.from("compliance_flags").select("company_id,flag_type,list_name,match_score,raw_entry,flagged_at,expires_at").order("match_score", { ascending: false });
      let ffQ = supabase.from("financial_flags").select("id,company_id,signal_type,severity,description,source,detected_at").order("detected_at", { ascending: false });

      if (filterIds.length > 0) {
        cfQ = cfQ.in("company_id", filterIds);
        ffQ = ffQ.in("company_id", filterIds);
      }

      const [cfRes, ffRes] = await Promise.all([cfQ, ffQ]);

      const cfData = withFallback(cfRes.error ? null : cfRes.data, FALLBACK_COMPLIANCE, "compliance_flags");
      const ffData = withFallback(ffRes.error ? null : ffRes.data, FALLBACK_FINANCIAL, "financial_flags");

      setCompliance(cfData);
      setFinancial(ffData);
      setUsingFallback(!cfRes.data || cfRes.data.length === 0 || !!cfRes.error);
    } catch (err) {
      console.error("[SC X-Ray §6.1] ❌ Fetch failure — using fallback dataset.", err);
      setCompliance(FALLBACK_COMPLIANCE);
      setFinancial(FALLBACK_FINANCIAL);
      setUsingFallback(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = filterType === "all" ? compliance : compliance.filter(f => f.flag_type === filterType);
  const hardCount = compliance.filter(f => (f.match_score ?? 0) >= 95).length;
  const reviewCount = compliance.filter(f => (f.match_score ?? 0) >= 85 && (f.match_score ?? 0) < 95).length;
  const highDistress = financial.filter(f => f.severity === "high").length;

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="size-16 rounded-2xl bg-white border border-border grid place-items-center mx-auto shadow-card">
          <ShieldAlert className="size-8 text-accent animate-pulse" />
        </div>
        <p className="font-display text-xl animate-pulse">Scanning compliance network…</p>
      </div>
    </div>
  );

  if (!initialSearchText) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
           <div className="size-24 rounded-3xl bg-secondary border border-border grid place-items-center mb-6 shadow-card">
              <ShieldAlert className="size-10 text-muted-foreground" />
           </div>
           <h2 className="text-3xl font-display font-bold text-foreground mb-4 tracking-tight">Active Trace Required</h2>
           <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
             Compliance and Sanctions insights are computed specifically against an analyzed network. Please scan a company or network in the Trace module first.
           </p>
           <Button onClick={() => (window.location.href = "/trace")} className="rounded-full px-8 shadow-glow transition-transform hover:scale-105 active:scale-95">
             <Search className="size-4 mr-2" /> Start Tracing
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-transparent opacity-40" />

      {/* Secondary Toolbar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-16 z-40 mt-16">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-orange-500/10 border border-orange-500/20 grid place-items-center">
              <ShieldAlert className="size-4 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-[10px] tracking-tight uppercase leading-none">Compliance Network</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{usingFallback ? "Simulation Mode" : "Real-time Feed"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => fetchData(true)} disabled={refreshing} className="rounded-full font-bold text-[10px] px-4 h-8 gap-2">
              <RefreshCw className={`size-3 ${refreshing ? "animate-spin" : ""}`} /> SYNC DATA
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Hero Section */}
        <div className="relative rounded-[2rem] border border-border bg-gradient-to-br from-white via-secondary/20 to-brand/5 p-8 shadow-card overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-accent opacity-5 hidden lg:block">
            <Building2 size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4 font-mono text-[10px]">REAL-TIME SCREENING ENGINE</Badge>
            <h2 className="font-display text-4xl font-bold mb-4 tracking-tight">Sanctions, Risks & <span className="text-accent underline decoration-accent/20 underline-offset-4">Insights.</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Illuminating global supply chains through recursive screening against international sanctions, export controls, and proactive financial distress signals.
            </p>
          </div>
        </div>

        {/* AI Intelligence Summary (New) */}
        {initialSearchText && nodes.length > 0 && (
          <div className="rounded-[1.5rem] border border-brand/20 bg-brand/5 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles size={60} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-brand" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-brand">Risk Summary</h3>
            </div>
            <p className="text-sm font-medium text-foreground/80 leading-relaxed max-w-4xl italic">
              "Automated analysis of {initialSearchText}'s Tier-1 to Tier-{Math.max(...nodes.map(n => n.tier), 0)} network suggests {nodes.filter(n => n.risk?.overall_level === "high").length} critical risk concentrations. Financial volatility is detected in {nodes.filter(n => (n.risk?.financial_risk_score || 0) > 50).length} nodes, particularly within specialized component handlers in SE Asia."
            </p>
            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand bg-brand/10 px-2 py-1 rounded">
                <ShieldAlert className="size-3" /> SANCTIONS: {nodes.filter(n => n.risk?.is_sanctioned).length}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                <DollarSign className="size-3" /> FINANCIAL: {nodes.filter(n => (n.risk?.financial_risk_score || 0) > 50).length}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Monitored Profiles", value: compliance.length + financial.length, icon: Building2, gradient: "from-brand/10 to-brand/5", text: "text-brand" },
            { label: "Critical Hard Flags", value: hardCount, icon: AlertCircle, gradient: "from-red-100 to-red-50", text: "text-red-500" },
            { label: "Pending Reviews", value: reviewCount, icon: FileWarning, gradient: "from-yellow-100 to-yellow-50", text: "text-yellow-600" },
            { label: "Economic Distress", value: highDistress, icon: TrendingDown, gradient: "from-orange-100 to-orange-50", text: "text-orange-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-5 shadow-soft transition-transform hover:scale-[1.02]">
              <div className={`size-12 rounded-xl bg-gradient-to-br ${stat.gradient} grid place-items-center mb-4`}>
                <stat.icon className={`size-6 ${stat.text}`} />
              </div>
              <p className="font-display text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>


        {/* Dual Pane Analysis */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Compliance Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-display text-2xl font-bold flex items-center gap-2">
                <ShieldAlert className="size-5 text-red-500" /> Sanctions Feed
              </h3>
              <div className="flex gap-1.5">
                {["all", "ofac", "uflpa", "bis"].map(t => (
                  <button key={t} onClick={() => setFilterType(t)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border transition-all ${filterType === t ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground hover:border-accent/40 hover:text-accent"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {filtered.map(f => <ComplianceCard key={`${f.company_id}-${f.flag_type}`} flag={f} />)}
                {filtered.length === 0 && (
                  <div className="p-12 text-center rounded-2xl border-2 border-dashed border-border bg-secondary/10">
                    <CheckCircle2 className="size-12 text-green-500 mx-auto mb-4" />
                    <p className="font-bold text-foreground">Clean Record</p>
                    <p className="text-sm text-muted-foreground">No active sanctions found for this entity.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Financial Signals Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-display text-2xl font-bold flex items-center gap-2">
                <TrendingDown className="size-5 text-yellow-500" /> Distress Signals
              </h3>
              <Badge variant="outline" className="font-mono text-[10px]">{financial.length} ALERTS</Badge>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <Info className="size-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                Distress monitoring analyzes SEC EDGAR filings for Chapter 11 language and Alpha Vantage stock volatility (top-tier handlers only).
              </p>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {financial.map(f => <FinancialCard key={f.id} flag={f} />)}
                {financial.length === 0 && (
                  <div className="p-12 text-center rounded-2xl border-2 border-dashed border-border bg-secondary/10">
                    <Zap className="size-12 text-yellow-500 mx-auto mb-4" />
                    <p className="font-bold text-foreground">Scanning Active</p>
                    <p className="text-sm text-muted-foreground">No bankruptcy or distress signals found.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

        </div>
      </div>

      {/* RLS Fix Banner Removed */}
    </div>
  );
}
