import { useState } from 'react';
import { Menu, X, Image, MapPin, Home, Map } from 'lucide-react';
import logoImg from '../assets/logo_gold.png';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'map', label: 'Map', icon: Map },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex md:grid md:grid-cols-[auto_1fr_auto] items-center justify-between px-6 py-4 rounded-2xl glass transition-all duration-300 shadow-xl border-brand-gold/20">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group justify-self-start"
          onClick={() => { setActiveTab('home'); setIsOpen(false); }}
        >
          <img src={logoImg} className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" alt="Angkor Lux Logo" />
          <span className="font-serif text-2xl font-bold tracking-widest text-brand-gold group-hover:text-brand-gold-light transition-colors whitespace-nowrap">
            ANGKOR LUX
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 justify-self-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center space-x-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 py-1.5 px-3 rounded-lg ${
                  isActive 
                    ? 'text-brand-gold font-bold' 
                    : 'text-brand-cream-dark/80 hover:text-brand-gold'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex justify-self-end">
          <button 
            onClick={() => setActiveTab('plan-trip')}
            className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-brand-gold/20"
          >
            PLAN YOUR TRIP
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-cream-dark hover:text-brand-gold transition-colors p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 px-2 animate-fade-in">
          <div className="rounded-2xl glass p-4 space-y-3 shadow-2xl border-brand-gold/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'text-brand-gold bg-brand-gold/10 font-semibold border-l-4 border-brand-gold' 
                      : 'text-brand-cream-dark/80 hover:bg-brand-gold/5'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-brand-gold' : 'text-brand-cream-dark/60'} />
                  <span className="text-sm tracking-wide uppercase">{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-brand-gold/10">
              <button
                onClick={() => {
                  setActiveTab('plan-trip');
                  setIsOpen(false);
                }}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3 rounded-md text-sm font-semibold tracking-wider uppercase transition-all duration-300 text-center block shadow-md shadow-brand-gold/20"
              >
                PLAN YOUR TRIP
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
