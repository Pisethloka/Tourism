"use client";

/**
 * src/app/destinations/page.jsx - Next.js App Router Destinations Page
 * Renders categorized destination cards (Cultural Heritage, Historical Reflection, Natural Wonders),
 * interactive modal expansion for deep destination guides, and seamless filtering hooks.
 */

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
  Suspense,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Check,
  Loader2,
} from "lucide-react";
import { fetchDestinations } from "../../services/api";

// Hero Banner Image
const heroAngkor = "/assets/hero_angkor.png";

function DestinationsContent() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("category");

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

  // Fetch data on component mount
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
      } catch {
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

  // Handle Hash/URL Category Section Auto-Expand
  useEffect(() => {
    if (!activeSection) return;
    const timer = setTimeout(() => {
      if (activeSection === "cultural-tourism") {
        setExpandedSections((prev) => ({ ...prev, cultural: true }));
      } else if (activeSection === "dark-tourism") {
        setExpandedSections((prev) => ({ ...prev, dark: true }));
      } else if (activeSection === "eco-tourism") {
        setExpandedSections((prev) => ({ ...prev, eco: true }));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const toggleCard = useCallback(
    (destId) => {
      if (expandedCardId === destId) {
        // 1. If user clicks the already open card -> close it
        setExpandedCardId(null);
        setTimeout(() => {
          const el = document.getElementById(`card-${destId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 30);
      } else {
        // 2. Open the new card
        setExpandedCardId(destId);
        // 3. Smoothly center the expanded card in the user's viewport
        setTimeout(() => {
          const el = document.getElementById(`card-${destId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 50);
      }
    },
    [expandedCardId],
  );

  const closeCard = useCallback((destId) => {
    setExpandedCardId(null);
    setTimeout(() => {
      const el = document.getElementById(`card-${destId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 30);
  }, []);

  const culturalDests = useMemo(
    () =>
      destinations.filter(
        (d) =>
          d.category === "Heritage" ||
          d.category === "Cultural" ||
          d.category === "Royalty",
      ),
    [destinations],
  );

  const darkDests = useMemo(
    () =>
      destinations.filter(
        (d) =>
          d.category === "History" ||
          d.category === "Reflection" ||
          d.category === "Memorial" ||
          d.category === "Mystical",
      ),
    [destinations],
  );

  const ecoDests = useMemo(
    () =>
      destinations.filter(
        (d) =>
          d.category === "Ecotravel" ||
          d.category === "Tonle Sap" ||
          d.category === "Sanctuary" ||
          d.category === "Marine Eco" ||
          d.category === "Wilderness" ||
          d.category === "Luxury" ||
          d.category === "Historic",
      ),
    [destinations],
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
        <div className="relative z-10 text-center space-y-3 mt-12">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-widest font-normal uppercase animate-fade-in">
            Explore Our Destinations
          </h1>
          <p className="font-sans font-medium text-amber-300 text-xl sm:text-2xl tracking-wide">
            Discover the rich history, culture, and nature of Cambodia
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 text-center space-y-4">
            <Loader2
              size={36}
              className="animate-spin text-brand-gold mx-auto"
            />
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
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-brand-gold text-brand-dark text-xs sm:text-sm font-bold uppercase rounded"
            >
              Retry API Request
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* 1. Cultural & Heritage */}
            <section id="cultural-tourism" className="space-y-6">
              <div className="border-b border-brand-gold/15 pb-2">
                <span className="text-xs font-bold text-brand-gold-dark uppercase tracking-widest block font-mono">
                  KHMER LEGACY & TEMPLES
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-dark tracking-wide uppercase">
                  CULTURAL & HERITAGE
                </h2>
              </div>

              {/* Initial Cultural Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {culturalDests.slice(0, 2).map((item) => (
                  <DestinationCard
                    key={item.id}
                    item={item}
                    isExpanded={expandedCardId === item.id}
                    onToggle={() => toggleCard(item.id)}
                    onClose={() => closeCard(item.id)}
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
                    />
                  ))}
                </div>
              )}

              {/* Toggle Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      cultural: !prev.cultural,
                    }))
                  }
                  className="flex items-center space-x-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-9 py-3.5 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full cursor-pointer shadow-lg shadow-brand-gold/30 hover:shadow-brand-gold/50 hover:scale-105 active:scale-95 border border-brand-gold-dark/20"
                >
                  <span>
                    {expandedSections.cultural ? "Show Less" : "Show More"}
                  </span>
                  {expandedSections.cultural ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </section>

            {/* 2. Historical Reflection */}
            <section id="dark-tourism" className="space-y-6">
              <div className="border-b border-red-800/15 pb-2">
                <span className="text-xs font-bold text-red-800 uppercase tracking-widest block font-mono">
                  MEMORIAL & REMEMBRANCE
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-dark tracking-wide uppercase">
                  HISTORICAL REFLECTION
                </h2>
              </div>

              {/* All Dark Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {darkDests.map((item) => (
                  <DestinationCard
                    key={item.id}
                    item={item}
                    isExpanded={expandedCardId === item.id}
                    onToggle={() => toggleCard(item.id)}
                    onClose={() => closeCard(item.id)}
                  />
                ))}
              </div>

              {/* Historical Context Quote Box */}
              <div className="bg-transparent text-brand-dark border-l-4 border-red-800/80 pl-6 sm:pl-8 py-4 my-6 relative">
                <div className="flex items-start space-x-4 relative z-10">
                  <span className="font-serif text-4xl sm:text-5xl text-brand-gold-dark leading-none select-none shrink-0 mt-1">
                    “
                  </span>
                  <div className="space-y-3 font-sans">
                    <p className="text-lg sm:text-base text-brand-dark/90 font-normal leading-relaxed italic">
                      Between 1975 and 1979, the totalitarian Khmer Rouge regime
                      led by Pol Pot forced millions from Cambodian cities into
                      rural agrarian labor camps, resulting in the tragic loss
                      of an estimated 1.7 to 2 million lives. Today, memorial
                      sites like Tuol Sleng (S-21) and Choeung Ek stand not for
                      despair, but as sacred educational archives honoring
                      memory, preserving historical truth, and celebrating the
                      resilient rebirth of Cambodia. ”
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Natural Wonders */}
            <section id="eco-tourism" className="space-y-6">
              <div className="border-b border-brand-gold/15 pb-2">
                <span className="text-xs font-bold text-brand-gold-dark uppercase tracking-widest block font-mono">
                  Natural Wonders
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-dark tracking-wide">
                  Ecotourism Escapes
                </h2>
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
                    />
                  ))}
                </div>
              )}

              {/* Toggle Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSections((prev) => ({ ...prev, eco: !prev.eco }))
                  }
                  className="flex items-center space-x-2.5 bg-emerald-700 hover:bg-emerald-600 text-white px-9 py-3.5 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full cursor-pointer shadow-lg shadow-emerald-800/30 hover:shadow-emerald-700/50 hover:scale-105 active:scale-95 border border-emerald-800/40"
                >
                  <span>
                    {expandedSections.eco ? "Show Less" : "Show More"}
                  </span>
                  {expandedSections.eco ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-brand-dark">
          <Loader2 size={36} className="animate-spin text-brand-gold mx-auto" />
          <p className="mt-4 font-serif text-lg">Loading Destinations...</p>
        </div>
      }
    >
      <DestinationsContent />
    </Suspense>
  );
}

// Sub-component for individual Destination Card with Inline Expansion
const DestinationCard = memo(({ item, isExpanded, onToggle, onClose }) => {
  return (
    <div
      id={`card-${item.id}`}
      className={`bg-white/85 border transition-all duration-500 rounded-xl overflow-hidden flex flex-col ${
        isExpanded
          ? "border-brand-gold ring-2 ring-brand-gold/50 shadow-2xl col-span-1 md:col-span-2 my-2 bg-brand-cream/90"
          : "border-brand-gold/45 shadow-md shadow-brand-gold/10 hover:border-brand-gold/80 hover:shadow-xl hover:shadow-brand-gold/20 hover:-translate-y-1"
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
          src={item.image || heroAngkor}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/25 to-transparent" />

        <span
          className={`absolute top-4 left-4 text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full outline-none ring-0 border-0 border-none shadow-none ${
            item.category?.toUpperCase().includes("DARK") ||
            item.category?.toUpperCase().includes("HISTORIC") ||
            item.category?.toUpperCase().includes("MEMORIAL") ||
            item.category?.toUpperCase().includes("REFLECTION")
              ? "bg-[#8B1E1E] text-white"
              : "bg-brand-gold text-brand-dark"
          }`}
        >
          {item.category}
        </span>

        {/* Title overlay on image */}
        <div className="absolute bottom-4 left-5 right-5 text-white space-y-0.5">
          <div className="flex items-center space-x-1.5 text-xs sm:text-sm text-brand-cream-dark/95 font-medium">
            <MapPin size={14} className="text-brand-gold" />
            <span>{item.location}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-3xl font-normal tracking-wider uppercase whitespace-pre-line">
            {item.title}
          </h3>
        </div>

        {/* Close Button if Expanded */}
        {isExpanded && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose ? onClose() : onToggle();
            }}
            className="absolute top-4 right-4 bg-brand-dark/80 text-white hover:text-brand-gold p-2.5 rounded-full border border-brand-gold/30 shadow transition-all cursor-pointer z-10 focus-visible:ring-2 focus-visible:ring-brand-gold"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-8 space-y-5 flex-grow flex flex-col justify-between font-sans">
        {!isExpanded ? (
          // Collapsed Standard Card View
          <div className="space-y-2 cursor-pointer" onClick={onToggle}>
            <p className="font-sans font-medium text-[#8C6B1F] text-base sm:text-lg tracking-wide leading-snug">
              {item.subtitle}
            </p>
            <p className="text-sm sm:text-base font-normal text-stone-700 leading-relaxed">
              {item.shortDescription}
            </p>
          </div>
        ) : (
          // Expanded Detailed Inline Card View Right Where Clicked!
          <div className="space-y-6 animate-fade-in text-stone-900 font-sans">
            <p className="font-sans font-medium text-[#8C6B1F] text-lg sm:text-xl tracking-wide leading-snug">
              {item.subtitle}
            </p>

            {/* Quick Details Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#FAF7F0] border border-[#E8DFC8] rounded-xl text-xs sm:text-sm shadow-xs font-sans">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#F3ECE0] rounded-lg text-[#8C6B1F] shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="block text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                    Best Season
                  </span>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                    {item.bestTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#F3ECE0] rounded-lg text-[#8C6B1F] shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="block text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                    Duration
                  </span>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                    {item.duration}
                  </span>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center space-x-3">
                <div className="p-2 bg-[#F3ECE0] rounded-lg text-[#8C6B1F] shrink-0">
                  <Compass size={18} />
                </div>
                <div>
                  <span className="block text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                    Location
                  </span>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Destination Overview */}
            <div className="space-y-2.5 font-sans">
              <h4 className="text-xs sm:text-sm font-semibold tracking-wider text-[#241C14] uppercase border-b border-[#E8DFC8] pb-1.5 flex items-center gap-2">
                <span>Destination Overview</span>
              </h4>
              <p className="text-sm sm:text-base font-normal text-stone-800 leading-relaxed">
                {item.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3 font-sans">
              <h4 className="text-xs sm:text-sm font-semibold tracking-wider text-[#241C14] uppercase border-b border-[#E8DFC8] pb-1.5 flex items-center gap-2">
                <span>Key Highlights & Experiences</span>
              </h4>
              <ul className="space-y-2.5">
                {item.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 text-sm sm:text-base font-normal text-stone-800 leading-relaxed"
                  >
                    <span className="p-1 bg-[#F3ECE0] rounded-full text-[#8C6B1F] shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visitor Tips & Advice */}
            <div className="bg-[#FAF7F0] border border-[#E8DFC8] p-4 sm:p-5 rounded-xl space-y-2 font-sans">
              <div className="flex items-center space-x-2 text-[#241C14] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                <Info size={18} className="text-[#8C6B1F] shrink-0" />
                <span>Visitor Tips & Advice</span>
              </div>
              <p className="text-xs sm:text-sm font-normal text-stone-800 leading-relaxed">
                {item.practicalInfo}
              </p>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-end gap-4 flex-wrap font-sans">
              <Link
                href="/plan-trip"
                className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-xs sm:text-sm font-bold tracking-widest uppercase rounded-lg cursor-pointer transition-all hover:scale-105 shadow flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <span>Plan Trip Here</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

DestinationCard.displayName = "DestinationCard";
