import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Crown,
  Heart,
  Compass,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";
import {
  BRAND_INFO,
  ABOUT_ESARI,
  FOUNDER_SECTION,
  BRAND_EXPERIENCE
} from "../data/brandData";

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative py-20 sm:py-28 bg-charcoal text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1800&auto=format&fit=crop"
            alt="ESARI Heritage"
            className="w-full h-full object-cover object-center brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-burgundy/40 to-charcoal/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-burgundy/60 border border-gold/40 px-4 py-1 rounded-full text-xs text-gold-light tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The ESARI Story & Essence</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-wide">
            {ABOUT_ESARI.heading}
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-gold-light max-w-2xl mx-auto font-normal">
            "{BRAND_INFO.tagline}"
          </p>

          <p className="text-xs sm:text-sm text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            {ABOUT_ESARI.description}
          </p>
        </div>
      </section>

      {/* 2. The Essence of ESARI & Three Brand Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
            Our Core Values
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Tradition &bull; Elegance &bull; Style
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ABOUT_ESARI.values.map((val) => (
            <div
              key={val.id}
              className="bg-white p-8 rounded-sm border border-gold/25 shadow-xs hover:border-gold/50 hover:shadow-luxury transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center border border-gold/30">
                {val.id === "tradition" && <Crown className="w-5 h-5 text-gold" />}
                {val.id === "elegance" && <Sparkles className="w-5 h-5 text-gold" />}
                {val.id === "style" && <Heart className="w-5 h-5 text-gold" />}
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

      {/* 3. Founder Section: Puja Agrawala */}
      <section className="bg-beige/40 border-y border-gold/25 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Portrait */}
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

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-burgundy/10 text-burgundy border border-burgundy/25 px-3 py-1 rounded-full text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 text-gold-dark" />
                <span>Founder Profile</span>
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
                  Explore Our Story
                </Link>

                <a
                  href={`https://wa.me/919853035064?text=${encodeURIComponent("Hello Puja! I would love to connect regarding ESARI.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-900 border border-emerald-300 bg-emerald-50 px-4 py-3 rounded-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Concierge (+91 98530 35064)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Experience Narrative */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          {BRAND_EXPERIENCE.heading}
        </h2>
        <div className="w-16 h-0.5 bg-gold mx-auto" />
        <p className="font-serif italic text-lg sm:text-xl text-burgundy leading-relaxed">
          "{BRAND_EXPERIENCE.quote}"
        </p>
        <p className="text-xs sm:text-sm text-charcoal/80 max-w-xl mx-auto leading-relaxed">
          {BRAND_EXPERIENCE.subtext}
        </p>

        <div className="pt-4">
          <Link
            to="/collections"
            className="inline-block bg-burgundy hover:bg-burgundy-light text-gold-pale px-8 py-3.5 rounded-sm font-serif text-xs uppercase tracking-luxury font-bold transition-all shadow-luxury"
          >
            Explore Curated Collections
          </Link>
        </div>
      </section>
    </div>
  );
}
