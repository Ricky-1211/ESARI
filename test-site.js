import fs from 'fs';
import path from 'path';

console.log("=================================================");
console.log("ESARI HAUTE E-COMMERCE - FULL VERIFICATION SUITE");
console.log("=================================================\n");

const baseDir = "C:/Users/ASUS/.gemini/antigravity/scratch/esari-website";
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify all required files exist
const requiredFiles = [
  "src/App.jsx",
  "src/main.jsx",
  "src/context/ShopContext.jsx",
  "src/data/brandData.js",
  "src/data/productsData.js",
  "src/components/Navbar.jsx",
  "src/components/Footer.jsx",
  "src/components/ProductCard.jsx",
  "src/components/CartDrawer.jsx",
  "src/components/WishlistDrawer.jsx",
  "src/components/QuickViewModal.jsx",
  "src/components/SizeGuideModal.jsx",
  "src/components/SearchModal.jsx",
  "src/components/PolicyModals.jsx",
  "src/components/Toast.jsx",
  "src/pages/HomePage.jsx",
  "src/pages/ShopPage.jsx",
  "src/pages/OurStoryPage.jsx",
  "src/pages/ProductDetailsPage.jsx",
  "src/pages/AboutPage.jsx",
  "src/pages/ContactPage.jsx",
  "src/pages/WishlistPage.jsx",
  "src/pages/CheckoutPage.jsx",
  "src/pages/OrderConfirmationPage.jsx",
  "src/pages/AdminDashboardPage.jsx",
  "src/pages/NotFoundPage.jsx"
];

requiredFiles.forEach((file) => {
  const fullPath = path.join(baseDir, file);
  assert(fs.existsSync(fullPath), `File exists: ${file}`);
});

// 2. Verify Brand Information accuracy
const brandDataContent = fs.readFileSync(path.join(baseDir, "src/data/brandData.js"), "utf-8");
assert(brandDataContent.includes("ESARI"), "Brand name ESARI present in brandData");
assert(brandDataContent.includes("Puja Agrawala"), "Founder Puja Agrawala present in brandData");
assert(brandDataContent.includes("ESARI – Tradition, Elegance and Style for Every Woman."), "Tagline exact match");
assert(brandDataContent.includes("+91 98530 35064"), "Phone number exact match");
assert(brandDataContent.includes("agarwalapuja0320@gmail.com"), "Email exact match");
assert(brandDataContent.includes("https://www.esari.in"), "Website URL exact match");
assert(brandDataContent.includes("Exhibitor Booth – Review Pending"), "Zoho status exact match");
assert(brandDataContent.includes("Elegance That Speaks. Tradition That Inspires."), "Hero heading exact match");
assert(brandDataContent.includes("The Essence of ESARI"), "About heading exact match");
assert(brandDataContent.includes("Tradition Meets Modern Elegance"), "Brand experience heading exact match");
assert(brandDataContent.includes("Celebrate Your Style. Embrace Your Elegance."), "CTA banner heading exact match");

// 3. Verify Product Categories
const productsDataContent = fs.readFileSync(path.join(baseDir, "src/data/productsData.js"), "utf-8");
assert(productsDataContent.includes("Traditional Accessories"), "Traditional Accessories category present");
assert(productsDataContent.includes("Ethnic Fashion"), "Ethnic Fashion category present");
assert(productsDataContent.includes("Contemporary Accessories"), "Contemporary Accessories category present");
assert(productsDataContent.includes("Everyday Elegance"), "Everyday Elegance category present");
assert(productsDataContent.includes("Festive Collection"), "Festive Collection category present");
assert(productsDataContent.includes("Statement Pieces"), "Statement Pieces category present");

console.log("\n=================================================");
console.log(`VERIFICATION SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log("=================================================");

if (failed > 0) {
  process.exit(1);
}
