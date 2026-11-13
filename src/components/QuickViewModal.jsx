import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Heart, ShoppingBag, Star, Sparkles, MessageCircle, Ruler, Check, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { BRAND_INFO } from "../data/brandData";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsCartOpen,
    setIsSizeGuideOpen
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : "Standard");
      setSelectedColor(quickViewProduct.colors ? quickViewProduct.colors[0]?.name : "Signature");
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    navigate("/checkout");
  };

  const whatsAppText = encodeURIComponent(
    `Hello ESARI Team! I am inquiring about "${product.name}" (SKU: ${product.sku}) priced at ${formatPrice(product.price)}. Please assist me with availability, custom sizing, and delivery timeline.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-gold/30">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-charcoal hover:bg-gold/20 hover:text-burgundy backdrop-blur-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-ivory flex flex-col justify-between">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ivory-dark/40 border border-gold/15 mb-3">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-burgundy text-gold-pale text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm border border-gold/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? "border-burgundy shadow-sm" : "border-gold/20 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details & Buying Controls */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
                  <span className="uppercase tracking-widest text-[11px] text-burgundy font-semibold">
                    {product.category} &bull; {product.subCategory}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="font-semibold text-charcoal text-xs">{product.rating}</span>
                    <span className="text-[11px] text-charcoal-muted">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Product Title */}
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal leading-snug">
                  {product.name}
                </h2>
                <p className="text-[11px] text-charcoal-muted mt-0.5">SKU: {product.sku}</p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 my-3">
                  <span className="text-2xl font-serif font-bold text-burgundy">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-charcoal-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="bg-gold/20 text-burgundy font-semibold text-xs px-2 py-0.5 rounded">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-3 mb-4">
                  {product.shortDescription || product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-charcoal mb-1.5">
                      Selected Shade: <span className="text-burgundy font-semibold">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform ${
                            selectedColor === c.name ? "border-burgundy scale-110 shadow-sm" : "border-gray-200"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor === c.name && (
                            <Check className={`w-3.5 h-3.5 ${c.hex === "#FAF6EF" ? "text-charcoal" : "text-white"}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-charcoal">
                        Select Sizing: <span className="text-burgundy font-semibold">{selectedSize}</span>
                      </label>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="text-[11px] text-burgundy hover:underline flex items-center gap-1 font-medium"
                      >
                        <Ruler className="w-3 h-3 text-gold-dark" />
                        <span>Size Chart</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(s)}
                          className={`text-xs px-3 py-1.5 rounded-sm border transition-all ${
                            selectedSize === s
                              ? "bg-burgundy text-gold-pale border-burgundy shadow-sm font-semibold"
                              : "border-gold/30 hover:border-burgundy text-charcoal bg-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-medium text-charcoal">Quantity:</span>
                  <div className="flex items-center border border-gold/30 rounded-sm bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-charcoal-muted hover:text-burgundy"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-charcoal-muted hover:text-burgundy"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-charcoal-muted">
                    {product.stockCount ? `Only ${product.stockCount} handcrafted units left` : "In stock"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-gold/20">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="bg-charcoal hover:bg-burgundy text-gold-pale py-3 px-4 rounded-sm text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-gold/30 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-burgundy hover:bg-burgundy-light text-gold-pale py-3 px-4 rounded-sm text-xs font-medium uppercase tracking-wider transition-colors border border-gold/40 shadow-luxury"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {/* WhatsApp button */}
                  <a
                    href={`https://wa.me/919853035064?text=${whatsAppText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 py-2 px-3 rounded-sm text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-sm border transition-colors flex items-center justify-center ${
                      isFavorited
                        ? "bg-rose/20 border-rose text-burgundy"
                        : "border-gold/30 hover:border-burgundy text-charcoal"
                    }`}
                    title={isFavorited ? "Saved in wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-burgundy text-burgundy" : ""}`} />
                  </button>
                </div>

                {/* View Full Product Link */}
                <div className="text-center pt-2">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="inline-flex items-center gap-1.5 text-xs text-burgundy font-medium hover:underline tracking-wide"
                  >
                    <span>View Complete Product Details, Fabric & Craft Story</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-dark" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
