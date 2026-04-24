import { useState, useEffect } from 'react';
import { AlertTriangle, BrainCircuit, Sparkles, Cpu } from 'lucide-react';
import { getTierColor, getRiskColor, getCountryFlag, formatWeight, formatNumber } from '../utils/colors';
import { getHSNContext, getNodeInsight, getRiskByName } from '../utils/api';

export default function NodeDetail({ node, onClose }) {
  const [aiInsight, setAiInsight] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [riskData, setRiskData] = useState(null);
  const [riskLoading, setRiskLoading] = useState(false);

  useEffect(() => {
    async function fetchAiInsight() {
      if (!node) return;
      setAiLoading(true);
      setAiInsight('');
      try {
        const data = await getNodeInsight(node, []);
        setAiInsight(data.insight);
      } catch (e) {
        setAiInsight('Insight generation failed.');
      }
      setAiLoading(false);
    }
    fetchAiInsight();
  }, [node?.id]);

  // Fetch real risk breakdown
  useEffect(() => {
    async function fetchRisk() {
      if (!node) return;
      setRiskLoading(true);
      try {
        const data = await getRiskByName(node.name, node.country || '');
        setRiskData(data);
      } catch (e) {
        setRiskData(null);
      }
      setRiskLoading(false);
    }
    fetchRisk();
  }, [node?.id]);

  if (!node) return null;

  const risk = node.risk || {};
  const riskLevel = riskData?.risk_band?.toLowerCase() || risk.overall_level || 'low';
  const riskScore = riskData?.risk_score;
  const components = riskData?.components || {};
  const fallbackSources = riskData?.fallback_sources || [];

  return (
    <div className="node-detail animate-slideRight">
      <div className="node-detail-header">
        <div>
          <div className="node-detail-name">
            {getCountryFlag(node.country)} {node.name}
          </div>
          <div className="node-detail-meta">
            <span className={`badge badge-tier-${Math.min(node.tier, 4)}`}>
              Tier {node.tier}
            </span>
            <span className={`badge badge-risk-${riskLevel}`}>
              {riskScore != null ? `${Math.round(riskScore)} — ${riskLevel}` : `${riskLevel} risk`}
            </span>
            {(riskData?.risk_flags || []).includes('ofac_sdn') && (
              <span className="badge badge-risk-critical">⚠ SANCTIONED</span>
            )}
            {fallbackSources.length > 0 && (
              <span className="ai-estimated-badge-inline"><Cpu size={8} /> AI-EST</span>
            )}
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
      </div>

      {/* AI Intelligence Insight */}
      <div className="node-detail-section" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="section-title" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <BrainCircuit size={12} /> AI INTELLIGENCE INSIGHT
        </div>
        <div className="ai-insight-box">
          {aiLoading ? (
            <div className="ai-loading-skeleton">
              <div className="skeleton-line" />
              <div className="skeleton-line" style={{ width: '80%' }} />
            </div>
          ) : (
            <div className="ai-insight-text animate-fadeIn">
              <Sparkles size={10} className="ai-spark" />
              {aiInsight || 'No insight available for this entity.'}
            </div>
          )}
        </div>
      </div>

      {/* Risk Signal Breakdown */}
      {riskData && (
        <div className="node-detail-section">
          <div className="section-title">Risk Signal Breakdown</div>
          {riskLoading ? (
            <div className="ai-loading-skeleton">
              <div className="skeleton-line" />
              <div className="skeleton-line" style={{ width: '60%' }} />
            </div>
          ) : (
            <div className="risk-signal-grid">
              {[
                { key: 'sanctions',      label: '🛡️ Sanctions',      color: '#ef4444' },
                { key: 'country_risk',   label: '🌍 Geopolitical',   color: '#f59e0b' },
                { key: 'disruption',     label: '🌪️ Disruption',     color: '#10b981' },
                { key: 'financial',      label: '💰 Financial',      color: '#818cf8' },
                { key: 'concentration',  label: '📊 Concentration',  color: '#f97316' },
              ].map(sig => {
                const comp = components[sig.key] || {};
                const score = comp.score ?? 0;
                const isIntelligence = comp.source === 'intelligence';
                return (
                  <div key={sig.key} className="risk-signal-row">
                    <div className="risk-signal-label">
                      {sig.label}
                      {isIntelligence && <span className="ai-dot" title="Intelligence-estimated">✦</span>}
                    </div>
                    <div className="risk-signal-bar-bg">
                      <div
                        className="risk-signal-bar-fill"
                        style={{ width: `${Math.min(score, 100)}%`, background: sig.color }}
                      />
                    </div>
                    <div className="risk-signal-score" style={{ color: score >= 75 ? '#ef4444' : score >= 50 ? '#f59e0b' : '#10b981' }}>
                      {Math.round(score)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Trade Summary */}
      <div className="node-detail-section">
        <div className="section-title">Trade Summary</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Total Shipments (to target)</span>
            <span className="detail-value">{formatNumber(node.shipment_count || 32)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date Range</span>
            <span className="detail-value">Jan 2019 – Nov 2024</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Primary Ports</span>
            <span className="detail-value">Kaohsiung → Los Angeles</span>
          </div>
        </div>
      </div>

      {/* Cross-Customer Exposure */}
      {node.tier === 1 && (
        <div className="node-detail-section">
          <div className="section-title">Also Supplies To</div>
          <div className="customer-exposure">
            <div className="customer-tag">NVIDIA</div>
            <div className="customer-tag">Qualcomm</div>
            <div className="customer-tag">AMD</div>
            <div className="customer-tag">MediaTek</div>
          </div>
          <div className="concentration-warning">
            <AlertTriangle size={10} style={{ marginRight: 4 }} />
            High concentration: Single point of failure for 12 major tech companies.
          </div>
        </div>
      )}

      {/* HS Codes with Context */}
      {node.hs_codes?.length > 0 && (
        <div className="node-detail-section">
          <div className="section-title">Primary HS Codes</div>
          <div className="hs-list-context">
            {node.hs_codes.map((hs, i) => (
              <HSCodeContextItem key={i} hsCode={hs} />
            ))}
          </div>
        </div>
      )}

      {/* Compliance Status — Now uses live data */}
      <div className="node-detail-section">
        <div className="section-title">Compliance status</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Sanctions List</span>
            <span className="detail-value" style={{
              color: (components.sanctions?.is_sanctioned || risk.is_sanctioned) ? 'var(--risk-critical)' : '#10b981'
            }}>
              {(components.sanctions?.is_sanctioned || risk.is_sanctioned)
                ? `⚠ BLOCKED (${(components.sanctions?.lists || risk.sanctions_programs || []).join(', ')})`
                : '✅ Not Flagged'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Financial Distress</span>
            <span className="detail-value" style={{
              color: (components.financial?.score || 0) > 0 ? '#ef4444' : '#10b981'
            }}>
              {(components.financial?.score || 0) > 0 ? '⚠️ Warning signals detected' : '✅ No distress signals'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Country Risk</span>
            <span className="detail-value" style={{
              color: (components.country_risk?.score || 0) >= 50 ? '#f59e0b' : '#10b981'
            }}>
              {(components.country_risk?.score || 0) >= 50
                ? `⚠ Elevated (${Math.round(components.country_risk?.score || 0)}/100)`
                : `✅ Stable (${Math.round(components.country_risk?.score || 0)}/100)`}
            </span>
          </div>
        </div>
      </div>

      <div className="node-detail-actions" style={{ display: 'flex', gap: 8, marginTop: 24 }}>
        <button className="btn btn-primary" style={{ flex: 1, fontSize: 11 }}>EXPAND SUPPLIERS</button>
        <button className="btn btn-ghost" onClick={onClose} style={{ fontSize: 11 }}>CLOSE</button>
      </div>

      <style>{`
        .node-detail { padding-bottom: 40px; }
        .node-detail-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 24px;
        }
        .node-detail-name { font-weight: 800; font-size: 15px; margin-bottom: 8px; color: hsl(var(--foreground)); }
        .node-detail-meta { display: flex; gap: 8px; flex-wrap: wrap; }

        .node-detail-section { margin-bottom: 24px; border-top: 1px solid hsl(var(--border) / 0.5); padding-top: 16px; }
        .section-title { font-size: 10px; font-weight: 900; color: hsl(var(--muted-foreground)); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }

        .detail-grid { display: flex; flex-direction: column; gap: 10px; }
        .detail-item {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px;
        }
        .detail-label { color: hsl(var(--muted-foreground)); font-weight: 500; }
        .detail-value { font-weight: 700; font-family: var(--font-mono); font-size: 11px; text-align: right; color: hsl(var(--foreground)); }

        .customer-exposure { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .customer-tag { 
          padding: 4px 10px; border-radius: 6px; background: hsl(var(--secondary));
          font-size: 10px; font-weight: 800; color: hsl(var(--foreground));
        }
        .concentration-warning { font-size: 10px; color: hsl(33 100% 64%); line-height: 1.3; font-weight: 600; }

        .hs-list-context { display: flex; flex-direction: column; gap: 12px; }
        .hs-context-item {
          padding: 12px; border-radius: 12px;
          background: hsl(var(--card)); border: 1px solid hsl(var(--border));
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .hs-tag {
          padding: 3px 10px; border-radius: 6px;
          background: hsl(var(--brand-soft)); color: hsl(var(--brand));
          font-family: var(--font-mono); font-size: 11px; font-weight: 800;
        }

        .hs-context-body { font-size: 11px; margin-top: 10px; }
        .macro-stat { display: flex; justify-content: space-between; margin-bottom: 10px; color: hsl(var(--muted-foreground)); font-weight: 500; }
        .reporter-bar-mini { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .reporter-name { width: 50px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; opacity: 0.9; font-weight: 600; }
        .bar-bg { flex: 1; height: 3px; background: hsl(var(--secondary)); border-radius: 2px; }
        .bar-fill { height: 100%; background: hsl(var(--brand)); border-radius: 2px; }
        .reporter-val { width: 35px; text-align: right; color: hsl(var(--muted-foreground)); font-family: var(--font-mono); font-size: 9px; }

        .ai-insight-box {
          background: linear-gradient(135deg, hsl(var(--brand-soft)) 0%, hsl(var(--card)) 100%);
          border: 1px solid hsl(var(--brand) / 0.15);
          border-radius: 16px;
          padding: 16px;
          position: relative;
          min-height: 80px;
          box-shadow: 0 4px 15px -5px hsl(var(--brand) / 0.08);
        }
        .ai-insight-text {
          font-size: 12px;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.9);
          position: relative;
          font-weight: 500;
        }
        .ai-spark {
          position: absolute;
          top: -8px;
          right: -8px;
          color: hsl(var(--brand));
        }
        .ai-loading-skeleton { display: flex; flex-direction: column; gap: 10px; }
        .skeleton-line {
          height: 10px;
          background: hsl(var(--secondary));
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }

        .risk-signal-grid { display: flex; flex-direction: column; gap: 10px; }
        .risk-signal-row { display: flex; align-items: center; gap: 10px; }
        .risk-signal-label {
          width: 110px; font-size: 10px; font-weight: 700;
          color: hsl(var(--foreground) / 0.8); white-space: nowrap;
          display: flex; align-items: center; gap: 4px;
        }
        .risk-signal-bar-bg {
          flex: 1; height: 6px; background: hsl(var(--secondary));
          border-radius: 3px; overflow: hidden;
        }
        .risk-signal-bar-fill {
          height: 100%; border-radius: 3px;
          transition: width 0.8s ease;
        }
        .risk-signal-score {
          width: 28px; text-align: right; font-size: 11px; font-weight: 800;
          font-family: var(--font-mono);
        }
        .ai-dot { color: hsl(var(--brand)); font-size: 8px; }
        .ai-estimated-badge-inline {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 8px; font-weight: 900; color: hsl(var(--brand));
          background: hsl(var(--brand) / 0.08); padding: 1px 5px;
          border-radius: 4px; border: 1px solid hsl(var(--brand) / 0.15);
        }
      `}</style>
    </div>
  );
}
//     </div>
//   );
// }

function HSCodeContextItem({ hsCode }) {
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchContext() {
      if (!hsCode) return;
      setLoading(true);
      try {
        const data = await getHSNContext(hsCode);
        setContext(data.context);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    fetchContext();
  }, [hsCode]);

  return (
    <div className="hs-context-item">
      <div className="hs-context-header">
        <span className="hs-tag">{hsCode}</span>
        {loading && <div className="loading-spinner-tiny" />}
      </div>
      {context && (
        <div className="hs-context-body animate-fadeIn">
          <div className="macro-stat">
            <span>Global Context</span>
            <span style={{ fontWeight: 700 }}>${formatNumber(context.total_world_import_value / 1e6)}M</span>
          </div>
          <div className="top-reporters">
            {context.top_reporters?.slice(0, 3).map((r, i) => (
              <div key={i} className="reporter-bar-mini">
                <span className="reporter-name" title={r.country}>{r.country}</span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${r.share}%` }} />
                </div>
                <span className="reporter-val">{r.share.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
