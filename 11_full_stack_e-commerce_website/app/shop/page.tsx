// app/shop/page.tsx
"use client";
import { useState, useMemo } from "react";
import { useStore } from "../lib/store";
import { CATEGORIES } from "../lib/data";
import { ProductCard } from "../components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const products = useStore(s => s.products);
  const [category, setCategory] = useState("All");
  const [search, setSearch]     = useState("");
  const [sort, setSort]         = useState("default");

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter(p => p.category === category);
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, search, sort]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-vault-card border-b border-vault-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="section-eyebrow">Order online</p>
          <h1 className="section-title mb-2">Shop All Drinks</h1>
          <p className="text-vault-muted">
            {products.length} drinks available · Made to order · Delivered in 45 mins
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-muted" />
            <input
              type="text"
              placeholder="Search drinks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-vault-muted flex-shrink-0" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input-field w-auto cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? "bg-coffee-600 text-white"
                  : "bg-vault-card border border-vault-border text-vault-muted hover:border-coffee-600 hover:text-vault-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-vault-muted text-sm mb-6">
          Showing <strong className="text-vault-light">{filtered.length}</strong> results
          {category !== "All" && ` in ${category}`}
          {search && ` for "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="font-display text-xl text-vault-light mb-2">No drinks found</h3>
            <p className="text-vault-muted text-sm">Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
