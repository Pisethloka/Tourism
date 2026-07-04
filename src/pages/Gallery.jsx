import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  MessageSquare,
  User,
} from "lucide-react";
import heroAngkor from "../assets/hero_angkor.png";
import apsaraDancer from "../assets/apsara_dancer.png";
import galleryCorridor from "../assets/gallery_corridor.png";
import galleryBoat from "../assets/gallery_boat.png";
import galleryForest from "../assets/gallery_forest.png";
import galleryFruits from "../assets/gallery_fruits.png";
import bayonBuddha from "../assets/bayon_buddha.png";
import cambodianCulinary from "../assets/cambodian_culinary.png";
import bayonBuddhaClose from "../assets/bayon_buddha_close.jpg";
import darkSkulls from "../assets/dark_skulls.jpg";
import angkorWatSunrise from "../assets/angkor_wat_sunrise.png";
import khmerCulinary from "../assets/khmer_culinary.png";
import cardamomTrekking from "../assets/cardamom_trekking.png";
import kohRongKayak from "../assets/koh_rong_kayak.png";
import mekongDolphins from "../assets/mekong_dolphins.png";
import anlongVeng from "../assets/anlong_veng.png";
import bokorRuins from "../assets/bokor_ruins.png";
import galleryBoatSculpture from "../assets/gallery_boat_sculpture.jpg";
import galleryPalacePavilion from "../assets/gallery_palace_pavilion.jpg";
import galleryRuralBasketCart from "../assets/gallery_rural_basket_cart.jpg";
import galleryMossyGateway from "../assets/gallery_mossy_gateway.png";
import galleryPondStiltHouses from "../assets/gallery_pond_stilt_houses.jpg";

export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      src: apsaraDancer,
      category: "CULTURAL",
      title: "Sacred Apsara Dance",
      description:
        "A traditional Cambodian Apsara dancer in classical gold costume executing precise gestures.",
    },
    {
      id: 2,
      src: galleryCorridor,
      category: "DARK TOURISM",
      title: "Monastery Walkway",
      description:
        "Sunlight filtering through the brick-lined corridors of ancient ruins.",
    },
    {
      id: 3,
      src: galleryBoat,
      category: "ECO TOURISM",
      title: "Tonle Sap Sunrise",
      description:
        "A traditional wooden boat floating on calm water at sunset.",
    },
    {
      id: 4,
      src: galleryForest,
      category: "ECO TOURISM",
      title: "Rainforest Canopy",
      description:
        "Aerial view of a lush green tropical forest under morning mist.",
    },
    {
      id: 5,
      src: galleryFruits,
      category: "CULTURAL",
      title: "Cambodian Market Harvest",
      description:
        "Baskets of fresh green mangoes, dragonfruits, and oranges at a local market.",
    },
    {
      id: 6,
      src: bayonBuddha,
      category: "CULTURAL",
      title: "Serene Face of Avalokiteshvara",
      description: "Stone carving depicting the smiling Bayon face at Angkor.",
    },
    {
      id: 7,
      src: angkorWatSunrise,
      category: "CULTURAL",
      title: "Angkor Wat Dawn Reflection",
      description:
        "Tourists gathering by the lotus pond at dawn to photograph the silhouette of Angkor Wat towers reflecting on the water.",
    },
    {
      id: 8,
      src: khmerCulinary,
      category: "CULTURAL",
      title: "Street Food Market Feast",
      description:
        "A lively tourist snapshot of local fish amok served in banana leaves with herbs and beef lok lak at a busy food stall.",
    },
    {
      id: 9,
      src: cardamomTrekking,
      category: "ECO TOURISM",
      title: "Cardamom Rainforest Trekking",
      description:
        "An authentic traveler photo of hiking through the tall trees and green foliage of Cardamom Mountains forest.",
    },
    {
      id: 10,
      src: kohRongKayak,
      category: "ECO TOURISM",
      title: "Sea Kayaking at Sok San Beach",
      description:
        "Travelers kayaking in the clear turquoise coastal waters of Koh Rong Island, with coconut palms lining the shore.",
    },
    {
      id: 11,
      src: mekongDolphins,
      category: "ECO TOURISM",
      title: "Irrawaddy Dolphin Watching",
      description:
        "A candid snapshot of an Irrawaddy dolphin surfacing in the Mekong River near Kratie, captured during a sunset boat tour.",
    },
    {
      id: 12,
      src: anlongVeng,
      category: "DARK TOURISM",
      title: "Anlong Veng Historical Compound",
      description:
        "A traveler snapshot exploring a rustic wooden historic residence surrounded by dense jungle in the Dangrek region.",
    },
    {
      id: 13,
      src: bokorRuins,
      category: "DARK TOURISM",
      title: "Bokor Hill Colonial Exploration",
      description:
        "Candid photo of travelers walking past the weathered, orange-lichen-stained colonial ruins on Bokor Hill wrapped in mist.",
    },
    {
      id: 14,
      src: cambodianCulinary,
      category: "CULTURAL",
      title: "Khmer Culinary Heritage",
      description:
        "Traditional Cambodian culinary dishes including fish amok with local herbs and spices.",
    },
    {
      id: 15,
      src: bayonBuddhaClose,
      category: "CULTURAL",
      title: "Smiling Face of Bayon Close-up",
      description:
        "A detailed close-up of the smiling stone faces of the Bayon Temple in Siem Reap.",
    },
    {
      id: 16,
      src: darkSkulls,
      category: "DARK TOURISM",
      title: "Reflection Memorial Glass Stupa Close-up",
      description:
        "A close-up view of the memorial stupa holding historical relics at the Choeung Ek fields.",
    },
    {
      id: 17,
      src: galleryBoatSculpture,
      category: "CULTURAL",
      title: "Golden Dragon Boat Shrine",
      description:
        "An ornate, gilded ceremonial dragon boat sculpture standing in a peaceful temple courtyard in Phnom Penh.",
    },
    {
      id: 18,
      src: galleryPalacePavilion,
      category: "CULTURAL",
      title: "Royal Palace Golden Spire",
      description:
        "The elegant architecture of the Royal Palace gilded pavilion surrounded by trimmed gardens under a dramatic sky.",
    },
    {
      id: 19,
      src: galleryRuralBasketCart,
      category: "CULTURAL",
      title: "Rural Basket Carrier",
      description:
        "A traditional Cambodian farm cart piled high with handcrafted bamboo baskets traveling down a rural dirt road.",
    },
    {
      id: 20,
      src: galleryMossyGateway,
      category: "CULTURAL",
      title: "Sacred Mossy Jungle Portal",
      description:
        "Ancient, moss-covered stone gateway standing inside the green jungles of the Angkor archaeological park.",
    },
    {
      id: 21,
      src: galleryPondStiltHouses,
      category: "CULTURAL",
      title: "Reflections of Floating Heritage",
      description:
        "Traditional wooden houses built on high stilts over a calm lake reflecting the classic orange-tiled roofs.",
    },
  ];

  const categories = ["ALL PHOTOS", "CULTURAL", "DARK TOURISM", "ECO TOURISM"];
  const [activeFilter, setActiveFilter] = useState("ALL PHOTOS");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Reviews List State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Jean-Pierre Laurent",
      location: "Paris, France",
      type: "foreigner",
      stars: 5,
      date: "June 02, 2026",
      comment:
        "An absolute masterpiece of human history. Watching the sun rise over the spires of Angkor Wat was a spiritual awakening. The local Khmer guides were incredibly knowledgeable.",
    },
    {
      id: 2,
      name: "Sopheap Sor",
      location: "Siem Reap, Cambodia",
      type: "local",
      stars: 5,
      date: "May 28, 2026",
      comment:
        "សប្បាយចិត្តខ្លាំងណាស់ដែលបានឃើញការអភិវឌ្ឍន៍ទេសចរណ៍ប្រកបដោយចីរភាពនៅទីនេះ។ មោទនភាពជាតិ! សូមស្វាគមន៍ភ្ញៀវទេសចរទាំងអស់មកកាន់ទឹកដីអង្គរដ៏ពិសិដ្ឋ។",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      location: "Sydney, Australia",
      type: "foreigner",
      stars: 5,
      date: "May 14, 2026",
      comment:
        "We spent three days in Koh Rong Sansloem. The water was crystalline and completely quiet. Angkor Lux curated details beautifully. A must-visit destination.",
    },
    {
      id: 4,
      name: "Channa Vattanak",
      location: "Phnom Penh, Cambodia",
      type: "local",
      stars: 5,
      date: "April 30, 2026",
      comment:
        "ព្រះរាជាណាចក្រអច្ឆរិយៈពិតប្រាកដ! ក្នុងនាមជាប្រជាជនក្នុងស្រុក យើងតែងតែស្វាគមន៍មិត្តភក្តិបរទេសដោយក្តីរីករាយ និងស្នាមញញឹម។ ស្រឡាញ់មាតុភូមិ!",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    type: "foreigner",
    stars: 5,
    comment: "",
  });

  const [hoverStars, setHoverStars] = useState(null);
  const [commentsFilter, setCommentsFilter] = useState("ALL");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const added = {
      id: Date.now(),
      name: newReview.name,
      location:
        newReview.location ||
        (newReview.type === "local" ? "Cambodia" : "International"),
      type: newReview.type,
      stars: newReview.stars,
      date: "Today",
      comment: newReview.comment,
    };

    setReviews([added, ...reviews]);
    setNewReview({
      name: "",
      location: "",
      type: "foreigner",
      stars: 5,
      comment: "",
    });
  };

  const filteredReviews = reviews.filter((rev) => {
    if (commentsFilter === "ALL") return true;
    if (commentsFilter === "FOREIGNERS") return rev.type === "foreigner";
    if (commentsFilter === "LOCALS") return rev.type === "local";
    return true;
  });

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "ALL PHOTOS" || item.category === activeFilter,
  );

  const openLightbox = (id) => {
    const indexInFiltered = filteredItems.findIndex((item) => item.id === id);
    setSelectedImageIndex(indexInFiltered);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : prev - 1,
      );
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === filteredItems.length - 1 ? 0 : prev + 1,
      );
    }
  };

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
          <span className="text-brand-gold font-serif text-s tracking-[0.25em] uppercase block">
            BEYOND THE SURFACE
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white tracking-widest font-normal uppercase">
            Gallery
          </h1>
          <p className="font-serif text-lg md:text-2xl text-brand-cream-dark/95 tracking-wide italic">
            Cambodia Through the Lens
          </p>
        </div>
      </section>

      {/* Categories Filter Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex justify-center items-center space-x-8 text-[10px] md:text-xs tracking-[0.2em] font-semibold text-brand-dark/60 uppercase border-y border-brand-gold/15 py-4">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`transition-colors duration-300 relative py-1 cursor-pointer ${
                  isActive
                    ? "text-brand-gold font-bold"
                    : "hover:text-brand-dark"
                }`}
              >
                <span>{cat}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of exactly 6 images */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item.id)}
            className="group relative rounded-none overflow-hidden aspect-square border border-brand-gold/10 hover:border-brand-gold/40 shadow-sm cursor-pointer bg-white transition-all duration-300"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Eye overlay on hover */}
            <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-center text-white space-y-1 p-4">
                <span className="text-[9px] font-bold tracking-widest uppercase text-brand-gold-light">
                  {item.category}
                </span>
                <h3 className="font-serif text-sm font-bold tracking-wide uppercase">
                  {item.title}
                </h3>
                <div className="pt-2 flex items-center justify-center text-xs text-brand-gold space-x-1">
                  <Eye size={12} />
                  <span>VIEW FULLSCREEN</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <div className="text-center pt-16">
        <span className="text-[10px] tracking-[0.3em] font-bold text-brand-gold-dark uppercase block">
          MORE STORIES TO UNCOVER
        </span>
      </div>

      {/* Comments / Guestbook Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-20 space-y-8 animate-fade-in">
        <div className="bg-white rounded-none p-6 md:p-8 border border-brand-gold/10 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-brand-gold/10">
            <h3 className="font-serif text-lg md:text-xl font-bold text-brand-dark tracking-wide uppercase flex items-center space-x-2.5">
              <MessageSquare className="text-brand-gold" size={18} />
              <span>Guest Guestbook</span>
            </h3>
          </div>

          {/* Filter Navigation */}
          <div className="flex space-x-6 text-[10px] tracking-widest font-semibold uppercase text-brand-dark/50 border-b border-brand-gold/10 pb-3">
            {["ALL", "FOREIGNERS", "LOCALS"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCommentsFilter(filter)}
                className={`transition-colors py-1 relative cursor-pointer ${commentsFilter === filter ? "text-brand-gold font-bold" : "hover:text-brand-dark"}`}
              >
                <span>{filter}</span>
                {commentsFilter === filter && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
                )}
              </button>
            ))}
          </div>

          {/* Reviews list render */}
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-brand-cream/15 border border-brand-gold/5 flex flex-col space-y-3 animate-fade-in"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0">
                      <User size={16} />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-bold tracking-wide text-brand-dark uppercase">
                        {rev.name}
                      </h4>
                      <span className="text-[9px] text-brand-dark/40 uppercase tracking-wider font-mono">
                        {rev.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex text-brand-gold space-x-0.5">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-sm md:text-base font-normal text-brand-dark/90 leading-relaxed font-sans">
                  "{rev.comment}"
                </p>
                <span className="text-[8px] text-brand-dark/30 text-right block font-mono">
                  {rev.date}
                </span>
              </div>
            ))}
          </div>

          {/* Leave a comment form (Permanently Visible) */}
          <div className="pt-6 border-t border-brand-gold/10">
            <form
              onSubmit={handleReviewSubmit}
              className="p-5 border border-brand-gold/20 bg-brand-cream-dark/15 space-y-4"
            >
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-brand-dark">
                Share Your Experience / Leave a Comment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-brand-gold/20 text-xs font-light focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. London, UK)"
                  value={newReview.location}
                  onChange={(e) =>
                    setNewReview({ ...newReview, location: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-brand-gold/20 text-xs font-light focus:outline-none focus:border-brand-gold"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <label className="text-[10px] font-bold text-brand-dark/50 uppercase">
                    Category:
                  </label>
                  <div className="flex space-x-3 text-xs">
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        checked={newReview.type === "foreigner"}
                        onChange={() =>
                          setNewReview({ ...newReview, type: "foreigner" })
                        }
                        className="text-brand-gold focus:ring-brand-gold"
                      />
                      <span>International</span>
                    </label>
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        checked={newReview.type === "local"}
                        onChange={() =>
                          setNewReview({ ...newReview, type: "local" })
                        }
                        className="text-brand-gold focus:ring-brand-gold"
                      />
                      <span>Local</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-[10px] font-bold text-brand-dark/50 uppercase">
                    Rating:
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, stars: starValue })
                        }
                        onMouseEnter={() => setHoverStars(starValue)}
                        onMouseLeave={() => setHoverStars(null)}
                        className="text-brand-gold hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                      >
                        <Star
                          size={18}
                          fill={
                            (
                              hoverStars !== null
                                ? starValue <= hoverStars
                                : starValue <= newReview.stars
                            )
                              ? "currentColor"
                              : "none"
                          }
                          className="transition-colors duration-150"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea
                required
                rows={3}
                placeholder="Share your thoughts about your journey in Cambodia..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                className="w-full p-3 bg-white border border-brand-gold/20 text-xs font-light leading-relaxed resize-none focus:outline-none focus:border-brand-gold"
              />
              <button
                type="submit"
                className="bg-brand-dark hover:bg-brand-dark-accent text-brand-gold text-[10px] font-bold tracking-widest uppercase py-3 px-6 rounded-none transition-all cursor-pointer"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-2">
            <div className="text-brand-cream-dark">
              <h4 className="font-serif text-lg md:text-xl text-brand-gold">
                {filteredItems[selectedImageIndex].title}
              </h4>
              <p className="text-xs text-brand-cream-dark/50 uppercase tracking-widest mt-0.5">
                Category: {filteredItems[selectedImageIndex].category}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cream-dark hover:text-brand-gold hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Stage */}
          <div className="flex-grow flex items-center justify-center relative w-full max-w-7xl mx-auto my-4">
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cream-dark hover:text-brand-gold hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={filteredItems[selectedImageIndex].src}
              alt={filteredItems[selectedImageIndex].title}
              className="max-h-[65vh] max-w-[85%] object-contain border border-brand-gold/20 shadow-2xl z-0"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cream-dark hover:text-brand-gold hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center w-full max-w-3xl mx-auto pb-4">
            <p className="text-sm md:text-base font-light text-brand-cream-dark/80 leading-relaxed">
              {filteredItems[selectedImageIndex].description}
            </p>
            <div className="flex justify-center items-center space-x-2 mt-4 text-xs text-brand-cream-dark/40 font-mono">
              <span>{selectedImageIndex + 1}</span>
              <span>/</span>
              <span>{filteredItems.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
