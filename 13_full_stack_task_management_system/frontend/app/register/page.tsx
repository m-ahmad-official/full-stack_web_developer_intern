"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../login/auth.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
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
          <p className={styles.brandSub}>Your team&apos;s command center.</p>
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
            <h2 className={styles.title}>Create account</h2>
            <p className={styles.sub}>Join FlowBoard today</p>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Muhammad Ahmed"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
            </div>
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
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Role</label>
              <select
                className={styles.input}
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({ ...p, role: e.target.value }))
                }
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </form>
          <p className={styles.footer}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
