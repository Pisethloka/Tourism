import React, { useState, useEffect } from 'react';
import { Plane, Compass, ArrowRight, Minus, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface ActivityOption {
  id: string;
  name: string;
  pricePerPerson: number;
  icon: React.ReactNode;
}

export const PlanTrip: React.FC = () => {
  // 1. Wizard Step State
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 2. Calculator Input States
  const [days, setDays] = useState<number>(7);
  const [travelers, setTravelers] = useState<number>(2);
  const [tier, setTier] = useState<'boutique' | 'luxury' | 'ultra'>('luxury');
  const [transport, setTransport] = useState<'tuk-tuk' | 'chauffeur' | 'domestic-flights'>('chauffeur');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'angkor-sunrise',
    'mekong-cruise'
  ]);

  // 3. UI interaction states
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [hasMadeChoices, setHasMadeChoices] = useState<boolean>(false);

  // 4. Pricing Database
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

  const activityOptions: ActivityOption[] = [
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

  // 5. Dynamic Calculation logic
  const [breakdown, setBreakdown] = useState({
    accommodation: 0,
    transport: 0,
    activities: 0,
    conciergeFee: 0,
    total: 0
  });

  useEffect(() => {
    const accommodationCost = days * tierPricing[tier].rate;
    const transportCost = days * transportPricing[transport].rate;
    
    const activitiesCost = activityOptions
      .filter(act => selectedActivities.includes(act.id))
      .reduce((sum, act) => sum + (act.pricePerPerson * travelers), 0);
    
    const baseTotal = accommodationCost + transportCost + activitiesCost;
    const fee = Math.round(baseTotal * 0.08); // 8% luxury service fee
    const grandTotal = baseTotal + fee;

    setBreakdown({
      accommodation: accommodationCost,
      transport: transportCost,
      activities: activitiesCost,
      conciergeFee: fee,
      total: grandTotal
    });
  }, [days, travelers, tier, transport, selectedActivities]);

  // Track if user has modified anything from initial state to trigger summary slide-in
  useEffect(() => {
    if (
      days !== 7 ||
      travelers !== 2 ||
      tier !== 'luxury' ||
      transport !== 'chauffeur' ||
      selectedActivities.length !== 2
    ) {
      if (!hasMadeChoices) {
        setHasMadeChoices(true);
        setShowSummary(true); // slide in summary panel
      }
    }
  }, [days, travelers, tier, transport, selectedActivities, hasMadeChoices]);

  const handleActivityToggle = (id: string) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(selectedActivities.filter(actId => actId !== id));
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  return (
    <div className="pb-32 bg-brand-cream font-inter text-brand-dark min-h-screen relative overflow-x-hidden">
      {/* Dark olive/charcoal header matching the reference design details */}
      <header className="bg-brand-forest text-brand-cream-dark pt-32 pb-16 px-6 md:px-12 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
          <span className="font-handwritten text-brand-gold text-2xl md:text-3xl tracking-wide block">
            Curating your bespoke pilgrimage
          </span>
          <h1 className="font-cormorant text-4xl md:text-6xl font-light tracking-tight text-white leading-tight uppercase">
            Plan Your Journey
          </h1>
          <p className="font-inter text-[16px] md:text-[18px] font-light text-brand-cream-dark/70 max-w-xl mx-auto leading-relaxed">
            Welcome to your digital concierge. Together, we will draft a proposal of private arrangements tailored to your pacing.
          </p>
        </div>
      </header>

      {/* Progress Step Indicator */}
      <div className="max-w-xl mx-auto px-6 pt-12 pb-6 flex justify-between items-center relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-brand-gold/20 -translate-y-1/2 z-0" />
        
        {[
          { step: 1, label: 'Details' },
          { step: 2, label: 'Lodging' },
          { step: 3, label: 'Travel' },
          { step: 4, label: 'Excursions' }
        ].map((item) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => {
                if (item.step <= currentStep || hasMadeChoices) {
                  setCurrentStep(item.step);
                }
              }}
              className="relative z-10 flex flex-col items-center group focus:outline-none"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-cormorant text-lg transition-all duration-300 ${
                isActive 
                  ? 'border-brand-gold bg-brand-gold text-brand-dark font-semibold scale-110 shadow-md shadow-brand-gold/10'
                  : isCompleted
                    ? 'border-brand-gold-dark bg-brand-dark text-brand-gold'
                    : 'border-brand-gold/20 bg-brand-cream text-brand-dark/40 group-hover:border-brand-gold/45'
              }`}>
                {isCompleted ? '✓' : item.step}
              </div>
              <span className={`font-inter text-[13px] tracking-wider uppercase mt-2 transition-colors duration-300 ${
                isActive ? 'text-brand-dark font-semibold' : 'text-brand-dark/40'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Wizard Area */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        
        <div className="bg-white/30 backdrop-blur-sm border border-brand-gold/10 p-8 md:p-12 space-y-12 min-h-[420px] flex flex-col justify-between">
          
          {/* STEP 1: Journey Details */}
          {currentStep === 1 && (
            <div className="space-y-12 py-6 max-w-xl mx-auto w-full animate-fade-in">
              {/* Duration Select */}
              <div className="space-y-4">
                <label className="font-cormorant text-3xl font-light text-brand-dark block text-center">
                  How many days are you dreaming of?
                </label>
                <div className="flex items-center justify-center space-x-6 border-b border-brand-gold/25 pb-4 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setDays(Math.max(3, days - 1))}
                    className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/10 transition-all active:scale-95"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-cormorant text-4xl font-light text-brand-dark min-w-[80px] text-center">
                    {days}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDays(Math.min(21, days + 1))}
                    className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/10 transition-all active:scale-95"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <p className="font-inter text-[15px] text-brand-dark/50 text-center">
                  Minimum 3 days. We recommend at least 7 days to absorb the magic of Angkor and coastal breezes.
                </p>
              </div>

              {/* Guest Count Select */}
              <div className="space-y-4 pt-4">
                <label className="font-cormorant text-3xl font-light text-brand-dark block text-center">
                  How many are travelling?
                </label>
                <div className="flex items-center justify-center space-x-6 border-b border-brand-gold/25 pb-4 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/10 transition-all active:scale-95"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-cormorant text-4xl font-light text-brand-dark min-w-[80px] text-center">
                    {travelers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.min(10, travelers + 1))}
                    className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold hover:bg-brand-cream-dark/10 transition-all active:scale-95"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <p className="font-inter text-[15px] text-brand-dark/50 text-center">
                  Private itineraries are curated for intimate groups of up to 10 guests.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Accommodation Picker */}
          {currentStep === 2 && (
            <div className="space-y-8 w-full animate-fade-in">
              <div className="text-center space-y-2">
                <h3 className="font-cormorant text-3xl font-light text-brand-dark">
                  Where would you like to rest?
                </h3>
                <p className="font-inter text-[16px] text-brand-dark/60 max-w-xl mx-auto">
                  Choose a sanctuary that matches your travel philosophy.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
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
                      onClick={() => setTier(key as any)}
                      className={`group relative text-left bg-[#FCFAF8] overflow-hidden transition-all duration-500 flex flex-col h-full ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-lg scale-[1.01]' 
                          : 'border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-md'
                      }`}
                    >
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={imageMap[key as 'boutique' | 'luxury' | 'ultra']} 
                          alt={value.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-brand-dark/15 group-hover:bg-brand-dark/5 transition-colors duration-500" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-gold/15 mix-blend-overlay pointer-events-none" />
                        )}
                        {key === 'luxury' && (
                          <span className="absolute top-4 right-4 bg-brand-gold text-brand-dark font-inter text-[11px] font-medium tracking-wider uppercase px-2.5 py-1">
                            Signature Choice
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-cormorant text-2xl font-light text-brand-dark capitalize">
                            {key === 'boutique' ? 'Boutique Heritage' : key === 'luxury' ? 'Luxury Resort' : 'Ultra-Luxury Villa'}
                          </h4>
                          <p className="font-inter text-[15px] font-light text-brand-dark/70 leading-relaxed">
                            {key === 'boutique' && 'Premium heritage villas, boutique boutique stays, and local colonial-style guest houses.'}
                            {key === 'luxury' && 'Private luxury suites, award-winning spas, lavish resort grounds, and private swimming pools.'}
                            {key === 'ultra' && 'Ultra-luxury estate villas, private plunge pools, dedicated butler service, and ultimate privacy.'}
                          </p>
                        </div>
                        <div className="pt-3 flex justify-between items-baseline border-t border-brand-gold/10">
                          <span className="font-inter text-xs tracking-wider text-brand-dark/50 uppercase">Investment Rate</span>
                          <span className="font-cormorant text-2xl font-light text-brand-gold-dark">${value.rate} <span className="font-inter text-[13px] font-light text-brand-dark/50 lowercase">/ night</span></span>
                        </div>
                      </div>
                      {/* Gold border overlay glow on selected card */}
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Transport Options */}
          {currentStep === 3 && (
            <div className="space-y-8 w-full animate-fade-in">
              <div className="text-center space-y-2">
                <h3 className="font-cormorant text-3xl font-light text-brand-dark">
                  How would you prefer to travel?
                </h3>
                <p className="font-inter text-[16px] text-brand-dark/60 max-w-xl mx-auto">
                  Select your preference for local navigation and regional transfers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
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
                      onClick={() => setTransport(key as any)}
                      className={`group relative text-left bg-[#FCFAF8] overflow-hidden transition-all duration-500 flex flex-col h-full ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-lg scale-[1.01]' 
                          : 'border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-md'
                      }`}
                    >
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={imageMap[key as 'tuk-tuk' | 'chauffeur' | 'domestic-flights']} 
                          alt={value.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-brand-dark/15 group-hover:bg-brand-dark/5 transition-colors duration-500" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-gold/15 mix-blend-overlay pointer-events-none" />
                        )}
                        {key === 'chauffeur' && (
                          <span className="absolute top-4 right-4 bg-brand-gold text-brand-dark font-inter text-[11px] font-medium tracking-wider uppercase px-2.5 py-1">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-cormorant text-2xl font-light text-brand-dark">
                            {key === 'tuk-tuk' ? 'Tuk-Tuk Explorer' : key === 'chauffeur' ? 'Private Chauffeur' : 'Regional Flights'}
                          </h4>
                          <p className="font-inter text-[15px] font-light text-brand-dark/70 leading-relaxed">
                            {key === 'tuk-tuk' && 'Traditional open-air local transport for an authentic, immersive, and breezy local exploration.'}
                            {key === 'chauffeur' && 'Air-conditioned luxury SUV with dedicated private English guide and unlimited refreshments.'}
                            {key === 'domestic-flights' && 'Private chauffeur service combined with domestic flights between Siem Reap and the coast.'}
                          </p>
                        </div>
                        <div className="pt-3 flex justify-between items-baseline border-t border-brand-gold/10">
                          <span className="font-inter text-xs tracking-wider text-brand-dark/50 uppercase">Daily rate</span>
                          <span className="font-cormorant text-2xl font-light text-brand-gold-dark">${value.rate} <span className="font-inter text-[13px] font-light text-brand-dark/50 lowercase">/ day</span></span>
                        </div>
                      </div>
                      {/* Gold border glow */}
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Excursions Grid */}
          {currentStep === 4 && (
            <div className="space-y-8 w-full animate-fade-in">
              <div className="text-center space-y-2">
                <h3 className="font-cormorant text-3xl font-light text-brand-dark">
                  Curate your experiences
                </h3>
                <p className="font-inter text-[16px] text-brand-dark/60 max-w-xl mx-auto">
                  Choose from our private excursions. Select tiles below to add them to your custom estimate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
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
                      className={`group relative text-left bg-brand-dark overflow-hidden transition-all duration-500 h-80 flex flex-col justify-end ${
                        isSelected 
                          ? 'ring-2 ring-brand-gold shadow-xl scale-[1.01]' 
                          : 'border border-brand-gold/10 hover:border-brand-gold/30'
                      }`}
                    >
                      <img 
                        src={imageMap[act.id as keyof typeof imageMap]} 
                        alt={act.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/35 to-transparent" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-brand-gold/15 mix-blend-overlay pointer-events-none" />
                      )}
                      
                      {/* Check badge overlay */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-brand-gold bg-brand-gold text-brand-dark scale-110' : 'border-white/30 bg-black/40 text-white'
                        }`}>
                          {isSelected ? (
                            <span className="font-inter text-sm font-bold">✓</span>
                          ) : (
                            <span className="font-inter text-xs text-white/50">+</span>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 p-6 space-y-2">
                        <span className="font-inter text-xs font-semibold tracking-wider text-brand-gold uppercase">
                          Private Excursion
                        </span>
                        <h4 className="font-cormorant text-2xl font-light text-white">
                          {act.name}
                        </h4>
                        <p className="font-inter text-[15px] font-light text-white/80 line-clamp-2 max-w-md leading-relaxed">
                          {act.id === 'angkor-sunrise' && 'Witness sunrise over the grand spires of Angkor Wat before exploring its hidden passages with a lead historian.'}
                          {act.id === 'helicopter' && 'Fly above Siem Reap and the vast Tonle Sap lake to trace the ancient irrigation networks from a private charter.'}
                          {act.id === 'mekong-cruise' && 'Glide past floating villages on a restored traditional barge while dining on local gourmet recipes.'}
                          {act.id === 'rainforest-trek' && 'Trek alongside forest rangers through cardamom sanctuaries to spot wild elephants and gibbons.'}
                          {act.id === 'culinary-class' && 'Pick fresh lemongrass and local herbs from organic gardens and craft classic Royal Khmer recipes.'}
                        </p>
                        <div className="pt-2 flex justify-between items-baseline border-t border-white/10">
                          <span className="font-inter text-xs text-white/50 uppercase">Rate per guest</span>
                          <span className="font-cormorant text-xl font-light text-brand-gold-light">${act.pricePerPerson} USD</span>
                        </div>
                      </div>
                      {/* Glowing border glow for select state */}
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-gold pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-8 border-t border-brand-gold/15 mt-10">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="font-inter text-[15px] font-medium text-brand-dark/50 hover:text-brand-dark transition-colors flex items-center space-x-2 py-3 focus:outline-none"
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-brand-dark hover:bg-brand-dark-accent text-brand-cream-dark py-4 px-10 text-[15px] font-inter tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center space-x-2 focus:outline-none"
              >
                <span>Continue to {currentStep === 1 ? 'Sanctuaries' : currentStep === 2 ? 'Transfers' : 'Excursions'}</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setHasMadeChoices(true);
                  setShowSummary(true);
                }}
                className="bg-brand-dark hover:bg-brand-dark-accent text-brand-cream-dark py-4 px-10 text-[15px] font-inter tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center space-x-2 focus:outline-none"
              >
                <span>Review Compiled Statement</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>

        </div>

      </main>

      {/* Floating Cost Tab - Click to open slide-in Invoice sheet */}
      {hasMadeChoices && !showSummary && (
        <button
          type="button"
          onClick={() => setShowSummary(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-brand-dark border-l-2 border-t-2 border-b-2 border-brand-gold text-brand-cream-dark p-4 pl-5 shadow-2xl flex flex-col items-center space-y-2 hover:-translate-x-1 transition-all duration-300"
        >
          <span className="font-inter text-xs tracking-[0.25em] uppercase text-brand-gold-light [writing-mode:vertical-lr] rotate-180 font-semibold">
            View Estimate
          </span>
          <span className="font-cormorant text-xl font-light text-white pt-1">
            ${breakdown.total}
          </span>
        </button>
      )}

      {/* Background Blur Overlay when summary panel drawer is active */}
      {showSummary && (
        <div 
          onClick={() => setShowSummary(false)} 
          className="fixed inset-0 bg-brand-dark/25 backdrop-blur-sm z-40 transition-opacity duration-500"
        />
      )}

      {/* Slide-in Summary Panel / Invoice Drawer */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#FCFAF8] shadow-2xl border-l border-brand-gold/15 p-8 md:p-12 transition-transform duration-500 ease-in-out flex flex-col justify-between ${
        showSummary ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Double border detailing inside the drawer */}
        <div className="absolute inset-2 border border-brand-gold/5 pointer-events-none" />

        {/* Close Button */}
        <button 
          type="button" 
          onClick={() => setShowSummary(false)} 
          className="absolute top-8 left-8 w-10 h-10 rounded-full border border-brand-gold/10 flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:border-brand-gold transition-all duration-300"
        >
          <X size={18} />
        </button>

        <div className="space-y-8 overflow-y-auto pr-1 pt-6 flex-1">
          {/* Invoice Header */}
          <div className="text-center relative">
            <span className="font-cormorant text-3xl tracking-[0.15em] font-light text-brand-dark block">
              ANGKOR LUX
            </span>
            <span className="font-inter text-[10px] tracking-[0.3em] text-brand-dark/40 uppercase block mt-1">
              Private Journeys
            </span>
            <div className="w-12 h-px bg-brand-gold/35 mx-auto mt-4" />
          </div>

          {/* Statement Details */}
          <div className="flex justify-between items-end text-[12px] font-inter text-brand-dark/50 border-b border-brand-gold/10 pb-4">
            <div>
              <span className="block font-medium text-brand-dark/65">PREPARED FOR:</span>
              <span className="block mt-0.5">Honored Guest</span>
            </div>
            <div className="text-right">
              <span className="block font-medium text-brand-dark/65">STATEMENT NO:</span>
              <span className="block mt-0.5 font-mono">#AL-{days}D{travelers}G-2026</span>
            </div>
          </div>

          {/* Quote Itemized Rows (All text sizes >= 15px) */}
          <div className="space-y-5 py-4">
            <div className="flex justify-between items-baseline">
              <span className="font-inter text-[15px] text-brand-dark/60 font-light">
                Accommodation ({days} nights, {tier === 'boutique' ? 'Boutique' : tier === 'luxury' ? 'Luxury' : 'Ultra-Luxury'})
              </span>
              <span className="font-cormorant text-xl text-brand-dark">${breakdown.accommodation}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-inter text-[15px] text-brand-dark/60 font-light">
                Private Transport & Guide ({days} days)
              </span>
              <span className="font-cormorant text-xl text-brand-dark">${breakdown.transport}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-inter text-[15px] text-brand-dark/60 font-light">
                Private Excursions ({travelers} {travelers === 1 ? 'guest' : 'guests'})
              </span>
              <span className="font-cormorant text-xl text-brand-dark">${breakdown.activities}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-inter text-[15px] text-brand-dark/60 font-light">
                Concierge Booking Fee (8%)
              </span>
              <span className="font-cormorant text-xl text-brand-dark">${breakdown.conciergeFee}</span>
            </div>
          </div>

          {/* Total Investment Row */}
          <div className="pt-6 border-t border-brand-gold/20">
            <div className="flex justify-between items-baseline">
              <span className="font-inter text-[15px] uppercase tracking-wider text-brand-dark font-medium">Estimated Investment</span>
              <span className="font-cormorant text-4xl font-light text-brand-gold-dark">
                ${breakdown.total} <span className="text-xs text-brand-dark/50 uppercase tracking-widest font-inter">usd</span>
              </span>
            </div>
          </div>

          {/* Concierge handwritten notes */}
          <div className="pt-6 border-t border-brand-gold/10 space-y-4 text-center">
            <p className="font-handwritten text-[#A47D23] text-2xl leading-relaxed max-w-sm mx-auto">
              "Each pilgrimage is a unique canvas. We curate every journey with absolute devotion to detail, tailoring the experience to your pacing and wishes."
            </p>
            <div>
              <span className="font-handwritten text-[#A47D23] text-3xl block">
                Sophea & The Angkor Lux Team
              </span>
              <span className="font-inter text-[11px] tracking-wider text-brand-dark/40 uppercase block mt-1">
                Lead Concierge
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button Anchored at the bottom of the drawer */}
        <div className="pt-6 border-t border-brand-gold/10 relative z-10 bg-[#FCFAF8] pb-4">
          <button
            type="button"
            onClick={() => {
              alert(`Quote Request Sent!\nYour compiled estimate total is $${breakdown.total} USD.\nLead Concierge Sophea will contact you shortly.`);
            }}
            className="w-full bg-[#C59E3F] hover:bg-[#E5C36E] text-brand-dark py-4 text-[16px] font-inter font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2.5 shadow-md shadow-brand-gold/10"
          >
            <span>Submit to Travel Architect</span>
            <ArrowRight size={16} />
          </button>
          <div className="text-center text-[11px] text-brand-dark/40 font-light pt-3">
            *Final rate is subject to high/low season occupancy and custom alterations.
          </div>
        </div>
      </div>

    </div>
  );
};
