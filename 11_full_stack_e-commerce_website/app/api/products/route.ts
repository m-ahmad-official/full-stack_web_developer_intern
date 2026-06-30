// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/lib/models/Product";
import { PRODUCTS } from "@/app/lib/data";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "coffee-vault-fallback-secret-key-2024";

function getUser(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as { id: string; role: string };
  } catch {
    return null;
  }
}

// GET /api/products — fetch all products (public)
export async function GET() {
  try {
    await connectDB();

    let products = await Product.find().sort({ createdAt: -1 }).lean();

    // Seed DB with default products if empty
    if (products.length === 0) {
      const seeded = await Product.insertMany(
        PRODUCTS.map((p) => ({
          name: p.name,
          slug: p.slug,
          price: p.price,
          category: p.category,
          description: p.description,
          image: p.image,
          stock: p.stock,
          rating: p.rating,
          reviews: p.reviews,
          featured: p.featured,
          tags: p.tags,
        })),
      );
      products = seeded.map((p) => p.toObject());
    }

    // Normalize _id → id
    const normalized = products.map((p: any) => ({
      ...p,
      id: p._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json({ products: normalized });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 },
    );
  }
}

// POST /api/products — add product (admin only)
export async function POST(req: NextRequest) {
  const user = getUser(req);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const product = await Product.create({ ...body, slug });

    return NextResponse.json(
      {
        message: "Product added successfully!",
        product: { ...product.toObject(), id: product._id.toString() },
      },
      { status: 201 },
    );
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 409 },
      );
    }
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to add product." },
      { status: 500 },
    );
  }
}
