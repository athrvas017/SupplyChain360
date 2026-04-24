import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Zap, 
  FileWarning, 
  BarChart2, 
  Target
} from 'lucide-react';
import { getResilienceScore } from '../utils/api';
import Navbar from '../components/site/Navbar';
import { useSupplyChain } from '../context/SupplyChainContext';
import { Button } from '@/components/ui/button';

export default function ResiliencePage() {
  const { initialSearchText } = useSupplyChain();
  const companyName = initialSearchText || "Apple";

  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScore() {
      try {
        const data = await getResilienceScore(companyName);
        setScoreData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadScore();
  }, [companyName]);

  if (loading) return <div className="h-screen bg-background flex items-center justify-center text-foreground">Calculating Resilience Metrics...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3 italic">
            <ShieldAlert className="text-blue-500" />
            Resilience Index
          </h1>
          <p className="text-muted-foreground font-medium">Patent-Pending Multi-Tier Health Analysis for {companyName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Score Card */}
            <div className="bg-gradient-to-br from-[#141419] to-[#0a0a0c] border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8">
                  <div className={`px-4 py-1 rounded-full text-[10px] font-black border ${scoreData.status === 'FRAGILE' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                    {scoreData.status}
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90">
                       <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-foreground/5" />
                       <circle 
                         cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                         strokeDasharray={552.92}
                         strokeDashoffset={552.92 - (552.92 * scoreData.overall_score / 10)}
                         className={scoreData.overall_score < 4 ? 'text-red-500' : 'text-blue-500'}
                         strokeLinecap="round"
                       />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black italic">{scoreData.overall_score}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Resilience Index</span>
                     </div>
                  </div>

                  <div className="flex-1 space-y-6">
                     <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Metric Breakdown</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {Object.entries(scoreData.breakdown).map(([key, val]: any) => (
                          <div key={key} className="space-y-1">
                            <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                              <span>{key.replace('_', ' ')}</span>
                              <span>{val}/10</span>
                            </div>
                            <div className="h-1 bg-secondary rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${val * 10}%` }} className={`h-full ${val < 4 ? 'bg-red-500' : 'bg-blue-400'}`} />
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Industry Benchmark */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
              <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6 border-b border-border pb-4">Global Benchmarking</h3>
              <div className="space-y-6">
                {Object.entries(scoreData.benchmarks).map(([ind, score]: any) => (
                  <div key={ind} className="flex items-center gap-4">
                    <span className="w-24 text-[10px] font-black text-muted-foreground uppercase italic">{ind}</span>
                    <div className="flex-1 h-8 bg-secondary rounded-sm flex items-center px-1 overflow-hidden relative border border-border">
                       <div className="h-6 bg-secondary/50 flex items-center justify-end px-3" style={{ width: `${score * 10}%` }}>
                          <span className="text-[9px] font-black italic">{score}</span>
                       </div>
                       {ind === "Electronics" && (
                         <div className="absolute top-0 flex flex-col items-center" style={{ left: `${scoreData.overall_score * 10}%` }}>
                            <div className="w-[2px] h-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                            <span className="text-[8px] font-black bg-blue-500 text-foreground px-2 absolute -top-4 rounded italic uppercase whitespace-nowrap">{companyName}</span>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 italic">
                   <FileWarning size={14} /> Risk Velocity Change
                </h3>
                <div className="space-y-4">
                   {scoreData.drivers_down.map((d: string, i: number) => (
                     <div key={i} className="text-xs p-4 bg-red-500/10 border-l-2 border-red-500 rounded-r-xl text-muted-foreground font-medium">
                       {d}
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8 flex flex-col items-center text-center">
                <Zap className="text-blue-400 mb-4 animate-pulse" />
                <h4 className="text-sm font-black italic mb-2">Decision Support Ready</h4>
                <p className="text-[10px] text-muted-foreground mb-6 font-medium">Strategic playbooks and executive drafting tools are available in the Action HQ.</p>
                <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest border-blue-500/30 text-blue-400">Launch HQ</Button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
