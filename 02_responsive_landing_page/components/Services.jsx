import styles from "./Services.module.css";
import {
  FadeUp,
  SlideLeft,
  StaggerContainer,
  StaggerItem,
} from "./AnimateOnScroll";

const services = [
  {
    num: "01",
    title: "Brand Identity",
    desc: "Logos, systems, and guidelines that make your brand unmistakable. We design the visual DNA of your company.",
    tags: ["Logo", "Typography", "Color System"],
    icon: "◈",
  },
  {
    num: "02",
    title: "Product Design",
    desc: "Research-backed UX and pixel-perfect UI. From wireframes to handoff, we design products people actually want to use.",
    tags: ["UX Research", "UI Design", "Prototyping"],
    icon: "⬡",
  },
  {
    num: "03",
    title: "Web Development",
    desc: "Fast, accessible, and beautifully engineered websites. We specialise in Next.js, React, and cutting-edge web tech.",
    tags: ["Next.js", "React", "TypeScript"],
    icon: "⟁",
  },
  {
    num: "04",
    title: "Motion & Animation",
    desc: "Cinematic transitions, micro-interactions, and scroll storytelling. We bring interfaces to life.",
    tags: ["GSAP", "Framer Motion", "Lottie"],
    icon: "◎",
  },
  {
    num: "05",
    title: "Growth Strategy",
    desc: "SEO, analytics, and conversion optimisation. We don't just build — we help you grow.",
    tags: ["SEO", "Analytics", "CRO"],
    icon: "△",
  },
  {
    num: "06",
    title: "Maintenance & Scale",
    desc: "Ongoing support, performance tuning, and feature development as your business evolves.",
    tags: ["DevOps", "Performance", "Support"],
    icon: "⬢",
  },
];

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <SlideLeft>
            <span className={styles.label}>What We Do</span>
          </SlideLeft>
          <FadeUp delay={0.1}>
            <h2 className={styles.title}>
              Full-spectrum
              <br />
              <span className={styles.outline}>creative services</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className={styles.desc}>
              Everything you need to build, launch, and scale a digital product
              — no outsourcing, no handoffs to strangers.
            </p>
          </FadeUp>
        </div>

        <StaggerContainer className={styles.grid}>
          {services.map((s) => (
            <StaggerItem key={s.num}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.num}>{s.num}</span>
                  <span className={styles.icon}>{s.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <div className={styles.tags}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={styles.arrow}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10h12M12 6l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
