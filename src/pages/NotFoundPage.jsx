import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Layers } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="bg-ivory text-charcoal min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-xl mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-gold/40 shadow-xl">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-burgundy">
          404 &bull; Page Not Found
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-charcoal">
          An Unwritten Chapter.
        </h1>

        <p className="text-charcoal/70 text-base leading-relaxed font-light">
          The page you are seeking does not exist or may have been moved. Allow us to guide you back to our curated collections and brand stories.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold tracking-widest uppercase border border-gold/40 shadow-sm transition-all"
          >
            <Home className="w-4 h-4 text-gold" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/collections"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ivory hover:bg-white text-burgundy text-xs font-semibold tracking-widest uppercase border border-burgundy/30 transition-all"
          >
            <Layers className="w-4 h-4 text-burgundy" />
            <span>Explore Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
