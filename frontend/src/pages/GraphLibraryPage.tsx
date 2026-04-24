import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {
  Library, RefreshCw, Trash2, MapPin, Package, Globe2,
  TrendingUp, AlertTriangle, Shield, ChevronRight, ExternalLink,
  Layers, ArrowUpRight, Search, Clock
} from 'lucide-react';
import { getCachedGraphLibrary, clearGraphLibrary } from '../utils/api';
import type { GraphLibraryEntry } from '../utils/api';
import Navbar from '../components/site/Navbar';

// ── Palette ────────────────────────────────────────────────────────────────
const COLORS = ['#6366f1', '#818cf8', '#22c55e', '#eab308', '#f97316', '#ef4444'];
const RISK_COLORS = { low: '#22c55e', medium: '#eab308', high: '#f97316', critical: '#ef4444' };

// ── Utility helpers ────────────────────────────────────────────────────────
function formatVolume(kg: number): string {
  if (kg >= 1_000_000) return `${(kg / 1_000_000).toFixed(1)}M kg`;
  if (kg >= 1_000) return `${(kg / 1_000).toFixed(0)}K kg`;
  return `${kg} kg`;
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function RiskBadge({ level }: { level: string }) {
  const cfg: Record<string, string> = {
    low: 'bg-green-500/10 text-green-600 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    high: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${cfg[level] ?? cfg.low}`}>
      {level}
    </span>
  );
}

// ── Stat pill ──────────────────────────────────────────────────────────────
function StatPill({ icon: Icon, label, value, color = '#6366f1' }: {
  icon: any; label: string; value: string | number; color?: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-secondary/60 rounded-xl px-3 py-2">
      <Icon className="size-3.5 shrink-0" style={{ color }} />
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className="text-xs font-bold ml-auto" style={{ color }}>{value}</span>
    </div>
  );
}

// ── Entry card component ───────────────────────────────────────────────────
function GraphCard({
  entry, isSelected, onClick
}: { entry: GraphLibraryEntry; isSelected: boolean; onClick: () => void }) {
  const riskData = Object.entries(entry.risk_distribution)
    .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
    .filter(d => d.value > 0);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
        isSelected
          ? 'bg-accent/10 border-accent shadow-lg shadow-accent/10'
          : 'bg-card border-border hover:border-accent/40 hover:bg-accent/5'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="size-6 rounded-lg bg-accent/15 grid place-items-center shrink-0">
              <Globe2 className="size-3.5 text-accent" />
            </span>
            <p className="font-bold text-sm truncate">{entry.company}</p>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono ml-8">{entry.country} · Traced {timeAgo(entry.cached_at)}</p>
        </div>
        <ChevronRight className={`size-4 text-muted-foreground shrink-0 mt-1 transition-transform ${isSelected ? 'rotate-90 text-accent' : ''}`} />
      </div>

      {/* Mini stats row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 rounded-xl bg-secondary/50">
          <p className="text-lg font-bold leading-none" style={{ color: '#6366f1' }}>{entry.total_nodes}</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">Nodes</p>
        </div>
        <div className="text-center p-2 rounded-xl bg-secondary/50">
          <p className="text-lg font-bold leading-none" style={{ color: '#22c55e' }}>{entry.total_tiers}</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">Tiers</p>
        </div>
        <div className="text-center p-2 rounded-xl bg-secondary/50">
          <p className="text-lg font-bold leading-none" style={{ color: entry.high_risk_count > 0 ? '#ef4444' : '#22c55e' }}>
            {entry.high_risk_count}
          </p>
          <p className="text-[9px] text-muted-foreground mt-0.5">High Risk</p>
        </div>
      </div>

      {/* Risk donut mini */}
      {riskData.length > 0 && (
        <div className="flex items-center gap-2">
          <PieChart width={36} height={36}>
            <Pie data={riskData} cx={14} cy={14} outerRadius={14} innerRadius={8} dataKey="value" strokeWidth={0}>
              {riskData.map((d, i) => (
                <Cell key={i} fill={RISK_COLORS[d.name.toLowerCase() as keyof typeof RISK_COLORS] ?? COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className="flex flex-wrap gap-1">
            {riskData.map((d, i) => (
              <span key={i} className="text-[9px] text-muted-foreground flex items-center gap-1">
                <span className="size-1.5 rounded-full shrink-0" style={{ background: RISK_COLORS[d.name.toLowerCase() as keyof typeof RISK_COLORS] ?? COLORS[i] }} />
                {d.value} {d.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}

// ── Detail panel ────────────────────────────────────────────────────────────
function GraphDetail({ entry }: { entry: GraphLibraryEntry }) {
  const countryData = Object.entries(entry.country_distribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const riskData = Object.entries(entry.risk_distribution)
    .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  const tierVolume = (entry.hub_locations || []).reduce((acc, h) => {
    const t = `T${h.tier}`;
    acc[t] = (acc[t] || 0) + h.inbound_edges;
    return acc;
  }, {} as Record<string, number>);
  const tierData = Object.entries(tierVolume).map(([tier, edges]) => ({ tier, edges }));

  return (
    <div className="flex-1 overflow-y-auto space-y-5 pr-1">
      {/* Company header */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-5 border border-accent/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Traced Graph</p>
            <h2 className="text-2xl font-bold">{entry.company}</h2>
            <p className="text-sm text-muted-foreground mt-1 font-mono">{entry.country} · {entry.total_tiers} tiers deep</p>
          </div>
          <Link
            to={`/trace?company=${encodeURIComponent(entry.company)}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent/90 transition-colors shrink-0"
          >
            Open Trace <ExternalLink className="size-3.5" />
          </Link>
        </div>

        {/* Headline stats */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Nodes', value: entry.total_nodes, color: '#6366f1' },
            { label: 'Edges', value: entry.total_edges, color: '#818cf8' },
            { label: 'Countries', value: entry.countries_exposed.length, color: '#22c55e' },
            { label: 'Volume', value: formatVolume(entry.total_volume_kg), color: '#eab308' },
          ].map(s => (
            <div key={s.label} className="bg-white/50 dark:bg-black/20 rounded-xl p-3 text-center border border-white/30">
              <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 suppliers */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <Package className="size-3.5 text-accent" /> Top 3 Tier-1 Suppliers
        </p>
        {entry.top_suppliers.length > 0 ? (
          <div className="space-y-3">
            {entry.top_suppliers.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
                <div className="size-8 rounded-full grid place-items-center shrink-0 font-bold text-sm"
                  style={{ background: `${COLORS[i]}20`, color: COLORS[i] }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{s.name}</p>
                  <p className="text-[10px] text-muted-foreground">{s.city || s.country} · Tier {s.tier}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: COLORS[i] }}>{formatVolume(s.shipment_volume)}</p>
                  <div className="flex flex-wrap gap-1 justify-end mt-1">
                    {s.hs_codes.slice(0, 2).map(hs => (
                      <span key={hs} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">{hs}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-6">No supplier data in this snapshot</p>
        )}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Country exposure */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Globe2 className="size-3.5 text-accent" /> Country Exposure
          </p>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={countryData} layout="vertical" barSize={12} margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={26} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 11 }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} label={{ position: 'right', fontSize: 9, fill: '#94a3b8' }}>
                {countryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk distribution */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Shield className="size-3.5 text-accent" /> Risk Distribution
          </p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={riskData.filter(d => d.value > 0)} cx="50%" cy="50%" outerRadius={55} innerRadius={32} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {riskData.map((d, i) => (
                  <Cell key={i} fill={RISK_COLORS[d.name.toLowerCase() as keyof typeof RISK_COLORS] ?? COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {riskData.filter(d => d.value > 0).map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-[10px]">
                <span className="size-2 rounded-full" style={{ background: RISK_COLORS[d.name.toLowerCase() as keyof typeof RISK_COLORS] ?? '#6366f1' }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="font-bold ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hub Locations */}
      {entry.hub_locations.length > 0 && (
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <MapPin className="size-3.5 text-accent" /> Key Hub Locations
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {entry.hub_locations.map((hub, i) => (
              <div key={hub.name} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-secondary/30">
                <div className="size-8 rounded-xl grid place-items-center shrink-0"
                  style={{ background: `${COLORS[i % COLORS.length]}15`, color: COLORS[i % COLORS.length] }}>
                  <MapPin className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{hub.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {hub.city || hub.country} · T{hub.tier}
                    {hub.role && hub.role !== 'unknown' && ` · ${hub.role}`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold" style={{ color: COLORS[i % COLORS.length] }}>{hub.inbound_edges}</p>
                  <p className="text-[9px] text-muted-foreground">flows</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HS Codes */}
      {entry.hs_codes.length > 0 && (
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Layers className="size-3.5 text-accent" /> HS Codes Traced
          </p>
          <div className="flex flex-wrap gap-2">
            {entry.hs_codes.map(hs => (
              <span key={hs} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-accent/10 border border-accent/25 text-accent">{hs}</span>
            ))}
          </div>
        </div>
      )}

      {/* Tier connectivity bar */}
      {tierData.length > 0 && (
        <div className="bg-card rounded-2xl p-5 border border-border">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="size-3.5 text-accent" /> Tier Connectivity
          </p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={tierData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="tier" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={20} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 11 }} />
              <Bar dataKey="edges" name="Inbound Flows" radius={[6, 6, 0, 0]}>
                {tierData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function GraphLibraryPage() {
  const [entries, setEntries] = useState<GraphLibraryEntry[]>([]);
  const [selected, setSelected] = useState<GraphLibraryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCachedGraphLibrary();
      const list = data.entries ?? [];
      setEntries(list);
      if (list.length > 0 && !selected) setSelected(list[0]);
    } catch (e) {
      setError('Failed to load graph library. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleClear = async () => {
    if (!confirm('Clear all cached graphs from the library?')) return;
    setClearing(true);
    await clearGraphLibrary();
    setEntries([]);
    setSelected(null);
    setClearing(false);
  };

  const filtered = entries.filter(e =>
    e.company.toLowerCase().includes(search.toLowerCase()) ||
    e.country?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col">
        {/* Page header */}
        <div className="border-b border-border bg-card/60 backdrop-blur-md px-6 py-5">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-accent/15 grid place-items-center">
                <Library className="size-5 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Graph Library</h1>
                <p className="text-xs text-muted-foreground">
                  {entries.length} cached supply chain{entries.length !== 1 ? 's' : ''} · auto-updated on every trace
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search companies…"
                  className="pl-8 pr-3 py-2 text-sm rounded-xl border border-border bg-secondary/50 focus:outline-none focus:border-accent w-48"
                />
              </div>
              <button
                onClick={load}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-secondary text-sm hover:bg-secondary/80 transition-colors"
              >
                <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              {entries.length > 0 && (
                <button
                  onClick={handleClear}
                  disabled={clearing}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden max-w-screen-2xl mx-auto w-full">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="size-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">Loading graph library…</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3 p-8 rounded-2xl border border-red-500/20 bg-red-500/5 max-w-sm">
                <AlertTriangle className="size-8 text-red-400 mx-auto" />
                <p className="font-semibold text-sm">{error}</p>
                <button onClick={load} className="text-xs text-accent underline">Try again</button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4 p-10">
                <div className="size-16 rounded-2xl bg-accent/10 grid place-items-center mx-auto">
                  <Library className="size-8 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-lg">No graphs cached yet</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                    {search
                      ? 'No results match your search.'
                      : 'Run a supply chain trace on the Trace page — graphs are automatically cached here when complete.'}
                  </p>
                </div>
                <Link
                  to="/trace"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors"
                >
                  Go to Trace <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Left sidebar — cards list */}
              <div className="w-80 shrink-0 border-r border-border overflow-y-auto p-4 space-y-2.5 bg-background/60">
                <div className="flex items-center justify-between px-1 mb-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {filtered.length} graph{filtered.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" /> newest first
                  </p>
                </div>
                {filtered
                  .sort((a, b) => new Date(b.cached_at).getTime() - new Date(a.cached_at).getTime())
                  .map(entry => (
                    <GraphCard
                      key={entry.company}
                      entry={entry}
                      isSelected={selected?.company === entry.company}
                      onClick={() => setSelected(entry)}
                    />
                  ))}
              </div>

              {/* Right detail panel */}
              <div className="flex-1 overflow-y-auto p-6 bg-background">
                {selected ? (
                  <GraphDetail entry={selected} />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    Select a company to view details
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
