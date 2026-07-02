"use client";
import { useState, useEffect } from "react";
import { Task, User, Status, Priority } from "@/types";
import {
  STATUSES,
  PRIORITIES,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
} from "@/lib/constants";
import styles from "./Modal.module.css";

interface Props {
  task?: Task;
  defaultStatus?: Status;
  members: User[];
  me: User;
  onSave: (data: Partial<Task>) => void;
  onClose: () => void;
}

export default function TaskModal({
  task,
  defaultStatus,
  members,
  me,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? defaultStatus ?? "todo",
    priority: task?.priority ?? "medium",
    assignee: task?.assignee?._id ?? "",
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
    tags: task?.tags?.join(", ") ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    setError("");
    const payload: Partial<Task> = {
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status as Status,
      priority: form.priority as Priority,
      assignee: form.assignee ? ({ _id: form.assignee } as User) : undefined,
      dueDate: form.dueDate || undefined,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    await onSave(payload);
    setLoading(false);
  };

  const sc = STATUS_CONFIG[form.status as Status];
  const pc = PRIORITY_CONFIG[form.priority as Priority];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>Title *</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Task title..."
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              placeholder="Add details..."
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
            />
          </div>

          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.select}
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value as Status }))
                }
                style={{ color: sc.color }}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Priority</label>
              <select
                className={styles.select}
                value={form.priority}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    priority: e.target.value as Priority,
                  }))
                }
                style={{ color: pc.color }}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {PRIORITY_CONFIG[p].icon} {PRIORITY_CONFIG[p].label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Assignee</label>
              <select
                className={styles.select}
                value={form.assignee}
                onChange={(e) =>
                  setForm((p) => ({ ...p, assignee: e.target.value }))
                }
              >
                <option value="">Unassigned</option>
                {members.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Due Date</label>
              <input
                className={styles.input}
                type="date"
                value={form.dueDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, dueDate: e.target.value }))
                }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Tags (comma separated)</label>
              <input
                className={styles.input}
                type="text"
                placeholder="design, backend..."
                value={form.tags}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tags: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : task ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
