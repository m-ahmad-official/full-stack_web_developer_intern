"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const links = ["Home", "Services", "Pricing", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          NEXORA<span>.</span>
        </a>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
          <a href="#contact" className={styles.cta}>
            Start a Project
          </a>
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
