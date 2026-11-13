import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Sparkles,
  ArrowUpDown,
  Grid3X3,
  LayoutGrid,
  Check
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const { products, formatPrice, selectedCurrency } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Sync
  const categoryParam = searchParams.get("category");
  const tabParam = searchParams.get("tab");

  // State
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [priceRange, setPriceRange] = useState(60000); // max price INR
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4); // 2, 3, or 4 columns

  // Sync category if URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else if (tabParam === "bestsellers") {
      setSelectedCategory("Best Sellers");
    } else if (tabParam === "new") {
      setSelectedCategory("New Arrivals");
    } else if (tabParam === "festive") {
      setSelectedCategory("Festive Collections");
    }
  }, [categoryParam, tabParam]);

  const categories = [
    "All",
    "Traditional Accessories",
    "Ethnic Fashion",
    "Contemporary Accessories",
    "Everyday Elegance",
    "Festive Collection",
    "Statement Pieces"
  ];

  const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL", "Free Size", "Custom Sizing"];

  const colors = [
    { name: "All", hex: null },
    { name: "Wine Burgundy", hex: "#641C32" },
    { name: "Champagne Gold", hex: "#C9A66B" },
    { name: "Ivory Cream", hex: "#FAF6EF" },
    { name: "Dusty Rose", hex: "#D9B9B5" },
    { name: "Midnight Navy", hex: "#192841" }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Filter
      if (selectedCategory !== "All") {
        if (selectedCategory === "Festive Collections" && !product.isFestive) return false;
        if (selectedCategory === "New Arrivals" && !product.isNewArrival) return false;
        if (selectedCategory === "Best Sellers" && !product.isBestSeller) return false;
        if (
          selectedCategory !== "Festive Collections" &&
          selectedCategory !== "New Arrivals" &&
          selectedCategory !== "Best Sellers" &&
          product.category !== selectedCategory
        ) {
          return false;
        }
      }

      // Search Query Filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesFabric = product.fabric?.toLowerCase().includes(query);
        const matchesCraft = product.craft?.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesFabric && !matchesCraft) return false;
      }

      // Price Filter (in INR)
      if (product.price > priceRange) return false;

      // Size Filter
      if (selectedSize !== "All") {
        const hasSize = product.sizes?.some((s) => s.includes(selectedSize));
        if (!hasSize) return false;
      }

      // Color Filter
      if (selectedColor !== "All") {
        const hasColor = product.colors?.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchTerm, priceRange, selectedSize, selectedColor]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("All");
    setSelectedColor("All");
    setPriceRange(60000);
    setSearchTerm("");
    setSortBy("featured");
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedSize !== "All" ||
    selectedColor !== "All" ||
    priceRange < 60000 ||
    searchTerm.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="border-b border-gold/25 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-charcoal-muted mb-1.5">
              <Link to="/" className="hover:text-burgundy">Home</Link>
              <span>/</span>
              <span className="text-burgundy font-medium">Collections</span>
              {selectedCategory !== "All" && (
                <>
                  <span>/</span>
                  <span className="text-charcoal font-semibold">{selectedCategory}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              {selectedCategory === "All" ? "The Complete ESARI Collection" : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-2xl">
              Authentic Indian textiles, handcrafted zardozi borders, pure silk sarees, royal bridal lehengas, and artisanal heritage jewelry.
            </p>
          </div>

          <div className="text-xs text-charcoal-muted">
            Showing <strong className="text-burgundy">{sortedProducts.length}</strong> of {products.length} luxury pieces
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchParams(cat === "All" ? {} : { category: cat });
              }}
              className={`text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-burgundy text-gold-pale border-burgundy shadow-sm font-semibold"
                  : "bg-white text-charcoal border-gold/30 hover:border-burgundy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-sm border border-gold/25 h-fit shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gold/20">
            <h3 className="font-serif font-bold text-burgundy text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gold-dark" />
              <span>Filter Atelier</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-dark hover:underline font-medium"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search within catalog */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Search Design
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Silk, Banarasi, Polki..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 bg-ivory border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
              />
              <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-serif font-bold text-burgundy">
                {formatPrice(priceRange)}
              </span>
            </div>
            <input
              type="range"
              min="3000"
              max="60000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-burgundy cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-muted mt-1">
              <span>{formatPrice(3000)}</span>
              <span>{formatPrice(60000)}</span>
            </div>
          </div>

          {/* Sizing Filter */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Sizes
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-sm border transition-all ${
                    selectedSize === s
                      ? "bg-burgundy text-gold-pale border-burgundy font-semibold"
                      : "bg-white text-charcoal border-gold/25 hover:border-burgundy"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Color Palette
            </label>
            <div className="space-y-1.5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs transition-colors ${
                    selectedColor === c.name ? "bg-gold/15 text-burgundy font-semibold" : "hover:bg-ivory text-charcoal"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {c.hex && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.name}</span>
                  </div>
                  {selectedColor === c.name && <Check className="w-3.5 h-3.5 text-burgundy" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Section: Sort Bar & Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Mobile Filter Button, Sort Dropdown & Grid View Toggle */}
          <div className="bg-white p-3.5 rounded-sm border border-gold/20 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-semibold text-burgundy border border-burgundy/30 px-3 py-1.5 rounded-sm"
            >
              <Filter className="w-3.5 h-3.5 text-gold-dark" />
              <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-charcoal-muted flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-gold-dark" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-ivory border border-gold/30 rounded-sm px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-burgundy cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* Grid Toggle (Desktop) */}
            <div className="hidden sm:flex items-center gap-1 text-charcoal-muted">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-sm ${gridCols === 2 ? "bg-burgundy text-gold-pale" : "hover:text-burgundy"}`}
                title="2 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-sm ${gridCols === 3 ? "bg-burgundy text-gold-pale" : "hover:text-burgundy"}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-charcoal-muted text-[11px]">Active Filters:</span>
              {selectedCategory !== "All" && (
                <span className="bg-gold/15 text-burgundy border border-gold/40 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} className="hover:text-rose-dark">×</button>
                </span>
              )}
              {selectedSize !== "All" && (
                <span className="bg-gold/15 text-burgundy border border-gold/40 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize("All")} className="hover:text-rose-dark">×</button>
                </span>
              )}
              {selectedColor !== "All" && (
                <span className="bg-gold/15 text-burgundy border border-gold/40 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Color: {selectedColor}
                  <button onClick={() => setSelectedColor("All")} className="hover:text-rose-dark">×</button>
                </span>
              )}
              {priceRange < 60000 && (
                <span className="bg-gold/15 text-burgundy border border-gold/40 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Up to {formatPrice(priceRange)}
                  <button onClick={() => setPriceRange(60000)} className="hover:text-rose-dark">×</button>
                </span>
              )}
              {searchTerm && (
                <span className="bg-gold/15 text-burgundy border border-gold/40 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-rose-dark">×</button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-rose-dark hover:underline font-semibold ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white border border-gold/20 rounded-sm p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/15 text-gold-dark flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal">
                No designs match your selected filters
              </h3>
              <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                Try widening your price range, choosing "All Categories", or clearing the search terms to explore our atelier.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-burgundy text-gold-pale hover:bg-burgundy-light text-xs uppercase tracking-luxury font-medium px-6 py-2.5 rounded-sm transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
              } gap-6`}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white p-6 flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-gold/20">
                <h3 className="font-serif font-bold text-burgundy text-lg">Filter Atelier</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-charcoal-muted hover:text-burgundy"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search saree, polki, lehenga..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-gold/30 rounded-sm"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-2">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`text-xs px-2.5 py-1 rounded-sm border ${
                          selectedCategory === c
                            ? "bg-burgundy text-gold-pale border-burgundy"
                            : "border-gold/30 text-charcoal"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Max Price</span>
                    <span className="text-burgundy">{formatPrice(priceRange)}</span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="60000"
                    step="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-burgundy"
                  />
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-2">Sizes</label>
                  <div className="flex flex-wrap gap-1.5">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-2.5 py-1 rounded-sm border ${
                          selectedSize === s
                            ? "bg-burgundy text-gold-pale border-burgundy"
                            : "border-gold/30 text-charcoal"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gold/20 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-2 text-xs border border-charcoal-muted text-charcoal rounded-sm"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs bg-burgundy text-gold-pale rounded-sm font-semibold uppercase tracking-wider"
                >
                  View ({sortedProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
