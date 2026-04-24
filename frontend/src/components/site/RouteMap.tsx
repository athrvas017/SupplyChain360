import { Plane, Ship, Truck } from "lucide-react";
import bg from "@/assets/logistics-bg.png";

const stats = [
  { label: "Active lanes", value: "2,184" },
  { label: "Avg. transit", value: "11.4d" },
  { label: "On‑time rate", value: "96.4%" },
  { label: "Carbon tracked", value: "847kt" },
];

const Routes = () => (
  <section id="routes" className="relative py-24 overflow-hidden">
    {/* Isometric background */}
    <div className="absolute inset-0 z-0">
      <img src={bg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
    </div>

    <div className="relative z-10 container">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Trade Routes</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            See your goods cross the globe.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Every container, truck and freighter tracked on a single living map. Visualize choke points across Suez, Panama, Strait of Hormuz — before they cost you.
          </p>

          <div className="mt-8 flex gap-3">
            {[{ icon: Ship, label: "Ocean" }, { icon: Plane, label: "Air" }, { icon: Truck, label: "Road" }].map((m) => (
              <div key={m.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-soft">
                <m.icon className="size-4 text-accent" />
                <span className="text-sm font-medium">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            {stats.map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-card border border-border shadow-soft">
                <p className="font-display text-3xl">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map card */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] rounded-3xl glass-light shadow-card overflow-hidden p-8">
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-semibold">LIVE</span>
              <span className="font-mono text-muted-foreground">42 lanes · 1,847 in transit</span>
            </div>

            <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="lane" x1="0" x2="1">
                  <stop offset="0" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                  <stop offset="0.5" stopColor="hsl(var(--accent))" />
                  <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                </linearGradient>
                <radialGradient id="continent">
                  <stop offset="0" stopColor="hsl(var(--brand) / 0.18)" />
                  <stop offset="1" stopColor="hsl(var(--brand) / 0)" />
                </radialGradient>
              </defs>

              {/* abstract continents */}
              <ellipse cx="180" cy="220" rx="120" ry="70" fill="url(#continent)" />
              <ellipse cx="430" cy="180" rx="140" ry="80" fill="url(#continent)" />
              <ellipse cx="640" cy="280" rx="120" ry="70" fill="url(#continent)" />

              {/* dotted grid */}
              {Array.from({ length: 20 }).map((_, i) =>
                Array.from({ length: 12 }).map((_, j) => (
                  <circle key={`${i}-${j}`} cx={40 + i * 38} cy={40 + j * 38} r="1" fill="hsl(var(--primary) / 0.12)" />
                ))
              )}

              {/* lanes */}
              <path d="M150 240 Q 320 80 480 180" stroke="url(#lane)" strokeWidth="2" fill="none" strokeDasharray="4 6" className="animate-draw" />
              <path d="M480 180 Q 580 240 660 280" stroke="url(#lane)" strokeWidth="2" fill="none" strokeDasharray="4 6" className="animate-draw" />
              <path d="M150 240 Q 380 360 660 280" stroke="hsl(var(--brand) / 0.6)" strokeWidth="2" fill="none" strokeDasharray="2 4" />
              <path d="M430 180 Q 500 100 660 130" stroke="hsl(var(--brand) / 0.6)" strokeWidth="2" fill="none" strokeDasharray="2 4" />

              {/* nodes */}
              {[
                { x: 150, y: 240, label: "Jeddah" },
                { x: 480, y: 180, label: "Rotterdam" },
                { x: 660, y: 280, label: "Shanghai" },
                { x: 320, y: 100, label: "Hamburg" },
                { x: 660, y: 130, label: "Tokyo" },
                { x: 230, y: 360, label: "Lagos" },
              ].map((n) => (
                <g key={n.label}>
                  <circle cx={n.x} cy={n.y} r="8" fill="hsl(var(--accent))" opacity="0.25">
                    <animate attributeName="r" values="8;16;8" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={n.x} cy={n.y} r="4" fill="hsl(var(--accent))" />
                  <text x={n.x + 10} y={n.y - 8} className="fill-foreground" fontSize="11" fontFamily="JetBrains Mono">{n.label}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Routes;
