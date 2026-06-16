"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Pages that need dark navbar always (light bg pages)
  const alwaysDark = pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = alwaysDark || scrolled;

  return (
    <nav className={`${styles.nav} ${isDark ? styles.dark : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✍️</span>
          DevNotes
        </Link>

        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          {session && (
            <Link href="/dashboard" className={styles.link}>
              Dashboard
            </Link>
          )}
        </div>

        <div className={styles.actions}>
          {session ? (
            <>
              <Link href="/dashboard/new" className={styles.writeBtn}>
                ✏️ Write
              </Link>
              <button
                className={styles.signOutBtn}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>
                Sign In
              </Link>
              <Link href="/register" className={styles.registerBtn}>
                Get Started
              </Link>
            </>
          )}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={styles.mobileLink}
          >
            Home
          </Link>
          {session && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={styles.mobileLink}
            >
              Dashboard
            </Link>
          )}
          {session && (
            <Link
              href="/dashboard/new"
              onClick={() => setMenuOpen(false)}
              className={styles.mobileLink}
            >
              ✏️ Write Post
            </Link>
          )}
          {session ? (
            <button
              className={styles.mobileLink}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={styles.mobileLink}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className={styles.mobileLink}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
