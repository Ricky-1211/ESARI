import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Filter,
  Eye,
  X,
  Phone,
  Mail,
  CheckCircle2,
  Layers,
  Crown
} from "lucide-react";
import { BRAND_INFO, COLLECTIONS_DATA } from "../data/brandData";

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModalData, setActiveModalData] = useState(null);

  // Filter categories
  const filteredCollections =
    selectedCategory === "all"
      ? COLLECTIONS_DATA
      : COLLECTIONS_DATA.filter(
          (col) => col.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="bg-ivory text-charcoal min-h-screen">
      {/* 1. Page Header */}
      <section className="bg-burgundy text-ivory py-20 sm:py-24 relative overflow-hidden border-b-2 border-gold/40">
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-deep/90 via-burgundy/85 to-burgundy-deep/90" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-light text-xs font-semibold tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5 text-gold" />
            <span>Curated Portfolio</span>
          </div>

          {/* Exact heading required */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-ivory leading-tight">
            Explore the World of ESARI.
          </h1>

          {/* Exact subheading required */}
          <p className="font-serif italic text-gold-pale text-lg sm:text-2xl max-w-3xl mx-auto leading-relaxed">
            &ldquo;Thoughtfully inspired by tradition. Beautifully expressed through style.&rdquo;
          </p>

          <p className="text-ivory/80 text-sm max-w-xl mx-auto font-light pt-2">
            Discover our curated categories of authentic Indian fashion and accessories, crafted around feminine grace, fine textures, and timeless dignity.
          </p>
        </div>
      </section>

      {/* 2. Category Filter & Curator's Note */}
      <section className="py-8 bg-white border-b border-gold/20 sticky top-[73px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCategory === "all"
                  ? "bg-burgundy text-ivory shadow-sm border border-gold/40"
                  : "bg-ivory text-charcoal/80 hover:text-burgundy border border-gold/20"
              }`}
            >
              All Collections
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("fashion")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCategory === "fashion"
                  ? "bg-burgundy text-ivory shadow-sm border border-gold/40"
                  : "bg-ivory text-charcoal/80 hover:text-burgundy border border-gold/20"
              }`}
            >
              Fashion
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("accessories")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCategory === "accessories"
                  ? "bg-burgundy text-ivory shadow-sm border border-gold/40"
                  : "bg-ivory text-charcoal/80 hover:text-burgundy border border-gold/20"
              }`}
            >
              Accessories
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("explore the esari world")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCategory === "explore the esari world"
                  ? "bg-burgundy text-ivory shadow-sm border border-gold/40"
                  : "bg-ivory text-charcoal/80 hover:text-burgundy border border-gold/20"
              }`}
            >
              Explore the ESARI World
            </button>
          </div>

          {/* Curated Consultation link */}
          <div className="text-xs text-charcoal/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>Curated by Puja Agrawala &bull;</span>
            <Link to="/contact" className="text-burgundy font-medium underline hover:text-gold transition-colors">
              Request Enquiries
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Main Collections Gallery */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curated Transparency Badge */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-white border border-gold/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <p className="text-charcoal/80 leading-relaxed">
              <strong className="text-burgundy">Curator&rsquo;s Note:</strong> In accordance with our official brand standards, our collection gallery showcases authentic thematic aesthetics and curated visual representations. Individual tailored pieces and custom consultations are arranged directly with founder <strong className="text-burgundy">Puja Agrawala</strong>.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-4 py-2 rounded-full bg-burgundy text-ivory text-[11px] font-semibold tracking-wider uppercase hover:bg-burgundy-light transition-colors"
          >
            Direct Enquiry
          </Link>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredCollections.map((col) => (
            <div
              key={col.id}
              className="bg-white rounded-3xl overflow-hidden border border-gold/30 shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col group"
            >
              {/* Large Premium Image with Zoom */}
              <div className="aspect-[3/4] w-full overflow-hidden relative bg-burgundy/10 img-zoom-container">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

                {/* Category Badge Top */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-burgundy/90 text-gold text-xs font-semibold tracking-widest uppercase border border-gold/40 backdrop-blur-sm">
                    {col.category}
                  </span>
                </div>

                {/* Bottom Overlay Title on image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-gold-light text-xs uppercase tracking-widest font-medium">
                    {col.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold mt-1">
                    {col.category}
                  </h3>
                </div>
              </div>

              {/* Card Details & Actions */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
                    {col.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 pt-4 border-t border-gold/20 grid grid-cols-2 gap-2 text-xs text-charcoal/70">
                    {col.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-burgundy shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Functional View Collection Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalData(col)}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold tracking-widest uppercase border border-gold/40 shadow-sm hover:shadow-luxury transition-all duration-300 group/btn"
                  >
                    <span>View Collection</span>
                    <Eye className="w-4 h-4 text-gold group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke Styling Invitation Banner */}
        <div className="mt-20 rounded-3xl bg-burgundy text-ivory p-8 sm:p-12 lg:p-16 border-2 border-gold/40 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-gold text-xs tracking-widest font-semibold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Brand Service</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight">
              Bespoke Styling &amp; Curated Enquiries
            </h3>

            <p className="text-ivory/85 text-base sm:text-lg leading-relaxed font-light">
              Are you looking for an exclusive traditional Indian saree, contemporary ethnic ensemble, or a matching accessory curation for an upcoming celebration? Founder Puja Agrawala and the ESARI atelier provide direct styling consultations.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold hover:bg-gold-light text-burgundy text-xs font-bold tracking-widest uppercase shadow-luxury-gold transition-all"
              >
                <span>Submit Brand Enquiry</span>
                <ArrowRight className="w-4 h-4 text-burgundy" />
              </Link>
              <a
                href={`tel:${BRAND_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-burgundy-dark hover:bg-black/40 text-ivory text-xs font-semibold tracking-widest uppercase border border-gold/40 transition-all"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call {BRAND_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* 4. Collection Detail Modal Overlay */}
      {activeModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-ivory rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gold/50 shadow-2xl relative p-6 sm:p-10 space-y-6">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalData(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-burgundy text-ivory hover:bg-burgundy-light transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-burgundy">
                {activeModalData.category} &bull; ESARI Edit
              </span>

              <h3 className="font-serif text-3xl font-semibold text-charcoal">
                {activeModalData.title}
              </h3>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gold/40 shadow">
                <img
                  src={activeModalData.image}
                  alt={activeModalData.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-lg font-semibold text-burgundy">
                  The Craft Story
                </h4>
                <p className="text-charcoal/80 text-sm leading-relaxed">
                  {activeModalData.story}
                </p>
              </div>

              {/* Highlights */}
              <div className="p-4 rounded-xl bg-white border border-gold/30 space-y-2">
                <h5 className="font-serif text-xs font-semibold text-gold-dark uppercase tracking-wider">
                  Featured Craft Attributes
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs text-charcoal/80">
                  {activeModalData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Notice */}
              <div className="p-4 rounded-xl bg-rose/15 border border-rose/30 text-xs text-charcoal/70 leading-relaxed">
                <p>
                  Official inquiries, appointments, and bespoke orders are managed personally by Puja Agrawala. Contact our office directly for seasonal lookbooks and consultation availability.
                </p>
              </div>

              {/* CTA in Modal */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  onClick={() => setActiveModalData(null)}
                  className="flex-1 text-center py-3.5 px-6 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold tracking-widest uppercase border border-gold/40 shadow-sm transition-all"
                >
                  Inquire About This Collection
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveModalData(null)}
                  className="py-3.5 px-6 rounded-full bg-white text-charcoal text-xs font-semibold tracking-widest uppercase border border-charcoal/20 hover:bg-ivory transition-all"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
