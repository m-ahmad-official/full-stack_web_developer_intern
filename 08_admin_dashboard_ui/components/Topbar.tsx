"use client";
import styles from "./Topbar.module.css";

interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onMenuClick: () => void;
}

export default function Topbar({ theme, onToggleTheme, onMenuClick }: Props) {
  return (
    <header className={styles.topbar}>
      <button
        className={styles.menuBtn}
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={styles.searchBox}>
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search anything..."
          className={styles.searchInput}
        />
        <span className={styles.shortcut}>⌘K</span>
      </div>

      <div className={styles.actions}>
        {/* Theme toggle */}
        <button
          className={styles.iconBtn}
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Notifications */}
        <button className={styles.iconBtn} title="Notifications">
          <span>🔔</span>
          <span className={styles.badge}>3</span>
        </button>

        {/* Avatar */}
        <div className={styles.avatar}>MA</div>
      </div>
    </header>
  );
}
