import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, ChevronDown } from 'lucide-react';
import heroAngkor from '../assets/hero_angkor.png';
import kohRongBeach from '../assets/koh_rong_beach.png';
import preahVihear from '../assets/preah_vihear.png';

export const Map = () => {
  // Mock sites database
  const sites = [
    {
      id: 'angkor',
      name: 'Angkor Wat',
      category: 'CULTURAL',
      region: 'Siem Reap',
      duration: 'Full day',
      image: heroAngkor,
      tag: 'HERITAGE',
      description: 'The soul of the Khmer Empire, a vast stone symphony and the largest religious monument in the world.',
      coordinates: { x: 45, y: 35 }
    },
    {
      id: 'koh-rong',
      name: 'Koh Rong Sansloem',
      category: 'BOUTIQUE',
      region: 'Sihanoukville',
      duration: '3 Days',
      image: kohRongBeach,
      tag: 'LUXURY',
      description: 'Pristine turquoise shores and white sand beaches, ideal for a peaceful luxury retreat.',
      coordinates: { x: 50, y: 80 }
    },
    {
      id: 'preah-vihear',
      name: 'Preah Vihear',
      category: 'CULTURAL',
      region: 'Northern Highlands',
      duration: '2 Days',
      image: preahVihear,
      tag: 'MYSTICAL',
      description: 'An ancient temple perched on a cliff-edge on the Dângrêk Mountains with panoramic views.',
      coordinates: { x: 65, y: 15 }
    },
    {
      id: 'bayon',
      name: 'Bayon Temple',
      category: 'CULTURAL',
      region: 'Siem Reap',
      duration: 'Half day',
      image: heroAngkor,
      tag: 'CULTURAL',
      description: 'Witness the mountain-temple of Avalokiteshvara, a 12th-century masterpiece of Khmer architecture. A sanctuary of spiritual geometry.',
      coordinates: { x: 43, y: 33 }
    }
  ];

  // Filters State
  const [tourismFilters, setTourismFilters] = useState({
    cultural: true,
    eco: false,
    dark: false,
    boutique: false
  });
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [sortBy, setSortBy] = useState('Recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Map Node details overlay
  const [activeMapSite, setActiveMapSite] = useState(sites[3]); // Default to Bayon Temple

  // Map markers search state
  const [mapSearchQuery, setMapSearchQuery] = useState('');

  const filteredMapSites = sites.filter(site =>
    site.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
    site.region.toLowerCase().includes(mapSearchQuery.toLowerCase())
  );

  const handleFilterToggle = (key) => {
    setTourismFilters({
      ...tourismFilters,
      [key]: !tourismFilters[key]
    });
  };

  // Card filter logic
  const filteredCards = sites.filter(site => {
    // Search query check
    if (searchQuery && !site.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Category check
    if (site.category === 'CULTURAL' && !tourismFilters.cultural) return false;
    if (site.category === 'ECO' && !tourismFilters.eco) return false;
    if (site.category === 'DARK' && !tourismFilters.dark) return false;
    if (site.category === 'BOUTIQUE' && !tourismFilters.boutique) return false;
    // Region check
    if (selectedRegion !== 'All Regions' && site.region !== selectedRegion) return false;

    return true;
  });

  return (
    <div className="pt-28 pb-20 bg-brand-cream animate-fade-in">
      {/* 1. Page Title */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-dark font-normal italic tracking-wide">
          Discover Your Sanctuary
        </h1>
      </div>

      {/* 2. Top Search Bar */}
      <div className="max-w-xl mx-auto px-6 mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search heritage sites, luxury villas, or hidden trails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-full border border-brand-gold/15 focus:border-brand-gold focus:outline-none bg-white text-xs font-light shadow-sm"
          />
          <Search size={16} className="text-brand-dark/40 absolute left-5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 3. Main Filter & Listings Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-10 items-start mb-20">
        {/* Left Filter Sidebar */}
        <div className="bg-white/40 border border-brand-gold/10 p-6 space-y-8 rounded-none">
          <div className="flex items-center space-x-2 text-brand-gold-dark font-bold text-xs uppercase tracking-wider pb-2 border-b border-brand-gold/10">
            <SlidersHorizontal size={14} />
            <span>FILTER SEARCH</span>
          </div>

          {/* Tourism Type */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 block">Tourism Type</label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tourismFilters.cultural}
                  onChange={() => handleFilterToggle('cultural')}
                  className="rounded border-brand-gold/30 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-brand-dark/80 font-light">Cultural Tourism</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tourismFilters.eco}
                  onChange={() => handleFilterToggle('eco')}
                  className="rounded border-brand-gold/30 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-brand-dark/80 font-light">Eco Tourism</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tourismFilters.dark}
                  onChange={() => handleFilterToggle('dark')}
                  className="rounded border-brand-gold/30 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-brand-dark/80 font-light">Dark Tourism</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tourismFilters.boutique}
                  onChange={() => handleFilterToggle('boutique')}
                  className="rounded border-brand-gold/30 text-brand-gold focus:ring-brand-gold"
                />
                <span className="text-brand-dark/80 font-light">Boutique Stays</span>
              </label>
            </div>
          </div>

          {/* Regions Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 block">Regions</label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white border border-brand-gold/15 py-3.5 px-4 rounded-none text-xs font-light focus:outline-none focus:border-brand-gold appearance-none"
              >
                <option>All Regions</option>
                <option>Siem Reap</option>
                <option>Sihanoukville</option>
                <option>Northern Highlands</option>
              </select>
              <ChevronDown size={14} className="text-brand-dark/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-dark/60 block">Sort By</label>
            <div className="space-y-2 text-xs font-light text-brand-dark/80">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'Recommended'}
                  onChange={() => setSortBy('Recommended')}
                  className="text-brand-gold focus:ring-brand-gold"
                />
                <span>Most Recommended</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'Alphabetical'}
                  onChange={() => setSortBy('Alphabetical')}
                  className="text-brand-gold focus:ring-brand-gold"
                />
                <span>Alphabetical</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'Recent'}
                  onChange={() => setSortBy('Recent')}
                  className="text-brand-gold focus:ring-brand-gold"
                />
                <span>Recent Discovery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Cards Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  const mapSection = document.getElementById('interactive-map-section');
                  if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
                  setActiveMapSite(card);
                }}
                className="bg-white border border-brand-gold/10 group overflow-hidden flex flex-col justify-between cursor-pointer hover:border-brand-gold/45 hover:shadow-md transition-all duration-300"
              >
                <div className="h-44 overflow-hidden relative shrink-0">
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-brand-dark/75 border border-brand-gold/30 text-white text-[8px] font-bold tracking-widest uppercase px-2.5 py-1">
                    {card.tag}
                  </span>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-bold tracking-wider text-brand-dark uppercase group-hover:text-brand-gold transition-colors">
                      {card.name}
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-brand-gold/10 flex justify-between items-center text-[9px] font-medium tracking-wide uppercase text-brand-dark/50 font-mono">
                    <span>{card.region}</span>
                    <span>{card.duration}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-16 text-center text-xs font-light text-brand-dark/60">
              No matching sites found for current filters.
            </div>
          )}
        </div>
      </section>

      {/* 4. Locate Your Next Journey (Interactive Map Section) */}
      <section id="interactive-map-section" className="py-16 border-t border-brand-gold/15 max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-dark uppercase tracking-wide">
            Locate Your Next Journey
          </h2>
          <p className="text-[11px] font-light text-brand-dark/60 tracking-wider">
            Interactive survey of Cambodia's premier heritage and coastal sites
          </p>
        </div>

        {/* Dark Map Container */}
        <div className="bg-[#100D09] rounded-none border border-brand-gold/25 overflow-hidden shadow-2xl relative min-h-[550px] flex flex-col lg:flex-row">
          
          {/* Map Left Overlay Info Pane */}
          <div className="lg:w-[28%] p-6 md:p-8 bg-[#18130D] border-b lg:border-b-0 lg:border-r border-brand-gold/15 flex flex-col justify-between z-10 space-y-6 shrink-0">
            <div className="space-y-4 animate-fade-in" key={activeMapSite.id}>
              <div>
                <span className="inline-block px-2.5 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[8px] font-bold tracking-widest uppercase">
                  {activeMapSite.tag}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-brand-gold tracking-wide uppercase mt-2">
                  {activeMapSite.name}
                </h3>
                <span className="text-[9px] text-brand-cream-dark/40 tracking-wider uppercase font-mono">{activeMapSite.region}</span>
              </div>
              <p className="text-xs font-light text-brand-cream-dark/75 leading-relaxed">
                {activeMapSite.description}
              </p>
            </div>

            <div>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3.5 text-xs font-bold tracking-widest uppercase rounded-none transition-all shadow-md shadow-brand-gold/10 cursor-pointer"
              >
                VIEW DETAILS
              </button>
            </div>
          </div>

          {/* Center Map Stage (Real Google Map showing selected site) */}
          <div className="flex-grow bg-[#100D09] relative min-h-[400px] lg:min-h-auto overflow-hidden flex items-center justify-center border-t lg:border-t-0 lg:border-r border-brand-gold/15">
            {/* Interactive Map Iframe */}
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                activeMapSite.id === 'angkor' ? 'Angkor Wat, Siem Reap, Cambodia' :
                activeMapSite.id === 'koh-rong' ? 'Koh Rong Sanloem, Cambodia' :
                activeMapSite.id === 'preah-vihear' ? 'Preah Vihear Temple, Cambodia' :
                'Bayon Temple, Siem Reap, Cambodia'
              )}&t=h&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title={`${activeMapSite.name} Location`}
              className="absolute inset-0 w-full h-full grayscale-[10%] contrast-[105%] hover:grayscale-0 transition-all duration-300 z-0"
            />
          </div>

          {/* Right Panel: Explore Markers Selector */}
          <div className="lg:w-[24%] p-6 bg-[#18130D] border-t lg:border-t-0 lg:border-l border-brand-gold/15 flex flex-col space-y-6 z-10 shrink-0">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-brand-gold uppercase border-b border-brand-gold/10 pb-2 block font-sans">
                Explore Markers
              </span>
              
              {/* Map search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter map pins..."
                  value={mapSearchQuery}
                  onChange={(e) => setMapSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-dark border border-brand-gold/20 text-xs font-light text-brand-cream-dark placeholder-brand-cream-dark/35 focus:outline-none focus:border-brand-gold rounded-none"
                />
                <Search size={12} className="text-brand-gold/45 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* List of markers */}
            <div className="flex-grow overflow-y-auto space-y-1.5 max-h-[300px] lg:max-h-none pr-1 font-sans">
              {filteredMapSites.map((site) => {
                const isActive = activeMapSite.id === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => setActiveMapSite(site)}
                    className={`w-full text-left px-3.5 py-2.5 transition-all duration-200 text-xs tracking-wider uppercase flex items-center space-x-2.5 rounded-none border border-transparent font-sans cursor-pointer ${
                      isActive
                        ? 'bg-brand-gold text-brand-dark font-bold border-brand-gold shadow-md'
                        : 'text-brand-cream-dark/80 hover:bg-brand-cream/10 hover:text-white border-brand-gold/5'
                    }`}
                  >
                    <MapPin size={12} fill={isActive ? "currentColor" : "none"} />
                    <span className="truncate">{site.name}</span>
                  </button>
                );
              })}
              {filteredMapSites.length === 0 && (
                <div className="text-[10px] text-brand-cream-dark/40 italic py-4 text-center">
                  No matching markers
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
