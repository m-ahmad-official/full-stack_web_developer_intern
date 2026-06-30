// app/shop/[slug]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useStore } from "../../lib/store";
import { useState, useRef } from "react";
import { ShoppingCart, Star, ArrowLeft, Upload, Package } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router    = useRouter();
  const { products, user, updateProduct, addToCart } = useStore();

  const product   = products.find(p => p.slug === slug);
  const [qty, setQty]               = useState(1);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">☕</div>
      <h2 className="font-display text-2xl text-vault-light mb-2">Product not found</h2>
      <Link href="/shop" className="btn-primary mt-4">Back to Shop</Link>
    </div>
  );

  const displayImage = imgPreview || product.image;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setImgPreview(url);
      // Persist to store
      updateProduct({ ...product, image: url });
    };
    reader.readAsDataURL(file);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-vault-muted hover:text-vault-light text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-vault-card border border-vault-border">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.featured && (
                <span className="absolute top-4 left-4 badge bg-coffee-600 text-white">Featured</span>
              )}
            </div>

            {/* Image upload — visible to all (admin feature shown inline) */}
            {user?.role === "admin" && (
              <div className="mt-4">
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-vault-border hover:border-coffee-500 rounded-xl py-4 text-sm text-vault-muted hover:text-coffee-400 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Change Product Image (Admin)
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="section-eyebrow">{product.category}</span>
            <h1 className="font-display text-4xl font-bold text-vault-light mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-coffee-400 text-coffee-400" : "text-vault-border"}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-vault-light">{product.rating}</span>
              <span className="text-sm text-vault-muted">({product.reviews} reviews)</span>
            </div>

            <p className="text-vault-muted leading-relaxed mb-6">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span key={tag} className="badge bg-coffee-900/50 border border-vault-border text-vault-muted text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-4 h-4 text-coffee-400" />
              <span className="text-sm text-vault-muted">
                {product.stock > 10 ? (
                  <span className="text-green-400 font-medium">In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-yellow-400 font-medium">Only {product.stock} left</span>
                ) : (
                  <span className="text-red-400 font-medium">Out of Stock</span>
                )}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-coffee-400">Rs {product.price * qty}</span>
              {qty > 1 && <span className="text-vault-muted text-sm">Rs {product.price} each</span>}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-vault-muted font-medium w-14">Qty:</span>
              <div className="flex items-center gap-3 bg-vault-card border border-vault-border rounded-lg p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-md hover:bg-vault-dark flex items-center justify-center text-vault-light text-lg transition-colors">−</button>
                <span className="w-8 text-center font-semibold text-vault-light">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-8 h-8 rounded-md hover:bg-vault-dark flex items-center justify-center text-vault-light text-lg transition-colors">+</button>
              </div>
            </div>

            {/* CTA */}
            <button
              disabled={product.stock === 0}
              onClick={() => { addToCart(product, qty); router.push("/cart"); }}
              className="btn-primary flex items-center justify-center gap-3 text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              Add {qty > 1 ? `${qty} items` : ""} to Cart — Rs {product.price * qty}
            </button>

            <Link href="/shop" className="btn-secondary text-center mt-3 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/shop/${p.slug}`} className="card group p-4 flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <p className="text-xs text-coffee-400 font-medium">{p.category}</p>
                    <h4 className="font-semibold text-vault-light group-hover:text-coffee-300 transition-colors">{p.name}</h4>
                    <p className="text-coffee-400 font-bold">Rs {p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
