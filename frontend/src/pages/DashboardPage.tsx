import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import DashboardPreview from "@/components/site/DashboardPreview";
import Navbar from "../components/site/Navbar";
import { 
  Building2, Search, ArrowRight, ShieldAlert, 
  MapPin, AlertTriangle, Download, Pin, Clock, Activity, PanelRight
} from "lucide-react";
import { useSupplyChain } from "@/context/SupplyChainContext";
import { getDashboardHistory, getLatestGraph } from "@/utils/api";

// --- DUMMY FALLBACK DATA ---
const DUMMY_SEARCH_HISTORY = [
  { id: "1", canonical_name: "Tesla Inc.", searched_at: new Date(Date.now() - 3600000).toISOString(), tier_depth: 4 },
  { id: "2", canonical_name: "Samsung Electronics", searched_at: new Date(Date.now() - 86400000).toISOString(), tier_depth: 6 },
  { id: "3", canonical_name: "Nvidia Corp", searched_at: new Date(Date.now() - 172800000).toISOString(), tier_depth: 3 },
];


export default function DashboardPage() {
  const navigate = useNavigate();
  const { initialSearchText, stats, concentrationRisk, nodes } = useSupplyChain();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Try backend API first (reads from Supabase → Neo4j → memory)
      try {
        const backendHistory = await getDashboardHistory();
        if (backendHistory?.history?.length > 0) {
          setHistory(backendHistory.history);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('[Dashboard] Backend history fetch failed, trying Supabase directly:', err);
      }

      // Fallback: Try Supabase directly from frontend
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        const [historyRes] = await Promise.all([
          supabase.from('search_log').select('*').order('searched_at', { ascending: false }).limit(10),
        ]);
        if (!historyRes.error && historyRes.data && historyRes.data.length > 0) {
          setHistory(historyRes.data);
          setLoading(false);
          return;
        }
      }

      // Final fallback
      setHistory(DUMMY_SEARCH_HISTORY);
    } catch (err) {
      setHistory(DUMMY_SEARCH_HISTORY);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
  };

  if (loading) {
    return <div className="flex bg-background h-screen w-full items-center justify-center font-display text-xl animate-pulse">Loading Supply Chain X-Ray...</div>;
  }

  // Dashboard is always accessible — DashboardPreview handles data resolution


  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Navbar />
      {/* Secondary Controls Toolbar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md z-40 shrink-0 mt-16">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-brand/10 border border-brand/20 grid place-items-center">
              <Activity className="size-4 text-brand" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-[10px] tracking-tight uppercase leading-none">Intelligence Engine</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Status: Operational</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant={showStats ? "secondary" : "default"} 
              size="sm" 
              onClick={() => setShowStats(!showStats)} 
              className="gap-2 transition-all shadow-sm rounded-full font-bold text-[10px] px-5 h-8"
            >
              <PanelRight className="size-3.5" /> 
              {showStats ? "HIDE ANALYTICS" : "VIEW ANALYTICS"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* The Original Dashboard Preview Graphic */}
        <div className={`flex-1 relative h-full transition-all duration-300 transform ${showStats ? "lg:mr-[400px] xl:mr-[450px]" : "mr-0"}`}>
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
            <DashboardPreview />
          </div>
        </div>

        {/* PRD 6.3 Slide-in Stats Sidebar */}
        <aside 
          className={`absolute top-0 bottom-0 right-0 w-full lg:w-[400px] xl:w-[450px] bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-800 shadow-2xl transition-transform duration-500 z-40 flex flex-col ${
            showStats ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 shrink-0 bg-black/20">
            <h2 className="font-display text-lg font-semibold text-white flex items-center gap-2">
              <ShieldAlert className="size-4 text-accent" /> Network Insights
            </h2>
            <Button variant="outline" size="sm" onClick={() => alert("Exporting report...")} className="h-8 border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800">
              <Download className="size-3 mr-2" /> Export
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {/* Search Control */}
              <Card className="bg-zinc-900/40 border-zinc-800/80 text-white">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Search className="size-4 text-zinc-400" /> Deep Map Search
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Traced company name..." 
                      className="flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus:border-accent"
                    />
                    <Button size="sm" variant="secondary" className="px-3 shrink-0"><ArrowRight className="size-4" /></Button>
                  </div>
                </CardContent>
              </Card>

              {/* History */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1 flex items-center gap-1.5">
                  <Clock className="size-3" /> Recent Chains
                </h3>
                {history.map((log) => (
                  <div key={log.id} className="flex justify-between items-center p-3 rounded-lg border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                    <div>
                      <p className="font-medium text-sm text-zinc-200 group-hover:text-white">{log.canonical_name}</p>
                      <p className="text-xs text-zinc-500">{formatDate(log.searched_at)}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-zinc-950 border-zinc-700 text-zinc-400">T-{log.tier_depth}</Badge>
                  </div>
                ))}
              </div>

              <Separator className="bg-zinc-800" />

              {/* §6.1 Deep Link */}
              <button
                onClick={() => navigate("/compliance")}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-red-900/40 bg-red-950/10 hover:bg-red-950/20 transition-colors text-left group"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-4 text-red-400" />
                  <div>
                    <p className="text-xs font-semibold text-red-300">Compliance & Financial Insights</p>
                    <p className="text-[10px] text-zinc-500">OFAC · UFLPA · BIS · SEC · World Bank</p>
                  </div>
                </div>
                <ArrowRight className="size-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
              </button>

              <Separator className="bg-zinc-800" />

              {/* Saved Insights */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1 flex items-center gap-1.5">
                  <Pin className="size-3" /> Monitored Assets
                </h3>
                
                <Card className="bg-zinc-900/60 border-zinc-800 text-white overflow-hidden shadow-md">
                  <div className="p-4 border-b border-zinc-800/60 bg-gradient-to-r from-zinc-900/50 to-zinc-900">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-sm text-zinc-100 flex items-center gap-2">
                          {initialSearchText} Supply Chain
                          <span className="flex size-2 rounded-full bg-green-500 animate-pulse ml-1" />
                        </h4>
                        <p className="text-xs text-zinc-500">Active Trace Session</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-950/50 border border-zinc-800/30 p-2.5 rounded-md">
                        <p className="text-[10px] text-zinc-400 mb-1 font-bold">Total Nodes</p>
                        <p className="text-xs font-mono text-zinc-200">{stats.nodes}</p>
                      </div>
                      <div className="bg-zinc-950/50 border border-zinc-800/30 p-2.5 rounded-md">
                        <p className="text-[10px] text-zinc-400 mb-1 font-bold">Total Edges</p>
                        <p className="text-xs font-mono text-zinc-200">{stats.edges}</p>
                      </div>
                    </div>

                    {concentrationRisk && concentrationRisk.length > 0 && (
                      <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded-md flex justify-between items-center">
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1"><MapPin className="size-2 inline mr-1 text-accent"/> Geo-Concentration</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{concentrationRisk[0].country}</span>
                          <span className="text-xs font-mono text-zinc-500">{Math.round(concentrationRisk[0].percentage)}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
}
