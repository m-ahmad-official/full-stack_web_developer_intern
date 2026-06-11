import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const notes = await Note.find({ userId: (session.user as any).id }).sort({
      pinned: -1,
      updatedAt: -1,
    });
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { title, content, color } = await req.json();
    if (!title?.trim())
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    await connectDB();
    const note = await Note.create({
      userId: (session.user as any).id,
      title: title.trim(),
      content: content?.trim() ?? "",
      color: color ?? "default",
    });
    return NextResponse.json(note, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
