import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    if (password.length < 6)
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    await connectDB();
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists)
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    const hashed = await bcrypt.hash(password, 12);
    await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashed,
    });
    return NextResponse.json({ message: "Account created" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
