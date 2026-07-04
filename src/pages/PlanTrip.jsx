import { useState } from 'react';
import { Plane, Compass, ArrowRight, Minus, Plus, X } from 'lucide-react';

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

  // 3. Dynamic Calculation logic (Calculated during render to prevent cascading updates)
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

  // Main Statement Card renderer, reused in both sticky sidebar and mobile drawer
  const renderStatementContent = () => (
    <div className="bg-[#FCFAF8] border border-brand-gold/20 p-6 md:p-8 rounded-none shadow-xl flex flex-col justify-between h-full relative">
      {/* Decorative inner border */}
      <div className="absolute inset-2 border border-brand-gold/5 pointer-events-none" />

      <div className="space-y-6 relative z-10">
        {/* Statement Brand Header */}
        <div className="text-center">
          <span className="font-cormorant text-2xl tracking-[0.2em] font-light text-brand-dark block whitespace-nowrap">
            ANGKOR PRESTIGE
          </span>
          <span className="font-inter text-[9px] tracking-[0.3em] text-brand-dark/40 uppercase block mt-1">
            Private Journeys
          </span>
          <div className="w-10 h-px bg-brand-gold/35 mx-auto mt-3" />
        </div>

        {/* Statement Details */}
        <div className="flex justify-between items-end text-[11px] font-inter text-brand-dark/50 border-b border-brand-gold/10 pb-3">
          <div>
            <span className="block font-medium text-brand-dark/65">PREPARED FOR:</span>
            <span className="block mt-0.5 font-semibold text-brand-dark">Honored Guest</span>
          </div>
          <div className="text-right">
            <span className="block font-medium text-brand-dark/65">STATEMENT NO:</span>
            <span className="block mt-0.5 font-mono">#AP-{days}D{travelers}G-2026</span>
          </div>
        </div>

        {/* Itemized Estimate List (All text sizes >= 15px as required) */}
        <div className="space-y-4 py-2">
          <div className="flex justify-between items-baseline">
            <span className="font-inter text-[15px] text-brand-dark/60 font-light">
              Accommodation ({days} nights, {tier === 'boutique' ? 'Boutique' : tier === 'luxury' ? 'Luxury' : 'Ultra-Luxury'})
            </span>
            <span className="font-cormorant text-lg text-brand-dark font-medium">${breakdown.accommodation}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-inter text-[15px] text-brand-dark/60 font-light">
              Private Transport ({days} days, {transport === 'tuk-tuk' ? 'Tuk-Tuk' : transport === 'chauffeur' ? 'Chauffeur' : 'Flights'})
            </span>
            <span className="font-cormorant text-lg text-brand-dark font-medium">${breakdown.transport}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-inter text-[15px] text-brand-dark/60 font-light">
              Private Excursions ({travelers} {travelers === 1 ? 'guest' : 'guests'})
            </span>
            <span className="font-cormorant text-lg text-brand-dark font-medium">${breakdown.activities}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-inter text-[15px] text-brand-dark/60 font-light">
              Concierge Booking Fee (8%)
            </span>
            <span className="font-cormorant text-lg text-brand-dark font-medium">${breakdown.conciergeFee}</span>
          </div>
        </div>

        {/* Total Estimate */}
        <div className="pt-4 border-t border-brand-gold/20">
          <div className="flex justify-between items-baseline">
            <span className="font-inter text-[15px] uppercase tracking-wider text-brand-dark font-semibold">Estimated Total</span>
            <span className="font-cormorant text-3xl font-light text-brand-gold-dark">
              ${breakdown.total} <span className="text-xs text-brand-dark/50 uppercase tracking-widest font-inter">usd</span>
            </span>
          </div>
        </div>

        {/* Concierge Handwritten note */}
        <div className="pt-4 border-t border-brand-gold/10 space-y-3 text-center">
          <p className="font-handwritten text-[#A47D23] text-xl leading-relaxed max-w-xs mx-auto">
            "Each pilgrimage is a unique canvas. We curate every journey with absolute devotion to detail."
          </p>
          <div>
            <span className="font-handwritten text-[#A47D23] text-2xl block whitespace-nowrap">
              Sophea & The Angkor Prestige Team
            </span>
            <span className="font-inter text-[10px] tracking-wider text-brand-dark/40 uppercase block mt-0.5">
              Lead Concierge
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-6 mt-6 border-t border-brand-gold/15 relative z-10">
        <button
          type="button"
          onClick={() => {
            alert(`Quote Request Sent!\nYour compiled estimate total is $${breakdown.total} USD.\nLead Concierge Sophea will contact you shortly.`);
          }}
          className="w-full bg-[#C59E3F] hover:bg-[#E5C36E] text-brand-dark py-3.5 text-[15px] font-inter font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 shadow-md shadow-brand-gold/10 cursor-pointer"
        >
          <span>Submit to Travel Architect</span>
          <ArrowRight size={15} />
        </button>
        <div className="text-center text-[10px] text-brand-dark/45 font-light pt-2.5">
          *Rates are subject to high/low season occupancy details.
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-32 bg-brand-cream font-inter text-brand-dark min-h-screen relative">
      {/* Top Banner Header */}
      <header className="bg-brand-forest text-brand-cream-dark pt-32 pb-14 px-6 md:px-12 text-center relative">
        <div className="max-w-4xl mx-auto space-y-3 animate-fade-in">
          <span className="font-handwritten text-brand-gold text-2xl md:text-3xl tracking-wide block">
            Curating your bespoke pilgrimage
          </span>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light tracking-tight text-white leading-tight uppercase">
            Plan Your Journey
          </h1>
          <p className="font-inter text-[15px] md:text-[17px] font-light text-brand-cream-dark/70 max-w-xl mx-auto leading-relaxed">
            Welcome to your digital concierge. Adjust details on the left, and watch your statement calculate instantly on the right.
          </p>
        </div>
      </header>

      {/* Main Split Layout Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Planner Sections */}
          <div className="lg:col-span-8 space-y-12 animate-fade-in">
            
            {/* SECTION 1: Pacing & Companions */}
            <section className="bg-white/35 backdrop-blur-xs border border-brand-gold/15 p-6 md:p-8 space-y-8">
              <div className="border-b border-brand-gold/15 pb-3 flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-xs font-serif font-bold">1</div>
                <h3 className="font-cormorant text-2xl font-light uppercase tracking-wider text-brand-dark">Journey Pacing & Companions</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Duration Counter */}
                <div className="space-y-3 p-4 bg-[#FCFAF8] border border-brand-gold/5">
                  <label className="font-cormorant text-xl font-light text-brand-dark block text-center">
                    How many days are you dreaming of?
                  </label>
                  <div className="flex items-center justify-center space-x-6 pb-2 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => setDays(Math.max(3, days - 1))}
                      className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/15 transition-all active:scale-95 cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-cormorant text-3xl font-light text-brand-dark min-w-[60px] text-center">
                      {days}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDays(Math.min(21, days + 1))}
                      className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/15 transition-all active:scale-95 cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-inter text-xs text-brand-dark/45 text-center leading-normal">
                    Minimum 3 days. Recommend at least 7 days to absorb Siem Reap and the southern coast.
                  </p>
                </div>

                {/* Travelers Counter */}
                <div className="space-y-3 p-4 bg-[#FCFAF8] border border-brand-gold/5">
                  <label className="font-cormorant text-xl font-light text-brand-dark block text-center">
                    How many are travelling?
                  </label>
                  <div className="flex items-center justify-center space-x-6 pb-2 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/15 transition-all active:scale-95 cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-cormorant text-3xl font-light text-brand-dark min-w-[60px] text-center">
                      {travelers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.min(10, travelers + 1))}
                      className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/15 transition-all active:scale-95 cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-inter text-xs text-brand-dark/45 text-center leading-normal">
                    Private bespoke transfers are designed for intimate groups of up to 10 guests.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: Sanctuary Lodging */}
            <section className="bg-white/35 backdrop-blur-xs border border-brand-gold/15 p-6 md:p-8 space-y-6">
              <div className="border-b border-brand-gold/15 pb-3 flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-xs font-serif font-bold">2</div>
                <h3 className="font-cormorant text-2xl font-light uppercase tracking-wider text-brand-dark">Sanctuary Lodging</h3>
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
                      className={`group relative text-left bg-[#FCFAF8] overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-md scale-[1.01]' 
                          : 'border border-brand-gold/10 hover:border-brand-gold/25 hover:shadow-sm'
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={imageMap[key]} 
                          alt={value.label} 
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-brand-dark/15 group-hover:bg-brand-dark/5 transition-colors" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-gold/15 mix-blend-overlay pointer-events-none" />
                        )}
                        {key === 'luxury' && (
                          <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark font-inter text-[9px] font-bold tracking-wider uppercase px-2 py-0.5">
                            Signature
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h4 className="font-cormorant text-xl font-light text-brand-dark capitalize">
                            {key === 'boutique' ? 'Boutique Heritage' : key === 'luxury' ? 'Luxury Resort' : 'Ultra-Luxury Villa'}
                          </h4>
                          <p className="font-inter text-[15px] font-light text-brand-dark/70 leading-relaxed">
                            {key === 'boutique' && 'Premium heritage properties, colonial guest houses, and local boutique hotels.'}
                            {key === 'luxury' && 'Private luxury suites, curated wellness spas, and lavish resort pools.'}
                            {key === 'ultra' && 'Ultra-luxury estates, dedicated butler service, and ultimate beachfront privacy.'}
                          </p>
                        </div>
                        <div className="pt-2 flex justify-between items-baseline border-t border-brand-gold/10">
                          <span className="font-inter text-[11px] tracking-wider text-brand-dark/40 uppercase">Investment Rate</span>
                          <span className="font-cormorant text-xl font-light text-brand-gold-dark">${value.rate} <span className="font-inter text-xs text-brand-dark/40 lowercase">/ night</span></span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: Local Navigation */}
            <section className="bg-white/35 backdrop-blur-xs border border-brand-gold/15 p-6 md:p-8 space-y-6">
              <div className="border-b border-brand-gold/15 pb-3 flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-xs font-serif font-bold">3</div>
                <h3 className="font-cormorant text-2xl font-light uppercase tracking-wider text-brand-dark">Local Navigation</h3>
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
                      className={`group relative text-left bg-[#FCFAF8] overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-md scale-[1.01]' 
                          : 'border border-brand-gold/10 hover:border-brand-gold/25 hover:shadow-sm'
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={imageMap[key]} 
                          alt={value.label} 
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-brand-dark/15 group-hover:bg-brand-dark/5 transition-colors" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-gold/15 mix-blend-overlay pointer-events-none" />
                        )}
                        {key === 'chauffeur' && (
                          <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark font-inter text-[9px] font-bold tracking-wider uppercase px-2 py-0.5">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <h4 className="font-cormorant text-xl font-light text-brand-dark">
                            {key === 'tuk-tuk' ? 'Tuk-Tuk Explorer' : key === 'chauffeur' ? 'Private Chauffeur' : 'Regional Flights'}
                          </h4>
                          <p className="font-inter text-[15px] font-light text-brand-dark/70 leading-relaxed">
                            {key === 'tuk-tuk' && 'Traditional open-air local transport for an authentic, breezy neighborhood tour.'}
                            {key === 'chauffeur' && 'Air-conditioned luxury SUV with dedicated private English guide.'}
                            {key === 'domestic-flights' && 'Private chauffeur service combined with domestic flights between provinces.'}
                          </p>
                        </div>
                        <div className="pt-2 flex justify-between items-baseline border-t border-brand-gold/10">
                          <span className="font-inter text-[11px] tracking-wider text-brand-dark/40 uppercase">Daily rate</span>
                          <span className="font-cormorant text-xl font-light text-brand-gold-dark">${value.rate} <span className="font-inter text-xs text-brand-dark/40 lowercase">/ day</span></span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 4: Curated Excursions */}
            <section className="bg-white/35 backdrop-blur-xs border border-brand-gold/15 p-6 md:p-8 space-y-6">
              <div className="border-b border-brand-gold/15 pb-3 flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-xs font-serif font-bold">4</div>
                <h3 className="font-cormorant text-2xl font-light uppercase tracking-wider text-brand-dark">Curated Excursions</h3>
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
                      className={`group relative text-left bg-brand-dark overflow-hidden transition-all duration-300 h-64 flex flex-col justify-end cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-md scale-[1.01]' 
                          : 'border border-brand-gold/10 hover:border-brand-gold/25'
                      }`}
                    >
                      <img 
                        src={imageMap[act.id]} 
                        alt={act.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/25 to-transparent" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-brand-gold/15 mix-blend-overlay pointer-events-none" />
                      )}
                      
                      {/* Check badge overlay */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-brand-gold bg-brand-gold text-brand-dark scale-110' : 'border-white/30 bg-black/40 text-white'
                        }`}>
                          {isSelected ? (
                            <span className="font-inter text-xs font-bold">✓</span>
                          ) : (
                            <span className="font-inter text-xs text-white/50">+</span>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 p-5 space-y-1.5">
                        <span className="font-inter text-[10px] font-semibold tracking-wider text-brand-gold uppercase">
                          Private Excursion
                        </span>
                        <h4 className="font-cormorant text-xl font-light text-white leading-tight">
                          {act.name}
                        </h4>
                        <p className="font-inter text-[15px] font-light text-white/80 line-clamp-2 max-w-sm leading-relaxed">
                          {act.id === 'angkor-sunrise' && 'Witness sunrise over Angkor Wat before exploring key galleries with a lead historian.'}
                          {act.id === 'helicopter' && 'Fly above Siem Reap temples and the vast Tonle Sap lake on a scenic private flight.'}
                          {act.id === 'mekong-cruise' && 'Glide past floating villages on a restored traditional barge while dining on local gourmet recipes.'}
                          {act.id === 'rainforest-trek' && 'Trek alongside forest rangers through cardamom sanctuaries to spot wild elephants.'}
                          {act.id === 'culinary-class' && 'Pick fresh lemongrass and craft classic Royal Khmer recipes with a master chef.'}
                        </p>
                        <div className="pt-1.5 flex justify-between items-baseline border-t border-white/10">
                          <span className="font-inter text-[10px] text-white/50 uppercase">Rate per guest</span>
                          <span className="font-cormorant text-lg font-light text-brand-gold-light">${act.pricePerPerson} USD</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold pointer-events-none" />
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

      {/* Floating Bottom Bar for Mobile layout (visible when summary card is hidden) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 border-t border-brand-gold/25 p-4 flex justify-between items-center shadow-2xl backdrop-blur-md">
        <div className="flex flex-col text-left">
          <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">Estimated Cost</span>
          <span className="font-cormorant text-2xl text-white font-light mt-0.5">${breakdown.total} USD</span>
        </div>
        <button
          type="button"
          onClick={() => setShowMobileDrawer(true)}
          className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-5 py-3 text-xs font-semibold tracking-wider uppercase rounded-none transition-all active:scale-95 shadow-md shadow-brand-gold/15 cursor-pointer"
        >
          View Estimate Summary
        </button>
      </div>

      {/* Mobile Drawer (Slide-up modal detailing the estimate breakdown) */}
      {showMobileDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-brand-dark/60 backdrop-blur-xs flex items-end animate-fade-in" onClick={() => setShowMobileDrawer(false)}>
          <div 
            className="w-full bg-[#FCFAF8] max-h-[85vh] overflow-y-auto p-4 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon drawer */}
            <button
              onClick={() => setShowMobileDrawer(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-brand-gold/25 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <div className="pt-6">
              {renderStatementContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
