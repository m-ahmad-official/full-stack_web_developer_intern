// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Order from "@/app/lib/models/Order";
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

// GET /api/orders — admin gets all orders, user gets their own orders
export async function GET(req: NextRequest) {
  const user = getUser(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    await connectDB();

    const query = user.role === "admin" ? {} : { userId: user.id };
    const orders = await Order.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const normalized = orders.map((o: any) => ({
      ...o,
      id: o._id.toString(),
      userId: o.userId?._id?.toString() || o.userId?.toString(),
      user: o.userId?.name
        ? { name: o.userId.name, email: o.userId.email }
        : undefined,
      _id: undefined,
    }));

    return NextResponse.json({ orders: normalized });
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders." },
      { status: 500 },
    );
  }
}

// POST /api/orders — place a new order (logged in users only)
export async function POST(req: NextRequest) {
  const user = getUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Please sign in to place an order." },
      { status: 401 },
    );

  try {
    await connectDB();
    const { items, subtotal, delivery, total, paymentMethod, address } =
      await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }
    if (!address?.trim()) {
      return NextResponse.json(
        { error: "Delivery address is required." },
        { status: 400 },
      );
    }

    const orderId = `CV-${Date.now().toString().slice(-6)}`;

    const order = await Order.create({
      orderId,
      userId: user.id,
      items: items.map((i: any) => ({
        productId: i.id,
        name: i.name,
        image: i.image,
        price: i.price,
        qty: i.qty,
      })),
      subtotal,
      delivery,
      total,
      paymentMethod,
      address,
      status: "Confirmed",
    });

    return NextResponse.json(
      {
        message: "Order placed successfully!",
        order: {
          ...order.toObject(),
          id: order._id.toString(),
          _id: undefined,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json(
      { error: "Failed to place order." },
      { status: 500 },
    );
  }
}
