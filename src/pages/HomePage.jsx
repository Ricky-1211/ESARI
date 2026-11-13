import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Crown,
  Heart,
  Compass,
  Feather,
  Calendar,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  Instagram,
  Facebook,
  Eye,
  Star
} from "lucide-react";
import {
  BRAND_INFO,
  HERO_CONTENT,
  ABOUT_ESARI,
  FEATURED_CATEGORIES,
  BRAND_EXPERIENCE,
  WHY_CHOOSE_ESARI,
  FOUNDER_SECTION,
  CTA_BANNER,
  CONTACT_SECTION
} from "../data/brandData";
import { PRODUCTS_DATA, CUSTOMER_TESTIMONIALS, INSTAGRAM_LOOKBOOK } from "../data/productsData";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { products } = useShop();

  // Contact Form State for Section I
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", phone: "", message: "" });
    }, 4500);
  };

  const getWhyChooseIcon = (iconName) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-gold" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-gold" />;
      case "Feather":
        return <Feather className="w-5 h-5 text-gold" />;
      case "Calendar":
        return <Calendar className="w-5 h-5 text-gold" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold" />;
    }
  };

  const getValueIcon = (iconName) => {
    switch (iconName) {
      case "Crown":
        return <Crown className="w-5 h-5 text-gold" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-gold" />;
      case "Heart":
        return <Heart className="w-5 h-5 text-gold" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* ========================================================
          B. HERO SECTION: Full-Width Cinematic Editorial
          ======================================================== */}
      <section className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-charcoal text-ivory">
        {/* Background Editorial Fashion Image with Cinematic Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=2000&auto=format&fit=crop"
            alt="ESARI Indian Haute Couture & Accessories"
            className="w-full h-full object-cover object-center brightness-[0.42] scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-burgundy/40 to-charcoal/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-charcoal/50 to-charcoal/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 space-y-6">
          {/* Tagline Crest Badge */}
          <div className="inline-flex items-center gap-2 bg-burgundy/70 border border-gold/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-luxury-gold">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-gold-light font-medium">
              {BRAND_INFO.tagline}
            </span>
          </div>

          {/* Main Specified Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ivory leading-tight drop-shadow-md">
            {HERO_CONTENT.heading}
          </h1>

          {/* Supporting Specified Text */}
          <p className="text-sm sm:text-lg text-ivory/85 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            {HERO_CONTENT.supportingText}
          </p>

          {/* Exact CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/collections"
              className="w-full sm:w-auto bg-gold hover:bg-gold-light text-charcoal font-semibold text-xs uppercase tracking-luxury px-8 py-4 rounded-sm shadow-luxury transition-all duration-300 flex items-center justify-center gap-2 border border-gold-light"
            >
              <span>{HERO_CONTENT.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-burgundy" />
            </Link>

            <Link
              to="/our-story"
              className="w-full sm:w-auto bg-transparent hover:bg-ivory/10 text-ivory font-medium text-xs uppercase tracking-luxury px-8 py-4 rounded-sm border border-gold/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>{HERO_CONTENT.ctaSecondary}</span>
            </Link>
          </div>

          {/* Status & Trust Indicators */}
          <div className="pt-10 border-t border-gold/20 flex flex-wrap items-center justify-center gap-6 text-xs text-gold-pale/90">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>Zoho Status: <strong>{BRAND_INFO.zohoStatus}</strong></span>
            </div>
            <div className="hidden sm:inline text-gold/30">&bull;</div>
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span>Handcrafted Indian Accessories</span>
            </div>
            <div className="hidden sm:inline text-gold/30">&bull;</div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Curated Sample Showcase</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          C. ABOUT ESARI: The Essence of ESARI
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
            Brand Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
            {ABOUT_ESARI.heading}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
          <p className="text-xs sm:text-base text-charcoal/80 leading-relaxed font-sans pt-2">
            {ABOUT_ESARI.description}
          </p>
        </div>

        {/* Highlight Three Brand Values: Tradition | Elegance | Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {ABOUT_ESARI.values.map((val) => (
            <div
              key={val.id}
              className="bg-white p-8 rounded-sm border border-gold/25 shadow-xs hover:border-gold/50 hover:shadow-luxury transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center border border-gold/30">
                {getValueIcon(val.icon)}
              </div>
              <h3 className="font-serif text-2xl font-bold text-burgundy">
                {val.title}
              </h3>
              <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                {val.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          D. FEATURED COLLECTIONS: 6 Suggested Categories
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-burgundy font-semibold uppercase tracking-wider bg-gold/15 px-3 py-1 rounded-full border border-gold/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Curated Sample Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Featured Collections
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
          <p className="text-xs sm:text-sm text-charcoal-muted">
            Representative sample categories showcasing ESARI's design aesthetic. Official catalogue release pending.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white border border-gold/20 rounded-sm overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-luxury hover:border-gold/50 transition-all duration-300"
            >
              {/* Category Imagery */}
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108 brightness-[0.9]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-burgundy/90 text-gold-pale text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm border border-gold/30">
                  {cat.count}
                </span>
              </div>

              {/* Category Details & Button */}
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-burgundy transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {cat.shortDescription}
                </p>
                <Link
                  to={cat.link}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-dark transition-colors pt-1"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-dark transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Showcase Pieces Carousel Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-gold/20 gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
              Atelier Sample Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              Sample Showcase Pieces
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-gold-dark flex items-center gap-1.5"
          >
            <span>View All Sample Designs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS_DATA.slice(0, 3).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* ========================================================
          E. BRAND EXPERIENCE: Split Layout
          ======================================================== */}
      <section className="bg-beige/40 border-y border-gold/25 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Lifestyle Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border-2 border-gold/40 shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop"
                  alt="ESARI Indian Lifestyle & Grace"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 inset-x-5 text-center bg-burgundy/85 text-ivory p-3.5 rounded-sm border border-gold/30">
                  <p className="font-serif text-sm font-semibold text-gold-light">
                    "Tradition, Elegance and Style for Every Woman."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Brand Storytelling */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-burgundy/10 text-burgundy border border-burgundy/25 px-3 py-1 rounded-full text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 text-gold-dark" />
                <span>The Brand Experience</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
                {BRAND_EXPERIENCE.heading}
              </h2>

              <p className="font-serif text-lg sm:text-xl text-burgundy italic leading-relaxed">
                "{BRAND_EXPERIENCE.quote}"
              </p>

              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
                {BRAND_EXPERIENCE.subtext}
              </p>

              <div className="pt-2">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 bg-burgundy hover:bg-burgundy-light text-gold-pale px-7 py-3.5 rounded-sm text-xs font-serif font-bold uppercase tracking-luxury transition-all shadow-luxury"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          F. WHY CHOOSE ESARI? Four Premium Feature Cards
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
            The ESARI Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Why Choose ESARI?
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ESARI.map((item) => (
            <div
              key={item.id}
              className="bg-white p-7 rounded-sm border border-gold/25 shadow-xs hover:border-gold/50 hover:shadow-luxury transition-all text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto border border-gold/30">
                {getWhyChooseIcon(item.icon)}
              </div>
              <h3 className="font-serif text-xl font-bold text-burgundy">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          G. FOUNDER SECTION: Puja Agrawala, Founder of ESARI
          ======================================================== */}
      <section className="bg-ivory border-y border-gold/25 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Founder Profile Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border-2 border-gold/40 shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop"
                  alt="Puja Agrawala, Founder of ESARI"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 bg-burgundy/90 text-ivory p-4 rounded-sm border border-gold/30 text-center">
                  <h3 className="font-serif text-lg font-bold text-gold-light">
                    {FOUNDER_SECTION.founderName}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-ivory/80">
                    {FOUNDER_SECTION.founderRole}
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Description (Exact Text From Prompt) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-burgundy/10 text-burgundy border border-burgundy/25 px-3 py-1 rounded-full text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 text-gold-dark" />
                <span>Founder Spotlight</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                {FOUNDER_SECTION.heading}
              </h2>

              <p className="font-serif text-lg text-burgundy italic">
                {FOUNDER_SECTION.founderName} – {FOUNDER_SECTION.founderRole}
              </p>

              <p className="text-xs sm:text-base text-charcoal/80 leading-relaxed font-sans">
                {FOUNDER_SECTION.description}
              </p>

              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-sans">
                {FOUNDER_SECTION.extendedNote}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/our-story"
                  className="bg-burgundy hover:bg-burgundy-light text-gold-pale text-xs uppercase tracking-luxury font-bold px-6 py-3 rounded-sm shadow-sm transition-colors"
                >
                  Read Full Story
                </Link>

                <a
                  href={`https://wa.me/919853035064?text=${encodeURIComponent("Hello Puja! I would love to connect regarding ESARI's collections.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-900 border border-emerald-300 bg-emerald-50 px-4 py-3 rounded-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Puja (+91 98530 35064)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          H. CALL-TO-ACTION SECTION: Elegant Promotional Banner
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal text-ivory rounded-md border border-gold/40 p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-burgundy/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-gold tracking-[0.25em] uppercase text-xs font-semibold">
              The ESARI Invitation
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              {CTA_BANNER.heading}
            </h2>
            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-sans">
              {CTA_BANNER.description}
            </p>

            <div className="pt-4">
              <Link
                to="/collections"
                className="inline-block bg-gold hover:bg-gold-light text-charcoal text-xs uppercase tracking-luxury font-bold px-9 py-4 rounded-sm transition-all shadow-luxury border border-gold-light"
              >
                {CTA_BANNER.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          I. CONTACT SECTION: Connect With ESARI
          ======================================================== */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            {CONTACT_SECTION.heading}
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
          <p className="text-xs sm:text-sm text-charcoal-muted">
            {CONTACT_SECTION.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info, Click-to-Call, Email, WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 rounded-sm border border-gold/30 shadow-xs space-y-5">
              <h3 className="font-serif text-xl font-bold text-burgundy pb-3 border-b border-gold/20">
                Official Information
              </h3>

              <div className="space-y-4 text-xs text-charcoal/85">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted font-semibold block">
                    Founder
                  </span>
                  <p className="font-serif font-bold text-sm text-charcoal mt-0.5">
                    {CONTACT_SECTION.founder}
                  </p>
                </div>

                {/* Click to Call */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted font-semibold block">
                    Phone Inquiries
                  </span>
                  <a
                    href={`tel:${BRAND_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-burgundy font-bold text-sm hover:underline mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{CONTACT_SECTION.phone}</span>
                  </a>
                </div>

                {/* Functional Email Link */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted font-semibold block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${CONTACT_SECTION.email}`}
                    className="inline-flex items-center gap-2 text-burgundy font-bold text-sm hover:underline mt-0.5 break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{CONTACT_SECTION.email}</span>
                  </a>
                </div>

                {/* Official Website */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted font-semibold block">
                    Official Website
                  </span>
                  <a
                    href={CONTACT_SECTION.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-burgundy font-bold text-sm hover:underline mt-0.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{CONTACT_SECTION.website}</span>
                  </a>
                </div>

                {/* Zoho Status */}
                <div className="pt-2">
                  <div className="p-3 bg-beige/60 border border-gold/30 rounded-sm">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-semibold block">
                      Zoho Exhibition Status
                    </span>
                    <p className="font-serif font-bold text-burgundy text-xs mt-0.5">
                      {CONTACT_SECTION.zohoStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Functional WhatsApp Contact Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/919853035064?text=${encodeURIComponent("Hello Puja Agrawala! I am reaching out through the ESARI official website.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-sm text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Chat on WhatsApp (+91 98530 35064)</span>
                </a>
              </div>
            </div>

            {/* Verified Social Media Links */}
            <div className="bg-ivory p-4 rounded-sm border border-gold/20 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-charcoal">Official Social Presence</span>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-charcoal hover:text-burgundy transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-burgundy" />
                </a>
                <a
                  href={BRAND_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-charcoal hover:text-burgundy transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-burgundy" />
                </a>
                <a
                  href={BRAND_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-charcoal hover:text-emerald-700 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Functional Contact Form (Name, Email, Phone, Message) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-7 sm:p-9 rounded-sm border border-gold/30 shadow-luxury space-y-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  Send an Inquiry to Puja Agrawala & Atelier
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Complete the form below and our concierge will respond promptly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-300 rounded-sm space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-emerald-900">
                    Thank You for Contacting ESARI
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been delivered directly to Puja Agrawala and the ESARI atelier. We will connect with you via email or WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="radhika@example.com"
                        className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                      />
                    </div>

                    <div>
                      <label className="block text-charcoal font-semibold mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 98530 35064"
                        className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Inquire about curated showcases, bespoke alterations, or exhibition details..."
                      className="w-full px-3 py-2.5 bg-ivory border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-burgundy hover:bg-burgundy-light text-gold-pale py-3.5 px-6 rounded-sm text-xs font-serif font-bold uppercase tracking-luxury transition-all shadow-luxury border border-gold/40 flex items-center justify-center gap-2"
                  >
                    <span>Send Message to ESARI</span>
                    <Send className="w-3.5 h-3.5 text-gold" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
