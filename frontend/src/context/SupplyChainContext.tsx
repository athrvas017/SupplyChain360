import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { startBuild, createWebSocket, getGraph } from '../utils/api';

interface SupplyChainState {
  nodes: any[];
  edges: any[];
  status: 'idle' | 'building' | 'complete' | 'error';
  currentTier: number;
  stats: { nodes: number; edges: number };
  concentrationRisk: any[];
  error: string | null;
  logs: string[];
  initialSearchText: string;
  setInitialSearchText: (text: string) => void;
  lastJobId: string | null;
  buildSupplyChain: (companyName: string, selectedHSCodes?: string[], maxTiers?: number) => Promise<void>;
  reset: () => void;
}

const SupplyChainContext = createContext<SupplyChainState | undefined>(undefined);

export function SupplyChainProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'building' | 'complete' | 'error'>('idle');
  const [currentTier, setCurrentTier] = useState(0);
  const [stats, setStats] = useState({ nodes: 0, edges: 0 });
  const [concentrationRisk, setConcentrationRisk] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [initialSearchText, setInitialSearchTextState] = useState(() => {
    return sessionStorage.getItem('supplylens_company') || "";
  });

  const setInitialSearchText = useCallback((text: string) => {
    sessionStorage.setItem('supplylens_company', text);
    setInitialSearchTextState(text);
  }, []);

  const [lastJobId, setLastJobId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // ── Batching refs (avoid 1-re-render-per-node) ─────────────────────────────
  const pendingNodesRef = useRef<any[]>([]);
  const pendingEdgesRef = useRef<any[]>([]);
  const batchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const batchNodeCount = useRef(0);
  const batchEdgeCount = useRef(0);

  /** Flush buffered nodes/edges to React state as a single batch */
  const flushBatch = useCallback(() => {
    batchTimerRef.current = null;
    const ns = pendingNodesRef.current.splice(0);
    const es = pendingEdgesRef.current.splice(0);
    if (ns.length) {
      setNodes(prev => [...prev, ...ns]);
      setStats(prev => ({ ...prev, nodes: prev.nodes + ns.length }));
    }
    if (es.length) {
      setEdges(prev => [...prev, ...es]);
      setStats(prev => ({ ...prev, edges: prev.edges + es.length }));
    }
  }, []);

  const scheduleBatch = useCallback(() => {
    if (!batchTimerRef.current) {
      batchTimerRef.current = setTimeout(flushBatch, 200); // collect 200 ms of events
    }
  }, [flushBatch]);

  // ── Fallback poll ─────────────────────────────────────────────────────────
  const pollForResult = useCallback(async (jobId: string) => {
    try {
      const result = await getGraph(jobId);
      if (result.graph) {
        setNodes(result.graph.nodes || []);
        setEdges(result.graph.edges || []);
        setConcentrationRisk(result.concentration_risk || []);
        setStats({ nodes: result.stats?.total_nodes || 0, edges: result.stats?.total_edges || 0 });
        setStatus('complete');
      }
    } catch {
      setStatus('error');
      setError('Failed to fetch results');
    }
  }, []);

  // ── Main builder ─────────────────────────────────────────────────────────
  const buildSupplyChain = useCallback(async (
    companyName: string,
    selectedHSCodes?: string[],
    maxTiers = 4,
  ) => {
    // Cancel any in-flight build
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    if (batchTimerRef.current) { clearTimeout(batchTimerRef.current); batchTimerRef.current = null; }

    // Reset everything
    setNodes([]);
    setEdges([]);
    setLogs([]);
    setStatus('building');
    setCurrentTier(0);
    setStats({ nodes: 0, edges: 0 });
    setConcentrationRisk([]);
    setError(null);
    setInitialSearchText(companyName);
    pendingNodesRef.current = [];
    pendingEdgesRef.current = [];
    batchNodeCount.current = 0;
    batchEdgeCount.current = 0;

    try {
      const { job_id } = await startBuild(companyName, selectedHSCodes, maxTiers);
      setLastJobId(job_id);
      const ws = createWebSocket(job_id);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const update = JSON.parse(event.data);

        switch (update.type) {
          case 'status_msg':
            setLogs(prev => [...prev.slice(-14), update.data.msg]);
            break;

          case 'node_added':
            // Buffer — don't call setNodes immediately
            pendingNodesRef.current.push(update.data);
            batchNodeCount.current++;
            scheduleBatch();
            break;

          case 'edge_added':
            pendingEdgesRef.current.push(update.data);
            batchEdgeCount.current++;
            scheduleBatch();
            break;

          case 'tier_complete':
            // Flush immediately on tier boundary so graph reveals tier-by-tier
            if (batchTimerRef.current) {
              clearTimeout(batchTimerRef.current);
              batchTimerRef.current = null;
            }
            flushBatch();
            setCurrentTier(update.data.tier);
            break;

          case 'final_graph':
            if (batchTimerRef.current) {
              clearTimeout(batchTimerRef.current);
              batchTimerRef.current = null;
            }
            flushBatch();
            if (update.data.concentration_risk) setConcentrationRisk(update.data.concentration_risk);
            break;

          case 'complete':
            setStatus('complete');
            break;

          case 'error':
            setStatus('error');
            setError(update.data.message);
            break;
        }
      };

      ws.onerror = () => {
        setStatus('error');
        setError('WebSocket connection failed');
      };

      ws.onclose = () => {
        if (wsRef.current === ws) {
          if (batchTimerRef.current) { clearTimeout(batchTimerRef.current); flushBatch(); }
          pollForResult(job_id);
        }
      };

    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Error executing request.');
    }
  }, [scheduleBatch, flushBatch, pollForResult]);

  const reset = useCallback(() => {
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    if (batchTimerRef.current) { clearTimeout(batchTimerRef.current); batchTimerRef.current = null; }
    setNodes([]); setEdges([]); setStatus('idle'); setCurrentTier(0);
    setStats({ nodes: 0, edges: 0 }); setConcentrationRisk([]);
    setError(null); setInitialSearchText('');
    setLastJobId(null);
  }, []);

  return (
    <SupplyChainContext.Provider value={{
      nodes, edges, status, currentTier, stats, concentrationRisk, error, logs, 
      initialSearchText, setInitialSearchText, lastJobId, buildSupplyChain, reset
    }}>
      {children}
    </SupplyChainContext.Provider>
  );
}

export function useSupplyChain() {
  const ctx = useContext(SupplyChainContext);
  if (!ctx) throw new Error('useSupplyChain must be used within SupplyChainProvider');
  return ctx;
}
