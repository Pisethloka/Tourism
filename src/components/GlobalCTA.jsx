import { ArrowRight } from "lucide-react";

export const GlobalCTA = ({ setActiveTab }) => {
  return (
    <section className="bg-brand-dark-accent border-t border-brand-gold/20 text-brand-cream-dark py-28 px-6 text-center relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        <div className="w-100 h-[1px] bg-brand-gold/40 mx-auto my-4" />

        <h2 className="font-cormorant text-3xl sm:text-5xl text-white font-normal tracking-[0.15em] uppercase leading-tight">
          Ready to Experience <br className="hidden sm:block" /> the Kingdom of
          Wonder?
        </h2>

        <div className="w-20 h-[1px] bg-brand-gold/40 mx-auto my-4" />

        <p className="font-sans text-base md:text-lg text-brand-cream-dark/95 max-w-lg mx-auto leading-relaxed font-light">
          Experience a journey made just for you, from ancient temples to
          untouched natural wonders.
        </p>

        <div className="pt-6">
          <button
            type="button"
            onClick={() => setActiveTab("plan-trip")}
            className="inline-flex items-center space-x-3 bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-8 md:px-10 py-4 rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <span>START PLANNING NOW</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
