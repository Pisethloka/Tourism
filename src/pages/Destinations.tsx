import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroAngkor from '../assets/hero_angkor.png';
import phnomPenhPalace from '../assets/phnom_penh_palace.png';
import tuolSleng from '../assets/tuol_sleng.png';
import killingFields from '../assets/killing_fields.png';
import bokorHill from '../assets/bokor_hill.png';
import cardamomMountains from '../assets/cardamom_mountains.png';
import tonleSap from '../assets/tonle_sap.png';

export const Destinations: React.FC = () => {
  return (
    <div className="pb-20 bg-brand-cream font-sans">
      {/* Hero Header Banner */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroAngkor} alt="Angkor Wat Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-dark/50" />
        </div>
        <div className="relative z-10 text-center space-y-2 mt-12">
          <h1 className="font-serif text-3xl md:text-5xl text-white tracking-widest font-normal uppercase">
            Explore Our Destinations
          </h1>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        
        {/* 1. Cultural & Heritage */}
        <section className="space-y-8">
          <h2 className="font-serif text-xs font-bold tracking-[0.25em] text-brand-gold uppercase border-b border-brand-gold/15 pb-2">
            CULTURAL & HERITAGE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Angkor Wat Card */}
            <div className="bg-white/40 border border-brand-gold/10 group overflow-hidden flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src={heroAngkor} alt="Angkor Wat" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">HERITAGE</span>
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold tracking-wider text-brand-dark uppercase">Angkor Wat</h3>
                  <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
                    The soul of the Khmer Empire, a vast stone symphony and the largest religious monument in the world.
                  </p>
                </div>
                <button className="text-brand-gold hover:text-brand-gold-dark text-[10px] font-bold tracking-wider uppercase text-left flex items-center space-x-1.5 pt-4 border-t border-brand-gold/10 group-hover:underline">
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Royal Palace Card */}
            <div className="bg-white/40 border border-brand-gold/10 group overflow-hidden flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src={phnomPenhPalace} alt="Royal Palace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">CULTURAL</span>
              </div>
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold tracking-wider text-brand-dark uppercase">Royal Palace</h3>
                  <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
                    A shining example of Khmer architecture with its classic gilded roofs and tranquil palace grounds.
                  </p>
                </div>
                <button className="text-brand-gold hover:text-brand-gold-dark text-[10px] font-bold tracking-wider uppercase text-left flex items-center space-x-1.5 pt-4 border-t border-brand-gold/10 group-hover:underline">
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Historical Reflection */}
        <section className="space-y-8">
          <h2 className="font-serif text-xs font-bold tracking-[0.25em] text-red-800 uppercase border-b border-red-800/15 pb-2">
            HISTORICAL REFLECTION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tuol Sleng */}
            <div className="bg-white/40 border border-brand-gold/10 group overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={tuolSleng} alt="Tuol Sleng" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">HISTORY</span>
              </div>
              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold tracking-wider text-brand-dark uppercase">Tuol Sleng (S-21)</h3>
                  <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
                    A former high school turned interrogation facility, now standing as an invaluable memorial to historical truth.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-brand-dark/50">
                  <span>Phnom Penh</span>
                  <button className="text-brand-gold hover:text-brand-gold-dark flex items-center space-x-1 group-hover:underline">
                    <span>Learn More</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Killing Fields */}
            <div className="bg-white/40 border border-brand-gold/10 group overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={killingFields} alt="Killing Fields" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">HISTORY</span>
              </div>
              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold tracking-wider text-brand-dark uppercase">Killing Fields</h3>
                  <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
                    A site of deep solemnity, offering a vital space for reflection on the nation's past and path forward.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-brand-dark/50">
                  <span>Choeung Ek</span>
                  <button className="text-brand-gold hover:text-brand-gold-dark flex items-center space-x-1 group-hover:underline">
                    <span>Learn More</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bokor Hill Station */}
            <div className="bg-white/40 border border-brand-gold/10 group overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={bokorHill} alt="Bokor Hill" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5">HISTORY</span>
              </div>
              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold tracking-wider text-brand-dark uppercase">Bokor Hill Station</h3>
                  <p className="text-[11px] font-light text-brand-dark/75 leading-relaxed">
                    A misty mountain canopy featuring haunting colonial ruins and panoramic views of the Gulf of Thailand.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-brand-dark/50">
                  <span>Kampot</span>
                  <button className="text-brand-gold hover:text-brand-gold-dark flex items-center space-x-1 group-hover:underline">
                    <span>Learn More</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Natural Wonders */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-brand-gold/15 pb-2 gap-2">
            <div>
              <span className="text-[10px] font-bold text-brand-gold-dark uppercase tracking-widest">Natural Wonders</span>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-dark tracking-wide">
                Ecotourism Escapes
              </h2>
            </div>
            <span className="bg-brand-cream-dark/60 border border-brand-gold/20 text-brand-gold-dark text-[9px] font-bold tracking-widest uppercase px-3 py-1 self-start sm:self-auto">GREEN TRAVEL</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cardamom Mountains */}
            <div className="lg:col-span-8 bg-white/40 border border-brand-gold/10 overflow-hidden flex flex-col sm:flex-row group h-auto sm:h-72">
              <div className="w-full sm:w-1/2 overflow-hidden relative h-56 sm:h-full shrink-0">
                <img src={cardamomMountains} alt="Cardamoms" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-brand-forest text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">ECOTRAVEL</span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold tracking-wider text-brand-dark uppercase">Cardamom Mountains</h3>
                  <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
                    One of Southeast Asia's last great wilderness areas, home to rare wildlife and hidden waterfalls.
                  </p>
                </div>
                <div className="flex justify-end pt-4 sm:pt-0">
                  <button className="w-10 h-10 rounded-full bg-white border border-brand-gold/20 flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tonle Sap */}
            <div className="lg:col-span-4 bg-white/40 border border-brand-gold/10 overflow-hidden flex flex-col group h-auto lg:h-72 justify-between">
              <div className="relative h-40 overflow-hidden shrink-0">
                <img src={tonleSap} alt="Tonle Sap" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-purple-900 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">TONLE SAP</span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-wider text-brand-dark uppercase">Tonle Sap</h3>
                  <p className="text-sm font-light text-brand-dark/80 leading-relaxed">
                    The beating heart of Cambodia, featuring unique floating communities and seasonal floods.
                  </p>
                </div>
                <button className="text-brand-gold hover:text-brand-gold-dark text-[9px] font-bold tracking-widest uppercase text-left flex items-center space-x-1.5 pt-2 border-t border-brand-gold/10 group-hover:underline">
                  <span>Explore Waterways</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
