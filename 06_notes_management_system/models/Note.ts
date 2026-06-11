import mongoose, { Schema, Document, models } from "mongoose";

export type NoteColor =
  | "default"
  | "green"
  | "amber"
  | "blue"
  | "purple"
  | "pink"
  | "red";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    content: { type: String, default: "", maxlength: 5000 },
    color: {
      type: String,
      enum: ["default", "green", "amber", "blue", "purple", "pink", "red"],
      default: "default",
    },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default models.Note || mongoose.model<INote>("Note", NoteSchema);
