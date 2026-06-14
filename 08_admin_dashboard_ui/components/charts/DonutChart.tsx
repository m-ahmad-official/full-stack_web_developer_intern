"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { trafficData } from "@/lib/data";
import styles from "./Chart.module.css";

export default function DonutChart() {
  return (
    <div>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Traffic Sources</h3>
          <p className={styles.chartSub}>This month breakdown</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={trafficData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {trafficData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "var(--text)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        {trafficData.map((d) => (
          <div key={d.name} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: d.color }}
            />
            <span className={styles.legendLabel}>{d.name}</span>
            <span className={styles.legendValue}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
