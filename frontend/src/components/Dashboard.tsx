import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Zap, Banknote, Trash2, ExternalLink, Plus } from 'lucide-react';
import { getDashboardHistory } from '../utils/api';

export default function Dashboard({ onNewSearch, onViewTrace }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getDashboardHistory();
        setHistory(data.history || []);
      } catch (e) {
        console.error('Failed to fetch dashboard history', e);
      }
      setLoading(false);
    }
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    // Optimistic delete
    setHistory(history.filter(h => h.id !== id));
    try {
      await fetch(`${import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'}/api/dashboard/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="dashboard-container"><div className="loading-spinner" /></div>;
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">MY DASHBOARD</h1>
        <button className="btn btn-primary btn-sm" onClick={onNewSearch}>
          <Plus size={14} /> NEW SEARCH
        </button>
      </div>

      <div className="dashboard-grid">
        {history.length > 0 ? history.map((item) => (
          <div key={item.id} className="dashboard-card shadow-premium">
            <div className="card-top">
              <div className="card-brand">
                <h2 className="company-name">{item.company_name}</h2>
                <span className="search-count">Traced {item.tier1_count} direct suppliers</span>
              </div>
              <div className="card-divider" />
              <div className="suppliers-list">
                <span className="label">HS Categories:</span> {item.hs_codes?.slice(0, 3).join(', ')} {item.hs_codes?.length > 3 ? '...' : ''}
              </div>
            </div>

            <div className="risk-summary-grid">
               <RiskItem 
                icon={<Shield size={14} />} 
                label="RISK FLAGS" 
                value={item.risk_flags?.length > 0 ? `${item.risk_flags.length} detected` : 'NONE'} 
                level={item.risk_flags?.length > 0 ? 'high' : 'safe'}
                prefix={item.risk_flags?.length > 0 ? '⚠️' : '✅'}
              />
              <RiskItem 
                icon={<Plus size={14} />} 
                label="DIVERSITY" 
                value={item.tier1_count > 10 ? 'HIGH' : 'LOW'} 
                level={item.tier1_count > 10 ? 'live' : 'medium'}
                prefix={item.tier1_count > 10 ? '🛡️' : '⚠️'}
              />
            </div>

            <div className="card-footer">
              <span className="last-updated">Traced: {new Date(item.timestamp).toLocaleDateString()}</span>
              <div className="card-actions">
                <button className="btn btn-ghost btn-xs" onClick={() => onViewTrace(item.company_name)}>
                  <ExternalLink size={12} /> [VIEW GRAPH]
                </button>
                <button className="btn btn-ghost btn-xs text-danger" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={12} /> [DELETE]
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="empty-history-msg">
            No search history found. Tap 'NEW SEARCH' to start.
          </div>
        )}
      </div>

      <style>{`
        .dashboard-container {
          padding: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .dashboard-title {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #fff;
        }
        .dashboard-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .dashboard-card {
          background: rgba(15, 15, 20, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
        }
        .dashboard-card:hover {
          background: rgba(15, 15, 20, 0.8);
          border-color: rgba(99, 102, 241, 0.3);
          transform: translateY(-2px);
        }
        .card-top {
          margin-bottom: 20px;
        }
        .card-brand {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .company-name {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .search-count {
          font-size: 12px;
          color: var(--text-tertiary);
          font-family: var(--font-mono);
        }
        .card-divider {
          height: 2px;
          background: linear-gradient(90deg, var(--accent-primary) 0%, transparent 80%);
          margin-bottom: 12px;
          opacity: 0.3;
        }
        .suppliers-list {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .suppliers-list .label {
          font-weight: 700;
          color: var(--text-tertiary);
        }
        .risk-summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .risk-item {
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.2);
          padding: 10px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }
        .risk-item-label {
          font-size: 9px;
          font-weight: 800;
          color: var(--text-tertiary);
          letter-spacing: 0.5px;
        }
        .risk-item-value {
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }
        
        .level-critical { color: #ef4444; border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05); }
        .level-high { color: #f59e0b; border-color: rgba(245, 158, 11, 0.2); background: rgba(245, 158, 11, 0.05); }
        .level-medium { color: #818cf8; border-color: rgba(129, 140, 248, 0.2); background: rgba(129, 140, 248, 0.05); }
        .level-live { color: #10b981; border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.1); font-weight: 800; }
        .level-safe { color: #10b981; }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .last-updated {
          font-size: 11px;
          color: var(--text-tertiary);
          font-style: italic;
        }
        .card-actions {
          display: flex;
          gap: 12px;
        }
        .text-danger { color: #ef4444; opacity: 0.8; }
        .text-danger:hover { opacity: 1; text-decoration: underline; }
      `}</style>
    </div>
  );
}

function RiskItem({ icon, label, value, level, prefix }) {
  return (
    <div className={`risk-item level-${level}`}>
      <span className="risk-item-label">{label}</span>
      <span className="risk-item-value">{prefix} {value}</span>
    </div>
  );
}
