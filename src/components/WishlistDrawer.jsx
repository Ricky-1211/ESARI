import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    moveWishlistToCart,
    formatPrice
  } = useShop();

  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gold/30">
          {/* Header */}
          <div className="p-5 border-b border-gold/20 bg-ivory flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-burgundy" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-burgundy">Your Wishlist</h3>
                <p className="text-[11px] text-charcoal-muted">
                  {wishlist.length === 0 ? "No saved items" : `${wishlist.length} saved piece${wishlist.length > 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-charcoal-muted hover:text-burgundy rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose/20 flex items-center justify-center text-rose-dark">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-charcoal">Your wishlist is empty</h4>
                  <p className="text-xs text-charcoal-muted mt-1 max-w-xs">
                    Save your favorite handloom sarees, designer lehengas, and heritage jewelry to review them anytime.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate("/shop");
                  }}
                  className="bg-burgundy hover:bg-burgundy-light text-gold-pale text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-sm transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded border border-gold/20 bg-ivory/30 hover:border-gold/40 transition-all"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover object-top rounded-sm shrink-0 border border-gold/10"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="font-serif text-xs font-semibold text-charcoal hover:text-burgundy line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-charcoal-muted/60 hover:text-rose-dark transition-colors p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-charcoal-muted mt-0.5">{product.category}</p>
                      <span className="font-serif text-sm font-bold text-burgundy mt-1 block">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => moveWishlistToCart(product)}
                      className="mt-2 text-xs bg-burgundy hover:bg-burgundy-light text-gold-pale py-1.5 px-3 rounded-sm flex items-center justify-center gap-1.5 transition-colors font-medium tracking-wide"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 border-t border-gold/20 bg-ivory flex gap-2">
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigate("/wishlist");
                }}
                className="w-full border border-burgundy text-burgundy hover:bg-burgundy hover:text-gold-pale py-2.5 rounded-sm text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Wishlist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
