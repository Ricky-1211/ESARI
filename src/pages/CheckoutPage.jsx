import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Building,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Trash2,
  AlertCircle
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { BRAND_INFO } from "../data/brandData";

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    formatPrice,
    placeOrder,
    removeFromCart
  } = useShop();

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Pooja Sharma",
    email: "agarwalapuja0320@gmail.com",
    phone: "+91 98530 35064",
    address: "Boutique Residence, 24 Gulmohar Marg",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi | card | netbanking | cod
  const [upiId, setUpiId] = useState("user@okaxis");
  const [cardDetails, setCardDetails] = useState({
    number: "4532 8192 7384 1092",
    name: "Pooja Sharma",
    expiry: "12/28",
    cvv: "891"
  });
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto">
          Please add your preferred Indian couture sarees, lehengas, or handcrafted accessories before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-burgundy hover:bg-burgundy-light text-gold-pale px-8 py-3 rounded-sm text-xs font-serif font-bold uppercase tracking-widest transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.address.trim()) {
      setErrorMsg("Please complete all required shipping fields.");
      return;
    }

    if (!formData.pincode || formData.pincode.length < 6) {
      setErrorMsg("Please provide a valid 6-digit postal PIN code.");
      return;
    }

    setIsProcessing(true);

    // Realistic processing animation
    setTimeout(() => {
      let paymentDesc = "";
      if (paymentMethod === "upi") paymentDesc = `UPI (${upiId})`;
      else if (paymentMethod === "card") paymentDesc = `Credit Card (ending in ${cardDetails.number.slice(-4)})`;
      else if (paymentMethod === "netbanking") paymentDesc = `Net Banking (${selectedBank})`;
      else paymentDesc = "Cash on Delivery (Verified)";

      const placedOrder = placeOrder(formData, paymentDesc);
      setIsProcessing(false);
      navigate(`/order-confirmation/${placedOrder.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Checkout Title */}
      <div className="border-b border-gold/25 pb-5 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
            Secure Atelier Checkout
          </span>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Complete Your ESARI Order
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-charcoal-muted bg-white border border-gold/30 px-3 py-1.5 rounded-sm">
          <Lock className="w-3.5 h-3.5 text-gold-dark" />
          <span>256-Bit Encrypted &bull; Direct Atelier Fulfillment</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Shipping Information & Payment Selection */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact & Shipping Details */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gold/25 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-burgundy flex items-center gap-2 pb-3 border-b border-gold/15">
              <Truck className="w-5 h-5 text-gold-dark" />
              <span>1. Customer & Delivery Address</span>
            </h3>

            {errorMsg && (
              <div className="p-3 bg-rose/20 text-burgundy text-xs rounded-sm flex items-center gap-2 border border-rose">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-charcoal font-semibold mb-1">
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-ivory/30 focus:outline-none focus:border-burgundy"
                  placeholder="e.g. Pooja Sharma"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">
                  Email Address (For Invoicing) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-ivory/30 focus:outline-none focus:border-burgundy"
                  placeholder="agarwalapuja0320@gmail.com"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">
                  Contact Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-ivory/30 focus:outline-none focus:border-burgundy"
                  placeholder="+91 98530 35064"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-charcoal font-semibold mb-1">
                  Street Address, Apartment, Landmark *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-ivory/30 focus:outline-none focus:border-burgundy"
                  placeholder="e.g. Flat 302, Royal Residency, Park Street"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-ivory/30 focus:outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-ivory/30 focus:outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Postal PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-ivory/30 focus:outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Country</label>
                <input
                  type="text"
                  readOnly
                  value="India (Domestic Free Express)"
                  className="w-full px-3 py-2.5 border border-gold/30 rounded-sm bg-gray-100 text-charcoal-muted cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Methods */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gold/25 shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-burgundy flex items-center gap-2 pb-3 border-b border-gold/15">
              <ShieldCheck className="w-5 h-5 text-gold-dark" />
              <span>2. Select Payment Method</span>
            </h3>

            <div className="space-y-3">
              {/* Option 1: UPI */}
              <label
                className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all ${
                  paymentMethod === "upi" ? "border-burgundy bg-gold/10" : "border-gold/20 hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  className="mt-1 accent-burgundy"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs sm:text-sm text-charcoal flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-burgundy" />
                      Instant UPI / QR Code / Google Pay / PhonePe
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      Zero Surcharge
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted mt-1">
                    Seamless payment via any Indian UPI app (Google Pay, PhonePe, Paytm, BHIM, Cred).
                  </p>

                  {paymentMethod === "upi" && (
                    <div className="mt-3 pt-3 border-t border-gold/20 flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter your UPI ID (e.g. mobile@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="text-xs px-3 py-2 border border-gold/30 rounded-sm bg-white flex-1"
                      />
                      <span className="text-xs self-center font-medium text-emerald-700">Verified</span>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 2: Credit / Debit Card */}
              <label
                className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all ${
                  paymentMethod === "card" ? "border-burgundy bg-gold/10" : "border-gold/20 hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mt-1 accent-burgundy"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs sm:text-sm text-charcoal flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-burgundy" />
                      Credit & Debit Cards (Visa, Mastercard, RuPay, Amex)
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted mt-1">
                    Secured by 256-bit encryption. Domestic and international cards accepted.
                  </p>

                  {paymentMethod === "card" && (
                    <div className="mt-3 pt-3 border-t border-gold/20 space-y-2 text-xs">
                      <div>
                        <label className="block text-charcoal-muted text-[11px] mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-3 py-1.5 border border-gold/30 rounded-sm bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-charcoal-muted text-[11px] mb-1">Valid Thru</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gold/30 rounded-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-charcoal-muted text-[11px] mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="w-full px-3 py-1.5 border border-gold/30 rounded-sm bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 3: Net Banking */}
              <label
                className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all ${
                  paymentMethod === "netbanking" ? "border-burgundy bg-gold/10" : "border-gold/20 hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === "netbanking"}
                  onChange={() => setPaymentMethod("netbanking")}
                  className="mt-1 accent-burgundy"
                />
                <div className="flex-1">
                  <span className="font-serif font-bold text-xs sm:text-sm text-charcoal flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-burgundy" />
                    Indian Net Banking
                  </span>
                  <p className="text-[11px] text-charcoal-muted mt-1">
                    Select your bank: HDFC, ICICI, SBI, Axis, Kotak.
                  </p>
                  {paymentMethod === "netbanking" && (
                    <div className="mt-2">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="text-xs px-3 py-2 border border-gold/30 rounded-sm bg-white w-full"
                      >
                        <option>HDFC Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 4: Cash on Delivery */}
              <label
                className={`flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all ${
                  paymentMethod === "cod" ? "border-burgundy bg-gold/10" : "border-gold/20 hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-burgundy"
                />
                <div className="flex-1">
                  <span className="font-serif font-bold text-xs sm:text-sm text-charcoal">
                    Cash on Delivery (COD)
                  </span>
                  <p className="text-[11px] text-charcoal-muted mt-0.5">
                    Pay in cash upon physical delivery. Our concierge will verify your address via call/WhatsApp before dispatch.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary & Review */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-sm border border-gold/30 shadow-luxury space-y-4 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-burgundy pb-3 border-b border-gold/20">
              Order Summary ({cart.length} item{cart.length > 1 ? "s" : ""})
            </h3>

            {/* Items list */}
            <div className="max-h-72 overflow-y-auto space-y-3 divide-y divide-gold/15 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover object-top rounded-sm border border-gold/15 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-serif font-bold text-charcoal line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-charcoal-muted">
                        Qty: {item.quantity} &bull; Size: {item.size}
                      </p>
                      <p className="text-[11px] text-charcoal-muted">Color: {item.color}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-serif font-bold text-burgundy">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal-muted hover:text-rose-dark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs border-t border-gold/20 pt-4 text-charcoal/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-burgundy font-medium">
                  <span>Privé Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span className="font-medium text-charcoal">
                  {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Duties (GST)</span>
                <span className="text-emerald-700 font-medium">Included</span>
              </div>

              <div className="flex justify-between text-base font-serif font-bold text-burgundy pt-3 border-t border-gold/20">
                <span>Grand Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-burgundy hover:bg-burgundy-light text-gold-pale py-4 px-6 rounded-sm text-xs font-serif font-bold uppercase tracking-luxury transition-all shadow-luxury border border-gold/40 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-gold-pale border-t-transparent rounded-full animate-spin" />
                  <span>Securing Order in Atelier...</span>
                </>
              ) : (
                <>
                  <span>Place Order &bull; {formatPrice(finalTotal)}</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </>
              )}
            </button>

            <div className="text-[10px] text-charcoal-muted text-center space-y-1">
              <p>7-Day Exchange &bull; 100% Authentic Indian Weaves</p>
              <p>For instant phone/WhatsApp assistance: <strong>{BRAND_INFO.phone}</strong></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
