import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  Crown,
  Heart,
  Quote,
  ShieldCheck,
  Feather,
  Compass
} from "lucide-react";
import { BRAND_INFO, FOUNDER_STORY } from "../data/brandData";

export default function OurStoryPage() {
  return (
    <div className="bg-ivory text-charcoal min-h-screen">
      {/* Header Banner */}
      <section className="bg-burgundy text-ivory py-20 sm:py-24 relative overflow-hidden border-b-2 border-gold/40">
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/95 via-burgundy/85 to-burgundy-deep/95" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-light text-xs font-semibold tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5 text-gold" />
            <span>The Founder&rsquo;s Journey</span>
          </div>

          {/* Exact heading required */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-ivory leading-tight">
            The Woman Behind ESARI.
          </h1>

          <p className="font-serif italic text-gold-pale text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed">
            Founder &bull; Puja Agrawala
          </p>

          <p className="text-ivory/80 text-sm max-w-xl mx-auto font-light pt-2">
            Shaping a warm, considered point of view where traditional Indian inspiration meets modern feminine poise.
          </p>
        </div>
      </section>

      {/* Main Two-Column Founder Section */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gold/40 shadow-xl overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Professional Founder Portrait Placeholder (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative mx-auto">
                {/* Decorative border frame */}
                <div className="aspect-[3/4] w-full rounded-2xl bg-gradient-to-b from-ivory via-rose/10 to-ivory border-2 border-dashed border-gold/70 p-8 flex flex-col items-center justify-center text-center shadow-inner relative group">
                  
                  {/* Elegant Monogram Medallion */}
                  <div className="w-28 h-28 rounded-full bg-burgundy text-gold flex items-center justify-center border-2 border-gold shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300">
                    <span className="font-serif text-4xl font-bold tracking-tight">
                      PA
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-semibold text-burgundy">
                    Puja Agrawala
                  </h3>
                  
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold mt-1">
                    Founder &amp; Creative Lead, ESARI
                  </p>

                  <div className="mt-6 pt-6 border-t border-gold/30 w-full max-w-xs space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy/5 border border-gold/40 text-[11px] text-burgundy font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      <span>Official Founder Profile</span>
                    </div>

                    <p className="text-xs text-charcoal/70 italic leading-relaxed pt-1">
                      Professional Founder Portrait Placeholder
                    </p>
                    <p className="text-[11px] text-charcoal/60 leading-normal">
                      In respect of authentic representation, this official placeholder will be updated as soon as the verified founder studio photograph is made public.
                    </p>
                  </div>
                </div>

                {/* Subtle gold badge */}
                <div className="absolute -bottom-4 -right-4 px-4 py-1.5 bg-burgundy text-gold rounded-full text-xs font-semibold tracking-wider uppercase border border-gold/50 shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Indian Haute Couture</span>
                </div>
              </div>

              {/* Direct Founder Contact Box */}
              <div className="p-6 rounded-2xl bg-ivory border border-gold/30 space-y-3 text-sm">
                <p className="font-serif font-semibold text-burgundy text-base">
                  Connect Directly with the Founder
                </p>
                <p className="text-xs text-charcoal/70">
                  Puja Agrawala directly welcomes brand conversations, collaborations, press enquiries, and personalized consultations.
                </p>
                <div className="pt-2 flex flex-col gap-2 text-xs">
                  <a
                    href={`tel:${BRAND_INFO.phoneRaw}`}
                    className="flex items-center gap-2 text-burgundy font-medium hover:text-gold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    <span>{BRAND_INFO.phone}</span>
                  </a>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="flex items-center gap-2 text-burgundy font-medium hover:text-gold transition-colors break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span>{BRAND_INFO.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Introduction & Brand Vision (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-gold-dark text-xs tracking-widest font-semibold uppercase mb-3">
                  <span className="w-8 h-[1px] bg-gold" />
                  <span>The Vision Behind ESARI</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
                  Puja Agrawala – Founder, ESARI
                </h2>
              </div>

              {/* Exact Description Required */}
              <div className="p-6 sm:p-8 rounded-2xl bg-beige/40 border-l-4 border-burgundy space-y-4 shadow-sm">
                <Quote className="w-8 h-8 text-burgundy/40" />
                <p className="font-serif text-lg sm:text-xl text-charcoal leading-relaxed font-normal">
                  &ldquo;Driven by a passion for fashion, elegance, and traditional inspiration, Puja Agrawala brings the vision of ESARI to life. The brand celebrates women who embrace their individuality while staying connected to timeless elegance.&rdquo;
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-burgundy">
                  — Puja Agrawala &bull; Founder, ESARI
                </p>
              </div>

              {/* Detailed Vision & Philosophy */}
              <div className="space-y-4 text-charcoal/80 text-base sm:text-lg leading-relaxed font-light">
                <p>
                  For Puja Agrawala, clothing is far more than adornment—it is a profound language of self-respect, cultural pride, and graceful individuality. Growing up immersed in India&rsquo;s rich textile tapestry, she witnessed the meticulous dedication of skilled artisans weaving threads into heritage treasures.
                </p>
                <p>
                  Yet, modern women frequently faced a dilemma: traditional attire that was cumbersome or stiff, and western silhouettes that failed to honor the warmth and celebratory spirit of Indian festivities. ESARI was founded to dissolve that boundary.
                </p>
                <p>
                  Puja&rsquo;s design philosophy champions simplicity without sacrificing richness. Through deep wine burgundy, champagne gold highlights, and warm ivory foundations, ESARI garments and accessories create a canvas where every woman feels poised, comfortable, and undeniably radiant.
                </p>
              </div>

              {/* Guiding Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-ivory border border-gold/30 space-y-2">
                  <div className="flex items-center gap-2 text-burgundy font-serif font-semibold text-base">
                    <Feather className="w-4 h-4 text-gold" />
                    <span>Mindful Craft</span>
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Prioritizing timeless craftsmanship, refined textiles, and thoughtful detailing that lasts beyond fleeting fashion seasons.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-ivory border border-gold/30 space-y-2">
                  <div className="flex items-center gap-2 text-burgundy font-serif font-semibold text-base">
                    <Heart className="w-4 h-4 text-gold" />
                    <span>Every Woman</span>
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Cultivating an inclusive, welcoming atmosphere where every woman finds confidence and joyful elegance.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold tracking-widest uppercase border border-gold/40 shadow-luxury transition-all group"
                >
                  <span>Connect With Puja Agrawala</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-ivory hover:bg-white text-burgundy text-xs font-semibold tracking-widest uppercase border border-burgundy/30 transition-all"
                >
                  <span>Explore The Collections</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Editorial Quote Full Width Strip */}
      <section className="py-16 bg-white border-y border-gold/25">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
            Founder&rsquo;s Motto
          </p>
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-charcoal leading-relaxed">
            &ldquo;Style is when your heritage breathes comfortably through your modern confidence.&rdquo;
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-burgundy font-semibold">
            &ndash; Puja Agrawala
          </p>
        </div>
      </section>
    </div>
  );
}
