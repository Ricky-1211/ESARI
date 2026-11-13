import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import QuickViewModal from "./components/QuickViewModal";
import SizeGuideModal from "./components/SizeGuideModal";
import SearchModal from "./components/SearchModal";
import Toast from "./components/Toast";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AboutPage from "./pages/AboutPage";
import OurStoryPage from "./pages/OurStoryPage";
import ContactPage from "./pages/ContactPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

// Dynamic Document Title Updater
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "ESARI | Tradition, Elegance and Style for Every Woman | Official Website",
      "/shop": "Shop Luxury Indian Fashion & Accessories | ESARI",
      "/collections": "Collections | Sarees, Lehengas, Fusion & Jewellery | ESARI",
      "/about": "About ESARI | Brand Essence & Founder Puja Agrawala",
      "/our-story": "The Vision Behind ESARI | Puja Agrawala, Founder",
      "/contact": "Contact ESARI Concierge | +91 98530 35064 | agarwalapuja0320@gmail.com",
      "/wishlist": "My Saved Creations | ESARI Wishlist",
      "/checkout": "Secure Atelier Checkout | ESARI",
      "/admin": "Atelier Store Management | ESARI Admin"
    };

    if (location.pathname.startsWith("/product/")) {
      document.title = "Haute Couture Piece | ESARI Indian Fashion";
    } else if (location.pathname.startsWith("/order-confirmation/")) {
      document.title = "Order Confirmed | ESARI Atelier";
    } else {
      document.title = titles[location.pathname] || "ESARI | Official Brand Website";
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <TitleUpdater />

        <div className="flex flex-col min-h-screen bg-ivory text-charcoal font-sans selection:bg-rose selection:text-burgundy">
          {/* Sticky Navigation */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/collections" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Luxury Global Footer */}
          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <SizeGuideModal />
          <SearchModal />
          <Toast />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
