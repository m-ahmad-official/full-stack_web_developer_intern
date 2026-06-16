import mongoose, { Schema, Document, models } from "mongoose";
export type PostStatus = "draft" | "published";
export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: mongoose.Types.ObjectId;
  status: PostStatus;
  views: number;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}
const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "", maxlength: 300 },
    coverImage: { type: String, default: "" },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    views: { type: Number, default: 0 },
    readTime: { type: Number, default: 1 },
  },
  { timestamps: true },
);
export default models.Post || mongoose.model<IPost>("Post", PostSchema);
