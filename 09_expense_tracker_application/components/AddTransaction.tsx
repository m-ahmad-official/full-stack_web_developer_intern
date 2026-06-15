"use client";
import { useState } from "react";
import { Transaction, TxType } from "./ExpenseApp";
import styles from "./AddTransaction.module.css";

const CATEGORIES = {
  income: [
    { value: "salary", label: "💼 Salary" },
    { value: "freelance", label: "💻 Freelance" },
    { value: "investment", label: "📈 Investment" },
    { value: "gift", label: "🎁 Gift" },
    { value: "other_income", label: "💰 Other" },
  ],
  expense: [
    { value: "food", label: "🍔 Food" },
    { value: "transport", label: "🚗 Transport" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "bills", label: "📄 Bills" },
    { value: "health", label: "❤️ Health" },
    { value: "entertainment", label: "🎮 Entertainment" },
    { value: "education", label: "📚 Education" },
    { value: "other_expense", label: "💸 Other" },
  ],
};

interface Props {
  onAdd: (tx: Transaction) => void;
  onClose: () => void;
}

export default function AddTransaction({ onAdd, onClose }: Props) {
  const [type, setType] = useState<TxType>("expense");
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type,
          amount: parseFloat(form.amount),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      onAdd(data);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cats = CATEGORIES[type];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>New Transaction</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Type toggle */}
      <div className={styles.typeToggle}>
        <button
          className={`${styles.typeBtn} ${type === "income" ? styles.typeIncome : ""}`}
          onClick={() => {
            setType("income");
            setForm((p) => ({ ...p, category: "" }));
          }}
        >
          ↑ Income
        </button>
        <button
          className={`${styles.typeBtn} ${type === "expense" ? styles.typeExpense : ""}`}
          onClick={() => {
            setType("expense");
            setForm((p) => ({ ...p, category: "" }));
          }}
        >
          ↓ Expense
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Title *</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. Monthly Salary"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Amount (USD) *</label>
          <div className={styles.amountWrap}>
            <span className={styles.currency}>$</span>
            <input
              className={`${styles.input} ${styles.amountInput}`}
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm((p) => ({ ...p, amount: e.target.value }))
              }
              required
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Category *</label>
          <select
            className={styles.select}
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value }))
            }
            required
          >
            <option value="">Select category...</option>
            {cats.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Date</label>
          <input
            className={styles.input}
            type="date"
            value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Note (optional)</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Add a note..."
            value={form.note}
            onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
          />
        </div>
        <button
          className={`${styles.submitBtn} ${type === "income" ? styles.submitIncome : styles.submitExpense}`}
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </button>
      </form>
    </div>
  );
}
