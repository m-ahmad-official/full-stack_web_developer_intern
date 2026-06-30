// app/orders/page.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useStore } from "../lib/store";
import { Package, ShoppingBag, RefreshCw } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "text-yellow-400 bg-yellow-900/20 border-yellow-700/40",
  Confirmed: "text-blue-400 bg-blue-900/20 border-blue-700/40",
  Preparing: "text-coffee-400 bg-coffee-900/20 border-coffee-700/40",
  Dispatched: "text-purple-400 bg-purple-900/20 border-purple-700/40",
  Delivered: "text-green-400 bg-green-900/20 border-green-700/40",
};

export default function OrdersPage() {
  const { orders, ordersLoading, fetchOrders, user } = useStore();

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Package className="w-16 h-16 text-vault-border mb-6" />
        <h2 className="font-display text-2xl text-vault-light mb-2">
          Sign in to view orders
        </h2>
        <Link href="/login" className="btn-primary mt-4">
          Sign In
        </Link>
      </div>
    );

  const myOrders = orders.filter((o) => o.userId === user.id);

  if (ordersLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-coffee-400 animate-spin" />
      </div>
    );

  if (myOrders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="w-16 h-16 text-vault-border mb-6" />
        <h2 className="font-display text-2xl text-vault-light mb-2">
          No orders yet
        </h2>
        <p className="text-vault-muted mb-8">
          Your order history will appear here.
        </p>
        <Link href="/shop" className="btn-primary">
          Start Ordering
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title mb-1">My Orders</h1>
          <p className="text-vault-muted text-sm">
            {myOrders.length} order{myOrders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="space-y-5">
        {myOrders.map((order) => (
          <div key={order.id} className="card p-5 sm:p-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <div>
                <p className="font-semibold text-vault-light text-lg">
                  #{order.orderId}
                </p>
                <p className="text-vault-muted text-sm mt-0.5">
                  {new Date(order.createdAt).toLocaleString("en-PK", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-xs text-vault-muted mt-1">
                  📍 {order.address}
                </p>
              </div>
              <span
                className={`badge border flex items-center gap-1.5 ${STATUS_COLORS[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-vault-dark">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-vault-light truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-vault-muted">× {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-vault-light flex-shrink-0">
                    Rs {item.price * item.qty}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-vault-border pt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-vault-muted">
                Payment:{" "}
                <span className="text-vault-light capitalize">
                  {order.paymentMethod}
                </span>
                {" · "}
                Delivery:{" "}
                <span
                  className={
                    order.delivery === 0 ? "text-green-400" : "text-vault-light"
                  }
                >
                  {order.delivery === 0 ? "Free" : `Rs ${order.delivery}`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-vault-muted">Total: </span>
                <span className="font-bold text-coffee-400 text-lg">
                  Rs {order.total}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
