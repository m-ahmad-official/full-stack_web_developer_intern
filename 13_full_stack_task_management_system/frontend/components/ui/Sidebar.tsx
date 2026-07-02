"use client";
import { User, Project } from "@/types";
import styles from "./Sidebar.module.css";

interface Props {
  me: User;
  projects: Project[];
  activeProject: Project | null;
  open: boolean;
  onSelectProject: (p: Project) => void;
  onNewProject: () => void;
  onLogout: () => void;
}

export default function Sidebar({
  me,
  projects,
  activeProject,
  open,
  onSelectProject,
  onNewProject,
  onLogout,
}: Props) {
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>⚡</div>
        <div className={styles.brandName}>FlowBoard</div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Projects</span>
          <button
            className={styles.addBtn}
            onClick={onNewProject}
            title="New project"
          >
            +
          </button>
        </div>
        <div className={styles.projectList}>
          {projects.length === 0 && (
            <div className={styles.noProjects}>No projects yet</div>
          )}
          {projects.map((p) => (
            <button
              key={p._id}
              className={`${styles.projectItem} ${activeProject?._id === p._id ? styles.projectActive : ""}`}
              onClick={() => onSelectProject(p)}
            >
              <span
                className={styles.projectDot}
                style={{ background: p.color }}
              />
              <span className={styles.projectName}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.navSection}>
        <div className={styles.sectionLabel}>Navigation</div>
        {[
          { icon: "🗂", label: "Board" },
          { icon: "📊", label: "Analytics" },
          { icon: "👥", label: "Team" },
        ].map((n) => (
          <button key={n.label} className={styles.navItem}>
            <span>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>

      <div className={styles.userSection}>
        <div className={styles.userRow}>
          <div className={styles.avatar}>{me.name[0].toUpperCase()}</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{me.name}</div>
            <div
              className={`${styles.userRole} ${me.role === "admin" ? styles.adminRole : ""}`}
            >
              {me.role === "admin" ? "👑 Admin" : "👤 Member"}
            </div>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
