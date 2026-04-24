// @ts-nocheck
import { useState, useCallback, useMemo } from "react";
import {
  Shield, Globe2, AlertTriangle, Zap, TrendingDown,
  Anchor, Factory, Cloud, RefreshCw, ChevronRight,
  Cpu, X, Search, Activity,
} from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import Navbar from "../components/Navbar";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TradeInsight {
  category: string;
  score: number;
  band: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
  icon: string;
}

interface CountryRisk {
  country_iso: string;
  country_name: string;
  overall_score: number;
  risk_band: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  summary: string;
  trade_insights: TradeInsight[];
  key_exports: string[];
  key_imports: string[];
  top_trade_partners: string[];
  sanctions_status: "CLEAN" | "WATCH" | "PARTIAL" | "SANCTIONED";
  sanctions_detail: string;
  ai_confidence: number;
  last_updated: string;
  cached?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const BAND_COLORS: Record<string, string> = {
  LOW: "#10b981",
  MEDIUM: "#f59e0b",
  HIGH: "#f97316",
  CRITICAL: "#ef4444",
};

const SANCTIONS_COLORS: Record<string, string> = {
  CLEAN: "#10b981",
  WATCH: "#f59e0b",
  PARTIAL: "#f97316",
  SANCTIONED: "#ef4444",
};

// Countries with lat/lng for Leaflet markers
const COUNTRY_MARKERS: Array<{ iso2: string; name: string; lat: number; lng: number }> = [
  { iso2: "US", name: "United States", lat: 39.8, lng: -98.5 },
  { iso2: "CA", name: "Canada", lat: 56.1, lng: -106.3 },
  { iso2: "MX", name: "Mexico", lat: 23.6, lng: -102.5 },
  { iso2: "BR", name: "Brazil", lat: -14.2, lng: -51.9 },
  { iso2: "AR", name: "Argentina", lat: -38.4, lng: -63.6 },
  { iso2: "CL", name: "Chile", lat: -35.7, lng: -71.5 },
  { iso2: "CO", name: "Colombia", lat: 4.6, lng: -74.1 },
  { iso2: "PE", name: "Peru", lat: -9.2, lng: -75.0 },
  { iso2: "VE", name: "Venezuela", lat: 6.4, lng: -66.6 },
  { iso2: "EC", name: "Ecuador", lat: -1.8, lng: -78.2 },
  { iso2: "CU", name: "Cuba", lat: 21.5, lng: -77.8 },
  { iso2: "GB", name: "United Kingdom", lat: 55.4, lng: -3.4 },
  { iso2: "FR", name: "France", lat: 46.2, lng: 2.2 },
  { iso2: "DE", name: "Germany", lat: 51.2, lng: 10.4 },
  { iso2: "IT", name: "Italy", lat: 41.9, lng: 12.6 },
  { iso2: "ES", name: "Spain", lat: 40.5, lng: -3.7 },
  { iso2: "NL", name: "Netherlands", lat: 52.1, lng: 5.3 },
  { iso2: "CH", name: "Switzerland", lat: 46.8, lng: 8.2 },
  { iso2: "PL", name: "Poland", lat: 51.9, lng: 19.1 },
  { iso2: "RU", name: "Russia", lat: 61.5, lng: 105.3 },
  { iso2: "UA", name: "Ukraine", lat: 48.4, lng: 31.2 },
  { iso2: "TR", name: "Turkey", lat: 38.9, lng: 35.2 },
  { iso2: "NO", name: "Norway", lat: 60.5, lng: 8.5 },
  { iso2: "SE", name: "Sweden", lat: 60.1, lng: 18.6 },
  { iso2: "FI", name: "Finland", lat: 61.9, lng: 25.7 },
  { iso2: "GR", name: "Greece", lat: 39.1, lng: 21.8 },
  { iso2: "RO", name: "Romania", lat: 45.9, lng: 25.0 },
  { iso2: "CN", name: "China", lat: 35.9, lng: 104.2 },
  { iso2: "JP", name: "Japan", lat: 36.2, lng: 138.3 },
  { iso2: "KR", name: "South Korea", lat: 35.9, lng: 127.8 },
  { iso2: "TW", name: "Taiwan", lat: 23.7, lng: 121.0 },
  { iso2: "IN", name: "India", lat: 20.6, lng: 79.0 },
  { iso2: "PK", name: "Pakistan", lat: 30.4, lng: 69.3 },
  { iso2: "BD", name: "Bangladesh", lat: 23.7, lng: 90.4 },
  { iso2: "VN", name: "Vietnam", lat: 14.1, lng: 108.3 },
  { iso2: "TH", name: "Thailand", lat: 15.9, lng: 100.9 },
  { iso2: "MY", name: "Malaysia", lat: 4.2, lng: 101.9 },
  { iso2: "SG", name: "Singapore", lat: 1.4, lng: 103.8 },
  { iso2: "ID", name: "Indonesia", lat: -0.8, lng: 113.9 },
  { iso2: "PH", name: "Philippines", lat: 12.9, lng: 121.8 },
  { iso2: "MM", name: "Myanmar", lat: 21.9, lng: 96.0 },
  { iso2: "AU", name: "Australia", lat: -25.3, lng: 133.8 },
  { iso2: "NZ", name: "New Zealand", lat: -40.9, lng: 174.9 },
  { iso2: "EG", name: "Egypt", lat: 26.8, lng: 30.8 },
  { iso2: "ZA", name: "South Africa", lat: -30.6, lng: 22.9 },
  { iso2: "NG", name: "Nigeria", lat: 9.1, lng: 8.7 },
  { iso2: "KE", name: "Kenya", lat: -0.02, lng: 37.9 },
  { iso2: "ET", name: "Ethiopia", lat: 9.1, lng: 40.5 },
  { iso2: "GH", name: "Ghana", lat: 7.9, lng: -1.0 },
  { iso2: "SA", name: "Saudi Arabia", lat: 23.9, lng: 45.1 },
  { iso2: "AE", name: "UAE", lat: 23.4, lng: 53.8 },
  { iso2: "IQ", name: "Iraq", lat: 33.2, lng: 43.7 },
  { iso2: "IR", name: "Iran", lat: 32.4, lng: 53.7 },
  { iso2: "IL", name: "Israel", lat: 31.0, lng: 34.9 },
  { iso2: "KZ", name: "Kazakhstan", lat: 48.0, lng: 67.0 },
  { iso2: "AF", name: "Afghanistan", lat: 33.9, lng: 67.7 },
  { iso2: "MA", name: "Morocco", lat: 31.8, lng: -7.1 },
  { iso2: "DZ", name: "Algeria", lat: 28.0, lng: 1.7 },
  { iso2: "LY", name: "Libya", lat: 26.3, lng: 17.2 },
  { iso2: "SD", name: "Sudan", lat: 12.9, lng: 30.2 },
  { iso2: "CD", name: "Congo (DRC)", lat: -4.0, lng: 21.8 },
  { iso2: "AO", name: "Angola", lat: -11.2, lng: 17.9 },
  { iso2: "TZ", name: "Tanzania", lat: -6.4, lng: 34.9 },
  { iso2: "KP", name: "North Korea", lat: 40.3, lng: 127.5 },
  { iso2: "SS", name: "South Sudan", lat: 6.9, lng: 31.3 },
  { iso2: "SY", name: "Syria", lat: 34.8, lng: 39.0 },
  { iso2: "YE", name: "Yemen", lat: 15.6, lng: 48.5 },
  { iso2: "LK", name: "Sri Lanka", lat: 7.9, lng: 80.8 },
  { iso2: "HK", name: "Hong Kong", lat: 22.4, lng: 114.1 },
];

const ICON_MAP: Record<string, typeof Shield> = {
  shield: Shield,
  globe: Globe2,
  zap: Zap,
  alert: AlertTriangle,
  "trending-down": TrendingDown,
  anchor: Anchor,
  factory: Factory,
  cloud: Cloud,
};

// ─── Sub-Components ───────────────────────────────────────────────────────────
function RiskGauge({ score, band }: { score: number; band: string }) {
  const color = BAND_COLORS[band] || "#f59e0b";
  const r = 54;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ * 0.75;

  return (
    <svg width="140" height="100" viewBox="0 0 140 105">
      <circle cx="70" cy="80" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="10"
        strokeDasharray={`${circ * 0.75} ${circ}`}
        strokeLinecap="round" transform="rotate(-135 70 80)" />
      <circle cx="70" cy="80" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${filled} ${circ}`}
        strokeLinecap="round" transform="rotate(-135 70 80)"
        style={{ filter: `drop-shadow(0 0 8px ${color}60)`, transition: "stroke-dasharray 1.2s ease" }} />
      <text x="70" y="74" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="24" fontWeight="800" fontFamily="monospace">
        {Math.round(score)}
      </text>
      <text x="70" y="90" textAnchor="middle" fill={color} fontSize="10" fontWeight="700" letterSpacing="1">
        {band}
      </text>
    </svg>
  );
}

function InsightCard({ insight }: { insight: TradeInsight }) {
  const color = BAND_COLORS[insight.band] || "#f59e0b";
  const IconComp = ICON_MAP[insight.icon] || Shield;
  return (
    <div className="risk-insight-card" style={{ borderLeftColor: color }}>
      <div className="risk-insight-header">
        <div className="risk-insight-label">
          <span className="risk-insight-icon" style={{ background: `${color}18` }}>
            <IconComp size={14} style={{ color }} />
          </span>
          <span>{insight.category}</span>
        </div>
        <div className="risk-insight-score-group">
          <span className="risk-insight-val" style={{ color }}>{Math.round(insight.score)}</span>
          <span className="risk-insight-badge" style={{ background: `${color}18`, color }}>{insight.band}</span>
        </div>
      </div>
      <div className="risk-bar-bg">
        <div className="risk-bar-fill" style={{ width: `${insight.score}%`, background: color }} />
      </div>
      <p className="risk-insight-desc">{insight.description}</p>
    </div>
  );
}

function SkeletonPulse() {
  return (
    <div className="risk-skeleton">
      {[1, 0.85, 0.7, 0.9, 0.65, 0.8].map((w, i) => (
        <div key={i} className="risk-skeleton-line" style={{ width: `${w * 100}%`, height: i === 0 ? 90 : 70, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}

// ─── Leaflet helper: fly to selected country ──────────────────────────────────
function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.flyTo([lat, lng], 4, { duration: 1.5 });
  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RiskDashboardPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [riskCache, setRiskCache] = useState<Record<string, CountryRisk>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const currentRisk = selected ? riskCache[selected] : null;

  const fetchRisk = useCallback(async (iso2: string, force = false) => {
    if (!force && riskCache[iso2]) {
      setSelected(iso2);
      return;
    }
    setSelected(iso2);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/risk/country/${iso2}`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data: CountryRisk = await res.json();
      setRiskCache(prev => ({ ...prev, [iso2]: data }));
    } catch (e: any) {
      setError(e.message || "Failed to fetch risk data");
    } finally {
      setLoading(false);
    }
  }, [riskCache]);

  const filteredCountries = useMemo(() =>
    COUNTRY_MARKERS.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.iso2.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 30), [search]);

  const scannedCount = Object.keys(riskCache).length;
  const criticalCount = Object.values(riskCache).filter(r => r.risk_band === "CRITICAL").length;
  const highCount = Object.values(riskCache).filter(r => r.risk_band === "HIGH").length;

  const selectedMarker = COUNTRY_MARKERS.find(c => c.iso2 === selected);

  return (
    <div className="risk-page-root">
      <Navbar />

      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div className="risk-toolbar">
        <div className="risk-toolbar-left">
          <div className="risk-toolbar-icon">
            <Globe2 size={16} />
          </div>
          <div>
            <div className="risk-toolbar-title">RISK INTELLIGENCE</div>
            <div className="risk-toolbar-sub">Trade Risk Analysis</div>
          </div>
        </div>
        <div className="risk-toolbar-stats">
          {[
            { label: "Scanned", val: scannedCount, color: "hsl(var(--brand))" },
            { label: "Critical", val: criticalCount, color: "#ef4444" },
            { label: "High", val: highCount, color: "#f97316" },
          ].map(s => (
            <div key={s.label} className="risk-toolbar-stat">
              <span style={{ color: s.color }} className="risk-toolbar-stat-val">{s.val}</span>
              <span className="risk-toolbar-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Layout ────────────────────────────────────────── */}
      <div className="risk-layout" data-has-panel={selected ? "true" : "false"}>

        {/* LEFT: Map + Search */}
        <div className="risk-map-side">
          {/* Headline */}
          <div className="risk-headline">
            <div>
              <span className="risk-ai-tag">
                <Cpu size={10} /> INTELLIGENCE POWERED
              </span>
              <h1 className="risk-page-title">Global Trade Risk Monitor</h1>
              <p className="risk-page-desc">Click any country marker to get AI-generated trade risk scores</p>
            </div>
            <div className="risk-search-wrap">
              <Search size={13} className="risk-search-icon" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search country…" className="risk-search-input" />
              {search && (
                <div className="risk-search-dropdown">
                  {filteredCountries.map(c => (
                    <button key={c.iso2}
                      onClick={() => { fetchRisk(c.iso2); setSearch(""); }}
                      className="risk-search-item"
                    >
                      <span className="risk-search-iso">{c.iso2}</span>
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Leaflet Map */}
          <div className="risk-map-container">
            <MapContainer
              center={[20, 15]}
              zoom={2}
              minZoom={2}
              maxZoom={6}
              style={{ width: "100%", height: "100%" }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={12}
              />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                maxZoom={12}
              />
              {selected && selectedMarker && (
                <FlyTo lat={selectedMarker.lat} lng={selectedMarker.lng} />
              )}
              {COUNTRY_MARKERS.map(({ iso2, name, lat, lng }) => {
                const risk = riskCache[iso2];
                const isSelected = selected === iso2;
                const color = risk ? (BAND_COLORS[risk.risk_band] || "#6366f1") : "#6366f1";

                return (
                  <CircleMarker
                    key={iso2}
                    center={[lat, lng]}
                    radius={isSelected ? 10 : risk ? 8 : 5}
                    pathOptions={{
                      fillColor: risk ? color : "#6366f1",
                      fillOpacity: risk ? 0.85 : 0.5,
                      color: isSelected ? "#fff" : risk ? color : "#6366f1",
                      weight: isSelected ? 3 : 1.5,
                    }}
                    eventHandlers={{
                      click: () => fetchRisk(iso2),
                    }}
                  >
                    <Popup>
                      <div className="risk-map-popup">
                        <div className="risk-popup-name">{name}</div>
                        <div className="risk-popup-iso">{iso2}</div>
                        {risk && (
                          <div className="risk-popup-score" style={{ color }}>
                            Risk: {Math.round(risk.overall_score)} · {risk.risk_band}
                          </div>
                        )}
                        {!risk && (
                          <div className="risk-popup-hint">Click to analyse</div>
                        )}
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>

            {/* Legend */}
            <div className="risk-legend">
              {Object.entries(BAND_COLORS).map(([band, color]) => (
                <div key={band} className="risk-legend-item">
                  <span className="risk-legend-dot" style={{ background: color }} />
                  <span>{band}</span>
                </div>
              ))}
              <div className="risk-legend-item">
                <span className="risk-legend-dot" style={{ background: "#6366f1", opacity: .5 }} />
                <span>UNSCANNED</span>
              </div>
            </div>

            {/* Help hint */}
            {!selected && (
              <div className="risk-map-hint">
                <Activity size={12} /> Click a country marker on the map to analyse trade risk
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Detail Panel */}
        {selected && (
          <div className="risk-detail-panel">
            <div className="risk-detail-header">
              <div>
                <div className="risk-detail-label">TRADE RISK ANALYSIS</div>
                <h2 className="risk-detail-name">
                  {currentRisk?.country_name || COUNTRY_MARKERS.find(c => c.iso2 === selected)?.name || selected}
                </h2>
                <div className="risk-detail-iso">ISO: {selected}</div>
              </div>
              <div className="risk-detail-actions">
                {currentRisk && (
                  <button className="risk-btn-icon" title="Refresh" onClick={() => fetchRisk(selected, true)}>
                    <RefreshCw size={13} />
                  </button>
                )}
                <button className="risk-btn-icon" onClick={() => setSelected(null)}>
                  <X size={13} />
                </button>
              </div>
            </div>

            <div className="risk-detail-body">
              {loading ? (
                <>
                  <div className="risk-loading-center">
                    <div className="risk-spinner" />
                    <span></span>
                  </div>
                  <SkeletonPulse />
                </>
              ) : error ? (
                <div className="risk-error-box">
                  <AlertTriangle size={24} />
                  <div>{error}</div>
                  <button className="risk-retry-btn" onClick={() => fetchRisk(selected, true)}>RETRY</button>
                </div>
              ) : currentRisk ? (
                <div className="risk-detail-content">

                  {/* Gauge */}
                  <div className="risk-gauge-card" style={{ borderColor: `${BAND_COLORS[currentRisk.risk_band]}30` }}>
                    <RiskGauge score={currentRisk.overall_score} band={currentRisk.risk_band} />
                    <div className="risk-gauge-info">
                      <div className="risk-badges">
                        <span className="risk-band-badge" style={{ color: BAND_COLORS[currentRisk.risk_band], borderColor: BAND_COLORS[currentRisk.risk_band] + "60", background: BAND_COLORS[currentRisk.risk_band] + "18" }}>
                          {currentRisk.risk_band} RISK
                        </span>
                        <span className="risk-sanctions-badge" style={{ color: SANCTIONS_COLORS[currentRisk.sanctions_status], background: SANCTIONS_COLORS[currentRisk.sanctions_status] + "18" }}>
                          {currentRisk.sanctions_status}
                        </span>
                      </div>
                      <p className="risk-summary">{currentRisk.summary}</p>
                      <div className="risk-confidence">
                        <Cpu size={10} />
                        {/* AI Confidence: {currentRisk.ai_confidence}% */}
                        {/* {currentRisk.cached && " · Cached"} */}
                      </div>
                    </div>
                  </div>

                  {/* Sanctions alert */}
                  {currentRisk.sanctions_status !== "CLEAN" && (
                    <div className="risk-sanctions-alert">
                      <Shield size={14} />
                      <div>
                        <div className="risk-sanctions-alert-title">SANCTIONS ALERT</div>
                        <div className="risk-sanctions-alert-desc">{currentRisk.sanctions_detail}</div>
                      </div>
                    </div>
                  )}

                  {/* Insights */}
                  <div>
                    <div className="risk-section-title">RISK BREAKDOWN</div>
                    <div className="risk-insights-list">
                      {currentRisk.trade_insights.map((ins, i) => (
                        <InsightCard key={i} insight={ins} />
                      ))}
                    </div>
                  </div>

                  {/* Trade profile */}
                  <div className="risk-trade-grid">
                    <div className="risk-trade-box">
                      <div className="risk-trade-box-title">KEY EXPORTS</div>
                      {currentRisk.key_exports.map((ex, i) => (
                        <div key={i} className="risk-trade-item"><ChevronRight size={10} style={{ color: "#10b981" }} /> {ex}</div>
                      ))}
                    </div>
                    <div className="risk-trade-box">
                      <div className="risk-trade-box-title">KEY IMPORTS</div>
                      {currentRisk.key_imports.map((im, i) => (
                        <div key={i} className="risk-trade-item"><ChevronRight size={10} style={{ color: "#f97316" }} /> {im}</div>
                      ))}
                    </div>
                  </div>

                  {/* Partners */}
                  <div className="risk-trade-box">
                    <div className="risk-trade-box-title">TOP TRADE PARTNERS</div>
                    <div className="risk-partner-tags">
                      {currentRisk.top_trade_partners.map((p, i) => (
                        <span key={i} className="risk-partner-tag">{p}</span>
                      ))}
                    </div>
                  </div>

                  <div className="risk-ai-footer">
                    <Cpu size={10} />
                    Analysis Engine · Last updated {currentRisk.last_updated}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* ── Scoped CSS ──────────────────────────────────────────── */}
      <style>{`
        .risk-page-root {
          min-height: 100vh;
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-family: var(--font-sans, 'Inter', sans-serif);
        }

        /* Toolbar */
        .risk-toolbar {
          position: fixed; top: 72px; left: 0; right: 0; z-index: 50;
          border-bottom: 1px solid hsl(var(--border));
          background: hsl(var(--card) / 0.92); backdrop-filter: blur(16px);
          height: 52px; display: flex; align-items: center;
          padding: 0 32px; justify-content: space-between;
        }
        .risk-toolbar-left { display: flex; align-items: center; gap: 10px; }
        .risk-toolbar-icon {
          width: 32px; height: 32px; border-radius: 10px;
          background: hsl(22 95% 54% / 0.1);
          border: 1px solid hsl(22 95% 54% / 0.2);
          display: grid; place-items: center; color: hsl(22 95% 54%);
        }
        .risk-toolbar-title { font-size: 11px; font-weight: 800; letter-spacing: 0.5px; }
        .risk-toolbar-sub { font-size: 9px; color: hsl(var(--muted-foreground)); font-weight: 600; margin-top: 1px; }
        .risk-toolbar-stats { display: flex; gap: 24px; }
        .risk-toolbar-stat { text-align: center; }
        .risk-toolbar-stat-val { font-size: 16px; font-weight: 800; font-family: monospace; display: block; }
        .risk-toolbar-stat-label { font-size: 8px; font-weight: 700; color: hsl(var(--muted-foreground)); letter-spacing: 0.5px; }

        /* Layout */
        .risk-layout {
          padding-top: 124px; display: grid;
          grid-template-columns: 1fr;
          min-height: calc(100vh - 124px);
          transition: grid-template-columns 0.3s ease;
        }
        .risk-layout[data-has-panel="true"] { grid-template-columns: 1fr 440px; }

        /* Map side */
        .risk-map-side { display: flex; flex-direction: column; overflow: hidden; }
        .risk-headline {
          padding: 24px 32px 16px;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
        }
        .risk-ai-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: hsl(22 95% 54% / 0.08); border: 1px solid hsl(22 95% 54% / 0.18);
          border-radius: 20px; padding: 3px 10px; margin-bottom: 10px;
          font-size: 9px; font-weight: 800; color: hsl(22 95% 54%); letter-spacing: 1px;
        }
        .risk-page-title {
          font-size: 28px; font-weight: 800; margin: 0 0 4px; letter-spacing: -0.5px;
          font-family: var(--font-display, serif);
        }
        .risk-page-desc { font-size: 13px; color: hsl(var(--muted-foreground)); margin: 0; font-weight: 500; }

        /* Search */
        .risk-search-wrap { position: relative; width: 220px; flex-shrink: 0; }
        .risk-search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: hsl(var(--muted-foreground)); z-index: 1; }
        .risk-search-input {
          width: 100%; background: hsl(var(--secondary));
          border: 1px solid hsl(var(--border)); border-radius: 10px;
          padding: 8px 12px 8px 30px; color: hsl(var(--foreground)); font-size: 11px;
          outline: none; box-sizing: border-box; font-family: inherit;
        }
        .risk-search-input:focus { border-color: hsl(var(--brand)); box-shadow: 0 0 0 3px hsl(var(--brand) / 0.1); }
        .risk-search-dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; right: 0;
          background: hsl(var(--card)); border: 1px solid hsl(var(--border));
          border-radius: 10px; z-index: 1000; max-height: 200px; overflow-y: auto;
          box-shadow: 0 10px 30px -10px hsl(var(--foreground) / 0.12);
        }
        .risk-search-item {
          width: 100%; padding: 8px 12px; background: none; border: none;
          color: hsl(var(--foreground)); font-size: 11px; font-weight: 600;
          text-align: left; cursor: pointer; display: flex; gap: 8px; align-items: center;
          font-family: inherit;
        }
        .risk-search-item:hover { background: hsl(var(--secondary)); }
        .risk-search-iso { font-size: 9px; color: hsl(var(--muted-foreground)); font-family: monospace; font-weight: 700; }

        /* Map container */
        .risk-map-container {
          flex: 1; margin: 0 32px 24px; position: relative;
          border: 1px solid hsl(var(--border));
          border-radius: 20px; overflow: hidden;
          box-shadow: var(--shadow-card);
        }
        .risk-map-container .leaflet-container {
          width: 100%; height: 100%;
          background: hsl(var(--background)) !important;
          border-radius: 20px;
        }

        /* Leaflet popup overrides */
        .risk-map-popup { min-width: 120px; font-family: var(--font-sans, 'Inter', sans-serif); }
        .risk-popup-name { font-weight: 800; font-size: 13px; color: #1a1a2e; margin-bottom: 2px; }
        .risk-popup-iso { font-size: 10px; color: #666; font-weight: 600; font-family: monospace; }
        .risk-popup-score { font-size: 11px; font-weight: 800; margin-top: 4px; }
        .risk-popup-hint { font-size: 10px; color: #888; font-style: italic; margin-top: 4px; }
        .leaflet-popup-content-wrapper {
          background: hsl(var(--card) / 0.97) !important;
          border-radius: 12px !important; backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px hsl(var(--foreground) / 0.1) !important;
        }
        .leaflet-popup-tip { background: hsl(var(--card) / 0.97) !important; }

        /* Legend */
        .risk-legend {
          position: absolute; bottom: 16px; left: 16px; z-index: 999;
          display: flex; gap: 12px; flex-wrap: wrap;
          background: hsl(var(--card) / 0.9); backdrop-filter: blur(8px);
          padding: 6px 14px; border-radius: 12px; border: 1px solid hsl(var(--border));
        }
        .risk-legend-item { display: flex; align-items: center; gap: 5px; font-size: 9px; font-weight: 700; color: hsl(var(--muted-foreground)); letter-spacing: 0.5px; }
        .risk-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

        .risk-map-hint {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 999;
          background: hsl(var(--brand) / 0.08); border: 1px solid hsl(var(--brand) / 0.18);
          border-radius: 20px; padding: 8px 18px;
          display: flex; align-items: center; gap: 8px; pointer-events: none;
          font-size: 10px; font-weight: 700; color: hsl(var(--brand)); letter-spacing: 0.5px;
        }

        /* Detail panel */
        .risk-detail-panel {
          border-left: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          display: flex; flex-direction: column; overflow: hidden;
        }
        .risk-detail-header {
          padding: 20px 24px 16px; border-bottom: 1px solid hsl(var(--border));
          display: flex; justify-content: space-between; align-items: flex-start; flex-shrink: 0;
        }
        .risk-detail-label { font-size: 9px; color: hsl(var(--muted-foreground)); font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
        .risk-detail-name { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: -0.3px; }
        .risk-detail-iso { font-size: 10px; color: hsl(var(--muted-foreground)); font-weight: 600; margin-top: 2px; font-family: monospace; }
        .risk-detail-actions { display: flex; gap: 8px; }
        .risk-btn-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: hsl(var(--secondary)); border: 1px solid hsl(var(--border));
          cursor: pointer; display: grid; place-items: center;
          color: hsl(var(--muted-foreground)); transition: all 0.15s;
        }
        .risk-btn-icon:hover { background: hsl(var(--muted)); color: hsl(var(--foreground)); }

        .risk-detail-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
        .risk-detail-content { display: flex; flex-direction: column; gap: 20px; }

        /* Loading */
        .risk-loading-center { display: flex; flex-direction: column; align-items: center; padding: 32px 0 24px; gap: 12px; }
        .risk-spinner {
          width: 40px; height: 40px;
          border: 2.5px solid hsl(var(--border));
          border-top-color: hsl(22 95% 54%); border-radius: 50%;
          animation: risk-spin 0.9s linear infinite;
        }
        @keyframes risk-spin { to { transform: rotate(360deg); } }
        .risk-loading-center span { font-size: 11px; color: hsl(var(--muted-foreground)); font-weight: 600; }

        .risk-skeleton { display: flex; flex-direction: column; gap: 12px; }
        .risk-skeleton-line {
          background: hsl(var(--secondary)); border-radius: 12px;
          animation: risk-sk 1.5s ease-in-out infinite;
        }
        @keyframes risk-sk { 0%,100% { opacity:0.4; } 50% { opacity:0.8; } }

        /* Error */
        .risk-error-box {
          background: hsl(0 84% 60% / 0.06); border: 1px solid hsl(0 84% 60% / 0.18);
          border-radius: 12px; padding: 20px; text-align: center; color: #ef4444;
        }
        .risk-error-box div { font-size: 12px; font-weight: 600; margin-top: 8px; }
        .risk-retry-btn {
          margin-top: 12px; padding: 8px 16px;
          background: hsl(0 84% 60% / 0.1); border: 1px solid hsl(0 84% 60% / 0.2);
          border-radius: 8px; color: #ef4444; font-size: 10px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.5px; font-family: inherit;
        }

        /* Gauge card */
        .risk-gauge-card {
          background: hsl(var(--card)); border: 1px solid hsl(var(--border));
          border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 20px;
          box-shadow: var(--shadow-soft);
        }
        .risk-gauge-info { flex: 1; }
        .risk-badges { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
        .risk-band-badge { font-size: 10px; font-weight: 900; padding: 3px 10px; border-radius: 20px; border: 1px solid; }
        .risk-sanctions-badge { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .risk-summary { font-size: 11px; color: hsl(var(--muted-foreground)); line-height: 1.5; margin: 0 0 10px; }
        .risk-confidence { display: flex; align-items: center; gap: 6px; font-size: 9px; color: hsl(var(--muted-foreground)); font-weight: 600; }

        /* Sanctions alert */
        .risk-sanctions-alert {
          background: hsl(0 84% 60% / 0.05); border: 1px solid hsl(0 84% 60% / 0.15);
          border-radius: 12px; padding: 12px 14px; display: flex; gap: 10px; align-items: flex-start;
          color: #ef4444;
        }
        .risk-sanctions-alert-title { font-size: 10px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 3px; }
        .risk-sanctions-alert-desc { font-size: 11px; color: hsl(var(--muted-foreground)); }

        .risk-section-title {
          font-size: 10px; font-weight: 800; color: hsl(var(--muted-foreground));
          letter-spacing: 1px; margin-bottom: 10px;
        }

        /* Insight cards */
        .risk-insights-list { display: flex; flex-direction: column; gap: 8px; }
        .risk-insight-card {
          background: hsl(var(--card)); border: 1px solid hsl(var(--border));
          border-left: 3px solid; border-radius: 12px; padding: 14px 16px;
          box-shadow: 0 1px 3px hsl(var(--foreground) / 0.03);
        }
        .risk-insight-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .risk-insight-label { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; }
        .risk-insight-icon { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; }
        .risk-insight-score-group { display: flex; align-items: center; gap: 6px; }
        .risk-insight-val { font-size: 16px; font-weight: 800; font-family: monospace; }
        .risk-insight-badge { font-size: 8px; font-weight: 900; padding: 2px 6px; border-radius: 4px; }
        .risk-bar-bg { height: 3px; background: hsl(var(--secondary)); border-radius: 2px; margin-bottom: 8px; overflow: hidden; }
        .risk-bar-fill { height: 100%; border-radius: 2px; transition: width 1s ease; }
        .risk-insight-desc { font-size: 11px; color: hsl(var(--muted-foreground)); line-height: 1.5; margin: 0; }

        /* Trade boxes */
        .risk-trade-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .risk-trade-box {
          background: hsl(var(--card)); border: 1px solid hsl(var(--border));
          border-radius: 12px; padding: 14px;
        }
        .risk-trade-box-title { font-size: 9px; font-weight: 800; color: hsl(var(--muted-foreground)); letter-spacing: 1px; margin-bottom: 8px; }
        .risk-trade-item { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; font-size: 10px; font-weight: 500; }

        .risk-partner-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .risk-partner-tag {
          font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px;
          background: hsl(var(--brand) / 0.08); border: 1px solid hsl(var(--brand) / 0.18);
          color: hsl(var(--brand));
        }

        .risk-ai-footer {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 12px; border-radius: 8px;
          background: hsl(var(--secondary)); font-size: 9px;
          color: hsl(var(--muted-foreground)); font-weight: 600;
        }

        /* Scrollbar */
        .risk-detail-body::-webkit-scrollbar { width: 4px; }
        .risk-detail-body::-webkit-scrollbar-track { background: transparent; }
        .risk-detail-body::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 2px; }
      `}</style>
    </div>
  );
}
