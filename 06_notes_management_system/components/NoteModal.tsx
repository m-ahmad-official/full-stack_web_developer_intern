"use client";
import { useState, useEffect } from "react";
import { Note, NoteColor } from "./Dashboard";
import styles from "./NoteModal.module.css";

const COLORS: { value: NoteColor; bg: string; border: string }[] = [
  { value: "default", bg: "#ffffff", border: "#e5dfd7" },
  { value: "green", bg: "#f0fdf4", border: "#16a34a" },
  { value: "amber", bg: "#fffbeb", border: "#d97706" },
  { value: "blue", bg: "#eff6ff", border: "#2563eb" },
  { value: "purple", bg: "#f5f3ff", border: "#7c3aed" },
  { value: "pink", bg: "#fdf2f8", border: "#db2777" },
  { value: "red", bg: "#fef2f2", border: "#dc2626" },
];

interface Props {
  note: Note | null;
  onSave: (data: { title: string; content: string; color: NoteColor }) => void;
  onClose: () => void;
}

export default function NoteModal({ note, onSave, onClose }: Props) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [color, setColor] = useState<NoteColor>(note?.color ?? "default");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), content: content.trim(), color });
  };

  const selectedColor = COLORS.find((c) => c.value === color)!;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        style={{
          background: selectedColor.bg,
          borderColor: selectedColor.border,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {note ? "Edit Note" : "New Note"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <input
          className={styles.titleInput}
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          maxLength={100}
        />

        <textarea
          className={styles.contentInput}
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={5000}
          rows={8}
        />

        <div className={styles.modalFooter}>
          <div className={styles.colorPicker}>
            {COLORS.map((c) => (
              <button
                key={c.value}
                className={`${styles.colorSwatch} ${color === c.value ? styles.colorSwatchActive : ""}`}
                style={{ background: c.bg, borderColor: c.border }}
                onClick={() => setColor(c.value)}
                title={c.value}
              />
            ))}
          </div>
          <div className={styles.modalActions}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={!title.trim()}
            >
              {note ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
