import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Search, Database, Globe } from 'lucide-react';

const BUILD_STEPS = [
  { id: 'scan', label: 'Scanning global shipping records', detail: 'Analyzing 70M+ trade entries' },
  { id: 'tier1', label: "Found Tier-1: TSMC, Foxconn, Samsung", detail: 'Matching HS 8542.31' },
  { id: 'tier2', label: 'Checking deeper tiers (2/4)', detail: 'Direct inputs & equipment identified' },
  { id: 'tier3', label: 'Raw material sourcing (Tier 3)', detail: 'Brazil/Madagascar mining origins' },
];

export default function BuildProgress({ status, currentTier, nodesCount, companyName, logs = [] }) {
  const consoleRef = React.useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="build-progress-overlay">
      <motion.div 
        className="build-progress-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="card-header">
          <Loader2 className="animate-spin text-accent" size={24} />
          <h2>Building Supply Chain Graph</h2>
        </div>

        <div className="status-console" ref={consoleRef}>
          <AnimatePresence mode="popLayout">
            {(logs || []).map((msg, i) => (
              <motion.div 
                key={`${i}-${msg}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`console-line ${msg && typeof msg === 'string' && msg.includes('✅') ? 'success' : 'pending'}`}
              >
                {String(msg || '')}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="progress-section">
          <div className="progress-labels">
            <span>Tier {currentTier} of 4</span>
            <span>{nodesCount} entities found</span>
          </div>
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: '5%' }}
              animate={{ width: `${(currentTier / 4) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      <style>{`
        .build-progress-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .build-progress-card {
          width: 100%;
          max-width: 500px;
          background: #1a1a1f;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .card-header h2 {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }

        .status-console {
          background: #0f0f13;
          border-radius: 12px;
          padding: 20px;
          height: 180px;
          font-family: var(--font-mono);
          font-size: 13px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 32px;
          scrollbar-width: none;
        }
        .status-console::-webkit-scrollbar { display: none; }

        .console-line { line-height: 1.5; }
        .console-line.pending { color: #94a3b8; }
        .console-line.success { color: #10b981; font-weight: 600; }

        .progress-section { }
        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .progress-bar-container {
          height: 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--accent-primary);
          box-shadow: 0 0 15px var(--accent-primary);
          border-radius: 4px;
        }

        .text-accent { color: var(--accent-primary); }
      `}</style>
    </div>
  );
}
