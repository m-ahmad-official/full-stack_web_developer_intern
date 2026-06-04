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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        {/* Logo */}
        <div className={styles.logo}>Ahmed.dev</div>

        {/* Desktop links */}
        <ul className={styles.desktopLinks}>
          {links.map((link) => (
            <li key={link}>
              <button onClick={() => scrollTo(link)} className={styles.navBtn}>
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side — resume + hamburger */}
        <div className={styles.right}>
          <a href="/resume.pdf" download className={styles.resumeBtn}>
            Resume ↓
          </a>
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <ul className={styles.mobileLinks}>
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className={styles.mobileLinkBtn}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        <a href="/resume.pdf" download className={styles.mobileResumeBtn}>
          Resume ↓
        </a>
      </div>
    </>
  );
}
