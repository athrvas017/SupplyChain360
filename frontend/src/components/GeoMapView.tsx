// @ts-nocheck
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap, Circle, Marker } from 'react-leaflet';
import { getTierColor, getRiskColor, getCountryFlag, formatWeight } from '../utils/colors';

function FitBounds({ nodes }) {
  const map = useMap();

  useEffect(() => {
    if (nodes.length === 0) return;
    const validNodes = nodes.filter(n => n.lat && n.lng);
    if (validNodes.length === 0) return;

    const bounds = validNodes.map(n => [n.lat, n.lng]);
    map.fitBounds(bounds, { padding: [100, 100], maxZoom: 5 });
  }, [nodes, map]);

  return null;
}

export default function GeoMapView({ nodes, edges, onNodeClick }) {
  if (!nodes.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🌍</div>
        <div className="empty-state-title">No Geo Data</div>
        <div className="empty-state-text">
          Build a supply chain to see trade flows on the world map
        </div>
      </div>
    );
  }

  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const validNodes = nodes.filter(n => n.lat && n.lng);

  // Build arc data
  const arcs = edges
    .map(e => {
      const source = nodeMap.get(e.source);
      const target = nodeMap.get(e.target);
      if (
        typeof source?.lat !== 'number' ||
        typeof source?.lng !== 'number' ||
        typeof target?.lat !== 'number' ||
        typeof target?.lng !== 'number'
      ) return null;
      return { source, target, ...e };
    })
    .filter(Boolean);

  return (
    <div className="map-container" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        attributionControl={false}
        backgroundColor="hsl(var(--background))"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={12}
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
          maxZoom={12}
        />
        <FitBounds nodes={validNodes} />

        {/* Trade flow arcs based on data */}
        {arcs.map((arc, i) => {
          const tier = arc.source.tier || 1;
          return (
            <Polyline
              key={`arc-${i}`}
              positions={[
                [arc.source.lat, arc.source.lng],
                [arc.target.lat, arc.target.lng]
              ]}
              pathOptions={{
                color: getTierColor(tier),
                weight: Math.max(1.5, Math.log((arc.total_weight_kg || 1000) / 1000 + 1) * 2),
                opacity: 0.6,
                dashArray: '8,6',
              }}
            />
          );
        })}

        {/* Company markers */}
        {validNodes.map((node) => {
          const riskLevel = node.risk?.overall_level || 'low';
          const isSanctioned = node.risk?.is_sanctioned;

          return (
            <CircleMarker
              key={node.id}
              center={[node.lat, node.lng]}
              radius={node.tier === 0 ? 10 : 6}
              pathOptions={{
                fillColor: isSanctioned ? '#ef4444' : (node.tier === 0 ? '#6366f1' : getTierColor(node.tier)),
                fillOpacity: 0.9,
                color: riskLevel !== 'low' ? getRiskColor(riskLevel) : '#fff',
                weight: riskLevel !== 'low' ? 3 : 1,
              }}
              eventHandlers={{
                click: () => onNodeClick?.(node),
              }}
            >
              <Popup>
                <div className="map-popup">
                  <div className="map-popup-header">
                    {getCountryFlag(node.country)} {node.name}
                  </div>
                  <div className="map-popup-tier">
                    Tier {node.tier} · {node.country}
                  </div>
                  {isSanctioned && <div className="map-popup-alert">🚨 SANCTIONED</div>}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <style>{`
        .map-popup { min-width: 140px; font-family: 'Inter', sans-serif; }
        .map-popup-header { font-weight: 800; font-size: 13px; color: #111; margin-bottom: 2px; }
        .map-popup-tier { font-size: 11px; color: #666; font-weight: 600; }
        .map-popup-alert { font-size: 10px; color: #ef4444; font-weight: 800; margin-top: 4px; }
        
        .leaflet-container { background: hsl(var(--background)) !important; }
        .leaflet-popup-content-wrapper { background: hsl(var(--card) / 0.95); border-radius: 12px; backdrop-filter: blur(8px); }
        .leaflet-popup-tip { background: hsl(var(--card) / 0.95); }
      `}</style>
    </div>
  );
}

