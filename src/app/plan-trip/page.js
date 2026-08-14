"use client";

/**
 * src/app/plan-trip/page.jsx - Next.js App Router Expedition Calculator & Itinerary Estimator
 * Allows travelers to customize trip duration, guest count, accommodation tier,
 * local transfer modes, and private excursions with an instant PNG itinerary download.
 */

import { useState, useMemo, useCallback } from "react";
import {
  Plane,
  Compass,
  Minus,
  Plus,
  X,
  Check,
  ChevronRight,
  Download,
} from "lucide-react";

// Public image asset paths
const galleryAngkor = "/assets/gallery_angkor.jpg";
const tukTukReal = "/assets/tuk_tuk_real.jpg";
const lodgingBoutique = "/assets/lodging_boutique.jpg";
const lodgingResort = "/assets/lodging_resort.png";
const lodgingVilla = "/assets/lodging_villa.jpg";
const transportCar = "/assets/transport_car.png";
const transportFlight = "/assets/transport_flight.png";
const excursionSunrise = "/assets/excursion_sunrise.jpg";
const excursionHelicopter = "/assets/excursion_helicopter.png";
const excursionCruise = "/assets/excursion_cruise.png";
const excursionElephants = "/assets/excursion_elephants.jpg";
const excursionCooking = "/assets/excursion_cooking.jpg";

// Pricing Database (Authentic Cambodia Tourism Rates)
const tierPricing = {
  boutique: { label: "Boutique Hotel ($85/night)", rate: 85 },
  luxury: { label: "Luxury Resort ($280/night)", rate: 280 },
  ultra: { label: "Private Villa ($650/night)", rate: 650 },
};

const transportPricing = {
  "tuk-tuk": { label: "Local Tuk Tuk ($20/day)", rate: 20 },
  chauffeur: { label: "Private Car ($55/day)", rate: 55 },
  "domestic-flights": {
    label: "Domestic Flight ($130/day)",
    rate: 130,
  },
};

const activityOptions = [
  {
    id: "angkor-sunrise",
    name: "Angkor Wat Sunrise Guided Tour",
    pricePerPerson: 75,
    icon: <Compass size={16} />,
  },
  {
    id: "helicopter",
    name: "Scenic Angkor Helicopter Flight",
    pricePerPerson: 180,
    icon: <Plane size={16} />,
  },
  {
    id: "mekong-cruise",
    name: "Mekong River Sunset Dinner Cruise",
    pricePerPerson: 35,
    icon: <Compass size={16} />,
  },
  {
    id: "rainforest-trek",
    name: "Cardamoms Protected Ranger Eco-Trek",
    pricePerPerson: 65,
    icon: <Compass size={16} />,
  },
  {
    id: "culinary-class",
    name: "Traditional Khmer Cooking Class",
    pricePerPerson: 45,
    icon: <Compass size={16} />,
  },
];

export default function PlanTripPage() {
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState("luxury");
  const [transport, setTransport] = useState("chauffeur");
  const [selectedActivities, setSelectedActivities] = useState([
    "angkor-sunrise",
    "mekong-cruise",
  ]);

  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);

  const breakdown = useMemo(() => {
    const accommodationCost = days * tierPricing[tier].rate;
    const transportCost = days * transportPricing[transport].rate;

    const selectedActivityDetails = activityOptions
      .filter((act) => selectedActivities.includes(act.id))
      .map((act) => ({
        ...act,
        cost: act.pricePerPerson * travelers,
      }));

    const activitiesCost = selectedActivityDetails.reduce(
      (sum, act) => sum + act.cost,
      0,
    );
    const total = accommodationCost + transportCost + activitiesCost;

    return {
      accommodation: accommodationCost,
      transport: transportCost,
      activities: activitiesCost,
      selectedActivityDetails,
      total,
    };
  }, [days, travelers, tier, transport, selectedActivities]);

  const handleActivityToggle = useCallback(
    (id) => {
      if (selectedActivities.includes(id)) {
        setSelectedActivities(
          selectedActivities.filter((actId) => actId !== id),
        );
      } else {
        setSelectedActivities([...selectedActivities, id]);
      }
    },
    [selectedActivities],
  );

  const handleSaveAsPng = useCallback(() => {
    const canvas = document.createElement("canvas");
    const width = 600;
    const activitiesCount = breakdown.selectedActivityDetails.length;
    const height = 530 + activitiesCount * 26;
    const scale = 2;

    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    ctx.fillStyle = "#FAF8F5";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(197, 158, 63, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    ctx.strokeStyle = "rgba(197, 158, 63, 0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(22, 22, width - 44, height - 44);

    ctx.fillStyle = "#c59e3f";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ESTIMATED TRIP COST", width / 2, 55);

    ctx.fillStyle = "#120e0a";
    ctx.font = "bold 24px serif";
    ctx.fillText("CAMBODIA EXPEDITION ESTIMATE", width / 2, 88);

    ctx.fillStyle = "rgba(18, 14, 10, 0.7)";
    ctx.font = "500 13px sans-serif";
    ctx.fillText(
      `${days} Days  •  ${travelers} ${travelers === 1 ? "Guest" : "Guests"}`,
      width / 2,
      112,
    );

    ctx.strokeStyle = "rgba(197, 158, 63, 0.3)";
    ctx.beginPath();
    ctx.moveTo(60, 128);
    ctx.lineTo(width - 60, 128);
    ctx.stroke();

    const boxY = 145;
    ctx.fillStyle = "rgba(197, 158, 63, 0.12)";
    ctx.fillRect(50, boxY, width - 100, 75);
    ctx.strokeStyle = "rgba(197, 158, 63, 0.4)";
    ctx.strokeRect(50, boxY, width - 100, 75);

    ctx.fillStyle = "rgba(18, 14, 10, 0.7)";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("TOTAL ESTIMATED COST", width / 2, boxY + 24);

    ctx.fillStyle = "#a47d23";
    ctx.font = "bold 30px serif";
    ctx.fillText(
      `$${breakdown.total.toLocaleString()} USD`,
      width / 2,
      boxY + 58,
    );

    let currentY = 260;
    ctx.textAlign = "left";
    ctx.fillStyle = "#120e0a";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("YOUR SELECTED OPTIONS", 50, currentY);

    ctx.strokeStyle = "rgba(197, 158, 63, 0.25)";
    ctx.beginPath();
    ctx.moveTo(50, currentY + 8);
    ctx.lineTo(width - 50, currentY + 8);
    ctx.stroke();

    currentY += 32;

    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "#120e0a";
    ctx.fillText(`Lodging (${days} nights)`, 50, currentY);
    ctx.textAlign = "right";
    ctx.font = "bold 14px monospace";
    ctx.fillText(
      `$${breakdown.accommodation.toLocaleString()}`,
      width - 50,
      currentY,
    );

    currentY += 18;
    ctx.textAlign = "left";
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(18, 14, 10, 0.7)";
    ctx.fillText(tierPricing[tier].label, 50, currentY);

    currentY += 28;

    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "#120e0a";
    ctx.fillText(`Transfers (${days} days)`, 50, currentY);
    ctx.textAlign = "right";
    ctx.font = "bold 14px monospace";
    ctx.fillText(
      `$${breakdown.transport.toLocaleString()}`,
      width - 50,
      currentY,
    );

    currentY += 18;
    ctx.textAlign = "left";
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(18, 14, 10, 0.7)";
    ctx.fillText(transportPricing[transport].label, 50, currentY);

    currentY += 28;

    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "#120e0a";
    ctx.fillText(`Selected Excursions (${activitiesCount})`, 50, currentY);
    ctx.textAlign = "right";
    ctx.font = "bold 14px monospace";
    ctx.fillText(
      `$${breakdown.activities.toLocaleString()}`,
      width - 50,
      currentY,
    );

    currentY += 22;
    ctx.textAlign = "left";
    if (activitiesCount > 0) {
      breakdown.selectedActivityDetails.forEach((act) => {
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "rgba(18, 14, 10, 0.85)";
        ctx.fillText(
          `• ${act.name} ($${act.pricePerPerson}/guest)`,
          62,
          currentY,
        );
        ctx.textAlign = "right";
        ctx.font = "500 12px monospace";
        ctx.fillText(`$${act.cost}`, width - 50, currentY);
        ctx.textAlign = "left";
        currentY += 24;
      });
    } else {
      ctx.font = "italic 12px sans-serif";
      ctx.fillStyle = "rgba(18, 14, 10, 0.5)";
      ctx.fillText("No excursions selected", 62, currentY);
      currentY += 24;
    }

    currentY += 20;
    ctx.strokeStyle = "rgba(197, 158, 63, 0.25)";
    ctx.beginPath();
    ctx.moveTo(50, currentY);
    ctx.lineTo(width - 50, currentY);
    ctx.stroke();

    currentY += 25;
    ctx.textAlign = "center";
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(18, 14, 10, 0.5)";
    ctx.fillText(
      "Calculated via Cambodia Tourism Itinerary Planner",
      width / 2,
      currentY,
    );

    const link = document.createElement("a");
    link.download = `Cambodia_Trip_Estimate_${days}Days.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [breakdown, days, travelers, tier, transport]);

  const renderStatementContent = () => (
    <div
      id="estimate-panel"
      className="bg-[#FAF8F5] border-2 border-brand-gold/40 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden space-y-4"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-gold/10 blur-2xl pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <div className="text-center space-y-1 pb-3 border-b border-brand-gold/20">
          <span className="text-brand-gold text-xs font-bold tracking-[0.25em] uppercase block">
            ESTIMATED TRIP COST
          </span>
          <h3 className="font-cormorant text-2xl md:text-3xl text-brand-dark font-normal uppercase tracking-wider">
            Calculation Summary
          </h3>
          <span className="text-xs font-sans text-brand-dark/70 block font-medium">
            {days} Days - {travelers} {travelers === 1 ? "Guest" : "Guests"}
          </span>
        </div>

        <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4 text-center space-y-1">
          <span className="text-xs text-brand-dark/70 uppercase font-bold tracking-widest block">
            Total Estimated Cost
          </span>
          <span className="font-cormorant text-3xl sm:text-4xl font-bold text-brand-gold-dark block">
            ${breakdown.total.toLocaleString()}{" "}
            <span className="text-xs font-sans font-bold text-brand-dark/80 uppercase">
              USD
            </span>
          </span>
        </div>

        <div className="space-y-3 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-dark/80 block border-b border-brand-gold/15 pb-1.5">
            Your Selected Options
          </span>

          <div className="space-y-0.5">
            <div className="flex justify-between items-baseline text-xs sm:text-sm">
              <span className="font-semibold text-brand-dark">
                Lodging ({days} nights)
              </span>
              <span className="font-mono font-bold text-brand-dark">
                ${breakdown.accommodation.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-brand-dark/70 block">
              {tierPricing[tier].label}
            </span>
          </div>

          <div className="space-y-0.5 pt-1.5 border-t border-brand-gold/10">
            <div className="flex justify-between items-baseline text-xs sm:text-sm">
              <span className="font-semibold text-brand-dark">
                Transfers ({days} days)
              </span>
              <span className="font-mono font-bold text-brand-dark">
                ${breakdown.transport.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-brand-dark/70 block">
              {transportPricing[transport].label}
            </span>
          </div>

          <div className="space-y-1.5 pt-1.5 border-t border-brand-gold/10">
            <div className="flex justify-between items-baseline text-xs sm:text-sm">
              <span className="font-semibold text-brand-dark">
                Selected Excursions ({breakdown.selectedActivityDetails.length})
              </span>
              <span className="font-mono font-bold text-brand-dark">
                ${breakdown.activities.toLocaleString()}
              </span>
            </div>

            {breakdown.selectedActivityDetails.length > 0 ? (
              <div className="space-y-1 pl-2 border-l-2 border-brand-gold/30 mt-1">
                {breakdown.selectedActivityDetails.map((act) => (
                  <div
                    key={act.id}
                    className="flex justify-between text-xs text-brand-dark/85"
                  >
                    <span className="truncate pr-2">
                      • {act.name} (${act.pricePerPerson}/guest)
                    </span>
                    <span className="font-mono font-medium shrink-0">
                      ${act.cost}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs text-brand-dark/50 italic block pl-2">
                No excursions selected
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-brand-gold/20 space-y-2 relative z-10">
        <button
          type="button"
          onClick={handleSaveAsPng}
          className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] rounded-full shadow-lg shadow-brand-gold/20 cursor-pointer flex items-center justify-center space-x-2"
        >
          <Download size={16} />
          <span>Save as PNG</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="pb-28 bg-brand-cream font-sans text-brand-dark min-h-screen relative">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-12">
        <div className="space-y-16 sm:space-y-20 animate-fade-in">
          {/* Template Intro Section */}
          <section className="bg-[#FAF8F5] border border-brand-gold/40 rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-md hover:shadow-lg transition-shadow text-left">
            <div className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none hidden md:block overflow-hidden">
              <img
                src={galleryAngkor}
                alt="Angkor Wat Reflection"
                className="w-full h-full object-cover opacity-20 mix-blend-multiply filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />
            </div>

            <div className="max-w-[560px] space-y-3.5 relative z-10">
              <div className="flex items-center space-x-3 mb-1">
                <svg
                  width="36"
                  height="20"
                  viewBox="0 0 40 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-brand-gold-dark"
                >
                  <path d="M20 1L23 7H17L20 1Z" fill="currentColor" />
                  <path d="M20 6L24 14H16L20 6Z" fill="currentColor" />
                  <path d="M11 8L14 14H8L11 8Z" fill="currentColor" />
                  <path d="M29 8L32 14H26L29 8Z" fill="currentColor" />
                  <path d="M5 13L7 18H3L5 13Z" fill="currentColor" />
                  <path d="M35 13L37 18H33L35 13Z" fill="currentColor" />
                  <rect
                    x="1"
                    y="18"
                    width="38"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
                <div className="w-12 h-[1px] bg-brand-gold/50" />
              </div>

              <div className="space-y-2">
                <h1 className="font-cormorant text-4xl sm:text-5xl font-normal tracking-[0.15em] uppercase leading-tight">
                  <span className="text-brand-gold-dark font-semibold">
                    PLAN
                  </span>{" "}
                  <span className="text-brand-dark">YOUR JOURNEY</span>
                </h1>
                <div className="w-16 h-[2px] bg-brand-gold/60" />
              </div>

              <p className="font-sans text-base sm:text-lg text-stone-700 leading-relaxed max-w-xl font-normal">
                Choose your destination, accommodation, transportation, and
                activities to receive an estimated trip cost.
              </p>
            </div>
          </section>

          {/* SECTION 1: Pacing & Companions */}
          <section className="bg-[#FAF8F5] border border-brand-gold/35 p-6 md:p-10 rounded-3xl shadow-md space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-mono shadow-xs">
                1
              </div>
              <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">
                JOURNEY PACING & COMPANIONS
              </h3>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-gold/35" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#FAF8F5] px-3 text-brand-gold-dark text-xs">
                  ◆
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-6 sm:p-8 bg-[#FAF8F5]/90 rounded-2xl border border-brand-gold/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <label className="font-cormorant text-xl font-normal tracking-wide text-brand-dark uppercase block text-center">
                  Duration of Your Journey
                </label>

                <div className="flex items-center justify-center space-x-6 py-2">
                  <button
                    type="button"
                    onClick={() => setDays(Math.max(3, days - 1))}
                    className="w-11 h-11 rounded-full border border-brand-gold/50 bg-white flex items-center justify-center text-brand-gold-dark hover:bg-brand-gold hover:text-brand-dark transition-all active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Decrease days"
                  >
                    <Minus size={14} />
                  </button>

                  <div className="flex flex-col items-center min-w-[70px]">
                    <span className="font-cormorant text-4xl sm:text-5xl font-light text-brand-gold-dark leading-none">
                      {days}
                    </span>
                    <span className="text-[10px] font-sans text-brand-dark/70 font-bold uppercase tracking-widest mt-1">
                      DAYS
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDays(Math.min(21, days + 1))}
                    className="w-11 h-11 rounded-full border border-brand-gold/50 bg-white flex items-center justify-center text-brand-gold-dark hover:bg-brand-gold hover:text-brand-dark transition-all active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Increase days"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <p className="font-sans text-xs text-brand-dark/65 text-center leading-relaxed font-normal max-w-xs mx-auto">
                  Minimum 3 days. Recommend at least 7 days to absorb Siem Reap
                  and the southern coast.
                </p>
              </div>

              <div className="space-y-4 p-6 sm:p-8 bg-[#FAF8F5]/90 rounded-2xl border border-brand-gold/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <label className="font-cormorant text-xl font-normal tracking-wide text-brand-dark uppercase block text-center">
                  Number of Honored Guests
                </label>

                <div className="flex items-center justify-center space-x-6 py-2">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-11 h-11 rounded-full border border-brand-gold/50 bg-white flex items-center justify-center text-brand-gold-dark hover:bg-brand-gold hover:text-brand-dark transition-all active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Decrease guests"
                  >
                    <Minus size={14} />
                  </button>

                  <div className="flex flex-col items-center min-w-[70px]">
                    <span className="font-cormorant text-4xl sm:text-5xl font-light text-brand-gold-dark leading-none">
                      {travelers}
                    </span>
                    <span className="text-[10px] font-sans text-brand-dark/70 font-bold uppercase tracking-widest mt-1">
                      GUESTS
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTravelers(Math.min(10, travelers + 1))}
                    className="w-11 h-11 rounded-full border border-brand-gold/50 bg-white flex items-center justify-center text-brand-gold-dark hover:bg-brand-gold hover:text-brand-dark transition-all active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Increase guests"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <p className="font-sans text-xs text-brand-dark/65 text-center leading-relaxed font-normal max-w-xs mx-auto">
                  Private transfers are designed for intimate groups of up to 10
                  guests.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: Sanctuary Lodging */}
          <section className="bg-[#FAF8F5] border border-brand-gold/35 p-6 md:p-10 rounded-3xl shadow-md space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-mono shadow-xs">
                2
              </div>
              <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">
                Places to stay
              </h3>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-gold/35" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#FAF8F5] px-3 text-brand-gold-dark text-xs">
                  ◆
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(tierPricing).map(([key, value]) => {
                const isSelected = tier === key;
                const imageMap = {
                  boutique: lodgingBoutique,
                  luxury: lodgingResort,
                  ultra: lodgingVilla,
                };
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTier(key)}
                    className={`group relative text-left bg-[#FAF8F5] rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full cursor-pointer shadow-sm ${
                      isSelected
                        ? "ring-2 ring-brand-gold shadow-xl scale-[1.02] border-transparent"
                        : "border border-brand-gold/30 hover:border-brand-gold/60 hover:shadow-lg"
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
                      {key === "luxury" && (
                        <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark font-sans text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
                          Signature Choice
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="font-cormorant text-2xl font-normal text-brand-dark capitalize">
                          {key === "boutique"
                            ? "Boutique Hotel"
                            : key === "luxury"
                              ? "Luxury Resort"
                              : "Private Villa"}
                        </h4>
                        <p className="font-sans text-s font-light text-brand-dark/75 leading-relaxed">
                          {key === "boutique" &&
                            "Charming boutique hotels and garden properties with swimming pools and personalized service."}
                          {key === "luxury" &&
                            "5-star luxury resorts featuring grand swimming pools, spas, fine dining, and prime locations."}
                          {key === "ultra" &&
                            "Exclusive private luxury villas with private swimming pools, tropical gardens, and dedicated hosts."}
                        </p>
                      </div>

                      <div className="pt-3.5 flex justify-between items-center border-t border-brand-gold/20">
                        <span className="font-sans text-xs tracking-wider text-stone-500 uppercase font-semibold">
                          Nightly Rate
                        </span>
                        <div className="flex items-baseline space-x-1 font-sans">
                          <span
                            className="text-2xl font-bold text-[#8C6B1F] lining-nums tabular-nums"
                            style={{
                              fontVariantNumeric: "lining-nums tabular-nums",
                              fontFeatureSettings: '"lnum" 1, "tnum" 1',
                            }}
                          >
                            ${value.rate}
                          </span>
                          <span className="text-xs text-stone-500 font-normal">
                            / night
                          </span>
                        </div>
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
          <section className="bg-[#FAF8F5] border border-brand-gold/35 p-6 md:p-10 rounded-3xl shadow-md space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-mono shadow-xs">
                3
              </div>
              <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">
                LOCAL NAVIGATION
              </h3>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-gold/35" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#FAF8F5] px-3 text-brand-gold-dark text-xs">
                  ◆
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(transportPricing).map(([key, value]) => {
                const isSelected = transport === key;
                const imageMap = {
                  "tuk-tuk": tukTukReal,
                  chauffeur: transportCar,
                  "domestic-flights": transportFlight,
                };
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTransport(key)}
                    className={`group relative text-left bg-[#FAF8F5] rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full cursor-pointer shadow-sm ${
                      isSelected
                        ? "ring-2 ring-brand-gold shadow-xl scale-[1.02] border-transparent"
                        : "border border-brand-gold/30 hover:border-brand-gold/60 hover:shadow-lg"
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
                      {key === "chauffeur" && (
                        <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark font-sans text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="font-cormorant text-2xl font-normal text-brand-dark">
                          {key === "tuk-tuk"
                            ? "Local TukTuk"
                            : key === "chauffeur"
                              ? "Private Car"
                              : "Domestic Flight"}
                        </h4>
                        <p className="font-sans text-xs font-light text-brand-dark/75 leading-relaxed">
                          {key === "tuk-tuk" &&
                            "Traditional open-air Cambodian tuk-tuk with a dedicated driver for city and temple tours."}
                          {key === "chauffeur" &&
                            "Comfortable air-conditioned private car with a dedicated driver for smooth, flexible travel."}
                          {key === "domestic-flights" &&
                            "Fast domestic flights between Phnom Penh, Siem Reap, and the southern islands."}
                        </p>
                      </div>

                      <div className="pt-3.5 flex justify-between items-center border-t border-brand-gold/20">
                        <span className="font-sans text-xs tracking-wider text-stone-500 uppercase font-semibold">
                          Daily Rate
                        </span>
                        <div className="flex items-baseline space-x-1 font-sans">
                          <span
                            className="text-2xl font-bold text-[#8C6B1F] lining-nums tabular-nums"
                            style={{
                              fontVariantNumeric: "lining-nums tabular-nums",
                              fontFeatureSettings: '"lnum" 1, "tnum" 1',
                            }}
                          >
                            ${value.rate}
                          </span>
                          <span className="text-xs text-stone-500 font-normal">
                            / day
                          </span>
                        </div>
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

          {/* SECTION 4: Tailored Excursions */}
          <section className="bg-[#FAF8F5] border border-brand-gold/35 p-6 md:p-10 rounded-3xl shadow-md space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-bold font-mono shadow-xs">
                4
              </div>
              <h3 className="font-cormorant text-2xl md:text-3xl font-normal uppercase tracking-wider text-brand-dark">
                TAILORED EXCURSIONS
              </h3>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-gold/35" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#FAF8F5] px-3 text-brand-gold-dark text-xs">
                  ◆
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activityOptions.map((act) => {
                const isSelected = selectedActivities.includes(act.id);
                const imageMap = {
                  "angkor-sunrise": excursionSunrise,
                  helicopter: excursionHelicopter,
                  "mekong-cruise": excursionCruise,
                  "rainforest-trek": excursionElephants,
                  "culinary-class": excursionCooking,
                };
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleActivityToggle(act.id)}
                    className={`group relative text-left bg-white rounded-2xl overflow-hidden transition-all duration-500 flex flex-col justify-between h-full cursor-pointer shadow-sm ${
                      isSelected
                        ? "ring-2 ring-brand-gold shadow-xl scale-[1.02] border-transparent"
                        : "border border-brand-gold/30 hover:border-brand-gold/60 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <img
                        src={imageMap[act.id]}
                        alt={act.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-4 right-4 z-20">
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-brand-gold bg-brand-gold text-brand-dark scale-110 shadow"
                              : "border-white/50 bg-black/40 backdrop-blur-xs text-white"
                          }`}
                        >
                          {isSelected ? (
                            <Check
                              size={16}
                              className="text-brand-dark stroke-[3]"
                            />
                          ) : (
                            <span className="font-sans text-sm text-white font-bold">
                              +
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4 font-sans">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold tracking-wider text-[#8C6B1F] uppercase block">
                          Private Excursion
                        </span>
                        <h4 className="font-cormorant text-2xl font-medium text-brand-dark leading-tight">
                          {act.name}
                        </h4>
                        <p className="text-sm font-normal text-stone-700 line-clamp-2 leading-relaxed">
                          {act.id === "angkor-sunrise" &&
                            "Early morning sunrise at Angkor Wat followed by a guided temple tour with a licensed local historian."}
                          {act.id === "helicopter" &&
                            "Scenic aerial helicopter tour over the ancient Angkor temple complex and Tonle Sap lake."}
                          {act.id === "mekong-cruise" &&
                            "Evening riverboat cruise along the Phnom Penh riverfront with buffet dining and sunset views."}
                          {act.id === "rainforest-trek" &&
                            "Guided rainforest hike with local wildlife rangers through Cardamom Mountain trails and waterfalls."}
                          {act.id === "culinary-class" &&
                            "Morning local market tour and hands-on cooking class preparing authentic Fish Amok and Khmer curry."}
                        </p>
                      </div>

                      <div className="pt-3.5 flex justify-between items-center border-t border-brand-gold/20">
                        <span className="font-sans text-xs tracking-wider text-stone-500 uppercase font-semibold">
                          Rate Per Guest
                        </span>
                        <div className="flex items-baseline space-x-1 font-sans">
                          <span
                            className="text-2xl font-bold text-[#8C6B1F] lining-nums tabular-nums"
                            style={{
                              fontVariantNumeric: "lining-nums tabular-nums",
                              fontFeatureSettings: '"lnum" 1, "tnum" 1',
                            }}
                          >
                            ${act.pricePerPerson}
                          </span>
                          <span className="text-xs text-stone-500 font-normal">
                            USD
                          </span>
                        </div>
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

          {/* Action Trigger */}
          <div className="pt-8 flex flex-col items-center space-y-3">
            <button
              type="button"
              onClick={() => {
                setShowEstimate(true);
                setTimeout(() => {
                  const el = document.getElementById("estimate-panel");
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-12 py-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase rounded-full shadow-2xl shadow-brand-gold/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer flex items-center space-x-3 group"
            >
              <span>Trip Estimation</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                ➔
              </span>
            </button>
            <span className="text-xs text-brand-dark/60 font-normal">
              No email or registration required
            </span>
          </div>

          {/* Calculated Cost Estimate Panel */}
          {showEstimate && (
            <div className="pt-6 animate-fade-in">
              {renderStatementContent()}
            </div>
          )}
        </div>
      </main>

      {/* Floating Bottom Bar for Mobile layout */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 border-t border-brand-gold/30 p-4 flex justify-between items-center shadow-2xl backdrop-blur-md">
        {showEstimate ? (
          <>
            <div className="flex flex-col text-left">
              <span className="text-xs tracking-widest text-brand-gold uppercase font-bold">
                Estimated Total
              </span>
              <span className="font-cormorant text-2xl text-white font-normal mt-0.5">
                ${breakdown.total} USD
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowMobileDrawer(true)}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-full transition-all active:scale-95 shadow-lg shadow-brand-gold/20 cursor-pointer flex items-center space-x-1.5"
            >
              <span>View Details</span>
              <ChevronRight size={14} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowEstimate(true);
              setShowMobileDrawer(true);
            }}
            className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all active:scale-[0.98] rounded-full shadow-lg shadow-brand-gold/20 cursor-pointer flex items-center justify-center"
          >
            <span>Estimate My Trip</span>
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {showMobileDrawer && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm flex items-end animate-fade-in"
          onClick={() => setShowMobileDrawer(false)}
        >
          <div
            className="w-full bg-[#FAF8F5] max-h-[88vh] overflow-y-auto p-4 rounded-t-3xl relative animate-fade-in border-t border-brand-gold/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMobileDrawer(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark transition-colors cursor-pointer bg-white"
              aria-label="Close summary"
            >
              <X size={16} />
            </button>
            <div className="pt-6">{renderStatementContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
