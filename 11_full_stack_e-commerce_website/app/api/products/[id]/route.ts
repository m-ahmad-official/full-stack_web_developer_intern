// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/lib/models/Product";
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

// GET /api/products/[id] — single product by id or slug (public)
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const product = (await Product.findById(params.id).lean()) as any;
    if (!product)
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );
    return NextResponse.json({
      product: { ...product, id: product._id.toString() },
    });
  } catch (err) {
    console.error("GET /api/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch product." },
      { status: 500 },
    );
  }
}

// PUT /api/products/[id] — update product (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = getUser(req);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();

    const updated = (await Product.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true },
    ).lean()) as any;

    if (!updated)
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Product updated successfully!",
      product: { ...updated, id: updated._id.toString() },
    });
  } catch (err) {
    console.error("PUT /api/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 },
    );
  }
}

// DELETE /api/products/[id] — delete product (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = getUser(req);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const deleted = await Product.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );

    return NextResponse.json({ message: "Product deleted successfully." });
  } catch (err) {
    console.error("DELETE /api/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 },
    );
  }
}
