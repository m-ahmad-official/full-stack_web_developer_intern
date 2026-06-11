import { Note } from "./Dashboard";
import styles from "./NoteCard.module.css";

const COLOR_MAP: Record<string, { bg: string; border: string }> = {
  default: { bg: "#ffffff", border: "#e5dfd7" },
  green: { bg: "#f0fdf4", border: "#bbf7d0" },
  amber: { bg: "#fffbeb", border: "#fde68a" },
  blue: { bg: "#eff6ff", border: "#bfdbfe" },
  purple: { bg: "#f5f3ff", border: "#ddd6fe" },
  pink: { bg: "#fdf2f8", border: "#fbcfe8" },
  red: { bg: "#fef2f2", border: "#fecaca" },
};

interface Props {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
}

export default function NoteCard({ note, onEdit, onDelete, onPin }: Props) {
  const colors = COLOR_MAP[note.color] ?? COLOR_MAP.default;
  const date = new Date(note.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={styles.card}
      style={{ background: colors.bg, borderColor: colors.border }}
      onClick={onEdit}
    >
      <div className={styles.cardTop}>
        <h3 className={styles.title}>{note.title}</h3>
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          <button
            className={`${styles.actionBtn} ${note.pinned ? styles.pinned : ""}`}
            onClick={onPin}
            title={note.pinned ? "Unpin" : "Pin"}
          >
            📌
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={onDelete}
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
      {note.content && <p className={styles.content}>{note.content}</p>}
      <div className={styles.footer}>
        <span className={styles.date}>{date}</span>
        {note.pinned && <span className={styles.pinnedBadge}>Pinned</span>}
      </div>
    </div>
  );
}
