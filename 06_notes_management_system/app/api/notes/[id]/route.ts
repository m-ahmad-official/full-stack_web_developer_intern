import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    await connectDB();
    const note = await Note.findOneAndUpdate(
      { _id: params.id, userId: (session.user as any).id },
      { ...body },
      { new: true },
    );
    if (!note)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(note);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    await Note.findOneAndDelete({
      _id: params.id,
      userId: (session.user as any).id,
    });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
