"use client";

/**
 * Navbar.jsx - Global Header Navigation Bar (Next.js App Router)
 * Renders the brand logo, navigation links with active pathname indicator,
 * mobile hamburger menu drawer, and the primary "Plan Your Trip" CTA button.
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Image as ImageIcon, MapPin, Home, MessageSquare } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/destinations", label: "Destinations", icon: MapPin },
    { href: "/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex md:grid md:grid-cols-[auto_1fr_auto] items-center justify-between px-6 py-4 rounded-2xl glass transition-all duration-300 shadow-xl border-brand-gold/20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 cursor-pointer group justify-self-start"
          onClick={() => setIsOpen(false)}
          aria-label="Go to Angkor Lux homepage"
        >
          <img
            src="/assets/logo_gold.png"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
            alt="Angkor Lux Logo"
          />
          <span className="font-serif text-2xl font-bold tracking-widest text-brand-gold group-hover:text-brand-gold-light transition-colors whitespace-nowrap">
            ANGKOR LUX
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 justify-self-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`relative flex items-center space-x-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 py-1.5 px-3 rounded-lg focus-visible:ring-2 focus-visible:ring-brand-gold ${
                  isActive
                    ? "text-brand-gold font-bold"
                    : "text-brand-cream-dark/95 hover:text-brand-gold"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex justify-self-end">
          <Link
            href="/plan-trip"
            prefetch={true}
            className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-gold inline-block"
          >
            PLAN YOUR TRIP
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-cream-dark hover:text-brand-gold transition-colors p-2 focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg cursor-pointer"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-brand-gold bg-brand-gold/10 font-semibold border-l-4 border-brand-gold"
                      : "text-brand-cream-dark/95 hover:bg-brand-gold/10"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-brand-gold" : "text-brand-cream-dark/70"}
                  />
                  <span className="text-sm tracking-wide uppercase">{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-brand-gold/10">
              <Link
                href="/plan-trip"
                prefetch={true}
                onClick={() => setIsOpen(false)}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 text-center block shadow-md shadow-brand-gold/20"
              >
                PLAN YOUR TRIP
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
