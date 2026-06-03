import styles from "./Footer.module.css";
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

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Ahmed.dev</div>
      <p className={styles.copy}>
        © 2026 by Muhammad Ahmed · Built with Next.js &amp; passion
      </p>
      <div className={styles.socials}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className={styles.social}
            title={s.label}
          >
            <Image src={s.icon} alt={s.label} width={20} height={20} />
          </a>
        ))}
      </div>
    </footer>
  );
}
