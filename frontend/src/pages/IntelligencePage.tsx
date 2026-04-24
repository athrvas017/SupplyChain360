import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, PlayCircle, BarChart3, CheckCircle2, ShieldCheck, Scale } from 'lucide-react';
import { getDynamicRisk, getBenchmarking } from '../utils/api';
import Navbar from '../components/site/Navbar';
import { useSupplyChain } from '../context/SupplyChainContext';
export default function IntelligencePage() {
  const { initialSearchText } = useSupplyChain();
  const companyName = initialSearchText || "Apple";

  const [dynamicRisk, setDynamicRisk] = useState<any>(null);
  const [benchmark, setBenchmark] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const riskData = await getDynamicRisk(companyName);
        setDynamicRisk(riskData);

        // Competitors array
        const comps = [companyName, "Samsung", "Nvidia", "TSMC"];
        const benchData = await getBenchmarking(comps);
        setBenchmark(benchData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [companyName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex animate-pulse space-x-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 mt-24">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          <div className="lg:col-span-3">
             <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
               <div className="w-8 h-px bg-blue-500"></div> Intelligence Stream
             </h3>
             <h2 className="text-3xl font-black text-foreground italic truncate mb-8">
               {companyName} <span className="text-gray-600">/ GLOBAL THREAT VECTOR</span>
             </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div className="bg-card border border-border rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-blue-500" /> Security Posture
                  </h4>
                  <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
                    Graph traversal indicates <span className="text-foreground italic underline decoration-blue-500/50">Zero Sanction Direct Hits</span> for Tier-1 entities. Continuous auditing active.
                  </p>
               </div>
               <div className="bg-card border border-border rounded-[2rem] p-8 relative overflow-hidden group hover:border-red-500/30 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full"></div>
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-red-500" /> Critical Vectors
                  </h4>
                  <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
                    Identified <span className="text-foreground italic underline decoration-red-500/50">High Concentration</span> across {dynamicRisk?.timeline?.[0]?.month} semiconductor nodes.
                  </p>
               </div>
             </div>

             {/* Chart */}
             <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-muted-foreground">{dynamicRisk?.company} Risk Velocity</h3>
                  <p className="text-sm text-muted-foreground tracking-wide">6-Month Trend Trajectory</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono font-black text-foreground">{dynamicRisk?.current_score}</div>
                  <div className={`text-sm font-bold flex items-center gap-1 ${dynamicRisk?.change > 0 ? "text-red-500" : "text-green-500"}`}>
                    {dynamicRisk?.change > 0 ? "↑ INCREASED" : "↓ DECREASED"} ({Math.abs(dynamicRisk?.change)})
                  </div>
                </div>
              </div>

              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dynamicRisk?.timeline}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={dynamicRisk?.change > 0 ? "#ef4444" : "#22c55e"} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={dynamicRisk?.change > 0 ? "#ef4444" : "#22c55e"} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <YAxis domain={[0, 10]} stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="score" stroke={dynamicRisk?.change > 0 ? "#ef4444" : "#22c55e"} strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Insights panel */}
            <div className="flex flex-col gap-4">
              <div className="bg-card border border-border rounded-xl p-5 shadow-xl flex-1">
                <h3 className="text-xs font-bold text-muted-foreground tracking-wider mb-4 uppercase">Why It Changed</h3>
                <div className="space-y-3">
                  {dynamicRisk?.reasons?.map((reason: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm p-3 bg-red-500/5 border border-red-500/20 rounded-lg text-muted-foreground">
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 shadow-xl flex-1">
                <h3 className="text-xs font-bold text-muted-foreground tracking-wider mb-4 uppercase">AI Recommendations</h3>
                <div className="space-y-3">
                  {dynamicRisk?.recommendations?.map((rec: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm items-center text-muted-foreground">
                      <span className="text-green-500 font-black">{rec.split(' ')[0]}</span>
                      <span>{rec.substring(rec.indexOf(' ') + 1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Benchmarking Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Scale className="text-blue-500" />
            Competitive Resilience Benchmarking
          </h2>

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary border-b border-border">
                    <th className="p-4 text-xs tracking-widest font-bold text-muted-foreground uppercase">Metric</th>
                    {benchmark?.metrics?.map((m: any, i: number) => (
                      <th key={i} className={`p-4 text-sm font-black uppercase ${m.name === companyName ? "text-blue-400" : "text-muted-foreground"}`}>
                        {m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="p-4 font-mono text-muted-foreground">Risk Score</td>
                    {benchmark?.metrics?.map((m: any, i: number) => (
                      <td key={i} className="p-4 font-mono">
                        <span className={`px-2 py-1 rounded bg-secondary border font-bold ${m.risk_score > 7 ? 'text-red-400 border-red-500/30' : m.risk_score < 5 ? 'text-green-400 border-green-500/30' : 'text-yellow-400 border-yellow-500/30'}`}>
                          {m.risk_score}/10
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-mono text-muted-foreground">Supplier Concentration</td>
                    {benchmark?.metrics?.map((m: any, i: number) => (
                      <td key={i} className="p-4 font-mono">{m.concentration}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-mono text-muted-foreground">Sanctions Exposure</td>
                    {benchmark?.metrics?.map((m: any, i: number) => (
                      <td key={i} className="p-4">
                        {m.sanctions_hits > 0 ? <span className="text-red-400 flex items-center gap-2">⚠️ {m.sanctions_hits} Hits</span> : <span className="text-green-400 flex items-center gap-2">✓ Clean</span>}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 font-mono text-muted-foreground">Geopolitical Friction</td>
                    {benchmark?.metrics?.map((m: any, i: number) => (
                      <td key={i} className="p-4 text-xs font-semibold">{m.exposure}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-500/5 p-6 border-t border-blue-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-bold text-blue-400 tracking-wider mb-4 uppercase">AI Verdict</h3>
                  <div className="space-y-2">
                    {benchmark?.verdict?.map((v: string, i: number) => (
                      <div key={i} className="text-sm font-semibold">{v}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-blue-400 tracking-wider mb-4 uppercase">Strategic Insights</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                    {benchmark?.insights?.map((ins: string, i: number) => (
                      <li key={i}>{ins}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
