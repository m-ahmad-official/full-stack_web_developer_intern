// app/components/ProductCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/store";
import { Product } from "../lib/types";
import { ShoppingCart, Star } from "lucide-react";

interface Props {
  product: Product;
  showCategory?: boolean;
}

export function ProductCard({ product, showCategory = true }: Props) {
  const addToCart = useStore(s => s.addToCart);

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-vault-dark">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 badge bg-coffee-600 text-white">Featured</span>
        )}
        {product.stock < 10 && (
          <span className="absolute top-3 right-3 badge bg-red-900/80 text-red-300 border border-red-700">Low Stock</span>
        )}
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {showCategory && (
          <span className="text-xs font-semibold text-coffee-400 uppercase tracking-wider mb-2">
            {product.category}
          </span>
        )}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display font-bold text-vault-light text-lg mb-2 hover:text-coffee-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-vault-muted text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <Star className="w-3.5 h-3.5 fill-coffee-400 text-coffee-400" />
          <span className="text-sm font-semibold text-vault-light">{product.rating}</span>
          <span className="text-xs text-vault-muted">({product.reviews} reviews)</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-bold text-coffee-400">Rs {product.price}</span>
            <span className="text-xs text-vault-muted ml-1">/cup</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-coffee-700 hover:bg-coffee-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
