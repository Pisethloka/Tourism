import logoImg from '../assets/logo.jpg';

export const Footer = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (tab, sectionId = null) => {
    setActiveTab(tab, sectionId);
  };

  return (
    <footer className="bg-brand-dark border-t border-brand-gold/15 text-brand-cream-dark/80 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle gold background glow */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <img src={logoImg} className="h-9 w-9 object-cover rounded-full border border-brand-gold/30 shadow-md" alt="Angkor Prestige Logo" />
            <h3 className="font-serif text-2xl font-bold tracking-widest text-brand-gold uppercase whitespace-nowrap">
              ANGKOR PRESTIGE
            </h3>
          </div>
          <p className="text-sm font-light leading-relaxed text-brand-cream-dark/70 max-w-sm">
            Curating the most exclusive journeys through the Kingdom of Wonder. Authentic, sustainable, and undeniably majestic.
          </p>
        </div>

        {/* Tourism Sectors Column */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-bold tracking-wider text-brand-gold uppercase">
            TOURISM SECTORS
          </h4>
          <ul className="space-y-2 text-xs font-light text-brand-cream-dark/70 uppercase tracking-wider">
            <li>
              <button onClick={() => handleLinkClick('destinations', 'cultural-tourism')} className="hover:text-brand-gold transition-colors text-left">
                Cultural Tourism
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('destinations', 'dark-tourism')} className="hover:text-brand-gold transition-colors text-left">
                Dark Tourism
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('destinations', 'eco-tourism')} className="hover:text-brand-gold transition-colors text-left">
                Eco Tourism
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Access Links Column */}
        <div className="space-y-4">
          <h4 className="font-serif text-xs font-bold tracking-wider text-brand-gold uppercase">
            QUICK ACCESS LINKS
          </h4>
          <ul className="space-y-2 text-xs font-light text-brand-cream-dark/70 uppercase tracking-wider">
            <li>
              <button onClick={() => handleLinkClick('home')} className="hover:text-brand-gold transition-colors text-left">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('destinations')} className="hover:text-brand-gold transition-colors text-left">
                Destinations
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('gallery')} className="hover:text-brand-gold transition-colors text-left">
                Gallery
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('map')} className="hover:text-brand-gold transition-colors text-left">
                Map
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('plan-trip')} className="hover:text-brand-gold transition-colors text-left">
                Plan Trip
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-brand-gold/10 flex flex-col md:flex-row justify-between items-center text-xs text-brand-cream-dark/50 relative z-10">
        <p>© 2026 Angkor Prestige. Kingdom of Wonder Tourism. All Rights Reserved.</p>
        
        {/* Social Links Row */}
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <span className="text-[10px] tracking-widest text-brand-cream-dark/40 uppercase font-bold">Follow us:</span>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-cream-dark hover:text-brand-gold transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V2h-3C10.5 2 9 3.5 9 5.5V8z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-cream-dark hover:text-brand-gold transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* TikTok Icon */}
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-brand-cream-dark hover:text-brand-gold transition-colors" aria-label="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.13.99 1.13 2.39 1.84 3.86 2.05v3.86c-1.84-.04-3.62-.75-4.96-2.02-.12-.11-.23-.23-.34-.35v6.86c.07 3.57-2.12 6.94-5.5 8.13-3.37 1.19-7.24-.13-9.11-3.23C.16 16.32-.4 12.23 1.02 8.94c1.42-3.29 4.86-5.46 8.44-5.32V7.5c-1.89-.14-3.72.88-4.57 2.58-.85 1.7-.58 3.83.67 5.23 1.25 1.4 3.32 1.76 4.96.88 1.26-.68 2.02-2.02 2-3.46V0c0 .02 0 .02 0 .02z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-brand-cream-dark hover:text-brand-gold transition-colors" aria-label="Twitter/X">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
