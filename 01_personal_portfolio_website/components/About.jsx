import styles from "./About.module.css";
import Image from "next/image";

const stats = [
  { num: "13", label: "Projects" },
  { num: "1", label: "Month Exp." },
  { num: "8+", label: "Technologies" },
  { num: "100%", label: "Dedication" },
];

const details = [
  { key: "Name", val: "Muhammad Ahmed" },
  { key: "Email", val: "aq320646@email.com" },
  { key: "Location", val: "Karachi, PK" },
  { key: "Status", val: "Open to work", highlight: true },
];

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.grid}>
        {/* Left — image & stats */}
        <div className={styles.imgCol}>
          <div className={styles.imgFrame}>
            <Image
              src="/profile.jpg"
              alt="Muhammad Ahmed"
              width={400}
              height={500}
              className={styles.profileImage}
            />
            <div className={styles.availBadge}>Available for work</div>
          </div>
          <div className={styles.imgAccent} />
          {/* <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statBox}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Right — text */}
        <div className={styles.textCol}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">A Developer Who Loves to Build.</h2>
          <div className="section-line" />
          <p className={styles.para}>
            I&apos;m a Full-Stack Web Developer specialising in the MERN stack
            and Next.js, currently interning at{" "}
            <strong>Nexsoft Solutions</strong>. I enjoy turning complex problems
            into elegant, user-friendly digital solutions.
          </p>
          <p className={styles.para}>
            My journey started with curiosity about how websites work and grew
            into a deep passion for full-stack development — from architecting
            databases to crafting pixel-perfect UIs.
          </p>

          <div className={styles.detailsGrid}>
            {details.map((d) => (
              <div key={d.key} className={styles.detail}>
                <span className={styles.detailKey}>{d.key}</span>
                <span
                  className={`${styles.detailVal} ${d.highlight ? styles.highlight : ""}`}
                >
                  {d.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
