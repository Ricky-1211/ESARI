import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  ShoppingBag,
  Sparkles,
  Heart,
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";
import { BRAND_INFO } from "../data/brandData";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    subtotal,
    formatPrice
  } = useShop();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Exact navigation items specified in prompt:
  // Home | About Us | Collections | Our Story | Contact
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Collections", path: "/collections" },
    { name: "Our Story", path: "/our-story" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      {/* 1. Top Luxury Announcement Bar with Zoho Status & Quick Contacts */}
      <div className="bg-charcoal text-ivory text-xs border-b border-gold/25 py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          {/* Brand Tagline Announcement */}
          <div className="flex items-center gap-2 text-gold-light tracking-wide text-[11px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
            <span className="font-serif italic font-medium">
              {BRAND_INFO.tagline}
            </span>
          </div>

          {/* Quick Concierge Contacts & Zoho Status */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-ivory/85">
            {/* Zoho Status Badge */}
            <span className="hidden md:inline-flex items-center gap-1 bg-burgundy/80 text-gold-light border border-gold/30 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-medium">
              <Clock className="w-2.5 h-2.5 text-gold" />
              <span>Zoho: {BRAND_INFO.zohoStatus}</span>
            </span>

            <span className="text-gold/40 hidden md:inline">|</span>

            <a
              href={`tel:${BRAND_INFO.phoneRaw}`}
              className="hover:text-gold transition-colors flex items-center gap-1.5"
              title="Call ESARI Concierge"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span>{BRAND_INFO.phone}</span>
            </a>

            <span className="text-gold/40 hidden sm:inline">|</span>

            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="hover:text-gold transition-colors hidden sm:flex items-center gap-1.5"
              title="Email ESARI Concierge"
            >
              <Mail className="w-3 h-3 text-gold" />
              <span>{BRAND_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-luxury border-b border-gold/30 py-3"
            : "bg-ivory border-b border-gold/20 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-burgundy hover:text-burgundy-dark transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal hover:text-burgundy ml-1"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* ESARI Logo (Custom Elegant Typography) */}
            <Link
              to="/"
              className="flex flex-col items-center group text-center"
              title="ESARI – Tradition, Elegance and Style for Every Woman"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.24em] text-burgundy transition-colors group-hover:text-burgundy-light">
                {BRAND_INFO.name}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-charcoal-muted group-hover:text-gold-dark transition-colors font-sans -mt-0.5">
                Tradition &bull; Elegance &bull; Style
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 relative py-1 ${
                      isActive
                        ? "text-burgundy font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gold"
                        : "text-charcoal/80 hover:text-burgundy hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold/60 after:transition-all after:duration-300"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons: Search | Wishlist | Shopping Bag */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-1.5 p-2 text-charcoal hover:text-burgundy hover:bg-gold/10 rounded-full transition-colors text-xs"
                title="Search curated showcases"
                aria-label="Search products"
              >
                <Search className="w-4 h-4 text-burgundy" />
                <span className="text-[11px] text-charcoal-muted hidden xl:inline">Search</span>
              </button>

              {/* Wishlist Trigger */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-charcoal hover:text-burgundy hover:bg-gold/10 rounded-full transition-colors"
                title="View Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-burgundy" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon (Exact Prompt Requirement) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 p-2 sm:px-3 text-burgundy bg-gold/15 hover:bg-gold/25 border border-gold/40 rounded-full transition-all duration-200"
                title="View Shopping Bag"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-burgundy" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-burgundy text-gold-pale text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                {subtotal > 0 && (
                  <span className="hidden sm:inline font-serif font-bold text-xs text-burgundy">
                    {formatPrice(subtotal)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gold/20 bg-ivory px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium tracking-wide rounded-sm transition-colors ${
                      isActive
                        ? "bg-burgundy text-gold-pale font-semibold"
                        : "text-charcoal hover:bg-gold/15 hover:text-burgundy"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="pt-2 border-t border-gold/20 flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="flex-1 py-2 text-xs font-medium text-burgundy border border-gold/30 rounded-sm flex items-center justify-center gap-1.5 bg-white"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-2 text-xs font-medium text-gold-pale bg-burgundy rounded-sm flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Bag ({cartCount})</span>
                </button>
              </div>

              {/* Zoho Status Pill */}
              <div className="p-2 bg-beige/60 border border-gold/20 rounded-sm text-[11px] text-charcoal flex items-center justify-between">
                <span>Zoho Exhibition Status:</span>
                <span className="font-semibold text-burgundy">{BRAND_INFO.zohoStatus}</span>
              </div>
            </div>

            {/* Mobile Contact Quick Links */}
            <div className="pt-3 border-t border-gold/20 text-xs text-charcoal-muted space-y-2">
              <p className="font-serif italic text-burgundy text-center">
                "{BRAND_INFO.tagline}"
              </p>
              <div className="flex flex-col gap-1 text-[11px]">
                <a href={`tel:${BRAND_INFO.phoneRaw}`} className="flex items-center gap-1.5 text-charcoal hover:text-burgundy">
                  <Phone className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{BRAND_INFO.phone}</span>
                </a>
                <a href={`mailto:${BRAND_INFO.email}`} className="flex items-center gap-1.5 text-charcoal hover:text-burgundy">
                  <Mail className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{BRAND_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
