import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SimulationResult, AlternativeSupplier } from '../utils/api';

interface Props {
  scenario: SimulationResult;
  briefing: string;
  isLoadingBriefing: boolean;
  activatedAlternative: string | null;
  onActivateAlternative: (alt: AlternativeSupplier) => void;
  onClose: () => void;
}

type Tab = 'briefing' | 'alternatives' | 'nodes';

/** Minimal markdown → JSX renderer (no external lib needed) */
function MarkdownBlock({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div style={{ lineHeight: 1.7, fontSize: 12, color: '#E2E8F0' }}>
      {lines.map((line, i) => {
        if (line.startsWith('### ')) return <h3 key={i} style={{ margin: '14px 0 6px', fontSize: 13, fontWeight: 800, color: '#F8FAFC', letterSpacing: '0.02em' }}>{line.replace('### ', '')}</h3>;
        if (line.startsWith('## '))  return <h2 key={i} style={{ margin: '16px 0 8px', fontSize: 15, fontWeight: 800, color: '#F8FAFC' }}>{line.replace('## ', '')}</h2>;
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const content = renderInline(line.replace(/^[-*] /, ''));
          return <li key={i} style={{ marginLeft: 16, marginBottom: 4, color: '#CBD5E1' }}>{content}</li>;
        }
        if (/^\d+\. /.test(line)) {
          const content = renderInline(line.replace(/^\d+\. /, ''));
          return <li key={i} style={{ marginLeft: 16, marginBottom: 4, color: '#CBD5E1', listStyleType: 'decimal' }}>{content}</li>;
        }
        if (line.trim() === '') return <div key={i} style={{ height: 6 }} />;
        return <p key={i} style={{ margin: '0 0 4px', color: '#CBD5E1' }}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  // Bold: **text**
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<strong key={match.index} style={{ color: '#F8FAFC', fontWeight: 700 }}>{match[1]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

function KpiCard({ label, value, sub, color = '#60A5FA' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '12px 14px',
      minWidth: 0,
      flex: 1,
    }}>
      <div style={{ fontSize: 9, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: '#475569', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export default function DisruptionPanel({ scenario, briefing, isLoadingBriefing, activatedAlternative, onActivateAlternative, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('briefing');

  const dailyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(scenario.estimated_daily_loss);

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: '6px 14px',
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    transition: 'all 0.15s',
    background: tab === t ? 'rgba(239,68,68,0.18)' : 'transparent',
    color: tab === t ? '#FCA5A5' : '#64748B',
  });

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      style={{
        position: 'fixed',
        top: 64,
        right: 0,
        bottom: 0,
        width: 420,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0D1117 0%, #0F1B2D 100%)',
        borderLeft: '1px solid rgba(239,68,68,0.25)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
        fontFamily: 'var(--font-sans, Inter, system-ui)',
      }}
    >
      {/* ── Header ── */}
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: '1px solid rgba(239,68,68,0.15)',
        background: 'rgba(239,68,68,0.05)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 900, color: '#EF4444', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4 }}>
              ⚡ DISRUPTION SIMULATION ACTIVE
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#F1F5F9' }}>{scenario.disrupted_node}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{scenario.event} · {scenario.duration_days} days</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 4 }}
            title="Close panel"
          >✕</button>
        </div>

        {/* KPI strip */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <KpiCard label="Blast Radius" value={String(scenario.blast_radius_ids.length)} sub="nodes affected" color="#F87171" />
          <KpiCard label="Shipments" value={String(scenario.total_shipments_halted.toLocaleString())} sub="halted" color="#FB923C" />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <button style={tabStyle('briefing')} onClick={() => setTab('briefing')}>Briefing</button>
        <button style={tabStyle('alternatives')} onClick={() => setTab('alternatives')}>
          Alternatives {scenario.available_alternatives.length > 0 && `(${scenario.available_alternatives.length})`}
        </button>
        <button style={tabStyle('nodes')} onClick={() => setTab('nodes')}>
          Affected ({scenario.blast_radius_names.length})
        </button>
      </div>

      {/* ── Tab content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <AnimatePresence mode="wait">
          {tab === 'briefing' && (
            <motion.div key="briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {isLoadingBriefing ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, paddingTop: 60 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    border: '3px solid rgba(239,68,68,0.15)',
                    borderTopColor: '#EF4444',
                    animation: 'spin 1s linear infinite',
                  }} />
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Generating executive briefing…
                  </div>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              ) : briefing ? (
                <MarkdownBlock text={briefing} />
              ) : (
                <div style={{ color: '#475569', fontSize: 12, textAlign: 'center', paddingTop: 40 }}>
                  No briefing available.
                </div>
              )}
            </motion.div>
          )}

          {tab === 'alternatives' && (
            <motion.div key="alternatives" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {scenario.available_alternatives.length === 0 ? (
                <div style={{ color: '#475569', fontSize: 12, textAlign: 'center', paddingTop: 40 }}>
                  No alternative suppliers found in the current graph.<br />
                  <span style={{ fontSize: 11, color: '#334155' }}>Build a larger supply chain to unlock this feature.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {scenario.available_alternatives.map((alt, i) => {
                    const isGold = alt.rank === 1;
                    const isActivated = activatedAlternative === alt.name;
                    
                    return (
                    <div key={i} style={{
                      background: isActivated
                        ? 'rgba(34,197,94,0.08)'
                        : (isGold ? 'rgba(234,179,8,0.04)' : 'rgba(255,255,255,0.02)'),
                      border: `1px solid ${isActivated ? 'rgba(34,197,94,0.3)' : (isGold ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.05)')}`,
                      borderRadius: 12,
                      padding: '14px',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: isGold ? '#FDE047' : '#E2E8F0', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>{alt.rank === 1 ? '🥇' : alt.rank === 2 ? '🥈' : '🥉'}</span>
                          <span>{alt.rank_label}: {alt.name}</span>
                          <span style={{ color: '#64748B', fontWeight: 500, fontSize: 11 }}>({alt.country})</span>
                        </div>
                      </div>

                      <div style={{ paddingLeft: 8, borderLeft: '1px solid rgba(255,255,255,0.1)', marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
                        <div style={{ color: '#CBD5E1' }}><span style={{ color: '#64748B', display: 'inline-block', width: 65 }}>Specs:</span> {alt.hsn_match.includes('Exact') ? '✅' : '⚠️'} {alt.hsn_match}</div>
                        <div style={{ color: '#CBD5E1' }}><span style={{ color: '#64748B', display: 'inline-block', width: 65 }}>Capacity:</span> {alt.capacity_status}</div>
                        <div style={{ color: '#CBD5E1' }}><span style={{ color: '#64748B', display: 'inline-block', width: 65 }}>Volume:</span> 📦 {alt.historical_volume}</div>
                      </div>

                      <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingLeft: 16 }}>
                        <button
                          onClick={() => onActivateAlternative(alt)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 6,
                            background: isActivated ? 'rgba(34,197,94,0.15)' : 'rgba(99,102,241,0.1)',
                            border: `1px solid ${isActivated ? 'rgba(34,197,94,0.4)' : 'rgba(99,102,241,0.3)'}`,
                            color: isActivated ? '#4ADE80' : '#818CF8',
                            fontSize: 10, fontWeight: 800, cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {isActivated ? '✓ HEALING ROUTE ACTIVE' : '⚡ SWITCH ROUTE'}
                        </button>
                      </div>
                    </div>
                  )})}
                </div>

              )}
            </motion.div>
          )}

          {tab === 'nodes' && (
            <motion.div key="nodes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {scenario.blast_radius_names.length === 0 ? (
                <div style={{ color: '#475569', fontSize: 12, textAlign: 'center', paddingTop: 40 }}>
                  No downstream nodes detected in blast radius.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {scenario.blast_radius_names.map((name, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px',
                      background: 'rgba(239,68,68,0.05)',
                      border: '1px solid rgba(239,68,68,0.12)',
                      borderRadius: 8,
                    }}>
                      <span style={{ color: '#EF4444', fontSize: 11 }}>⚠</span>
                      <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>{name}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer reset ── */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '10px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#64748B', fontSize: 11, fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F1F5F9')}
          onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
        >
          ✕ End Simulation
        </button>
      </div>
    </motion.div>
  );
}
