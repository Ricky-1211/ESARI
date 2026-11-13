import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput("");
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gold/30">
          {/* Header */}
          <div className="p-5 border-b border-gold/20 bg-ivory flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-burgundy" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-burgundy">Your Shopping Bag</h3>
                <p className="text-[11px] text-charcoal-muted">
                  {cart.length === 0 ? "Your bag is empty" : `${cart.length} unique item${cart.length > 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-charcoal-muted hover:text-burgundy rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-ivory-cream/70 px-5 py-3 border-b border-gold/15">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-burgundy font-medium text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                {isFreeShipping
                  ? "You have unlocked Complimentary Express Shipping!"
                  : `Add ${formatPrice(freeShippingRemaining)} more for Free Shipping`}
              </span>
              <span className="text-[10px] font-semibold text-charcoal-muted">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gold/20 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-burgundy h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-charcoal">Your bag is empty</h4>
                  <p className="text-xs text-charcoal-muted mt-1 max-w-xs">
                    Explore our handcrafted Indian fashion, royal sarees, lehengas, and artisanal accessories.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/shop");
                  }}
                  className="bg-burgundy hover:bg-burgundy-light text-gold-pale text-xs font-medium uppercase tracking-widest px-6 py-3 rounded-sm transition-colors shadow-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded border border-gold/20 bg-ivory/30 transition-all hover:border-gold/40"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top rounded-sm shrink-0 border border-gold/10"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.productId}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-xs font-semibold text-charcoal hover:text-burgundy line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-charcoal-muted/60 hover:text-rose-dark transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-x-3 text-[11px] text-charcoal-muted mt-1">
                        <span>Size: <strong className="text-charcoal">{item.size}</strong></span>
                        <span>Color: <strong className="text-charcoal">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gold/10">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gold/30 rounded-sm bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-burgundy text-charcoal-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-burgundy text-charcoal-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-burgundy">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="border-t border-gold/30 p-5 bg-ivory space-y-3">
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-gold/15 border border-gold/40 px-3 py-1.5 rounded-sm text-xs">
                    <div className="flex items-center gap-1.5 text-burgundy font-medium">
                      <Tag className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{appliedCoupon.code} applied ({appliedCoupon.description})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-dark hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. ESARIFIRST)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 border border-gold/30 rounded-sm bg-white focus:outline-none focus:border-burgundy uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-charcoal hover:bg-burgundy text-gold-pale text-xs px-3.5 py-2 rounded-sm font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                <div className="flex gap-2 text-[10px] text-charcoal-muted">
                  <span>Try: <code className="bg-gold/15 px-1 py-0.5 rounded text-burgundy font-semibold">ESARIFIRST</code> (10% off)</span>
                  <span>or <code className="bg-gold/15 px-1 py-0.5 rounded text-burgundy font-semibold">ROYALFESTIVE</code> (₹1,500 off)</span>
                </div>
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-charcoal-muted pt-2 border-t border-gold/15">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-burgundy font-medium">
                    <span>Privé Coupon Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-medium text-charcoal">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-burgundy pt-1.5 border-t border-gold/20">
                  <span>Grand Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
                <p className="text-[10px] text-charcoal-muted/70 text-right">Includes all taxes and duties</p>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-burgundy hover:bg-burgundy-light text-gold-pale py-3.5 px-4 rounded-sm font-medium tracking-luxury text-xs uppercase flex items-center justify-center gap-2 shadow-luxury transition-all duration-200 border border-gold/30"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                <span>100% Secure Checkout &bull; Authentic Indian Craftsmanship</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
