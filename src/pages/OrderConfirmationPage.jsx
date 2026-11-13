import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  Truck,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Mail,
  Phone
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { BRAND_INFO } from "../data/brandData";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders, formatPrice } = useShop();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold">Order record not found</h2>
        <Link to="/shop" className="text-burgundy underline mt-3 inline-block">
          Return to Atelier
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsAppText = encodeURIComponent(
    `Hello ESARI Team! I just placed Order #${order.id} for ${formatPrice(order.total)}. Please keep me updated regarding atelier crafting and dispatch.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Success Celebration Header */}
      <div className="text-center space-y-3 bg-white p-8 rounded-sm border border-gold/30 shadow-luxury">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy font-semibold block">
          Order Confirmed &bull; ESARI Atelier
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Thank You for Your Order!
        </h1>

        <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto">
          Your order has been safely received by founder <strong>{BRAND_INFO.founder}</strong> and the ESARI tailoring atelier.
        </p>

        <div className="inline-block bg-ivory border border-gold/30 px-4 py-2 rounded-sm text-xs font-serif font-bold text-burgundy">
          Order Reference: #{order.id}
        </div>
      </div>

      {/* Live Order Status Tracker */}
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-gold/25 shadow-xs space-y-5">
        <h3 className="font-serif text-base font-bold text-burgundy flex items-center gap-2">
          <Truck className="w-4 h-4 text-gold-dark" />
          <span>Atelier Crafting & Dispatch Tracker</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm">
            <span className="font-semibold text-emerald-800 block">1. Order Placed</span>
            <span className="text-[10px] text-emerald-600">Confirmed & Verified</span>
          </div>
          <div className="p-3 bg-burgundy text-gold-pale border border-gold/40 rounded-sm font-semibold shadow-xs">
            <span className="block">2. In Atelier</span>
            <span className="text-[10px] text-gold-light">Hand Inspection</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm text-charcoal-muted">
            <span className="font-semibold block">3. Dispatched</span>
            <span className="text-[10px]">Express Courier</span>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm text-charcoal-muted">
            <span className="font-semibold block">4. Delivered</span>
            <span className="text-[10px]">3 to 5 Days</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-muted pt-2 gap-2">
          <span>Tracking ID: <strong className="text-charcoal font-mono">{order.trackingNumber}</strong></span>
          <span>Estimated Delivery: <strong className="text-burgundy">3 to 5 Business Days</strong></span>
        </div>
      </div>

      {/* Order Details & Summary Card (Printable) */}
      <div id="invoice-receipt" className="bg-white p-6 sm:p-8 rounded-sm border border-gold/25 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gold/20 gap-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-charcoal">Tax Invoice & Order Receipt</h2>
            <p className="text-xs text-charcoal-muted">
              Placed on {new Date(order.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs text-burgundy border border-gold/30 hover:bg-gold/15 px-3 py-1.5 rounded-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Invoice</span>
          </button>
        </div>

        {/* Customer Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-charcoal/80 pb-4 border-b border-gold/15">
          <div>
            <h4 className="font-serif font-bold text-burgundy uppercase tracking-wider text-[11px] mb-2">
              Delivery Destination
            </h4>
            <p className="font-semibold text-charcoal">{order.customer.fullName}</p>
            <p>{order.customer.address}</p>
            <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
            <p className="mt-1">Phone: {order.customer.phone}</p>
            <p>Email: {order.customer.email}</p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-burgundy uppercase tracking-wider text-[11px] mb-2">
              Payment & Fulfillment
            </h4>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Status:</strong> Completed & Verified</p>
            <p><strong>Fulfillment Atelier:</strong> ESARI Atelier, India</p>
            <p><strong>Customer Care:</strong> {BRAND_INFO.phone}</p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-burgundy uppercase tracking-wider text-[11px]">
            Items Ordered
          </h4>
          <div className="divide-y divide-gold/15">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover object-top rounded-sm border border-gold/15 shrink-0"
                  />
                  <div>
                    <h5 className="font-serif font-bold text-charcoal">{item.name}</h5>
                    <p className="text-[11px] text-charcoal-muted">
                      Size: {item.size} &bull; Color: {item.color} &bull; Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-serif font-bold text-burgundy">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Totals */}
        <div className="pt-4 border-t border-gold/20 space-y-2 text-xs text-charcoal/80">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-burgundy font-medium">
              <span>Privé Discount</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Express Courier Shipping</span>
            <span>{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-base font-serif font-bold text-burgundy pt-2 border-t border-gold/20">
            <span>Grand Total Paid</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Post-Purchase Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <a
          href={`https://wa.me/919853035064?text=${whatsAppText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-sm text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Get WhatsApp Updates (+91 98530 35064)</span>
        </a>

        <Link
          to="/shop"
          className="w-full sm:w-auto bg-burgundy hover:bg-burgundy-light text-gold-pale px-8 py-3 rounded-sm text-xs font-serif font-bold uppercase tracking-luxury transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
