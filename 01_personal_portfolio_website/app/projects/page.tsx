import styles from "./page.module.css";
import ProjectsNavbar from "@/components/ProjectsNavbar";

const basicProjects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    desc: "Responsive multi-section portfolio with Hero, About, Skills, Projects & Contact sections.",
    tags: ["Next.js", "CSS Modules", "Responsive"],
    icon: "🧑‍💻",
    github: "https://github.com/yourusername/portfolio",
    demo: "https://portfolio.vercel.app",
  },
  {
    id: 2,
    title: "Responsive Landing Page",
    desc: "Modern product landing page with hero banner, features grid, testimonials and CTA.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "🌐",
    github: "https://github.com/yourusername/landing-page",
    demo: "https://landing-page.vercel.app",
  },
  {
    id: 3,
    title: "To-Do List Application",
    desc: "Task manager with add, delete, complete toggle and local storage persistence.",
    tags: ["React", "useState", "localStorage"],
    icon: "✅",
    github: "https://github.com/yourusername/todo-app",
    demo: "https://todo-app.vercel.app",
  },
  {
    id: 4,
    title: "Calculator App",
    desc: "Fully functional calculator with keyboard support, history log and clear functions.",
    tags: ["React", "CSS Grid", "JavaScript"],
    icon: "🧮",
    github: "https://github.com/yourusername/calculator",
    demo: "https://calculator.vercel.app",
  },
  {
    id: 5,
    title: "Weather App using API",
    desc: "Real-time weather by city using OpenWeatherMap API with 5-day forecast display.",
    tags: ["Next.js", "API", "Axios"],
    icon: "⛅",
    github: "https://github.com/yourusername/weather-app",
    demo: "https://weather-app.vercel.app",
  },
];

const mediumProjects = [
  {
    id: 6,
    title: "Notes Management System",
    desc: "Full CRUD notes app with categories, rich text editor and search functionality.",
    tags: ["React", "Node.js", "MongoDB"],
    icon: "📝",
    github: "https://github.com/yourusername/notes-app",
    demo: "https://notes-app.vercel.app",
  },
  {
    id: 7,
    title: "Movie Search Application",
    desc: "Search movies via TMDB API with detailed info, ratings and watchlist feature.",
    tags: ["Next.js", "TMDB API", "Tailwind"],
    icon: "🎬",
    github: "https://github.com/yourusername/movie-search",
    demo: "https://movie-search.vercel.app",
  },
  {
    id: 8,
    title: "Admin Dashboard UI",
    desc: "Analytics dashboard with charts, tables, user management and dark/light mode.",
    tags: ["React", "Chart.js", "CSS Modules"],
    icon: "📊",
    github: "https://github.com/yourusername/admin-dashboard",
    demo: "https://admin-dashboard.vercel.app",
  },
  {
    id: 9,
    title: "Expense Tracker Application",
    desc: "Track income and expenses with pie charts, monthly reports and budget alerts.",
    tags: ["React", "Context API", "Recharts"],
    icon: "💰",
    github: "https://github.com/yourusername/expense-tracker",
    demo: "https://expense-tracker.vercel.app",
  },
  {
    id: 10,
    title: "Blog Website with Authentication",
    desc: "Full blog with JWT auth, create/edit/delete posts, comments and user profiles.",
    tags: ["Next.js", "MongoDB", "JWT"],
    icon: "✍️",
    github: "https://github.com/yourusername/blog-app",
    demo: "https://blog-app.vercel.app",
  },
];

const advancedProjects = [
  {
    id: 11,
    title: "Full Stack E-commerce Website",
    desc: "Complete online store with cart, Stripe payments, admin panel and order tracking.",
    tags: ["Next.js", "MongoDB", "Stripe", "Redux"],
    icon: "🛒",
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce.vercel.app",
  },
  {
    id: 12,
    title: "Chat Application using Socket.io",
    desc: "Real-time messaging with rooms, online presence, file sharing and notifications.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    icon: "💬",
    github: "https://github.com/yourusername/chat-app",
    demo: "https://chat-app.vercel.app",
  },
  {
    id: 13,
    title: "Full Stack Task Management System",
    desc: "Kanban board with drag-and-drop, team roles, deadlines, and real-time updates.",
    tags: ["Next.js", "Express", "MongoDB", "DnD"],
    icon: "🗂️",
    github: "https://github.com/yourusername/task-manager",
    demo: "https://task-manager.vercel.app",
  },
];

type Project = {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  icon: string;
  github: string;
  demo: string;
};

function ProjectCard({ project, level }: { project: Project; level: string }) {
  return (
    <div className={`${styles.card} ${styles[level]}`}>
      <div className={styles.cardNumber}>
        #{String(project.id).padStart(2, "0")}
      </div>
      <div className={styles.cardIcon}>{project.icon}</div>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.desc}</p>
      <div className={styles.tagRow}>
        {project.tags.map((t) => (
          <span key={t} className={styles.tag}>
            {t}
          </span>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className={styles.codeBtn}
        >
          ⌥ Code
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className={styles.demoBtn}
        >
          ↗ Live Demo
        </a>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsNavbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.headerLabel}>
            Nexsoft Solutions · Internship Task List
          </span>
          <h1 className={styles.headerTitle}>
            Full-Stack Web Developer
            <br />
            <span className={styles.headerAccent}>Intern Projects</span>
          </h1>
          <p className={styles.headerSub}>
            13 projects across 3 difficulty levels — MERN / Next.js track.
          </p>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>13</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={`${styles.statNum} ${styles.basic}`}>5</span>
              <span className={styles.statLabel}>Basic</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={`${styles.statNum} ${styles.medium}`}>5</span>
              <span className={styles.statLabel}>Medium</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={`${styles.statNum} ${styles.advanced}`}>3</span>
              <span className={styles.statLabel}>Advanced</span>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={`${styles.levelBadge} ${styles.levelBasic}`}>
              Level 01
            </div>
            <h2 className={styles.sectionTitle}>Basic Level Projects</h2>
            <p className={styles.sectionDesc}>
              Foundation projects to build core HTML, CSS, JavaScript and React
              skills.
            </p>
            <div className={`${styles.sectionLine} ${styles.lineBasic}`} />
          </div>
          <div className={styles.grid}>
            {basicProjects.map((p) => (
              <ProjectCard key={p.id} project={p} level="basic" />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={`${styles.levelBadge} ${styles.levelMedium}`}>
              Level 02
            </div>
            <h2 className={styles.sectionTitle}>Medium Level Projects</h2>
            <p className={styles.sectionDesc}>
              Intermediate projects introducing APIs, authentication and state
              management.
            </p>
            <div className={`${styles.sectionLine} ${styles.lineMedium}`} />
          </div>
          <div className={styles.grid}>
            {mediumProjects.map((p) => (
              <ProjectCard key={p.id} project={p} level="medium" />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={`${styles.levelBadge} ${styles.levelAdvanced}`}>
              Level 03
            </div>
            <h2 className={styles.sectionTitle}>Advanced Level Projects</h2>
            <p className={styles.sectionDesc}>
              Production-grade full-stack applications with real-time features
              and payments.
            </p>
            <div className={`${styles.sectionLine} ${styles.lineAdvanced}`} />
          </div>
          <div className={styles.grid}>
            {advancedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} level="advanced" />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
