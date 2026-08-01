import { useState } from "react";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import heroAngkor from "../assets/hero_angkor.png";
import bayonTemplePhoto from "../assets/bayon_temple_photo.jpg";
import kohRongSanloemPhoto from "../assets/koh_rong_sanloem_photo.jpg";
import preahVihearPhoto from "../assets/preah_vihear_photo.jpg";
import bokorHillPhoto from "../assets/bokor_hill_photo.jpg";
import tuolSlengPhoto from "../assets/tuol_sleng_photo.jpg";
import cardamomMountainsPhoto from "../assets/cardamom_mountains_photo.jpg";
import tonleSap from "../assets/tonle_sap.png";
import phnomPenhPalace from "../assets/phnom_penh_palace.png";

export const Map = ({ setActiveTab }) => {
  // Mock sites database
  const sites = [
    {
      id: "angkor",
      name: "Angkor Wat",
      category: "CULTURAL",
      region: "Siem Reap",
      duration: "Full day",
      image: heroAngkor,
      tag: "HERITAGE",
      description:
        "The soul of the Khmer Empire, a vast stone symphony and the largest religious monument in the world.",
      coordinates: { x: 45, y: 35 },
    },
    {
      id: "koh-rong",
      name: "Koh Rong Sanloem",
      category: "BOUTIQUE",
      region: "Sihanoukville",
      duration: "3 Days",
      image: kohRongSanloemPhoto,
      tag: "LUXURY",
      description:
        "Pristine turquoise shores and white sand beaches, ideal for a peaceful luxury retreat.",
      coordinates: { x: 50, y: 80 },
    },
    {
      id: "preah-vihear",
      name: "Preah Vihear",
      category: "CULTURAL",
      region: "Northern Highlands",
      duration: "2 Days",
      image: preahVihearPhoto,
      tag: "MYSTICAL",
      description:
        "An ancient temple perched on a cliff-edge on the Dângrêk Mountains with panoramic views.",
      coordinates: { x: 65, y: 15 },
    },
    {
      id: "bayon",
      name: "Bayon Temple",
      category: "CULTURAL",
      region: "Siem Reap",
      duration: "Half day",
      image: bayonTemplePhoto,
      tag: "CULTURAL",
      description:
        "Witness the mountain-temple of Avalokiteshvara, a 12th-century masterpiece of Khmer architecture. A sanctuary of spiritual geometry.",
      coordinates: { x: 43, y: 33 },
    },
    {
      id: "tonle-sap",
      name: "Tonle Sap Lake",
      category: "ECO",
      region: "Siem Reap",
      duration: "Half day",
      image: tonleSap,
      tag: "ECOTRAVEL",
      description:
        "The beating heart of Cambodia, featuring unique floating communities and seasonal floods.",
      coordinates: { x: 42, y: 48 },
    },
    {
      id: "bokor",
      name: "Bokor Hill Station",
      category: "DARK",
      region: "Kampot",
      duration: "1 Day",
      image: bokorHillPhoto,
      tag: "HISTORIC",
      description:
        "A misty mountain canopy featuring haunting French colonial ruins and panoramic gulf views.",
      coordinates: { x: 48, y: 78 },
    },
    {
      id: "tuol-sleng",
      name: "Tuol Sleng (S-21)",
      category: "DARK",
      region: "Phnom Penh",
      duration: "2 Hours",
      image: tuolSlengPhoto,
      tag: "MEMORIAL",
      description:
        "A former high school turned interrogation facility, now standing as a memorial to historical truth.",
      coordinates: { x: 55, y: 62 },
    },
    {
      id: "cardamoms",
      name: "Cardamom Mountains",
      category: "ECO",
      region: "Western Highlands",
      duration: "3 Days",
      image: cardamomMountainsPhoto,
      tag: "WILDERNESS",
      description:
        "One of Southeast Asia's last great wilderness areas, home to rare wildlife and hidden waterfalls.",
      coordinates: { x: 28, y: 55 },
    },
    {
      id: "royal-palace",
      name: "Royal Palace PP",
      category: "CULTURAL",
      region: "Phnom Penh",
      duration: "Half day",
      image: phnomPenhPalace,
      tag: "ROYALTY",
      description:
        "A shining example of classic Khmer architecture with its golden spires and royal gardens.",
      coordinates: { x: 56, y: 60 },
    },
  ];

  // Filters State
  const [tourismFilters, setTourismFilters] = useState({
    cultural: true,
    eco: true,
    dark: true,
    boutique: true,
  });
  const [showMoreSites, setShowMoreSites] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [sortBy, setSortBy] = useState("Recommended");
  const [searchQuery, setSearchQuery] = useState("");

  // Active Map Node details overlay
  const [activeMapSite, setActiveMapSite] = useState(sites[3]); // Default to Bayon Temple

  // Map markers search state
  const [mapSearchQuery, setMapSearchQuery] = useState("");

  const filteredMapSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
      site.region.toLowerCase().includes(mapSearchQuery.toLowerCase())
  );

  const handleFilterToggle = (key) => {
    setTourismFilters({
      ...tourismFilters,
      [key]: !tourismFilters[key],
    });
  };

  // Card filter & sort logic
  const filteredCards = sites
    .filter((site) => {
      // Search query check
      if (
        searchQuery &&
        !site.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Category check
      if (site.category === "CULTURAL" && !tourismFilters.cultural)
        return false;
      if (site.category === "ECO" && !tourismFilters.eco) return false;
      if (site.category === "DARK" && !tourismFilters.dark) return false;
      if (site.category === "BOUTIQUE" && !tourismFilters.boutique)
        return false;
      // Region check
      if (selectedRegion !== "All Regions" && site.region !== selectedRegion)
        return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Alphabetical") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "Recent") {
        return b.id.localeCompare(a.id);
      }
      // 'Recommended' retains default array order
      return 0;
    });

  const visibleCards = showMoreSites
    ? filteredCards
    : filteredCards.slice(0, 6);

  return (
    <div className="pb-24 bg-brand-cream font-sans animate-fade-in">
      {/* 1. Page Title */}
      <div className="pt-28 text-center space-y-4 mb-8">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-dark font-normal italic tracking-wide">
          Begin Your Exploration
        </h1>
      </div>

      {/* 2. Top Search Bar */}
      <div className="max-w-xl mx-auto px-6 mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-full border border-brand-gold/15 focus:border-brand-gold focus:outline-none bg-white text-xs font-light shadow-sm"
          />
          <Search
            size={16}
            className="text-brand-dark/40 absolute left-5 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* 3. Main Filter & Listings Grid Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-10 items-start mb-24">
        {/* Left Filter Sidebar (Warm Ivory Container) */}
        <div className="bg-white/90 border border-brand-gold/25 p-7 sm:p-8 space-y-8 rounded-2xl shadow-sm relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center space-x-2.5 text-brand-gold-dark font-bold text-xs uppercase tracking-[0.25em] pb-4 border-b border-brand-gold/15 relative z-10">
            <SlidersHorizontal size={15} className="text-brand-gold-dark shrink-0" />
            <span>FILTER DESTINATIONS</span>
          </div>

          {/* Tourism Type */}
          <div className="space-y-4 relative z-10">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark/70 block">
              Tourism Type
            </label>
            <div className="space-y-3 text-xs">
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={tourismFilters.cultural}
                  onChange={() => handleFilterToggle("cultural")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-[4px] checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[4px] checked:after:h-[8px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-brand-dark checked:after:rotate-45"
                />
                <span className="text-brand-dark/85 font-light tracking-wide transition-colors group-hover:text-brand-dark">
                  Cultural Tourism
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={tourismFilters.eco}
                  onChange={() => handleFilterToggle("eco")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-[4px] checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[4px] checked:after:h-[8px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-brand-dark checked:after:rotate-45"
                />
                <span className="text-brand-dark/85 font-light tracking-wide transition-colors group-hover:text-brand-dark">
                  Eco Tourism
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={tourismFilters.dark}
                  onChange={() => handleFilterToggle("dark")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-[4px] checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[4px] checked:after:h-[8px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-brand-dark checked:after:rotate-45"
                />
                <span className="text-brand-dark/85 font-light tracking-wide transition-colors group-hover:text-brand-dark">
                  Dark Tourism
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={tourismFilters.boutique}
                  onChange={() => handleFilterToggle("boutique")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-[4px] checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[4px] checked:after:h-[8px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-brand-dark checked:after:rotate-45"
                />
                <span className="text-brand-dark/85 font-light tracking-wide transition-colors group-hover:text-brand-dark">
                  Boutique Stays
                </span>
              </label>
            </div>
          </div>

          {/* Regions Dropdown */}
          <div className="space-y-3 relative z-10">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark/70 block">
              Regions
            </label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white text-brand-dark border border-brand-gold/25 py-3 pl-4 pr-10 rounded-xl text-xs font-light focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 hover:border-brand-gold/40 transition-colors appearance-none cursor-pointer"
              >
                <option>All Regions</option>
                <option>Siem Reap</option>
                <option>Sihanoukville</option>
                <option>Northern Highlands</option>
                <option>Kampot</option>
                <option>Phnom Penh</option>
                <option>Western Highlands</option>
              </select>
              <ChevronDown
                size={14}
                className="text-brand-dark/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-4 relative z-10">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark/70 block">
              Sort By
            </label>
            <div className="space-y-3 text-xs font-light text-brand-dark/85">
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "Recommended"}
                  onChange={() => setSortBy("Recommended")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-full checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[4px] checked:after:top-[4px] checked:after:w-[6px] checked:after:h-[6px] checked:after:bg-brand-dark checked:after:rounded-full"
                />
                <span className="transition-colors group-hover:text-brand-dark">
                  Most Recommended
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "Alphabetical"}
                  onChange={() => setSortBy("Alphabetical")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-full checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[4px] checked:after:top-[4px] checked:after:w-[6px] checked:after:h-[6px] checked:after:bg-brand-dark checked:after:rounded-full"
                />
                <span className="transition-colors group-hover:text-brand-dark">
                  Alphabetical
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "Recent"}
                  onChange={() => setSortBy("Recent")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-full checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[4px] checked:after:top-[4px] checked:after:w-[6px] checked:after:h-[6px] checked:after:bg-brand-dark checked:after:rounded-full"
                />
                <span className="transition-colors group-hover:text-brand-dark">
                  Recent Discovery
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Cards Grid (Warm Ivory Cards) */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {visibleCards.length > 0 ? (
            visibleCards.map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  const mapSection = document.getElementById(
                    "interactive-map-section"
                  );
                  if (mapSection)
                    mapSection.scrollIntoView({ behavior: "smooth" });
                  setActiveMapSite(card);
                }}
                className="bg-white border border-brand-gold/20 rounded-2xl overflow-hidden shadow-sm hover:border-brand-gold hover:shadow-xl hover:shadow-brand-gold/10 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between cursor-pointer group"
              >
                <div className="h-48 overflow-hidden relative shrink-0">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-md shadow border border-brand-gold">
                    {card.tag}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-center">
                  <div className="space-y-1.5">
                    <h3 className="font-cormorant text-xl font-bold tracking-wider text-brand-dark uppercase group-hover:text-brand-gold transition-colors text-center">
                      {card.name}
                    </h3>
                    <p className="text-xs font-light text-brand-dark/70 line-clamp-2 leading-relaxed text-center">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-brand-gold/15 flex justify-center items-center space-x-4 text-[10px] font-medium tracking-widest uppercase text-brand-dark/60 font-mono">
                    <div className="flex items-center justify-center space-x-1">
                      <MapPin size={11} className="text-brand-gold" />
                      <span>{card.region}</span>
                    </div>
                    <span className="text-brand-gold/30">•</span>
                    <span className="bg-brand-gold/10 px-2.5 py-0.5 rounded border border-brand-gold/20 text-brand-gold-dark font-sans">
                      {card.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-20 text-center bg-white border border-brand-gold/20 rounded-2xl p-8 space-y-2">
              <p className="font-cormorant text-xl text-brand-dark uppercase">
                No Destinations Found
              </p>
              <p className="text-xs font-light text-brand-dark/60">
                Try adjusting your search query or filters to discover more sites.
              </p>
            </div>
          )}
        </div>

        {/* Toggle Show More Button - Centered across entire section width */}
        {filteredCards.length > 6 && (
          <div className="col-span-1 lg:col-span-4 flex justify-center pt-8">
            <button
              onClick={() => setShowMoreSites(!showMoreSites)}
              className="flex items-center space-x-2 border border-brand-gold/40 text-brand-gold-dark hover:text-brand-dark hover:bg-brand-gold px-9 py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full cursor-pointer bg-white shadow-md shadow-brand-gold/10"
            >
              <span>
                {showMoreSites ? "Show Less" : "Show More Destinations"}
              </span>
              {showMoreSites ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
          </div>
        )}
      </section>

      {/* 4. Locate Your Next Journey (Interactive Map Section) */}
      <section
        id="interactive-map-section"
        className="py-16 max-w-7xl mx-auto px-6 md:px-12 space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-brand-gold-dark text-xs tracking-[0.3em] uppercase block font-semibold">
            — INTERACTIVE EXPLORATION —
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide uppercase">
            Locate Your Next Journey
          </h2>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-sans text-xs sm:text-sm text-brand-dark/75 max-w-md mx-auto leading-relaxed font-light">
            Interactive geographical survey of Cambodia's premier heritage,
            ecological, and coastal landmarks.
          </p>
        </div>

        {/* Dark Glassmorphic Map Container */}
        <div className="bg-[#18130D] rounded-2xl border border-brand-gold/40 overflow-hidden shadow-2xl relative min-h-[580px] flex flex-col lg:flex-row backdrop-blur-xl">
          {/* Map Left Overlay Info Pane */}
          <div className="lg:w-[30%] p-6 md:p-8 bg-[#18130D] border-b lg:border-b-0 lg:border-r border-brand-gold/20 flex flex-col justify-between z-10 space-y-6 shrink-0 relative">
            {/* Ambient Radial Glow */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 animate-fade-in relative z-10 text-center flex flex-col items-center" key={activeMapSite.id}>
              <div className="flex flex-col items-center text-center">
                <span className="inline-block px-3 py-1 bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[9px] font-bold tracking-[0.25em] uppercase rounded-full">
                  {activeMapSite.tag}
                </span>
                <h3 className="font-cormorant text-2xl md:text-3xl text-white tracking-wide uppercase mt-3 text-center">
                  {activeMapSite.name}
                </h3>
                <div className="flex items-center justify-center space-x-1.5 text-xs text-brand-gold-light/80 tracking-wider uppercase font-mono mt-1">
                  <MapPin size={12} className="text-brand-gold" />
                  <span>{activeMapSite.region}</span>
                </div>
              </div>
              <p className="text-xs font-light text-brand-cream-dark/85 leading-relaxed text-center">
                {activeMapSite.description}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-brand-gold/15">
              <button
                onClick={() => {
                  if (setActiveTab) {
                    setActiveTab("destinations");
                  } else {
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }
                }}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3.5 text-xs font-bold tracking-[0.25em] uppercase rounded-full transition-all duration-300 shadow-lg shadow-brand-gold/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>VIEW FULL DETAILS</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Center Map Stage (Interactive Satellite Google Map) */}
          <div className="flex-grow bg-[#100D09] relative min-h-[420px] lg:min-h-auto overflow-hidden flex items-center justify-center border-t lg:border-t-0 lg:border-r border-brand-gold/20">
            {/* Interactive Map Iframe */}
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                activeMapSite.id === "angkor"
                  ? "Angkor Wat, Siem Reap, Cambodia"
                  : activeMapSite.id === "koh-rong"
                  ? "Koh Rong Sanloem, Cambodia"
                  : activeMapSite.id === "preah-vihear"
                  ? "Preah Vihear Temple, Cambodia"
                  : activeMapSite.id === "bayon"
                  ? "Bayon Temple, Siem Reap, Cambodia"
                  : activeMapSite.id === "tonle-sap"
                  ? "Tonle Sap, Siem Reap, Cambodia"
                  : activeMapSite.id === "bokor"
                  ? "Bokor Hill Station, Kampot, Cambodia"
                  : activeMapSite.id === "tuol-sleng"
                  ? "Tuol Sleng Genocide Museum, Phnom Penh, Cambodia"
                  : activeMapSite.id === "cardamoms"
                  ? "Cardamom Mountains, Koh Kong, Cambodia"
                  : "Royal Palace, Phnom Penh, Cambodia"
              )}&t=h&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title={`${activeMapSite.name} Location`}
              className="absolute inset-0 w-full h-full contrast-[105%] transition-all duration-300 z-0"
            />
          </div>

          {/* Right Panel: Explore Markers Selector */}
          <div className="lg:w-[26%] p-6 bg-[#18130D] border-t lg:border-t-0 lg:border-l border-brand-gold/20 flex flex-col space-y-6 z-10 shrink-0">
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-brand-gold uppercase border-b border-brand-gold/15 pb-2.5 block font-sans text-center">
                EXPLORE MARKERS
              </span>

              {/* Map search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter map pins..."
                  value={mapSearchQuery}
                  onChange={(e) => setMapSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-dark/90 border border-brand-gold/30 text-xs font-light text-white placeholder-brand-cream-dark/35 focus:outline-none focus:border-brand-gold rounded-xl transition-colors"
                />
                <Search
                  size={14}
                  className="text-brand-gold/60 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* List of markers */}
            <div className="flex-grow overflow-y-auto space-y-2 max-h-[300px] lg:max-h-none pr-1 font-sans">
              {filteredMapSites.map((site) => {
                const isActive = activeMapSite.id === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => setActiveMapSite(site)}
                    className={`w-full text-left px-4 py-3 transition-all duration-300 text-xs tracking-wider uppercase flex items-center space-x-3 rounded-xl border font-sans cursor-pointer ${
                      isActive
                        ? "bg-brand-gold text-brand-dark font-bold border-brand-gold shadow-lg shadow-brand-gold/20 translate-x-1"
                        : "text-brand-cream-dark/80 hover:bg-brand-gold/10 hover:text-white border-brand-gold/10"
                    }`}
                  >
                    <MapPin
                      size={14}
                      fill={isActive ? "currentColor" : "none"}
                      className={isActive ? "text-brand-dark" : "text-brand-gold"}
                    />
                    <span className="truncate">{site.name}</span>
                  </button>
                );
              })}
              {filteredMapSites.length === 0 && (
                <div className="text-[11px] text-brand-cream-dark/40 italic py-6 text-center">
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
