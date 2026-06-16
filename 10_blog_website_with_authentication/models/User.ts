import mongoose, { Schema, Document, models } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  createdAt: Date;
}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 200 },
  },
  { timestamps: true },
);
export default models.User || mongoose.model<IUser>("User", UserSchema);
