import { topProducts } from "@/lib/data";
import styles from "./TopProducts.module.css";

export default function TopProducts() {
  return (
    <div>
      <div className={styles.header}>
        <h3 className={styles.title}>Top Products</h3>
        <p className={styles.sub}>By revenue this month</p>
      </div>
      <div className={styles.list}>
        {topProducts.map((p, i) => (
          <div key={p.name} className={styles.item}>
            <div className={styles.rank}>#{i + 1}</div>
            <div className={styles.info}>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.barWrap}>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
                <span className={styles.pct}>{p.pct}%</span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.revenue}>{p.revenue}</div>
              <div className={styles.sales}>{p.sales} sales</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
