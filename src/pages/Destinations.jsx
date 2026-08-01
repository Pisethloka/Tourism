import { useState, useEffect } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  Clock,
  Calendar,
  Info,
  Compass,
  Loader2,
  Database,
} from "lucide-react";
import { fetchDestinations } from "../services/api";
import { LiveWeatherWidget } from "../components/LiveWeatherWidget";

// Hero Banner Image & Destination Images
import heroAngkor from "../assets/hero_angkor.png";
import bayonTemplePhoto from "../assets/bayon_temple_photo.jpg";
import kohRongSanloemPhoto from "../assets/koh_rong_sanloem_photo.jpg";
import preahVihearPhoto from "../assets/preah_vihear_photo.jpg";
import bokorHillPhoto from "../assets/bokor_hill_photo.jpg";
import tuolSlengPhoto from "../assets/tuol_sleng_photo.jpg";
import cardamomMountainsPhoto from "../assets/cardamom_mountains_photo.jpg";

export const Destinations = ({ activeSection, setActiveTab }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedSections, setExpandedSections] = useState({
    cultural: false,
    dark: false,
    eco: false,
  });

  // Track currently expanded card ID for inline opening right where clicked
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Fetch data from Mock REST API on component mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchDestinations();
        if (isMounted) {
          setDestinations(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch destinations from API. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Hash Section Auto-Expand
  useEffect(() => {
    if (activeSection === "cultural-tourism") {
      setExpandedSections((prev) => ({ ...prev, cultural: true }));
    } else if (activeSection === "dark-tourism") {
      setExpandedSections((prev) => ({ ...prev, dark: true }));
    } else if (activeSection === "eco-tourism") {
      setExpandedSections((prev) => ({ ...prev, eco: true }));
    }
  }, [activeSection]);

  const toggleCard = (destId) => {
    if (expandedCardId === destId) {
      closeCard(destId);
    } else {
      setExpandedCardId(destId);
      setTimeout(() => {
        const el = document.getElementById(`card-${destId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
    }
  };

  const closeCard = (destId) => {
    setExpandedCardId(null);
    setTimeout(() => {
      const el = document.getElementById(`card-${destId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 30);
  };

  // Helper filters for destinations by category
  const culturalDests = destinations.filter(
    (d) => d.category === "Heritage" || d.category === "Cultural" || d.category === "Royalty"
  );
  const darkDests = destinations.filter(
    (d) => d.category === "History" || d.category === "Reflection" || d.category === "Memorial" || d.category === "Mystical"
  );
  const ecoDests = destinations.filter(
    (d) =>
      d.category === "Ecotravel" ||
      d.category === "Tonle Sap" ||
      d.category === "Sanctuary" ||
      d.category === "Marine Eco" ||
      d.category === "Wilderness" ||
      d.category === "Luxury" ||
      d.category === "Historic"
  );

  return (
    <div className="pb-20 bg-brand-cream font-sans animate-fade-in">
      {/* Hero Header Banner */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroAngkor}
            alt="Angkor Wat Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/50" />
        </div>
        <div className="relative z-10 text-center space-y-2 mt-12">
          <h1 className="font-serif text-3xl md:text-5xl text-white tracking-widest font-normal uppercase animate-fade-in">
            Explore Our Destinations
          </h1>
          <p className="font-handwritten text-brand-gold text-2xl tracking-wide">
            Discover the rich history, culture, and nature of Cambodia
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {/* Loading Spinner / Skeleton state */}
        {loading && (
          <div className="py-20 text-center space-y-4">
            <Loader2 size={36} className="animate-spin text-brand-gold mx-auto" />
            <p className="font-serif text-lg text-brand-dark tracking-wide">
              Loading Destinations...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-12 bg-red-900/10 border border-red-800/30 rounded-xl text-center space-y-3 p-6">
            <p className="text-red-800 font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-brand-gold text-brand-dark text-xs font-bold uppercase rounded"
            >
              Retry API Request
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* 1. Cultural & Heritage */}
            <section id="cultural-tourism" className="space-y-8">
              <h2 className="font-serif text-s font-bold tracking-[0.25em] text-brand-gold uppercase border-b border-brand-gold/15 pb-2">
                CULTURAL & HERITAGE
              </h2>

              {/* Initial Cultural Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {culturalDests.slice(0, 2).map((item) => (
                  <DestinationCard
                    key={item.id}
                    item={item}
                    isExpanded={expandedCardId === item.id}
                    onToggle={() => toggleCard(item.id)}
                    onClose={() => closeCard(item.id)}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </div>

              {/* Expanded Cultural Cards */}
              {expandedSections.cultural && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {culturalDests.slice(2).map((item) => (
                    <DestinationCard
                      key={item.id}
                      item={item}
                      isExpanded={expandedCardId === item.id}
                      onToggle={() => toggleCard(item.id)}
                      onClose={() => closeCard(item.id)}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                </div>
              )}

              {/* Toggle Button */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      cultural: !prev.cultural,
                    }))
                  }
                  className="flex items-center space-x-2 border border-brand-gold/30 text-brand-gold-dark px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-md cursor-pointer hover:bg-brand-gold hover:text-brand-dark hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-gold/15 hover:border-brand-gold"
                >
                  <span>
                    {expandedSections.cultural
                      ? "Show Less"
                      : "Show More Destinations"}
                  </span>
                  {expandedSections.cultural ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </div>
            </section>

            {/* 2. Historical Reflection */}
            <section id="dark-tourism" className="space-y-8">
              <h2 className="font-serif text-xs font-bold tracking-[0.25em] text-red-800 uppercase border-b border-red-800/15 pb-2">
                HISTORICAL REFLECTION
              </h2>

              {/* Initial Dark Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {darkDests.slice(0, 2).map((item) => (
                  <DestinationCard
                    key={item.id}
                    item={item}
                    isExpanded={expandedCardId === item.id}
                    onToggle={() => toggleCard(item.id)}
                    onClose={() => closeCard(item.id)}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </div>

              {/* Expanded Dark Cards */}
              {expandedSections.dark && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {darkDests.slice(2).map((item) => (
                    <DestinationCard
                      key={item.id}
                      item={item}
                      isExpanded={expandedCardId === item.id}
                      onToggle={() => toggleCard(item.id)}
                      onClose={() => closeCard(item.id)}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                </div>
              )}

              {/* Toggle Button */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      dark: !prev.dark,
                    }))
                  }
                  className="flex items-center space-x-2 border border-red-800/30 text-red-800 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-md cursor-pointer hover:bg-red-800 hover:text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-800/15 hover:border-red-800"
                >
                  <span>
                    {expandedSections.dark
                      ? "Show Less"
                      : "Show More Destinations"}
                  </span>
                  {expandedSections.dark ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </div>
            </section>

            {/* 3. Natural Wonders */}
            <section id="eco-tourism" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-brand-gold/15 pb-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-brand-gold-dark uppercase tracking-widest">
                    Natural Wonders
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-brand-dark tracking-wide">
                    Ecotourism Escapes
                  </h2>
                </div>
                <span className="bg-brand-cream-dark/60 border border-brand-gold/20 text-brand-gold-dark text-[9px] font-bold tracking-widest uppercase px-3 py-1 self-start sm:self-auto">
                  GREEN TRAVEL
                </span>
              </div>

              {/* Main Eco Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ecoDests.slice(0, 2).map((item) => (
                  <DestinationCard
                    key={item.id}
                    item={item}
                    isExpanded={expandedCardId === item.id}
                    onToggle={() => toggleCard(item.id)}
                    onClose={() => closeCard(item.id)}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </div>

              {/* Expanded Eco Cards */}
              {expandedSections.eco && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {ecoDests.slice(2).map((item) => (
                    <DestinationCard
                      key={item.id}
                      item={item}
                      isExpanded={expandedCardId === item.id}
                      onToggle={() => toggleCard(item.id)}
                      onClose={() => closeCard(item.id)}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                </div>
              )}

              {/* Toggle Button */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={() =>
                    setExpandedSections((prev) => ({ ...prev, eco: !prev.eco }))
                  }
                  className="flex items-center space-x-2 border border-brand-gold/30 text-brand-gold-dark px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-md cursor-pointer hover:bg-brand-gold hover:text-brand-dark hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-gold/15 hover:border-brand-gold"
                >
                  <span>
                    {expandedSections.eco ? "Show Less" : "Show More Destinations"}
                  </span>
                  {expandedSections.eco ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </div>
            </section>

            {/* Live Weather & Currency Exchange Desk */}
            <section className="pt-8">
              <LiveWeatherWidget
                title="Cambodian Climate & Currency Guide"
                subtitle="Live satellite weather radar and USD to Khmer Riel (KHR) exchange calculator"
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

// Sub-component for individual Destination Card with Inline Expansion
const DestinationCard = ({ item, isExpanded, onToggle, onClose, setActiveTab }) => {
  return (
    <div
      id={`card-${item.id}`}
      className={`bg-white/50 border transition-all duration-500 rounded-xl overflow-hidden flex flex-col ${
        isExpanded
          ? "border-brand-gold ring-2 ring-brand-gold/50 shadow-xl col-span-1 md:col-span-2 my-2 bg-brand-cream/80"
          : "border-brand-gold/15 shadow-sm hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      {/* Card Header Image */}
      <div
        className={`overflow-hidden relative cursor-pointer group ${
          isExpanded ? "h-64 sm:h-80" : "h-56 sm:h-64"
        }`}
        onClick={onToggle}
      >
        <img
          src={
            item.id === "cardamom-mountains" || item.title?.toLowerCase().includes("cardamom")
              ? cardamomMountainsPhoto
              : item.id === "tuol-sleng" || item.title?.toLowerCase().includes("tuol sleng")
              ? tuolSlengPhoto
              : item.id === "bokor-hill" || item.title?.toLowerCase().includes("bokor")
              ? bokorHillPhoto
              : item.id === "preah-vihear" || item.title?.toLowerCase().includes("preah vihear")
              ? preahVihearPhoto
              : item.id === "koh-rong" || item.title?.toLowerCase().includes("koh rong")
              ? kohRongSanloemPhoto
              : item.id === "bayon-temple" || item.title?.toLowerCase().includes("bayon")
              ? bayonTemplePhoto
              : item.image
          }
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/25 to-transparent" />

        <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md shadow-sm">
          {item.category}
        </span>

        {/* Title overlay on image */}
        <div className="absolute bottom-4 left-5 right-5 text-white space-y-0.5">
          <div className="flex items-center space-x-1.5 text-xs text-brand-cream-dark/90 font-light">
            <MapPin size={12} className="text-brand-gold" />
            <span>{item.location}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-widest uppercase">
            {item.title}
          </h3>
        </div>

        {/* Close Button if Expanded */}
        {isExpanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose ? onClose() : onToggle();
            }}
            className="absolute top-4 right-4 bg-brand-dark/80 text-white hover:text-brand-gold p-2 rounded-full border border-brand-gold/30 shadow transition-all cursor-pointer z-10"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-8 space-y-5 flex-grow flex flex-col justify-between">
        {!isExpanded ? (
          // Collapsed Standard Card View
          <>
            <div className="space-y-2">
              <p className="font-handwritten text-brand-gold text-lg">
                {item.subtitle}
              </p>
              <p className="text-sm font-light text-brand-dark/75 leading-relaxed">
                {item.shortDescription}
              </p>
            </div>
            <button
              onClick={onToggle}
              className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer group"
            >
              <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                Learn More (Expand Details)
              </span>
              <ArrowRight
                size={12}
                className="transform transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>
          </>
        ) : (
          // Expanded Detailed Inline Card View Right Where Clicked!
          <div className="space-y-6 animate-fade-in text-brand-dark">
            <p className="font-handwritten text-brand-gold text-xl sm:text-2xl">
              {item.subtitle}
            </p>

            {/* Quick Details Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white/70 border border-brand-gold/25 rounded-lg text-xs shadow-sm">
              <div className="flex items-center space-x-2.5">
                <Calendar className="text-brand-gold shrink-0" size={16} />
                <div>
                  <span className="block text-[10px] text-brand-dark/50 font-bold uppercase">
                    Best Season
                  </span>
                  <span className="font-semibold text-brand-dark">
                    {item.bestTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="text-brand-gold shrink-0" size={16} />
                <div>
                  <span className="block text-[10px] text-brand-dark/50 font-bold uppercase">
                    Duration
                  </span>
                  <span className="font-semibold text-brand-dark">
                    {item.duration}
                  </span>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center space-x-2.5">
                <Compass className="text-brand-gold shrink-0" size={16} />
                <div>
                  <span className="block text-[10px] text-brand-dark/50 font-bold uppercase">
                    Location
                  </span>
                  <span className="font-semibold text-brand-dark">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Destination Overview */}
            <div className="space-y-2">
              <h4 className="font-serif text-xs font-bold tracking-widest text-brand-gold-dark uppercase border-b border-brand-gold/15 pb-1">
                DESTINATION OVERVIEW
              </h4>
              <p className="text-sm font-light text-brand-dark/85 leading-relaxed">
                {item.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h4 className="font-serif text-xs font-bold tracking-widest text-brand-gold-dark uppercase border-b border-brand-gold/15 pb-1">
                KEY HIGHLIGHTS & EXPERIENCES
              </h4>
              <ul className="space-y-2.5">
                {item.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 text-xs sm:text-sm font-light text-brand-dark/85"
                  >
                    <Compass
                      size={14}
                      className="text-brand-gold shrink-0 mt-0.5"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visitor Tips & Etiquette */}
            <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-lg space-y-1.5">
              <div className="flex items-center space-x-2 text-brand-gold-dark font-bold text-xs uppercase tracking-wider">
                <Info size={14} />
                <span>Visitor Tips & Etiquette</span>
              </div>
              <p className="text-xs font-light text-brand-dark/80 leading-relaxed">
                {item.practicalInfo}
              </p>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between gap-4 flex-wrap">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose ? onClose() : onToggle();
                }}
                className="px-5 py-2.5 border border-brand-gold/40 text-brand-dark hover:bg-brand-gold hover:text-brand-dark text-xs font-semibold tracking-wider uppercase rounded-md cursor-pointer transition-all flex items-center space-x-1.5"
              >
                <X size={14} />
                <span>Close Details</span>
              </button>
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab("plan-trip");
                }}
                className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs font-bold tracking-widest uppercase rounded-md cursor-pointer transition-all hover:scale-105 shadow flex items-center space-x-2"
              >
                <span>Plan Trip Here</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
