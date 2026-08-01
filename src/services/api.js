// Image asset mappings for destination images
import heroAngkor from "../assets/hero_angkor.png";
import phnomPenhPalace from "../assets/phnom_penh_palace.png";
import tuolSleng from "../assets/tuol_sleng.png";
import tuolSlengPhoto from "../assets/tuol_sleng_photo.jpg";
import killingFields from "../assets/killing_fields.png";
import bokorHill from "../assets/bokor_hill.png";
import bokorHillPhoto from "../assets/bokor_hill_photo.jpg";
import cardamomMountains from "../assets/cardamom_mountains.png";
import cardamomMountainsPhoto from "../assets/cardamom_mountains_photo.jpg";
import tonleSap from "../assets/tonle_sap.png";
import preahVihear from "../assets/preah_vihear.png";
import preahVihearPhoto from "../assets/preah_vihear_photo.jpg";
import yeakLaom from "../assets/yeak_laom.png";
import kohRongBeach from "../assets/koh_rong_beach.png";
import kohRongSanloemPhoto from "../assets/koh_rong_sanloem_photo.jpg";
import banteaySrei from "../assets/banteay_srei.png";
import watThmey from "../assets/wat_thmey.png";
import bayonBuddha from "../assets/bayon_buddha_close.jpg";
import bayonTemplePhoto from "../assets/bayon_temple_photo.jpg";

// Imported fallback JSON data to guarantee 100% load reliability
import fallbackDestinations from "../../public/api/destinations.json";
import fallbackWeather from "../../public/api/weather.json";

const IMAGE_MAP = {
  heroAngkor,
  phnomPenhPalace,
  tuolSleng: tuolSlengPhoto,
  tuolSlengPhoto,
  "tuol-sleng": tuolSlengPhoto,
  killingFields,
  bokorHill: bokorHillPhoto,
  bokorHillPhoto,
  "bokor-hill": bokorHillPhoto,
  cardamomMountains: cardamomMountainsPhoto,
  cardamomMountainsPhoto,
  "cardamom-mountains": cardamomMountainsPhoto,
  cardamoms: cardamomMountainsPhoto,
  tonleSap,
  preahVihear: preahVihearPhoto,
  preahVihearPhoto,
  "preah-vihear": preahVihearPhoto,
  yeakLaom,
  kohRongBeach: kohRongSanloemPhoto,
  kohRongSanloemPhoto,
  "koh-rong": kohRongSanloemPhoto,
  banteaySrei,
  watThmey,
  bayonBuddha: bayonTemplePhoto,
  bayonTemplePhoto,
  bayon: bayonTemplePhoto,
  bayonTemple: bayonTemplePhoto,
  "bayon-temple": bayonTemplePhoto,
};

// Coordinates for Cambodian cities (for Open-Meteo Live Weather API)
const CITIES_COORDS = {
  "Siem Reap": { lat: 13.36, lon: 103.86 },
  "Phnom Penh": { lat: 11.55, lon: 104.92 },
  "Kampot": { lat: 10.61, lon: 104.18 },
  "Koh Rong": { lat: 10.62, lon: 103.52 },
};

/**
 * 1. MOCK REST API: Fetch Destinations
 * Fetches destinations from /api/destinations.json with a simulated network delay.
 * Includes automatic fallback so it NEVER fails in production or dev server.
 */
export async function fetchDestinations() {
  // Simulate network latency (400ms) to demonstrate loading states
  await new Promise((resolve) => setTimeout(resolve, 400));

  let data = null;

  try {
    const baseUrl = import.meta.env.BASE_URL || "/";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    
    // Try primary path with cache buster
    let response = await fetch(`${cleanBase}api/destinations.json?t=${Date.now()}`);
    
    if (!response.ok) {
      // Try relative path with cache buster
      response = await fetch(`./api/destinations.json?t=${Date.now()}`);
    }

    if (response.ok) {
      data = await response.json();
    } else {
      console.warn("HTTP fetch returned non-200, using JSON module fallback");
      data = fallbackDestinations;
    }
  } catch (error) {
    console.warn("API fetch error, using JSON module fallback:", error);
    data = fallbackDestinations;
  }

  // Ensure data is valid array
  if (!Array.isArray(data)) {
    data = fallbackDestinations;
  }

  // Map image keys to actual imported image assets
  return data.map((dest) => {
    let img = IMAGE_MAP[dest.imageKey];
    if (dest.id === "cardamom-mountains" || dest.title?.toLowerCase().includes("cardamom")) {
      img = cardamomMountainsPhoto;
    } else if (dest.id === "tuol-sleng" || dest.title?.toLowerCase().includes("tuol sleng")) {
      img = tuolSlengPhoto;
    } else if (dest.id === "bokor-hill" || dest.title?.toLowerCase().includes("bokor")) {
      img = bokorHillPhoto;
    } else if (dest.id === "preah-vihear" || dest.title?.toLowerCase().includes("preah vihear")) {
      img = preahVihearPhoto;
    } else if (dest.id === "koh-rong" || dest.title?.toLowerCase().includes("koh rong")) {
      img = kohRongSanloemPhoto;
    } else if (dest.id === "bayon-temple" || dest.title?.toLowerCase().includes("bayon")) {
      img = bayonTemplePhoto;
    } else if (!img) {
      img = heroAngkor;
    }
    return {
      ...dest,
      image: img,
    };
  });
}

/**
 * 2. LIVE PUBLIC API: Open-Meteo Real-time Weather API
 * Fetches real weather data for Cambodian cities; falls back to weather.json
 */
export async function fetchLiveWeather(cityName = "Siem Reap") {
  const coords = CITIES_COORDS[cityName] || CITIES_COORDS["Siem Reap"];

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Weather API request failed");

    const data = await response.json();
    const cw = data.current_weather;

    // Convert weather code to friendly label & icon
    let condition = "Sunny";
    let icon = "☀️";
    if (cw.weathercode > 0 && cw.weathercode <= 3) {
      condition = "Partly Cloudy";
      icon = "⛅";
    } else if (cw.weathercode >= 45 && cw.weathercode <= 48) {
      condition = "Misty";
      icon = "🌫️";
    } else if (cw.weathercode >= 51) {
      condition = "Tropical Rain";
      icon = "🌧️";
    }

    return {
      city: cityName,
      temp_c: Math.round(cw.temperature * 10) / 10,
      wind_speed: cw.windspeed,
      condition,
      icon,
      isLive: true,
    };
  } catch (error) {
    console.warn("Live weather API failed, using fallback endpoint:", error);
    const cityKey = cityName.toLowerCase().replace(" ", "_");
    return {
      ...(fallbackWeather[cityKey] || fallbackWeather["siem_reap"]),
      isLive: false,
    };
  }
}

/**
 * 3. LIVE PUBLIC API: Open Exchange Rate API (USD to KHR Khmer Riel)
 */
export async function fetchExchangeRate() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!response.ok) throw new Error("Currency API error");

    const data = await response.json();
    const rate = data.rates?.KHR || 4100;

    return {
      base: "USD",
      target: "KHR",
      rate: Math.round(rate),
      lastUpdated: data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toLocaleDateString()
        : "Today",
      isLive: true,
    };
  } catch (err) {
    console.warn("Exchange rate API offline, fallback to standard rate", err);
    return {
      base: "USD",
      target: "KHR",
      rate: 4120,
      lastUpdated: "Standard Rate",
      isLive: false,
    };
  }
}

/**
 * 4. PERSISTENT GUESTBOOK API SERVICE
 * Provides persistent storage using localStorage with simulated network latency and API responses.
 */
const GUESTBOOK_STORAGE_KEY = "angkor_lux_guestbook_notes_v1";
const MY_NOTES_STORAGE_KEY = "angkor_lux_my_note_ids";

function getMyNoteIds() {
  try {
    const stored = localStorage.getItem(MY_NOTES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function addMyNoteId(id) {
  try {
    const current = getMyNoteIds();
    localStorage.setItem(MY_NOTES_STORAGE_KEY, JSON.stringify([...current, id]));
  } catch (e) {}
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
      "An absolute masterpiece of human history. Watching the sun rise over the spires of Angkor Wat was a spiritual awakening. The local Khmer guides were incredibly knowledgeable.",
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

export async function deleteGuestbookNote(noteId) {
  try {
    const current = await fetchGuestbookNotes();
    const updated = current.filter((note) => note.id !== noteId);
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error deleting guestbook note:", err);
    return null;
  }
}

export async function fetchGuestbookNotes() {
  // Simulate network API request latency (300ms)
  await new Promise((resolve) => setTimeout(resolve, 300));
  let notes = DEFAULT_GUESTBOOK_NOTES;
  try {
    const saved = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        notes = parsed.filter(
          (n) =>
            !n.comment?.toLowerCase().includes("sdfsdfs") &&
            !n.comment?.toLowerCase().includes("test")
        );
      }
    }
  } catch (err) {
    console.warn("Error loading saved guestbook notes:", err);
  }
  
  const myNoteIds = getMyNoteIds();
  return notes.map((note) => ({
    ...note,
    isMyNote: Boolean(note.isMyNote || myNoteIds.includes(note.id)),
  }));
}

export async function saveGuestbookNote(noteData) {
  // Simulate network API request latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const noteId = Date.now();
  addMyNoteId(noteId);

  const newNote = {
    id: noteId,
    name: noteData.name,
    location: noteData.location || "Explorer",
    stars: Number(noteData.stars) || 5,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    likes: 0,
    isLiked: false,
    isMyNote: true,
    comment: noteData.comment,
  };

  try {
    const current = await fetchGuestbookNotes();
    const updated = [newNote, ...current];
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, note: newNote, notes: updated };
  } catch (err) {
    console.error("Error saving guestbook note:", err);
    throw err;
  }
}

export async function toggleLikeGuestbookNote(noteId) {
  try {
    const current = await fetchGuestbookNotes();
    const updated = current.map((note) =>
      note.id === noteId
        ? {
            ...note,
            likes: (note.likes || 0) + (note.isLiked ? -1 : 1),
            isLiked: !note.isLiked,
          }
        : note
    );
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error toggling like:", err);
    return null;
  }
}
