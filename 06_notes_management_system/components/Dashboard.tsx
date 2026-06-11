"use client";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import styles from "./Dashboard.module.css";
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";

export type NoteColor =
  | "default"
  | "green"
  | "amber"
  | "blue"
  | "purple"
  | "pink"
  | "red";

export interface Note {
  _id: string;
  title: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  user: any;
}

export default function Dashboard({ user }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<NoteColor | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);

  const fetchNotes = useCallback(async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSave = async (payload: {
    title: string;
    content: string;
    color: NoteColor;
  }) => {
    if (editNote) {
      const res = await fetch(`/api/notes/${editNote._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setNotes((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n)),
      );
    } else {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const created = await res.json();
      setNotes((prev) => [created, ...prev]);
    }
    setModalOpen(false);
    setEditNote(null);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const handlePin = async (note: Note) => {
    const res = await fetch(`/api/notes/${note._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinned: !note.pinned }),
    });
    const updated = await res.json();
    setNotes((prev) =>
      prev
        .map((n) => (n._id === updated._id ? updated : n))
        .sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    );
  };

  const filtered = notes.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchColor = filter === "all" || n.color === filter;
    return matchSearch && matchColor;
  });

  const pinned = filtered.filter((n) => n.pinned);
  const unpinned = filtered.filter((n) => !n.pinned);

  const COLOR_FILTERS: {
    value: NoteColor | "all";
    label: string;
    dot: string;
  }[] = [
    { value: "all", label: "All", dot: "#a8a29e" },
    { value: "default", label: "White", dot: "#e5dfd7" },
    { value: "green", label: "Green", dot: "#16a34a" },
    { value: "amber", label: "Amber", dot: "#d97706" },
    { value: "blue", label: "Blue", dot: "#2563eb" },
    { value: "purple", label: "Purple", dot: "#7c3aed" },
    { value: "pink", label: "Pink", dot: "#db2777" },
    { value: "red", label: "Red", dot: "#dc2626" },
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>📒</span>
            <span className={styles.brandName}>Noteify</span>
          </div>
          <button
            className={styles.newBtn}
            onClick={() => {
              setEditNote(null);
              setModalOpen(true);
            }}
          >
            <span>+</span> New Note
          </button>
        </div>

        <div className={styles.sidebarSection}>
          <p className={styles.sidebarLabel}>Filter by color</p>
          <div className={styles.colorFilters}>
            {COLOR_FILTERS.map((cf) => (
              <button
                key={cf.value}
                className={`${styles.colorFilter} ${filter === cf.value ? styles.colorFilterActive : ""}`}
                onClick={() => setFilter(cf.value)}
              >
                <span
                  className={styles.colorDot}
                  style={{ background: cf.dot }}
                />
                {cf.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
          <button
            className={styles.signOutBtn}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>My Notes</h1>
            <p className={styles.pageSub}>
              {notes.length} note{notes.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className={styles.clearSearch}
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className={styles.skeletonGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>{search ? "🔍" : "📝"}</div>
            <p className={styles.emptyTitle}>
              {search ? "No notes found" : "No notes yet"}
            </p>
            <p className={styles.emptySub}>
              {search
                ? "Try a different search term"
                : 'Click "+ New Note" to get started'}
            </p>
          </div>
        )}

        {/* Pinned */}
        {!loading && pinned.length > 0 && (
          <>
            <p className={styles.groupLabel}>📌 Pinned</p>
            <div className={styles.grid}>
              {pinned.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => {
                    setEditNote(note);
                    setModalOpen(true);
                  }}
                  onDelete={() => handleDelete(note._id)}
                  onPin={() => handlePin(note)}
                />
              ))}
            </div>
          </>
        )}

        {/* Other */}
        {!loading && unpinned.length > 0 && (
          <>
            {pinned.length > 0 && (
              <p className={styles.groupLabel}>🗒 Others</p>
            )}
            <div className={styles.grid}>
              {unpinned.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => {
                    setEditNote(note);
                    setModalOpen(true);
                  }}
                  onDelete={() => handleDelete(note._id)}
                  onPin={() => handlePin(note)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <NoteModal
          note={editNote}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditNote(null);
          }}
        />
      )}
    </div>
  );
}
