import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, TrendingUp, History, Globe, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const TRENDING_COMPANIES = [
  { name: 'TSMC', symbol: 'TSM' },
  { name: 'NVIDIA', symbol: 'NVDA' },
  { name: 'Foxconn', symbol: '2317.TW' },
  { name: 'Samsung', symbol: '005930.KS' },
];

const RECENT_SEARCHES = ['Apple Inc', 'Tesla Motors', 'Toyota Motor Corp'];

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    if (searchText.trim()) {
      navigate('/trace', { state: { initialQuery: searchText.trim() } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="landing-page">
      {/* Background Decorative Elements */}
      <div className="bg-glow" />
      <div className="grid-overlay" />

      <motion.div 
        className="landing-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <div className="landing-header">
          <Link to="/" className="landing-logo">
            <Zap size={40} className="logo-spark" />
            <h1>SupplyLens 360</h1>
          </Link>
          <p className="landing-tagline">Supply Chain Intelligence Platform</p>
        </div>

        {/* Main Search Section */}
        <div className="landing-main">
          <h2 className="landing-title">
            <Search size={28} style={{ verticalAlign: 'middle', marginRight: 12, opacity: 0.7 }} />
            Search any company worldwide
          </h2>

          <form className="landing-search-box" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type company name (e.g. Apple, TSMC, Pfizer)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="landing-search-btn">
              SEARCH
            </button>
          </form>

          {/* Recent Searches */}
          <div className="landing-meta-section">
            <div className="meta-label">
              <History size={14} style={{ marginRight: 6 }} />
              Recent Searches:
            </div>
            <div className="meta-list">
              {RECENT_SEARCHES.map((company) => (
                <button 
                  key={company} 
                  className="meta-item"
                  onClick={() => handleSearch(company)}
                >
                  • {company}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Section */}
          <div className="landing-meta-section">
            <div className="meta-label">
              <TrendingUp size={14} style={{ marginRight: 6 }} />
              Trending:
            </div>
            <div className="meta-list">
              {TRENDING_COMPANIES.map((company) => (
                <button 
                  key={company.symbol} 
                  className="meta-item trending-badge"
                  onClick={() => handleSearch(company.name)}
                >
                  📈 {company.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Minimalist Section */}
        <div className="landing-features">
          <div className="feature-card">
            <Globe size={20} />
            <span>Multi-tier Tracing</span>
          </div>
          <div className="feature-card">
            <Shield size={20} />
            <span>Risk Intelligence</span>
          </div>
          <div className="feature-card">
            <Zap size={20} />
            <span>N-Tier Discovery</span>
          </div>
        </div>

        <div className="landing-auth-links">
           <Link to="/auth" className="auth-btn">
              SECURE LOG IN
           </Link>
        </div>
      </motion.div>

      <style>{`
        .landing-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0c;
          position: relative;
          overflow: hidden;
          color: #f8fafc;
          font-family: 'Inter', sans-serif;
        }

        .bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
          filter: blur(80px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .grid-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 2;
          pointer-events: none;
        }

        .landing-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 800px;
          padding: 40px;
          text-align: center;
        }

        .landing-header { margin-bottom: 60px; }
        .landing-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 8px;
          text-decoration: none;
        }
        .landing-logo h1 {
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(to right, #fff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        .logo-spark { color: #6366f1; filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5)); }
        .landing-tagline { color: #94a3b8; font-size: 16px; font-weight: 500; }

        .landing-main {
          background: rgba(15, 15, 20, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 60px 48px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .landing-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 32px;
          color: #f1f5f9;
        }

        .landing-search-box {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
        }

        .landing-search-box input {
          flex: 1;
          height: 60px;
          background: #1e1e24;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0 24px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .landing-search-box input:focus {
          outline: none;
          border-color: #6366f1;
          background: #25252d;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .landing-search-btn {
          height: 60px;
          padding: 0 40px;
          background: #6366f1;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .landing-search-btn:hover {
          background: #4f46e5;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(99, 102, 241, 0.3);
        }

        .landing-meta-section {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .meta-label {
          color: #64748b;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .meta-list {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .meta-item {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 13px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .meta-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .trending-badge {
          background: rgba(16, 185, 129, 0.05);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        .trending-badge:hover {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
        }

        .landing-features {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 60px;
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .feature-card svg { color: #475569; }

        .landing-auth-links {
          margin-top: 48px;
        }
        .auth-btn {
          display: inline-flex;
          padding: 12px 32px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          color: #818cf8;
          text-decoration: none;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          transition: all 0.3s ease;
        }
        .auth-btn:hover {
          background: rgba(129, 140, 248, 0.1);
          border-color: rgba(129, 140, 248, 0.3);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
