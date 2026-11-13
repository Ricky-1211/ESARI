import React from "react";
import { X, ShieldCheck, Truck, FileText } from "lucide-react";
import { BRAND_INFO } from "../data/brandData";

export default function PolicyModals({ activePolicy, onClose }) {
  if (!activePolicy) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-gold/30 p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-charcoal hover:bg-gold/15 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Privacy Policy */}
          {activePolicy === "privacy" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-burgundy">
                <ShieldCheck className="w-5 h-5 text-gold-dark" />
                <h3 className="font-serif text-xl font-bold">ESARI Privacy & Data Protection Policy</h3>
              </div>
              <p className="text-xs text-charcoal-muted">Last Updated: November 2026 &bull; Official Policy for {BRAND_INFO.website}</p>

              <div className="text-xs text-charcoal/85 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                <p>
                  At <strong>ESARI</strong> (founded by Puja Agrawala), we value your trust and are committed to safeguarding your personal data and privacy. This Privacy Policy details how we collect, store, and utilize information provided via our official website (https://www.esari.in), concierge phone lines (+91 98530 35064), and digital communication channels.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">1. Information We Collect</h4>
                <p>
                  When you browse our collections, place an order, or contact our atelier, we may collect:
                  <br />&bull; Personal identifiers: Name, shipping address, contact phone number, and email address.
                  <br />&bull; Measurement details for bespoke alterations and tailored fittings.
                  <br />&bull; Transaction records: Details of items purchased, order totals, and payment confirmation references. We do not store sensitive payment card details or net banking credentials on our servers.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">2. Use of Your Information</h4>
                <p>
                  Your information is utilized strictly to fulfill your orders, provide dispatch tracking updates, offer personalized styling consultations, and communicate exclusive ESARI Privé privileges. We never sell, rent, or trade your personal information with external marketers.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">3. Contacting Our Data Concierge</h4>
                <p>
                  For any privacy questions or data deletion requests, contact our founder and management at:
                  <br /><strong>Email:</strong> {BRAND_INFO.email}
                  <br /><strong>Phone:</strong> {BRAND_INFO.phone}
                </p>
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          {activePolicy === "terms" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-burgundy">
                <FileText className="w-5 h-5 text-gold-dark" />
                <h3 className="font-serif text-xl font-bold">Terms & Conditions of Service</h3>
              </div>
              <p className="text-xs text-charcoal-muted">Effective: 2026 &bull; ESARI Indian Fashion & Accessories</p>

              <div className="text-xs text-charcoal/85 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                <p>
                  Welcome to <strong>ESARI</strong>. By browsing, placing orders, or utilizing services on {BRAND_INFO.website}, you agree to the following terms and conditions established by founder Puja Agrawala and the ESARI atelier.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">1. Handcrafted Authenticity</h4>
                <p>
                  Every garment and jewelry piece at ESARI is handcrafted by skilled Indian artisans using authentic silks, weaves, handloom embroidery, and genuine stones. Slight variations in slubs, weave texture, color nuance, or embroidery alignment are natural hallmarks of authentic handcrafting rather than defects.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">2. Pricing & Currency</h4>
                <p>
                  Prices are listed in Indian Rupees (₹ INR) and include all applicable domestic taxes. Converted international currencies (USD, EUR, GBP, AED) are calculated based on prevailing live exchange rates for overseas clients.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">3. Bespoke & Made-to-Measure Outfits</h4>
                <p>
                  Custom-tailored silhouettes and made-to-measure lehengas are crafted specifically to the client's submitted measurements. While we provide complimentary alterations if required, bespoke pieces cannot be returned for monetary refund once tailored.
                </p>
              </div>
            </div>
          )}

          {/* Shipping & Return Policy */}
          {activePolicy === "shipping" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-burgundy">
                <Truck className="w-5 h-5 text-gold-dark" />
                <h3 className="font-serif text-xl font-bold">Shipping, Delivery & Return Policy</h3>
              </div>
              <p className="text-xs text-charcoal-muted">Complimentary Shipping on Domestic Orders Above ₹4,999</p>

              <div className="text-xs text-charcoal/85 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                <h4 className="font-serif font-bold text-burgundy text-sm">Domestic Express Shipping (India)</h4>
                <p>
                  We partner with premium express couriers (Bluedart, Delhivery, DTDC) with end-to-end insurance. Orders are typically processed in our atelier within 24 to 48 hours and delivered within 3 to 5 business days across Indian metro cities and towns.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">Worldwide International Shipping</h4>
                <p>
                  We proudly ship ESARI couture to international patrons across the USA, UK, UAE, Europe, Singapore, and Canada via DHL Express with 5 to 7 business days delivery timeline.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">7-Day Hassle-Free Exchange Policy</h4>
                <p>
                  If an off-the-rack item does not meet your expectations, you may initiate an exchange or store credit within 7 calendar days of receipt. The product must remain unused, unwashed, and in its original luxury garment packaging with all ESARI security tags intact.
                </p>

                <h4 className="font-serif font-bold text-burgundy text-sm">Concierge Assistance</h4>
                <p>
                  For dispatch status or return assistance, call or WhatsApp our helpline directly at <strong>{BRAND_INFO.phone}</strong> or email <strong>{BRAND_INFO.email}</strong>.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gold/20 text-right">
            <button
              onClick={onClose}
              className="bg-burgundy text-gold-pale hover:bg-burgundy-light px-5 py-2 rounded-sm text-xs uppercase tracking-widest font-medium transition-colors"
            >
              Close Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
