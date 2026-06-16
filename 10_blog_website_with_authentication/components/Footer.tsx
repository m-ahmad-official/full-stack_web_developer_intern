import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>✍️ DevNotes</span>
          <p className={styles.tagline}>
            Built by M. Ahmed · Nexsoft Solutions Internship
          </p>
        </div>
        <p className={styles.copy}>
          © {new Date().getFullYear()} DevNotes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
