import { useEffect, useState, useMemo } from 'react';
import GlobeView from '../components/GlobeView';
import { ArrowLeft, Box, Hexagon, ShieldAlert, Navigation2, Loader2, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSupplyChain } from '../context/SupplyChainContext';
import { getLatestGraph } from '../utils/api';

/* ─── Fallback mock data (only shown when no graph exists anywhere) ─── */
const FALLBACK_NODES = [
  { id: '1', name: 'APPLE INC', country: 'US', tier: 0, lat: 37.33, lng: -122.03, shipment_volume: 5000 },
  { id: '2', name: 'FOXCONN INT', country: 'TW', tier: 1, lat: 23.69, lng: 120.96, shipment_volume: 2500 },
  { id: '3', name: 'TSMC', country: 'TW', tier: 1, lat: 24.77, lng: 120.98, shipment_volume: 4000 },
  { id: '4', name: 'SAMSUNG SDI', country: 'KR', tier: 2, lat: 37.26, lng: 127.02, shipment_volume: 1200 },
  { id: '5', name: 'ASML HOLDING', country: 'NL', tier: 2, lat: 51.44, lng: 5.47, shipment_volume: 800 },
  { id: '6', name: 'ALBEMARLE CORP', country: 'CL', tier: 3, lat: -23.86, lng: -69.13, shipment_volume: 600, risk: { is_sanctioned: true, overall_level: "high" } },
  { id: '7', name: 'GLENCORE PLC', country: 'CD', tier: 3, lat: -10.59, lng: 25.47, shipment_volume: 500, risk: { overall_level: "high" } },
  { id: '8', name: 'SONY SENSORS', country: 'JP', tier: 1, lat: 35.67, lng: 139.65, shipment_volume: 1500 },
  { id: '9', name: 'CORNING GLASS', country: 'US', tier: 2, lat: 42.14, lng: -77.05, shipment_volume: 900 }
];
const FALLBACK_EDGES = [
  { source: '2', target: '1', total_weight_kg: 2500000, hs_code: '8517.12', hs_description: 'Smartphones' },
  { source: '3', target: '1', total_weight_kg: 800000, hs_code: '8542.31', hs_description: 'Processors' },
  { source: '8', target: '1', total_weight_kg: 400000, hs_code: '8525.80', hs_description: 'Camera Modules' },
  { source: '4', target: '2', total_weight_kg: 1000000, hs_code: '8507.60', hs_description: 'Lithium-ion Batteries' },
  { source: '5', target: '3', total_weight_kg: 50000, hs_code: '8486.20', hs_description: 'Lithography Equipment' },
  { source: '6', target: '4', total_weight_kg: 300000, hs_code: '2836.91', hs_description: 'Lithium Carbonate' },
  { source: '7', target: '4', total_weight_kg: 200000, hs_code: '8105.20', hs_description: 'Cobalt Mattes' },
  { source: '9', target: '2', total_weight_kg: 600000, hs_code: '7007.29', hs_description: 'Safety Glass' }
];

export default function RoutesPage() {
  const { nodes: contextNodes, edges: contextEdges, initialSearchText } = useSupplyChain();
  const [activeNode, setActiveNode] = useState(null);
  const [selectedTiers, setSelectedTiers] = useState([0, 1, 2, 3, 4]);
  const [liveNodes, setLiveNodes] = useState<any[]>([]);
  const [liveEdges, setLiveEdges] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<string>('loading');
  const [companyLabel, setCompanyLabel] = useState<string>('');

  // Resolve graph data: Context → Backend API → Fallback
  useEffect(() => {
    async function resolveGraphData() {
      // 1. If context has traced nodes, use them directly
      if (contextNodes && contextNodes.length > 0) {
        setLiveNodes(contextNodes);
        setLiveEdges(contextEdges || []);
        setCompanyLabel(initialSearchText || 'Traced Network');
        setDataSource('context');
        return;
      }

      // 2. Try fetching from backend (Neo4j → Supabase)
      try {
        const result = await getLatestGraph();
        if (result?.graph?.nodes?.length > 0) {
          setLiveNodes(result.graph.nodes);
          setLiveEdges(result.graph.edges || []);
          setCompanyLabel(result.company_name || 'Stored Network');
          setDataSource(result.source || 'api');
          return;
        }
      } catch (err) {
        console.warn('[RoutesPage] Backend graph fetch failed, using fallback:', err);
      }

      // 3. Fallback to demo data
      setLiveNodes(FALLBACK_NODES);
      setLiveEdges(FALLBACK_EDGES);
      setCompanyLabel('Demo Network');
      setDataSource('fallback');
    }

    resolveGraphData();
  }, [contextNodes, contextEdges, initialSearchText]);

  // Re-sync when context updates (e.g. new trace completes while routes page is open)
  useEffect(() => {
    if (contextNodes && contextNodes.length > 0 && dataSource !== 'context') {
      setLiveNodes(contextNodes);
      setLiveEdges(contextEdges || []);
      setCompanyLabel(initialSearchText || 'Traced Network');
      setDataSource('context');
    }
  }, [contextNodes, contextEdges, initialSearchText, dataSource]);

  // Filter nodes and edges based on selected tiers
  const filteredNodes = useMemo(() => {
    return liveNodes.filter(node => selectedTiers.includes(node.tier));
  }, [liveNodes, selectedTiers]);

  const filteredEdges = useMemo(() => {
    return liveEdges.filter(edge => {
      const source = liveNodes.find(n => n.id === edge.source);
      const target = liveNodes.find(n => n.id === edge.target);
      return source && target && selectedTiers.includes(source.tier) && selectedTiers.includes(target.tier);
    });
  }, [liveNodes, liveEdges, selectedTiers]);

  // Compute unique tiers in the data
  const availableTiers = useMemo(() => {
    const tiers = new Set(liveNodes.map(n => n.tier));
    return Array.from(tiers).sort();
  }, [liveNodes]);

  const toggleTier = (tier) => {
    setSelectedTiers(prev => 
      prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]
    );
  };

  // Force dark mode aesthetic strictly for this cinematic view
  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0c'; // Super dark background
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const isLoading = dataSource === 'loading';

  return (
    <main className="w-full h-screen overflow-hidden relative flex bg-[#0a0a0c] text-white font-sans">
      
      {/* Absolute positioning for UI elements floating over the globe */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <Link to="/trace">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all text-xs font-bold uppercase tracking-widest text-white shadow-lg">
            <ArrowLeft className="size-4" /> Back to Trace
          </button>
        </Link>
        <div className="px-5 py-2.5 bg-brand/20 border border-brand/50 rounded-full backdrop-blur-xl flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <div className="size-2 rounded-full bg-brand animate-pulse" />
          <span className="text-xs font-black tracking-widest text-brand uppercase">
            {dataSource === 'fallback' ? 'Demo Mode' : 'Live Intelligence Active'}
          </span>
        </div>
        {dataSource !== 'fallback' && companyLabel && (
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="text-xs font-bold text-white/80 tracking-wide">{companyLabel}</span>
          </div>
        )}
      </div>

      {/* Tier Selection UI */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 bg-black/40 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl">
        {availableTiers.map(tier => (
          <button
            key={tier}
            onClick={() => toggleTier(tier)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${
              selectedTiers.includes(tier) 
              ? 'bg-brand border-brand/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
              : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
            }`}
          >
            {tier === 0 ? 'Anchor' : `Tier ${tier}`}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="size-10 text-brand animate-spin" />
            <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Loading Graph Intelligence...</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 radial-gradient-dark">
          <GlobeView 
            nodes={filteredNodes} 
            edges={filteredEdges} 
            onNodeClick={(node) => setActiveNode(node)} 
          />
        </div>
      )}

      {/* Cinematic Overlays */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
      
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 flex flex-col gap-4 z-40">
        {!activeNode ? (
          <div className="p-6 bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl animate-in slide-in-from-right fade-in duration-700">
            <div className="flex items-center gap-3 mb-4 text-white">
              <Navigation2 className="size-5 text-accent" />
              <h2 className="font-display text-lg font-bold tracking-wider">
                {companyLabel ? `${companyLabel.toUpperCase()} ROUTES` : 'TRADE ROUTES'}
              </h2>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6 font-medium">
              {dataSource === 'fallback' 
                ? 'Showing demo data. Trace a company on the Trace page to see your real supply chain routes here.'
                : `Visualizing ${liveNodes.length}-node supply network spanning ${new Set(liveNodes.map(n => n.country)).size} countries. Click nodes to inspect.`
              }
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-2xl font-mono font-bold text-white mb-1">{liveNodes.length}</div>
                <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Active Nodes</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-2xl font-mono font-bold text-brand mb-1">{liveEdges.length}</div>
                <div className="text-[10px] text-brand/70 font-bold uppercase tracking-widest">Trade Links</div>
              </div>
            </div>
            {dataSource !== 'fallback' && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2">
                <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
                  Source: {dataSource === 'context' ? 'Live Trace Session' : dataSource === 'supabase' ? 'Persisted Snapshot' : 'Neo4j Graph'}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 bg-black/60 border border-brand/30 backdrop-blur-2xl rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.15)] animate-in slide-in-from-right fade-in duration-300">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-bold text-xl text-white tracking-wide">{activeNode.name}</h3>
                <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest block mt-1">Country: {activeNode.country}</span>
              </div>
              <button 
                onClick={() => setActiveNode(null)}
                className="size-6 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <Box className="size-4 text-accent" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Supply Tier</div>
                  <div className="text-sm font-bold text-white">Tier {activeNode.tier} {activeNode.tier === 0 && '(Anchor)'}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <Hexagon className="size-4 text-brand" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Global Shipment Vol</div>
                  <div className="text-sm font-mono font-bold text-white">{(activeNode.shipment_volume || 0).toLocaleString()} TU</div>
                </div>
              </div>

              {/* HS Codes from real trace data */}
              {activeNode.hs_codes && activeNode.hs_codes.length > 0 && (
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-2">HS Codes</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNode.hs_codes.slice(0, 5).map((code: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-brand/20 text-brand text-[10px] font-mono font-bold rounded-md border border-brand/30">
                        {code}
                      </span>
                    ))}
                    {activeNode.hs_codes.length > 5 && (
                      <span className="text-[10px] text-white/40 font-bold self-center">+{activeNode.hs_codes.length - 5} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Financial Health Section (Hackathon Special) */}
              {(activeNode.risk?.financial_risk_score > 0 || activeNode.risk?.financial_warnings?.length > 0) && (
                <div className="bg-white/5 p-4 rounded-xl border border-brand/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <DollarSign className="size-12 text-brand" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="size-4 text-brand" />
                    <span className="text-[10px] uppercase font-bold text-white/80 tracking-widest">Financial Intelligence</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-white/50">Risk Score</span>
                      <span className={`text-sm font-bold ${activeNode.risk.financial_risk_score > 70 ? 'text-red-400' : 'text-brand'}`}>
                        {activeNode.risk.financial_risk_score.toFixed(0)}/100
                      </span>
                    </div>
                    
                    {activeNode.risk.financial_metrics?.current_ratio && (
                      <div className="flex justify-between items-end border-t border-white/5 pt-2">
                        <span className="text-[10px] text-white/40 uppercase">Current Ratio</span>
                        <span className={`text-xs font-mono font-bold ${activeNode.risk.financial_metrics.current_ratio < 1 ? 'text-orange-400' : 'text-green-400'}`}>
                          {activeNode.risk.financial_metrics.current_ratio}
                        </span>
                      </div>
                    )}

                    {activeNode.risk.financial_warnings?.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {activeNode.risk.financial_warnings.map((w, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <div className="size-1 rounded-full bg-brand mt-1.5" />
                            <p className="text-[10px] text-white/70 leading-tight">{w}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeNode.risk?.overall_level === "high" && (
                <div className="mt-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex gap-3 items-start">
                  <ShieldAlert className="size-5 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">Critical Risk</h4>
                    <p className="text-xs text-red-200/80 mt-1 leading-relaxed">
                      {activeNode.risk.is_sanctioned ? "Entity flagged under active sanctions lists. Immediate divestiture required." : "High geopolitical or concentration risk detected in region."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        .radial-gradient-dark {
          background: radial-gradient(circle at center, rgba(15, 20, 30, 1) 0%, rgba(5, 5, 8, 1) 100%);
        }
      `}</style>
    </main>
  );
}
