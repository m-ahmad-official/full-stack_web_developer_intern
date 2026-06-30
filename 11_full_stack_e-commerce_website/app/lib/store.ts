// app/lib/store.ts
"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "./types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  user?: { name: string; email: string };
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: "Pending" | "Confirmed" | "Preparing" | "Dispatched" | "Delivered";
  paymentMethod: string;
  address: string;
  createdAt: string;
}

interface AppState {
  // Auth
  user: AuthUser | null;
  token: string | null;
  authLoading: boolean;
  authError: string | null;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Products — fetched from MongoDB
  products: Product[];
  productsLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (
    p: Omit<Product, "id" | "rating" | "reviews">,
  ) => Promise<boolean>;
  updateProduct: (p: Product) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;

  // Cart — stays in localStorage
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Orders — fetched from MongoDB
  orders: Order[];
  ordersLoading: boolean;
  fetchOrders: () => Promise<void>;
  placeOrder: (paymentMethod: string, address: string) => Promise<Order | null>;
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<boolean>;

  // Notification
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── AUTH ──────────────────────────────────────────
      user: null,
      token: null,
      authLoading: false,
      authError: null,

      signup: async (name, email, password) => {
        set({ authLoading: true, authError: null });
        try {
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ authError: data.error, authLoading: false });
            return false;
          }
          set({
            user: data.user,
            token: data.token,
            notification: data.message,
            authLoading: false,
            authError: null,
          });
          return true;
        } catch {
          set({
            authError: "Network error. Could not connect to server.",
            authLoading: false,
          });
          return false;
        }
      },

      login: async (email, password) => {
        set({ authLoading: true, authError: null });
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ authError: data.error, authLoading: false });
            return false;
          }
          set({
            user: data.user,
            token: data.token,
            notification: data.message,
            authLoading: false,
            authError: null,
          });
          // Fetch orders after login
          setTimeout(() => get().fetchOrders(), 100);
          return true;
        } catch {
          set({
            authError: "Network error. Could not connect to server.",
            authLoading: false,
          });
          return false;
        }
      },

      logout: () =>
        set({
          user: null,
          token: null,
          orders: [],
          notification: "Logged out successfully.",
        }),

      // ── PRODUCTS ──────────────────────────────────────
      products: [],
      productsLoading: false,

      fetchProducts: async () => {
        set({ productsLoading: true });
        try {
          const res = await fetch("/api/products");
          const data = await res.json();
          if (res.ok) set({ products: data.products, productsLoading: false });
          else set({ productsLoading: false });
        } catch {
          set({ productsLoading: false });
        }
      },

      addProduct: async (p) => {
        const { token } = get();
        try {
          const slug =
            p.slug ||
            p.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
          const res = await fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...p, slug, rating: 4.5, reviews: 0 }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ notification: data.error });
            return false;
          }
          set((s) => ({
            products: [data.product, ...s.products],
            notification: "Product added successfully!",
          }));
          return true;
        } catch {
          set({ notification: "Failed to add product." });
          return false;
        }
      },

      updateProduct: async (p) => {
        const { token } = get();
        try {
          const res = await fetch(`/api/products/${p.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(p),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ notification: data.error });
            return false;
          }
          set((s) => ({
            products: s.products.map((x) => (x.id === p.id ? data.product : x)),
            notification: "Product updated successfully!",
          }));
          return true;
        } catch {
          set({ notification: "Failed to update product." });
          return false;
        }
      },

      deleteProduct: async (id) => {
        const { token } = get();
        try {
          const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (!res.ok) {
            set({ notification: data.error });
            return false;
          }
          set((s) => ({
            products: s.products.filter((x) => x.id !== id),
            notification: "Product deleted.",
          }));
          return true;
        } catch {
          set({ notification: "Failed to delete product." });
          return false;
        }
      },

      // ── CART ──────────────────────────────────────────
      cart: [],

      addToCart: (product, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((i) => i.id === product.id);
          const cart = existing
            ? s.cart.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + qty } : i,
              )
            : [...s.cart, { ...product, qty }];
          return { cart, notification: `${product.name} added to cart!` };
        }),

      removeFromCart: (id) =>
        set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((s) => ({
          cart:
            qty < 1
              ? s.cart.filter((i) => i.id !== id)
              : s.cart.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      clearCart: () => set({ cart: [] }),
      cartTotal: () => get().cart.reduce((s, i) => s + i.price * i.qty, 0),
      cartCount: () => get().cart.reduce((s, i) => s + i.qty, 0),

      // ── ORDERS ────────────────────────────────────────
      orders: [],
      ordersLoading: false,

      fetchOrders: async () => {
        const { token } = get();
        if (!token) return;
        set({ ordersLoading: true });
        try {
          const res = await fetch("/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) set({ orders: data.orders, ordersLoading: false });
          else set({ ordersLoading: false });
        } catch {
          set({ ordersLoading: false });
        }
      },

      placeOrder: async (paymentMethod, address) => {
        const { cart, cartTotal, token, user } = get();
        if (!user || !token || cart.length === 0) return null;

        const subtotal = cartTotal();
        const delivery = subtotal >= 1000 ? 0 : 80;
        const total = subtotal + delivery;

        try {
          const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              items: cart,
              subtotal,
              delivery,
              total,
              paymentMethod,
              address,
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ notification: data.error });
            return null;
          }

          set((s) => ({
            orders: [data.order, ...s.orders],
            cart: [],
            notification: "Order placed successfully! ☕",
          }));
          return data.order;
        } catch {
          set({ notification: "Failed to place order. Please try again." });
          return null;
        }
      },

      updateOrderStatus: async (id, status) => {
        const { token } = get();
        try {
          const res = await fetch(`/api/orders/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ notification: data.error });
            return false;
          }
          set((s) => ({
            orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
            notification: "Order status updated.",
          }));
          return true;
        } catch {
          set({ notification: "Failed to update order status." });
          return false;
        }
      },

      // ── NOTIFICATION ──────────────────────────────────
      notification: null,
      setNotification: (msg) => set({ notification: msg }),
    }),
    {
      name: "coffee-vault-store",
      partialize: (s) => ({
        user: s.user,
        token: s.token,
        cart: s.cart,
      }),
    },
  ),
);
