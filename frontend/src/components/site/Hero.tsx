import { useState } from "react";
import { Search, ArrowUpRight, ShieldCheck, Globe2, Boxes } from "lucide-react";
import heroVideo from "/hero-truck.mp4";

const Hero = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-primary">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster=""
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Editorial overlay — keeps text readable while preserving the scene */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/30" />
      </div>

      <div className="relative z-10 container pt-32 pb-20 grid lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left — copy */}
        <div className="lg:col-span-7 text-primary-foreground">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium tracking-wide uppercase">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
            Live supply chain intelligence
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
            Trace every product back to the<span className="text-accent"> raw earth</span> it came from.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl">
            Supply Chain X-Ray maps your supply chain from final buyer down to the smallest tier‑N supplier — visualizes trade routes across borders, and flags risk before it disrupts you.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => onSearch("Apple Inc")}
              className="group inline-flex items-center gap-2 h-14 px-7 rounded-full gradient-accent text-accent-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform"
            >
              Trace a product
              <ArrowUpRight className="size-5 group-hover:rotate-45 transition-transform" />
            </button>
            <a
              href="#platform"
              className="inline-flex items-center gap-2 h-14 px-7 rounded-full border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 transition-colors font-semibold"
            >
              See the platform
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2"><Globe2 className="size-4 text-accent" /> 112 countries mapped</div>
            <div className="flex items-center gap-2"><Boxes className="size-4 text-accent" /> 3.4M supplier nodes</div>
            <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-accent" /> SOC 2 · ISO 27001</div>
          </div>
        </div>

        {/* Right — tracking card */}
        <div className="lg:col-span-5">
          <div className="glass rounded-3xl p-6 shadow-card animate-float">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Live shipment</p>
                <p className="font-mono text-sm text-primary-foreground mt-1">#GN78345012-US</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/30">
                In transit
              </span>
            </div>

            <form className="flex items-stretch gap-2 mb-5" onSubmit={handleSubmit}>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary-foreground/50" />
                <input
                  placeholder="Company name, HS code..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-primary/40 border border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button 
                type="submit"
                className="h-12 px-5 rounded-xl gradient-accent text-accent-foreground font-semibold"
              >
                Trace
              </button>
            </form>

            {/* Mini route */}
            <div className="space-y-3">
              {[
                { city: "Jeddah Port, SA", state: "Departed · 04:12", done: true },
                { city: "Suez Canal, EG", state: "Cleared · 11:48", done: true },
                { city: "Rotterdam, NL", state: "ETA 2 days", done: false },
                { city: "New York, NY", state: "ETA 8 days", done: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`size-2.5 rounded-full ${s.done ? "bg-accent" : "bg-primary-foreground/30 border border-primary-foreground/40"}`} />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-primary-foreground">{s.city}</span>
                    <span className="text-xs text-primary-foreground/60">{s.state}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-primary-foreground/10 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-display text-2xl text-primary-foreground">12,321</p>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/60">Today</p>
              </div>
              <div>
                <p className="font-display text-2xl text-accent">96.4%</p>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/60">On‑time</p>
              </div>
              <div>
                <p className="font-display text-2xl text-primary-foreground">64</p>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/60">Hubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-primary-foreground/10 bg-primary/40 backdrop-blur">
        <div className="overflow-hidden py-3">
          <div className="flex gap-12 animate-ticker whitespace-nowrap text-xs uppercase tracking-widest text-primary-foreground/60">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12">
                {["Cobalt · DRC → Rotterdam", "Lithium · Chile → Shanghai", "Coffee · Ethiopia → Hamburg", "Cotton · Egypt → Istanbul", "Semiconductors · Taiwan → Dallas", "Rare earths · Mongolia → Yokohama"].map((t) => (
                  <span key={t} className="flex items-center gap-3"><span className="size-1 rounded-full bg-accent" /> {t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
