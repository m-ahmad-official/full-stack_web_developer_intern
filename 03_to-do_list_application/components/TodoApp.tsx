"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./TodoApp.module.css";

type Priority = "low" | "medium" | "high";
type Filter = "all" | "active" | "completed";

interface Todo {
  id: string;
  text: string;
  desc: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bg: string }
> = {
  low: { label: "Low", color: "#10b981", bg: "#ecfdf5" },
  medium: { label: "Medium", color: "#f59e0b", bg: "#fffbeb" },
  high: { label: "High", color: "#ef4444", bg: "#fef2f2" },
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [mounted, setMounted] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("taskly-todos");
    if (saved) setTodos(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("taskly-todos", JSON.stringify(todos));
  }, [todos, mounted]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      desc: desc.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
    setDesc("");
    inputRef.current?.focus();
  };

  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const saveEdit = (id: string) => {
    const text = editText.trim();
    if (!text) return;
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text, desc: editDesc.trim() } : t,
      ),
    );
    setEditId(null);
  };

  const clearCompleted = () =>
    setTodos((prev) => prev.filter((t) => !t.completed));

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0;

  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      {/* ── Header ── */}
      <div className={styles.topBar}>
        <span className={styles.builtBy}>Built by M. Ahmed</span>
      </div>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.appName}>Taskly</h1>
            <p className={styles.appSub}>Stay organised, stay productive.</p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statPill}>
              <span
                className={styles.statDot}
                style={{ background: "var(--accent)" }}
              />
              {activeCount} remaining
            </div>
            <div className={styles.statPill}>
              <span
                className={styles.statDot}
                style={{ background: "var(--green)" }}
              />
              {completedCount} done
            </div>
          </div>
        </div>
        {todos.length > 0 && (
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressLabel}>{progress}% complete</span>
          </div>
        )}
      </div>

      {/* ── Add Task ── */}
      <div className={styles.addCard}>
        <div className={styles.addRow}>
          <input
            ref={inputRef}
            className={styles.addInput}
            type="text"
            placeholder="Task title..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button className={styles.addBtn} onClick={addTodo}>
            <span className={styles.addBtnIcon}>+</span>
            Add Task
          </button>
        </div>
        <input
          className={styles.descInput}
          type="text"
          placeholder="Description (optional)..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <div className={styles.priorityRow}>
          <span className={styles.priorityLabel}>Priority:</span>
          {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((p) => (
            <button
              key={p}
              className={`${styles.priorityBtn} ${priority === p ? styles.priorityActive : ""}`}
              style={
                priority === p
                  ? {
                      background: PRIORITY_CONFIG[p].bg,
                      color: PRIORITY_CONFIG[p].color,
                      borderColor: PRIORITY_CONFIG[p].color,
                    }
                  : {}
              }
              onClick={() => setPriority(p)}
            >
              {PRIORITY_CONFIG[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterTabs}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterTab} ${filter === f.value ? styles.filterActive : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
              <span className={styles.filterCount}>
                {f.value === "all"
                  ? todos.length
                  : f.value === "active"
                    ? activeCount
                    : completedCount}
              </span>
            </button>
          ))}
        </div>
        {completedCount > 0 && (
          <button className={styles.clearBtn} onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>

      {/* ── List ── */}
      <div className={styles.list}>
        {filteredTodos.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              {filter === "completed" ? "🏆" : "✨"}
            </div>
            <p className={styles.emptyText}>
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                  ? "No active tasks — all done!"
                  : "Add your first task above"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => {
            const pc = PRIORITY_CONFIG[todo.priority];
            const isEditing = editId === todo.id;
            return (
              <div
                key={todo.id}
                className={`${styles.todoItem} ${todo.completed ? styles.todoCompleted : ""}`}
              >
                {/* Checkbox */}
                <button
                  className={`${styles.checkbox} ${todo.completed ? styles.checkboxDone : ""}`}
                  onClick={() => toggleTodo(todo.id)}
                  aria-label="Toggle complete"
                >
                  {todo.completed && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </button>

                {/* Content */}
                <div className={styles.todoContent}>
                  {isEditing ? (
                    <>
                      <input
                        className={styles.editInput}
                        value={editText}
                        autoFocus
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(todo.id);
                          if (e.key === "Escape") setEditId(null);
                        }}
                        onBlur={() => saveEdit(todo.id)}
                        placeholder="Task title..."
                      />
                      <input
                        className={styles.editDescInput}
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        placeholder="Description (optional)..."
                      />
                    </>
                  ) : (
                    <>
                      <div className={styles.todoHeader}>
                        <span className={styles.todoText}>{todo.text}</span>
                        <span
                          className={styles.priorityTag}
                          style={{ background: pc.bg, color: pc.color }}
                        >
                          {pc.label}
                        </span>
                      </div>
                      {todo.desc && (
                        <p className={styles.todoDesc}>{todo.desc}</p>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  {!todo.completed && (
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        setEditId(todo.id);
                        setEditText(todo.text);
                        setEditDesc(todo.desc);
                      }}
                      title="Edit"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete"
                  >
                    ❌
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {todos.length > 0 && (
        <p className={styles.footer}>
          Tasks are saved automatically to your browser.
        </p>
      )}
    </div>
  );
}
