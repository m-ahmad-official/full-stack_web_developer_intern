"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>Ahmed.dev</div>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {links.map((link) => (
          <li key={link}>
            <button onClick={() => scrollTo(link)} className={styles.navBtn}>
              {link}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <a href="/resume.pdf" download className={styles.resumeBtn}>
          Resume ↓
        </a>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
