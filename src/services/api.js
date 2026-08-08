/**
 * api.js - Destination Data Service & Local Mock API (Next.js Compatible)
 * Fetches destination details from /api/destinations.json with fallback data,
 * maps image keys to public photo assets, and filters by section category.
 */

import { supabase, isSupabaseConfigured } from "./supabase";
import fallbackDestinations from "../../public/api/destinations.json";

// Public asset paths for destination images
const heroAngkor = "/assets/hero_angkor.png";
const phnomPenhPalace = "/assets/phnom_penh_palace.png";
const killingFields = "/assets/killing_fields.png";
const tonleSap = "/assets/tonle_sap.png";
const yeakLaom = "/assets/yeak_laom.png";
const banteaySrei = "/assets/banteay_srei.png";
const watThmey = "/assets/wat_thmey.png";
const bayonTemplePhoto = "/assets/bayon_temple_photo.jpg";
const tuolSlengPhoto = "/assets/tuol_sleng_photo.jpg";
const bokorHillPhoto = "/assets/bokor_hill_photo.jpg";
const cardamomMountainsPhoto = "/assets/cardamom_mountains_photo.jpg";
const preahVihearPhoto = "/assets/preah_vihear_photo.jpg";
const kohRongSanloemPhoto = "/assets/koh_rong_sanloem_photo.jpg";

const IMAGE_MAP = {
  heroAngkor,
  bayonTemplePhoto,
  bayon: bayonTemplePhoto,
  "bayon-temple": bayonTemplePhoto,
  kohRongSanloemPhoto,
  "koh-rong": kohRongSanloemPhoto,
  preahVihearPhoto,
  "preah-vihear": preahVihearPhoto,
  tonleSap,
  "tonle-sap": tonleSap,
  bokorHillPhoto,
  "bokor-hill": bokorHillPhoto,
  tuolSlengPhoto,
  "tuol-sleng": tuolSlengPhoto,
  cardamomMountainsPhoto,
  "cardamom-mountains": cardamomMountainsPhoto,
  cardamoms: cardamomMountainsPhoto,
  phnomPenhPalace,
  "royal-palace": phnomPenhPalace,
  killingFields,
  "killing-fields": killingFields,
  watThmey,
  "wat-thmey": watThmey,
  banteaySrei,
  "banteay-srei": banteaySrei,
  yeakLaom,
  "yeak-laom": yeakLaom,
};

/**
 * 1. MOCK REST API: Fetch Destinations
 * Fetches destinations with a simulated network delay and fallback JSON.
 */
export async function fetchDestinations() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let data = fallbackDestinations;

  if (typeof window !== "undefined") {
    try {
      const response = await fetch(`/api/destinations.json?t=${Date.now()}`);
      if (response.ok) {
        data = await response.json();
      }
    } catch (error) {
      console.warn("API fetch error, using fallback destinations:", error);
      data = fallbackDestinations;
    }
  }

  if (!Array.isArray(data)) {
    data = fallbackDestinations;
  }

  return data.map((dest) => ({
    ...dest,
    image: IMAGE_MAP[dest.imageKey] || IMAGE_MAP[dest.id] || heroAngkor,
  }));
}

/**
 * 2. PERSISTENT GUESTBOOK API SERVICE
 */
const GUESTBOOK_STORAGE_KEY = "angkor_lux_guestbook_notes_v1";
const MY_NOTES_STORAGE_KEY = "angkor_lux_my_note_ids";

function getMyNoteIds() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(MY_NOTES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function addMyNoteId(id) {
  if (typeof window === "undefined") return;
  try {
    const current = getMyNoteIds();
    localStorage.setItem(
      MY_NOTES_STORAGE_KEY,
      JSON.stringify([...current, id]),
    );
  } catch (e) {
    console.warn("Failed to save note ID to localStorage:", e);
  }
}

const DEFAULT_GUESTBOOK_NOTES = [
  {
    id: 1,
    name: "Jean-Pierre Laurent",
    location: "Paris, France",
    stars: 5,
    date: "June 02, 2026",
    likes: 24,
    isLiked: false,
    isMyNote: false,
    comment:
      "Pictures really don't do Angkor Wat justice. It's huge, beautiful, and full of history. I spent hours exploring the temples, and every corner had something amazing to see.",
  },
  {
    id: 2,
    name: "Sopheap Sor",
    location: "Siem Reap, Cambodia",
    stars: 5,
    date: "May 28, 2026",
    likes: 19,
    isLiked: false,
    isMyNote: false,
    comment:
      "សប្បាយចិត្តខ្លាំងណាស់ដែលបានឃើញការអភិវឌ្ឍន៍ទេសចរណ៍ប្រកបដោយចីរភាពនៅទីនេះ។ មោទនភាពជាតិ! សូមស្វាគមន៍ភ្ញៀវទេសចរទាំងអស់មកកាន់ទឹកដីអង្គរដ៏ពិសិដ្ឋ។",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    location: "Sydney, Australia",
    stars: 5,
    date: "May 14, 2026",
    likes: 15,
    isLiked: false,
    isMyNote: false,
    comment:
      "We spent three days in Koh Rong Sanloem. The water was crystalline and completely quiet. Angkor Lux curated details beautifully. A must-visit destination.",
  },
  {
    id: 4,
    name: "Channa Vattanak",
    location: "Phnom Penh, Cambodia",
    stars: 5,
    date: "April 30, 2026",
    likes: 31,
    isLiked: false,
    isMyNote: false,
    comment:
      "ព្រះរាជាណាចក្រអច្ឆរិយៈពិតប្រាកដ! ក្នុងនាមជាប្រជាជនក្នុងស្រុក យើងតែងតែស្វាគមន៍មិត្តភក្តិបរទេសដោយក្តីរីករាយ និងស្នាមញញឹម។ ស្រឡាញ់មាតុភូមិ!",
  },
];

// DELETE (Remove a Note)
export async function deleteGuestbookNote(noteId) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("guestbook_reviews").delete().eq("id", noteId);
      return await fetchGuestbookNotes();
    } catch (err) {
      console.warn("Supabase delete failed, using local fallback:", err);
    }
  }

  try {
    const current = await fetchGuestbookNotes();
    const updated = current.filter((note) => note.id !== noteId);
    if (typeof window !== "undefined") {
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
  } catch (err) {
    console.error("Error deleting guestbook note:", err);
    return null;
  }
}

// READ (SELECT ALL REVIEWS)
export async function fetchGuestbookNotes() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("guestbook_reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const myNoteIds = getMyNoteIds();
        return data.map((note) => ({
          id: note.id,
          name: note.name,
          location: note.location || "Explorer",
          stars: Number(note.stars) || 5,
          date: note.date,
          likes: note.likes || 0,
          isLiked: false,
          isMyNote: Boolean(myNoteIds.includes(note.id)),
          comment: note.comment,
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch failed, using local storage fallback:", err);
    }
  }

  // Fallback to local storage / default mock data
  await new Promise((resolve) => setTimeout(resolve, 300));
  let notes = DEFAULT_GUESTBOOK_NOTES;
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          notes = parsed;
        }
      }
    } catch (err) {
      console.warn("Error loading saved guestbook notes:", err);
    }
  }

  const myNoteIds = getMyNoteIds();
  return notes.map((note) => ({
    ...note,
    isMyNote: Boolean(note.isMyNote || myNoteIds.includes(note.id)),
  }));
}

// CREATE (Insert a New Review)
export async function saveGuestbookNote(noteData) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  if (isSupabaseConfigured && supabase) {
    try {
      const payload = {
        name: noteData.name,
        location: noteData.location || "Explorer",
        stars: Number(noteData.stars) || 5,
        date: formattedDate,
        likes: 0,
        comment: noteData.comment,
      };

      const { data, error } = await supabase
        .from("guestbook_reviews")
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        addMyNoteId(data.id);
        const updatedNotes = await fetchGuestbookNotes();
        return {
          success: true,
          note: { ...data, isMyNote: true },
          notes: updatedNotes,
        };
      }
    } catch (err) {
      console.warn(
        "Supabase insert failed, using local storage fallback:",
        err,
      );
    }
  }

  // Fallback local save
  await new Promise((resolve) => setTimeout(resolve, 400));
  const noteId = Date.now();
  addMyNoteId(noteId);

  const newNote = {
    id: noteId,
    name: noteData.name,
    location: noteData.location || "Explorer",
    stars: Number(noteData.stars) || 5,
    date: formattedDate,
    likes: 0,
    isLiked: false,
    isMyNote: true,
    comment: noteData.comment,
  };

  try {
    const current = await fetchGuestbookNotes();
    const updated = [newNote, ...current];
    if (typeof window !== "undefined") {
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true, note: newNote, notes: updated };
  } catch (err) {
    console.error("Error saving guestbook note:", err);
    throw err;
  }
}

// UPDATE (Upvote / Like a Note)
export async function toggleLikeGuestbookNote(
  noteId,
  currentLikes,
  isCurrentlyLiked,
) {
  const newLikes = (currentLikes || 0) + (isCurrentlyLiked ? -1 : 1);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from("guestbook_reviews")
        .update({ likes: Math.max(0, newLikes) })
        .eq("id", noteId);
      return await fetchGuestbookNotes();
    } catch (err) {
      console.warn("Supabase upvote update failed, using local fallback:", err);
    }
  }

  try {
    const current = await fetchGuestbookNotes();
    const updated = current.map((note) =>
      note.id === noteId
        ? {
            ...note,
            likes: Math.max(0, newLikes),
            isLiked: !isCurrentlyLiked,
          }
        : note,
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
  } catch (err) {
    console.error("Error toggling like:", err);
    return null;
  }
}
