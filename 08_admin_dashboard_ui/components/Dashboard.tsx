"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsCard from "./StatsCard";
import RevenueChart from "./charts/RevenueChart";
import DonutChart from "./charts/DonutChart";
import OrdersTable from "./OrdersTable";
import TopProducts from "./TopProducts";
import { statsCards } from "@/lib/data";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarOpen, setSidebar] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={styles.layout}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebar(false)} />
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebar(false)} />
      )}

      <div className={styles.mainWrap}>
        <Topbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenuClick={() => setSidebar(true)}
        />

        <main className={styles.main}>
          {/* Page title */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Dashboard</h1>
              <p className={styles.pageSub}>Welcome back, M. Ahmed 👋</p>
            </div>
            <div className={styles.dateRange}>
              <span>📅</span> Sep 1 — Sep 30, 2025
            </div>
          </div>

          {/* Stats grid */}
          <div className={styles.statsGrid}>
            {statsCards.map((card) => (
              <StatsCard key={card.title} {...card} />
            ))}
          </div>

          {/* Charts row */}
          <div className={styles.chartsRow}>
            <div className={styles.chartMain}>
              <RevenueChart />
            </div>
            <div className={styles.chartSide}>
              <DonutChart />
            </div>
          </div>

          {/* Bottom row */}
          <div className={styles.bottomRow}>
            <div className={styles.tableWrap}>
              <OrdersTable />
            </div>
            <div className={styles.productWrap}>
              <TopProducts />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
