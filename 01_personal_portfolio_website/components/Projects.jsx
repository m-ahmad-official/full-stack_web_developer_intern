import styles from "./Projects.module.css";

const projects = [
  {
    title: "ShopNext — E-Commerce Platform",
    desc: "A full-featured online store with cart, authentication, payment integration, and an admin dashboard built with Next.js.",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    emoji: "🛒",
    type: "Full Stack",
    github: "https://github.com/yourusername/shopnext",
    demo: "https://shopnext.vercel.app",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
  },
  {
    title: "TalkSpace — Real-time Chat",
    desc: "Real-time messaging app with rooms, online presence indicators, file sharing, and Socket.io powered live updates.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    emoji: "💬",
    type: "MERN Stack",
    github: "https://github.com/yourusername/talkspace",
    demo: "https://talkspace.vercel.app",
    gradient: "linear-gradient(135deg, #0d1b2a, #1b2838)",
  },
  {
    title: "TaskFlow — Project Manager",
    desc: "Kanban-style task management tool with drag-and-drop, team collaboration, notifications and deadline tracking.",
    tags: ["React", "Express", "JWT", "MongoDB"],
    emoji: "✅",
    type: "REST API",
    github: "https://github.com/yourusername/taskflow",
    demo: "https://taskflow.vercel.app",
    gradient: "linear-gradient(135deg, #1a0a2e, #2d1b4e)",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <p className="section-label">My Work</p>
      <h2 className="section-title">Featured Projects</h2>
      <div className="section-line" />

      <div className={styles.grid}>
        {projects.map((p) => (
          <div key={p.title} className={styles.card}>
            <div className={styles.thumb} style={{ background: p.gradient }}>
              <span className={styles.thumbLabel}>{p.type}</span>
              <span className={styles.thumbEmoji}>{p.emoji}</span>
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.tags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.links}>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  ⌥ Code
                </a>
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  ↗ Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
