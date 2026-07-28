import { useState, useEffect } from "react";
import { CloudSun, DollarSign, RefreshCw, Radio } from "lucide-react";
import { fetchLiveWeather, fetchExchangeRate } from "../services/api";

export const LiveWeatherWidget = () => {
  const [selectedCity, setSelectedCity] = useState("Siem Reap");
  const [weather, setWeather] = useState(null);
  const [exchange, setExchange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usdInput, setUsdInput] = useState(1);

  const cities = ["Siem Reap", "Phnom Penh", "Kampot", "Koh Rong"];

  const loadData = async (city) => {
    setLoading(true);
    const [wData, eData] = await Promise.all([
      fetchLiveWeather(city),
      fetchExchangeRate(),
    ]);
    setWeather(wData);
    setExchange(eData);
    setLoading(false);
  };

  useEffect(() => {
    loadData(selectedCity);
  }, [selectedCity]);

  return (
    <div className="bg-brand-dark/95 text-brand-cream border-y border-brand-gold/20 py-3 px-6 md:px-12 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Left Side: Live Weather Selector & Status */}
        <div className="flex items-center space-x-3 flex-wrap justify-center md:justify-start">
          <div className="flex items-center space-x-1.5 bg-brand-gold/20 text-brand-gold px-2.5 py-1 rounded-full border border-brand-gold/30 text-[10px] font-bold tracking-wider uppercase">
            <Radio size={10} className="animate-pulse text-green-400" />
            <span>LIVE API</span>
          </div>

          <div className="flex items-center space-x-2 text-brand-cream-dark/80">
            <CloudSun size={15} className="text-brand-gold" />
            <span className="font-semibold text-brand-cream uppercase tracking-wider">
              Weather:
            </span>
          </div>

          {/* City Selection Buttons */}
          <div className="flex items-center space-x-1 bg-brand-forest/40 p-1 rounded-lg border border-brand-gold/15">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  selectedCity === city
                    ? "bg-brand-gold text-brand-dark font-bold shadow"
                    : "text-brand-cream-dark/70 hover:text-brand-cream"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Weather Details Display */}
          {loading ? (
            <div className="flex items-center space-x-1 text-brand-gold/70 animate-pulse">
              <RefreshCw size={12} className="animate-spin" />
              <span>Fetching live weather...</span>
            </div>
          ) : weather ? (
            <div className="flex items-center space-x-2 text-brand-cream bg-white/5 px-3 py-1 rounded-md border border-brand-gold/10">
              <span className="text-base">{weather.icon}</span>
              <span className="font-bold text-brand-gold">{weather.temp_c}°C</span>
              <span className="text-brand-cream-dark/70 font-light hidden sm:inline">
                ({weather.condition})
              </span>
            </div>
          ) : null}
        </div>

        {/* Right Side: USD -> KHR Live Exchange Rate Converter */}
        <div className="flex items-center space-x-3 flex-wrap justify-center md:justify-end">
          <div className="flex items-center space-x-1.5 text-brand-cream-dark/80">
            <DollarSign size={14} className="text-brand-gold" />
            <span className="font-semibold text-brand-cream uppercase tracking-wider">
              Currency Converter:
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-md border border-brand-gold/15">
            <div className="flex items-center space-x-1 font-mono text-brand-cream">
              <span className="text-brand-gold">$</span>
              <input
                type="number"
                min="1"
                max="9999"
                value={usdInput}
                onChange={(e) => setUsdInput(Math.max(1, Number(e.target.value) || 1))}
                className="w-12 bg-transparent text-center border-b border-brand-gold/40 text-brand-gold font-bold focus:outline-none"
              />
              <span className="text-[10px] text-brand-cream-dark/60 font-sans">USD</span>
            </div>

            <span className="text-brand-gold font-bold">=</span>

            <div className="font-mono text-brand-gold font-bold">
              {exchange ? (usdInput * exchange.rate).toLocaleString() : "4,120"}{" "}
              <span className="text-[10px] text-brand-cream-dark/70 font-sans uppercase">KHR</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
