import styles from "./Hero.module.css";
import Image from "next/image";

import GithubIcon from "@/public/github.svg";
import LinkedInIcon from "@/public/linkedin.svg";
import TwitterIcon from "@/public/twitter.svg";
import EmailIcon from "@/public/email.svg";

const socials = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/m-ahmad-official",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammad-ahmed-ma6316",
  },
  {
    icon: TwitterIcon,
    label: "Twitter",
    href: "https://twitter.com/iam7ahmad",
  },
  {
    icon: EmailIcon,
    label: "Email",
    href: "mailto:aq320646@gmail.com",
  },
];

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />

      <div className={styles.content}>
        <span className={styles.tag}>Full-Stack Web Developer</span>
        <h1 className={styles.name}>
          Muhammad
          <br />
          <span className={styles.nameAccent}>Ahmed.</span>
        </h1>
        <p className={styles.role}>Building digital experiences</p>
        <p className={styles.desc}>
          MERN Stack &amp; Next.js developer passionate about crafting scalable
          web applications with clean code and intuitive interfaces. Interning
          at Nexsoft Solutions.
        </p>
        <div className={styles.btns}>
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
        </div>
      </div>

      <div className={styles.socials}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            title={s.label}
          >
            <Image src={s.icon} alt={s.label} width={24} height={24} />
          </a>
        ))}
      </div>
    </section>
  );
}
