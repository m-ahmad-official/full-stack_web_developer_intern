"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PostEditor.module.css";

const CATEGORIES = [
  "Technology",
  "Design",
  "Development",
  "Career",
  "Life",
  "Tutorial",
  "General",
];

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export default function PostEditor({ initialData, isEdit }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    excerpt: initialData?.excerpt ?? "",
    category: initialData?.category ?? "General",
    tags: initialData?.tags?.join(", ") ?? "",
    coverImage: initialData?.coverImage ?? "",
    status: initialData?.status ?? "draft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (status: "draft" | "published") => {
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content required");
      return;
    }
    setLoading(true);
    setError("");
    const payload = {
      ...form,
      status,
      tags: form.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean),
    };

    const url = isEdit ? `/api/posts/${initialData.slug}` : "/api/posts";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <div className={styles.editor}>
      {error && <div className={styles.error}>{error}</div>}
      {saved && <div className={styles.success}>Saved! Redirecting...</div>}

      {/* Title */}
      <input
        className={styles.titleInput}
        type="text"
        placeholder="Post title..."
        value={form.title}
        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
      />

      {/* Excerpt */}
      <textarea
        className={styles.excerptInput}
        placeholder="Short description (shown in cards)..."
        value={form.excerpt}
        onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
        rows={2}
      />

      {/* Content */}
      <div className={styles.contentWrap}>
        <label className={styles.contentLabel}>
          Content (HTML / Markdown supported)
        </label>
        <textarea
          className={styles.contentInput}
          placeholder="Write your post content here..."
          value={form.content}
          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
          rows={20}
        />
      </div>

      {/* Meta row */}
      <div className={styles.metaRow}>
        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.select}
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value }))
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Tags (comma separated)</label>
          <input
            className={styles.input}
            type="text"
            placeholder="nextjs, react, tutorial"
            value={form.tags}
            onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Cover Image URL</label>
          <input
            className={styles.input}
            type="url"
            placeholder="https://..."
            value={form.coverImage}
            onChange={(e) =>
              setForm((p) => ({ ...p, coverImage: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.draftBtn}
          onClick={() => handleSubmit("draft")}
          disabled={loading}
        >
          {loading ? "Saving..." : "💾 Save Draft"}
        </button>
        <button
          className={styles.publishBtn}
          onClick={() => handleSubmit("published")}
          disabled={loading}
        >
          {loading ? "Publishing..." : "🚀 Publish Post"}
        </button>
      </div>
    </div>
  );
}
