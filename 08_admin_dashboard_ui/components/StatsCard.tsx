import styles from "./StatsCard.module.css";

interface Props {
  title: string;
  value: string;
  change: string;
  up: boolean;
  icon: string;
  color: string;
  sub: string;
}

export default function StatsCard({
  title,
  value,
  change,
  up,
  icon,
  color,
  sub,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={`${styles.iconWrap} ${styles[color]}`}>{icon}</div>
        <span className={`${styles.change} ${up ? styles.up : styles.down}`}>
          {up ? "↑" : "↓"} {change}
        </span>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.sub}>{sub}</div>
    </div>
  );
}
