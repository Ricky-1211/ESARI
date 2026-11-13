import React, { useState } from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
  Send,
  CheckCircle2,
  ChevronDown,
  Instagram,
  Facebook,
  ShieldCheck
} from "lucide-react";
import { BRAND_INFO } from "../data/brandData";
import { FAQ_DATA } from "../data/productsData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Bespoke Tailoring & Custom Sizing",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Bespoke Tailoring & Custom Sizing",
        message: ""
      });
    }, 4000);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
          Client Concierge & Atelier Enquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          Connect with ESARI
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto" />
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          Whether you require bespoke alterations, styling guidance for an upcoming celebration, or order tracking, founder <strong>{BRAND_INFO.founder}</strong> and the ESARI atelier are here to assist you.
        </p>
      </div>

      {/* Grid: Contact Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gold/30 shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-burgundy pb-3 border-b border-gold/20">
              Official Contact Credentials
            </h3>

            <div className="space-y-5 text-xs text-charcoal/85">
              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 border border-gold/30">
                  <Phone className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Telephone Concierge</h4>
                  <a
                    href={`tel:${BRAND_INFO.phoneRaw}`}
                    className="text-burgundy font-semibold hover:underline block text-sm mt-0.5"
                  >
                    {BRAND_INFO.phone}
                  </a>
                  <p className="text-[11px] text-charcoal-muted">Mon - Sat: 10:00 AM - 7:30 PM IST</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 border border-gold/30">
                  <Mail className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Email Inquiries</h4>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="text-burgundy font-semibold hover:underline block text-sm mt-0.5 break-all"
                  >
                    {BRAND_INFO.email}
                  </a>
                  <p className="text-[11px] text-charcoal-muted">Response within 12 business hours</p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 border border-gold/30">
                  <Globe className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Official Website</h4>
                  <a
                    href={BRAND_INFO.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burgundy font-semibold hover:underline block text-sm mt-0.5"
                  >
                    {BRAND_INFO.website}
                  </a>
                  <p className="text-[11px] text-charcoal-muted">Worldwide insured shipping</p>
                </div>
              </div>

              {/* Founder & Atelier Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0 border border-gold/30">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Founder & Atelier</h4>
                  <p className="font-medium text-charcoal mt-0.5">
                    Puja Agrawala &bull; ESARI Atelier
                  </p>
                  <p className="text-[11px] text-charcoal-muted">{BRAND_INFO.location}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div className="pt-4 border-t border-gold/20">
              <a
                href={BRAND_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white p-3 rounded-sm text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>Instant WhatsApp Concierge (+91 98530 35064)</span>
              </a>
            </div>
          </div>

          {/* Socials Strip */}
          <div className="bg-ivory p-5 rounded-sm border border-gold/20 flex items-center justify-between text-xs">
            <span className="font-serif font-bold text-charcoal">Follow Our Journey</span>
            <div className="flex items-center gap-4 text-charcoal">
              <a href={BRAND_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-burgundy">
                <Instagram className="w-5 h-5 text-burgundy" />
              </a>
              <a href={BRAND_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-burgundy">
                <Facebook className="w-5 h-5 text-burgundy" />
              </a>
              <a href={BRAND_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-burgundy">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gold/30 shadow-luxury space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-burgundy">
                Send an Atelier Inquiry
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Fill in the details below and our team will get in touch with you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-300 rounded-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-emerald-900">
                  Message Sent with Grace!
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                  Thank you for writing to ESARI. Founder Puja Agrawala or an atelier concierge will respond to your query via email or WhatsApp within a few hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Sen"
                      className="w-full px-3 py-2.5 bg-ivory/30 border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ananya@example.com"
                      className="w-full px-3 py-2.5 bg-ivory/30 border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98530 35064"
                      className="w-full px-3 py-2.5 bg-ivory/30 border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal font-semibold mb-1">
                      Nature of Inquiry
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-ivory/30 border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy cursor-pointer"
                    >
                      <option>Bespoke Tailoring & Custom Sizing</option>
                      <option>Bridal & Wedding Trousseau Consultation</option>
                      <option>Order Status & Dispatch Tracking</option>
                      <option>International Shipping Inquiries</option>
                      <option>Wholesale & Editorial Collaborations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-1">
                    Your Message / Specific Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the occasion, measurement details, preferred silhouettes or questions..."
                    className="w-full px-3 py-2.5 bg-ivory/30 border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-burgundy hover:bg-burgundy-light text-gold-pale py-3.5 px-6 rounded-sm text-xs font-serif font-bold uppercase tracking-luxury transition-all shadow-luxury border border-gold/40 flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry to Atelier</span>
                  <Send className="w-3.5 h-3.5 text-gold" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-white p-6 sm:p-10 rounded-sm border border-gold/25 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
            Common Inquiries
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="divide-y divide-gold/15 max-w-3xl mx-auto">
          {FAQ_DATA.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left font-serif font-bold text-sm text-charcoal hover:text-burgundy transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gold-dark transition-transform ${
                    openFaq === idx ? "rotate-180 text-burgundy" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <p className="mt-2 text-xs text-charcoal/80 leading-relaxed font-sans pr-4">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
