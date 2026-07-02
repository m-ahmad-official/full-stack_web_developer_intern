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
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      document.cookie = `tm_token=${data.token}; path=/; max-age=${7 * 24 * 3600}`;
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brandWrap}>
          <div className={styles.brandLogo}>⚡</div>
          <h1 className={styles.brandName}>FlowBoard</h1>
          <p className={styles.brandSub}>Ship faster. Collaborate smarter.</p>
        </div>
        <div className={styles.featureList}>
          {[
            { icon: "🗂", text: "Kanban board with drag-and-drop" },
            { icon: "👥", text: "Team roles — Admin & Member" },
            { icon: "🎯", text: "Priority & status tracking" },
            { icon: "⚡", text: "Real-time task updates" },
          ].map((f) => (
            <div key={f.text} className={styles.featureItem}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>Sign in</h2>
            <p className={styles.sub}>Welcome back to FlowBoard</p>
          </div>
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
              {loading ? "Signing in..." : "Sign In →"}
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
