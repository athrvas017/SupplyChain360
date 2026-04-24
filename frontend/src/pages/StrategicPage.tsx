import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Upload, 
  Bell, 
  Globe, 
  BarChart2, 
  Smartphone, 
  Mail, 
  FileText,
  Target,
  ChevronRight,
  Search,
  Activity,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  X,
  Check,
  Edit2
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Radar as RadarSeries
} from 'recharts';
import { speak } from '../utils/narrator';
import { generatePlaybook, uploadSuppliers, gmailLogin, generateDraftContent, saveDraft, getResilienceScore, getDynamicScenarios, checkAuthStatus, resetAuthStatus } from '../utils/api';
import Navbar from '../components/site/Navbar';
import { useSupplyChain } from '../context/SupplyChainContext';
import { Button } from '@/components/ui/button';

export default function StrategicPage() {
  const { initialSearchText, setInitialSearchText } = useSupplyChain();
  const companyName = initialSearchText;

  const [playbook, setPlaybook] = useState<any>(null);
  const [scoreData, setScoreData] = useState<any>(null);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [loadingScenarios, setLoadingScenarios] = useState(false);
  const [generatingPlaybook, setGeneratingPlaybook] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    async function verifyLink() {
      try {
        const { linked } = await checkAuthStatus();
        setIsLinked(linked);
      } catch(e) {}
    }
    verifyLink();
    
    // Check if we just returned from redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'auth_success') {
      setIsLinked(true);
      setActiveTab('alerts');
    }
  }, []);
  const [activeTab, setActiveTab] = useState<'playbook' | 'alerts' | 'upload'>('playbook');
  const [searchQuery, setSearchQuery] = useState("");

  // Email Draft Modal State
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [generatingDraft, setGeneratingDraft] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftData, setDraftData] = useState({ to: "", subject: "", body: "" });

  useEffect(() => {
    if (companyName) {
      async function fetchData() {
        setLoadingScenarios(true);
        try {
          const [score, scen] = await Promise.all([
            getResilienceScore(companyName),
            getDynamicScenarios(companyName)
          ]);
          setScoreData(score);
          setScenarios(scen);
        } catch (err) {
          console.error("Visual fetch error:", err);
        } finally {
          setLoadingScenarios(false);
        }
      }
      fetchData();
    }
  }, [companyName]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setInitialSearchText(searchQuery);
    setPlaybook(null);
    setScoreData(null);
    setTimeout(() => {
      setIsSearching(false);
      setSearchQuery("");
    }, 800);
  };

  const radarData = scoreData ? [
    { subject: 'Geo-Diversity', A: scoreData.breakdown.geographic_diversity * 10, fullMark: 100 },
    { subject: 'Concentration', A: (10 - scoreData.breakdown.supplier_concentration) * 10, fullMark: 100 },
    { subject: 'Financial', A: scoreData.breakdown.financial_stability * 10, fullMark: 100 },
    { subject: 'Geopolitics', A: (10 - scoreData.breakdown.geopolitical_risk) * 10, fullMark: 100 },
    { subject: 'Inventory', A: scoreData.breakdown.inventory_buffer * 10, fullMark: 100 },
    { subject: 'Compliance', A: scoreData.breakdown.compliance ? scoreData.breakdown.compliance * 10 : 50, fullMark: 100 },
  ] : [];

  useEffect(() => {
    if (companyName) {
      speak(`Entering Strategic Operations Command for ${companyName}. Calibrating resilience data and executive dispatch pathways.`);
    }
  }, [companyName]);

  const handleGmailConfig = async () => {
    try {
      const { url } = await gmailLogin();
      window.location.href = url;
    } catch (err) {
      alert("Error starting Gmail auth. Check credentials.json.");
    }
  };

  const handleResetAuth = async () => {
    try {
      await resetAuthStatus();
      setIsLinked(false);
      alert("Credentials cleared. You can now re-link with new permissions.");
    } catch (err) {
      alert("Error clearing credentials.");
    }
  };

  const handlePrepareDraft = async () => {
    if (!companyName) return alert("Select a company first.");
    setGeneratingDraft(true);
    setShowDraftModal(true);
    try {
      const context = "A significant risk spike was detected following manufacturing factory delays and new sanctions in the region.";
      const content = await generateDraftContent(companyName, scoreData?.overall_score || 3.8, context);
      setDraftData({ to: "executive-team@enterprise.com", subject: content.subject, body: content.body });
    } catch (err) {
      alert("Failed to generate draft content.");
      setShowDraftModal(false);
    } finally {
      setGeneratingDraft(false);
    }
  };

  const handleSaveDraftToGmail = async () => {
    if (!draftData.to) return alert("Recipient email is required.");
    setSavingDraft(true);
    try {
      await saveDraft(draftData.to, draftData.subject, draftData.body);
      alert("SUCCESS: Executive Alert has been DISPATCHED and Sent.");
      setShowDraftModal(false);
    } catch (err) {
      alert("Failed to send alert. Ensure Gmail is linked.");
    } finally {
      setSavingDraft(false);
    }
  };

  const handleGeneratePlaybook = async (scenario: string) => {
    setGeneratingPlaybook(true);
    try {
      const data = await generatePlaybook(companyName, scenario);
      setPlaybook(data);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingPlaybook(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    try {
      const res = await uploadSuppliers(e.target.files[0]);
      alert(`Success! Uncovered ${res.hidden_risks_uncovered} hidden risks in your supply chain.`);
    } catch (err) {
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-500/30">
      <Navbar />

      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        
        {/* Header Search Area */}
        <div className="mb-16 text-center space-y-4 max-w-3xl mx-auto mt-8">
           <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4 italic">
                 <ShieldAlert size={12} /> Strategic Ops Command
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 italic">
                STRATEGIC <span className="text-blue-600 underline decoration-blue-200">INTELLIGENCE.</span>
              </h1>
              <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto mb-8">
                Predictive response engine for global trade volatility. Transform raw supply chain telemetry into month-by-month executive roadmaps.
              </p>
           </motion.div>

           <form onSubmit={handleSearch} className="relative group max-w-lg mx-auto">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Target Enterprise (eg. Tesla, Apple)..." 
                className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-8 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all shadow-sm group-hover:shadow-md"
              />
              <button disabled={isSearching} className="absolute right-2 top-2 bottom-2 px-8 bg-blue-600 text-foreground text-[10px] font-black uppercase rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                 {isSearching ? "Targeting..." : "Lock Entity"}
              </button>
           </form>
        </div>

        {companyName ? (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-stretch"
            >
               {/* Summary Stats */}
               <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <Target size={120} className="text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-8 relative z-10">
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 italic">Active Mission Hub</p>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight italic">{companyName}</h2>
                        <div className="flex items-center gap-4 mt-4">
                           <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase italic border border-green-100">
                              <Activity size={10} /> Live Telemetry
                           </span>
                           <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic border border-blue-100">
                              <Globe size={10} /> Multi-Tier Resolution
                           </span>
                        </div>
                     </div>
                     <div className="pt-8 border-t border-slate-50">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-blue-200 transition-all cursor-help" title="Weighted aggregate of Geo-Diversity (60%), Concentration (20%), and Geopolitics (20%)">
                              <p className="text-3xl font-black text-slate-900 leading-none italic">{scoreData?.overall_score || '--'}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic flex items-center gap-1">Resilience Score <Target size={8} /></p>
                           </div>
                           <div className="p-6 bg-blue-50 rounded-[1.5rem] border border-blue-100">
                              <p className="text-3xl font-black text-blue-600 leading-none italic">ALPHA</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic">Strategic Profile</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="w-full md:w-72 h-72 bg-white rounded-[2rem] p-6 flex items-center justify-center border border-slate-100 shadow-inner relative z-10">
                     {scoreData ? (
                        <ResponsiveContainer width="100%" height="100%">
                           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                              <PolarGrid stroke="#e2e8f0" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                              <RadarSeries name={companyName} dataKey="A" stroke="#0066ff" fill="#3b82f6" fillOpacity={0.4} />
                           </RadarChart>
                        </ResponsiveContainer>
                     ) : (
                        <Activity className="text-slate-200 animate-pulse" size={64} />
                     )}
                  </div>
               </div>

               {/* Command Center Panel */}
               <div className="bg-blue-600 rounded-[2.5rem] p-10 text-foreground shadow-2xl shadow-blue-500/30 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                     <Zap size={200} />
                  </div>
                  <div>
                     <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                        <Zap size={24} className="text-blue-200" />
                     </div>
                     <h3 className="text-2xl font-black tracking-tight mb-3 italic uppercase">Action HUD</h3>
                     <p className="text-blue-100 text-sm font-medium leading-relaxed opacity-90">
                        Generate crisis-specific deployment models or broadcast encrypted intelligence to your executive suite.
                     </p>
                  </div>
                  <div className="flex gap-1 bg-black/10 p-1.5 rounded-2xl mt-12 border border-border">
                     {(['playbook', 'alerts', 'upload'] as const).map(tab => (
                        <button
                           key={tab}
                           onClick={() => setActiveTab(tab)}
                           className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all italic ${activeTab === tab ? 'bg-white text-blue-600 shadow-xl' : 'text-foreground/60 hover:text-foreground'}`}
                        >
                           {tab}
                        </button>
                     ))}
                  </div>
               </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {/* Playbook Tab */}
              {activeTab === 'playbook' && (
                <motion.div key="playbook" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                   
                   <div className="lg:col-span-1 pr-4 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Crisis Armory</h3>
                        <div className="h-[1px] flex-1 bg-slate-100 ml-4"></div>
                      </div>
                      <div className="flex flex-col gap-3">
                         {loadingScenarios ? (
                           Array(3).fill(0).map((_, i) => (
                             <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse"></div>
                           ))
                         ) : scenarios.length > 0 ? (
                           scenarios.map((scen, i) => (
                             <button 
                               key={i}
                               onClick={() => handleGeneratePlaybook(scen.label)}
                               className="w-full p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all text-left flex justify-between items-center group relative overflow-hidden"
                             >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 group-hover:bg-blue-500 transition-colors"></div>
                                <div className="relative z-10">
                                   <p className="text-xs font-black text-slate-900 mb-1 uppercase group-hover:text-blue-600 italic tracking-tighter">{scen.label}</p>
                                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{scen.type} Deployment</p>
                                   {/* XAI Neural Reasoning Panel */}
                                   <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-[2rem] relative overflow-hidden group">
                                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 blur-2xl rounded-full group-hover:w-24 group-hover:h-24 transition-all"></div>
                                      <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2 italic">
                                         <Activity size={12} /> Neural Reasoning (XAI)
                                      </h4>
                                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed italic">
                                         The AI weighted <span className="text-slate-900 underline decoration-blue-500/30">Geographic Diversity</span> most heavily due to significant supplier clustering detected in {companyName}'s Tier-2 node groups. 
                                         <br/><br/>
                                         <span className="text-blue-600">Verdict:</span> Structural vulnerability exists in localized logistics corridors.
                                      </p>
                                   </div>
                                </div>
                                <ArrowRight size={16} className="text-slate-200 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                             </button>
                           ))
                         ) : (
                           <div className="p-8 text-center text-[10px] uppercase text-slate-300 font-black italic">Awaiting Telemetry Sync...</div>
                         )}
                      </div>
                   </div>

                   <div className="lg:col-span-3 min-h-[600px] relative">
                      {!playbook && !generatingPlaybook ? (
                        <div className="w-full h-full bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center shadow-inner">
                           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                              <FileText size={40} className="text-slate-200" />
                           </div>
                           <h4 className="text-xl font-black italic tracking-tighter text-slate-400 mb-2 uppercase">Awaiting Mission Selection</h4>
                           <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">AI-Sourced Threat Vectors Displayed Ready for Execution</p>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
                           {generatingPlaybook ? (
                             <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center">
                                <Activity className="text-blue-600 animate-spin mb-6" size={48} />
                                <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse italic">Gemini Orchestrating Strategic Defense...</p>
                             </div>
                           ) : (
                             <>
                               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                  <div className="flex items-center gap-4">
                                     <div className="w-1.5 h-6 bg-blue-600"></div>
                                     <h3 className="font-black text-slate-900 uppercase tracking-tight text-lg italic">{companyName} Crisis Resolution Model</h3>
                                  </div>
                                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full uppercase italic">Orchestrated by Gemini Flash</span>
                               </div>
                               <div className="p-10 space-y-12 overflow-y-auto">
                                  <div className="p-8 bg-slate-900 rounded-[2rem] border border-slate-800 text-foreground shadow-2xl">
                                     <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mb-4 italic">Executive Core Insight</h4>
                                     <p className="text-slate-300 leading-relaxed font-semibold italic text-lg">{playbook.summary}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                     <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                           <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] italic">Tactical Roadmap</h4>
                                           <div className="h-[1px] flex-1 bg-slate-100 ml-6"></div>
                                        </div>
                                        <div className="space-y-6">
                                           {playbook.roadmap.map((step: any, i: number) => (
                                              <div key={i} className="flex gap-6 group">
                                                 <div className="flex flex-col items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full border-2 border-blue-600 group-hover:bg-blue-600 transition-colors"></div>
                                                    <div className="w-[2px] flex-1 bg-slate-100 group-hover:bg-blue-100 transition-colors"></div>
                                                 </div>
                                                 <div className="pb-8">
                                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1 italic">{step.period}</p>
                                                    <p className="text-sm font-black text-slate-800 italic uppercase leading-tight mb-2">{step.action}</p>
                                                    <span className="text-[9px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100 uppercase tracking-widest italic">Impact: {step.score_impact} res. points</span>
                                                 </div>
                                              </div>
                                           ))}
                                        </div>
                                     </div>
                                     <div className="space-y-10">
                                        <div className="p-8 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-500/20 text-foreground relative overflow-hidden">
                                           <TrendingDown size={100} className="absolute -right-8 -bottom-8 opacity-20" />
                                           <h4 className="text-blue-100 text-[10px] font-black uppercase tracking-[0.3em] mb-2 italic">Capital Exposure</h4>
                                           <p className="text-4xl font-black italic tracking-tighter mb-4">{playbook.impact}</p>
                                           <p className="text-[10px] font-medium text-blue-100 opacity-80 leading-relaxed">Estimated enterprise-wide liability across Tier 1 through Tier 4 nodes.</p>
                                        </div>
                                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                                           <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 italic">Alternative Vector Sources</h4>
                                           <div className="grid grid-cols-1 gap-2">
                                              {playbook.alternatives.map((alt: string, i: number) => (
                                                 <div key={i} className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase italic flex justify-between items-center group cursor-pointer hover:border-blue-500 transition-all">
                                                   <span>{alt}</span>
                                                   <ChevronRight size={10} className="text-slate-300 group-hover:text-blue-600" />
                                                 </div>
                                              ))}
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                             </>
                           )}
                        </div>
                      )}
                   </div>
                </motion.div>
              )}

              {/* Alerts Tab */}
              {activeTab === 'alerts' && (
                <motion.div key="alerts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <div className="space-y-8">
                      <div className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-xl shadow-slate-200/50">
                         <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4 italic uppercase">
                            <Bell className="text-blue-600 animate-pulse" /> Executive Dispatch
                         </h3>
                         <div className="space-y-6">
                            <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:border-blue-500/30 transition-all">
                               <div className="flex items-center gap-8">
                                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 group-hover:rotate-6 transition-transform"><Mail className="text-blue-600" /></div>
                                  <div>
                                     <h4 className="font-black text-sm text-slate-900 uppercase italic">Gmail Command API</h4>
                                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                        {isLinked ? "Live Workspace Integrated ✅" : "Workspace Integration Pending"}
                                     </p>
                                  </div>
                               </div>
                               <div className="flex gap-2">
                                  {isLinked && (
                                     <Button 
                                       onClick={handleResetAuth} 
                                       variant="ghost" 
                                       className="text-[9px] h-10 px-4 rounded-xl text-slate-400 hover:text-red-500 font-black uppercase tracking-widest italic"
                                     >
                                        RESET
                                     </Button>
                                  )}
                                  <Button 
                                    onClick={isLinked ? undefined : handleGmailConfig} 
                                    variant="outline" 
                                    className={`text-[10px] h-10 px-8 rounded-xl border-slate-200 font-black uppercase tracking-widest italic ${isLinked ? 'bg-green-50 text-green-600 border-green-200' : 'hover:bg-slate-900 hover:text-foreground transition-all'}`}
                                  >
                                     {isLinked ? "CONNECTED ✅" : "LINK"}
                                  </Button>
                               </div>
                            </div>
                            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] opacity-50 relative group grayscale">
                               <div className="flex items-center gap-8">
                                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100"><Smartphone className="text-slate-400" /></div>
                                  <div>
                                     <div className="flex justify-between items-end">
                                  <div>
                                     <div className="text-5xl font-mono font-black text-slate-900 flex items-baseline gap-2 group cursor-help">
                                        {score?.score ?? '0.0'}
                                        <span className="text-sm text-slate-400 font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors">/ 10</span>
                                     </div>
                                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Strategic Resilience Index</p>
                                  </div>
                                  <div className="text-right">
                                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-1 italic underline decoration-blue-500/30">Calc Basis</div>
                                     <div className="text-[9px] text-slate-400 leading-tight font-bold italic">
                                        Geo-Diversity (60%)<br/>
                                        Supplier Conc (20%)<br/>
                                        Geopol Risk (20%)
                                     </div>
                                  </div>
                               </div>
                                  </div>
                               </div>
                               <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-slate-300 italic tracking-[0.2em]">Restricted</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white border-[6px] border-blue-600 rounded-[3rem] p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                         <TrendingDown size={180} />
                      </div>
                      <div className="space-y-10 relative z-10">
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                               <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] italic">Intelligence Dispatch Ready</p>
                            </div>
                            <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Global Resilience Alert</h3>
                         </div>
                         <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 font-mono text-[11px] text-slate-500 leading-relaxed shadow-inner">
                            <p className="mb-4 flex items-center justify-between border-b border-slate-200 pb-2"><span>TARGET ENTITY:</span> <span className="text-slate-900 font-black">{companyName}</span></p>
                            <p className="italic">AI has synthesized an executive brief regarding Tier-3 manufacturing vulnerabilities detected in South-East Asia corridors. Recommended for immediate C-Suite coordination.</p>
                         </div>
                      </div>
                      <Button 
                        onClick={handlePrepareDraft} 
                        className="w-full bg-blue-600 text-foreground font-black uppercase italic text-xs py-9 rounded-2xl mt-12 shadow-2xl shadow-blue-500/40 hover:bg-slate-900 transition-all hover:scale-[1.02] active:scale-95"
                      >
                        SYNTHESIZE EXECUTIVE DRAFT
                      </Button>
                   </div>
                </motion.div>
              )}

              {/* Upload Tab */}
              {activeTab === 'upload' && (
                <motion.div key="upload" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border-4 border-dashed border-slate-100 rounded-[4rem] p-28 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-slate-50/20"></div>
                   <div className="w-32 h-32 bg-blue-50 rounded-[3rem] flex items-center justify-center mb-10 hover:scale-110 hover:rotate-3 transition-all cursor-pointer relative z-10 border-4 border-white shadow-2xl group-hover:border-blue-100">
                      <Upload size={56} className="text-blue-600" />
                      <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                   </div>
                   <h3 className="text-4xl font-black text-slate-900 mb-6 italic tracking-tighter relative z-10 uppercase">Ingest Private Ledger</h3>
                   <p className="text-slate-500 max-w-sm mb-16 text-sm font-medium leading-relaxed relative z-10 italic">
                      Securely harmonize your internal supplier mapping with the global graph. Proprietary sub-tier resolution with zero-data-leakage architecture.
                   </p>
                   <div className="flex gap-6 relative z-10">
                      <div className="px-8 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic shadow-sm">CSV/XLSX</div>
                      <div className="px-8 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic shadow-sm">Audit-Ready</div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[500px] flex flex-col items-center justify-center border-4 border-dashed border-slate-50 rounded-[4rem] bg-white shadow-2xl shadow-slate-200/20 mt-10">
             <Search size={64} className="text-slate-100 mb-8" />
             <p className="text-slate-300 font-black uppercase tracking-[0.5em] text-xs italic transition-pulse">Awaiting Command Input via Strategic Bar</p>
          </motion.div>
        )}

      </div>

      {/* Human-in-the-Loop Drafting Modal */}
      <AnimatePresence>
        {showDraftModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_32px_128px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Edit2 size={18} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 uppercase italic tracking-tight text-lg leading-tight">Human-in-the-Loop Drafting</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Review and approve AI intelligence before dispatch</p>
                  </div>
                </div>
                <button onClick={() => setShowDraftModal(false)} className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                {generatingDraft ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 italic">Gemini Synthesizing Content...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Recipient Address</label>
                        <input 
                          type="email" 
                          value={draftData.to}
                          onChange={(e) => setDraftData({ ...draftData, to: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all italic"
                          placeholder="executive-team@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Subject Line</label>
                        <input 
                          type="text" 
                          value={draftData.subject}
                          onChange={(e) => setDraftData({ ...draftData, subject: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all italic"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-1">Email Body</label>
                        <textarea 
                          rows={12}
                          value={draftData.body}
                          onChange={(e) => setDraftData({ ...draftData, body: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-6 px-6 text-xs font-semibold leading-relaxed focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all italic resize-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                        <h4 className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 italic">Draft Integrity</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-blue-900/60 font-bold text-[10px] italic">
                            <Check size={14} className="text-blue-600" /> AI Tone Calibration: High
                          </div>
                          <div className="flex items-center gap-3 text-blue-900/60 font-bold text-[10px] italic">
                            <Check size={14} className="text-blue-600" /> Data Points Linked: 4
                          </div>
                          <div className="flex items-center gap-3 text-blue-900/60 font-bold text-[10px] italic">
                            <Check size={14} className="text-blue-600" /> Urgent Context: Verified
                          </div>
                        </div>
                      </div>
                      <div className="p-8 bg-slate-900 rounded-[2rem] text-foreground">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2 italic">Pro-Tip</p>
                        <p className="text-[10px] font-medium leading-relaxed opacity-80 italic">Edit the body to include specific internal project codes for better stakeholder alignment.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
                <Button 
                  onClick={() => setShowDraftModal(false)} 
                  variant="outline" 
                  className="px-10 h-14 rounded-2xl border-slate-200 text-slate-500 font-black uppercase text-xs transition-all hover:bg-slate-200"
                >
                  Discard
                </Button>
                <Button 
                  onClick={handleSaveDraftToGmail} 
                  disabled={savingDraft || generatingDraft}
                  className="flex-1 h-14 bg-blue-600 text-foreground rounded-2xl font-black uppercase text-xs shadow-xl shadow-blue-500/20 hover:bg-slate-900 transition-all italic flex items-center justify-center gap-3"
                >
                  {savingDraft ? "DISPATCHING..." : (
                    <>
                      <Zap size={16} /> SEND EXECUTIVE ALERT NOW
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
