import styles from "./page.module.css";
import ProjectsNavbar from "@/components/ProjectsNavbar";

const basicProjects = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    desc: "A fully responsive personal portfolio with animated sections, skill bars, and a contact form.",
    tags: ["Next.js", "CSS Modules", "JavaScript", "Responsive"],
    icon: "🧑‍💻",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/01_personal_portfolio_website",
    demo: "https://portfolio-ahmed-nexsoft.vercel.app",
  },
  {
    id: 2,
    title: "Responsive Landing Page",
    desc: "A modern SaaS-style landing page with hero, services, and interactive pricing toggle.",
    tags: ["Next.js", "JavaScript", "CSS Modules", "Animations"],
    icon: "🌐",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/02_responsive_landing_page",
    demo: "https://landing-nexora-seven.vercel.app",
  },
  {
    id: 3,
    title: "To-Do List Application",
    desc: "A feature-rich task manager with priorities, filtering, edit mode, and localStorage persistence.",
    tags: ["Next.js", "TypeScript", "localStorage", "CSS Modules"],
    icon: "✅",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/03_to-do_list_application",
    demo: "https://todo-list-ahmed.vercel.app",
  },
  {
    id: 4,
    title: "Calculator App",
    desc: "A dark-themed calculator with full keyboard support, history panel, and error handling.",
    tags: ["Next.js", "TypeScript", "Keyboard Events", "CSS Modules"],
    icon: "🧮",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/04_calculator_app",
    demo: "https://calculator-app-ahmed.vercel.app",
  },
  {
    id: 5,
    title: "Weather App using API",
    desc: "Real-time weather app with city search, auto day/night theme, and unit toggle using OpenWeatherMap API.",
    tags: ["Next.js", "TypeScript", "REST API", "CSS Modules"],
    icon: "⛅",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/05_weather_app_using_api",
    demo: "https://weather-app5-iota.vercel.app",
  },
];

const mediumProjects = [
  {
    id: 6,
    title: "Notes Management System",
    desc: "A full-stack notes app with JWT auth, 7 color themes, pin/unpin, search, and MongoDB database.",
    tags: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "NextAuth.js",
      "bcryptjs",
      "CSS Modules",
    ],
    icon: "📝",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/06_notes_management_system",
    demo: "https://noteify-ahmed.vercel.app",
  },
  {
    id: 7,
    title: "Movie Search Application",
    desc: "Real-time movie search with TMDB API, detail pages, cast, trailer links, and load-more pagination.",
    tags: ["Next.js", "TypeScript", "TMDB API", "CSS Modules"],
    icon: "🎬",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/07_movie_search_application",
    demo: "https://movie-cinesearch.vercel.app",
  },
  {
    id: 8,
    title: "Admin Dashboard UI",
    desc: "Analytics dashboard with dark/light mode, revenue charts, orders table, and sidebar navigation.",
    tags: ["Next.js", "TypeScript", "Recharts", "CSS Modules"],
    icon: "📊",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/08_admin_dashboard_ui",
    demo: "https://admin-dashboard-ahmed.vercel.app",
  },
  {
    id: 9,
    title: "Expense Tracker Application",
    desc: "Full-stack income/expense tracker with MongoDB, spending chart, 13 categories, and savings rate.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Recharts", "CSS Modules"],
    icon: "💰",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/09_expense_tracker_application",
    demo: "https://expensetrackerapplication-seven.vercel.app",
  },
  {
    id: 10,
    title: "Blog Website with Authentication",
    desc: "Full-stack blog with JWT auth, create/edit/delete posts, draft system, search, and author dashboard.",
    tags: ["Next.js", "TypeScript", "MongoDB", "NextAuth.js", "CSS Modules"],
    icon: "✍️",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/10_blog_website_with_authentication",
    demo: "https://devnotes-blog.vercel.app",
  },
];

const advancedProjects = [
  {
    id: 11,
    title: "Full Stack E-commerce Website",
    desc: "A complete coffee brand online store with product listings, cart, Stripe payments, admin panel, and order management.",
    tags: ["Next.js", "TypeScript", "MongoDB", " NextAuth.js", "CSS Modules"],
    icon: "🛒",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/11_full_stack_e-commerce_website",
    demo: "https://coffeevault.vercel.app",
  },
  {
    id: 12,
    title: "Chat Application using Socket.io",
    desc: "Real-time messaging app with private and group chats, online status, typing indicators, and JWT authentication.",
    tags: ["Next.js", "Node.js", "Express ", "Socket.io", "MongoDB", "JWT"],
    icon: "💬",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/12-chat-application-using-socket.io",
    demo: "https://chat-socket-io-roan.vercel.app",
  },
  {
    id: 13,
    title: "Full Stack Task Management System",
    desc: " Kanban board with Admin/Member roles, real-time task updates, project management, and priority tracking.",
    tags: ["Next.js", "Node.js", "Express ", "Socket.io", "MongoDB", "JWT"],
    icon: "🗂️",
    github:
      "https://github.com/m-ahmad-official/full-stack_web_developer_intern/tree/main/13_full_stack_task_management_system",
    demo: "https://flowboard-task.vercel.app",
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
              Foundation of frontend development using Next.js, React, and CSS
              Modules.
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
              Full-stack applications with APIs, authentication, databases, and
              real-world features.
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
              Production-grade full-stack applications with real-time features,
              payments, and team collaboration.
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
