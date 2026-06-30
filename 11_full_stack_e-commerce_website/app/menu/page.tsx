// app/menu/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/store";
import { CATEGORIES } from "../lib/data";
import { ShoppingCart, Star } from "lucide-react";

export default function MenuPage() {
  const { products, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-vault-card border-b border-vault-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="section-eyebrow">Crafted with care</p>
          <h1 className="section-title text-4xl md:text-5xl">Our Full Menu</h1>
          <p className="text-vault-muted max-w-xl mx-auto">
            Every drink made to order. We use whole milk, oat milk, and almond milk. All espresso is double-shot by default.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-vault-dark/95 backdrop-blur-sm border-b border-vault-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-coffee-600 text-white"
                  : "bg-vault-card border border-vault-border text-vault-muted hover:text-vault-light hover:border-coffee-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items — list style */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {filtered.map(product => (
          <div key={product.id} className="card flex gap-4 p-4 sm:p-5">
            <Link href={`/shop/${product.slug}`} className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-vault-dark">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="128px" />
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs text-coffee-400 font-semibold uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-display font-bold text-vault-light text-lg mt-0.5">{product.name}</h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-coffee-400 font-bold text-lg">Rs {product.price}</div>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    <Star className="w-3 h-3 fill-coffee-400 text-coffee-400" />
                    <span className="text-xs text-vault-muted">{product.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-vault-muted text-sm mt-1.5 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-1.5 bg-coffee-700 hover:bg-coffee-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
                <Link href={`/shop/${product.slug}`} className="text-sm text-vault-muted hover:text-coffee-400 transition-colors px-2">
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
