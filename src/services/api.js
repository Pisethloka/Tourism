// Image asset mappings for destination images
import heroAngkor from "../assets/hero_angkor.png";
import phnomPenhPalace from "../assets/phnom_penh_palace.png";
import tuolSleng from "../assets/tuol_sleng.png";
import killingFields from "../assets/killing_fields.png";
import bokorHill from "../assets/bokor_hill.png";
import cardamomMountains from "../assets/cardamom_mountains.png";
import tonleSap from "../assets/tonle_sap.png";
import preahVihear from "../assets/preah_vihear.png";
import yeakLaom from "../assets/yeak_laom.png";
import kohRongBeach from "../assets/koh_rong_beach.png";
import banteaySrei from "../assets/banteay_srei.png";
import watThmey from "../assets/wat_thmey.png";
import bayonBuddha from "../assets/bayon_buddha_close.jpg";

// Imported fallback JSON data to guarantee 100% load reliability
import fallbackDestinations from "../../public/api/destinations.json";
import fallbackWeather from "../../public/api/weather.json";

const IMAGE_MAP = {
  heroAngkor,
  phnomPenhPalace,
  tuolSleng,
  killingFields,
  bokorHill,
  cardamomMountains,
  tonleSap,
  preahVihear,
  yeakLaom,
  kohRongBeach,
  banteaySrei,
  watThmey,
  bayonBuddha,
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
    
    // Try primary path
    let response = await fetch(`${cleanBase}api/destinations.json`);
    
    if (!response.ok) {
      // Try relative path
      response = await fetch("./api/destinations.json");
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
  return data.map((dest) => ({
    ...dest,
    image: IMAGE_MAP[dest.imageKey] || heroAngkor,
  }));
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
