import { useState, useEffect } from "react";
import { CloudSun, DollarSign, RefreshCw, Radio, Compass, ArrowRightLeft, ShieldCheck } from "lucide-react";
import { fetchLiveWeather, fetchExchangeRate } from "../services/api";

export const LiveWeatherWidget = ({ title = "Traveler's Live Intelligence", subtitle = "Real-time weather radar & financial exchange guide for Cambodia" }) => {
  const [selectedCity, setSelectedCity] = useState("Siem Reap");
  const [weather, setWeather] = useState(null);
  const [exchange, setExchange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usdInput, setUsdInput] = useState(10);

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
    <div className="bg-brand-dark/95 text-brand-cream border border-brand-gold/30 shadow-2xl rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden my-12">
      {/* Background Gold Radial Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gold/20 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center space-x-2 text-brand-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-1">
            <Radio size={12} className="animate-pulse text-green-400" />
            <span>LIVE TRAVEL DESK</span>
          </div>
          <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-normal uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-xs text-brand-cream-dark/70 font-light mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="self-start sm:self-auto inline-flex items-center space-x-2 bg-brand-gold/15 border border-brand-gold/30 px-3.5 py-1.5 rounded-full text-[11px] text-brand-gold font-mono">
          <ShieldCheck size={14} className="text-green-400" />
          <span>Live Data Stream</span>
        </div>
      </div>

      {/* Content Grid: Weather Left, Currency Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        
        {/* Left Column: Live Weather Radar (7 Cols) */}
        <div className="lg:col-span-7 bg-white/5 border border-brand-gold/20 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2 text-brand-gold text-xs font-semibold uppercase tracking-wider">
                <CloudSun size={18} />
                <span>Regional Weather Radar</span>
              </div>
              <span className="text-[10px] text-brand-cream-dark/50 font-mono">
                Live Satellite Forecast
              </span>
            </div>

            {/* City Selector Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    selectedCity === city
                      ? "bg-brand-gold text-brand-dark font-bold shadow-md shadow-brand-gold/20 scale-105"
                      : "bg-white/5 text-brand-cream-dark/70 hover:text-brand-cream hover:bg-white/10"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Weather Details Display */}
          {loading ? (
            <div className="py-10 text-center space-y-2 text-brand-gold/80">
              <RefreshCw size={24} className="animate-spin mx-auto" />
              <p className="text-xs font-mono">Updating weather for {selectedCity}...</p>
            </div>
          ) : weather ? (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-brand-dark/50 p-5 rounded-xl border border-brand-gold/15">
              <div className="sm:col-span-5 flex items-center space-x-3">
                <span className="text-4xl sm:text-5xl">{weather.icon}</span>
                <div>
                  <span className="font-cormorant text-4xl sm:text-5xl font-light text-brand-gold block">
                    {weather.temp_c}°C
                  </span>
                  <span className="text-xs text-brand-cream-dark/80 uppercase tracking-wider">
                    {weather.condition}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-7 space-y-1.5 border-t sm:border-t-0 sm:border-l border-brand-gold/20 pt-3 sm:pt-0 sm:pl-5 text-xs text-brand-cream-dark/80 font-light">
                <div className="flex justify-between">
                  <span className="text-brand-cream-dark/50 uppercase text-[10px]">Location:</span>
                  <span className="font-semibold text-brand-gold">{weather.city}, Cambodia</span>
                </div>
                {weather.wind_speed && (
                  <div className="flex justify-between">
                    <span className="text-brand-cream-dark/50 uppercase text-[10px]">Wind Velocity:</span>
                    <span>{weather.wind_speed} km/h</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-brand-cream-dark/50 uppercase text-[10px]">Visiting Advice:</span>
                  <span className="text-green-300 font-medium">Ideal for Sightseeing</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right Column: Currency Converter (5 Cols) */}
        <div className="lg:col-span-5 bg-white/5 border border-brand-gold/20 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-brand-gold text-xs font-semibold uppercase tracking-wider">
                <DollarSign size={18} />
                <span>USD to Khmer Riel (KHR)</span>
              </div>
              <span className="text-[10px] text-brand-cream-dark/50 font-mono">
                Official Daily Exchange
              </span>
            </div>

            {/* Interactive Calculator Input Box */}
            <div className="bg-brand-dark/60 border border-brand-gold/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-brand-cream-dark/50 uppercase font-bold tracking-wider">
                  Amount in USD ($)
                </span>
                <span className="text-[10px] text-brand-gold font-mono">
                  1 USD = {exchange ? exchange.rate.toLocaleString() : "4,120"} KHR
                </span>
              </div>

              <div className="flex items-center space-x-3 bg-white/5 px-3.5 py-2.5 rounded-lg border border-brand-gold/20">
                <span className="text-brand-gold font-bold text-lg">$</span>
                <input
                  type="number"
                  min="1"
                  max="50000"
                  value={usdInput}
                  onChange={(e) => setUsdInput(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-transparent text-white font-mono text-xl font-bold focus:outline-none"
                  placeholder="Enter USD..."
                />
                <span className="text-xs text-brand-cream-dark/60 font-sans font-bold">USD</span>
              </div>

              <div className="flex items-center justify-center space-x-2 pt-1 text-brand-gold/70 text-xs">
                <ArrowRightLeft size={14} />
                <span className="text-[11px] font-light">Converts to Official Riel Currency</span>
              </div>

              {/* Conversion Result Box */}
              <div className="bg-brand-gold/15 border border-brand-gold/40 p-3 rounded-lg text-center">
                <span className="block text-[10px] text-brand-cream-dark/60 uppercase font-bold tracking-wider">
                  Equivalent Value in Riel
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-brand-gold block mt-0.5">
                  {exchange ? (usdInput * exchange.rate).toLocaleString() : "41,200"}{" "}
                  <span className="text-xs font-sans font-semibold text-brand-cream">KHR (៛)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
