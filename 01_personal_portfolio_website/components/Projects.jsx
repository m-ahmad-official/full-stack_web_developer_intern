import styles from "./Projects.module.css";

const projects = [
  {
    title: "Bandage — E-Commerce Platform",
    desc: "A full-featured online store with cart, authentication, payment integration, and an admin dashboard built with Next.js.",
    tags: ["Next.js", "Sanity", "Stripe", "Tailwind CSS"],
    type: "Full Stack",
    github: "https://github.com/m-ahmad-official/final-hackathon",
    demo: "https://final-hackathon-6316.vercel.app",
    image: "/project1.png",
  },
  {
    title: "Physical AI & Humanoid Robotics Book",
    desc: "Built as a learning project by Ahmed to explore the fundamentals of Physical AI and humanoid robotics using ROS 2.",
    tags: ["Hackathon", "Claude Code", "Spec Development", "Book"],
    type: "Docusaurus",
    github:
      "https://github.com/m-ahmad-official/hackathon-1-humanoid-ai-robotics",
    demo: "https://hackathon-1-humanoid-ai-robotics.vercel.app",
    image: "/project2.png",
  },
  {
    title: "Marvel Studios — Dynamic Blog",
    desc: "The Studio connects to Sanity Content Lake, hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more.",
    tags: ["Next.js", "Sanity"],
    type: "Next.js",
    github: "https://github.com/m-ahmad-official/dynamic-blog",
    demo: "https://dynamic-blog-eta.vercel.app",
    image: "/project3.png",
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
            <div
              className={styles.thumb}
              style={{
                backgroundImage: `url(${p.image})`,
                backgroundSize: "cover",
              }}
            >
              {/* <span className={styles.thumbLabel}>{p.type}</span> */}
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
