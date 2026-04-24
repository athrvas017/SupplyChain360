const logos = ["MAERSK", "FLEXPORT", "CARGILL", "SIEMENS", "UNILEVER", "BOSCH", "STELLANTIS"];

const Logos = () => (
  <section className="py-14 border-y border-border bg-background">
    <div className="container">
      <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
        Trusted by operators moving the world's goods
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
        {logos.map((l) => (
          <span key={l} className="font-display text-xl text-primary/40 hover:text-primary transition-colors tracking-widest">
            {l}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Logos;
