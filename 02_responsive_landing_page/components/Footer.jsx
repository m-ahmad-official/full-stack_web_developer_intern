import { FadeUp, ScaleIn } from "./AnimateOnScroll";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <FadeUp>
            <span className={styles.label}>
              Ready to build something great?
            </span>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className={styles.ctaTitle}>
              Let&apos;s work
              <br />
              <span className={styles.outline}>together</span>
              <span className={styles.dot}>.</span>
            </h2>
          </FadeUp>
          <ScaleIn delay={0.3}>
            <a
              href="https://mail.google.com/mail/?view=cm&to=hello@nexoratechnologies.com"
              className={styles.email}
            >
              hello@nexoratechnologies.com
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </ScaleIn>
        </div>
        <div className={styles.glow} />
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.logo}>
            NEXORA<span>.</span>
          </span>
          <nav className={styles.nav}>
            {["Home", "Services", "Pricing", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={styles.navLink}
              >
                {l}
              </a>
            ))}
          </nav>
          <span className={styles.copy}>
            © 2025 Nexora Technologies. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
