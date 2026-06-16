import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { slugify, calcReadTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") ?? "published";
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const mine = searchParams.get("mine");
    const session = await getServerSession(authOptions);
    const query: any = {};
    if (mine && session) query.author = (session.user as any).id;
    else query.status = "published";
    if (category) query.category = category;
    if (search)
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    const posts = await Post.find(query)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .limit(50);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { title, content, excerpt, coverImage, category, tags, status } =
      await req.json();
    if (!title?.trim() || !content?.trim())
      return NextResponse.json(
        { error: "Title and content required" },
        { status: 400 },
      );
    await connectDB();
    let slug = slugify(title);
    const exists = await Post.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now()}`;
    const post = await Post.create({
      title: title.trim(),
      slug,
      content,
      excerpt: excerpt?.trim() ?? "",
      coverImage: coverImage ?? "",
      category: category ?? "General",
      tags: tags ?? [],
      author: (session.user as any).id,
      status: status ?? "draft",
      readTime: calcReadTime(content),
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
