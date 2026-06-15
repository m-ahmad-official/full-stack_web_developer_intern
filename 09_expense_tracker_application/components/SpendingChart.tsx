"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Transaction } from "./ExpenseApp";
import styles from "./SpendingChart.module.css";

interface Props {
  transactions: Transaction[];
}

export default function SpendingChart({ transactions }: Props) {
  // Group by category for expenses
  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      const cat = t.category.replace("_expense", "").replace("_", " ");
      acc[cat] = (acc[cat] ?? 0) + t.amount;
      return acc;
    }, {});

  const chartData = Object.entries(expenseByCategory)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  const COLORS = [
    "#ff4d6d",
    "#ff7b9c",
    "#ffaab8",
    "#00d97e",
    "#6ee7f7",
    "#a78bfa",
  ];

  if (chartData.length === 0)
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📊</div>
        <p>Add expense transactions to see spending breakdown</p>
      </div>
    );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Spending Breakdown</h3>
          <p className={styles.sub}>Top expense categories</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 0, left: -25, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "var(--text)",
            }}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            formatter={(value) => [
              `$${Number(value ?? 0).toFixed(2)}`,
              "Amount",
            ]}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
