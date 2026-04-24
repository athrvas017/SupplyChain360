import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Bell, 
  Settings, 
  Zap,
  LogOut,
  User,
  MessageSquare
} from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const navLinks = [
    { label: 'DASHBOARD', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'INTELLIGENCE', path: '/trace', icon: <Search size={18} /> },
    { label: 'RISK INTEL', path: '/risk', icon: <ShieldAlert size={18} /> },
    { label: 'COMPLIANCE', path: '/compliance', icon: <ShieldCheck size={18} /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar glass shadow-premium">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <Zap size={24} className="logo-spark" />
          <span>SupplyLens 360</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-item ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-actions">
          <button className="action-btn" title="Notifications">
            <Bell size={18} />
            <span className="notification-dot" />
          </button>
          <button className="action-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>

        <div className="navbar-user">
          {user ? (
            <div className="user-profile">
              <div className="user-avatar" title={user.email}>
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <span className="user-email">{user.email}</span>
                <button onClick={onLogout} className="logout-btn">
                  <LogOut size={14} /> LOG OUT
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="login-link">
              <User size={18} /> SIGN IN
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          z-index: 1000;
          background: rgba(10, 10, 12, 0.7);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: white;
        }

        .navbar-logo span {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          background: linear-gradient(to right, #fff, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-spark { color: #818cf8; }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navbar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 12px;
          text-decoration: none;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
        }

        .navbar-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .navbar-item.active {
          color: #818cf8;
          background: rgba(129, 140, 248, 0.1);
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-right: 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .action-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.2s ease;
          position: relative;
        }

        .action-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #0a0a0c;
        }

        .navbar-user {
          display: flex;
          align-items: center;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-email {
          font-size: 12px;
          font-weight: 600;
          color: #f1f5f9;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .logout-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 9px;
          font-weight: 800;
          padding: 0;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
        }

        .logout-btn:hover { color: #ef4444; }

        .login-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: #818cf8;
          border-radius: 12px;
          color: white;
          text-decoration: none;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
        }

        .login-link:hover {
          background: #6366f1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
