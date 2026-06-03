"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ProjectsNavbar.module.css";

export default function ProjectsNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      {/* Left — Nexsoft brand */}
      <div className={styles.brand}>
        <span className={styles.brandDot} />
        <div>
          <div className={styles.brandName}>Nexsoft Solutions</div>
          <div className={styles.brandSub}>
            Full-Stack Internship · MERN / Next.js
          </div>
        </div>
      </div>

      {/* Center — Home only */}
      <ul className={styles.links}>
        <li>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
      </ul>

      {/* Right — resume */}
      <a href="/resume.pdf" download className={styles.resumeBtn}>
        Resume ↓
      </a>
    </nav>
  );
}
