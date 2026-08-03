import { useState, useEffect } from "react";
import {
  ArrowRight,
  Compass,
  MapPin,
  ChevronRight,
} from "lucide-react";

// Image imports
import heroAngkor from "../assets/hero_angkor.png";
import bayonBuddhaClose from "../assets/bayon_buddha_close.jpg";
import darkSkulls from "../assets/dark_skulls.jpg";
import yeakLaom from "../assets/yeak_laom.png";

// Custom gallery preview images
import galleryAngkor from "../assets/gallery_angkor.jpg";
import galleryMuseum from "../assets/gallery_museum.jpg";
import gallerySkyline from "../assets/gallery_skyline.jpg";
import galleryPubstreet from "../assets/gallery_pubstreet.jpg";
import galleryMountain from "../assets/gallery_mountain.jpg";
import galleryFood1 from "../assets/gallery_food1.jpg";
import galleryFood2 from "../assets/gallery_food2.jpg";
import galleryFood3 from "../assets/gallery_food3.jpg";

export const Home = ({ setActiveTab }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Array of images for the auto-rotating gallery preview
  const slideshowImages = [
    { src: galleryAngkor, label: "Angkor Wat", location: "Siem Reap Province" },
    {
      src: galleryMuseum,
      label: "National Museum",
      location: "Phnom Penh Capital",
    },
    {
      src: gallerySkyline,
      label: "Mekong River Skyline",
      location: "Phnom Penh",
    },
    { src: galleryPubstreet, label: "Heritage Quarter", location: "Siem Reap" },
    {
      src: galleryMountain,
      label: "Cardamom Mountains",
      location: "Koh Kong Wilderness",
    },
  ];

  // Rotate images automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  return (
    <div className="pb-20 bg-brand-cream font-sans animate-fade-in">
      {/* 1. Hero Block */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroAngkor}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-10000 ease-out"
          alt="Angkor Sanctuary"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark/70" />

        <div className="relative z-10 text-center space-y-6 max-w-4xl px-6 md:px-12 mt-12">
          <div className="inline-flex items-center bg-brand-gold/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-gold/30">
            <span className="font-handwritten text-brand-gold text-base sm:text-lg tracking-wider">
              Discover the Soul of the Kingdom
            </span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-8xl text-white font-normal uppercase tracking-[0.2em] leading-none text-shadow">
            ANGKOR LUX
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-brand-cream-dark/90 max-w-xl mx-auto leading-relaxed font-light">
            Step into timeless stone sanctuaries, pristine coastal retreats, and
            centuries of vibrant Khmer heritage.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab("destinations")}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-9 py-4 text-xs font-bold tracking-[0.25em] uppercase rounded-full shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer flex items-center space-x-2"
            >
              <span>EXPLORE DESTINATIONS</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => setActiveTab("plan-trip")}
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full border border-white/25 hover:border-brand-gold/50 transition-all duration-300 cursor-pointer"
            >
              PLAN YOUR JOURNEY
            </button>
          </div>
        </div>
      </section>

      {/* 2. Experience Cambodia Introduction */}
      <section className="bg-brand-forest text-brand-cream-dark py-28 border-y border-brand-gold/20 relative overflow-hidden">
        {/* Subtle decorative gold background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Left Column */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-brand-gold text-xs tracking-[0.3em] uppercase block font-semibold">
                — KINGDOM OF WONDER —
              </span>
              <h2 className="font-cormorant text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-wide uppercase leading-tight">
                Discover <br className="hidden md:block" /> Cambodia’s Story
              </h2>

              {/* Diamond Ornament Divider */}
              <div className="flex items-center space-x-3 pt-3">
                <div className="w-2 h-2 rotate-45 bg-brand-gold" />
                <div className="h-[1px] w-28 bg-gradient-to-r from-brand-gold/60 to-transparent" />
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 border-l-2 border-brand-gold/30 pl-8 md:pl-12 py-3 space-y-4">
              <p className="font-sans text-base sm:text-lg text-brand-cream-dark/90 leading-relaxed font-light">
                Cambodia is a country filled with rich history, warm people, and
                unforgettable places to explore. Hundreds of years ago, it was the
                heart of the powerful Khmer Empire, who built world-famous stone
                temples like Angkor Wat. Today, you can walk through centuries of
                history, enjoy authentic local food, relax on white-sand beaches, and
                explore lush green rainforests.
              </p>
              <p className="font-handwritten text-brand-gold text-xl sm:text-2xl">
                Rich history, beautiful nature, and warm Khmer smiles everywhere you go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Cambodia Video Showcase */}
      <section className="py-20 bg-brand-cream relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-brand-gold-dark text-xs tracking-[0.3em] uppercase block font-semibold">
              — CINEMATIC SHOWCASE —
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide uppercase">
              Experience the Magic of Cambodia
            </h2>
            <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
            <p className="font-sans text-sm sm:text-base text-brand-dark/75 max-w-xl mx-auto leading-relaxed font-light">
              A brief video showcase highlighting the ancient heritage, vibrant cultures, and natural beauty awaiting your journey.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border-2 border-brand-gold/30 shadow-2xl bg-brand-dark aspect-video">
            <iframe
              src="https://www.youtube.com/embed/RTAP1Nk9fEE?autoplay=0&rel=0"
              title="Cambodia Showcase Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Journey Sectors with Banners */}
      <section className="py-28 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-brand-gold-dark text-xs tracking-[0.3em] uppercase block font-semibold">
            — CURATED TRAVEL —
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide uppercase">
            Tailored Explorations
          </h2>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-sans text-sm sm:text-base text-brand-dark/75 max-w-lg mx-auto leading-relaxed font-light">
            Curated pathways tailored to your spirit of exploration — from
            ancient heritage and poignant history to pristine ecological havens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Cultural */}
          <div
            className="relative overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer border border-brand-gold/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            onClick={() => setActiveTab("destinations", "cultural-tourism")}
          >
            <span className="absolute top-5 left-5 bg-brand-gold/90 text-brand-dark backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow rounded-full border border-brand-gold">
              Heritage
            </span>
            <img
              src={bayonBuddhaClose}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Cultural Tourism"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-end p-8 space-y-2">
              <h3 className="font-cormorant text-2xl text-white uppercase tracking-wider">
                Cultural Tourism
              </h3>
              <p className="text-xs font-light text-brand-cream-dark/85 leading-relaxed">
                Ancient stone sanctuaries, sacred Apsara dances, and living
                artisan traditions.
              </p>
              <div className="pt-2 flex items-center text-brand-gold text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Heritage</span>
                <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          </div>

          {/* Card 2: Dark */}
          <div
            className="relative overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer border border-brand-gold/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            onClick={() => setActiveTab("destinations", "dark-tourism")}
          >
            <span className="absolute top-5 left-5 bg-red-900/90 text-white backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow rounded-full border border-red-700">
              Reflection
            </span>
            <img
              src={darkSkulls}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Historical Reflection"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-end p-8 space-y-2">
              <h3 className="font-cormorant text-2xl text-white uppercase tracking-wider">
                Dark Tourism
              </h3>
              <p className="text-xs font-light text-brand-cream-dark/85 leading-relaxed">
                Poignant historic memorials, stories of enduring resilience, and
                peaceful spaces for reflection.
              </p>
              <div className="pt-2 flex items-center text-brand-gold text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Learn History</span>
                <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          </div>

          {/* Card 3: Eco */}
          <div
            className="relative overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer border border-brand-gold/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            onClick={() => setActiveTab("destinations", "eco-tourism")}
          >
            <span className="absolute top-5 left-5 bg-brand-forest/90 text-white backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow rounded-full border border-brand-forest-light">
              Sanctuary
            </span>
            <img
              src={yeakLaom}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Eco Tourism"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-end p-8 space-y-2">
              <h3 className="font-cormorant text-2xl text-white uppercase tracking-wider">
                Eco Tourism
              </h3>
              <p className="text-xs font-light text-brand-cream-dark/85 leading-relaxed">
                Volcanic crater lakes, ancient cloud forests, and protected
                marine archipelagos.
              </p>
              <div className="pt-2 flex items-center text-brand-gold text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Nature</span>
                <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wonders Captured Slideshow */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-brand-gold-dark text-xs tracking-[0.3em] uppercase block font-semibold">
            — VISUAL HIGHLIGHTS —
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide uppercase">
            Wonders Captured
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-sans text-sm text-brand-dark/70 max-w-md mx-auto mt-2 leading-relaxed">
            A glimpse into the stunning scenery, rich culture, and authentic
            flavors of Cambodia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Slideshow Frame */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-brand-gold/20 shadow-xl group">
            <img
              src={slideshowImages[slideIndex].src}
              alt={slideshowImages[slideIndex].label}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
              <div>
                <span className="text-brand-gold text-[10px] uppercase font-bold tracking-widest block">
                  {slideshowImages[slideIndex].location}
                </span>
                <h3 className="font-cormorant text-xl font-normal uppercase tracking-wider">
                  {slideshowImages[slideIndex].label}
                </h3>
              </div>
              <button
                onClick={() => setActiveTab("gallery")}
                className="bg-brand-gold/90 hover:bg-brand-gold text-brand-dark px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full shadow transition-all cursor-pointer"
              >
                View Gallery
              </button>
            </div>

            {/* Slide indicators */}
            <div className="absolute top-4 right-4 flex space-x-1.5">
              {slideshowImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === slideIndex
                      ? "bg-brand-gold scale-125"
                      : "bg-white/40"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Preview Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="rounded-xl overflow-hidden h-52 border border-brand-gold/15 shadow-sm group cursor-pointer relative"
              onClick={() => setActiveTab("gallery")}
            >
              <img
                src={galleryFood1}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Khmer Platter"
              />
              <div className="absolute inset-0 bg-brand-dark/25 group-hover:bg-brand-dark/10 transition-colors" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-serif tracking-wider uppercase bg-brand-dark/60 backdrop-blur-xs px-3 py-1 rounded">
                Khmer Gastronomy
              </span>
            </div>

            <div
              className="rounded-xl overflow-hidden h-52 border border-brand-gold/15 shadow-sm group cursor-pointer relative"
              onClick={() => setActiveTab("gallery")}
            >
              <img
                src={galleryFood2}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Fish Amok"
              />
              <div className="absolute inset-0 bg-brand-dark/25 group-hover:bg-brand-dark/10 transition-colors" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-serif tracking-wider uppercase bg-brand-dark/60 backdrop-blur-xs px-3 py-1 rounded">
                Traditional Amok
              </span>
            </div>

            <div
              className="sm:col-span-2 rounded-xl overflow-hidden h-52 border border-brand-gold/15 shadow-sm group cursor-pointer relative"
              onClick={() => setActiveTab("gallery")}
            >
              <img
                src={galleryFood3}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Street Food Market"
              />
              <div className="absolute inset-0 bg-brand-dark/25 group-hover:bg-brand-dark/10 transition-colors" />
              <span className="absolute bottom-4 left-4 text-white text-xs font-serif tracking-wider uppercase bg-brand-dark/60 backdrop-blur-xs px-3.5 py-1.5 rounded">
                Night Market Delicacies
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
