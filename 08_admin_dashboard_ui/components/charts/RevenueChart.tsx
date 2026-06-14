"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { revenueData } from "@/lib/data";
import styles from "./Chart.module.css";

export default function RevenueChart() {
  return (
    <div>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Revenue Overview</h3>
          <p className={styles.chartSub}>Monthly revenue and orders</p>
        </div>
        <div className={styles.chartBadge}>This Year</div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={revenueData}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted)" }}
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
            cursor={{ stroke: "var(--border2)" }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "1rem" }} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6c63ff"
            strokeWidth={2}
            fill="url(#colorRevenue)"
            name="Revenue ($)"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorOrders)"
            name="Orders"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
