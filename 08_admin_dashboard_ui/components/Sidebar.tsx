"use client";
import { useState } from "react";
import { navItems } from "@/lib/data";
import styles from "./Sidebar.module.css";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>A</div>
        <div>
          <div className={styles.logoName}>AdminPro</div>
          <div className={styles.logoSub}>v2.0</div>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>Main Menu</p>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`${styles.navItem} ${active === item.label ? styles.navActive : ""}`}
            onClick={() => {
              setActive(item.label);
              onClose();
            }}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel2}>{item.label}</span>
            {active === item.label && <span className={styles.activeBar} />}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className={styles.userSection}>
        <div className={styles.avatar}>MA</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>M. Ahmed</div>
          <div className={styles.userRole}>Administrator</div>
        </div>
        <div className={styles.onlineDot} />
      </div>
    </aside>
  );
}
