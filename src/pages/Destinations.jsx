import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import heroAngkor from "../assets/hero_angkor.png";
import phnomPenhPalace from "../assets/phnom_penh_palace.png";
import tuolSleng from "../assets/tuol_sleng.png";
import killingFields from "../assets/killing_fields.png";
import bokorHill from "../assets/bokor_hill.png";
import cardamomMountains from "../assets/cardamom_mountains.png";
import tonleSap from "../assets/tonle_sap.png";
import preahVihear from "../assets/preah_vihear.png";
import yeakLaom from "../assets/yeak_laom.png";
import kohRongBeach from "../assets/koh_rong_beach.png";
import banteaySrei from "../assets/banteay_srei.png";
import watThmey from "../assets/wat_thmey.png";

export const Destinations = ({ activeSection }) => {
  const [expandedSections, setExpandedSections] = useState({
    cultural: false,
    dark: false,
    eco: false,
  });

  useEffect(() => {
    if (activeSection === "cultural-tourism") {
      setTimeout(() => {
        setExpandedSections((prev) => ({ ...prev, cultural: true }));
      }, 0);
    } else if (activeSection === "dark-tourism") {
      setTimeout(() => {
        setExpandedSections((prev) => ({ ...prev, dark: true }));
      }, 0);
    } else if (activeSection === "eco-tourism") {
      setTimeout(() => {
        setExpandedSections((prev) => ({ ...prev, eco: true }));
      }, 0);
    }
  }, [activeSection]);
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
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {/* 1. Cultural & Heritage */}
        <section id="cultural-tourism" className="space-y-8">
          <h2 className="font-serif text-s font-bold tracking-[0.25em] text-brand-gold uppercase border-b border-brand-gold/15 pb-2">
            CULTURAL & HERITAGE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Angkor Wat Card */}
            <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
              <div className="h-64 sm:h-72 overflow-hidden relative">
                <img
                  src={heroAngkor}
                  alt="Angkor Wat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                  HERITAGE
                </span>
              </div>
              <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                    Angkor Wat
                  </h3>
                  <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                    The soul of the Khmer Empire, a vast stone symphony and the
                    largest religious monument in the world.
                  </p>
                </div>
                <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer">
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

            {/* Royal Palace Card */}
            <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
              <div className="h-64 sm:h-72 overflow-hidden relative">
                <img
                  src={phnomPenhPalace}
                  alt="Royal Palace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                  CULTURAL
                </span>
              </div>
              <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                    Royal Palace
                  </h3>
                  <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                    A shining example of Khmer architecture with its classic
                    gilded roofs and tranquil palace grounds.
                  </p>
                </div>
                <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer">
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
          </div>

          {/* Expanded Destinations */}
          {expandedSections.cultural && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
              {/* Preah Vihear Card */}
              <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src={preahVihear}
                    alt="Preah Vihear"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                    HERITAGE
                  </span>
                </div>
                <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                      Preah Vihear
                    </h3>
                    <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                      A majestic clifftop temple perched on the edge of the
                      Dângrêk Mountains, offering spectacular border views.
                    </p>
                  </div>
                  <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer">
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

              {/* Banteay Srei Card */}
              <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src={banteaySrei}
                    alt="Banteay Srei"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                    CULTURAL
                  </span>
                </div>
                <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                      Banteay Srei
                    </h3>
                    <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                      Built with pink sandstone, this temple is renowned for its
                      miniature scale and exquisite, detailed relief carvings.
                    </p>
                  </div>
                  <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tuol Sleng */}
            <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
              <div className="h-52 sm:h-56 overflow-hidden relative">
                <img
                  src={tuolSleng}
                  alt="Tuol Sleng"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                  HISTORY
                </span>
              </div>
              <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                    Tuol Sleng (S-21)
                  </h3>
                  <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                    A former high school turned interrogation facility, now
                    standing as an invaluable memorial to historical truth.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-brand-dark/50">
                  <span>Phnom Penh</span>
                  <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase flex items-center space-x-1.5 cursor-pointer">
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

            {/* Killing Fields */}
            <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
              <div className="h-52 sm:h-56 overflow-hidden relative">
                <img
                  src={killingFields}
                  alt="Killing Fields"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-md">
                  HISTORY
                </span>
              </div>
              <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                    Killing Fields
                  </h3>
                  <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                    A site of deep solemnity, offering a vital space for
                    reflection on the nation's past and path forward.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-brand-dark/50">
                  <span>Choeung Ek</span>
                  <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase flex items-center space-x-1.5 cursor-pointer">
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
          </div>

          {/* Expanded Destinations */}
          {expandedSections.dark && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
              {/* Bokor Hill Station */}
              <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
                <div className="h-52 sm:h-56 overflow-hidden relative">
                  <img
                    src={bokorHill}
                    alt="Bokor Hill"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">
                    HISTORY
                  </span>
                </div>
                <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                      Bokor Hill Station
                    </h3>
                    <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                      A misty mountain canopy featuring haunting colonial ruins
                      and panoramic views of the Gulf of Thailand.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-brand-dark/50">
                    <span>Kampot</span>
                    <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase flex items-center space-x-1.5 cursor-pointer">
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

              {/* Wat Thmey Pagoda */}
              <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
                <div className="h-52 sm:h-56 overflow-hidden relative">
                  <img
                    src={watThmey}
                    alt="Wat Thmey"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">
                    REFLECTION
                  </span>
                </div>
                <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                      Wat Thmey Memorial Pagoda
                    </h3>
                    <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                      A quiet, reflective Buddhist monastery in Siem Reap
                      containing a stupa memorial dedicated to the region's
                      history.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-brand-dark/50">
                    <span>Siem Reap</span>
                    <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase flex items-center space-x-1.5 cursor-pointer">
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
            </div>
          )}

          {/* Toggle Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={() =>
                setExpandedSections((prev) => ({ ...prev, dark: !prev.dark }))
              }
              className="flex items-center space-x-2 border border-red-800/30 text-red-800 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-md cursor-pointer hover:bg-red-800 hover:text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-800/15 hover:border-red-800"
            >
              <span>
                {expandedSections.dark ? "Show Less" : "Show More Destinations"}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cardamom Mountains */}
            <div className="lg:col-span-8 bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col sm:flex-row h-auto sm:h-72">
              <div className="w-full sm:w-1/2 overflow-hidden relative h-56 sm:h-full shrink-0">
                <img
                  src={cardamomMountains}
                  alt="Cardamoms"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-brand-forest text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                  ECOTRAVEL
                </span>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                    Cardamom Mountains
                  </h3>
                  <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                    One of Southeast Asia's last great wilderness areas, home to
                    rare wildlife and hidden waterfalls.
                  </p>
                </div>
                <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer">
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
              <div className="relative h-32 overflow-hidden shrink-0">
                <img
                  src={tonleSap}
                  alt="Tonle Sap"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-3 left-3 bg-purple-900 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                  TONLE SAP
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-normal tracking-widest text-brand-dark uppercase">
                    Tonle Sap
                  </h3>
                  <p className="text-xs font-light text-brand-dark/70 leading-relaxed">
                    The beating heart of Cambodia, featuring unique floating
                    communities and seasonal floods.
                  </p>
                </div>
                <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-2 border-t border-brand-gold/10 cursor-pointer">
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

          {/* Expanded Destinations */}
          {expandedSections.eco && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-fade-in">
              {/* Yeak Laom Card */}
              <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src={yeakLaom}
                    alt="Yeak Laom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-brand-forest text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                    SANCTUARY
                  </span>
                </div>
                <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                      Yeak Laom Lake
                    </h3>
                    <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                      A pristine volcanic crater lake in Ratanakiri wrapped in
                      sacred indigenous folklore and dense jungle.
                    </p>
                  </div>
                  <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer">
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

              {/* Koh Rong Card */}
              <div className="bg-white/40 border border-brand-gold/15 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden flex flex-col">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src={kohRongBeach}
                    alt="Koh Rong"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-brand-forest text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                    MARINE ECO
                  </span>
                </div>
                <div className="p-8 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl font-normal tracking-widest text-brand-dark uppercase">
                      Koh Rong Island
                    </h3>
                    <p className="text-sm font-light text-brand-dark/70 leading-relaxed">
                      Crystalline turquoise waters, white sandy shores, and
                      vibrant coral reefs under protection initiatives.
                    </p>
                  </div>
                  <button className="text-brand-gold hover:text-brand-gold-dark text-[11px] font-semibold tracking-widest uppercase text-left flex items-center space-x-2 pt-4 border-t border-brand-gold/10 cursor-pointer">
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
      </div>
    </div>
  );
};
