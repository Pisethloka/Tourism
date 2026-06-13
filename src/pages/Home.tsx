import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import heroAngkor from '../assets/hero_angkor.png';
import bayonBuddha from '../assets/bayon_buddha.png';
import galleryCorridor from '../assets/gallery_corridor.png';
import cardamomMountains from '../assets/cardamom_mountains.png';
import apsaraDancer from '../assets/apsara_dancer.png';
import cambodianCulinary from '../assets/cambodian_culinary.png';
import kohRongBeach from '../assets/koh_rong_beach.png';
import yeakLaom from '../assets/yeak_laom.png';
import bayonBuddhaClose from '../assets/bayon_buddha_close.jpg';
import darkSkulls from '../assets/dark_skulls.jpg';
import phnomPenhPalace from '../assets/phnom_penh_palace.png';
import preahVihear from '../assets/preah_vihear.png';
import tonleSap from '../assets/tonle_sap.png';
import bokorHill from '../assets/bokor_hill.png';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slideshowImages = [
    { src: heroAngkor, label: 'Angkor Wat, Siem Reap' },
    { src: phnomPenhPalace, label: 'Royal Palace, Phnom Penh' },
    { src: preahVihear, label: 'Preah Vihear Temple, Preah Vihear' },
    { src: tonleSap, label: 'Tonle Sap Floating Village, Siem Reap' },
    { src: bokorHill, label: 'Bokor Hill Station, Kampot' },
    { src: bayonBuddha, label: 'Bayon Temple, Siem Reap' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);
  return (
    <div className="pb-12 bg-brand-cream">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroAngkor} 
            alt="Angkor Wat sunset reflection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/40 to-brand-dark/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6 mt-12 animate-fade-in">
          <span className="text-brand-gold font-serif text-sm tracking-[0.3em] uppercase block">
            — Angkor Lux —
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white italic font-normal tracking-wide leading-tight">
            Discover the Soul of Cambodia
          </h1>
          <div className="pt-6">
            <button 
              onClick={() => setActiveTab('destinations')}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-8 py-3.5 rounded-none text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/15"
            >
              EXPLORE
            </button>
          </div>
        </div>

        {/* Sub navbar navigation indicators inside hero */}
        <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center space-x-12 text-[10px] tracking-[0.3em] font-semibold text-brand-cream-dark/60 uppercase max-w-xl mx-auto border-t border-brand-cream-dark/15 pt-6">
          <button onClick={() => setActiveTab('home')} className="hover:text-brand-gold transition-colors">Home</button>
          <button onClick={() => setActiveTab('destinations')} className="hover:text-brand-gold transition-colors">Destinations</button>
          <button onClick={() => setActiveTab('gallery')} className="hover:text-brand-gold transition-colors">Gallery</button>
          <button onClick={() => setActiveTab('map')} className="hover:text-brand-gold transition-colors">Map</button>
          <button onClick={() => setActiveTab('contact')} className="hover:text-brand-gold transition-colors">Contact</button>
        </div>
      </section>

      {/* 2. Journey Sectors */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-brand-gold-dark font-serif text-xs tracking-[0.2em] uppercase block">— Exploration —</span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-wide uppercase">
            JOURNEY SECTORS
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sector 1: Cultural Tourism */}
          <div 
            className="relative overflow-hidden rounded-none border border-brand-gold/10 aspect-[4/3] group cursor-pointer" 
            onClick={() => setActiveTab('destinations')}
          >
            {/* Top Color Banner */}
            <span className="absolute top-4 left-4 bg-[#C59E3F] text-brand-dark px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow-sm">
              Heritage
            </span>
            <img 
              src={bayonBuddhaClose} 
              alt="Cultural Tourism" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-dark/55 flex flex-col justify-end p-6 text-left">
              <h3 className="font-serif text-sm font-bold tracking-wider text-white uppercase">Cultural Tourism</h3>
              <p className="text-[11px] font-light text-brand-cream-dark/85 mt-1 leading-normal">
                Temples, ancient ruins, classical dance performances, and artisan crafts.
              </p>
            </div>
          </div>

          {/* Sector 2: Dark Tourism */}
          <div 
            className="relative overflow-hidden rounded-none border border-brand-gold/10 aspect-[4/3] group cursor-pointer" 
            onClick={() => setActiveTab('destinations')}
          >
            {/* Top Color Banner */}
            <span className="absolute top-4 left-4 bg-red-800 text-white px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow-sm">
              Reflection
            </span>
            <img 
              src={darkSkulls} 
              alt="Dark Tourism" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-dark/65 flex flex-col justify-end p-6 text-left">
              <h3 className="font-serif text-sm font-bold tracking-wider text-white uppercase">Dark Tourism</h3>
              <p className="text-[11px] font-light text-brand-cream-dark/85 mt-1 leading-normal">
                Reflective visits to historic sites representing Cambodia's past and resilience.
              </p>
            </div>
          </div>

          {/* Sector 3: Eco Tourism */}
          <div 
            className="relative overflow-hidden rounded-none border border-brand-gold/10 aspect-[4/3] group cursor-pointer" 
            onClick={() => setActiveTab('destinations')}
          >
            {/* Top Color Banner */}
            <span className="absolute top-4 left-4 bg-[#3D5A42] text-white px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase z-10 shadow-sm">
              Sanctuary
            </span>
            <img 
              src={yeakLaom} 
              alt="Eco Tourism" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-forest/65 flex flex-col justify-end p-6 text-left">
              <h3 className="font-serif text-sm font-bold tracking-wider text-white uppercase">Eco Tourism</h3>
              <p className="text-[11px] font-light text-brand-cream-dark/85 mt-1 leading-normal">
                Mangrove explorations, rainforest hikes, and volcanic lake sanctuaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. More to Explore */}
      <section className="py-20 px-6 md:px-12 bg-brand-cream-dark/20 border-y border-brand-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-brand-gold-dark font-serif text-xs tracking-[0.2em] uppercase block">— Signature Sites —</span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-wide uppercase">
              MORE TO EXPLORE
            </h2>
            <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-none overflow-hidden shadow-sm border border-brand-gold/10 flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img src={bayonBuddha} alt="Bayon Temple" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3 py-1">HERITAGE</span>
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold tracking-wider text-brand-dark uppercase">Bayon Temple</h3>
                  <p className="text-xs font-light text-brand-dark/70 leading-relaxed">
                    Witness the stone towers representing the mountain temple of Avalokiteshvara.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-bold text-brand-gold-dark tracking-wider uppercase">
                  <span>Siem Reap</span>
                  <button onClick={() => setActiveTab('destinations')} className="hover:text-brand-dark flex items-center space-x-1">
                    <span>Explore</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-none overflow-hidden shadow-sm border border-brand-gold/10 flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img src={galleryCorridor} alt="Ta Prohm" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3 py-1">MYSTICAL</span>
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold tracking-wider text-brand-dark uppercase">Ta Prohm Temple</h3>
                  <p className="text-xs font-light text-brand-dark/70 leading-relaxed">
                    Observe the ancient root systems engulfing the ruins of a historic monastery.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-bold text-brand-gold-dark tracking-wider uppercase">
                  <span>Siem Reap</span>
                  <button onClick={() => setActiveTab('destinations')} className="hover:text-brand-dark flex items-center space-x-1">
                    <span>Explore</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-none overflow-hidden shadow-sm border border-brand-gold/10 flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img src={cardamomMountains} alt="Cardamoms" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3 py-1">ECO-TRAVEL</span>
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold tracking-wider text-brand-dark uppercase">Cardamom Mountains</h3>
                  <p className="text-xs font-light text-brand-dark/70 leading-relaxed">
                    Explore Southeast Asia's greatest rainforest canopy and hidden waterfalls.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[10px] font-bold text-brand-gold-dark tracking-wider uppercase">
                  <span>Koh Kong</span>
                  <button onClick={() => setActiveTab('destinations')} className="hover:text-brand-dark flex items-center space-x-1">
                    <span>Explore</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wonders Captured */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-brand-gold-dark font-serif text-xs tracking-[0.2em] uppercase block">— Gallery Preview —</span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark tracking-wide uppercase">
            WONDERS CAPTURED
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Left Column (Auto-rotating Slideshow of Famous Cambodian Locations) */}
          <div 
            className="lg:col-span-6 rounded-none overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[450px] border border-brand-gold/10 group cursor-pointer relative"
            onClick={() => setActiveTab('gallery')}
          >
            {slideshowImages.map((slide, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src={slide.src} 
                  alt={slide.label} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Caption overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent p-6 text-left">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-gold-light uppercase block">
                    Historic Landmark
                  </span>
                  <span className="font-serif text-lg text-white font-light mt-1 block">
                    {slide.label}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Auto-rotation step indicator dots */}
            <div className="absolute top-4 right-4 z-20 flex space-x-2 bg-brand-dark/40 backdrop-blur-xs px-3 py-1.5 rounded-none">
              {slideshowImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === slideIndex ? 'bg-brand-gold scale-125' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Columns Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-none overflow-hidden h-52 border border-brand-gold/10 group cursor-pointer" onClick={() => setActiveTab('gallery')}>
              <img src={apsaraDancer} alt="Silk Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="rounded-none overflow-hidden h-52 border border-brand-gold/10 group cursor-pointer" onClick={() => setActiveTab('gallery')}>
              <img src={cambodianCulinary} alt="Culinary" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="sm:col-span-2 rounded-none overflow-hidden h-[216px] border border-brand-gold/10 group cursor-pointer" onClick={() => setActiveTab('gallery')}>
              <img src={kohRongBeach} alt="Villas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonial Spotlight */}
      <section className="py-20 px-6 bg-brand-cream-dark/30 border-t border-brand-gold/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block text-brand-gold text-2xl">“</span>
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-brand-dark/85 italic leading-relaxed font-light">
            Discover the serenity, history, and vibrant culture. From ancient temples to modern cities, Cambodia is a kingdom of wonder.
          </p>
          <div className="flex justify-center pt-2">
            <div className="w-3 h-3 bg-brand-gold transform rotate-45" />
          </div>
        </div>
      </section>
    </div>
  );
};
