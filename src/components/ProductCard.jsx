import React from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingBag, Star, Sparkles } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white border border-gold/15 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-luxury hover:border-gold/40">
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-dark/40">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-burgundy text-gold-pale text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-sm border border-gold/30">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-gold text-charcoal text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isFavorited
              ? "bg-burgundy text-rose-light shadow-md"
              : "bg-white/85 text-charcoal hover:bg-white hover:text-burgundy backdrop-blur-sm"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          title={isFavorited ? "In your wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-light" : ""}`} />
        </button>

        {/* Quick View Button Hover Trigger */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-charcoal/90 hover:bg-charcoal text-ivory text-xs py-2.5 px-3 rounded-sm font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm transition-colors border border-gold/30"
          >
            <Eye className="w-3.5 h-3.5 text-gold" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-burgundy hover:bg-burgundy-light text-gold-pale p-2.5 rounded-sm shadow-md transition-colors border border-gold/30"
            title="Add to Shopping Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
            <span className="uppercase tracking-widest text-[10px] text-burgundy font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span className="text-charcoal font-medium text-[11px]">{product.rating}</span>
              <span className="text-[10px] text-charcoal-muted">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-serif font-semibold text-charcoal hover:text-burgundy transition-colors line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Short Fabric note */}
          <p className="text-[11px] text-charcoal-muted line-clamp-1 mb-2">
            {product.fabric || product.shortDescription}
          </p>
        </div>

        {/* Price and Add Action */}
        <div className="pt-2 border-t border-gold/15 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-serif font-bold text-burgundy">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-charcoal-muted/70 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[9px] text-charcoal-muted tracking-wider block">Taxes included</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="text-xs text-burgundy hover:text-burgundy-dark font-medium tracking-wide flex items-center gap-1 border border-burgundy/20 hover:border-burgundy px-2.5 py-1.5 rounded-sm transition-all duration-200"
          >
            <ShoppingBag className="w-3 h-3 text-gold-dark" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
