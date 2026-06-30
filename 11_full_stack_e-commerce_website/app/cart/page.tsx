// app/cart/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../lib/store";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, user } = useStore();
  const subtotal = cartTotal();
  const delivery = subtotal > 0 ? (subtotal >= 1000 ? 0 : 80) : 0;
  const total    = subtotal + delivery;

  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
      <ShoppingBag className="w-16 h-16 text-vault-border mb-6" />
      <h2 className="font-display text-2xl text-vault-light mb-2">Your cart is empty</h2>
      <p className="text-vault-muted mb-8">Add some amazing coffee to get started.</p>
      <Link href="/shop" className="btn-primary">Browse Menu</Link>
    </div>
  );

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="card flex items-center gap-4 p-4">
              <Link href={`/shop/${item.slug}`} className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-vault-dark">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/shop/${item.slug}`}>
                  <h3 className="font-semibold text-vault-light hover:text-coffee-300 transition-colors">{item.name}</h3>
                </Link>
                <p className="text-coffee-400 font-semibold text-sm mt-0.5">Rs {item.price} each</p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2 bg-vault-dark border border-vault-border rounded-lg px-1 py-0.5">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-vault-light hover:text-coffee-400 transition-colors text-lg">−</button>
                    <span className="w-6 text-center text-sm font-semibold text-vault-light">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-vault-light hover:text-coffee-400 transition-colors text-lg">+</button>
                  </div>
                  <span className="text-vault-light font-bold text-sm ml-auto">Rs {item.price * item.qty}</span>
                </div>
              </div>

              <button onClick={() => removeFromCart(item.id)} className="text-vault-muted hover:text-red-400 transition-colors p-2 flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-display font-bold text-vault-light text-xl mb-6">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm text-vault-muted">
                <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="text-vault-light">Rs {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-vault-muted">
                <span>Delivery</span>
                <span className={delivery === 0 ? "text-green-400 font-semibold" : "text-vault-light"}>
                  {delivery === 0 ? "FREE" : `Rs ${delivery}`}
                </span>
              </div>
              {subtotal < 1000 && subtotal > 0 && (
                <p className="text-xs text-coffee-400 bg-coffee-900/30 rounded-lg px-3 py-2">
                  Add Rs {1000 - subtotal} more for free delivery!
                </p>
              )}
            </div>

            <div className="border-t border-vault-border pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-vault-light">Total</span>
                <span className="text-coffee-400">Rs {total}</span>
              </div>
            </div>

            <Link
              href={user ? "/checkout" : "/login"}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4"
            >
              {user ? "Proceed to Checkout" : "Sign in to Checkout"}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {!user && (
              <p className="text-xs text-vault-muted text-center mt-3">
                You'll be redirected back to cart after login.
              </p>
            )}

            <Link href="/shop" className="btn-ghost w-full text-center text-sm mt-3 block">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
