"use client";
import { useState } from "react";
import { PROJECT_COLORS } from "@/lib/constants";
import styles from "./Modal.module.css";

interface Props {
  onSave: (data: { name: string; description: string; color: string }) => void;
  onClose: () => void;
}

export default function ProjectModal({ onSave, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    color: PROJECT_COLORS[0],
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setLoading(true);
    await onSave(form);
    setLoading(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        style={{ maxWidth: 440 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>New Project</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>Project Name *</label>
            <input
              className={styles.input}
              type="text"
              placeholder="My Awesome Project"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              placeholder="What is this project about?"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={2}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Color</label>
            <div className={styles.colorGrid}>
              {PROJECT_COLORS.map((c) => (
                <button
                  key={c}
                  className={`${styles.colorBtn} ${form.color === c ? styles.colorSelected : ""}`}
                  style={{ background: c }}
                  onClick={() => setForm((p) => ({ ...p, color: c }))}
                />
              ))}
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
            disabled={loading || !form.name.trim()}
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
