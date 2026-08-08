"use client";

/**
 * src/app/gallery/page.jsx - Next.js App Router Photo & Video Gallery
 * Provides category filtering (All Photos, Cultural, Food, Dark Tourism, Eco Tourism)
 * and interactive full-screen Lightbox with keyboard navigation.
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

// Image asset paths (public)
const heroAngkor = "/assets/hero_angkor.png";
const galleryAngkor = "/assets/gallery_angkor.jpg";
const galleryMuseum = "/assets/gallery_museum.jpg";
const gallerySkyline = "/assets/gallery_skyline.jpg";
const galleryMountain = "/assets/gallery_mountain.jpg";
const galleryPubstreet = "/assets/gallery_pubstreet.jpg";
const galleryFood1 = "/assets/gallery_food1.jpg";
const galleryFood2 = "/assets/gallery_food2.jpg";
const galleryFood3 = "/assets/gallery_food3.jpg";
const bayonBuddhaClose = "/assets/bayon_buddha_close.jpg";
const darkSkulls = "/assets/dark_skulls.jpg";
const foodLokLak = "/assets/food_lok_lak.jpg";
const foodKhmerPlatter = "/assets/food_khmer_platter.jpg";
const foodBaiSachChrouk = "/assets/food_bai_sach_chrouk.jpg";
const foodNumPang = "/assets/food_num_pang.jpg";
const foodNomBanhChok = "/assets/food_nom_banh_chok.jpg";
const darkKillingTree = "/assets/dark_killing_tree.jpg";
const darkTuolSlengCell = "/assets/dark_tuol_sleng_cell.jpg";
const darkTuolSlengBuilding = "/assets/dark_tuol_sleng_building.jpg";
const darkTuolSlengGallows = "/assets/dark_tuol_sleng_gallows.jpg";
const darkTuolSlengStupa = "/assets/dark_tuol_sleng_stupa.jpg";
const ecoIslandLagoon = "/assets/eco_island_lagoon.jpg";
const ecoJungleHuts = "/assets/eco_jungle_huts.jpg";
const ecoJungleRuins = "/assets/eco_jungle_ruins.jpg";
const ecoWaterfall = "/assets/eco_waterfall.jpg";
const ecoWaterbirds = "/assets/eco_waterbirds.jpg";
const ecoElephantsJungle = "/assets/eco_elephants_jungle.jpg";
const ecoYeakLaomLake = "/assets/eco_yeak_laom_lake.jpg";
const ecoIrrawaddyDolphin = "/assets/eco_irrawaddy_dolphin.jpg";
const ecoBatCave = "/assets/eco_bat_cave.jpg";
const ecoRainforestCanopy = "/assets/eco_rainforest_canopy.jpg";

const galleryItems = [
  {
    id: 1,
    src: galleryAngkor,
    category: "CULTURAL",
    title: "Angkor Wat Temple Towers",
    description:
      "Majestic lotus-bud towers reflecting classic Khmer architecture.",
  },
  {
    id: 2,
    src: galleryMuseum,
    category: "CULTURAL",
    title: "National Museum Gallery",
    description:
      "Historical statues and sacred Khmer artifacts preserved in Phnom Penh.",
  },
  {
    id: 3,
    src: gallerySkyline,
    category: "CULTURAL",
    title: "Phnom Penh Sunset",
    description: "Serene view of the capital skyline over the Tonle Sap river.",
  },
  {
    id: 4,
    src: galleryMountain,
    category: "ECO TOURISM",
    title: "Kulén Mountain Waterfall",
    description: "Lush jungle waterfalls and ancient sacred riverbed carvings.",
  },
  {
    id: 5,
    src: galleryPubstreet,
    category: "CULTURAL",
    title: "Siem Reap Night Scene",
    description: "Vibrant night street atmosphere and local night markets.",
  },
  {
    id: 6,
    src: galleryFood1,
    category: "FOOD",
    title: "Authentic Fish Amok",
    description:
      "Cambodia's signature steamed curry with coconut cream in banana leaves.",
  },
  {
    id: 7,
    src: galleryFood2,
    category: "FOOD",
    title: "Traditional Khmer Banquet",
    description:
      "A rich array of fresh herbs, grilled meats, and local delicacies.",
  },
  {
    id: 8,
    src: bayonBuddhaClose,
    category: "CULTURAL",
    title: "Stone Faces of Bayon",
    description:
      "Serene smiling stone faces of Jayavarman VII at Bayon Temple.",
  },
  {
    id: 9,
    src: darkSkulls,
    category: "DARK TOURISM",
    title: "Tuol Sleng Memorial",
    description: "Poignant historical archive and memorial site in Phnom Penh.",
  },
  {
    id: 10,
    src: galleryFood3,
    category: "FOOD",
    title: "Local Delicacies & Spices",
    description:
      "Fresh local herbs, pastes, and traditional dipping sauces at a Phnom Penh market.",
  },
  {
    id: 11,
    src: foodLokLak,
    category: "FOOD",
    title: "Sizzling Beef Lok Lak",
    description:
      "Tender stir-fried beef served with fresh salad, fried egg, and lime-pepper dip.",
  },
  {
    id: 12,
    src: foodKhmerPlatter,
    category: "FOOD",
    title: "Khmer Traditional Tasting Platter",
    description:
      "An authentic arrangement of fresh herbs, spring rolls, and grilled specialties in banana leaves.",
  },
  {
    id: 13,
    src: foodBaiSachChrouk,
    category: "FOOD",
    title: "Bai Sach Chrouk",
    description:
      "Marinated grilled pork over jasmine rice served with sunny-side-up egg and fresh chili.",
  },
  {
    id: 14,
    src: foodNumPang,
    category: "FOOD",
    title: "Cambodian Num Pang Sandwich",
    description:
      "Crispy crusty baguette filled with savory meats, pickled papaya, and fresh chili.",
  },
  {
    id: 15,
    src: foodNomBanhChok,
    category: "FOOD",
    title: "Nom Banh Chok Khmer Noodle Soup",
    description:
      "Traditional rice noodles topped with rich golden fish curry broth and fresh edible flowers.",
  },
  {
    id: 16,
    src: darkKillingTree,
    category: "DARK TOURISM",
    title: "Choeung Ek Killing Tree Memorial",
    description:
      "Historic sacred memorial tree covered in colorful remembrance bracelets at the Killing Fields.",
  },
  {
    id: 17,
    src: darkTuolSlengCell,
    category: "DARK TOURISM",
    title: "Tuol Sleng Preserved Interrogation Cell",
    description:
      "Preserved metal bed frame and shackles inside an original S-21 prison classroom cell.",
  },
  {
    id: 18,
    src: darkTuolSlengBuilding,
    category: "DARK TOURISM",
    title: "Tuol Sleng S-21 Prison Building",
    description:
      "Historic exterior balconies and barbed wire fencing of Security Prison 21 in Phnom Penh.",
  },
  {
    id: 19,
    src: darkTuolSlengGallows,
    category: "DARK TOURISM",
    title: "Tuol Sleng Gallows & Courtyard",
    description:
      "Original wooden gallows beam and water basins preserved in the S-21 memorial grounds.",
  },
  {
    id: 20,
    src: darkTuolSlengStupa,
    category: "DARK TOURISM",
    title: "S-21 Courtyard Memorial Stupa",
    description:
      "White memorial stupa honoring victims inside the serene courtyard of Tuol Sleng Genocide Museum.",
  },
  {
    id: 21,
    src: ecoIslandLagoon,
    category: "ECO TOURISM",
    title: "Koh Rong Island Lagoon & Longtail Boats",
    description:
      "Crystal clear emerald waters and tropical limestone cliffs along Koh Rong island.",
  },
  {
    id: 22,
    src: ecoJungleHuts,
    category: "ECO TOURISM",
    title: "Chi Phat Ecotourism Jungle Village",
    description:
      "Traditional wooden stilted eco-lodges surrounded by dense rainforest canopy.",
  },
  {
    id: 23,
    src: ecoJungleRuins,
    category: "ECO TOURISM",
    title: "Overgrown Jungle Temple Ruins",
    description:
      "Ancient mossy stone sanctuary ruins deeply submerged in wild Cardamom rainforest.",
  },
  {
    id: 24,
    src: ecoWaterfall,
    category: "ECO TOURISM",
    title: "Phnom Kulen Cascading Waterfall",
    description:
      "Misty jungle waterfall plummeting into a sacred river basin surrounded by tropical trees.",
  },
  {
    id: 25,
    src: ecoWaterbirds,
    category: "ECO TOURISM",
    title: "Prek Toal Waterbird Reserve",
    description:
      "Endangered spot-billed pelicans and painted storks taking flight over Tonle Sap lake.",
  },
  {
    id: 26,
    src: ecoElephantsJungle,
    category: "ECO TOURISM",
    title: "Protected Elephant Sanctuary Trek",
    description:
      "Asian elephants walking freely through protected rainforest trails in Mondulkiri.",
  },
  {
    id: 27,
    src: ecoYeakLaomLake,
    category: "ECO TOURISM",
    title: "Yeak Laom Volcanic Crater Lake",
    description:
      "Pristine circular volcanic lake in Ratanakiri wrapped in sacred jungle and clear sunbeams.",
  },
  {
    id: 28,
    src: ecoIrrawaddyDolphin,
    category: "ECO TOURISM",
    title: "Irrawaddy Dolphin Surfacing",
    description:
      "Rare freshwater Irrawaddy dolphin swimming gracefully in the Mekong River near Kratie.",
  },
  {
    id: 29,
    src: ecoBatCave,
    category: "ECO TOURISM",
    title: "Battambang Bat Cave Dusk Flight",
    description:
      "Millions of bats swarming out of Phnom Sampeau cliff caves at sunset into the evening sky.",
  },
  {
    id: 30,
    src: ecoRainforestCanopy,
    category: "ECO TOURISM",
    title: "Cardamom Wilderness Rainforest Canopy",
    description:
      "Endless rolling green forest canopy spanning Cambodia's pristine Cardamom Mountains.",
  },
];

const categories = [
  "ALL PHOTOS",
  "CULTURAL",
  "FOOD",
  "DARK TOURISM",
  "ECO TOURISM",
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("ALL PHOTOS");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = useMemo(
    () =>
      galleryItems.filter(
        (item) =>
          activeFilter === "ALL PHOTOS" || item.category === activeFilter,
      ),
    [activeFilter],
  );

  const openLightbox = useCallback(
    (id) => {
      const indexInFiltered = filteredItems.findIndex((item) => item.id === id);
      setSelectedImageIndex(indexInFiltered);
    },
    [filteredItems],
  );

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handlePrev = useCallback(
    (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (selectedImageIndex !== null) {
        setSelectedImageIndex((prev) =>
          prev === 0 ? filteredItems.length - 1 : prev - 1,
        );
      }
    },
    [selectedImageIndex, filteredItems.length],
  );

  const handleNext = useCallback(
    (e) => {
      if (e && e.stopPropagation) e.stopPropagation();
      if (selectedImageIndex !== null) {
        setSelectedImageIndex((prev) =>
          prev === filteredItems.length - 1 ? 0 : prev + 1,
        );
      }
    },
    [selectedImageIndex, filteredItems.length],
  );

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setSelectedImageIndex(null);
        if (e.key === "ArrowLeft") {
          setSelectedImageIndex((prev) =>
            prev === 0 ? filteredItems.length - 1 : prev - 1,
          );
        }
        if (e.key === "ArrowRight") {
          setSelectedImageIndex((prev) =>
            prev === filteredItems.length - 1 ? 0 : prev + 1,
          );
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <div className="pb-20 bg-brand-cream animate-fade-in">
      {/* Hero Header */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroAngkor}
            alt="Angkor Wat Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/50" />
        </div>
        <div className="relative z-10 text-center space-y-3 mt-12 animate-fade-in">
          <span className="text-brand-gold font-serif text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block">
            BEYOND THE SURFACE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-widest font-normal uppercase">
            Gallery
          </h1>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-cream-dark/95 tracking-wide italic">
            Cambodia Through the Lens
          </p>
        </div>
      </section>

      {/* Categories Filter Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="bg-[#FAF8F5]/90 border border-brand-gold/35 p-2 rounded-full shadow-md backdrop-blur-md max-w-4xl mx-auto flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer font-sans ${
                  isActive
                    ? "bg-brand-dark text-brand-gold font-bold shadow-md border border-brand-gold/40 scale-[1.03]"
                    : "text-brand-dark/75 font-medium hover:text-brand-dark hover:bg-brand-gold/15"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of images */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item.id)}
            className="group relative rounded-xl overflow-hidden aspect-square border-2 border-brand-gold/30 hover:border-brand-gold shadow-md hover:shadow-2xl hover:scale-[1.02] cursor-pointer bg-white transition-all duration-500"
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-center text-white space-y-1.5 p-4">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-gold-light">
                  {item.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide uppercase">
                  {item.title}
                </h3>
                <div className="pt-2 flex items-center justify-center text-xs font-semibold text-brand-gold space-x-1.5">
                  <Eye size={14} />
                  <span>VIEW FULLSCREEN</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Divider & Particle Section */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-4 relative animate-fade-in">
        <div className="relative flex items-center justify-center">
          <div className="flex-grow border-t border-brand-gold/30" />
          <div className="flex items-center space-x-1.5 px-3">
            <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/80 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
          </div>
          <div className="flex items-center space-x-3 px-5 py-2 bg-[#FAF8F5] border border-brand-gold/35 rounded-full shadow-xs">
            <span className="text-brand-gold-dark text-[10px]">◆</span>
            <span className="text-xs tracking-[0.3em] font-bold text-brand-gold-dark uppercase">
              MORE STORIES TO UNCOVER
            </span>
            <span className="text-brand-gold-dark text-[10px]">◆</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3">
            <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/80 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
          </div>
          <div className="flex-grow border-t border-brand-gold/30" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {mounted &&
        selectedImageIndex !== null &&
        filteredItems[selectedImageIndex] &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-brand-dark/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-2 z-10">
              <div className="text-brand-cream-dark">
                <h4 className="font-serif text-lg md:text-2xl text-brand-gold font-normal">
                  {filteredItems[selectedImageIndex].title}
                </h4>
                <p className="text-xs text-brand-cream-dark/60 uppercase tracking-widest mt-1">
                  Category: {filteredItems[selectedImageIndex].category}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:text-brand-gold hover:bg-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Close image modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Stage */}
            <div className="flex-grow flex items-center justify-center relative w-full max-w-7xl mx-auto my-4 overflow-hidden">
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-20 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-dark/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:text-white hover:bg-brand-gold/30 transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>

              <div
                className="relative max-h-[72vh] max-w-[90vw] md:max-w-[80vw] flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[selectedImageIndex].src}
                  alt={filteredItems[selectedImageIndex].title}
                  className="max-h-[70vh] max-w-full object-contain rounded-2xl border border-brand-gold/30 shadow-2xl"
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 md:right-6 z-20 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-dark/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:text-white hover:bg-brand-gold/30 transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center w-full max-w-3xl mx-auto pb-4 z-10">
              <p className="text-sm md:text-base font-light text-brand-cream-dark/90 leading-relaxed px-4">
                {filteredItems[selectedImageIndex].description}
              </p>
              <div className="flex justify-center items-center space-x-2 mt-3 text-xs text-brand-gold/70 font-mono tracking-widest uppercase">
                <span>{selectedImageIndex + 1}</span>
                <span>/</span>
                <span>{filteredItems.length}</span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
