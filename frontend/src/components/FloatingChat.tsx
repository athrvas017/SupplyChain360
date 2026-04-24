import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Database,
  Globe,
  Package,
  FileText,
  Zap,
  Loader2,
  MessageSquare,
  Copy,
  Check,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const SUGGESTED_QUESTIONS = [
  "What are Apple's main suppliers?",
  "Which countries have high trade tension?",
  "Analyze Tesla's battery chain risk",
];

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  'country_risk.json': <Globe size={12} />,
  'hs_descriptions.json': <Package size={12} />,
  'hs_bom_map.json': <FileText size={12} />,
  'mock_trade_data.json': <Database size={12} />,
  'general_knowledge': <Sparkles size={12} />,
};

const SOURCE_LABELS: Record<string, string> = {
  'country_risk.json': 'Country Risk DB',
  'hs_descriptions.json': 'HS Code Registry',
  'hs_bom_map.json': 'BOM Mappings',
  'mock_trade_data.json': 'Trade Flow Data',
  'general_knowledge': 'AI Knowledge',
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function formatMarkdown(text: string): string {
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\n/g, '<br/>');
  html = html.replace(/<br\/>\s*-\s/g, '<br/>• ');
  html = html.replace(/<br\/>\s*(\d+)\.\s/g, '<br/><span class="chat-list-num">$1.</span> ');
  return html;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'system',
      content: 'Welcome to SupplyLens 360 AI. Ask me anything about supply chains, trade flows, country risks, or company dependencies.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sessionId] = useState(() => generateId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen, scrollToBottom]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          session_id: sessionId,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const assistantMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
        sources: data.sources_used,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: `⚠️ Connection error: ${err.message}. Make sure the backend server is running.`,
        timestamp: new Date(),
        sources: [],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    try {
      await fetch(`${API_URL}/api/chat/session/${sessionId}`, { method: 'DELETE' });
    } catch {}
    setMessages([
      {
        id: 'welcome',
        role: 'system',
        content: 'Chat cleared. Ask me anything about your supply chain data.',
        timestamp: new Date(),
      },
    ]);
  };

  const userMsgCount = messages.filter((m) => m.role === 'user').length;

  return (
    <>
      <div className={`floating-chat-container ${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''}`}>
        {isOpen && (
          <div className="chat-window shadow-premium">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-header-icon">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h1>SupplyLens 360 AI</h1>
                  <span className="chat-header-status">
                    <span className="status-dot" /> Online
                  </span>
                </div>
              </div>
              <div className="chat-header-right">
                <button onClick={clearChat} className="chat-control-btn" title="Clear chat">
                  <Trash2 size={14} />
                </button>
                <button onClick={() => setIsExpanded(!isExpanded)} className="chat-control-btn hidden-mobile" title={isExpanded ? "Collapse" : "Expand"}>
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="chat-control-btn" title="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg chat-msg-${msg.role}`}>
                  {msg.role === 'system' ? (
                    <div className="chat-system-msg">
                      <Zap size={14} />
                      <span>{msg.content}</span>
                    </div>
                  ) : (
                    <div className="chat-msg-row">
                      <div className={`chat-avatar chat-avatar-${msg.role}`}>
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div className="chat-msg-body">
                        <div className="chat-msg-meta">
                          <span className="chat-msg-sender">
                            {msg.role === 'user' ? 'You' : 'SupplyLens 360 AI'}
                          </span>
                        </div>
                        <div
                          className="chat-msg-content"
                          dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
                        />
                        {msg.role === 'assistant' && (
                          <div className="chat-msg-footer">
                            {msg.sources && msg.sources.length > 0 && (
                              <div className="chat-sources">
                                {msg.sources.map((src) => (
                                  <span key={src} className="chat-source-tag">
                                    {SOURCE_ICONS[src] || <Database size={10} />}
                                    {SOURCE_LABELS[src] || src}
                                  </span>
                                ))}
                              </div>
                            )}
                            <button
                              className="chat-copy-btn"
                              onClick={() => handleCopy(msg.content, msg.id)}
                              title="Copy"
                            >
                              {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="chat-msg chat-msg-assistant">
                  <div className="chat-msg-row">
                    <div className="chat-avatar chat-avatar-assistant">
                      <Bot size={14} />
                    </div>
                    <div className="chat-msg-body">
                      <div className="chat-thinking">
                        <Loader2 size={14} className="chat-spinner" />
                        <span>Analyzing data...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {userMsgCount === 0 && (
              <div className="chat-suggestions">
                <div className="chat-suggestions-grid">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button key={q} className="chat-suggestion-btn" onClick={() => sendMessage(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="chat-input-area">
              <div className="chat-input-wrapper">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="chat-input"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  className={`chat-send-btn ${input.trim() ? 'active' : ''}`}
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? <Loader2 size={16} className="chat-spinner" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {!isOpen && (
          <button className="chat-toggle-btn shadow-glow" onClick={() => setIsOpen(true)}>
            <Sparkles className="toggle-icon-bg" size={24} />
            <MessageSquare size={24} />
          </button>
        )}
      </div>

      <style>{`
        /* Floating Container positioning */
        .floating-chat-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: 'Inter', system-ui, sans-serif;
          pointer-events: none;
        }
        .floating-chat-container > * {
          pointer-events: auto;
        }

        /* Toggle Button */
        .chat-toggle-btn {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #818cf8, #6366f1);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px -5px rgba(99,102,241,0.5);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        .chat-toggle-btn:hover {
          transform: scale(1.1);
        }
        .toggle-icon-bg {
          position: absolute;
          opacity: 0.2;
          transform: scale(1.5) rotate(15deg);
        }

        /* Window Layout */
        .chat-window {
          background: rgba(10, 10, 14, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          width: 380px;
          height: 600px;
          max-height: calc(100vh - 48px);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.1);
          animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: bottom right;
        }
        
        .floating-chat-container.expanded .chat-window {
          width: 600px;
          height: 800px;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Header */
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .chat-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-header-icon {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #818cf8, #6366f1);
          border-radius: 10px;
          color: white;
        }
        .chat-header-left h1 {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
          color: #fff;
        }
        .chat-header-status {
          font-size: 10px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
        }
        .status-dot {
          width: 6px; height: 6px;
          background: #22c55e;
          border-radius: 50%;
        }

        .chat-header-right {
          display: flex;
          gap: 6px;
        }
        .chat-control-btn {
          width: 28px; height: 28px;
          background: transparent;
          border: none;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .chat-control-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #f1f5f9;
        }

        /* Messages */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        .chat-msg { max-width: 90%; }
        .chat-msg-user { align-self: flex-end; }
        .chat-msg-assistant { align-self: flex-start; }
        .chat-system-msg {
          align-self: center;
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px;
          color: #a5b4fc;
          font-size: 11px;
          text-align: center;
          max-width: 100%;
        }

        .chat-msg-row { display: flex; gap: 10px; }
        .chat-msg-user .chat-msg-row { flex-direction: row-reverse; }

        .chat-avatar {
          width: 28px; height: 28px; min-width: 28px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
        }
        .chat-avatar-user { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
        .chat-avatar-assistant { background: linear-gradient(135deg, #818cf8, #6366f1); color: white; }

        .chat-msg-body { flex: 1; min-width: 0; }
        .chat-msg-meta {
          margin-bottom: 4px;
        }
        .chat-msg-sender {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
        }

        .chat-msg-content {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.6;
          color: #f1f5f9;
        }
        .chat-msg-user .chat-msg-content {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-top-right-radius: 4px;
        }
        .chat-msg-assistant .chat-msg-content {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.04);
          border-top-left-radius: 4px;
        }
        .chat-msg-content strong { color: #a5b4fc; }
        .chat-msg-content code {
          background: rgba(0,0,0,0.3);
          padding: 2px 4px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
        }
        .chat-list-num { color: #818cf8; font-weight: bold; }

        .chat-msg-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
          gap: 8px;
        }
        .chat-sources { display: flex; flex-wrap: wrap; gap: 4px; }
        .chat-source-tag {
          display: flex; align-items: center; gap: 4px;
          padding: 2px 6px;
          background: rgba(99,102,241,0.1);
          border-radius: 4px;
          font-size: 9px;
          color: #818cf8;
        }
        .chat-copy-btn {
          width: 24px; height: 24px;
          background: transparent; border: none; color: #64748b;
          cursor: pointer; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
        }
        .chat-copy-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

        /* Thinking */
        .chat-thinking {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          color: #818cf8;
          font-size: 12px;
        }
        .chat-spinner { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Suggestions */
        .chat-suggestions { padding: 0 16px 12px; }
        .chat-suggestions-grid { display: flex; flex-direction: column; gap: 6px; }
        .chat-suggestion-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 12px;
          color: #cbd5e1;
          font-size: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }
        .chat-suggestion-btn:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.3);
          color: #a5b4fc;
        }

        /* Input */
        .chat-input-area {
          padding: 16px;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .chat-input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 6px 6px 6px 14px;
          transition: all 0.2s;
        }
        .chat-input-wrapper:focus-within {
          border-color: rgba(99,102,241,0.5);
          background: rgba(255,255,255,0.08);
        }
        .chat-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f1f5f9;
          font-family: inherit;
          font-size: 13px;
          padding: 8px 0;
          resize: none;
          max-height: 100px;
        }
        .chat-input::placeholder { color: #64748b; }
        
        .chat-send-btn {
          width: 36px; height: 36px;
          background: transparent; border: none;
          border-radius: 8px;
          color: #64748b;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .chat-send-btn.active {
          background: linear-gradient(135deg, #818cf8, #6366f1);
          color: white;
        }

        @media (max-width: 640px) {
          .chat-window {
            width: calc(100vw - 32px);
            height: calc(100vh - 100px);
            bottom: 80px;
            right: 16px;
            position: fixed;
          }
          .hidden-mobile { display: none; }
        }
      `}</style>
    </>
  );
}
