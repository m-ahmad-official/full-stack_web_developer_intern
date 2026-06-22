"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      document.cookie = `chat_token=${data.token}; path=/; max-age=${7 * 24 * 3600}`;
      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>💬</div>
          <h1 className={styles.brandName}>ChatFlow</h1>
          <p className={styles.brandSub}>Real-time messaging, reimagined.</p>
        </div>
        <div className={styles.features}>
          {[
            "Private & group chats",
            "Real-time messaging",
            "Online presence",
            "Chat history",
          ].map((f) => (
            <div key={f} className={styles.feature}>
              <span className={styles.featureCheck}>✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.sub}>Sign in to continue chatting</p>
          {error && <div className={styles.error}>{error}</div>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                required
              />
            </div>
            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className={styles.footer}>
            No account?{" "}
            <Link href="/register" className={styles.link}>
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
