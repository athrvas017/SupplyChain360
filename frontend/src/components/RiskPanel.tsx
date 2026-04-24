import { useState, useEffect } from 'react';
import { getRiskColor, getCountryFlag } from '../utils/colors';
import { getChainSummary, getDisruptions, getRiskByName } from '../utils/api';
import { AlertTriangle, ShieldAlert, Zap, Banknote, Globe2, Eye, BrainCircuit, Sparkles, Cpu } from 'lucide-react';

export default function RiskPanel({ nodes, concentrationRisk, onViewInGraph }) {
  const sanctionedNodes = nodes.filter(n => n.risk?.is_sanctioned);
  const criticalConcentration = (concentrationRisk || []).filter(c => c.is_critical);
  
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [disruptions, setDisruptions] = useState([]);
  const [disruptionsLoading, setDisruptionsLoading] = useState(false);
  const [nodeRisks, setNodeRisks] = useState({});

  // Fetch AI summary
  useEffect(() => {
    async function fetchSummary() {
      if (nodes.length === 0) return;
      setLoading(true);
      try {
        const data = await getChainSummary('This Supply Chain', nodes, ['Sanctions', 'Concentration', 'Disruption']);
        setSummary(data.summary);
      } catch (e) {
        setSummary('Summary generation failed.');
      }
      setLoading(false);
    }
    fetchSummary();
  }, [nodes.length]);

  // Fetch live disruptions
  useEffect(() => {
    async function fetchDisruptions() {
      setDisruptionsLoading(true);
      try {
        const data = await getDisruptions();
        setDisruptions((data.events || []).slice(0, 5));
      } catch (e) {
        setDisruptions([]);
      }
      setDisruptionsLoading(false);
    }
    fetchDisruptions();
  }, []);

  // Fetch risk for each unique node (batch top-10 by tier)
  useEffect(() => {
    if (nodes.length === 0) return;
    const topNodes = nodes.slice(0, 10);
    topNodes.forEach(async (n) => {
      if (nodeRisks[n.name]) return;
      try {
        const risk = await getRiskByName(n.name, n.country || '');
        setNodeRisks(prev => ({ ...prev, [n.name]: risk }));
      } catch (e) { /* silent */ }
    });
  }, [nodes.length]);

  // Derive real financial and geopolitical insights from nodeRisks
  const financialRisks = Object.entries(nodeRisks)
    .filter(([_, r]) => r.components?.financial?.score > 0)
    .map(([name, r]) => ({
      name,
      score: r.components.financial.score,
      signals: r.components.financial.signals || [],
      source: r.components.financial.source,
    }));

  const geoRisks = Object.entries(nodeRisks)
    .filter(([_, r]) => r.components?.country_risk?.score >= 50)
    .sort((a, b) => b[1].components.country_risk.score - a[1].components.country_risk.score)
    .slice(0, 3)
    .map(([name, r]) => ({
      name,
      score: r.components.country_risk.score,
      source: r.components.country_risk.source,
      reasoning: r.components.country_risk.reasoning || '',
    }));

  if (nodes.length === 0) {
    return (
      <div className="empty-risk">
        <AlertTriangle size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
        <p>Build a supply chain to see risk analysis</p>
      </div>
    );
  }

  return (
    <div className="risk-panel">
      {/* 0. STRATEGIC AI ANALYSIS */}
      <div className="risk-group">
        <div className="risk-group-header" style={{ borderBottom: 'none' }}>
          <div className="flex items-center gap-2">
            <BrainCircuit size={16} className="text-accent" />
            <span className="risk-group-title" style={{ color: 'var(--accent-primary)' }}>✨ STRATEGIC ANALYSIS</span>
          </div>
        </div>
        <div className="ai-summary-box shadow-premium">
          {loading ? (
             <div className="ai-loading-skeleton">
                <div className="skeleton-line" />
                <div className="skeleton-line" style={{ width: '80%' }} />
                <div className="skeleton-line" style={{ width: '60%' }} />
             </div>
          ) : (
             <div className="ai-summary-text animate-fadeIn">
                <Sparkles size={10} className="ai-spark" />
                {summary || 'Establishing strategic footprint...'}
             </div>
          )}
        </div>
      </div>

      {/* 1. SANCTIONS HIT */}
      <div className="risk-group">
        <div className="risk-group-header">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-critical" />
            <span className="risk-group-title">🚨 SANCTIONS HIT</span>
          </div>
          <span className="risk-status critical">CRITICAL</span>
        </div>
        {sanctionedNodes.length > 0 ? (
          sanctionedNodes.map((n, i) => (
            <div key={i} className="risk-card critical">
              <div className="risk-card-name">{getCountryFlag(n.country)} {n.name}</div>
              <div className="risk-card-meta">Found at: Tier {n.tier}</div>
              <div className="risk-card-detail">List: {n.risk?.sanctions_programs?.join(', ')}</div>
              <div className="risk-card-actions">
                <button className="btn-mini" onClick={() => onViewInGraph?.(n.id)}>[VIEW IN GRAPH]</button>
                <button className="btn-mini">[FULL DETAIL]</button>
              </div>
            </div>
          ))
        ) : (
          // Check nodeRisks for sanctions from risk module
          (() => {
            const sanctioned = Object.entries(nodeRisks).filter(([_, r]) => r.components?.sanctions?.is_sanctioned);
            return sanctioned.length > 0 ? (
              sanctioned.map(([name, r], i) => (
                <div key={i} className="risk-card critical">
                  <div className="risk-card-name">{name}</div>
                  <div className="risk-card-detail">Lists: {(r.components.sanctions.lists || []).join(', ')}</div>
                  {r.components.sanctions.source === 'intelligence' && <AiBadge />}
                </div>
              ))
            ) : (
              <div className="risk-empty-msg">No sanctioned entities detected.</div>
            );
          })()
        )}
      </div>

      {/* 2. CONCENTRATION RISK */}
      <div className="risk-group">
        <div className="risk-group-header">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-high" />
            <span className="risk-group-title">⚠️ CONCENTRATION RISK</span>
          </div>
          <span className="risk-status high">HIGH</span>
        </div>
        {criticalConcentration.map((c, i) => (
          <div key={i} className="risk-card high">
            <div className="risk-card-name">{c.percentage}% of your Tier-1 suppliers are in {c.country}</div>
            <div className="risk-card-detail">Single-point failure risk: {c.country} hub</div>
            <div className="concentration-bar-mini">
              <div className="bar-fill" style={{ width: `${c.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. ACTIVE DISRUPTION — LIVE DATA */}
      <div className="risk-group">
        <div className="risk-group-header">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-accent" />
            <span className="risk-group-title">🌪️ ACTIVE DISRUPTION</span>
          </div>
          <span className="risk-status live">{disruptions.length > 0 ? `${disruptions.length} LIVE` : 'SCANNING'}</span>
        </div>
        {disruptionsLoading ? (
          <div className="ai-loading-skeleton">
            <div className="skeleton-line" />
            <div className="skeleton-line" style={{ width: '70%' }} />
          </div>
        ) : disruptions.length > 0 ? (
          disruptions.map((d, i) => (
            <div key={d.id || i} className="risk-card live">
              <div className="risk-card-name">
                {d.type === 'earthquake' ? '🌍' : d.type === 'flood' ? '🌊' : '⚡'} {d.title || d.type}
              </div>
              <div className="risk-card-detail">
                Source: {d.source?.toUpperCase()} · Severity: {d.severity}
              </div>
              <div className="risk-card-meta">
                Lat {d.lat?.toFixed(1)}° Lon {d.lon?.toFixed(1)}°
              </div>
            </div>
          ))
        ) : (
          <div className="risk-empty-msg">No active disruptions detected.</div>
        )}
      </div>

      {/* 4. FINANCIAL INSTABILITY — LIVE DATA */}
      <div className="risk-group">
        <div className="risk-group-header">
          <div className="flex items-center gap-2">
            <Banknote size={16} className="text-medium" />
            <span className="risk-group-title">💰 FINANCIAL INSTABILITY</span>
          </div>
          <span className="risk-status medium">{financialRisks.length > 0 ? 'DETECTED' : 'CLEAR'}</span>
        </div>
        {financialRisks.length > 0 ? (
          financialRisks.map((f, i) => (
            <div key={i} className="risk-card medium">
              <div className="risk-card-name">{f.name}</div>
              <div className="risk-card-detail">
                {f.signals.length > 0 ? f.signals.map(s => `• ${s.replace(/_/g, ' ')}`).join('\n') : `Financial risk score: ${f.score}`}
              </div>
              {f.source === 'intelligence' && <AiBadge />}
            </div>
          ))
        ) : (
          <div className="risk-empty-msg">No financial distress signals detected.</div>
        )}
      </div>

      {/* 5. GEOPOLITICAL — LIVE DATA */}
      <div className="risk-group">
        <div className="risk-group-header">
          <div className="flex items-center gap-2">
            <Globe2 size={16} className="text-medium" />
            <span className="risk-group-title">🌍 GEOPOLITICAL</span>
          </div>
          <span className="risk-status medium">{geoRisks.length > 0 ? 'ELEVATED' : 'LOW'}</span>
        </div>
        {geoRisks.length > 0 ? (
          geoRisks.map((g, i) => (
            <div key={i} className="risk-card medium">
              <div className="risk-card-name">{g.name}: Country risk {Math.round(g.score)}/100</div>
              {g.reasoning && <div className="risk-card-detail">{g.reasoning}</div>}
              {g.source === 'intelligence' && <AiBadge />}
            </div>
          ))
        ) : (
          <div className="risk-empty-msg">No elevated geopolitical risks.</div>
        )}
      </div>

      <style>{`
        .risk-panel { padding: 12px 0; display: flex; flex-direction: column; gap: 24px; }
        .empty-risk { 
          height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: hsl(var(--muted-foreground)); text-align: center; font-size: 13px; padding: 40px;
        }

        .risk-group { }
        .risk-group-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 12px; padding: 0 4px; border-bottom: 1px solid hsl(var(--border) / 0.5);
          padding-bottom: 8px;
        }
        .risk-group-title { 
          font-size: 10px; font-weight: 800; letter-spacing: 0.1em; 
          color: hsl(var(--muted-foreground));
        }
        
        .risk-status { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 6px; letter-spacing: 0.05em; }
        .risk-status.critical { background: hsl(0 84% 60% / 0.1); color: hsl(0 84% 60%); }
        .risk-status.high { background: hsl(33 100% 64% / 0.1); color: hsl(33 100% 64%); }
        .risk-status.medium { background: hsl(217 91% 55% / 0.1); color: hsl(217 91% 55%); }
        .risk-status.live { background: hsl(142 71% 45% / 0.1); color: hsl(142 71% 45%); border: 1px solid hsl(142 71% 45% / 0.2); }

        .text-critical { color: hsl(0 84% 60%); }
        .text-high { color: hsl(33 100% 64%); }
        .text-accent { color: hsl(var(--brand)); }

        .risk-card {
          padding: 14px; border-radius: 12px; border: 1px solid hsl(var(--border));
          background: hsl(var(--card)); margin-bottom: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .risk-card.critical { border-left: 4px solid hsl(0 84% 60%); }
        .risk-card.high { border-left: 4px solid hsl(33 100% 64%); }
        .risk-card.live { border-left: 4px solid hsl(142 71% 45%); position: relative; overflow: hidden; }
        .risk-card.live::after {
          content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, hsl(142 71% 45% / 0.05), transparent);
          animation: scan-shimmer 2s infinite;
        }
        
        .risk-card-name { font-size: 12px; font-weight: 700; color: hsl(var(--foreground)); margin-bottom: 4px; }
        .risk-card-meta { font-size: 10px; color: hsl(var(--muted-foreground)); font-weight: 600; margin-bottom: 2px; }
        .risk-card-detail { font-size: 11px; color: hsl(var(--foreground) / 0.8); line-height: 1.4; }
        
        .risk-card-actions { display: flex; gap: 8px; margin-top: 10px; }
        .btn-mini {
          background: none; border: none; padding: 0; font-family: var(--font-mono); font-size: 9px;
          font-weight: 700; color: hsl(var(--brand)); cursor: pointer; opacity: 0.8;
          text-transform: uppercase;
        }
        .btn-mini:hover { opacity: 1; text-decoration: underline; }

        .concentration-bar-mini {
          height: 3px; background: hsl(var(--secondary)); border-radius: 2px; margin-top: 8px; overflow: hidden;
        }
        .concentration-bar-mini .bar-fill { height: 100%; background: hsl(33 100% 64%); border-radius: 2px; }

        .risk-empty-msg { font-size: 11px; color: hsl(var(--muted-foreground)); font-style: italic; padding: 4px 12px; }

        .ai-summary-box {
          background: linear-gradient(135deg, hsl(217 91% 55% / 0.05) 0%, hsl(var(--card)) 100%);
          border: 1px solid hsl(217 91% 55% / 0.15);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 24px;
          position: relative;
          box-shadow: 0 4px 15px -5px hsl(var(--brand) / 0.08);
        }
        .ai-summary-text { font-size: 11px; line-height: 1.6; color: hsl(var(--foreground) / 0.9); font-weight: 500; }
        .ai-spark { position: absolute; top: -6px; right: -6px; color: hsl(var(--brand)); }
        .ai-loading-skeleton { display: flex; flex-direction: column; gap: 10px; }
        .skeleton-line {
          height: 8px; background: hsl(var(--secondary)); border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; } }

        @keyframes scan-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .ai-estimated-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 8px; font-weight: 900; letter-spacing: 0.05em;
          color: hsl(var(--brand)); background: hsl(var(--brand) / 0.08);
          padding: 2px 6px; border-radius: 4px; margin-top: 6px;
          border: 1px solid hsl(var(--brand) / 0.15);
        }
      `}</style>
    </div>
  );
}

function AiBadge() {
  return (
    <span className="ai-estimated-badge">
      <Cpu size={8} /> ESTIMATED
    </span>
  );
}
