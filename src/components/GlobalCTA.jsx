export const GlobalCTA = ({ setActiveTab }) => {
  return (
    <section className="bg-brand-dark-accent border-t border-brand-gold/10 text-brand-cream-dark py-24 px-6 text-center relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        <span className="font-handwritten text-brand-gold text-2xl tracking-wide block">
          Your bespoke pilgrimage begins here
        </span>
        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-[0.15em] uppercase leading-tight">
          Ready to Discover Cambodia?
        </h2>
        <div className="w-16 h-[1px] bg-brand-gold/30 mx-auto my-4" />
        <p className="font-inter text-sm sm:text-base text-brand-cream-dark/70 max-w-lg mx-auto leading-relaxed font-light">
          Experience ancient temples, vibrant culture, and unforgettable landscapes.
        </p>
        <div className="pt-6">
          <button
            onClick={() => setActiveTab('plan-trip')}
            className="inline-block bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-10 py-4 rounded-md text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/10 cursor-pointer"
          >
            Plan Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};
