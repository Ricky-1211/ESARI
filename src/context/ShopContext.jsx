import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS_DATA } from "../data/productsData";
import { PROMO_CODES } from "../data/brandData";

const ShopContext = createContext();

export const CURRENCIES = {
  INR: { code: "INR", symbol: "₹", rate: 1, label: "INR (₹) - India" },
  USD: { code: "USD", symbol: "$", rate: 0.012, label: "USD ($) - International" },
  EUR: { code: "EUR", symbol: "€", rate: 0.011, label: "EUR (€) - Europe" },
  GBP: { code: "GBP", symbol: "£", rate: 0.0095, label: "GBP (£) - UK" },
  AED: { code: "AED", symbol: "AED ", rate: 0.044, label: "AED (د.إ) - UAE" }
};

export function ShopProvider({ children }) {
  // Products Catalog (with local persistence for admin modifications)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("esari_products");
      return saved ? JSON.parse(saved) : PRODUCTS_DATA;
    } catch {
      return PRODUCTS_DATA;
    }
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("esari_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Array of product objects)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("esari_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Placed Orders (with default samples for demo)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("esari_orders");
      if (saved) return JSON.parse(saved);
      return [
        {
          id: "ESARI-2026-8941",
          date: "2026-11-10T14:30:00.000Z",
          customer: {
            fullName: "Radhika Singhania",
            email: "radhika.s@example.com",
            phone: "+91 98765 43210",
            address: "Flat 402, Royal Palms, Vasant Vihar",
            city: "New Delhi",
            state: "Delhi",
            pincode: "110057"
          },
          items: [
            {
              id: "item-init-1",
              productId: "esari-prod-01",
              name: "The Noorani Wine Zardozi Silk Saree",
              price: 18500,
              quantity: 1,
              size: "Free Size (Includes Unstitched Blouse)",
              color: "Wine Burgundy",
              image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop"
            }
          ],
          paymentMethod: "UPI (Google Pay)",
          subtotal: 18500,
          discount: 1850,
          shipping: 0,
          total: 16650,
          status: "Processing (In Atelier)",
          trackingNumber: "BD-89234891IN"
        }
      ];
    } catch {
      return [];
    }
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [toast, setToast] = useState(null);

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem("esari_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("esari_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not save wishlist", e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("esari_products", JSON.stringify(products));
    } catch (e) {
      console.warn("Could not save products", e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("esari_orders", JSON.stringify(orders));
    } catch (e) {
      console.warn("Could not save orders", e);
    }
  }, [orders]);

  // Toast Helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Currency Converter & Formatter
  const formatPrice = (amountInINR) => {
    const curr = CURRENCIES[selectedCurrency] || CURRENCIES.INR;
    const converted = Math.round(amountInINR * curr.rate);
    if (selectedCurrency === "INR") {
      return `₹${converted.toLocaleString("en-IN")}`;
    }
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  // Cart Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 4999;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 250;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Cart Actions
  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || "Standard";
    const selectedColor = color || (product.colors && product.colors[0]?.name) || "Signature";

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          productId: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          category: product.category,
          size: selectedSize,
          color: selectedColor,
          quantity
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag!`);
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast("Item removed from your bag", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon Actions
  const applyCoupon = (code) => {
    const trimmed = code.trim().toUpperCase();
    const couponDef = PROMO_CODES[trimmed];

    if (!couponDef) {
      showToast("Invalid promo code. Try ESARIFIRST or ROYALFESTIVE", "error");
      return false;
    }

    if (couponDef.minOrder && subtotal < couponDef.minOrder) {
      showToast(`Coupon ${trimmed} requires a minimum order of ₹${couponDef.minOrder.toLocaleString()}`, "error");
      return false;
    }

    setAppliedCoupon(couponDef);
    showToast(`Promo code "${trimmed}" applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Promo code removed", "info");
  };

  // Wishlist Actions
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from your wishlist`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved to your wishlist!`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveWishlistToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  // Order Placement
  const placeOrder = (customerDetails, paymentMethod) => {
    const orderNumber = `ESARI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderNumber,
      date: new Date().toISOString(),
      customer: customerDetails,
      items: [...cart],
      paymentMethod,
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: finalTotal,
      coupon: appliedCoupon ? appliedCoupon.code : null,
      status: "Atelier Processing",
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      estimatedDelivery: "3 to 5 Business Days"
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  // Admin Catalog Management
  const addAdminProduct = (newProd) => {
    const productWithId = {
      ...newProd,
      id: `esari-prod-${Date.now()}`,
      sku: newProd.sku || `ES-CAT-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setProducts((prev) => [productWithId, ...prev]);
    showToast(`New product "${newProd.name}" added to catalog!`);
    return productWithId;
  };

  const updateAdminProduct = (productId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedFields } : p))
    );
    showToast("Product updated successfully in store catalog");
  };

  const deleteAdminProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast("Product removed from catalog", "info");
  };

  const updateAdminOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order ${orderId} status updated to: ${newStatus}`);
  };

  const resetCatalogToDefault = () => {
    setProducts(PRODUCTS_DATA);
    localStorage.removeItem("esari_products");
    showToast("Product catalog reset to default collection");
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        cartCount,
        wishlistCount: wishlist.length,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        freeShippingThreshold,
        freeShippingRemaining,
        isFreeShipping,
        appliedCoupon,
        selectedCurrency,
        setSelectedCurrency,
        formatPrice,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        placeOrder,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        addAdminProduct,
        updateAdminProduct,
        deleteAdminProduct,
        updateAdminOrderStatus,
        resetCatalogToDefault,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
