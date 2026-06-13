import { useState } from "react";
import { Mail, Phone, MapPin, Star, MessageSquare, User } from "lucide-react";
import { Accordion } from "../components/Accordion";
import heroAngkor from "../assets/hero_angkor.png";

export const Contact = () => {
  // 1. Initial reviews database
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

  // 2. Form States for leaving a review
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    type: "foreigner",
    stars: 5,
    comment: "",
  });

  const [hoverStars, setHoverStars] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // 3. Handle review submit
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
    if (activeFilter === "ALL") return true;
    if (activeFilter === "FOREIGNERS") return rev.type === "foreigner";
    if (activeFilter === "LOCALS") return rev.type === "local";
    return true;
  });

  const faqItems = [
    {
      title: "WHEN IS THE BEST TIME TO VISIT ANGKOR WAT?",
      content:
        "The ideal time to visit Angkor Wat is during the dry, cool season from November to February, when temperatures are pleasant and rainfall is minimal. Sunrise visits are best planned between 5:00 AM and 6:30 AM.",
    },
    {
      title: "DO I NEED A VISA TO ENTER CAMBODIA?",
      content:
        "Yes, most international travelers require a visa. You can obtain a 30-day Tourist Visa on Arrival at international airports for $30 USD, or apply in advance for an e-Visa online.",
    },
    {
      title: "WHAT IS THE DRESS CODE FOR TEMPLES?",
      content:
        "Angkor Wat and other active archaeological temples require conservative dress. Both shoulders and knees must be covered. Sleeveless shirts, tank tops, and short skirts or shorts are strictly prohibited.",
    },
    {
      title: "CAN YOU ARRANGE PRIVATE CHARTER FLIGHTS?",
      content:
        "Yes, our concierge desk can coordinate private helicopter transfers and charter flight arrangements within Cambodia (e.g., between Phnom Penh, Siem Reap, and Sihanoukville/islands).",
    },
    {
      title: "ARE LUXURY CRUISES AVAILABLE ON THE MEKONG?",
      content:
        "Yes, we partner with premier river cruise operators to offer bespoke multi-day journeys along the Mekong and Tonle Sap rivers, featuring luxury suite cabins and guided shore excursions.",
    },
    {
      title: "IS IT SAFE TO TRAVEL IN CAMBODIA?",
      content:
        "Cambodia is widely regarded as a safe and welcoming destination for international travelers. Standard travel precautions regarding personal belongings in busy market areas are recommended.",
    },
  ];

  return (
    <div className="pb-20 bg-brand-cream">
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
          <span className="text-brand-gold font-serif text-xs tracking-[0.25em] uppercase block">
            INQUIRIES & CONCIERGE
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white tracking-widest font-normal uppercase">
            Get in Touch
          </h1>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form: Reviews & Guest Comments */}
        <div className="lg:col-span-7 space-y-8 animate-fade-in">
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
                  onClick={() => setActiveFilter(filter)}
                  className={`transition-colors py-1 relative ${activeFilter === filter ? "text-brand-gold font-bold" : "hover:text-brand-dark"}`}
                >
                  <span>{filter}</span>
                  {activeFilter === filter && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
                  )}
                </button>
              ))}
            </div>

            {/* Reviews list render */}
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
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

        {/* Right Info: CONTACT DETAILS */}
        <div className="lg:col-span-5 space-y-8 animate-fade-in">
          <div className="bg-[#FAF7F0] rounded-none p-8 md:p-10 border border-brand-gold/15 shadow-sm space-y-8">
            <h3 className="font-serif text-xl md:text-2xl font-bold tracking-wide text-brand-dark uppercase border-b border-brand-gold/10 pb-3 flex flex-wrap items-baseline">
              <span className="font-sans font-bold text-brand-dark">
                ព័ត៌មានទំនាក់ទំនង
              </span>
              <span className="font-serif italic text-sm md:text-base text-brand-gold-dark lowercase ml-2.5 font-normal">
                / contact details
              </span>
            </h3>

            <ul className="space-y-6 text-sm md:text-base font-normal text-brand-dark/80">
              <li className="flex items-start space-x-3.5">
                <Mail size={18} className="text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-brand-dark uppercase tracking-wider flex flex-wrap items-baseline">
                    <span className="font-sans font-bold text-sm md:text-[15px]">
                      ព័ត៌មានទូទៅ
                    </span>
                    <span className="font-serif italic text-xs md:text-sm text-brand-gold-dark lowercase ml-2 font-normal">
                      / general inquiries
                    </span>
                  </h4>
                  <p className="mt-1.5 text-brand-dark/95 font-mono text-sm md:text-base">
                    concierge@angkorlux.kh
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3.5">
                <Phone size={18} className="text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-brand-dark uppercase tracking-wider flex flex-wrap items-baseline">
                    <span className="font-sans font-bold text-sm md:text-[15px]">
                      អ្នករៀបចំគម្រោងកម្សាន្ត
                    </span>
                    <span className="font-serif italic text-xs md:text-sm text-brand-gold-dark lowercase ml-2 font-normal">
                      / travel designer
                    </span>
                  </h4>
                  <p className="mt-1.5 text-brand-dark/95 font-mono text-sm md:text-base">
                    +855 (0) 23 999 888
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3.5">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-brand-dark uppercase tracking-wider flex flex-wrap items-baseline">
                    <span className="font-sans font-bold text-sm md:text-[15px]">
                      ការិយាល័យកណ្តាល
                    </span>
                    <span className="font-serif italic text-xs md:text-sm text-brand-gold-dark lowercase ml-2 font-normal">
                      / office headquarters
                    </span>
                  </h4>
                  <p className="mt-1.5 text-brand-dark/95 leading-relaxed font-sans text-base md:text-lg">
                    វិថីសុធារស ភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា
                    <span className="block text-xs md:text-sm text-brand-dark/60 mt-1 font-light font-sans">
                      No. 24, Sothearos Blvd, Phnom Penh, Kingdom of Cambodia
                    </span>
                  </p>
                </div>
              </li>
            </ul>

            <div className="pt-6 border-t border-brand-gold/10 space-y-4">
              <h4 className="text-brand-dark uppercase tracking-wider flex flex-wrap items-baseline">
                <span className="font-sans font-bold text-sm md:text-[15px]">
                  ម៉ោងបម្រើការងារ
                </span>
                <span className="font-serif italic text-xs md:text-sm text-brand-gold-dark lowercase ml-2 font-normal">
                  / concierge hours
                </span>
              </h4>
              <div className="grid grid-cols-2 text-base font-normal text-brand-dark/75 gap-y-3 font-sans">
                <div className="flex flex-col">
                  <span className="font-semibold text-brand-dark text-[15px]">
                    ចន្ទ – សុក្រ
                  </span>
                  <span className="text-xs text-brand-dark/70 font-light">
                    Mon – Fri
                  </span>
                </div>
                <span className="text-right font-mono self-center text-sm md:text-base">
                  08:00 – 20:00
                </span>

                <div className="flex flex-col">
                  <span className="font-semibold text-brand-dark text-[15px]">
                    សៅរ៍
                  </span>
                  <span className="text-xs text-brand-dark/70 font-light">
                    Saturday
                  </span>
                </div>
                <span className="text-right font-mono self-center text-sm md:text-base">
                  09:00 – 15:00
                </span>

                <div className="flex flex-col">
                  <span className="font-semibold text-brand-dark text-[15px]">
                    អាទិត្យ
                  </span>
                  <span className="text-xs text-brand-dark/70 font-light">
                    Sunday
                  </span>
                </div>
                <span className="text-right italic text-red-600/50 self-center text-sm md:text-base">
                  បិទ (Closed)
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-white rounded-none border border-brand-gold/15 p-2 shadow-sm">
            <div className="h-64 relative overflow-hidden border border-brand-gold/10">
              <iframe
                src="https://maps.google.com/maps?q=No.%2024,%20Sothearos%20Blvd,%20Phnom%20Penh,%20Cambodia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Angkor Lux Headquarters Location"
                className="w-full h-full grayscale-[10%] contrast-[105%] hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="pt-3 px-1 flex justify-between items-center text-[10px] tracking-widest text-brand-dark/50 uppercase font-mono">
              <span>Coordinates: 11.5564° N, 104.9282° E</span>
              <a
                href="https://maps.google.com/?q=No.+24,+Sothearos+Blvd,+Phnom+Penh,+Cambodia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:text-brand-gold-dark font-bold transition-colors"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FAQ Section */}
      <section className="pt-16 border-t border-brand-gold/15 max-w-4xl mx-auto px-6">
        <div className="text-center space-y-2 mb-12 animate-fade-in">
          <span className="text-brand-gold-dark font-serif text-[10px] tracking-[0.25em] uppercase block">
            COMMON INQUIRIES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark uppercase tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="flex justify-center pt-2">
            <div className="w-2.5 h-2.5 bg-brand-gold transform rotate-45" />
          </div>
        </div>

        <div className="animate-fade-in">
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  );
};
