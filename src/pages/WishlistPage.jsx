import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Share2 } from "lucide-react";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist, moveWishlistToCart, toggleWishlist, formatPrice, addToCart, showToast } = useShop();

  const handleMoveAllToBag = () => {
    wishlist.forEach((p) => {
      addToCart(p);
    });
    showToast(`Moved ${wishlist.length} items to your shopping bag!`);
  };

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: "My ESARI Wishlist",
        text: "Check out the luxury Indian fashion pieces I saved on ESARI!",
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Wishlist link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gold/25 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block mb-1">
            Saved Creations
          </span>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            My Luxury Wishlist
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            {wishlist.length} handcrafted piece{wishlist.length === 1 ? "" : "s"} saved in your private sanctuary.
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleShareWishlist}
              className="px-4 py-2 border border-gold/30 rounded-sm text-xs font-medium text-charcoal hover:text-burgundy hover:border-burgundy flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-gold-dark" />
              <span>Share Wishlist</span>
            </button>
            <button
              onClick={handleMoveAllToBag}
              className="bg-burgundy hover:bg-burgundy-light text-gold-pale px-5 py-2 rounded-sm text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-gold" />
              <span>Move All to Bag</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlist.length === 0 ? (
        <div className="bg-white border border-gold/20 rounded-sm p-16 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose/20 text-rose-dark flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-charcoal">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-charcoal-muted max-w-sm mx-auto leading-relaxed">
            Explore our curated Indian silhouettes, pure silk sarees, and heritage jewellery to save your favored looks for weddings and celebrations.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-burgundy hover:bg-burgundy-light text-gold-pale px-8 py-3 rounded-sm text-xs font-serif font-bold uppercase tracking-widest transition-colors shadow-sm"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
