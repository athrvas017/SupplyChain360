import { ArrowUpRight } from "lucide-react";

const CTA = () => (
  <section id="cta" className="py-24">
    <div className="container">
      <div className="relative overflow-hidden rounded-[2.5rem] gradient-accent p-12 lg:p-20 text-accent-foreground shadow-glow">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-accent-foreground/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 size-72 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-accent-foreground/80">Get started</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Map your supply chain in 14 days.
          </h2>
          <p className="mt-5 text-lg text-accent-foreground/85 max-w-xl">
            Bring one ERP feed and a list of suppliers. We'll return a live network graph, your first risk score, and three trade routes you didn't know existed.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Book a demo <ArrowUpRight className="size-5" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 h-14 px-7 rounded-full border border-accent-foreground/40 text-accent-foreground font-semibold hover:bg-accent-foreground/10 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
