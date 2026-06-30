// app/components/Providers.tsx
"use client";
import { useEffect } from "react";
import { useStore } from "../lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const { fetchProducts, fetchOrders, token } = useStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return <>{children}</>;
}
