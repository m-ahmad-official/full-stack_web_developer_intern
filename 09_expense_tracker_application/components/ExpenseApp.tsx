"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./ExpenseApp.module.css";
import AddTransaction from "./AddTransaction";
import BalanceCard from "./BalanceCard";
import TransactionList from "./TransactionList";
import SpendingChart from "./SpendingChart";

export type TxType = "income" | "expense";

export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: TxType;
  category: string;
  note: string;
  date: string;
  createdAt: string;
}

export default function ExpenseApp() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [showForm, setShowForm] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleAdd = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const filtered = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter,
  );

  return (
    <div className={styles.page}>
      {/* Bg blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.appName}>Spendly</h1>
            <p className={styles.appSub}>Track smarter, spend wiser.</p>
          </div>
          <button className={styles.addBtn} onClick={() => setShowForm(true)}>
            <span>+</span> Add Transaction
          </button>
        </header>

        {/* Balance cards */}
        <BalanceCard
          balance={balance}
          income={totalIncome}
          expense={totalExpense}
        />

        {/* Chart + form row */}
        <div className={styles.midRow}>
          <SpendingChart transactions={transactions} />
          {showForm && (
            <AddTransaction
              onAdd={handleAdd}
              onClose={() => setShowForm(false)}
            />
          )}
          {!showForm && (
            <div className={styles.quickAdd}>
              <p className={styles.quickTitle}>Quick Actions</p>
              <button
                className={`${styles.quickBtn} ${styles.quickIncome}`}
                onClick={() => setShowForm(true)}
              >
                <span>↑</span> Add Income
              </button>
              <button
                className={`${styles.quickBtn} ${styles.quickExpense}`}
                onClick={() => setShowForm(true)}
              >
                <span>↓</span> Add Expense
              </button>
              <div className={styles.tip}>
                <span>💡</span>
                <p>
                  You have{" "}
                  {transactions.filter((t) => t.type === "expense").length}{" "}
                  expenses this period
                </p>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        <div className={styles.historySection}>
          <div className={styles.historyHeader}>
            <div>
              <h2 className={styles.historyTitle}>Transaction History</h2>
              <p className={styles.historySub}>
                {filtered.length} transactions
              </p>
            </div>
            <div className={styles.filterTabs}>
              {(["all", "income", "expense"] as const).map((f) => (
                <button
                  key={f}
                  className={`${styles.filterTab} ${filter === f ? styles.filterActive : ""} ${filter === f && f === "income" ? styles.filterIncome : ""} ${filter === f && f === "expense" ? styles.filterExpense : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <TransactionList
            transactions={filtered}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
