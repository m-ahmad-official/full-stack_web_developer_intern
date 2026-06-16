"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDate } from "@/lib/utils";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/posts?mine=1")
      .then((r) => r.json())
      .then((d) => {
        setPosts(Array.isArray(d) ? d : []);
        setLoading(false);
      });
  }, [status]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  };

  const handlePublish = async (slug: string, current: string) => {
    const newStatus = current === "published" ? "draft" : "published";
    const res = await fetch(`/api/posts/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setPosts((prev) => prev.map((p) => (p.slug === slug ? updated : p)));
  };

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const totalViews = posts.reduce((s, p) => s + (p.views ?? 0), 0);

  if (status === "loading") return null;

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>My Dashboard</h1>
            <p className={styles.sub}>Welcome back, {session?.user?.name} 👋</p>
          </div>
          <Link href="/dashboard/new" className={styles.newBtn}>
            ✏️ New Post
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { label: "Total Posts", value: posts.length, icon: "📝" },
            { label: "Published", value: published, icon: "✅" },
            { label: "Drafts", value: drafts, icon: "📋" },
            { label: "Total Views", value: totalViews, icon: "👁" },
          ].map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statIcon}>{s.icon}</span>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Posts table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Your Posts</h2>
          </div>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : posts.length === 0 ? (
            <div className={styles.empty}>
              <p>No posts yet.</p>
              <Link href="/dashboard/new" className={styles.emptyLink}>
                Write your first post →
              </Link>
            </div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td className={styles.postTitle}>
                        <Link href={`/post/${post.slug}`}>{post.title}</Link>
                      </td>
                      <td>
                        <span className={styles.catBadge}>{post.category}</span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${post.status === "published" ? styles.published : styles.draft}`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className={styles.views}>{post.views ?? 0}</td>
                      <td className={styles.date}>
                        {formatDate(post.createdAt)}
                      </td>
                      <td>
                        <div className={styles.rowActions}>
                          <Link
                            href={`/dashboard/edit/${post.slug}`}
                            className={styles.editBtn}
                          >
                            Edit
                          </Link>
                          <button
                            className={styles.publishBtn}
                            onClick={() =>
                              handlePublish(post.slug, post.status)
                            }
                          >
                            {post.status === "published"
                              ? "Unpublish"
                              : "Publish"}
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(post.slug)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
