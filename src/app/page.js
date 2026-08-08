"use client";

/**
 * src/app/page.jsx - Next.js App Router Homepage
 * Features the Luxury Hero section, Kingdom Pillars navigation cards,
 * auto-rotating preview gallery, and Quick Fact statistics.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

// Image asset paths (public)
const heroAngkor = "/assets/hero_angkor.png";
const bayonBuddhaClose = "/assets/bayon_buddha_close.jpg";
const darkSkulls = "/assets/dark_skulls.jpg";
const yeakLaom = "/assets/yeak_laom.png";

// Custom gallery preview images
const galleryAngkor = "/assets/gallery_angkor.jpg";
const galleryMuseum = "/assets/gallery_museum.jpg";
const gallerySkyline = "/assets/gallery_skyline.jpg";
const galleryPubstreet = "/assets/gallery_pubstreet.jpg";
const galleryMountain = "/assets/gallery_mountain.jpg";
const galleryFood1 = "/assets/gallery_food1.jpg";
const galleryFood2 = "/assets/gallery_food2.jpg";
const galleryFood3 = "/assets/gallery_food3.jpg";

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

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Rotate images automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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

        <div className="relative z-10 text-center space-y-6 sm:space-y-8 max-w-4xl px-6 md:px-12 mt-20 sm:mt-28 md:mt-32 flex flex-col items-center justify-center mx-auto">
          <h1 className="font-['Cinzel'] flex flex-col items-center justify-center text-center text-shadow uppercase">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold tracking-[0.2em] leading-none">
              ANGKOR
            </span>
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-[0.35em] uppercase mt-2">
              LUX
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-cream-dark/95 max-w-2xl mx-auto leading-relaxed font-light">
            Your complete travel guide to Cambodia. Discover ancient temples,
            tropical beaches, authentic local food, and easily plan your
            journey.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/destinations"
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-10 py-4 text-sm sm:text-base font-bold tracking-[0.2em] uppercase rounded-full shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer flex items-center space-x-2.5 focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <span>EXPLORE DESTINATIONS</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/plan-trip"
              className="bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/40 hover:border-amber-400 backdrop-blur-md px-9 py-4 text-sm sm:text-base font-bold tracking-[0.2em] uppercase rounded-full hover:scale-[1.03] shadow-lg shadow-black/50 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              PLAN YOUR JOURNEY
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Experience Cambodia Introduction */}
      <section className="bg-brand-forest text-brand-cream-dark py-24 md:py-28 border-y border-brand-gold/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Left Column */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-brand-gold text-xs sm:text-sm tracking-[0.3em] uppercase block font-semibold">
                — KINGDOM OF WONDER —
              </span>
              <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide uppercase leading-tight">
                Discover <br className="hidden md:block" /> Cambodia’s Story
              </h2>

              {/* Diamond Ornament Divider */}
              <div className="flex items-center space-x-3 pt-3">
                <div className="w-2 h-2 rotate-45 bg-brand-gold" />
                <div className="h-[1px] w-28 bg-gradient-to-r from-brand-gold/60 to-transparent" />
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 border-l-2 border-brand-gold/30 pl-8 md:pl-12 py-3 space-y-5">
              <p className="font-sans text-base sm:text-lg md:text-xl text-brand-cream-dark/95 leading-relaxed font-light">
                Cambodia is a country full of history, friendly people, and
                beautiful places to explore. Long ago, it was the center of the
                powerful Khmer Empire, which built famous temples like Angkor
                Wat. Today, you can explore ancient temples, enjoy local food,
                relax on beautiful beaches, and discover green forests.
              </p>
              <p className="font-handwritten text-brand-gold text-xl sm:text-2xl md:text-3xl">
                Rich history, beautiful nature, and warm Khmer smiles everywhere
                you go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Cambodia Video Showcase */}
      <section className="py-20 bg-brand-cream relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-brand-gold-dark text-xs sm:text-sm tracking-[0.3em] uppercase block font-semibold">
              — CINEMATIC SHOWCASE —
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide uppercase">
              Experience the Magic of Cambodia
            </h2>
            <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
            <p className="font-sans text-base sm:text-lg md:text-xl text-brand-dark/90 max-w-2xl mx-auto leading-relaxed font-light">
              A brief video showcase highlighting the ancient heritage, vibrant
              cultures, and natural beauty awaiting your journey.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border-2 border-brand-gold/30 shadow-2xl bg-brand-dark aspect-video">
            <iframe
              src="https://www.youtube.com/embed/RTAP1Nk9fEE?autoplay=1&mute=1&loop=1&playlist=RTAP1Nk9fEE&rel=0"
              title="Cambodia Showcase Video"
              loading="lazy"
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Journey Sectors with Banners */}
      <section className="py-24 md:py-28 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-brand-gold-dark text-xs sm:text-sm tracking-[0.3em] uppercase block font-semibold">
            — Featured Journey —
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide uppercase">
            DISCOVER CAMBODIA
          </h2>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-sans text-base sm:text-lg text-brand-dark/85 max-w-lg mx-auto leading-relaxed font-light">
            Explore Cambodia's rich history, breathtaking temples, vibrant
            culture, and beautiful natural landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Cultural */}
          <Link
            href="/destinations?category=cultural-tourism"
            className="relative overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer border border-brand-gold/25 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 block"
          >
            <span className="absolute top-5 left-5 bg-brand-gold text-brand-dark backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase z-10 rounded-full border-none outline-none ring-0">
              Heritage
            </span>
            <img
              src={bayonBuddhaClose}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Cultural Tourism"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/45 to-transparent flex flex-col justify-end p-8 space-y-2">
              <h3 className="font-cormorant text-2xl md:text-3xl text-white uppercase tracking-wider">
                Cultural Tourism
              </h3>
              <p className="text-sm font-normal text-brand-cream-dark/95 leading-relaxed">
                Discover ancient temples, traditional Apsara dances, and rich
                local crafts.
              </p>
              <div className="pt-2 flex items-center text-brand-gold text-xs sm:text-sm font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Heritage</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: Dark */}
          <Link
            href="/destinations?category=dark-tourism"
            className="relative overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer border border-brand-gold/25 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 block"
          >
            <span className="absolute top-5 left-5 bg-[#8B1E1E] text-white backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase z-10 rounded-full border-none outline-none ring-0">
              Reflection
            </span>
            <img
              src={darkSkulls}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Historical Reflection"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/45 to-transparent flex flex-col justify-end p-8 space-y-2">
              <h3 className="font-cormorant text-2xl md:text-3xl text-white uppercase tracking-wider">
                Dark Tourism
              </h3>
              <p className="text-sm font-normal text-brand-cream-dark/95 leading-relaxed">
                Meaningful historic sites, inspiring stories of strength, and
                peaceful places to remember.
              </p>
              <div className="pt-2 flex items-center text-brand-gold text-xs sm:text-sm font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Learn History</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>

          {/* Card 3: Eco */}
          <Link
            href="/destinations?category=eco-tourism"
            className="relative overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer border border-brand-gold/25 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 block"
          >
            <span className="absolute top-5 left-5 bg-brand-forest text-white backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase z-10 rounded-full border-none outline-none ring-0">
              Sanctuary
            </span>
            <img
              src={yeakLaom}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Eco Tourism"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/45 to-transparent flex flex-col justify-end p-8 space-y-2">
              <h3 className="font-cormorant text-2xl md:text-3xl text-white uppercase tracking-wider">
                Eco Tourism
              </h3>
              <p className="text-sm font-normal text-brand-cream-dark/95 leading-relaxed">
                Beautiful crater lakes, lush rainforests, and protected tropical
                islands.
              </p>
              <div className="pt-2 flex items-center text-brand-gold text-xs sm:text-sm font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore Nature</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Wonders Captured Slideshow */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-brand-gold-dark text-xs sm:text-sm tracking-[0.3em] uppercase block font-semibold">
            — VISUAL HIGHLIGHTS —
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-wide uppercase">
            Wonders Captured
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-sans text-base text-brand-dark/85 max-w-md mx-auto mt-2 leading-relaxed">
            A glimpse into the stunning scenery, rich culture, and authentic
            flavors of Cambodia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Slideshow Frame: Cambodian Destinations */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-brand-gold/25 shadow-xl group">
            <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark backdrop-blur-md px-3.5 py-1 text-xs font-bold tracking-[0.15em] uppercase rounded-full shadow border border-brand-gold z-10 flex items-center space-x-1">
              <span>CAMBODIAN DESTINATION</span>
            </span>

            <img
              src={slideshowImages[slideIndex].src}
              loading="lazy"
              alt={slideshowImages[slideIndex].label}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
              <div>
                <span className="text-brand-gold text-xs uppercase font-bold tracking-widest block">
                  {slideshowImages[slideIndex].location}
                </span>
                <h3 className="font-cormorant text-xl sm:text-2xl font-normal uppercase tracking-wider">
                  {slideshowImages[slideIndex].label}
                </h3>
              </div>
              <Link
                href="/gallery"
                className="bg-brand-gold/90 hover:bg-brand-gold text-brand-dark px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full shadow transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                View Gallery
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="absolute top-4 right-4 flex space-x-1.5 z-10">
              {slideshowImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === slideIndex
                      ? "bg-brand-gold scale-125"
                      : "bg-white/60"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Preview Grid: Cambodian Food */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-brand-gold/25">
              <span className="text-brand-gold-dark text-xs sm:text-sm font-bold tracking-[0.2em] uppercase flex items-center space-x-1.5">
                <span>CAMBODIAN FOOD & CUISINE</span>
              </span>
              <span className="text-xs text-brand-dark/75 uppercase font-sans">
                Authentic Local Dishes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/gallery"
                className="rounded-xl overflow-hidden h-44 border border-brand-gold/20 shadow-sm group cursor-pointer relative block"
              >
                <img
                  src={galleryFood1}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Khmer Gastronomy"
                />
                <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/15 transition-colors" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-bold tracking-widest uppercase bg-brand-dark/80 backdrop-blur-xs px-3 py-1 rounded border border-brand-gold/30">
                  Khmer Gastronomy
                </span>
              </Link>

              <Link
                href="/gallery"
                className="rounded-xl overflow-hidden h-44 border border-brand-gold/20 shadow-sm group cursor-pointer relative block"
              >
                <img
                  src={galleryFood2}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Fish Amok"
                />
                <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/15 transition-colors" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-bold tracking-widest uppercase bg-brand-dark/80 backdrop-blur-xs px-3 py-1 rounded border border-brand-gold/30">
                  Traditional Amok
                </span>
              </Link>

              <Link
                href="/gallery"
                className="sm:col-span-2 rounded-xl overflow-hidden h-44 border border-brand-gold/20 shadow-sm group cursor-pointer relative block"
              >
                <img
                  src={galleryFood3}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Street Food Market"
                />
                <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/15 transition-colors" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-bold tracking-widest uppercase bg-brand-dark/80 backdrop-blur-xs px-3 py-1 rounded border border-brand-gold/30">
                  Night Market Delicacies
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner Section */}
      <section className="py-14 sm:py-20 md:py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-brand-gold/60" />
            <span className="text-brand-gold font-serif text-base sm:text-lg tracking-widest">
              ❖
            </span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-brand-gold/60" />
          </div>

          <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl text-brand-dark italic font-normal tracking-wide leading-tight px-4">
            “Every moment in Cambodia is a masterpiece.”
          </blockquote>

          <div className="flex items-center justify-center space-x-4 pt-1">
            <span className="h-[1px] w-24 sm:w-36 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
}
