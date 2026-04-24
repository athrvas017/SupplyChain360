import { formatNumber } from '../utils/colors';

export default function HSCodeSelector({ hsCodes, selectedHS, onToggle, onSelectAll, onDeselectAll }) {
  if (!hsCodes || hsCodes.length === 0) return null;

  const maxShipments = Math.max(...hsCodes.map(h => h.shipment_count || 1));
  const totalShipments = hsCodes.reduce((acc, h) => acc + (h.shipment_count || 0), 0);

  return (
    <div className="hs-selector">
      <div className="hs-summary">
        {hsCodes.length} product categories found across {formatNumber(totalShipments)} shipments
      </div>
      
      <div className="hs-prompt">
        Select WHICH products you want to trace the supply chain for:
      </div>

      <div className="hs-actions">
        <button className="btn btn-ghost btn-sm" onClick={onSelectAll}>[SELECT ALL]</button>
        <button className="btn btn-ghost btn-sm" onClick={onDeselectAll}>[CLEAR]</button>
      </div>

      <div className="hs-list">
        {hsCodes.map((hs) => {
          const isSelected = selectedHS.includes(hs.hs_code);
          const barWidth = ((hs.shipment_count || 1) / maxShipments) * 100;

          return (
            <label
              key={hs.hs_code}
              className={`hs-item ${isSelected ? 'hs-item-selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(hs.hs_code)}
              />
              <div className="hs-item-content">
                <div className="hs-item-main">
                  <div className="hs-id-box">
                    <span className="hs-code">{hs.hs_code}</span>
                    <div className="hs-desc" title={hs.description}>{hs.description}</div>
                  </div>
                  <div className="hs-stat-box">
                    <span className="hs-count">{formatNumber(hs.shipment_count)} shipments</span>
                    <div className="hs-bar-track">
                      <div
                        className="hs-bar-fill"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <style>{`
        .hs-selector { margin-top: var(--space-md); }
        .hs-summary { font-size: 11px; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.8; }
        .hs-prompt { font-size: 13px; font-weight: 500; margin: 8px 0 16px; color: var(--text-primary); }
        
        .hs-actions { display: flex; gap: 8px; margin-bottom: 12px; }
        .hs-actions button { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--text-tertiary); }
        .hs-actions button:hover { color: var(--accent-primary); }

        .hs-list {
          display: flex; flex-direction: column; gap: 6px;
          max-height: 350px; overflow-y: auto; padding-right: 4px;
        }

        .hs-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px; border-radius: var(--radius-md);
          background: hsl(var(--card)); border: 1px solid var(--border);
          cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hs-item:hover { border-color: hsl(var(--brand)); background: hsl(var(--card) / 0.5); }
        .hs-item-selected {
          border-color: hsl(var(--brand));
          background: hsl(var(--brand) / 0.1) !important;
          box-shadow: inset 0 0 15px hsl(var(--brand) / 0.05);
        }

        .hs-item input[type="checkbox"] {
          accent-color: var(--accent-primary);
          width: 16px; height: 16px; flex-shrink: 0;
          cursor: pointer;
        }

        .hs-item-content { flex: 1; min-width: 0; }
        .hs-item-main { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
        
        .hs-id-box { flex: 1; min-width: 0; }
        .hs-code {
          font-family: var(--font-mono); font-size: 12px;
          font-weight: 700; color: hsl(var(--foreground));
        }
        .hs-desc {
          font-size: 11px; color: hsl(var(--muted-foreground));
          margin-top: 4px; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        .hs-stat-box { width: 100px; text-align: right; flex-shrink: 0; }
        .hs-count { font-size: 10px; font-family: var(--font-mono); font-weight: 600; color: hsl(var(--muted-foreground)); }
        
        .hs-bar-track {
          height: 4px; background: hsl(var(--border));
          border-radius: 2px; margin-top: 8px; overflow: hidden;
        }
        .hs-bar-fill {
          height: 100%; background: hsl(var(--brand));
          box-shadow: 0 0 8px hsl(var(--brand) / 0.5);
          border-radius: 2px;
          transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hs-list::-webkit-scrollbar { width: 4px; }
        .hs-list::-webkit-scrollbar-track { background: transparent; }
        .hs-list::-webkit-scrollbar-thumb { background: var(--border-subtle); border-radius: 2px; }
      `}</style>
    </div>
  );
}
