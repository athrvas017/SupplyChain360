// @ts-nocheck
import React, { useMemo, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { Layers } from 'lucide-react';
import { getTierColor } from '../utils/colors';

export default function GlobeView({ nodes, edges, onNodeClick }: any) {
  const globeRef = useRef<any>(null);

  const globeData = useMemo(() => {
    // 1. Convert nodes to points
    const points = nodes.map(n => ({
      id: n.id,
      name: n.name,
      country: n.country || '',
      lat: n.lat || 0,
      lng: n.lng || 0,
      color: getTierColor(n.tier),
      size: n.tier === 0 ? 0.3 : 0.15,
      tier: n.tier
    }));

    // 2. Convert edges to arcs
    const arcs = edges.map(e => {
      const sourceNode = nodes.find(n => n.id === e.source);
      const targetNode = nodes.find(n => n.id === e.target);
      
      if (!sourceNode || !targetNode || 
          (sourceNode.lat === 0 && sourceNode.lng === 0) || 
          (targetNode.lat === 0 && targetNode.lng === 0)) {
        return null;
      }

      return {
        startLat: sourceNode.lat,
        startLng: sourceNode.lng,
        endLat: targetNode.lat,
        endLng: targetNode.lng,
        color: getTierColor(sourceNode.tier),
        label: `${e.hs_code}: ${e.hs_description}`,
        weight: Math.log(e.total_weight_kg / 1000 + 1) * 0.1
      };
    }).filter(Boolean);

    return { points, arcs };
  }, [nodes, edges]);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enablePan = true;
      controls.enableZoom = true;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      
      if (nodes && nodes.length > 0) {
        const anchor = nodes.find((n: any) => n.tier === 0) || nodes[0];
        globeRef.current.pointOfView({ lat: anchor.lat || 20, lng: anchor.lng || 0, altitude: 2.0 }, 1000);
      } else {
        globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
      }
    }
  }, [nodes]);

  return (
    <div className="globe-container" onMouseDown={() => {
      if (globeRef.current) globeRef.current.controls().autoRotate = false;
    }}>
      <Globe
        ref={globeRef}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        
        pointsData={globeData.points}
        pointColor="color"
        pointAltitude="size"
        pointRadius={0.4}
        pointLabel="name"
        onPointClick={(pt) => {
           const node = nodes.find(n => n.id === pt.id);
           if (node) onNodeClick(node);
        }}

        ringsData={globeData.points}
        ringColor={(d: any) => (t: number) => {
           const colorMap = { 0: '239,68,68', 1: '249,115,22', 2: '16,185,129', 3: '6,182,212', 4: '217,70,239' };
           const rgb = colorMap[d.tier as keyof typeof colorMap] || '217,70,239';
           return `rgba(${rgb}, ${Math.max(0, 1 - t)})`;
        }}
        ringMaxRadius={d => d.tier === 0 ? 8 : 4}
        ringPropagationSpeed={1}
        ringRepeatPeriod={1000}

        labelsData={globeData.points}
        labelLat="lat"
        labelLng="lng"
        labelText={(d: any) => `${d.name} (${d.country})`}
        labelSize={(d: any) => d.tier === 0 ? 1.5 : 1}
        labelDotRadius={0.3}
        labelColor={() => 'rgba(255, 255, 255, 0.9)'}
        labelResolution={3}
        labelAltitude="size"

        arcsData={globeData.arcs}
        arcColor="color"
        arcDashLength={0.6}
        arcDashGap={0.3}
        arcDashAnimateTime={1500}
        arcAltitudeAutoScale={0.2}
        arcStroke="weight"
        arcLabel="label"
        
        atmosphereColor="hsl(var(--brand))"
        atmosphereAltitude={0.15}
      />

      <div className="globe-overlay-info">
        <div className="interaction-guide">
           <Layers size={12} /> DRAG TO ROTATE · SCROLL TO ZOOM
        </div>
        <div className="discovery-legend" style={{ minWidth: 200 }}>
           <h4 style={{ margin: '0 0 8px 0', fontSize: 11, color: 'hsl(var(--foreground))', letterSpacing: 1 }}>SUPPLY CHAIN TIERS</h4>
           <span className="legend-item"><i style={{background: getTierColor(0), boxShadow: `0 0 8px ${getTierColor(0)}`}} /> Anchor Company</span>
           <span className="legend-item"><i style={{background: getTierColor(1), boxShadow: `0 0 8px ${getTierColor(1)}`}} /> Tier 1 (Direct Suppliers)</span>
           <span className="legend-item"><i style={{background: getTierColor(2), boxShadow: `0 0 8px ${getTierColor(2)}`}} /> Tier 2 (Sub-assembly)</span>
           <span className="legend-item"><i style={{background: getTierColor(3), boxShadow: `0 0 8px ${getTierColor(3)}`}} /> Tier 3 (Components)</span>
           <span className="legend-item"><i style={{background: getTierColor(4), boxShadow: `0 0 8px ${getTierColor(4)}`}} /> Tier 4 (Raw Materials)</span>
           <div style={{ height: 1, background: 'hsl(var(--border))', margin: '8px 0' }} />
           <span className="legend-item"><span style={{ width: 12, height: 2, background: 'hsl(var(--foreground))' }} /> Import Vector</span>
           
           <button className="btn btn-primary btn-xs" style={{marginTop: 12, fontSize: 9, width: '100%'}} onClick={() => {
             const anchor = nodes.find((n: any) => n.tier === 0);
             if (anchor && globeRef.current) {
                globeRef.current.pointOfView({ lat: anchor.lat, lng: anchor.lng, altitude: 1.5 }, 1000);
             }
           }}>Focus on Anchor</button>
        </div>
      </div>

      <style>{`
        .globe-container {
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, hsl(var(--background)) 0%, hsl(var(--brand-soft) / 0.3) 100%);
          overflow: hidden;
          position: absolute;
          inset: 0;
          cursor: grab;
        }
        .globe-container:active {
          cursor: grabbing;
        }
        .globe-overlay-info {
           position: absolute;
           bottom: 24px;
           left: 24px;
           z-index: 10;
           display: flex;
           flex-direction: column;
           gap: 12px;
        }
        .interaction-guide {
          background: hsl(var(--brand) / 0.1);
          backdrop-filter: blur(12px);
          padding: 8px 14px;
          border-radius: 20px;
          border: 1px solid hsl(var(--brand) / 0.2);
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 800;
          color: hsl(var(--brand));
          display: flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .discovery-legend {
          background: hsl(var(--card) / 0.85);
          backdrop-filter: blur(16px);
          padding: 16px;
          border-radius: 16px;
          border: 1px solid hsl(var(--border));
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: var(--shadow-soft);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
        }
        .legend-item i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
