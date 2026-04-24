import { AlertTriangle, TrendingUp, Cloud, Scale } from "lucide-react";

const risks = [
  { icon: Cloud, label: "Climate", level: "High", color: "bg-accent", node: "Typhoon — Port of Yantian" },
  { icon: Scale, label: "Geopolitical", level: "Med", color: "bg-accent-soft", node: "New tariffs — EU ↔ CN" },
  { icon: TrendingUp, label: "Financial", level: "Low", color: "bg-brand", node: "Tier‑3 supplier credit drop" },
  { icon: AlertTriangle, label: "ESG", level: "Med", color: "bg-accent-soft", node: "Audit flag — cobalt mine" },
];

const Risk = () => (
  <section id="risk" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(hsl(var(--primary-foreground)/0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="container relative">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Risk Intelligence</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Know what's about to break — days before it does.
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/70 max-w-xl">
            We score every node in your network across climate, geopolitics, finance and ESG. Subscribe to alerts on the SKUs and lanes that matter most.
          </p>

          <div className="mt-8 flex gap-4">
            <a href="#cta" className="inline-flex h-12 items-center px-6 rounded-full gradient-accent text-accent-foreground font-semibold shadow-glow">
              Run a risk audit
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
          {risks.map((r) => (
            <div key={r.label} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`size-10 rounded-xl ${r.color} grid place-items-center text-primary`}>
                  <r.icon className="size-5" />
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground font-mono">{r.level}</span>
              </div>
              <p className="text-sm uppercase tracking-widest text-primary-foreground/60">{r.label}</p>
              <p className="font-display text-xl mt-1">{r.node}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Risk;
