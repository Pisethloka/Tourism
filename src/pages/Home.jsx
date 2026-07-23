import { useState, useEffect } from "react";

// Image imports
import heroAngkor from "../assets/hero_angkor.png";
import bayonBuddhaClose from "../assets/bayon_buddha_close.jpg";
import darkSkulls from "../assets/dark_skulls.jpg";
import yeakLaom from "../assets/yeak_laom.png";

// New custom gallery image imports
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
    { src: galleryAngkor, label: "Angkor Wat, Siem Reap" },
    { src: galleryMuseum, label: "National Museum, Phnom Penh" },
    { src: gallerySkyline, label: "Phnom Penh Skyline" },
    { src: galleryPubstreet, label: "Pub Street, Siem Reap" },
    { src: galleryMountain, label: "Cardamom Mountains, Cambodia" },
  ];

  // Rotate images automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  return (
    <div className="pb-12 bg-brand-cream animate-fade-in">
      {/* 1. Hero Block */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroAngkor}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Angkor"
        />
        <div className="absolute inset-0 bg-brand-dark/45" />
        <div className="relative z-10 text-center space-y-4 max-w-6xl px-6">
          <span className="font-handwritten text-brand-gold text-3xl tracking-wide block">
            Planning your special journey
          </span>
          <h1
            className="font-cormorant text-3xl sm:text-5xl md:text-7xl text-white font-light uppercase animate-fade-in"
            style={{
              whiteSpace: "nowrap",
              letterSpacing: "0.2em",
              marginRight: "-0.2em",
            }}
          >
            ANGKOR LUX
          </h1>
          <p className="font-inter text-base text-brand-cream-dark/80 max-w-md mx-auto leading-relaxed">
            Explore peaceful temples, learn about rich history, and enjoy the beautiful nature of Cambodia.
          </p>
          <button
            onClick={() => setActiveTab("destinations")}
            className="mt-8 bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-10 py-4 text-xs font-semibold tracking-widest uppercase rounded-md cursor-pointer"
          >
            EXPLORE
          </button>
        </div>
      </section>

      {/* 2. Experience Cambodia Introduction */}
      <section className="bg-brand-forest text-brand-cream-dark py-24 border-y border-brand-gold/15 relative overflow-hidden">
        {/* Subtle decorative gold background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left Column: Styled Header & Premium Ornament */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-brand-gold text-xs tracking-[0.25em] uppercase block font-bold">
                — Welcome —
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide uppercase leading-tight">
                Experience <br className="hidden md:block" /> Cambodia
              </h2>
              
              {/* Premium Diamond Ornament Divider */}
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold" />
                <div className="h-[1px] w-24 bg-gradient-to-r from-brand-gold/50 to-transparent" />
              </div>
            </div>

            {/* Right Column: Short paragraph with left border decoration */}
            <div className="md:col-span-7 border-l border-brand-gold/25 pl-6 md:pl-10 py-2">
              <p className="font-inter text-base sm:text-lg text-brand-cream-dark/85 leading-relaxed font-light">
                Cambodia is a beautiful country with very friendly people. 
                Here, you can see huge stone temples from long ago, walk on soft sandy beaches, 
                and explore green forests filled with life. Every corner has a new story, 
                a warm smile, and a special memory waiting for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Journey Sectors with Banners */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center space-y-2">
          <span className="text-brand-gold-dark text-xs tracking-widest uppercase block">
            — Curated Travel —
          </span>
          <h2 className="font-cormorant text-3xl md:text-4xl text-brand-dark tracking-wide uppercase">
            Journey Sectors
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-inter text-sm text-brand-dark/70 max-w-md mx-auto mt-3 leading-relaxed">
            Find the kind of trip you want to take. Choose from culture, history, or nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Cultural */}
          <div
            className="relative overflow-hidden aspect-[4/3] group cursor-pointer border border-brand-gold/10"
            onClick={() => setActiveTab("destinations", "cultural-tourism")}
          >
            <span className="absolute top-4 left-4 bg-[#C59E3F] text-brand-dark px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow-sm rounded-sm">
              Heritage
            </span>
            <img
              src={bayonBuddhaClose}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Cultural"
            />
            <div className="absolute inset-0 bg-brand-dark/55 flex flex-col justify-end p-6">
              <h3 className="font-serif text-base text-white uppercase">
                Cultural Tourism
              </h3>
              <p className="text-[12px] font-light text-brand-cream-dark/85 mt-1 leading-normal">
                Beautiful temples, old ruins, traditional dances, and handmade crafts.
              </p>
            </div>
          </div>

          {/* Card 2: Dark */}
          <div
            className="relative overflow-hidden aspect-[4/3] group cursor-pointer border border-brand-gold/10"
            onClick={() => setActiveTab("destinations", "dark-tourism")}
          >
            <span className="absolute top-4 left-4 bg-red-800 text-white px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow-sm rounded-sm">
              Reflection
            </span>
            <img
              src={darkSkulls}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Dark"
            />
            <div className="absolute inset-0 bg-brand-dark/65 flex flex-col justify-end p-6">
              <h3 className="font-serif text-base text-white uppercase">
                Dark Tourism
              </h3>
              <p className="text-[11px] font-light text-brand-cream-dark/85 mt-1 leading-normal">
                Learn about Cambodia's past, its history, and how its people rebuilt their lives.
              </p>
            </div>
          </div>

          {/* Card 3: Eco */}
          <div
            className="relative overflow-hidden aspect-[4/3] group cursor-pointer border border-brand-gold/10"
            onClick={() => setActiveTab("destinations", "eco-tourism")}
          >
            <span className="absolute top-4 left-4 bg-[#3D5A42] text-white px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow-sm rounded-sm">
              Sanctuary
            </span>
            <img
              src={yeakLaom}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Eco"
            />
            <div className="absolute inset-0 bg-brand-forest/65 flex flex-col justify-end p-6">
              <h3 className="font-serif text-base text-white uppercase">
                Eco Tourism
              </h3>
              <p className="text-[11px] font-light text-brand-cream-dark/85 mt-1 leading-normal">
                Beautiful lakes inside volcanic craters, green rainforests, and nice nature stays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wonders Captured Slideshow */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="font-cormorant text-4xl tracking-widest text-brand-dark uppercase">
            Wonders Captured
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
          <p className="font-inter text-sm text-brand-dark/70 max-w-md mx-auto mt-3 leading-relaxed">
            Take a look at photos of beautiful places and tasty local food from around Cambodia.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Slideshow Panel */}
          <div
            className="lg:col-span-6 rounded-none overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[450px] border border-brand-gold/10 relative group cursor-pointer"
            onClick={() => setActiveTab("gallery")}
          >
            {slideshowImages.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === slideIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent p-6">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold-light uppercase block">
                    Historic Landmark
                  </span>
                  <span className="font-serif text-lg text-white font-light mt-1 block">
                    {slide.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="absolute top-4 right-4 z-20 flex space-x-2 bg-brand-dark/40 backdrop-blur-xs px-3 py-1.5 rounded-none">
              {slideshowImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === slideIndex ? "bg-brand-gold scale-125" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* Right Preview Tiles */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="rounded-none overflow-hidden h-52 border border-brand-gold/10 group cursor-pointer"
              onClick={() => setActiveTab("gallery")}
            >
              <img
                src={galleryFood1}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Khmer Platter"
              />
            </div>
            <div
              className="rounded-none overflow-hidden h-52 border border-brand-gold/10 group cursor-pointer"
              onClick={() => setActiveTab("gallery")}
            >
              <img
                src={galleryFood2}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Fish Amok"
              />
            </div>
            <div
              className="sm:col-span-2 rounded-none overflow-hidden h-[216px] border border-brand-gold/10 group cursor-pointer"
              onClick={() => setActiveTab("gallery")}
            >
              <img
                src={galleryFood3}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Street Food Market"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
