import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 }).limit(100);
    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, amount, type, category, note, date } = body;
    if (!title?.trim() || !amount || !type || !category)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    if (amount <= 0)
      return NextResponse.json(
        { error: "Amount must be positive" },
        { status: 400 },
      );
    await connectDB();
    const tx = await Transaction.create({
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      category,
      note: note?.trim() ?? "",
      date: date ? new Date(date) : new Date(),
    });
    return NextResponse.json(tx, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
