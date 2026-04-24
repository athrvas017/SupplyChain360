import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import SearchPanel from '../components/SearchPanel';
import BuildProgress from '../components/BuildProgress';
import GraphView from '../components/GraphView';
import GlobeView from '../components/GlobeView';
import GeoMapView from '../components/GeoMapView';
import NodeDetail from '../components/NodeDetail';
import DisruptionPanel from '../components/DisruptionPanel';
import { useSupplyChain } from '../context/SupplyChainContext';
import Navbar from '../components/site/Navbar';
import { simulateDisruption, getDisruptionAnalysis } from '../utils/api';
import type { SimulationResult, AlternativeSupplier } from '../utils/api';

interface DisruptionConfig {
  event: string;
  duration_days: number;
}

export default function TracePage() {
  const {
    nodes = [],
    edges = [],
    status = 'idle',
    currentTier = 0,
    stats = { nodes: 0, edges: 0 },
    concentrationRisk = [],
    error = null,
    buildSupplyChain,
    logs = [],
    initialSearchText,
    lastJobId,
  } = useSupplyChain();

  const [activeView, setActiveView] = useState<'graph' | 'globe' | 'geo'>('graph');
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const graphRef = useRef<any>(null);

  // ── Disruption simulation state ───────────────────────────────────────────
  const [simulatingNode, setSimulatingNode] = useState<any>(null);
  const [disruptionConfig, setDisruptionConfig] = useState<DisruptionConfig>({ event: '', duration_days: 14 });
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [briefing, setBriefing] = useState('');
  const [isLoadingBriefing, setIsLoadingBriefing] = useState(false);
  const [blastRadiusIds, setBlastRadiusIds] = useState<string[]>([]);
  const [disruptedNodeId, setDisruptedNodeId] = useState<string | null>(null);
  const [alternativeEdge, setAlternativeEdge] = useState<{ source: string; target: string } | null>(null);
  const [activatedAlternative, setActivatedAlternative] = useState<string | null>(null);
  const [showDisruptionPanel, setShowDisruptionPanel] = useState(false);

  // URL param hydration (Optional: Context state is usually enough, but we keep this to set the initial input)
  // Note: we don't set local state anymore, handleBuild will set context state.

  // ── Core handlers ─────────────────────────────────────────────────────────
  const resetDisruption = useCallback(() => {
    setSimulatingNode(null);
    setSimulationResult(null);
    setBriefing('');
    setBlastRadiusIds([]);
    setDisruptedNodeId(null);
    setAlternativeEdge(null);
    setActivatedAlternative(null);
    setShowDisruptionPanel(false);
    setShowConfigModal(false);
  }, []);

  const handleBuild = useCallback((companyName: string, hsCodes: string[]) => {
    setSelectedNode(null);
    resetDisruption();
    buildSupplyChain(companyName, hsCodes);
  }, [buildSupplyChain, resetDisruption]);

  const handleNodeClick = useCallback((node: any) => setSelectedNode(node), []);

  const handleViewInGraph = useCallback((nodeId: string) => {
    setActiveView('graph');
    setTimeout(() => {
      graphRef.current?.zoomToNode(nodeId);
      const node = nodes.find((n: any) => n.id === nodeId);
      if (node) setSelectedNode(node);
    }, 100);
  }, [nodes]);

  const handleNodeExpand = useCallback((name: string, hsCodes: string[]) => {
    buildSupplyChain(name, hsCodes);
  }, [buildSupplyChain]);

  const handleExportCSV = useCallback(() => {
    if (!nodes.length) return;
    const header = 'id,name,tier,lat,lng,country\n';
    const csv = nodes.map((n: any) =>
      `"${n.id}","${n.name}",${n.tier},${n.lat},${n.lng},"${n.country || ''}"`
    ).join('\n');
    const blob = new Blob([header + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trace_${initialSearchText || 'network'}.csv`;
    a.click();
  }, [nodes, initialSearchText]);

  // ── Disruption handlers ───────────────────────────────────────────────────
  const handleSimulateDisruption = useCallback((node: any) => {
    setSimulatingNode(node);
    setDisruptionConfig({ event: `Disruption at ${node.name}`, duration_days: 14 });
    setShowConfigModal(true);
  }, []);

  const runSimulation = useCallback(async () => {
    if (!simulatingNode) return;
    setShowConfigModal(false);
    setIsSimulating(true);
    setSelectedNode(null);

    try {
      const result = await simulateDisruption({
        node_id: simulatingNode.id,
        node_name: simulatingNode.name,
        event: disruptionConfig.event,
        duration_days: disruptionConfig.duration_days,
        hs_codes: simulatingNode.hs_codes || [],
        country: simulatingNode.country || '',
      });

      setSimulationResult(result);
      setBlastRadiusIds(result.blast_radius_ids);
      setDisruptedNodeId(simulatingNode.id);
      setShowDisruptionPanel(true);

      // Fetch AI briefing concurrently
      setIsLoadingBriefing(true);
      setBriefing('');
      try {
        const ai = await getDisruptionAnalysis(result);
        setBriefing(ai.briefing || '');
      } catch {
        setBriefing('## ⚠️ Briefing Unavailable\n\nThe intelligence engine could not be reached. The structured fallback was used instead.');
      } finally {
        setIsLoadingBriefing(false);
      }
    } catch (err: any) {
      alert(`Simulation failed: ${err.message}`);
    } finally {
      setIsSimulating(false);
    }
  }, [simulatingNode, disruptionConfig]);

  const handleActivateAlternative = useCallback((alt: AlternativeSupplier) => {
    if (!simulatingNode) return;
    const altNode = nodes.find((n: any) =>
      n.name.toLowerCase().includes(alt.name.toLowerCase()) ||
      alt.name.toLowerCase().includes(n.name.toLowerCase())
    );
    const firstDownstream = nodes.find((n: any) => blastRadiusIds.includes(n.id));
    setAlternativeEdge({
      source: altNode?.id ?? simulatingNode.id,
      target: firstDownstream?.id ?? simulatingNode.id,
    });
    setActivatedAlternative(alt.name);
  }, [simulatingNode, nodes, blastRadiusIds]);

  const isBuilding = status === 'building';
  const hasNodes = nodes.length > 0;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background font-sans">
      <Navbar />

      <main className="flex-1 mt-16 flex overflow-hidden">
        {/* Left panel: Search */}
        <SearchPanel onBuild={handleBuild} isBuilding={isBuilding} initialQuery={initialSearchText} />

        {/* Central panel: Visualization */}
        <section className="flex-1 bg-[#0c0d15] flex flex-col p-6 overflow-hidden relative shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] z-10">

          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6 z-20">
            {hasNodes ? (
              <div className="flex items-center gap-2">
                <button className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant border border-border flex items-center justify-center"
                  onClick={handleExportCSV} title="Export CSV">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
                <button className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant border border-border flex items-center justify-center"
                  onClick={() => window.print()} title="Print">
                  <span className="material-symbols-outlined text-[18px]">print</span>
                </button>
                <Link to="/routes"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:scale-105 active:scale-95 transition-all ml-2 whitespace-nowrap">
                  <span className="material-symbols-outlined text-[16px]">route</span> Cinematic Route
                </Link>
                {/* Simulate shortcut when node selected */}
                {selectedNode && !showDisruptionPanel && (
                  <button
                    onClick={() => handleSimulateDisruption(selectedNode)}
                    disabled={isSimulating}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ml-2 whitespace-nowrap"
                    style={{
                      background: 'linear-gradient(135deg,rgba(127,29,29,0.8),rgba(220,38,38,0.6))',
                      border: '1px solid rgba(239,68,68,0.4)',
                      color: isSimulating ? '#999' : '#FCA5A5',
                      cursor: isSimulating ? 'wait' : 'pointer',
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    {isSimulating ? 'Simulating…' : `Simulate: ${selectedNode.name}`}
                  </button>
                )}
                {disruptedNodeId && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full ml-2"
                    style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                      CRISIS: {blastRadiusIds.length} affected
                    </span>
                  </div>
                )}
              </div>
            ) : <div className="w-20" />}

            {/* View tabs */}
            <div className="inline-flex p-1 bg-surface-container-low rounded-full gap-1 shadow-sm border border-border">
              {(['graph'] as const).map(v => (
                <button key={v} onClick={() => setActiveView(v)}
                  className={`px-5 py-1.5 rounded-full font-bold text-xs flex items-center gap-2 transition-colors bg-surface-container-lowest text-primary`}>
                  <span className="material-symbols-outlined text-[16px]">
                    account_tree
                  </span>
                  Graph
                </button>
              ))}
            </div>

            <div className="w-20" />
          </div>

          {/* Graph canvas */}
          <div className="flex-1 relative flex flex-col rounded-[2rem] overflow-hidden border border-white/5 bg-black/20 shadow-inner">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '30px 30px' }} />

            <AnimatePresence mode="wait">
              {!hasNodes && !isBuilding ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="bg-surface-container-lowest/60 backdrop-blur-xl p-12 rounded-[2rem] shadow-xl flex flex-col items-center text-center max-w-md z-10 border border-white">
                    <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
                    </div>
                    <h2 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">No Supply Chain Data</h2>
                    <p className="text-on-surface-variant leading-relaxed text-sm">
                      Search for a company and select HS codes to trace the supply chain graph.
                    </p>
                  </div>
                </motion.div>
              ) : isBuilding && !hasNodes ? (
                <motion.div key="building" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col pointer-events-auto">
                  <BuildProgress status={status} companyName={initialSearchText}
                    currentTier={currentTier} nodesCount={stats.nodes} logs={logs} />
                </motion.div>
              ) : (
                <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col pointer-events-auto bg-transparent z-10">
                  {isBuilding && (
                    <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-primary/10 border border-primary/20 backdrop-blur-md px-4 py-2 rounded-full">
                      <span className="size-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Scanning…</span>
                    </div>
                  )}

                  {activeView === 'graph' && (
                    <GraphView
                      ref={graphRef}
                      nodes={nodes}
                      edges={edges}
                      onNodeClick={handleNodeClick}
                      onNodeExpand={handleNodeExpand}
                      selectedNodeId={selectedNode?.id}
                      blastRadiusIds={blastRadiusIds}
                      disruptedNodeId={disruptedNodeId}
                      alternativeEdge={alternativeEdge}
                      onSimulateDisruption={handleSimulateDisruption}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-error text-on-error px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 z-50">
                <span className="material-symbols-outlined">warning</span> {error}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── Disruption config modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showConfigModal && simulatingNode && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9998,
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={e => { if (e.target === e.currentTarget) setShowConfigModal(false); }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              style={{
                background: 'linear-gradient(145deg,#111827,#0F1117)',
                border: '1px solid rgba(239,68,68,0.4)',
                borderRadius: 20, padding: 32, width: 460, maxWidth: '90vw',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6),0 0 40px rgba(239,68,68,0.1)',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 900, color: '#EF4444', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
                ⚡ DISRUPTION SIMULATION
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#F1F5F9' }}>{simulatingNode.name}</h3>
              <p style={{ margin: '0 0 24px', fontSize: 12, color: '#6B7280' }}>
                {simulatingNode.country} · Tier {simulatingNode.tier}
              </p>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                  Disruption Event
                </label>
                <input
                  type="text"
                  value={disruptionConfig.event}
                  onChange={e => setDisruptionConfig(p => ({ ...p, event: e.target.value }))}
                  placeholder="e.g. Typhoon hitting Taiwan"
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#F1F5F9', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                  Duration: {disruptionConfig.duration_days} days
                </label>
                <input
                  type="range" min={1} max={90} step={1}
                  value={disruptionConfig.duration_days}
                  onChange={e => setDisruptionConfig(p => ({ ...p, duration_days: +e.target.value }))}
                  style={{ width: '100%', accentColor: '#EF4444' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#4B5563', marginTop: 4 }}>
                  <span>1 day</span><span>90 days</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setShowConfigModal(false)} style={{
                  flex: 1, padding: '11px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#6B7280', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}>Cancel</button>
                <button onClick={runSimulation} style={{
                  flex: 2, padding: '11px', borderRadius: 10,
                  background: 'linear-gradient(135deg,#7F1D1D,#DC2626)',
                  border: '1px solid rgba(239,68,68,0.5)', color: 'white',
                  fontSize: 12, fontWeight: 800, cursor: 'pointer',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  boxShadow: '0 4px 20px rgba(239,68,68,0.2)',
                }}>⚡ Run Simulation</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Disruption results panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showDisruptionPanel && simulationResult && (
          <DisruptionPanel
            scenario={simulationResult}
            briefing={briefing}
            isLoadingBriefing={isLoadingBriefing}
            activatedAlternative={activatedAlternative}
            onActivateAlternative={handleActivateAlternative}
            onClose={resetDisruption}
          />
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 group hover:shadow-xl hover:shadow-primary/40"
        onClick={() => document.getElementById('company-search-input')?.focus()}
      >
        <span className="material-symbols-outlined text-3xl">add</span>
        <div className="absolute right-full mr-4 bg-on-surface text-surface-container-lowest px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Quick Trace
        </div>
      </button>
    </div>
  );
}
