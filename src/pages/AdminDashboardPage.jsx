import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Search,
  Check,
  X,
  RotateCcw,
  Eye,
  Filter,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { BRAND_INFO } from "../data/brandData";

export default function AdminDashboardPage() {
  const {
    products,
    orders,
    formatPrice,
    addAdminProduct,
    updateAdminProduct,
    deleteAdminProduct,
    updateAdminOrderStatus,
    resetCatalogToDefault
  } = useShop();

  const [activeTab, setActiveTab] = useState("products"); // products | orders
  const [productSearch, setProductSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Ethnic Wear",
    subCategory: "Sarees",
    price: 15000,
    originalPrice: 19000,
    stockCount: 5,
    fabric: "Pure Mulberry Silk",
    craft: "Handcrafted Zardozi",
    badge: "New Arrival",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
    ],
    shortDescription: "Pure handcrafted Indian silhouette from the ESARI atelier.",
    description: "Exquisite couture hand-tailored with pure natural silk, antique gold embroidery, and unstitched blouse fabric."
  });

  // Analytics calculation
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const activeProductCount = products.length;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders =
    orderFilter === "All"
      ? orders
      : orders.filter((o) => o.status?.toLowerCase().includes(orderFilter.toLowerCase()));

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name) return;
    addAdminProduct(newProduct);
    setIsAddModalOpen(false);
    setNewProduct({
      name: "",
      category: "Ethnic Wear",
      subCategory: "Sarees",
      price: 15000,
      originalPrice: 19000,
      stockCount: 5,
      fabric: "Pure Mulberry Silk",
      craft: "Handcrafted Zardozi",
      badge: "New Arrival",
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
      ],
      shortDescription: "Pure handcrafted Indian silhouette from the ESARI atelier.",
      description: "Exquisite couture hand-tailored with pure natural silk, antique gold embroidery, and unstitched blouse fabric."
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gold/25 gap-4">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-gold-dark" />
            <span>ESARI Management Atelier</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Store & Product Management Console
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Founder: <strong>{BRAND_INFO.founder}</strong> &bull; Official Store: {BRAND_INFO.displayWebsite}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetCatalogToDefault}
            className="text-xs text-charcoal-muted hover:text-burgundy border border-gold/30 px-3 py-2 rounded-sm flex items-center gap-1.5 transition-colors"
            title="Reset to default seed products"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default Catalog</span>
          </button>

          <Link
            to="/shop"
            className="bg-burgundy hover:bg-burgundy-light text-gold-pale text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-sm transition-colors"
          >
            Preview Live Shop
          </Link>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-sm border border-gold/25 shadow-xs">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span>Total Sales Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-burgundy mt-2">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[10px] text-emerald-700 mt-1 font-medium">All completed transactions</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gold/25 shadow-xs">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span>Customer Orders</span>
            <ShoppingBag className="w-4 h-4 text-burgundy" />
          </div>
          <div className="font-serif text-2xl font-bold text-charcoal mt-2">
            {totalOrders}
          </div>
          <p className="text-[10px] text-charcoal-muted mt-1">Orders logged in system</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gold/25 shadow-xs">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span>Average Order Value</span>
            <TrendingUp className="w-4 h-4 text-gold-dark" />
          </div>
          <div className="font-serif text-2xl font-bold text-charcoal mt-2">
            {formatPrice(avgOrderValue)}
          </div>
          <p className="text-[10px] text-charcoal-muted mt-1">High-end couture baseline</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gold/25 shadow-xs">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span>Active Products</span>
            <Package className="w-4 h-4 text-burgundy" />
          </div>
          <div className="font-serif text-2xl font-bold text-burgundy mt-2">
            {activeProductCount}
          </div>
          <p className="text-[10px] text-charcoal-muted mt-1">Across 7 distinct categories</p>
        </div>
      </div>

      {/* Tabs Switcher: Products Catalog vs Orders */}
      <div className="flex border-b border-gold/25 gap-4">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 text-sm font-serif font-bold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === "products"
              ? "border-burgundy text-burgundy"
              : "border-transparent text-charcoal-muted hover:text-burgundy"
          }`}
        >
          Product Catalog Management ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 text-sm font-serif font-bold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === "orders"
              ? "border-burgundy text-burgundy"
              : "border-transparent text-charcoal-muted hover:text-burgundy"
          }`}
        >
          Customer Orders Fulfillment ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCT MANAGEMENT */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-sm border border-gold/20">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search products by title, category, SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 bg-ivory border border-gold/30 rounded-sm focus:outline-none focus:border-burgundy"
              />
              <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-2.5 top-2.5" />
            </div>

            {/* Add Product Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto bg-burgundy hover:bg-burgundy-light text-gold-pale px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-gold" />
              <span>Add New Creation</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white border border-gold/20 rounded-sm overflow-x-auto shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-ivory border-b border-gold/20 text-burgundy font-serif font-bold">
                <tr>
                  <th className="p-3.5">Piece</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price (INR)</th>
                  <th className="p-3.5">Inventory</th>
                  <th className="p-3.5">Attributes</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-ivory/30">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-14 object-cover object-top rounded-sm border border-gold/15 shrink-0"
                      />
                      <div>
                        <Link
                          to={`/product/${p.id}`}
                          className="font-serif font-bold text-charcoal hover:text-burgundy line-clamp-1"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-charcoal-muted block">SKU: {p.sku}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="bg-gold/15 text-burgundy font-medium px-2 py-0.5 rounded text-[10px] uppercase">
                        {p.category}
                      </span>
                    </td>

                    <td className="p-3.5 font-serif font-bold text-burgundy">
                      {formatPrice(p.price)}
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-charcoal">{p.stockCount || 5}</span> in atelier
                    </td>

                    <td className="p-3.5">
                      <div className="flex gap-1">
                        {p.isBestSeller && (
                          <span className="bg-burgundy text-gold-pale text-[9px] px-1.5 py-0.5 rounded">
                            Bestseller
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="bg-gold text-charcoal text-[9px] font-semibold px-1.5 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        to={`/product/${p.id}`}
                        className="text-charcoal-muted hover:text-burgundy inline-block"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4 inline" />
                      </Link>
                      <button
                        onClick={() => deleteAdminProduct(p.id)}
                        className="text-charcoal-muted hover:text-rose-dark"
                        title="Delete Piece"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-sm border border-gold/20">
            <span className="text-xs text-charcoal font-semibold">Filter by Order Status:</span>
            <div className="flex gap-2 text-xs">
              {["All", "Processing", "Dispatched", "Delivered"].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1 rounded-sm border ${
                    orderFilter === st
                      ? "bg-burgundy text-gold-pale border-burgundy font-semibold"
                      : "border-gold/30 text-charcoal"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 text-center text-xs text-charcoal-muted border border-gold/20 rounded-sm">
                No orders matching filter "{orderFilter}".
              </div>
            ) : (
              filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white p-6 rounded-sm border border-gold/25 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gold/15 gap-2">
                    <div>
                      <span className="font-serif font-bold text-burgundy text-sm sm:text-base">
                        Order #{ord.id}
                      </span>
                      <span className="text-xs text-charcoal-muted ml-3">
                        {new Date(ord.date).toLocaleDateString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short"
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-charcoal-muted">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateAdminOrderStatus(ord.id, e.target.value)}
                        className="text-xs px-2.5 py-1 border border-gold/40 rounded-sm bg-ivory font-semibold text-burgundy focus:outline-none cursor-pointer"
                      >
                        <option>Atelier Processing</option>
                        <option>Quality Checked</option>
                        <option>Dispatched</option>
                        <option>Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <h4 className="font-serif font-bold text-burgundy uppercase text-[10px] mb-1">
                        Client Details
                      </h4>
                      <p className="font-semibold text-charcoal">{ord.customer.fullName}</p>
                      <p>{ord.customer.email}</p>
                      <p>{ord.customer.phone}</p>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-burgundy uppercase text-[10px] mb-1">
                        Shipping Address
                      </h4>
                      <p>{ord.customer.address}</p>
                      <p>{ord.customer.city}, {ord.customer.state} - {ord.customer.pincode}</p>
                      <p className="text-charcoal-muted mt-0.5">Tracking: {ord.trackingNumber}</p>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-burgundy uppercase text-[10px] mb-1">
                        Payment & Total
                      </h4>
                      <p>{ord.paymentMethod}</p>
                      <p className="font-serif text-sm font-bold text-burgundy mt-1">
                        {formatPrice(ord.total)}
                      </p>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="pt-2 border-t border-gold/10 flex flex-wrap gap-3">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-ivory/60 p-1.5 rounded border border-gold/15 text-xs">
                        <img src={item.image} alt={item.name} className="w-8 h-10 object-cover object-top rounded-xs" />
                        <div>
                          <p className="font-medium text-charcoal line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-charcoal-muted">Qty: {item.quantity} &bull; Size: {item.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-xl p-6 sm:p-8 rounded-sm border border-gold/30 shadow-2xl">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute right-4 top-4 p-1 text-charcoal-muted hover:text-burgundy"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-xl font-bold text-burgundy mb-4">
                Add New Indian Couture Creation
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Creation Name *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. The Chandni Pure Kanjeevaram Saree"
                    className="w-full px-3 py-2 border border-gold/30 rounded-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Category *</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gold/30 rounded-sm bg-white"
                    >
                      <option>Ethnic Wear</option>
                      <option>Western Wear</option>
                      <option>Traditional Fashion</option>
                      <option>Women's Accessories</option>
                      <option>Festive Collections</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Subcategory</label>
                    <input
                      type="text"
                      value={newProduct.subCategory}
                      onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                      className="w-full px-3 py-2 border border-gold/30 rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Price (INR) *</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gold/30 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">MRP Price</label>
                    <input
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gold/30 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Stock</label>
                    <input
                      type="number"
                      value={newProduct.stockCount}
                      onChange={(e) => setNewProduct({ ...newProduct, stockCount: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gold/30 rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProduct.images[0]}
                    onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                    className="w-full px-3 py-2 border border-gold/30 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Fabric & Craft</label>
                  <input
                    type="text"
                    value={newProduct.fabric}
                    onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                    className="w-full px-3 py-2 border border-gold/30 rounded-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-charcoal-muted rounded-sm text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-burgundy hover:bg-burgundy-light text-gold-pale font-semibold rounded-sm text-xs uppercase tracking-wider"
                  >
                    Save & Add to Live Store
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
