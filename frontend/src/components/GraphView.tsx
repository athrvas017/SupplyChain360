/**
 * GraphView — Incremental D3 force graph.
 *
 * Critical design:
 *  - The SVG / simulation are created ONCE and live in refs.
 *  - When new nodes/edges arrive the D3 join just adds elements; no full re-render.
 *  - Disruption overlays update node/edge styling without touching the simulation.
 */
import { useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import * as d3 from 'd3';
import { getRiskColor, getCountryFlag } from '../utils/colors';

// ── Color palette (dark-optimised) ─────────────────────────────────────────
const TIER_PALETTE = [
  '#F59E0B', // T0 – amber anchor
  '#6366F1', // T1 – indigo
  '#06B6D4', // T2 – cyan
  '#10B981', // T3 – emerald
  '#8B5CF6', // T4 – violet
  '#EC4899', // T5 – pink
];
const tc = (tier: number) => TIER_PALETTE[Math.min(tier, TIER_PALETTE.length - 1)] ?? '#94A3B8';

function nodeR(d: any): number {
  const base = d.tier === 0 ? 22 : 15;
  const vol  = Math.log((d.shipment_volume || 1000) / 1000 + 1) * 2;
  return base + Math.min(vol, 7);
}

// ── Props ───────────────────────────────────────────────────────────────────
interface Props {
  nodes: any[];
  edges: any[];
  onNodeClick?: (node: any) => void;
  onNodeExpand?: (name: string, hsCodes: string[]) => void;
  selectedNodeId?: string | null;
  blastRadiusIds?: string[];
  disruptedNodeId?: string | null;
  alternativeEdge?: { source: string; target: string } | null;
  onSimulateDisruption?: (node: any) => void;
}

// ── Component ───────────────────────────────────────────────────────────────
const GraphView = forwardRef<any, Props>((props, ref) => {
  const {
    nodes, edges,
    onNodeClick, onNodeExpand, onSimulateDisruption,
    selectedNodeId,
    blastRadiusIds = [], disruptedNodeId = null, alternativeEdge = null,
  } = props;

  // ── DOM refs ─────────────────────────────────────────────────────────────
  const svgRef       = useRef<SVGSVGElement | null>(null);
  const gRef         = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const zoomRef      = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const simRef       = useRef<d3.Simulation<any, any> | null>(null);
  const linksGRef    = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const labelsGRef   = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const nodesGRef    = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const healingRef   = useRef<any>(null); // { el, srcNode, tgtNode }

  // ── Incremental tracking refs ─────────────────────────────────────────────
  const initRef       = useRef(false);
  const simNodesRef   = useRef<any[]>([]);       // D3 node objects WITH x,y
  const simLinksRef   = useRef<any[]>([]);
  const renderedNodes = useRef(new Set<string>());
  const renderedEdges = useRef(new Set<string>());

  // ── Derived ──────────────────────────────────────────────────────────────
  const blastSet         = useMemo(() => new Set(blastRadiusIds), [blastRadiusIds]);
  const isDisruptionMode = blastRadiusIds.length > 0 || !!disruptedNodeId;

  // Keep latest props accessible without being deps (avoids stale closure)
  const propsRef = useRef(props);
  propsRef.current = props;

  // ── Expose zoomToNode ────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    zoomToNode: (nodeId: string) => {
      const node = simNodesRef.current.find(n => n.id === nodeId);
      if (!node || !svgRef.current || !zoomRef.current) return;
      const el = svgRef.current.parentElement!;
      d3.select(svgRef.current).transition().duration(750).call(
        zoomRef.current.transform,
        d3.zoomIdentity
          .translate(el.clientWidth / 2, el.clientHeight / 2)
          .scale(1.3)
          .translate(-(node.x ?? 0), -(node.y ?? 0)),
      );
    },
  }));

  // ── EFFECT 1: Base graph (init + incremental) ────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;

    // ── RESET ───────────────────────────────────────────────────────────────
    if (nodes.length === 0) {
      if (simRef.current) simRef.current.stop();
      d3.select(svgRef.current).selectAll('*').remove();
      initRef.current     = false;
      simNodesRef.current = [];
      simLinksRef.current = [];
      renderedNodes.current.clear();
      renderedEdges.current.clear();
      healingRef.current  = null;
      return;
    }

    const svg       = d3.select(svgRef.current);
    const container = svgRef.current.parentElement!;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // ── INIT (first time a non-empty graph arrives) ─────────────────────────
    if (!initRef.current) {
      svg.attr('viewBox', `0 0 ${W} ${H}`).selectAll('*').remove();

      // Global keyframes (injected once)
      if (!document.getElementById('gv-styles')) {
        const s   = document.createElement('style');
        s.id      = 'gv-styles';
        s.textContent = `
          @keyframes gvFadeIn  { from { opacity: 0 } to { opacity: 1 } }
          @keyframes gvDash    { to   { stroke-dashoffset: -24 } }
          @keyframes gvPulse   {
            0%,100% { r: var(--pr,12); opacity: .8; }
            60%     { r: var(--pr-big,28); opacity: 0; }
          }
          .gv-node-enter { animation: gvFadeIn .5s ease both; }
        `;
        document.head.appendChild(s);
      }

      // ── SVG defs ──────────────────────────────────────────────────────────
      const defs = svg.append('defs');

      // Arrow heads — small and proportional to stroke width
      const mkArrow = (id: string, col: string, size = 4) =>
        defs.append('marker').attr('id', id)
          .attr('viewBox', `0 0 10 8`)
          .attr('refX', 25).attr('refY', 4)
          .attr('markerWidth', size).attr('markerHeight', size * 0.8)
          .attr('orient', 'auto')
          .append('path').attr('d', 'M0,0 L10,4 L0,8 Z').attr('fill', col);
      mkArrow('gv-arr',       'rgba(255,255,255,0.35)', 4);
      mkArrow('gv-arr-red',   '#EF4444', 5);
      mkArrow('gv-arr-green', '#22C55E', 6);

      // Glow filters
      const mkGlow = (id: string, col: string, std = 4) => {
        const f = defs.append('filter').attr('id', id)
          .attr('x', '-60%').attr('y', '-60%').attr('width', '220%').attr('height', '220%');
        f.append('feGaussianBlur').attr('stdDeviation', std).attr('in', 'SourceGraphic').attr('result', 'blur');
        f.append('feFlood').attr('flood-color', col).attr('result', 'color');
        f.append('feComposite').attr('in', 'color').attr('in2', 'blur').attr('operator', 'in').attr('result', 'shadow');
        const merge = f.append('feMerge');
        merge.append('feMergeNode').attr('in', 'shadow');
        merge.append('feMergeNode').attr('in', 'SourceGraphic');
      };
      mkGlow('gv-glow-t0',    '#F59E0B', 7);
      mkGlow('gv-glow-sel',   '#818CF8', 6);
      mkGlow('gv-glow-red',   '#EF4444', 9);
      mkGlow('gv-glow-green', '#22C55E', 6);

      // Dot grid pattern
      const pat = defs.append('pattern').attr('id', 'gv-grid')
        .attr('width', 32).attr('height', 32).attr('patternUnits', 'userSpaceOnUse');
      pat.append('circle').attr('cx', 16).attr('cy', 16).attr('r', 0.8)
        .attr('fill', 'rgba(255,255,255,0.06)');

      // Background rect
      svg.append('rect').attr('width', W).attr('height', H)
        .attr('fill', '#080c18');
      svg.append('rect').attr('width', W).attr('height', H)
        .attr('fill', 'url(#gv-grid)');

      // ── Main group + zoom ─────────────────────────────────────────────────
      const g = svg.append('g').attr('class', 'gv-root');
      gRef.current = g;

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.08, 8])
        .on('zoom', ev => g.attr('transform', ev.transform));
      zoomRef.current = zoom;
      svg.call(zoom);
      svg.call(zoom.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(0.65));

      // ── Layer groups (z-order: links < labels < nodes) ────────────────────
      linksGRef.current  = g.append('g').attr('class', 'gv-links');
      labelsGRef.current = g.append('g').attr('class', 'gv-labels');
      nodesGRef.current  = g.append('g').attr('class', 'gv-nodes');

      // ── Force simulation ──────────────────────────────────────────────────
      const sim = d3.forceSimulation<any>()
        .force('link', d3.forceLink<any, any>()
          .id(d => d.id)
          .distance(d => 115 + (d.target?.tier ?? 0) * 28))
        .force('charge', d3.forceManyBody().strength(-580).distanceMax(600))
        .force('center', d3.forceCenter(0, 0))
        .force('y', d3.forceY<any>(d => (d.tier ?? 0) * 175).strength(0.42))
        .force('collision', d3.forceCollide<any>().radius(d => nodeR(d) + 18))
        .alphaDecay(0.025)
        .velocityDecay(0.38);
      simRef.current = sim;

      // Tick — updates positions of all rendered elements
      sim.on('tick', () => {
        linksGRef.current?.selectAll<SVGLineElement, any>('line')
          .attr('x1', d => d.source.x ?? 0).attr('y1', d => d.source.y ?? 0)
          .attr('x2', d => d.target.x ?? 0).attr('y2', d => d.target.y ?? 0);

        labelsGRef.current?.selectAll<SVGTextElement, any>('text')
          .attr('x', d => ((d.source.x ?? 0) + (d.target.x ?? 0)) / 2)
          .attr('y', d => ((d.source.y ?? 0) + (d.target.y ?? 0)) / 2);

        nodesGRef.current?.selectAll<SVGGElement, any>('.gv-node-g')
          .attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`);

        // Healing line
        if (healingRef.current) {
          const { el, sn, tn } = healingRef.current;
          el?.attr('x1', sn.x ?? 0).attr('y1', sn.y ?? 0)
            .attr('x2', tn.x ?? 0).attr('y2', tn.y ?? 0);
        }
      });

      initRef.current = true;
    }

    // ── INCREMENTAL: add new nodes ────────────────────────────────────────
    const newNodes = nodes.filter(n => !renderedNodes.current.has(n.id));
    if (newNodes.length) {
      newNodes.forEach(n => {
        const obj = { ...n };
        simNodesRef.current.push(obj);
        renderedNodes.current.add(n.id);
      });
      simRef.current!.nodes(simNodesRef.current);
    }

    // ── INCREMENTAL: add new edges ────────────────────────────────────────
    const nodeById = new Map(simNodesRef.current.map(n => [n.id, n]));
    const newEdges = edges.filter(e => {
      const key = `${e.source}→${e.target}`;
      if (renderedEdges.current.has(key)) return false;
      if (!nodeById.has(e.source) || !nodeById.has(e.target)) return false;
      return true;
    });
    if (newEdges.length) {
      newEdges.forEach(e => {
        simLinksRef.current.push({ ...e });
        renderedEdges.current.add(`${e.source}→${e.target}`);
      });
      (simRef.current!.force('link') as d3.ForceLink<any, any>)
        .links(simLinksRef.current);
    }

    if (newNodes.length || newEdges.length) {
      const warm = Math.max(0.15, simRef.current!.alpha());
      simRef.current!.alpha(warm).restart();
    }

    // ── RENDER new nodes via D3 join ──────────────────────────────────────
    if (nodesGRef.current && newNodes.length) {
      nodesGRef.current
        .selectAll<SVGGElement, any>('.gv-node-g')
        .data(simNodesRef.current, d => d.id)
        .join(enter => {
          const g = enter.append('g')
            .attr('class', 'gv-node-g gv-node-enter')
            .style('cursor', 'pointer')
            .on('click', (_ev, d) => propsRef.current.onNodeClick?.(d))
            .on('dblclick', (ev, d) => { ev.stopPropagation(); propsRef.current.onNodeExpand?.(d.name, d.hs_codes); })
            .on('contextmenu', (ev, d) => { ev.preventDefault(); propsRef.current.onSimulateDisruption?.(d); })
            .on('mouseenter', function(_ev, d) {
              d3.select(this).raise()
                .select('.gv-main-circle')
                .transition().duration(140)
                .attr('r', nodeR(d) * 1.22);
            })
            .on('mouseleave', function(_ev, d) {
              d3.select(this).select('.gv-main-circle')
                .transition().duration(140)
                .attr('r', nodeR(d));
            })
            .call(d3.drag<SVGGElement, any>()
              .on('start', (ev, d) => { if (!ev.active) simRef.current!.alphaTarget(0.25).restart(); d.fx = d.x; d.fy = d.y; })
              .on('drag',  (ev, d) => { d.fx = ev.x; d.fy = ev.y; })
              .on('end',   (ev, d) => { if (!ev.active) simRef.current!.alphaTarget(0); d.fx = null; d.fy = null; }));

          // Outer ambient glow ring (animates for Tier 0)
          g.append('circle').attr('class', 'gv-glow-ring')
            .attr('r', d => nodeR(d) + 12)
            .attr('fill', 'none')
            .attr('stroke', d => d.tier === 0 ? '#F59E0B' : tc(d.tier ?? 0))
            .attr('stroke-width', d => d.tier === 0 ? 1.5 : 0.8)
            .attr('stroke-opacity', d => d.tier === 0 ? 0.45 : 0.12);

          // Risk indicator ring
          g.append('circle').attr('class', 'gv-risk-ring')
            .attr('r', d => nodeR(d) + 5)
            .attr('fill', 'none')
            .attr('stroke', d => {
              const risk = d.risk?.overall_level ?? 'low';
              return risk === 'low' ? 'transparent' : getRiskColor(risk);
            })
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', d => d.risk?.is_sanctioned ? '4,3' : 'none')
            .attr('opacity', 0.85);

          // Main filled circle
          g.append('circle').attr('class', 'gv-main-circle')
            .attr('r', d => nodeR(d))
            .attr('fill', d => tc(d.tier ?? 0))
            .attr('stroke', 'rgba(255,255,255,0.08)')
            .attr('stroke-width', 1)
            .attr('opacity', 0.92)
            .attr('filter', d => d.tier === 0 ? 'url(#gv-glow-t0)' : null);

          // ⚠ icon for sanctioned
          g.filter(d => d.risk?.is_sanctioned)
            .append('text').text('⚠')
            .attr('font-size', '11px').attr('text-anchor', 'middle').attr('dy', -2)
            .attr('fill', '#FCA5A5').style('pointer-events', 'none');

          // Tier badge / star
          g.append('text').attr('class', 'gv-tier-badge')
            .text(d => d.tier === 0 ? '★' : `T${d.tier}`)
            .attr('font-size', d => d.tier === 0 ? '11px' : '8px')
            .attr('font-weight', '900')
            .attr('fill', d => d.tier === 0 ? '#1C1917' : 'rgba(255,255,255,0.88)')
            .attr('text-anchor', 'middle')
            .attr('dy', d => (d.risk?.is_sanctioned) ? -2 : 4)
            .style('pointer-events', 'none');

          // Company name label (below node)
          g.append('text').attr('class', 'gv-name-label')
            .text(d => `${getCountryFlag(d.country)} ${(d.name || '').slice(0, 21)}`)
            .attr('font-size', '9.5px').attr('font-weight', '700')
            .attr('fill', 'rgba(226,232,240,0.82)')
            .attr('text-anchor', 'middle')
            .attr('dy', d => nodeR(d) + 16)
            .attr('font-family', 'Inter, system-ui, sans-serif')
            .style('pointer-events', 'none');

          // Country sub-label
          g.append('text').attr('class', 'gv-country-label')
            .text(d => d.country ?? '')
            .attr('font-size', '7.5px').attr('font-weight', '500')
            .attr('fill', 'rgba(148,163,184,0.55)')
            .attr('text-anchor', 'middle')
            .attr('dy', d => nodeR(d) + 27)
            .style('pointer-events', 'none');

          return g;
        });
    }

    // ── RENDER new edges via D3 join ──────────────────────────────────────
    if (linksGRef.current && newEdges.length) {
      linksGRef.current
        .selectAll<SVGLineElement, any>('line')
        .data(simLinksRef.current, d => `${(d.source as any)?.id ?? d.source}→${(d.target as any)?.id ?? d.target}`)
        .join(
          enter => enter.append('line')
            .attr('stroke', d => tc(typeof d.target === 'object' ? d.target.tier ?? 0 : 0))
            .attr('stroke-opacity', 0)
            .attr('stroke-width', d => {
              const w = (d.total_weight_kg as number) || 1000;
              return Math.max(1, Math.min(3, Math.log(w / 500 + 1)));
            })
            .attr('marker-end', 'url(#gv-arr)')
            .call(sel => sel.transition().duration(500).delay(150).attr('stroke-opacity', 0.45)),
          update => update,
          exit   => exit.remove(),
        );
    }

    // ── RENDER edge labels ────────────────────────────────────────────────
    if (labelsGRef.current && newEdges.length) {
      labelsGRef.current
        .selectAll<SVGTextElement, any>('text')
        .data(simLinksRef.current, d => `${(d.source as any)?.id ?? d.source}→${(d.target as any)?.id ?? d.target}`)
        .join(
          enter => enter.append('text')
            .text((d: any) => (d.hs_code ?? '').slice(0, 11))
            .attr('font-size', '8px').attr('font-weight', '600')
            .attr('fill', 'rgba(148,163,184,0.45)')
            .attr('text-anchor', 'middle').attr('dy', -5)
            .style('pointer-events', 'none'),
          update => update,
          exit   => exit.remove(),
        );
    }
  // Only re-run when the count changes, not on every graphData object reference change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length, edges.length]);

  // ── EFFECT 2: Disruption overlays (only restyling, no topology change) ──
  useEffect(() => {
    if (!initRef.current || !nodesGRef.current || !linksGRef.current) return;

    // Node styling
    nodesGRef.current.selectAll<SVGGElement, any>('.gv-node-g').each(function(d) {
      const ng   = d3.select(this);
      const circ = ng.select<SVGCircleElement>('.gv-main-circle');

      if (d.id === disruptedNodeId) {
        circ.attr('fill', '#7F1D1D').attr('filter', 'url(#gv-glow-red)');
        ng.style('opacity', '1');
        if (ng.select('.gv-pulse-ring').empty()) {
          // Use D3 attr transition repeat — avoids CSS transform/SVG transform conflict
          const pr = ng.insert('circle', ':first-child').attr('class', 'gv-pulse-ring')
            .attr('r', nodeR(d) + 6).attr('fill', 'none')
            .attr('stroke', '#EF4444').attr('stroke-width', 1.5)
            .attr('stroke-opacity', 0.8).attr('stroke-dasharray', '4,3');
          // Animate r with D3 repeating transition
          const pulseR = () => {
            pr.attr('r', nodeR(d) + 6).attr('stroke-opacity', 0.8)
              .transition().duration(1200).ease(d3.easePolyOut)
              .attr('r', nodeR(d) + 22).attr('stroke-opacity', 0)
              .on('end', pulseR);
          };
          pulseR();
        }
      } else if (blastSet.has(d.id)) {
        circ.attr('fill', '#991B1B').attr('filter', null);
        ng.style('opacity', '1');
        ng.select('.gv-pulse-ring').remove();
      } else if (isDisruptionMode) {
        circ.attr('fill', tc(d.tier ?? 0)).attr('filter', null);
        ng.style('opacity', '0.22');
        ng.select('.gv-pulse-ring').remove();
      } else {
        circ.attr('fill', tc(d.tier ?? 0))
          .attr('filter', d.tier === 0 ? 'url(#gv-glow-t0)' : null);
        ng.style('opacity', '1');
        ng.select('.gv-pulse-ring').remove();
      }
    });

    // Edge styling
    linksGRef.current.selectAll<SVGLineElement, any>('line').each(function(d) {
      const sid  = typeof d.source === 'object' ? d.source.id : d.source;
      const line = d3.select(this);
      const affected = sid === disruptedNodeId || blastSet.has(sid);
      if (isDisruptionMode && affected) {
        line.attr('stroke', '#EF4444').attr('stroke-opacity', 0.7)
          .attr('stroke-width', 2).attr('stroke-dasharray', '7,5')
          .attr('marker-end', 'url(#gv-arr-red)')
          .style('animation', 'gvDash 1.2s linear infinite');
      } else {
        const tier = typeof d.target === 'object' ? d.target.tier ?? 0 : 0;
        const w = (d.total_weight_kg as number) || 1000;
        line.attr('stroke', tc(tier))
          .attr('stroke-opacity', isDisruptionMode ? 0.06 : 0.45)
          .attr('stroke-width', Math.max(1, Math.min(3, Math.log(w / 500 + 1))))
          .attr('stroke-dasharray', 'none')
          .attr('marker-end', 'url(#gv-arr)').style('animation', 'none');
      }
    });

    // Healing edge
    if (gRef.current) {
      gRef.current.select('.gv-heal-line').remove();
      healingRef.current = null;

      if (alternativeEdge) {
        const sn = simNodesRef.current.find(n => n.id === alternativeEdge.source);
        const tn = simNodesRef.current.find(n => n.id === alternativeEdge.target);
        if (sn && tn) {
          const el = gRef.current.append('line').attr('class', 'gv-heal-line')
            .attr('stroke', '#22C55E').attr('stroke-width', 2.8)
            .attr('stroke-dasharray', '9,5').attr('stroke-opacity', 0.9)
            .attr('marker-end', 'url(#gv-arr-green)')
            .attr('filter', 'url(#gv-glow-green)')
            .style('animation', 'gvDash 1.5s linear infinite')
            .attr('x1', sn.x ?? 0).attr('y1', sn.y ?? 0)
            .attr('x2', tn.x ?? 0).attr('y2', tn.y ?? 0);
          healingRef.current = { el, sn, tn };
        }
      }
    }
  }, [blastSet, disruptedNodeId, isDisruptionMode, alternativeEdge]);

  // ── EFFECT 3: Selection highlight ────────────────────────────────────────
  useEffect(() => {
    if (!initRef.current || !nodesGRef.current) return;
    nodesGRef.current.selectAll<SVGGElement, any>('.gv-node-g').each(function(d) {
      const ng   = d3.select(this);
      const circ = ng.select<SVGCircleElement>('.gv-main-circle');
      const risk = ng.select<SVGCircleElement>('.gv-risk-ring');
      if (d.id === selectedNodeId) {
        circ.attr('filter', 'url(#gv-glow-sel)');
        risk.attr('stroke', '#818CF8').attr('stroke-width', 2.5).attr('stroke-opacity', 1);
      } else if (d.id !== disruptedNodeId && !blastSet.has(d.id)) {
        circ.attr('filter', d.tier === 0 ? 'url(#gv-glow-t0)' : null);
        const riskLevel = d.risk?.overall_level ?? 'low';
        risk.attr('stroke', riskLevel === 'low' ? 'transparent' : getRiskColor(riskLevel))
          .attr('stroke-width', 2).attr('stroke-opacity', 0.85);
      }
    });
  }, [selectedNodeId, disruptedNodeId, blastSet]);

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!nodes.length) {
    return (
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(100,116,139,0.6)', fontSize: 13, gap: 10, pointerEvents: 'none',
      }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="24" cy="24" r="5" fill="rgba(99,102,241,0.4)" />
          <line x1="24" y1="2" x2="24" y2="10" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" />
          <line x1="2" y1="24" x2="10" y2="24" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" />
          <line x1="38" y1="24" x2="46" y2="24" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" />
          <line x1="24" y1="38" x2="24" y2="46" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" />
        </svg>
        <span>Search a company to trace the supply chain</span>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', flex: 1, width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* Tier legend */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        display: 'flex', flexDirection: 'column', gap: 5,
        background: 'rgba(8,12,24,0.72)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12, padding: '10px 13px',
        pointerEvents: 'none',
      }}>
        {TIER_PALETTE.slice(0, Math.min(5, Math.max(...nodes.map(n => n.tier ?? 0)) + 1)).map((col, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: col, boxShadow: `0 0 6px ${col}55` }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(226,232,240,0.55)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              {i === 0 ? 'Anchor (T0)' : `Tier ${i}`}
            </span>
          </div>
        ))}
      </div>

      {/* Stats badge */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14,
        display: 'flex', gap: 10,
        pointerEvents: 'none',
      }}>
        {[
          { label: 'Nodes', val: nodes.length },
          { label: 'Edges', val: edges.length },
        ].map(({ label, val }) => (
          <div key={label} style={{
            background: 'rgba(8,12,24,0.72)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8, padding: '5px 11px',
            fontSize: 10, fontWeight: 700,
            color: 'rgba(148,163,184,0.65)',
          }}>
            <span style={{ color: 'rgba(226,232,240,0.85)', marginRight: 4 }}>{val}</span>{label}
          </div>
        ))}
      </div>

      {/* Disruption mode badge */}
      {isDisruptionMode && (
        <div style={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 20, padding: '6px 18px',
          fontSize: 11, color: '#FCA5A5', fontWeight: 700, letterSpacing: '0.05em',
          backdropFilter: 'blur(8px)', pointerEvents: 'none',
        }}>
          ⚡ DISRUPTION ACTIVE — {blastRadiusIds.length} nodes in blast radius
          &nbsp;&nbsp;·&nbsp;&nbsp;Right-click any node to simulate
        </div>
      )}

      {/* Hint overlay when no disruption */}
      {!isDisruptionMode && nodes.length > 0 && (
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          background: 'rgba(8,12,24,0.72)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10, padding: '6px 13px',
          fontSize: 9.5, color: 'rgba(100,116,139,0.65)', fontWeight: 600,
          letterSpacing: '0.05em', lineHeight: 1.5,
          pointerEvents: 'none',
        }}>
          Scroll to zoom · Drag to pan · Right-click node → Simulate Disruption
        </div>
      )}
    </div>
  );
});

GraphView.displayName = 'GraphView';
export default GraphView;
