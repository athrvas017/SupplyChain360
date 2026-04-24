import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Boxes, Mail, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Authentication Page — Login / Register
 * Dark theme aligned with SupplyLens 360 design system
 */
const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (authError) throw authError;
        navigate('/dashboard');
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.fullName },
          },
        });
        if (authError) throw authError;
        setSuccess('Account created! Please check your email to verify.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (authError) throw authError;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="bg-glow" />
      <div className="grid-overlay" />

      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-card glass shadow-premium">
          <Link to="/" className="auth-logo">
            <Zap size={32} className="logo-spark" />
            <span>SupplyLens 360</span>
          </Link>

          <div className="auth-header">
            <h2>{isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h2>
            <p>{isLogin ? 'Enter your credentials to access the intelligence engine' : 'Join the world\'s most advanced supply chain network'}</p>
          </div>

          {error && (
            <div className="auth-alert alert-error">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          {success && (
            <div className="auth-alert alert-success">
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <label>FULL NAME</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <div className="spinner-small" /> : <>{isLogin ? 'SIGN IN' : 'REGISTER'} <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="auth-divider">
            <span className="line" />
            <span className="text">OR CONTINUE WITH</span>
            <span className="line" />
          </div>

          <div className="oauth-grid">
            <button onClick={() => handleOAuthLogin('google')} className="oauth-btn">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button onClick={() => handleOAuthLogin('github')} className="oauth-btn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-link"
              >
                {isLogin ? 'REGISTER' : 'LOG IN'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>

      <style>{`
        .auth-page {
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
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          filter: blur(100px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .grid-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 2;
          pointer-events: none;
        }

        .auth-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          padding: 24px;
        }

        .auth-card {
          background: rgba(15, 15, 20, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 48px;
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
          text-decoration: none;
          color: white;
        }

        .auth-logo span {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.5px;
          background: linear-gradient(to right, #fff, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .logo-spark { color: #818cf8; }

        .auth-header { margin-bottom: 32px; }
        .auth-header h2 {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 8px;
          color: #fff;
        }
        .auth-header p {
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.5;
        }

        .auth-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .alert-error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
        .alert-success { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }

        .auth-form { display: flex; flex-direction: column; gap: 20px; }

        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label {
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.5px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #475569;
        }

        .input-wrapper input {
          width: 100%;
          height: 52px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 0 48px;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #818cf8;
          background: rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .auth-submit-btn {
          height: 52px;
          background: #818cf8;
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          margin-top: 12px;
        }

        .auth-submit-btn:hover {
          background: #6366f1;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(99, 102, 241, 0.3);
        }

        .auth-divider {
          display: flex;
          align-items: center;
          margin: 32px 0;
          gap: 16px;
        }
        .auth-divider .line { flex: 1; height: 1px; background: rgba(255, 255, 255, 0.05); }
        .auth-divider .text { font-size: 10px; font-weight: 800; color: #475569; white-space: nowrap; }

        .oauth-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .oauth-btn {
          height: 52px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: #f8fafc;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .oauth-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .auth-footer {
          margin-top: 32px;
          text-align: center;
        }
        .auth-footer p {
          font-size: 13px;
          color: #64748b;
        }
        .toggle-link {
          background: none;
          border: none;
          color: #818cf8;
          font-weight: 800;
          margin-left: 8px;
          cursor: pointer;
          font-size: 11px;
          letter-spacing: 0.5px;
        }
        .toggle-link:hover { text-decoration: underline; }

        .spinner-small {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AuthPage;
