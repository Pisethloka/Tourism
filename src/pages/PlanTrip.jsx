import { useState } from 'react';
import { Plane, Compass, ArrowRight, Minus, Plus, X, Check, ChevronRight, CheckCircle2 } from 'lucide-react';

// Import local image assets
import galleryCorridor from '../assets/gallery_corridor.png';
import phnomPenhPalace from '../assets/phnom_penh_palace.png';
import heroAngkor from '../assets/hero_angkor.png';
import tonleSap from '../assets/tonle_sap.png';
import bokorHill from '../assets/bokor_hill.png';
import preahVihear from '../assets/preah_vihear.png';
import cardamomMountains from '../assets/cardamom_mountains.png';
import galleryBoat from '../assets/gallery_boat.png';
import galleryForest from '../assets/gallery_forest.png';
import cambodianCulinary from '../assets/cambodian_culinary.png';

export const PlanTrip = () => {
  // 1. Calculator Input States
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState('luxury');
  const [transport, setTransport] = useState('chauffeur');
  const [selectedActivities, setSelectedActivities] = useState([
    'angkor-sunrise',
    'mekong-cruise'
  ]);

  // Mobile layout state to toggle quick drawer for statement preview
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  
  // State for quote confirmation modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 2. Pricing Database
  const tierPricing = {
    boutique: { label: 'Boutique Hotel ($120/night)', rate: 120 },
    luxury: { label: 'Luxury Resort ($350/night)', rate: 350 },
    ultra: { label: 'Ultra-Luxury Villa ($850/night)', rate: 850 }
  };

  const transportPricing = {
    'tuk-tuk': { label: 'Local Tuk-Tuk ($25/day)', rate: 25 },
    chauffeur: { label: 'Private Chauffeur & SUV ($90/day)', rate: 90 },
    'domestic-flights': { label: 'Private Chauffeur + Flights ($160/day)', rate: 160 }
  };

  const activityOptions = [
    {
      id: 'angkor-sunrise',
      name: 'Private Angkor Wat Sunrise Tour',
      pricePerPerson: 95,
      icon: <Compass size={16} />
    },
    {
      id: 'helicopter',
      name: 'Scenic Angkor Helicopter Flight',
      pricePerPerson: 380,
      icon: <Plane size={16} />
    },
    {
      id: 'mekong-cruise',
      name: 'Mekong River Sunset Dinner Cruise',
      pricePerPerson: 75,
      icon: <Compass size={16} />
    },
    {
      id: 'rainforest-trek',
      name: 'Cardamoms Private Ranger Eco-Trek',
      pricePerPerson: 130,
      icon: <Compass size={16} />
    },
    {
      id: 'culinary-class',
      name: 'Private Khmer Cooking & Spice Tour',
      pricePerPerson: 65,
      icon: <Compass size={16} />
    }
  ];

  // 3. Dynamic Calculation logic
  const accommodationCost = days * tierPricing[tier].rate;
  const transportCost = days * transportPricing[transport].rate;
  
  const activitiesCost = activityOptions
    .filter(act => selectedActivities.includes(act.id))
    .reduce((sum, act) => sum + (act.pricePerPerson * travelers), 0);
  
  const baseTotal = accommodationCost + transportCost + activitiesCost;
  const conciergeFee = Math.round(baseTotal * 0.08); // 8% luxury service fee
  const total = baseTotal + conciergeFee;

  const breakdown = {
    accommodation: accommodationCost,
    transport: transportCost,
    activities: activitiesCost,
    conciergeFee: conciergeFee,
    total: total
  };

  // Toggle activity selection
  const handleActivityToggle = (id) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(selectedActivities.filter(actId => actId !== id));
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  // Main Statement Card renderer
  const renderStatementContent = () => (
    <div className="bg-[#FAF8F5] border border-brand-gold/30 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative ambient background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-gold/10 blur-2xl pointer-events-none" />

      <div className="space-y-6 relative z-10">
        {/* Statement Brand Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase">
            <span>BESPOKE STATEMENT</span>
          </div>
          <h3 className="font-cormorant text-2xl tracking-[0.2em] font-normal text-brand-dark uppercase">
            ANGKOR LUX
          </h3>
          <span className="font-sans text-[10px] tracking-[0.25em] text-brand-dark/50 uppercase block">
            Tailored Expedition Estimate
          </span>
          <div className="w-12 h-[1px] bg-brand-gold/40 mx-auto pt-1" />
        </div>

        {/* Statement Details */}
        <div className="flex justify-between items-end text-xs font-sans text-brand-dark/60 border-b border-brand-gold/15 pb-4">
          <div>
            <span className="block text-[10px] tracking-wider font-bold text-brand-dark/40 uppercase">PREPARED FOR</span>
            <span className="block mt-0.5 font-semibold text-brand-dark">Honored Guest</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] tracking-wider font-bold text-brand-dark/40 uppercase">STATEMENT NO.</span>
            <span className="block mt-0.5 font-mono text-brand-gold-dark font-semibold">#AL-{days}D{travelers}G-2026</span>
          </div>
        </div>

        {/* Itemized Estimate List */}
        <div className="space-y-3.5 py-1 text-sm">
          <div className="flex justify-between items-center">
            <span className="font-sans text-xs font-light text-brand-dark/80">
              Sanctuary Lodging ({days} nights, <span className="capitalize font-medium">{tier}</span>)
            </span>
            <span className="font-cormorant text-base font-semibold text-brand-dark">${breakdown.accommodation}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-sans text-xs font-light text-brand-dark/80">
              Private Transfers ({days} days, <span className="capitalize font-medium">{transport === 'tuk-tuk' ? 'Tuk-Tuk' : transport === 'chauffeur' ? 'Chauffeur' : 'Flights'}</span>)
            </span>
            <span className="font-cormorant text-base font-semibold text-brand-dark">${breakdown.transport}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-sans text-xs font-light text-brand-dark/80">
              Curated Excursions ({travelers} {travelers === 1 ? 'guest' : 'guests'})
            </span>
            <span className="font-cormorant text-base font-semibold text-brand-dark">${breakdown.activities}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-sans text-xs font-light text-brand-dark/80">
              Concierge Service Fee (8%)
            </span>
            <span className="font-cormorant text-base font-semibold text-brand-dark">${breakdown.conciergeFee}</span>
          </div>
        </div>

        {/* Total Estimate */}
        <div className="pt-4 border-t border-brand-gold/25">
          <div className="flex justify-between items-baseline">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark">Estimated Total</span>
            <span className="font-cormorant text-3xl font-normal text-brand-gold-dark">
              ${breakdown.total} <span className="text-xs font-sans text-brand-dark/50 uppercase tracking-widest font-normal">USD</span>
            </span>
          </div>
        </div>

        {/* Concierge Handwritten note */}
        <div className="pt-4 border-t border-brand-gold/15 space-y-2 text-center">
          <p className="font-handwritten text-brand-gold-dark text-lg leading-relaxed max-w-xs mx-auto">
            "Each pilgrimage is a unique canvas. We curate every journey with absolute devotion to detail."
          </p>
          <div>
            <span className="font-handwritten text-brand-gold-dark text-xl block whitespace-nowrap">
              Sophea & The Angkor Lux Team
            </span>
            <span className="font-sans text-[10px] tracking-widest text-brand-dark/40 uppercase block mt-0.5">
              Lead Concierge
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-6 mt-6 border-t border-brand-gold/20 relative z-10">
        <button
          type="button"
          onClick={() => {
            setShowMobileDrawer(false);
            setShowSuccessModal(true);
          }}
          className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2.5 rounded-full shadow-lg shadow-brand-gold/20 cursor-pointer group"
        >
          <span className="leading-none pt-[1px]">Submit to Travel Architect</span>
          <ArrowRight size={15} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <div className="text-center text-[10px] text-brand-dark/50 font-light pt-2.5">
          *Rates are subject to high/low season occupancy details.
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-28 bg-brand-cream font-sans text-brand-dark min-h-screen relative">
      {/* Top Banner Header */}
      <header className="bg-brand-forest text-brand-cream-dark pt-14 pb-16 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10 animate-fade-in">
          <div className="inline-flex items-center bg-brand-gold/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-gold/30">
            <span className="font-handwritten text-brand-gold text-base sm:text-lg tracking-wide">
              Crafting Your Custom Cambodian Expedition
            </span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.15em] text-white leading-tight uppercase">
            Plan Your Journey
          </h1>
          
          <p className="font-sans text-sm sm:text-base font-light text-brand-cream-dark/85 max-w-xl mx-auto leading-relaxed">
            Welcome to your digital concierge. Select your preferences below to calculate a tailored itinerary estimate in real time.
          </p>
        </div>
      </header>

      {/* Main Split Layout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Planner Sections */}
          <div className="lg:col-span-8 space-y-10 animate-fade-in">
            
            {/* SECTION 1: Pacing & Companions */}
            <section className="bg-white/60 backdrop-blur-md border border-brand-gold/20 p-6 md:p-8 rounded-3xl shadow-lg space-y-8">
              <div className="border-b border-brand-gold/15 pb-4 flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark text-xs font-bold font-mono">1</div>
                <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">Journey Pacing & Companions</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Duration Counter */}
                <div className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-brand-gold/15 shadow-xs">
                  <label className="font-cormorant text-xl font-normal text-brand-dark block text-center">
                    Duration of Your Journey
                  </label>
                  <div className="flex items-center justify-center space-x-6 pb-2 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => setDays(Math.max(3, days - 1))}
                      className="w-11 h-11 rounded-full border border-brand-gold/30 bg-white flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all active:scale-95 cursor-pointer shadow-xs"
                      aria-label="Decrease days"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-cormorant text-4xl font-light text-brand-gold-dark min-w-[65px] text-center">
                      {days} <span className="text-xs font-sans text-brand-dark/50 uppercase font-normal block -mt-1">Days</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setDays(Math.min(21, days + 1))}
                      className="w-11 h-11 rounded-full border border-brand-gold/30 bg-white flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all active:scale-95 cursor-pointer shadow-xs"
                      aria-label="Increase days"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-sans text-xs text-brand-dark/60 text-center leading-relaxed font-light">
                    Minimum 3 days. Recommend at least 7 days to absorb Siem Reap and the southern coast.
                  </p>
                </div>

                {/* Travelers Counter */}
                <div className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-brand-gold/15 shadow-xs">
                  <label className="font-cormorant text-xl font-normal text-brand-dark block text-center">
                    Number of Honored Guests
                  </label>
                  <div className="flex items-center justify-center space-x-6 pb-2 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-11 h-11 rounded-full border border-brand-gold/30 bg-white flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all active:scale-95 cursor-pointer shadow-xs"
                      aria-label="Decrease guests"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-cormorant text-4xl font-light text-brand-gold-dark min-w-[65px] text-center">
                      {travelers} <span className="text-xs font-sans text-brand-dark/50 uppercase font-normal block -mt-1">Guests</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.min(10, travelers + 1))}
                      className="w-11 h-11 rounded-full border border-brand-gold/30 bg-white flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all active:scale-95 cursor-pointer shadow-xs"
                      aria-label="Increase guests"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-sans text-xs text-brand-dark/60 text-center leading-relaxed font-light">
                    Private bespoke transfers are designed for intimate groups of up to 10 guests.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: Sanctuary Lodging */}
            <section className="bg-white/60 backdrop-blur-md border border-brand-gold/20 p-6 md:p-8 rounded-3xl shadow-lg space-y-6">
              <div className="border-b border-brand-gold/15 pb-4 flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark text-xs font-bold font-mono">2</div>
                <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">Sanctuary Lodging</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(tierPricing).map(([key, value]) => {
                  const isSelected = tier === key;
                  const imageMap = {
                    boutique: galleryCorridor,
                    luxury: phnomPenhPalace,
                    ultra: heroAngkor
                  };
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTier(key)}
                      className={`group relative text-left bg-[#FAF8F5] rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-xl scale-[1.02] border-transparent' 
                          : 'border border-brand-gold/20 hover:border-brand-gold/40 hover:shadow-lg'
                      }`}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={imageMap[key]} 
                          alt={value.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/10 transition-colors" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-gold/20 mix-blend-overlay pointer-events-none" />
                        )}
                        {key === 'luxury' && (
                          <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
                            Signature Choice
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <h4 className="font-cormorant text-2xl font-normal text-brand-dark capitalize">
                            {key === 'boutique' ? 'Boutique Heritage' : key === 'luxury' ? 'Luxury Resort' : 'Ultra-Luxury Villa'}
                          </h4>
                          <p className="font-sans text-xs font-light text-brand-dark/75 leading-relaxed">
                            {key === 'boutique' && 'Premium heritage properties, colonial guest houses, and local boutique hotels.'}
                            {key === 'luxury' && 'Private luxury suites, curated wellness spas, and lavish resort pools.'}
                            {key === 'ultra' && 'Ultra-luxury estates, dedicated butler service, and ultimate beachfront privacy.'}
                          </p>
                        </div>

                        <div className="pt-3 flex justify-between items-baseline border-t border-brand-gold/15">
                          <span className="font-sans text-[10px] tracking-widest text-brand-dark/50 uppercase font-semibold">Nightly Rate</span>
                          <span className="font-cormorant text-2xl font-normal text-brand-gold-dark">${value.rate} <span className="font-sans text-xs text-brand-dark/50 font-light">/ night</span></span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold rounded-2xl pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: Local Navigation */}
            <section className="bg-white/60 backdrop-blur-md border border-brand-gold/20 p-6 md:p-8 rounded-3xl shadow-lg space-y-6">
              <div className="border-b border-brand-gold/15 pb-4 flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark text-xs font-bold font-mono">3</div>
                <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">Local Navigation</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(transportPricing).map(([key, value]) => {
                  const isSelected = transport === key;
                  const imageMap = {
                    'tuk-tuk': tonleSap,
                    chauffeur: bokorHill,
                    'domestic-flights': preahVihear
                  };
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTransport(key)}
                      className={`group relative text-left bg-[#FAF8F5] rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-xl scale-[1.02] border-transparent' 
                          : 'border border-brand-gold/20 hover:border-brand-gold/40 hover:shadow-lg'
                      }`}
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={imageMap[key]} 
                          alt={value.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/10 transition-colors" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-gold/20 mix-blend-overlay pointer-events-none" />
                        )}
                        {key === 'chauffeur' && (
                          <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <h4 className="font-cormorant text-2xl font-normal text-brand-dark">
                            {key === 'tuk-tuk' ? 'Tuk-Tuk Explorer' : key === 'chauffeur' ? 'Private Chauffeur' : 'Regional Flights'}
                          </h4>
                          <p className="font-sans text-xs font-light text-brand-dark/75 leading-relaxed">
                            {key === 'tuk-tuk' && 'Traditional open-air local transport for an authentic, breezy neighborhood tour.'}
                            {key === 'chauffeur' && 'Air-conditioned luxury SUV with dedicated private English guide.'}
                            {key === 'domestic-flights' && 'Private chauffeur service combined with domestic flights between provinces.'}
                          </p>
                        </div>

                        <div className="pt-3 flex justify-between items-baseline border-t border-brand-gold/15">
                          <span className="font-sans text-[10px] tracking-widest text-brand-dark/50 uppercase font-semibold">Daily Rate</span>
                          <span className="font-cormorant text-2xl font-normal text-brand-gold-dark">${value.rate} <span className="font-sans text-xs text-brand-dark/50 font-light">/ day</span></span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold rounded-2xl pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 4: Curated Excursions */}
            <section className="bg-white/60 backdrop-blur-md border border-brand-gold/20 p-6 md:p-8 rounded-3xl shadow-lg space-y-6">
              <div className="border-b border-brand-gold/15 pb-4 flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark text-xs font-bold font-mono">4</div>
                <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">Curated Excursions</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activityOptions.map((act) => {
                  const isSelected = selectedActivities.includes(act.id);
                  const imageMap = {
                    'angkor-sunrise': heroAngkor,
                    helicopter: cardamomMountains,
                    'mekong-cruise': galleryBoat,
                    'rainforest-trek': galleryForest,
                    'culinary-class': cambodianCulinary
                  };
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => handleActivityToggle(act.id)}
                      className={`group relative text-left bg-brand-dark rounded-2xl overflow-hidden transition-all duration-500 h-72 flex flex-col justify-end cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-xl scale-[1.02]' 
                          : 'border border-brand-gold/20 hover:border-brand-gold/40'
                      }`}
                    >
                      <img 
                        src={imageMap[act.id]} 
                        alt={act.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-brand-gold/15 mix-blend-overlay pointer-events-none" />
                      )}
                      
                      {/* Check badge overlay */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-brand-gold bg-brand-gold text-brand-dark scale-110 shadow' : 'border-white/40 bg-black/50 backdrop-blur-xs text-white'
                        }`}>
                          {isSelected ? (
                            <Check size={16} className="text-brand-dark stroke-[3]" />
                          ) : (
                            <span className="font-sans text-sm text-white/70 font-semibold">+</span>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 p-6 space-y-2">
                        <span className="font-sans text-[10px] font-bold tracking-widest text-brand-gold uppercase block">
                          Private Excursion
                        </span>
                        <h4 className="font-cormorant text-2xl font-normal text-white leading-tight">
                          {act.name}
                        </h4>
                        <p className="font-sans text-xs font-light text-brand-cream-dark/85 line-clamp-2 leading-relaxed">
                          {act.id === 'angkor-sunrise' && 'Witness sunrise over Angkor Wat before exploring key galleries with a lead historian.'}
                          {act.id === 'helicopter' && 'Fly above Siem Reap temples and the vast Tonle Sap lake on a scenic private flight.'}
                          {act.id === 'mekong-cruise' && 'Glide past floating villages on a restored traditional barge while dining on local gourmet recipes.'}
                          {act.id === 'rainforest-trek' && 'Trek alongside forest rangers through cardamom sanctuaries to spot wild elephants.'}
                          {act.id === 'culinary-class' && 'Pick fresh lemongrass and craft classic Royal Khmer recipes with a master chef.'}
                        </p>
                        <div className="pt-2 flex justify-between items-baseline border-t border-white/15">
                          <span className="font-sans text-[10px] text-brand-cream-dark/60 uppercase font-semibold">Rate Per Guest</span>
                          <span className="font-cormorant text-xl font-normal text-brand-gold-light">${act.pricePerPerson} USD</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold rounded-2xl pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Compiled Statement invoice panel (Desktop only) */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
            {renderStatementContent()}
          </div>

        </div>
      </main>

      {/* Floating Bottom Bar for Mobile layout */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 border-t border-brand-gold/30 p-4 flex justify-between items-center shadow-2xl backdrop-blur-md">
        <div className="flex flex-col text-left">
          <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Estimated Total</span>
          <span className="font-cormorant text-2xl text-white font-normal mt-0.5">${breakdown.total} USD</span>
        </div>
        <button
          type="button"
          onClick={() => setShowMobileDrawer(true)}
          className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-full transition-all active:scale-95 shadow-lg shadow-brand-gold/20 cursor-pointer flex items-center space-x-1.5"
        >
          <span>View Estimate</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Mobile Drawer (Slide-up modal detailing the estimate breakdown) */}
      {showMobileDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm flex items-end animate-fade-in" onClick={() => setShowMobileDrawer(false)}>
          <div 
            className="w-full bg-[#FAF8F5] max-h-[88vh] overflow-y-auto p-4 rounded-t-3xl relative animate-fade-in border-t border-brand-gold/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon drawer */}
            <button
              onClick={() => setShowMobileDrawer(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark transition-colors cursor-pointer bg-white"
              aria-label="Close summary"
            >
              <X size={16} />
            </button>
            <div className="pt-6">
              {renderStatementContent()}
            </div>
          </div>
        </div>
      )}

      {/* Cool Luxury Travel Architect Confirmation Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-dark/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-[#18130E] border border-brand-gold/40 text-brand-cream rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl relative overflow-hidden space-y-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient background glows */}
            <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-brand-gold/30 flex items-center justify-center text-brand-cream-dark/70 hover:text-white hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-all cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Header Icon & Title */}
            <div className="text-center space-y-3 relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center mx-auto text-brand-gold shadow-lg shadow-brand-gold/20">
                <CheckCircle2 size={32} className="text-brand-gold animate-bounce" />
              </div>

              <div className="inline-flex items-center bg-brand-gold/15 px-4 py-1 rounded-full border border-brand-gold/30 text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase">
                <span>BESPOKE EXPEDITION SUBMITTED</span>
              </div>

              <h3 className="font-cormorant text-3xl sm:text-4xl text-white font-normal uppercase tracking-wider leading-tight">
                Itinerary Transmitted
              </h3>
              <p className="font-sans text-xs text-brand-cream-dark/80 font-light leading-relaxed max-w-sm mx-auto">
                Your custom Cambodian journey specifications have been successfully delivered to our Lead Concierge desk.
              </p>
            </div>

            {/* Quote Summary Ticket Box */}
            <div className="bg-white/5 border border-brand-gold/25 rounded-2xl p-5 space-y-3 relative z-10">
              <div className="flex justify-between items-center border-b border-brand-gold/15 pb-2.5">
                <span className="text-[10px] text-brand-gold font-bold tracking-widest uppercase">SPECIFICATION TICKET</span>
                <span className="font-mono text-xs text-brand-cream-dark/70">#AL-{days}D{travelers}G-2026</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-brand-cream-dark/50 uppercase block font-semibold">Duration & Guests</span>
                  <span className="font-medium text-white">{days} Days / {travelers} Guests</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-cream-dark/50 uppercase block font-semibold">Sanctuary Lodging</span>
                  <span className="font-medium text-white capitalize">{tier}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-cream-dark/50 uppercase block font-semibold">Private Transport</span>
                  <span className="font-medium text-white capitalize">{transport === 'tuk-tuk' ? 'Tuk-Tuk' : transport === 'chauffeur' ? 'Chauffeur' : 'Flights'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-cream-dark/50 uppercase block font-semibold">Excursions Included</span>
                  <span className="font-medium text-white">{selectedActivities.length} Experiences</span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-gold/20 flex justify-between items-baseline">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Compiled Estimate</span>
                <span className="font-cormorant text-2xl text-brand-gold font-bold">${breakdown.total} USD</span>
              </div>
            </div>

            {/* Concierge Note */}
            <div className="text-center space-y-1 relative z-10">
              <p className="font-handwritten text-brand-gold text-base">
                "Sophea will contact you within 2 hours with your private reservation privileges."
              </p>
              <span className="font-sans text-[10px] tracking-widest text-brand-cream-dark/40 uppercase block">
                Angkor Lux Concierge Desk • Siem Reap
              </span>
            </div>

            {/* Modal Action Buttons */}
            <div className="pt-2 relative z-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-gold/20 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>DONE & RETURN TO PLANNER</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
