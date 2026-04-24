import { useState, useCallback, useEffect } from 'react';
import { searchCompanies, getCompanyHSCodes } from '../utils/api';
import { getCountryFlag, formatNumber } from '../utils/colors';
import HSCodeSelector from './HSCodeSelector';

export default function SearchPanel({ onBuild, isBuilding, initialQuery }: any) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [hsCodes, setHsCodes] = useState<any[]>([]);
  const [selectedHS, setSelectedHS] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingHS, setIsLoadingHS] = useState(false);

  // Mock recent searches since we don't have global state here without Dashboard
  const recentSearches = [
    "Apple Inc.",
    "Tesla Supply Map"
  ];

  const handleSearch = useCallback(async (searchQuery = query) => {
    const q = searchQuery.trim();
    if (!q) return;
    setIsSearching(true);
    setSelectedCompany(null);
    setHsCodes([]);
    setSelectedHS([]);
    try {
      const data = await searchCompanies(q);
      setResults(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
    setIsSearching(false);
  }, [query]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  const handleSelectCompany = useCallback(async (company: any) => {
    setSelectedCompany(company);
    setIsLoadingHS(true);
    try {
      const data = await getCompanyHSCodes(company.name);
      setHsCodes(data.hs_codes || []);
      const top = (data.hs_codes || []).slice(0, 3).map((h: any) => h.hs_code);
      setSelectedHS(top);
    } catch (err) {
      console.error('HS codes failed:', err);
    }
    setIsLoadingHS(false);
  }, []);

  const handleBuild = useCallback(() => {
    if (selectedCompany && selectedHS.length > 0) {
      onBuild(selectedCompany.name, selectedHS);
    }
  }, [selectedCompany, selectedHS, onBuild]);

  return (
    <aside className="h-full w-72 flex flex-col p-4 gap-2 bg-blue-50/40 dark:bg-blue-950/20 border-r border-border shrink-0 relative z-30">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center overflow-hidden">
          <img alt="Synergy Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHduOJdg8Y94IWCTnh5CDIUA76HyjZKv5rZWrZow5c7di0OExmBaPNSNIZ-oCgVz_k-B3MPnjgBA-EguKZOCm6ThobNiy0M8udvxAw2LudlN8otzruVdRQHLRCzV0EcenoYttv0RrEWNB_Xy7l11XlpF0UrmSmlIo879lmCODZWIdyuCLMno5TFyyiLi8pl33vcs9ULQtM0yjbPBrqhR70TXQlDzrpAIFNzBe3j-RpubM7wNlPXQdp696zv1prQsOPigdIJPP8TA"/>
        </div>
        <div>
          <h2 className="font-bold text-blue-700 dark:text-blue-300 text-sm">Global Intelligence</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Supply Chain X-Ray</p>
        </div>
      </div>

      <div className="mt-4 space-y-4 flex-1 overflow-y-auto pr-1">
        
        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          </div>
          <input 
            className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl text-sm focus:ring-2 focus:ring-primary shadow-sm outline-none transition-all placeholder:text-slate-400 text-on-surface" 
            placeholder="Search Company (e.g., Apple)" 
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            disabled={isBuilding}
          />
        </div>

        {/* Menu Items */}
        {!selectedCompany && results.length === 0 && (
          <div className="space-y-1">
            <div className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm rounded-xl px-4 py-3 flex items-center gap-3 translate-x-1 transition-transform cursor-pointer">
              <span className="material-symbols-outlined">insights</span>
              <span className="text-sm font-medium">Intelligence</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl px-4 py-3 flex items-center gap-3 transition-all cursor-pointer">
              <span className="material-symbols-outlined">public</span>
              <span className="text-sm font-medium">Supply Map</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl px-4 py-3 flex items-center gap-3 transition-all cursor-pointer">
              <span className="material-symbols-outlined">account_tree</span>
              <span className="text-sm font-medium">Traceability</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && !selectedCompany && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mt-2">Companies Found</div>
            {results.map((r: any, i) => (
              <button
                key={i}
                className="flex flex-col gap-1 p-3 rounded-xl bg-surface-container-lowest border border-border cursor-pointer hover:border-transparent hover:bg-primary hover:text-white transition-all text-left shadow-sm w-full group"
                onClick={() => handleSelectCompany(r)}
              >
                <div className="font-bold text-[13px] flex items-center gap-2 text-on-surface group-hover:text-white">
                  <span className="text-base">{getCountryFlag(r.country)}</span>
                  <span>{r.name}</span>
                </div>
                <div className="flex gap-3 text-[11px] text-on-surface-variant group-hover:text-primary-fixed-dim font-medium pl-6">
                  <span>{formatNumber(r.shipment_count)} shipments</span>
                  <span>{r.hs_code_count} HS codes</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Selected Company + HS Code Picker */}
        {selectedCompany && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-start justify-between p-4 bg-surface-container-lowest rounded-2xl border border-primary/20 shadow-lg shadow-primary/5">
              <div>
                <div className="font-extrabold text-sm text-foreground flex items-center gap-2">
                  <span className="text-lg">{getCountryFlag(selectedCompany.country)}</span> 
                  {selectedCompany.name}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 font-medium">
                  {formatNumber(selectedCompany.shipment_count)} shipments · {selectedCompany.hs_code_count} HS codes
                </div>
              </div>
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500" onClick={() => {
                setSelectedCompany(null);
                setHsCodes([]);
                setSelectedHS([]);
              }}>
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {isLoadingHS ? (
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden mt-4">
                <div className="h-full bg-primary w-1/3 animate-ticker"></div>
              </div>
            ) : (
              <div className="bg-surface-container-lowest p-3 rounded-2xl border border-border mt-2 shadow-sm">
                <HSCodeSelector
                  hsCodes={hsCodes}
                  selectedHS={selectedHS}
                  onToggle={(code: string) => {
                    setSelectedHS(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
                  }}
                  onSelectAll={() => setSelectedHS(hsCodes.map(h => h.hs_code))}
                  onDeselectAll={() => setSelectedHS([])}
                />
              </div>
            )}
          </div>
        )}

        <div className="pt-4 pb-2">
          {selectedCompany && selectedHS.length > 0 ? (
            <button 
              className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              onClick={handleBuild}
              disabled={isBuilding}
            >
              {isBuilding ? (
                <><span className="material-symbols-outlined animate-spin text-[18px]">sync</span> Building...</>
              ) : (
                <><span className="material-symbols-outlined text-[18px]">account_tree</span> Trace Supply Chain</>
              )}
            </button>
          ) : (
            <button 
              className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-transform disabled:opacity-50"
              onClick={() => handleSearch()}
              disabled={isBuilding || isSearching || !query.trim()}
            >
              {isSearching ? 'Processing...' : 'New Analysis'}
            </button>
          )}
        </div>

      </div>

      <div className="mt-auto p-4 bg-surface-container rounded-2xl">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Recent Searches</h3>
        <div className="space-y-2">
          {recentSearches.map(term => (
            <div key={term} onClick={() => {
              setQuery(term);
              handleSearch(term);
            }} className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer">
              <span>{term}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
