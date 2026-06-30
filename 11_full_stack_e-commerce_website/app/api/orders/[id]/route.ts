// app/api/orders/[id]/route.ts
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

// PATCH /api/orders/[id] — update order status (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = getUser(req);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const { status } = await req.json();

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Dispatched",
      "Delivered",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 },
      );
    }

    const updated = (await Order.findByIdAndUpdate(
      params.id,
      { $set: { status } },
      { new: true },
    ).lean()) as any;

    if (!updated)
      return NextResponse.json({ error: "Order not found." }, { status: 404 });

    return NextResponse.json({
      message: "Order status updated.",
      order: { ...updated, id: updated._id.toString(), _id: undefined },
    });
  } catch (err) {
    console.error("PATCH /api/orders/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update order." },
      { status: 500 },
    );
  }
}

// DELETE /api/orders/[id] — delete order (admin only)
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
    const deleted = await Order.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json({ error: "Order not found." }, { status: 404 });

    return NextResponse.json({ message: "Order deleted successfully." });
  } catch (err) {
    console.error("DELETE /api/orders/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete order." },
      { status: 500 },
    );
  }
}
