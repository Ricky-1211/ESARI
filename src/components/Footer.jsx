import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  ShieldCheck,
  Truck,
  ArrowRight,
  Instagram,
  Facebook,
  MessageCircle,
  CheckCircle2
} from "lucide-react";
import { BRAND_INFO, COLOR_PALETTE } from "../data/brandData";
import PolicyModals from "./PolicyModals";

export default function Footer() {
  const [activePolicy, setActivePolicy] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <>
      <footer className="bg-burgundy-dark text-ivory border-t-2 border-gold/40 pt-16 pb-12 font-sans relative overflow-hidden">
        {/* Subtle decorative gold light background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gold/20">
            {/* Col 1 & 2: Brand Essence & Founder Tribute */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="inline-block group">
                <span className="font-serif text-3xl font-bold tracking-[0.24em] text-gold-light group-hover:text-gold transition-colors">
                  {BRAND_INFO.name}
                </span>
                <span className="block text-[10px] tracking-[0.3em] uppercase text-ivory/60 font-sans mt-0.5">
                  Haute Indian Fashion & Accessories &bull; Founded by {BRAND_INFO.founder}
                </span>
              </Link>

              <p className="text-xs sm:text-sm text-gold-pale/90 font-serif italic max-w-md leading-relaxed">
                "{BRAND_INFO.tagline}"
              </p>

              <p className="text-xs text-ivory/75 max-w-md leading-relaxed font-sans">
                ESARI celebrates timeless Indian weaves, majestic drapes, and heirloom accessories crafted for the poise, confidence, and effortless elegance of every modern woman.
              </p>

              {/* Zoho Status Badge in Footer */}
              <div className="inline-flex items-center gap-1.5 bg-burgundy/80 text-gold-light border border-gold/30 px-2.5 py-1 rounded text-[11px] font-medium">
                <Clock className="w-3 h-3 text-gold" />
                <span>Zoho Status: <strong>{BRAND_INFO.zohoStatus}</strong></span>
              </div>

              {/* Direct WhatsApp Concierge Button */}
              <div className="pt-2">
                <a
                  href={BRAND_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-gold-pale border border-emerald-500/40 text-xs px-4 py-2.5 rounded-sm transition-all shadow-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Styling Concierge (+91 98530 35064)</span>
                </a>
              </div>
            </div>

            {/* Col 3: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-ivory/75">
                <li>
                  <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gold transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/collections" className="hover:text-gold transition-colors">Collections</Link>
                </li>
                <li>
                  <Link to="/our-story" className="hover:text-gold transition-colors">Our Story</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-gold transition-colors text-gold-light font-medium">
                    Atelier Admin Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Customer Support & Policies */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase">
                Customer Support
              </h4>
              <ul className="space-y-2 text-xs text-ivory/75">
                <li>
                  <button
                    onClick={() => setActivePolicy("shipping")}
                    className="hover:text-gold transition-colors text-left"
                  >
                    Shipping & Delivery (India & Worldwide)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("shipping")}
                    className="hover:text-gold transition-colors text-left"
                  >
                    7-Day Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("privacy")}
                    className="hover:text-gold transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy("terms")}
                    className="hover:text-gold transition-colors text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gold transition-colors">
                    Custom Sizing & Alterations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: Verified Contact Details & Newsletter */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase">
                Contact & Privé
              </h4>

              <div className="space-y-2 text-xs text-ivory/80">
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <a href={`tel:${BRAND_INFO.phoneRaw}`} className="hover:text-gold transition-colors">
                    {BRAND_INFO.phone}
                  </a>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-gold transition-colors break-all">
                    {BRAND_INFO.email}
                  </a>
                </div>

                <div className="flex items-start gap-2">
                  <Globe className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <a href={BRAND_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    {BRAND_INFO.displayWebsite}
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="pt-2">
                <span className="text-[11px] font-serif uppercase tracking-wider text-gold-light block mb-1.5">
                  Join The ESARI Privé
                </span>
                {subscribed ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 p-2 rounded border border-emerald-600/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Welcome to ESARI Privé! Use code ESARIFIRST.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-charcoal-light/60 border border-gold/30 text-xs px-2.5 py-1.5 rounded-sm text-ivory focus:outline-none focus:border-gold w-full"
                    />
                    <button
                      type="submit"
                      className="bg-burgundy hover:bg-burgundy-light text-gold-pale px-2.5 py-1.5 rounded-sm text-xs transition-colors"
                      title="Subscribe"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Socials */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span>
                &copy; {BRAND_INFO.copyrightYear} {BRAND_INFO.name}&trade;. Founded by {BRAND_INFO.founder}. All Rights Reserved.
              </span>
              <span className="hidden sm:inline text-gold/30">&bull;</span>
              <a
                href={BRAND_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold text-[11px] transition-colors"
              >
                Official Domain: {BRAND_INFO.displayWebsite}
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-ivory/70">
              <a
                href={BRAND_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors p-1"
                aria-label="ESARI on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors p-1"
                aria-label="ESARI on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors p-1"
                aria-label="ESARI on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modals */}
      <PolicyModals activePolicy={activePolicy} onClose={() => setActivePolicy(null)} />
    </>
  );
}
