# ESARI — Official Haute E-Commerce Platform

> *"Tradition, elegance and style for every woman."*  
> **"Where Tradition Meets Timeless Elegance."**

A luxury Indian women's fashion and accessories e-commerce website designed and developed for **ESARI**, founded by **Puja Agrawala**.

---

## 1. Brand Information & Contact Details

- **Brand Name**: ESARI
- **Founder**: Puja Agrawala
- **Business Category**: Fashion & Accessories
- **Brand Tagline**: *"Tradition, elegance and style for every woman."*
- **Main Headline**: *"Where Tradition Meets Timeless Elegance."*
- **Contact Number**: [+91 98530 35064](tel:+919853035064)
- **WhatsApp Concierge**: [+91 98530 35064](https://wa.me/919853035064)
- **Official Email**: [agarwalapuja0320@gmail.com](mailto:agarwalapuja0320@gmail.com)
- **Official Domain**: [https://www.esari.in](https://www.esari.in)
- **Atelier Locations**: New Delhi & Bhubaneswar, India

---

## 2. Luxury Aesthetic & Color Palette

The design aesthetic is inspired by India's most prestigious royal fashion houses (Sabyasachi, Raw Mango, Torani, Anita Dongre), pairing deep jewel tones with sparkling champagne gold and airy ivory textures:

| Element | Color Name | Hex Code | Purpose |
|---|---|---|---|
| **Primary Hue** | Deep Wine Burgundy | `#641C32` / `#4A1224` | Brand headers, primary luxury buttons, crests |
| **Gilded Metallic** | Champagne Gold | `#C9A66B` / `#DFC698` | Borders, icons, luxury foils, discount tags |
| **Editorial Base** | Warm Ivory & Cream | `#FAF6EF` / `#F4ECE0` | Spacious, breathing background and card canvases |
| **Feminine Accent** | Dusty Rose & Rose Gold | `#D9B9B5` / `#B76E79` | Soft highlight badges, secondary buttons |
| **Contrasting Text** | Deep Charcoal | `#292326` | High-contrast typography and top announcement bar |

### Typography
- **Couture Serif**: *Playfair Display* & *Cormorant Garamond* (Editorial Indian headlines)
- **Modern Sans**: *Montserrat* & *Inter* (Clean, legible e-commerce details and specifications)

---

## 3. Pages & Features Implemented

### 1. Navigation Bar
- Monogram ESARI insignia and crest
- Direct route links: **Home | Shop | Collections | About Us | Contact | Wishlist | Cart**
- Top announcement bar with tagline, telephone (+91 98530 35064), email (agarwalapuja0320@gmail.com)
- Currency Switcher: **INR (₹)** default, USD ($), EUR (€), GBP (£), AED
- Atelier Admin Dashboard quick link
- Instant Search trigger overlay
- Real-time Wishlist badge counter
- Interactive Cart drawer toggle with count and live subtotal

### 2. Home Page (`/`)
- **Royal Hero Banner**: High-definition Indian fashion editorial imagery, ESARI crest, tagline, headline: *"Where Tradition Meets Timeless Elegance"*, with `Shop Now` and `Explore Collections` buttons.
- **Curated Category Highlights**: Direct portals to Ethnic Wear, Western Wear, Traditional Fashion, and Women's Accessories.
- **Best Sellers & Atelier Picks**: Interactive filter tabs (*All Curations, Best Sellers, New Arrivals, Festive Edit*) with rich product cards, quick add to bag, wishlist, and quick-view modals.
- **Brand Story & Founder Spotlight**: Highlighting founder **Puja Agrawala**, her vision, design philosophy, and quote.
- **Artisanal Pedigree**: Authentic Katan Banarasi weaves, royal zardozi & dabka handwork, and polki jadau jewelcraft.
- **Customer Testimonials**: Verified client reviews from Mumbai, Delhi, Bengaluru, Dubai, and London.
- **Instagram-Inspired Shoppable Gallery**: Curated lookbook featuring `@esari.official` handles and direct product links.
- **ESARI Privé Membership**: Newsletter subscription with promo code welcome benefit.

### 3. Shop & Collections (`/shop`, `/collections`)
- Complete catalog across required categories:
  - **Ethnic Wear** (Pure Silk Sarees, Flared Anarkalis, Shararas)
  - **Western Wear** (Silk Fusion Jumpsuits, Capes, Tailored Co-ords)
  - **Traditional Fashion** (Banarasi Katan Lehengas, Kanjeevarams)
  - **Women's Accessories** (Heritage Polki Chokers, Velvet Potlis, Embroidered Juttis)
  - **Festive Collections** (Royal Velvet Kurta Ensembles, Crimson Sarees)
  - **New Arrivals** & **Best Sellers**
- Multi-dimensional filters:
  - Price range slider (up to ₹60,000)
  - Sizing selector (XS, S, M, L, XL, XXL, Custom Sizing)
  - Color swatch filter
  - Instant live keyword search
  - Sorting: Featured, Price Low to High, Price High to Low, Rating, Newest
  - Grid column switchers (2-column / 3-column / 4-column)

### 4. Product Details (`/product/:id`)
- High-resolution interactive image gallery with thumbnail previews
- Product name, SKU, price, original MRP, discount percentage, tax note
- Limited batch inventory urgency counter
- Color swatches with visual feedback
- Size selector with interactive **Size Guide Modal** (measurements in inches & cm)
- Quantity selector (+ / -)
- **Add to Shopping Bag** and **Buy Now** buttons
- **WhatsApp Direct Inquiry**: Pre-filled message with product title, SKU, and price sent directly to `+91 98530 35064`
- **Pincode Delivery Estimator**: Instant delivery date and free express shipping check
- Detailed specifications tabs: Overview, Fabric & Handcraft, Garment Care, Shipping & Exchanges
- Related items recommendations ("You May Also Adore")

### 5. Shopping Bag & Cart Drawer
- Slide-over drawer accessible from any page
- Free shipping progress bar (Free Express Shipping unlocked above ₹4,999)
- Line items with selected size, color, quantity steppers, item removal
- Promo code input with instant validation:
  - `ESARIFIRST` — 10% off inauguration discount
  - `ROYALFESTIVE` — ₹1,500 off for festive orders above ₹7,000
- Order subtotal, discount, shipping, tax inclusive totals

### 6. Checkout Flow (`/checkout`)
- Step 1: Customer details & shipping destination (name, email, phone, street, city, state, pincode)
- Step 2: Payment method selection:
  - **Instant UPI / QR Code / Google Pay / PhonePe** (Zero surcharge)
  - **Credit & Debit Cards** (Visa, Mastercard, RuPay, Amex with 256-bit encryption)
  - **Net Banking** (HDFC, SBI, ICICI, Axis, Kotak)
  - **Cash on Delivery (COD)** with phone verification
- Step 3: Order summary with all line items and breakdown
- Realistic secure transaction simulation with dynamic order generation (`#ESARI-2026-XXXX`)

### 7. Order Confirmation & Tax Invoice (`/order-confirmation/:orderId`)
- Celebratory confirmation screen
- Live order status tracker: Order Placed → In Atelier → Dispatched → Delivered
- Tracking number display (`BD-XXXXXXXXIN`)
- Printable / downloadable tax invoice
- Direct button to opt into WhatsApp order status notifications

### 8. Wishlist (`/wishlist`)
- Dedicated wishlist page and slide-over drawer
- Move items to bag individually or move all to bag in one click
- Native Web Share API integration to share saved looks

### 9. About Us (`/about`)
- In-depth brand narrative celebrating Indian tradition and modern womanhood
- Detailed profile of **Puja Agrawala, Founder & Creative Director**
- Brand pillars: Rooted Indian Heritage, Timeless Feminine Poise, Bespoke Custom Tailoring, Artisanal Empowerment

### 10. Contact Us (`/contact`)
- Verified phone: `+91 98530 35064`
- Verified email: `agarwalapuja0320@gmail.com`
- Official domain: `https://www.esari.in`
- Interactive contact form with automated confirmation
- Direct WhatsApp chat link
- Frequently Asked Questions accordion (custom sizing, shipping timelines, saree fall/pico, return policy)

### 11. Atelier Admin Dashboard (`/admin`)
- Real-time business analytics (Total Revenue, Orders, Average Order Value, Active Products)
- **Product Catalog Management**: View all pieces, live search, add new creations with images and pricing, delete pieces, reset to default catalog
- **Order Management**: Review incoming customer orders, filter by status, update dispatch status (Atelier Processing, Quality Checked, Dispatched, Delivered)

---

## 4. How to Run the Website Locally

```bash
# 1. Navigate to the project directory
cd "C:\Users\ASUS\.gemini\antigravity\scratch\esari-website"

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

---

## 5. Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom Indian haute couture extensions
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **State & Storage**: React Context API (`ShopContext`) with `localStorage` persistence
- **Verification**: Node.js Automated Test Suite (`test-site.js`)
