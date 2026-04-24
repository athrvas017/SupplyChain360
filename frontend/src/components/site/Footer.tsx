import { Box } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container py-14 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2">
          <span className="size-8 rounded-lg gradient-accent grid place-items-center text-accent-foreground">
            <Box className="size-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl">SC X-Ray</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground max-w-sm">
          Supply chain tracking and risk intelligence — from final product to raw earth.
        </p>
      </div>
      {[
        { h: "Platform", items: ["Tracking", "Routes", "Risk", "Provenance"] },
        { h: "Company", items: ["About", "Customers", "Careers", "Press"] },
      ].map((c) => (
        <div key={c.h}>
          <p className="font-semibold mb-4">{c.h}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {c.items.map((i) => <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>)}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-border">
      <div className="container py-5 flex justify-between text-xs text-muted-foreground">
        <span>© 2026 SC X-Ray, Inc.</span>
        <span className="font-mono">v1.0 · status all systems normal</span>
      </div>
    </div>
  </footer>
);

export default Footer;
