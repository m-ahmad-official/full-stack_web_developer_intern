import mongoose, { Schema, Document, models } from "mongoose";

export type TxType = "income" | "expense";
export type TxCategory =
  | "salary"
  | "freelance"
  | "investment"
  | "gift"
  | "other_income"
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "health"
  | "entertainment"
  | "education"
  | "other_expense";

export interface ITransaction extends Document {
  title: string;
  amount: number;
  type: TxType;
  category: TxCategory;
  note: string;
  date: Date;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    title: { type: String, required: true, trim: true, maxlength: 80 },
    amount: { type: Number, required: true, min: 0.01 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    note: { type: String, default: "", maxlength: 200 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
