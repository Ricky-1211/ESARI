import React, { useState } from "react";
import { X, Ruler, Sparkles, MessageCircle, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { BRAND_INFO } from "../data/brandData";

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState("inches"); // "inches" or "cm"

  if (!isSizeGuideOpen) return null;

  const sizeChartInches = [
    { size: "XS", bust: "32", waist: "26", hip: "36", shoulder: "13.5" },
    { size: "S", bust: "34", waist: "28", hip: "38", shoulder: "14" },
    { size: "M", bust: "36", waist: "30", hip: "40", shoulder: "14.5" },
    { size: "L", bust: "38", waist: "32", hip: "42", shoulder: "15" },
    { size: "XL", bust: "40", waist: "34", hip: "44", shoulder: "15.5" },
    { size: "XXL", bust: "42", waist: "36", hip: "46", shoulder: "16" },
    { size: "Custom", bust: "Tailored", waist: "Tailored", hip: "Tailored", shoulder: "Made-to-measure" }
  ];

  const sizeChartCm = [
    { size: "XS", bust: "81", waist: "66", hip: "91", shoulder: "34" },
    { size: "S", bust: "86", waist: "71", hip: "96", shoulder: "35.5" },
    { size: "M", bust: "91", waist: "76", hip: "101", shoulder: "37" },
    { size: "L", bust: "96", waist: "81", hip: "106", shoulder: "38" },
    { size: "XL", bust: "101", waist: "86", hip: "112", shoulder: "39" },
    { size: "XXL", bust: "106", waist: "91", hip: "117", shoulder: "40.5" },
    { size: "Custom", bust: "Tailored", waist: "Tailored", hip: "Tailored", shoulder: "Made-to-measure" }
  ];

  const activeChart = unit === "inches" ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-gold/30 p-6 md:p-8">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="absolute right-4 top-4 rounded-full p-2 text-charcoal hover:bg-gold/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-burgundy">
            <Ruler className="w-5 h-5 text-gold-dark" />
            <h3 className="font-serif text-xl font-bold">ESARI Sizing & Fit Guide</h3>
          </div>
          <p className="text-xs text-charcoal-muted mb-4">
            Our garments are crafted to celebrate Indian body proportions with graceful drape and flattering ease.
          </p>

          {/* Unit Toggle */}
          <div className="flex justify-end mb-4">
            <div className="bg-ivory border border-gold/30 rounded-sm p-0.5 flex text-xs">
              <button
                onClick={() => setUnit("inches")}
                className={`px-3 py-1 rounded-sm font-medium transition-colors ${
                  unit === "inches" ? "bg-burgundy text-gold-pale shadow-xs" : "text-charcoal hover:text-burgundy"
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 rounded-sm font-medium transition-colors ${
                  unit === "cm" ? "bg-burgundy text-gold-pale shadow-xs" : "text-charcoal hover:text-burgundy"
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gold/20 rounded-sm mb-5">
            <table className="w-full text-xs text-left">
              <thead className="bg-ivory border-b border-gold/20 font-serif text-burgundy">
                <tr>
                  <th className="p-3 font-bold">Size</th>
                  <th className="p-3">Bust</th>
                  <th className="p-3">Waist</th>
                  <th className="p-3">Hip</th>
                  <th className="p-3">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15">
                {activeChart.map((row, i) => (
                  <tr key={i} className={row.size === "Custom" ? "bg-gold/10 font-medium" : "hover:bg-ivory/40"}>
                    <td className="p-3 font-semibold text-burgundy">{row.size}</td>
                    <td className="p-3 text-charcoal">{row.bust} {row.size !== "Custom" ? unit : ""}</td>
                    <td className="p-3 text-charcoal">{row.waist} {row.size !== "Custom" ? unit : ""}</td>
                    <td className="p-3 text-charcoal">{row.hip} {row.size !== "Custom" ? unit : ""}</td>
                    <td className="p-3 text-charcoal">{row.shoulder} {row.size !== "Custom" ? unit : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sarees & Lehengas Info */}
          <div className="bg-ivory/60 border border-gold/20 p-4 rounded-sm space-y-2 mb-5 text-xs text-charcoal">
            <h4 className="font-serif font-bold text-burgundy flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              Sarees & Semi-Stitched Outfits
            </h4>
            <p className="text-[11px] text-charcoal/80 leading-relaxed">
              <strong>Sarees:</strong> All sarees come in a standard length of 5.5 meters with an attached 0.8m to 1.0m unstitched matching blouse piece. Fall and pico edging are provided complimentary.
            </p>
            <p className="text-[11px] text-charcoal/80 leading-relaxed">
              <strong>Lehengas:</strong> Semi-stitched lehengas accommodate up to 44 inches waist and 42 inches length. Custom waist and length tailoring is offered free of charge prior to shipping.
            </p>
          </div>

          {/* Bespoke atelier prompt */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-burgundy text-gold-pale rounded-sm">
            <div>
              <p className="text-xs font-semibold">Desire a custom bespoke fit?</p>
              <p className="text-[11px] text-gold-light/90">
                Share your measurements directly with Puja Agrawala and the ESARI atelier on WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/919853035064?text=${encodeURIComponent("Hello Puja! I would like to inquire about custom bespoke sizing for my ESARI outfit.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold px-3.5 py-2 rounded-sm shrink-0 flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-burgundy" />
              <span>Chat with Atelier</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
