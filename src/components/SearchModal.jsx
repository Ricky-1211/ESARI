import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, formatPrice } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = ["Silk Saree", "Banarasi", "Polki Choker", "Velvet Kurta", "Anarkali", "Potli Bag", "Cape Set"];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory?.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric?.toLowerCase().includes(query.toLowerCase()) ||
          p.craft?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24 text-center">
        <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-gold/30">
          {/* Search Header */}
          <div className="p-4 sm:p-5 border-b border-gold/20 flex items-center gap-3 bg-ivory">
            <Search className="w-5 h-5 text-burgundy shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sarees, lehengas, jewelry, fabrics, craft..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base font-serif text-charcoal placeholder:text-charcoal-muted focus:outline-none placeholder:font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-charcoal-muted hover:text-burgundy"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-full text-charcoal-muted hover:text-burgundy hover:bg-gold/10"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions */}
          {!query && (
            <div className="p-5 space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-burgundy font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                Trending Searches in ESARI Atelier
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 bg-ivory hover:bg-gold/20 text-charcoal border border-gold/20 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div className="max-h-96 overflow-y-auto p-4 divide-y divide-gold/15">
              <div className="pb-2 text-[11px] text-charcoal-muted">
                Found {filteredProducts.length} matching piece{filteredProducts.length === 1 ? "" : "s"} for "{query}"
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-charcoal-muted text-xs">
                  <p>No products found matching "{query}".</p>
                  <p className="mt-1 text-[11px]">Try searching for "Saree", "Organza", "Jewellery", or "Silk".</p>
                </div>
              ) : (
                filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-3 py-3 group hover:bg-ivory/50 px-2 rounded transition-colors"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-12 h-14 object-cover object-top rounded-sm border border-gold/15 shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-burgundy font-semibold block">
                        {p.category}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-charcoal group-hover:text-burgundy transition-colors line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-muted line-clamp-1">{p.fabric}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xs font-bold text-burgundy">
                        {formatPrice(p.price)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-dark ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
