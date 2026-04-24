import { Network, Map, ShieldAlert, Layers } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Tier‑N supplier graph",
    desc: "Walk from your finished good to tier‑1, tier‑2, all the way to the mine, farm, or refinery. Every node verified, every edge timestamped.",
  },
  {
    icon: Map,
    title: "Trade route visualization",
    desc: "See goods move across continents in real time — port to port, lane by lane, with chokepoint and dwell‑time analytics.",
  },
  {
    icon: ShieldAlert,
    title: "Risk intelligence",
    desc: "Geopolitical, climate, financial, ESG and sanctions signals — scored per supplier, per route, per SKU. Alerts before disruption.",
  },
  {
    icon: Layers,
    title: "Material provenance",
    desc: "Trace cobalt, cotton, semiconductors and more back to origin. Audit‑ready chain of custody for compliance and CSRD reporting.",
  },
];

const Features = () => (
  <section id="platform" className="py-24 bg-background">
    <div className="container">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">The Platform</p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
          One graph. Every shipment, supplier and<span className="text-accent"> raw material</span>.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Supply Chain X-Ray ingests EDI, ERP, customs filings, and satellite signals into a single live model of your supply network.
        </p>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 gap-6">
        {features.map((f) => (
          <div key={f.title} className="group relative p-8 rounded-3xl bg-card border border-border shadow-soft hover:shadow-card transition-shadow">
            <div className="size-12 rounded-2xl gradient-accent grid place-items-center text-accent-foreground mb-6 shadow-glow">
              <f.icon className="size-6" />
            </div>
            <h3 className="font-display text-2xl mb-2">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
