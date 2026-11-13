import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Star,
  Ruler,
  Truck,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  Share2,
  Sparkles,
  ChevronRight,
  Info,
  Clock
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { BRAND_INFO } from "../data/brandData";
import ProductCard from "../components/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    showToast
  } = useShop();

  const product = products.find((p) => p.id === id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); // description | craft | care | shipping
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
      setActiveImageIndex(0);
      setSelectedSize(product.sizes ? product.sizes[0] : "Standard");
      setSelectedColor(product.colors ? product.colors[0]?.name : "Signature");
      setQuantity(1);
      setDeliveryResult(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-burgundy underline mt-4 inline-block">
          Return to collections
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate("/checkout");
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setDeliveryResult({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code (e.g. 110001)."
      });
      return;
    }
    setDeliveryResult({
      valid: true,
      message: `Delivery available for ${pincode}! Expected in 3 to 5 business days via Express Courier.`
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | ESARI`,
        text: product.shortDescription,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    }
  };

  // WhatsApp Inquiry link with product details
  const whatsAppText = encodeURIComponent(
    `Hello Puja & ESARI Team! I am interested in purchasing "${product.name}" (SKU: ${product.sku}) priced at ${formatPrice(product.price)}. Sizing preference: ${selectedSize}, Shade: ${selectedColor}. Please assist with bespoke options and delivery schedule.`
  );

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-charcoal-muted border-b border-gold/15 pb-4">
        <Link to="/" className="hover:text-burgundy">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gold-dark" />
        <Link to="/shop" className="hover:text-burgundy">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gold-dark" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-burgundy">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gold-dark" />
        <span className="text-burgundy font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery (Thumbnails + Main Image) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails column */}
          {product.images && product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-y-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? "border-burgundy shadow-md scale-102"
                      : "border-gold/25 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Main Hero Image */}
          <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-sm bg-ivory-dark/40 border border-gold/20 shadow-luxury">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-500 cursor-zoom-in"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <span className="bg-burgundy text-gold-pale text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-sm border border-gold/30 shadow-md">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-gold text-charcoal text-[11px] font-semibold tracking-wider px-2.5 py-0.5 rounded-sm shadow-md">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Top Right Wishlist & Share */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-colors ${
                  isFavorited
                    ? "bg-burgundy text-rose-light"
                    : "bg-white/85 text-charcoal hover:text-burgundy hover:bg-white"
                }`}
                title={isFavorited ? "In Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-light" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/85 text-charcoal hover:text-burgundy hover:bg-white shadow-md backdrop-blur-md transition-colors"
                title="Share piece"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Buying Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
              <span className="uppercase tracking-[0.2em] text-burgundy font-semibold text-xs">
                {product.category} &bull; {product.subCategory}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span className="font-semibold text-charcoal text-xs">{product.rating}</span>
                <span className="text-[11px] text-charcoal-muted">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">SKU: {product.sku}</p>

            {/* Curated Sample Notice Badge */}
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-beige/60 border border-gold/30 text-[11px] text-charcoal">
              <Sparkles className="w-3 h-3 text-gold-dark" />
              <span>Curated Sample Showcase &bull; Official Catalogue Release Pending</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-3xl font-serif font-bold text-burgundy">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-charcoal-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-gold/20 text-burgundy font-semibold text-xs px-2.5 py-0.5 rounded border border-gold/40">
                  Save {formatPrice(product.originalPrice - product.price)} ({discountPercent}%)
                </span>
              )}
            </div>

            <p className="text-xs text-charcoal-muted -mt-2">
              Inclusive of all taxes & duties &bull; Free express delivery across India
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed border-t border-gold/15 pt-4">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-charcoal">
                  Selected Shade: <strong className="text-burgundy">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      selectedColor === c.name ? "border-burgundy scale-110 shadow-md ring-2 ring-gold/30" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className={`w-4 h-4 ${c.hex === "#FAF6EF" ? "text-charcoal" : "text-white"}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector & Guide */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-charcoal">
                  Select Size: <strong className="text-burgundy">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-burgundy hover:underline flex items-center gap-1 font-semibold text-xs"
                >
                  <Ruler className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(s)}
                    className={`text-xs px-4 py-2 rounded-sm border transition-all ${
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

          {/* Quantity Selector & Stock Urgency */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-semibold text-charcoal">Quantity:</span>
            <div className="flex items-center border border-gold/30 rounded-sm bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-charcoal-muted hover:text-burgundy"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-9 text-center text-xs font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-charcoal-muted hover:text-burgundy"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-xs text-rose-dark font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {product.stockCount ? `Only ${product.stockCount} units crafted in atelier` : "Handcrafted piece"}
            </span>
          </div>

          {/* Action Buttons: Add to Bag & Buy Now */}
          <div className="space-y-3 pt-3 border-t border-gold/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-charcoal hover:bg-burgundy text-gold-pale py-4 px-6 rounded-sm text-xs uppercase tracking-luxury font-bold flex items-center justify-center gap-2 transition-all border border-gold/30 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-burgundy hover:bg-burgundy-light text-gold-pale py-4 px-6 rounded-sm text-xs uppercase tracking-luxury font-bold transition-all shadow-luxury border border-gold/40"
              >
                Buy Now
              </button>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href={`https://wa.me/919853035064?text=${whatsAppText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 py-3 px-4 rounded-sm text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Inquire & Customize on WhatsApp (+91 98530 35064)</span>
            </a>
          </div>

          {/* Pincode Delivery Estimator */}
          <div className="bg-ivory/60 border border-gold/20 p-4 rounded-sm space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-burgundy">
              <Truck className="w-4 h-4 text-gold-dark" />
              <span>Check Delivery Timeline to Your City</span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN (e.g. 110001)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-white border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
              />
              <button
                type="submit"
                className="bg-charcoal hover:bg-burgundy text-gold-pale text-xs px-4 py-2 rounded-sm font-medium transition-colors"
              >
                Check
              </button>
            </form>
            {deliveryResult && (
              <p
                className={`text-xs mt-1 font-medium ${
                  deliveryResult.valid ? "text-emerald-700" : "text-rose-dark"
                }`}
              >
                {deliveryResult.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Description | Fabric & Craft | Sizing & Fit | Care & Shipping */}
      <div className="border border-gold/25 rounded-sm bg-white overflow-hidden shadow-xs">
        <div className="flex border-b border-gold/20 bg-ivory overflow-x-auto">
          {[
            { id: "description", label: "Product Overview" },
            { id: "craft", label: "Fabric & Handcraft" },
            { id: "care", label: "Care & Maintenance" },
            { id: "shipping", label: "Shipping & Exchanges" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3.5 text-xs font-serif font-bold tracking-wide uppercase whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-burgundy text-burgundy bg-white"
                  : "border-transparent text-charcoal-muted hover:text-burgundy"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 text-xs sm:text-sm text-charcoal/85 leading-relaxed">
          {activeTab === "description" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-burgundy">About the Silhouette</h3>
              <p>{product.description}</p>
              {product.details && (
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-charcoal/80">
                  {product.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "craft" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-burgundy">Artisanal Weave & Technique</h3>
              <p>
                <strong>Fabric & Materials:</strong> {product.fabric}
              </p>
              <p>
                <strong>Handcrafted Technique:</strong> {product.craft}
              </p>
              <p className="text-xs text-charcoal-muted">
                Each motif is hand-embellished by master karigars in India using traditional needlecraft, fine zari dabka, and authentic silks.
              </p>
            </div>
          )}

          {activeTab === "care" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-burgundy">Garment Care Instructions</h3>
              <p>{product.care}</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-charcoal-muted">
                <li>Strictly professional dry cleaning recommended for pure silk and embroidered garments.</li>
                <li>Store flat or roll inside the provided breathable cotton muslin cover.</li>
                <li>Do not spray perfumes, deodorants, or alcohol-based sprays directly onto metallic zari.</li>
              </ul>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-burgundy">Complimentary Shipping & 7-Day Exchange</h3>
              <p>
                We offer complimentary express shipping across India on all orders above ₹4,999. Orders are insured from our atelier to your doorstep and dispatched via Bluedart or Delhivery within 24 to 48 hours.
              </p>
              <p>
                We offer a 7-day exchange or store credit guarantee on standard orders. Bespoke tailored garments are eligible for complimentary pattern adjustments.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products / You May Also Love */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-gold/25">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold">
              Complete Your Ensemble
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-1">
              You May Also Adore
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
