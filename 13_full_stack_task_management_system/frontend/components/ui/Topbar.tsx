"use client";
import { User, Project } from "@/types";
import { PRIORITIES } from "@/lib/constants";
import styles from "./Topbar.module.css";

interface Props {
  me: User;
  activeProject: Project | null;
  view: "board" | "list";
  onViewChange: (v: "board" | "list") => void;
  members: User[];
  filterPriority: string;
  onFilterPriority: (v: string) => void;
  filterAssignee: string;
  onFilterAssignee: (v: string) => void;
  searchQuery: string;
  onSearch: (v: string) => void;
  onMenuClick: () => void;
  onNewTask: () => void;
}

export default function Topbar({
  me,
  activeProject,
  view,
  onViewChange,
  members,
  filterPriority,
  onFilterPriority,
  filterAssignee,
  onFilterAssignee,
  searchQuery,
  onSearch,
  onMenuClick,
  onNewTask,
}: Props) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          ☰
        </button>
        <div className={styles.projectInfo}>
          {activeProject && (
            <span
              className={styles.projectDot}
              style={{ background: activeProject.color }}
            />
          )}
          <h1 className={styles.projectName}>
            {activeProject?.name ?? "FlowBoard"}
          </h1>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.right}>
        {/* Filters */}
        <select
          className={styles.filter}
          value={filterPriority}
          onChange={(e) => onFilterPriority(e.target.value)}
        >
          <option value="all">All priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          className={styles.filter}
          value={filterAssignee}
          onChange={(e) => onFilterAssignee(e.target.value)}
        >
          <option value="all">All members</option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* View toggle */}
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === "board" ? styles.viewActive : ""}`}
            onClick={() => onViewChange("board")}
            title="Board view"
          >
            ⊞
          </button>
          <button
            className={`${styles.viewBtn} ${view === "list" ? styles.viewActive : ""}`}
            onClick={() => onViewChange("list")}
            title="List view"
          >
            ☰
          </button>
        </div>

        <button className={styles.newTaskBtn} onClick={onNewTask}>
          + New Task
        </button>

        <div className={styles.avatar} title={me.name}>
          {me.name[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
}
