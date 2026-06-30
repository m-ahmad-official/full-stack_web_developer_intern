// app/lib/types.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  image: string;       // URL or local path under /images/products/
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
  tags: string[];
}

export interface CartItem extends Product {
  qty: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: "Pending" | "Confirmed" | "Preparing" | "Dispatched" | "Delivered";
  paymentMethod: string;
  createdAt: string;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;   // hashed in real app; plain for demo
  role: "user" | "admin";
  avatar?: string;
}
