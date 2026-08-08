"use client";

/**
 * src/app/guestbook/page.jsx - Next.js App Router Traveler Testimonials & Guestbook
 * Displays traveler reviews, star breakdown statistics, search/sort controls,
 * helpful upvoting, local state persistence, and guest note submission form.
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  MapPin,
  Send,
  Calendar,
  Loader2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Quote,
  LayoutGrid,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import {
  fetchGuestbookNotes,
  saveGuestbookNote,
  toggleLikeGuestbookNote,
  deleteGuestbookNote,
} from "../../services/api";

const heroAngkor = "/assets/hero_angkor.png";

export default function GuestbookPage() {
  const [reviews, setReviews] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    stars: 5,
    comment: "",
  });

  const [hoverStars, setHoverStars] = useState(null);
  const [successToast, setSuccessToast] = useState(false);

  // Filter State
  const [reviewFilter, setReviewFilter] = useState("ALL");
  const [reviewQuery, setReviewQuery] = useState("");

  // View Mode
  const [viewMode, setViewMode] = useState("CAROUSEL");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    async function loadNotes() {
      setLoadingNotes(true);
      const data = await fetchGuestbookNotes();
      setReviews(data);
      setLoadingNotes(false);
    }
    loadNotes();
  }, []);

  const handleLikeReview = useCallback(async (id) => {
    let targetNote = null;
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          targetNote = r;
          return {
            ...r,
            likes: (r.likes || 0) + (r.isLiked ? -1 : 1),
            isLiked: !r.isLiked,
          };
        }
        return r;
      }),
    );
    if (targetNote) {
      await toggleLikeGuestbookNote(id, targetNote.likes, targetNote.isLiked);
    }
  }, []);

  const handleReviewSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newReview.name || !newReview.comment || isSubmitting) return;
      setIsSubmitting(true);
      try {
        const result = await saveGuestbookNote(newReview);
        if (result.success) {
          setReviews(result.notes);
          setNewReview({
            name: "",
            location: "",
            stars: 5,
            comment: "",
          });
          setSuccessToast(true);
          setTimeout(() => setSuccessToast(false), 4000);
        }
      } catch (err) {
        console.error("Failed to post note:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [newReview, isSubmitting],
  );

  const handleDeleteReview = useCallback(async (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    await deleteGuestbookNote(id);
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      if (reviewFilter === "5_STARS" && rev.stars !== 5) return false;
      if (reviewFilter === "MY_NOTES" && !rev.isMyNote) return false;

      if (reviewQuery.trim() !== "") {
        const q = reviewQuery.toLowerCase();
        const matchName = rev.name?.toLowerCase().includes(q);
        const matchLoc = rev.location?.toLowerCase().includes(q);
        const matchComment = rev.comment?.toLowerCase().includes(q);
        return matchName || matchLoc || matchComment;
      }
      return true;
    });
  }, [reviews, reviewFilter, reviewQuery]);

  const ratingStats = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    reviews.forEach((r) => {
      const s = Math.min(5, Math.max(1, Math.round(r.stars || 5)));
      counts[s] = (counts[s] || 0) + 1;
      sum += s;
    });
    const total = reviews.length;
    const avg = total > 0 ? (sum / total).toFixed(1) : "4.9";
    return { counts, total, avg };
  }, [reviews]);

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE) || 1;

  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredReviews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredReviews, currentPage]);

  const activeCarouselItem = useMemo(() => {
    if (filteredReviews.length === 0) return null;
    const len = filteredReviews.length;
    const validIdx = ((carouselIndex % len) + len) % len;
    return filteredReviews[validIdx];
  }, [filteredReviews, carouselIndex]);

  const handleNextCarousel = useCallback(() => {
    setCarouselIndex((prev) => prev + 1);
  }, []);

  const handlePrevCarousel = useCallback(() => {
    setCarouselIndex((prev) => prev - 1);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark animate-fade-in pb-20">
      {/* Editorial Luxury Hero Section */}
      <section className="relative bg-brand-dark text-brand-cream pt-32 pb-20 px-6 md:px-12 overflow-hidden mb-16 border-b border-brand-gold/25">
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${heroAngkor})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent z-0" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center space-x-2.5 bg-brand-gold/15 border border-brand-gold/30 px-4 py-1.5 rounded-full text-brand-gold text-xs font-mono font-bold tracking-widest uppercase">
            <span>TRAVELER REGISTRY & REFLECTIONS</span>
          </div>
          <h1 className="font-cormorant text-5xl md:text-6xl font-normal tracking-wide text-white uppercase leading-tight">
            The Kingdom Guestbook
          </h1>
          <p className="font-sans text-base md:text-lg font-light text-brand-cream-dark/85 leading-relaxed max-w-3xl">
            Memories, stories, and genuine reflections written by honored guests
            exploring the heritage and culture of Cambodia.
          </p>
        </div>
      </section>

      {/* Main Guestbook Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="bg-[#FAF8F5] border border-brand-gold/35 p-8 sm:p-10 rounded-[2.5rem] text-left relative overflow-hidden shadow-md text-brand-dark space-y-8 animate-fade-in">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 border-b border-brand-gold/20 pb-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center space-x-2 text-brand-gold-dark text-[12px] font-bold tracking-[0.3em] uppercase">
                <span>GUEST REVIEWS & ANALYTICS</span>
              </div>

              <h2 className="font-cormorant text-3xl sm:text-4xl font-normal text-brand-dark uppercase tracking-wider leading-tight">
                Traveler Reflections
              </h2>
              <p className="font-sans text-sm sm:text-base font-light text-brand-dark/75 leading-relaxed">
                Read authentic reflections penned by travelers below, or scroll
                to the bottom to submit your own note.
              </p>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("write-note-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-brand-gold/20 cursor-pointer flex items-center space-x-2 font-sans"
              >
                <MessageSquare size={16} />
                <span>+ Write a Note</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 pt-2">
            {/* Left Overall Rating Box - Perfectly Centered */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 bg-white/95 rounded-2xl border border-brand-gold/30 text-center shadow-xs w-full">
              <span className="font-cormorant text-6xl sm:text-7xl font-bold text-brand-gold-dark leading-none block text-center tracking-tight">
                {ratingStats.avg}
              </span>
              <div className="flex items-center justify-center text-brand-gold-dark space-x-1.5 my-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    className="fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-brand-dark/75 text-center leading-normal">
                Out of 5.0 Rating Score ({ratingStats.total} {ratingStats.total === 1 ? "Note" : "Notes"})
              </p>
            </div>

            {/* Right Star Breakdown - Perfectly Aligned Rows */}
            <div className="md:col-span-7 space-y-3.5 w-full">
              {[5, 4, 3, 2, 1].map((starNum) => {
                const count = ratingStats.counts[starNum] || 0;
                const pct =
                  ratingStats.total > 0
                    ? Math.round((count / ratingStats.total) * 100)
                    : 0;

                return (
                  <div
                    key={starNum}
                    className="flex items-center space-x-3 text-sm w-full"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (starNum === 5) setReviewFilter("5_STARS");
                        else setReviewFilter("ALL");
                      }}
                      className="flex items-center justify-start space-x-1.5 shrink-0 w-14 text-brand-dark font-bold hover:text-brand-gold-dark cursor-pointer font-mono text-xs sm:text-sm"
                    >
                      <span className="tabular-nums">{starNum}</span>
                      <Star
                        size={14}
                        className="fill-brand-gold text-brand-gold"
                      />
                    </button>

                    <div className="flex-grow bg-brand-dark/10 h-3 rounded-full overflow-hidden relative shadow-inner">
                      <div
                        className="bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <span className="w-24 text-right font-mono text-xs sm:text-sm text-brand-dark/70 font-semibold tabular-nums shrink-0">
                      {count} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Centered Search & View Mode Toggle Bar Above User Reviews */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Live Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search reflections..."
              value={reviewQuery}
              onChange={(e) => setReviewQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-brand-gold/35 rounded-full text-xs font-normal text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 shadow-xs"
            />
            <Search
              size={14}
              className="text-brand-gold-dark/60 absolute left-3.5 top-1/2 -translate-y-1/2"
            />
          </div>

          <div className="inline-flex items-center space-x-1 bg-white border border-brand-gold/35 p-1.5 rounded-full shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("CAROUSEL")}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === "CAROUSEL"
                  ? "bg-brand-dark text-brand-gold shadow-xs"
                  : "text-brand-dark/70 hover:text-brand-dark"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Spotlight</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("GRID")}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === "GRID"
                  ? "bg-brand-dark text-brand-gold shadow-xs"
                  : "text-brand-dark/70 hover:text-brand-dark"
              }`}
            >
              <LayoutGrid size={14} />
              <span>Grid</span>
            </button>
          </div>
        </div>

        {successToast && (
          <div className="bg-emerald-900 text-emerald-100 border border-emerald-500/50 p-4 rounded-2xl text-xs flex items-center space-x-3 animate-fade-in shadow-md font-sans max-w-2xl mx-auto">
            <CheckCircle2 size={18} className="text-emerald-300 shrink-0" />
            <div>
              <span className="font-bold text-sm block">Note Published!</span>
              <span className="text-xs text-emerald-200">
                Thank you! Your guestbook entry has been posted below.
              </span>
            </div>
          </div>
        )}

        {loadingNotes ? (
          <div className="py-16 text-center space-y-2 text-brand-gold-dark">
            <Loader2 size={24} className="animate-spin mx-auto" />
            <span className="text-xs font-sans text-brand-dark/60 block">
              Fetching guestbook notes...
            </span>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-12 text-center text-xs text-brand-dark/60 italic font-sans bg-[#FAF8F5] rounded-3xl border border-brand-gold/20">
            No matching reflections found. Try adjusting your search or filters.
          </div>
        ) : viewMode === "CAROUSEL" && activeCarouselItem ? (
          <div className="relative w-full py-2">
            <div className="bg-[#FAF8F5] text-brand-dark border border-brand-gold/40 rounded-[2.5rem] p-8 sm:p-12 shadow-xl relative overflow-hidden transition-all duration-500 font-sans group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold/30 via-brand-gold to-brand-gold/30" />
              <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gradient-to-br from-brand-gold/20 via-brand-gold/5 to-transparent blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gold/20 pb-6 mb-6 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-brand-gold/20 border-2 border-brand-gold/40 flex items-center justify-center font-bold text-brand-gold-dark font-cormorant text-xl shrink-0 shadow-md">
                    {activeCarouselItem.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <h4 className="font-cormorant text-2xl sm:text-3xl font-bold text-brand-dark tracking-wide uppercase">
                        {activeCarouselItem.name}
                      </h4>
                      {activeCarouselItem.isMyNote && (
                        <span className="text-[10px] font-mono font-bold bg-brand-gold/20 text-brand-dark border border-brand-gold/35 px-2.5 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-brand-dark/65 font-medium mt-1">
                      <MapPin size={13} className="text-brand-gold-dark" />
                      <span>{activeCarouselItem.location}</span>
                      <span className="text-brand-dark/30">•</span>
                      <Calendar size={13} className="text-brand-gold-dark" />
                      <span>{activeCarouselItem.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end space-y-1">
                  <div className="flex text-brand-gold-dark space-x-1">
                    {[...Array(activeCarouselItem.stars)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-gold-dark bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/25">
                    Verified Reflection
                  </span>
                </div>
              </div>

              <div className="relative py-2 px-2 sm:px-6">
                <Quote
                  size={48}
                  className="text-brand-gold-dark/15 absolute -top-4 -left-2 select-none pointer-events-none"
                />
                <p className="font-serif text-lg sm:text-2xl italic font-normal text-brand-dark/95 leading-relaxed relative z-10">
                  “{activeCarouselItem.comment}”
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-6 border-t border-brand-gold/20 relative z-10">
                <button
                  type="button"
                  onClick={() => handleLikeReview(activeCarouselItem.id)}
                  className={`px-5 py-2 rounded-full transition-all flex items-center space-x-2 cursor-pointer font-sans text-xs ${
                    activeCarouselItem.isLiked
                      ? "bg-brand-gold text-brand-dark font-bold shadow-md scale-105"
                      : "bg-white border border-brand-gold/30 hover:bg-brand-gold/15 text-brand-dark"
                  }`}
                >
                  <ThumbsUp
                    size={14}
                    className={
                      activeCarouselItem.isLiked ? "fill-brand-dark" : ""
                    }
                  />
                  <span>Helpful ({activeCarouselItem.likes || 0})</span>
                </button>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevCarousel}
                    className="w-10 h-10 rounded-full bg-white border border-brand-gold/35 flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-xs cursor-pointer"
                    aria-label="Previous reflection"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <span className="text-xs font-mono text-brand-dark/65 font-bold tracking-widest">
                    {(((carouselIndex % filteredReviews.length) +
                      filteredReviews.length) %
                      filteredReviews.length) +
                      1}{" "}
                    / {filteredReviews.length}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextCarousel}
                    className="w-10 h-10 rounded-full bg-white border border-brand-gold/35 flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-xs cursor-pointer"
                    aria-label="Next reflection"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {paginatedReviews.map((rev) => {
                const initials = rev.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={rev.id}
                    className="bg-[#FAF8F5] text-brand-dark border border-brand-gold/35 p-7 sm:p-8 rounded-3xl flex flex-col justify-between space-y-5 shadow-xs hover:shadow-xl hover:border-brand-gold/60 hover:-translate-y-1.5 transition-all duration-300 animate-fade-in font-sans relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-11 h-11 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center font-bold text-brand-gold-dark font-sans text-sm shrink-0 shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-cormorant text-2xl font-bold text-brand-dark tracking-wide uppercase">
                                {rev.name}
                              </h4>
                              {rev.isMyNote && (
                                <span className="text-[10px] font-mono font-bold bg-brand-gold/20 text-brand-dark border border-brand-gold/35 px-2 py-0.5 rounded-full">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1.5 text-xs text-brand-dark/60 font-medium mt-0.5">
                              <MapPin
                                size={11}
                                className="text-brand-gold-dark"
                              />
                              <span>{rev.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex text-brand-gold-dark space-x-1">
                          {[...Array(rev.stars)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                      </div>

                      <div className="relative pt-1">
                        <span className="font-cormorant text-5xl text-brand-gold-dark/20 leading-none absolute -top-4 -left-2 select-none pointer-events-none">
                          “
                        </span>
                        <p className="text-sm sm:text-base font-light text-brand-dark/90 leading-relaxed relative z-10 pl-3">
                          {rev.comment}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-brand-gold/20 text-xs text-brand-dark/60 font-sans relative z-10">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={12} className="text-brand-gold-dark" />
                        <span>{rev.date}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleLikeReview(rev.id)}
                          className={`px-3.5 py-1.5 rounded-full transition-all flex items-center space-x-1.5 cursor-pointer font-sans text-xs ${
                            rev.isLiked
                              ? "bg-brand-gold text-brand-dark font-bold scale-105 shadow-xs"
                              : "bg-white border border-brand-gold/25 hover:bg-brand-gold/15 text-brand-dark"
                          }`}
                        >
                          <ThumbsUp
                            size={12}
                            className={rev.isLiked ? "fill-brand-dark" : ""}
                          />
                          <span>Helpful ({rev.likes || 0})</span>
                        </button>

                        {rev.isMyNote && (
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(rev.id)}
                            title="Delete your note"
                            className="p-1.5 rounded-full bg-white hover:bg-red-50 text-brand-dark/50 hover:text-red-600 border border-brand-gold/20 transition-colors cursor-pointer flex items-center space-x-1"
                          >
                            <Trash2 size={12} />
                            <span className="text-xs font-sans text-red-600 hidden sm:inline">
                              Delete
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-3 pt-6 font-sans">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-full border border-brand-gold/30 bg-white text-xs font-bold uppercase tracking-wider text-brand-dark hover:bg-brand-gold disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
                >
                  Prev
                </button>

                <div className="flex items-center space-x-1.5">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-brand-gold text-brand-dark shadow-xs"
                            : "bg-white border border-brand-gold/25 text-brand-dark/70 hover:border-brand-gold"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="px-4 py-2 rounded-full border border-brand-gold/30 bg-white text-xs font-bold uppercase tracking-wider text-brand-dark hover:bg-brand-gold disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        <section id="write-note-form" className="pt-8 pb-12 animate-fade-in font-sans">
          <div className="w-full bg-[#FAF8F5] text-brand-dark rounded-[2.5rem] border border-brand-gold/35 shadow-xl overflow-hidden">
            <div className="bg-[#2D2B28] text-white p-8 sm:p-10 text-center space-y-3 relative overflow-hidden">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-center space-x-3 text-brand-gold relative z-10 mb-2">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-gold/70" />
                <svg
                  width="48"
                  height="24"
                  viewBox="0 0 48 24"
                  fill="none"
                  className="text-brand-gold shrink-0"
                >
                  <path
                    d="M24 1 C26 5, 29 7, 33 5 C31 9, 36 10, 42 7 C38 12, 44 14, 48 13 C42 16, 45 20, 47 23 C40 21, 37 23, 33 21 C29 23, 26 21, 24 23 C22 21, 19 23, 15 21 C11 23, 8 21, 1 23 C3 20, 6 16, 0 13 C4 14, 10 12, 6 7 C12 10, 17 9, 15 5 C19 7, 22 5, 24 1 Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                  <circle
                    cx="24"
                    cy="12"
                    r="3"
                    fill="#2D2B28"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="24" cy="12" r="1.2" fill="currentColor" />
                </svg>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-gold/70" />
              </div>

              <h3 className="font-cormorant text-3xl sm:text-4xl font-bold tracking-wider text-brand-gold uppercase leading-snug relative z-10">
                WRITE YOUR GUESTBOOK
                <br />
                NOTE
              </h3>
              <p className="text-xs sm:text-sm text-brand-cream-dark/80 font-light max-w-md mx-auto leading-relaxed relative z-10">
                Pen your memories, recommendations, or reflections for honored
                guests exploring the Kingdom of Cambodia.
              </p>
            </div>

            <form
              onSubmit={handleReviewSubmit}
              className="p-8 sm:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm sm:text-base font-sans font-semibold text-amber-950 block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mai sokun"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    className="w-full p-4 bg-white/90 border border-amber-300/80 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-sm sm:text-base font-sans font-semibold text-amber-950 block mb-2">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paris, France or Siem Reap"
                    value={newReview.location}
                    onChange={(e) =>
                      setNewReview({ ...newReview, location: e.target.value })
                    }
                    className="w-full p-4 bg-white/90 border border-amber-300/80 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm sm:text-base font-sans font-semibold text-amber-950 block mb-2">
                  Your Rating & Experience
                </label>
                <div className="flex items-center space-x-4 bg-white/70 p-3.5 rounded-xl border border-amber-200/80 w-fit">
                  <div className="flex items-center space-x-1.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const activeStars =
                        hoverStars !== null ? hoverStars : newReview.stars;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() =>
                            setNewReview({ ...newReview, stars: starValue })
                          }
                          onMouseEnter={() => setHoverStars(starValue)}
                          onMouseLeave={() => setHoverStars(null)}
                          className="text-amber-500 hover:text-amber-600 hover:scale-125 transition-transform focus:outline-none cursor-pointer p-0.5"
                        >
                          <Star
                            size={24}
                            fill={
                              starValue <= activeStars ? "currentColor" : "none"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="h-5 w-px bg-amber-300/60" />

                  <span className="text-sm sm:text-base text-slate-800 font-sans font-medium">
                    {(() => {
                      const s =
                        hoverStars !== null ? hoverStars : newReview.stars;
                      if (s === 5) return "Exceptional (5.0 / 5.0)";
                      if (s === 4) return "Wonderful (4.0 / 5.0)";
                      if (s === 3) return "Memorable (3.0 / 5.0)";
                      if (s === 2) return "Good (2.0 / 5.0)";
                      return "Fair (1.0 / 5.0)";
                    })()}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm sm:text-base font-sans font-semibold text-amber-950 block mb-2">
                  Comment *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your memorable moments, tips, or reflections about exploring Cambodia..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full p-4 bg-white/90 border border-amber-300/80 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 resize-none leading-relaxed font-sans transition-all shadow-sm"
                />
              </div>

              <div className="pt-4 border-t border-amber-300/40">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold hover:bg-amber-500 text-brand-dark py-4 rounded-xl text-sm sm:text-base font-sans font-bold tracking-wide transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-md shadow-brand-gold/25 flex items-center justify-center space-x-2.5 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin text-brand-dark"
                      />
                      <span>Posting Note to Guestbook...</span>
                    </>
                  ) : (
                    <>
                      <span>Post Note to Guestbook</span>
                      <Send size={18} className="text-brand-dark" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
