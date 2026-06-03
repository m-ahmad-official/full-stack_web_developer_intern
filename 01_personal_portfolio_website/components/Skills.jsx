"use client";
import { useEffect, useRef } from "react";
import styles from "./Skills.module.css";

const categories = [
  {
    title: "Frontend",
    icon: "🖥",
    skills: [
      { name: "React.js", pct: 90 },
      { name: "Next.js", pct: 82 },
      { name: "HTML / CSS", pct: 95 },
      { name: "Tailwind CSS", pct: 85 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", pct: 85 },
      { name: "Express.js", pct: 80 },
      { name: "REST APIs", pct: 88 },
      { name: "JWT Auth", pct: 78 },
    ],
  },
  {
    title: "Database & Tools",
    icon: "🗄",
    skills: [
      { name: "MongoDB", pct: 83 },
      { name: "Git & GitHub", pct: 87 },
      { name: "JavaScript ES6+", pct: 92 },
      { name: "Postman", pct: 80 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const bars = sectionRef.current?.querySelectorAll("[data-width]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bars?.forEach((bar) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.width;
              }, 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <p className="section-label">What I Know</p>
      <h2 className="section-title">Skills &amp; Technologies</h2>
      <div className="section-line" />

      <div className={styles.grid}>
        {categories.map((cat) => (
          <div key={cat.title} className={styles.card}>
            <div className={styles.cardTitle}>
              <span className={styles.icon}>{cat.icon}</span>
              {cat.title}
            </div>
            {cat.skills.map((sk) => (
              <div key={sk.name} className={styles.skillItem}>
                <div className={styles.skillMeta}>
                  <span className={styles.skillName}>{sk.name}</span>
                  <span className={styles.skillPct}>{sk.pct}%</span>
                </div>
                <div className={styles.bar}>
                  <div
                    className={styles.fill}
                    data-width={`${sk.pct}%`}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
