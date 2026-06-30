// app/admin/page.tsx
"use client";
import Link from "next/link";
import { useStore } from "../lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Star,
  ArrowRight,
  RefreshCw,
  Clock,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "text-yellow-400 bg-yellow-900/20 border-yellow-700/40",
  Confirmed: "text-blue-400 bg-blue-900/20 border-blue-700/40",
  Preparing: "text-coffee-400 bg-coffee-900/20 border-coffee-700/40",
  Dispatched: "text-purple-400 bg-purple-900/20 border-purple-700/40",
  Delivered: "text-green-400 bg-green-900/20 border-green-700/40",
};

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Dispatched",
  "Delivered",
] as const;

export default function AdminPage() {
  const {
    user,
    products,
    orders,
    ordersLoading,
    fetchOrders,
    fetchProducts,
    updateOrderStatus,
  } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/login");
      return;
    }
    fetchProducts();
    fetchOrders();
  }, [user]);

  if (!user || user.role !== "admin") return null;

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgRating = products.length
    ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)
    : "—";

  const STATS = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-blue-400",
      bg: "bg-blue-900/20 border-blue-700/30",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-coffee-400",
      bg: "bg-coffee-900/20 border-coffee-700/30",
    },
    {
      label: "Revenue (Rs)",
      value: `Rs ${totalRevenue}`,
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-900/20 border-green-700/30",
    },
    {
      label: "Avg Rating",
      value: avgRating,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-900/20 border-yellow-700/30",
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="section-eyebrow">Admin Dashboard</p>
          <h1 className="section-title mb-0">Coffee Vault HQ</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              fetchProducts();
              fetchOrders();
            }}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <Link
            href="/admin/products"
            className="btn-primary flex items-center gap-2"
          >
            Manage Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`card p-5 border ${bg}`}>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} mb-3`}
            >
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className={`text-3xl font-display font-bold ${color} mb-1`}>
              {value}
            </div>
            <div className="text-sm text-vault-muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-vault-light text-xl">
              Recent Orders
            </h2>
            {ordersLoading && (
              <RefreshCw className="w-4 h-4 text-vault-muted animate-spin" />
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-vault-border mx-auto mb-3" />
              <p className="text-vault-muted text-sm">No orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-vault-border">
                    {[
                      "Order ID",
                      "Customer",
                      "Items",
                      "Total",
                      "Status",
                      "Update",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left pb-3 text-xs font-semibold text-vault-muted uppercase tracking-wider whitespace-nowrap pr-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-vault-border">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-vault-dark/50 transition-colors"
                    >
                      <td className="py-3 pr-4 font-mono text-coffee-400 font-semibold text-xs whitespace-nowrap">
                        #{order.orderId}
                      </td>
                      <td className="py-3 pr-4 text-vault-muted text-xs">
                        {order.user?.name || "—"}
                      </td>
                      <td className="py-3 pr-4 text-vault-muted">
                        {order.items.reduce((s, i) => s + i.qty, 0)} item
                        {order.items.reduce((s, i) => s + i.qty, 0) !== 1
                          ? "s"
                          : ""}
                      </td>
                      <td className="py-3 pr-4 font-semibold text-vault-light whitespace-nowrap">
                        Rs {order.total}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`badge text-xs border ${STATUS_COLORS[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as any)
                          }
                          className="bg-vault-dark border border-vault-border text-vault-muted text-xs rounded-lg px-2 py-1.5 cursor-pointer focus:border-coffee-500 outline-none"
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-vault-light text-xl">
              Top Rated
            </h2>
            <Link
              href="/admin/products"
              className="text-xs text-coffee-400 hover:text-coffee-300 transition-colors"
            >
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {[...products]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 6)
              .map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-vault-dark rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                    ☕
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-vault-light truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-vault-muted">{p.category}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3 h-3 fill-coffee-400 text-coffee-400" />
                    <span className="text-xs font-semibold text-vault-light">
                      {p.rating}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Order status summary */}
          <div className="mt-6 pt-6 border-t border-vault-border">
            <h3 className="text-sm font-semibold text-vault-light mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-coffee-400" /> Order Status
            </h3>
            <div className="space-y-2">
              {ORDER_STATUSES.map((s) => {
                const count = orders.filter((o) => o.status === s).length;
                return (
                  <div
                    key={s}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className={`badge border ${STATUS_COLORS[s]} py-0.5`}>
                      {s}
                    </span>
                    <span className="text-vault-light font-semibold">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
