import { useState, useEffect } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  Clock,
  Calendar,
  Sparkles,
  Info,
  Compass,
  Loader2,
  Database,
} from "lucide-react";
import { fetchDestinations } from "../services/api";

// Hero Banner Image
import heroAngkor from "../assets/hero_angkor.png";

export const Destinations = ({ activeSection, setActiveTab }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedSections, setExpandedSections] = useState({
    cultural: false,
    dark: false,
    eco: false,
  });

  const [selectedDestination, setSelectedDestination] = useState(null);

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

  const openDetails = (destId) => {
    const found = destinations.find((item) => item.id === destId);
    if (found) {
      setSelectedDestination(found);
    }
  };

  // Helper filters for destinations by category
  const culturalDests = destinations.filter(
    (d) => d.category === "Heritage" || d.category === "Cultural"
  );
  const darkDests = destinations.filter(
    (d) => d.category === "History" || d.category === "Reflection"
  );
  const ecoDests = destinations.filter(
    (d) =>
      d.category === "Ecotravel" ||
      d.category === "Tonle Sap" ||
      d.category === "Sanctuary" ||
      d.category === "Marine Eco"
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

          {/* API Badge indicator */}
          <div className="pt-2 flex justify-center">
            <span className="inline-flex items-center space-x-1.5 bg-brand-dark/70 border border-brand-gold/30 text-brand-gold text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full shadow">
              <Database size={12} className="text-green-400" />
              <span>Rest API Mode: /api/destinations.json</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {/* Loading Spinner / Skeleton state */}
        {loading && (
          <div className="py-20 text-center space-y-4">
            <Loader2 size={36} className="animate-spin text-brand-gold mx-auto" />
            <p className="font-serif text-lg text-brand-dark tracking-wide">
              Fetching Destination Records via REST API...
            </p>
            <p className="text-xs text-brand-dark/50 font-mono">GET /api/destinations.json</p>
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

              {/* First 2 Cultural Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {culturalDests.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col"
                  >
                    <div
                      className="h-64 sm:h-72 overflow-hidden relative cursor-pointer"
                      onClick={() => openDetails(item.id)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                          {item.title}
                        </h3>
                        <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                          {item.shortDescription}
                        </p>
                      </div>
                      <button
                        onClick={() => openDetails(item.id)}
                        className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer"
                      >
                        <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                          Learn More
                        </span>
                        <ArrowRight
                          size={12}
                          className="transform transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded Cultural Cards */}
              {expandedSections.cultural && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {culturalDests.slice(2).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col"
                    >
                      <div
                        className="h-64 sm:h-72 overflow-hidden relative cursor-pointer"
                        onClick={() => openDetails(item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                            {item.title}
                          </h3>
                          <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                            {item.shortDescription}
                          </p>
                        </div>
                        <button
                          onClick={() => openDetails(item.id)}
                          className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer"
                        >
                          <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                            Learn More
                          </span>
                          <ArrowRight
                            size={12}
                            className="transform transition-transform duration-300 group-hover:translate-x-1.5"
                          />
                        </button>
                      </div>
                    </div>
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

              {/* First 2 Dark Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {darkDests.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col"
                  >
                    <div
                      className="h-52 sm:h-56 overflow-hidden relative cursor-pointer"
                      onClick={() => openDetails(item.id)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                          {item.title}
                        </h3>
                        <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                          {item.shortDescription}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-brand-dark/50">
                        <span>{item.location.split("(")[0]}</span>
                        <button
                          onClick={() => openDetails(item.id)}
                          className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase flex items-center space-x-1.5 cursor-pointer"
                        >
                          <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                            Learn More
                          </span>
                          <ArrowRight
                            size={12}
                            className="transform transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded Dark Cards */}
              {expandedSections.dark && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {darkDests.slice(2).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col"
                    >
                      <div
                        className="h-52 sm:h-56 overflow-hidden relative cursor-pointer"
                        onClick={() => openDetails(item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                            {item.title}
                          </h3>
                          <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                            {item.shortDescription}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-brand-dark/50">
                          <span>{item.location.split("(")[0]}</span>
                          <button
                            onClick={() => openDetails(item.id)}
                            className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase flex items-center space-x-1.5 cursor-pointer"
                          >
                            <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                              Learn More
                            </span>
                            <ArrowRight
                              size={12}
                              className="transform transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
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

              {/* Main 2 Eco Cards */}
              {ecoDests.length >= 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Cardamom Mountains */}
                  <div className="lg:col-span-8 bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col sm:flex-row h-auto sm:h-72">
                    <div
                      className="w-full sm:w-1/2 overflow-hidden relative h-56 sm:h-full shrink-0 cursor-pointer"
                      onClick={() => openDetails(ecoDests[0].id)}
                    >
                      <img
                        src={ecoDests[0].image}
                        alt={ecoDests[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 bg-brand-forest text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                        {ecoDests[0].category}
                      </span>
                    </div>
                    <div className="p-8 flex flex-col justify-between flex-grow">
                      <div className="space-y-2.5">
                        <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                          {ecoDests[0].title}
                        </h3>
                        <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                          {ecoDests[0].shortDescription}
                        </p>
                      </div>
                      <button
                        onClick={() => openDetails(ecoDests[0].id)}
                        className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer"
                      >
                        <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                          Learn More
                        </span>
                        <ArrowRight
                          size={12}
                          className="transform transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Tonle Sap */}
                  <div className="lg:col-span-4 bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col h-auto lg:h-72 justify-between">
                    <div
                      className="relative h-32 overflow-hidden shrink-0 cursor-pointer"
                      onClick={() => openDetails(ecoDests[1].id)}
                    >
                      <img
                        src={ecoDests[1].image}
                        alt={ecoDests[1].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-3 left-3 bg-purple-900 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                        {ecoDests[1].category}
                      </span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-base font-normal tracking-widest text-brand-dark uppercase">
                          {ecoDests[1].title}
                        </h3>
                        <p className="text-xs font-light text-brand-dark/70 leading-relaxed">
                          {ecoDests[1].shortDescription}
                        </p>
                      </div>
                      <button
                        onClick={() => openDetails(ecoDests[1].id)}
                        className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-2 border-t border-brand-gold/10 cursor-pointer"
                      >
                        <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                          Explore Waterways
                        </span>
                        <ArrowRight
                          size={12}
                          className="transform transition-transform duration-300 group-hover:translate-x-1.5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded Eco Cards */}
              {expandedSections.eco && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
                  {ecoDests.slice(2).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col"
                    >
                      <div
                        className="h-64 sm:h-72 overflow-hidden relative cursor-pointer"
                        onClick={() => openDetails(item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute top-4 left-4 bg-brand-forest text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                        <div className="space-y-2.5">
                          <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                            {item.title}
                          </h3>
                          <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                            {item.shortDescription}
                          </p>
                        </div>
                        <button
                          onClick={() => openDetails(item.id)}
                          className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer"
                        >
                          <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
                            Learn More
                          </span>
                          <ArrowRight
                            size={12}
                            className="transform transition-transform duration-300 group-hover:translate-x-1.5"
                          />
                        </button>
                      </div>
                    </div>
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
          </>
        )}
      </div>

      {/* Detailed Destination Info Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-brand-dark/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-brand-cream border border-brand-gold/30 shadow-2xl rounded-2xl max-w-3xl w-full overflow-hidden relative my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header / Banner */}
            <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 bg-brand-dark/60 text-white hover:text-brand-gold hover:bg-brand-dark p-2 rounded-full transition-all cursor-pointer border border-brand-gold/30 shadow-md"
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              {/* Title overlay on banner */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-brand-gold text-brand-dark font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded">
                    {selectedDestination.category}
                  </span>
                  <span className="text-brand-cream-dark/90 text-xs flex items-center gap-1 font-light">
                    <MapPin size={12} className="text-brand-gold" />
                    {selectedDestination.location}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal uppercase tracking-wider">
                  {selectedDestination.title}
                </h2>
                <p className="font-handwritten text-brand-gold text-base sm:text-lg">
                  {selectedDestination.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow text-brand-dark">
              {/* Quick Details Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white/60 border border-brand-gold/20 rounded-lg text-xs">
                <div className="flex items-center space-x-2.5">
                  <Calendar className="text-brand-gold shrink-0" size={16} />
                  <div>
                    <span className="block text-[10px] text-brand-dark/50 font-bold uppercase">
                      Best Season
                    </span>
                    <span className="font-semibold text-brand-dark">
                      {selectedDestination.bestTime}
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
                      {selectedDestination.duration}
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
                      {selectedDestination.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h3 className="font-serif text-xs font-bold tracking-widest text-brand-gold-dark uppercase border-b border-brand-gold/15 pb-1">
                  DESTINATION OVERVIEW
                </h3>
                <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
                  {selectedDestination.overview}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="font-serif text-xs font-bold tracking-widest text-brand-gold-dark uppercase border-b border-brand-gold/15 pb-1">
                  KEY HIGHLIGHTS & EXPERIENCES
                </h3>
                <ul className="space-y-2.5">
                  {selectedDestination.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-3 text-xs sm:text-sm font-light text-brand-dark/80"
                    >
                      <Sparkles
                        size={14}
                        className="text-brand-gold shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Info & Etiquette */}
              <div className="bg-brand-gold/10 border border-brand-gold/30 p-4 rounded-lg space-y-1.5">
                <div className="flex items-center space-x-2 text-brand-gold-dark font-bold text-xs uppercase tracking-wider">
                  <Info size={14} />
                  <span>Visitor Tips & Etiquette</span>
                </div>
                <p className="text-xs font-light text-brand-dark/75 leading-relaxed">
                  {selectedDestination.practicalInfo}
                </p>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 sm:p-6 bg-brand-cream-dark/30 border-t border-brand-gold/20 flex items-center justify-between gap-4 shrink-0">
              <button
                onClick={() => setSelectedDestination(null)}
                className="px-5 py-2.5 border border-brand-dark/20 text-brand-dark hover:bg-brand-dark/5 text-xs font-semibold tracking-wider uppercase rounded-md cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedDestination(null);
                  if (setActiveTab) {
                    setActiveTab("plan-trip");
                  }
                }}
                className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs font-bold tracking-widest uppercase rounded-md cursor-pointer transition-all hover:scale-105 shadow-md flex items-center space-x-2"
              >
                <span>Plan Trip Here</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
