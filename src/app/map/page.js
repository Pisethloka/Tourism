"use client";

/**
 * src/app/map/page.jsx - Next.js App Router Interactive Kingdom Explorer & Regional Filter Page
 * Features an interactive Cambodian map canvas, custom region dropdown filter,
 * search query filtering, and detailed destination cards with Google Maps links.
 */

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Check,
  Clock,
} from "lucide-react";

// Image asset paths (public)
const heroAngkor = "/assets/hero_angkor.png";
const bayonTemplePhoto = "/assets/bayon_temple_photo.jpg";
const kohRongSanloemPhoto = "/assets/koh_rong_sanloem_photo.jpg";
const preahVihearPhoto = "/assets/preah_vihear_photo.jpg";
const bokorHillPhoto = "/assets/bokor_hill_photo.jpg";
const tuolSlengPhoto = "/assets/tuol_sleng_photo.jpg";
const cardamomMountainsPhoto = "/assets/cardamom_mountains_photo.jpg";
const tonleSap = "/assets/tonle_sap.png";
const phnomPenhPalace = "/assets/phnom_penh_palace.png";

const SITES = [
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
    tag: "HERITAGE",
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
    name: "Tuol Sleng\n(S-21)",
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
    name: "Royal Palace",
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

const REGION_OPTIONS = [
  "All Regions",
  "Siem Reap",
  "Sihanoukville",
  "Northern Highlands",
  "Kampot",
  "Phnom Penh",
  "Western Highlands",
];

const CustomRegionDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-40" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white text-brand-dark border ${
          isOpen
            ? "border-brand-gold shadow-md ring-1 ring-brand-gold/30"
            : "border-brand-gold/30 hover:border-brand-gold/60 shadow-sm"
        } py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold/40`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="p-1 bg-brand-gold/15 rounded-md text-brand-gold-dark shrink-0">
            <MapPin size={15} />
          </div>
          <span className="truncate font-sans">{value}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-brand-dark/70 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-brand-gold-dark" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-brand-gold/30 rounded-xl shadow-2xl p-1.5 space-y-0.5 z-50 animate-fade-in max-h-60 overflow-y-auto">
          {REGION_OPTIONS.map((region) => {
            const isSelected = value === region;
            return (
              <button
                type="button"
                key={region}
                onClick={() => {
                  onChange(region);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors duration-150 cursor-pointer text-left font-sans ${
                  isSelected
                    ? "bg-brand-gold text-brand-dark font-bold shadow-sm"
                    : "text-brand-dark/80 hover:bg-brand-gold/15 hover:text-brand-dark font-normal"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-brand-dark" : "bg-brand-gold/40"
                    }`}
                  />
                  <span>{region}</span>
                </div>
                {isSelected && (
                  <Check size={14} className="text-brand-dark stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function MapPage() {
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

  const [activeMapSite, setActiveMapSite] = useState(SITES[3]);
  const [mapSearchQuery, setMapSearchQuery] = useState("");

  const filteredMapSites = useMemo(
    () =>
      SITES.filter(
        (site) =>
          site.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) ||
          site.region.toLowerCase().includes(mapSearchQuery.toLowerCase()),
      ),
    [mapSearchQuery],
  );

  const handleFilterToggle = useCallback((key) => {
    setTourismFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const filteredCards = useMemo(() => {
    return SITES.filter((site) => {
      if (
        searchQuery &&
        !site.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (site.category === "CULTURAL" && !tourismFilters.cultural)
        return false;
      if (site.category === "ECO" && !tourismFilters.eco) return false;
      if (site.category === "DARK" && !tourismFilters.dark) return false;
      if (site.category === "BOUTIQUE" && !tourismFilters.boutique)
        return false;
      if (selectedRegion !== "All Regions" && site.region !== selectedRegion)
        return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "Alphabetical") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "Recent") {
        return b.id.localeCompare(a.id);
      }
      return 0;
    });
  }, [searchQuery, tourismFilters, selectedRegion, sortBy]);

  const visibleCards = useMemo(() => {
    return showMoreSites ? filteredCards : filteredCards.slice(0, 6);
  }, [showMoreSites, filteredCards]);

  return (
    <div className="pb-24 bg-brand-cream font-sans animate-fade-in">
      {/* 1. Page Title */}
      <div className="pt-28 text-center space-y-4 mb-10">
        <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-brand-dark font-normal tracking-wide uppercase">
          Begin Your Exploration
        </h1>
        <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
        <p className="font-sans text-base sm:text-lg md:text-xl text-stone-700 font-normal max-w-2xl mx-auto leading-relaxed">
          Search, filter, and navigate across Cambodia's most iconic provinces,
          sacred temples, and natural sanctuaries.
        </p>
      </div>

      {/* 2. Top Search Bar */}
      <div className="max-w-xl mx-auto px-6 mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-full border border-brand-gold/25 focus:border-brand-gold focus:outline-none bg-white text-sm font-normal text-brand-dark shadow-sm focus-visible:ring-2 focus-visible:ring-brand-gold"
          />
          <Search
            size={18}
            className="text-brand-dark/50 absolute left-5 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* 3. Main Filter & Listings Grid Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-10 items-start mb-24">
        {/* Left Filter Sidebar */}
        <div className="bg-white/90 border border-brand-gold/25 p-7 sm:p-8 space-y-8 rounded-2xl shadow-sm relative backdrop-blur-md z-20">
          <div className="flex items-center space-x-2.5 text-brand-gold-dark font-bold text-xs sm:text-sm uppercase tracking-[0.25em] pb-4 border-b border-brand-gold/15 relative z-10">
            <SlidersHorizontal
              size={16}
              className="text-brand-gold-dark shrink-0"
            />
            <span>FILTER DESTINATIONS</span>
          </div>

          {/* Tourism Type */}
          <div className="space-y-4 relative z-10">
            <label className="text-xs font-bold uppercase tracking-[0.15em] text-brand-dark/90 block">
              Tourism Type
            </label>
            <div className="space-y-3 text-xs sm:text-sm">
              <label className="flex items-center space-x-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={tourismFilters.cultural}
                  onChange={() => handleFilterToggle("cultural")}
                  className="appearance-none w-4 h-4 border border-brand-gold/40 rounded-[4px] checked:bg-brand-gold checked:border-brand-gold focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[4px] checked:after:h-[8px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-brand-dark checked:after:rotate-45"
                />
                <span className="text-brand-dark/95 font-normal tracking-wide transition-colors group-hover:text-brand-dark">
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
                <span className="text-brand-dark/95 font-normal tracking-wide transition-colors group-hover:text-brand-dark">
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
                <span className="text-brand-dark/95 font-normal tracking-wide transition-colors group-hover:text-brand-dark">
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
                <span className="text-brand-dark/95 font-normal tracking-wide transition-colors group-hover:text-brand-dark">
                  Boutique Stays
                </span>
              </label>
            </div>
          </div>

          {/* Regions Dropdown */}
          <div className="space-y-3 relative z-30">
            <label className="text-xs font-bold uppercase tracking-[0.15em] text-brand-dark/90 block">
              Regions
            </label>
            <CustomRegionDropdown
              value={selectedRegion}
              onChange={setSelectedRegion}
            />
          </div>

          {/* Sort By */}
          <div className="space-y-4 relative z-10">
            <label className="text-xs font-bold uppercase tracking-[0.15em] text-brand-dark/90 block">
              Sort By
            </label>
            <div className="space-y-3 text-xs sm:text-sm font-normal text-brand-dark/95">
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

        {/* Right Cards Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {visibleCards.length > 0 ? (
            visibleCards.map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  const mapSection = document.getElementById(
                    "interactive-map-section",
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
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-center">
                  <div className="space-y-1.5">
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-medium tracking-wider text-brand-dark uppercase group-hover:text-brand-gold transition-colors text-center whitespace-pre-line">
                      {card.name}
                    </h3>
                    <p className="text-sm sm:text-base font-normal text-stone-700 line-clamp-2 leading-relaxed text-center">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-3.5 border-t border-stone-200/80 flex justify-center items-center gap-3 text-xs tracking-[0.14em] uppercase font-sans">
                    <span className="inline-flex items-center space-x-1.5 text-stone-700 font-medium">
                      <MapPin size={13} className="text-[#C59E3F] shrink-0" />
                      <span>{card.region}</span>
                    </span>

                    <span className="w-1 h-1 rounded-full bg-[#C59E3F]/60" />

                    <span className="inline-flex items-center space-x-1.5 text-[#8C6B1F] font-semibold bg-[#FAF7F0] px-3 py-0.5 rounded-full border border-[#E8DFC8] text-[11px]">
                      <Clock size={11} className="text-[#8C6B1F] shrink-0" />
                      <span>{card.duration}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-20 text-center bg-white border border-brand-gold/20 rounded-2xl p-8 space-y-2">
              <p className="font-cormorant text-2xl text-brand-dark uppercase font-medium">
                No Destinations Found
              </p>
              <p className="text-sm text-stone-600">
                Try adjusting your search query or filters to discover more
                sites.
              </p>
            </div>
          )}
        </div>

        {filteredCards.length > 6 && (
          <div className="col-span-1 lg:col-span-4 flex justify-center pt-8">
            <button
              type="button"
              onClick={() => setShowMoreSites(!showMoreSites)}
              className="flex items-center space-x-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-9 py-3.5 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full cursor-pointer shadow-lg shadow-brand-gold/30 hover:shadow-brand-gold/50 hover:scale-105 active:scale-95 border border-brand-gold-dark/20"
            >
              <span>{showMoreSites ? "Show Less" : "Show More"}</span>
              {showMoreSites ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
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
          <span className="text-brand-gold-dark text-xs sm:text-sm tracking-[0.3em] uppercase block font-semibold">
            — INTERACTIVE EXPLORATION —
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark font-medium tracking-wide uppercase">
            Locate Your Next Journey
          </h2>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-sans text-base sm:text-lg md:text-xl text-stone-700 max-w-2xl mx-auto leading-relaxed font-normal">
            Interactive geographical survey of Cambodia's premier heritage,
            ecological, and coastal landmarks.
          </p>
        </div>

        {/* Dark Glassmorphic Map Container */}
        <div className="bg-[#18130D] rounded-2xl border border-brand-gold/40 overflow-hidden shadow-2xl relative min-h-[580px] flex flex-col lg:flex-row backdrop-blur-xl">
          {/* Map Left Overlay Info Pane */}
          <div className="lg:w-[30%] p-6 md:p-8 bg-[#18130D] border-b lg:border-b-0 lg:border-r border-brand-gold/20 flex flex-col justify-between z-10 space-y-6 shrink-0 relative">
            <div className="absolute top-0 left-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div
              className="space-y-4 animate-fade-in relative z-10 text-center flex flex-col items-center"
              key={activeMapSite.id}
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="font-cormorant text-2xl md:text-3xl text-white tracking-wide uppercase text-center">
                  {activeMapSite.name}
                </h3>
                <div className="flex items-center justify-center space-x-1.5 text-xs sm:text-sm text-brand-gold-light/90 tracking-[0.14em] uppercase font-sans mt-2 font-medium">
                  <MapPin size={13} className="text-brand-gold shrink-0" />
                  <span>{activeMapSite.region}</span>
                </div>
              </div>
              <p className="text-sm sm:text-base font-normal text-brand-cream-dark/95 leading-relaxed text-center">
                {activeMapSite.description}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-brand-gold/15">
              <Link
                href="/destinations"
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3.5 text-xs font-bold tracking-[0.25em] uppercase rounded-full transition-all duration-300 shadow-lg shadow-brand-gold/20 hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>VIEW FULL DETAILS</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Center Map Stage */}
          <div className="flex-grow bg-[#100D09] relative min-h-[420px] lg:min-h-auto overflow-hidden flex items-center justify-center border-t lg:border-t-0 lg:border-r border-brand-gold/20">
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
                                : "Royal Palace, Phnom Penh, Cambodia",
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
              <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase border-b border-brand-gold/15 pb-2.5 block font-sans text-center">
                EXPLORE MARKERS
              </span>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter map pins..."
                  value={mapSearchQuery}
                  onChange={(e) => setMapSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-brand-dark/90 border border-brand-gold/30 text-xs font-light text-white placeholder-brand-cream-dark/50 focus:outline-none focus:border-brand-gold rounded-xl transition-colors"
                />
                <Search
                  size={14}
                  className="text-brand-gold/60 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto space-y-2 max-h-[300px] lg:max-h-none pr-1 font-sans">
              {filteredMapSites.map((site) => {
                const isActive = activeMapSite.id === site.id;
                return (
                  <button
                    type="button"
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
                      className={
                        isActive ? "text-brand-dark" : "text-brand-gold"
                      }
                    />
                    <span className="truncate">{site.name}</span>
                  </button>
                );
              })}
              {filteredMapSites.length === 0 && (
                <div className="text-xs text-brand-cream-dark/40 italic py-6 text-center">
                  No matching markers
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
