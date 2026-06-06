"use client";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.grain} />
      <div className={styles.grid} />
      <div className={styles.glow} />

      <div className={styles.container}>
        <motion.div className={styles.badge} {...fadeUp(0.1)}>
          <span className={styles.dot} />
          Available for new projects
        </motion.div>

        <h1 className={styles.headline}>
          <motion.span className={styles.line1} {...fadeUp(0.2)}>
            We Build
          </motion.span>
          <motion.span className={styles.line2} {...fadeUp(0.3)}>
            Digital
          </motion.span>
          <motion.span className={styles.line3} {...fadeUp(0.4)}>
            Experiences<span className={styles.accent}>.</span>
          </motion.span>
        </h1>

        <motion.p className={styles.sub} {...fadeUp(0.5)}>
          Strategy, design, and engineering — under one roof.
          <br />
          We turn bold ideas into products people love.
        </motion.p>

        <motion.div className={styles.actions} {...fadeUp(0.6)}>
          <motion.a
            href="#contact"
            className={styles.btnPrimary}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
          <motion.a
            href="#services"
            className={styles.btnSecondary}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            See Our Work
          </motion.a>
        </motion.div>

        <motion.div className={styles.stats} {...fadeUp(0.75)}>
          {[
            { num: "120+", label: "Projects Shipped" },
            { num: "8yr", label: "In Business" },
            { num: "98%", label: "Client Satisfaction" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.stat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            >
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className={styles.scroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
