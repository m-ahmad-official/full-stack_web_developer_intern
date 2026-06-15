import { Transaction } from "./ExpenseApp";
import styles from "./TransactionList.module.css";

const CATEGORY_ICONS: Record<string, string> = {
  salary: "💼",
  freelance: "💻",
  investment: "📈",
  gift: "🎁",
  other_income: "💰",
  food: "🍔",
  transport: "🚗",
  shopping: "🛍️",
  bills: "📄",
  health: "❤️",
  entertainment: "🎮",
  education: "📚",
  other_expense: "💸",
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

interface Props {
  transactions: Transaction[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  loading,
  onDelete,
}: Props) {
  if (loading)
    return (
      <div className={styles.skeletons}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );

  if (transactions.length === 0)
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📭</div>
        <p className={styles.emptyTitle}>No transactions yet</p>
        <p className={styles.emptySub}>Add your first transaction above</p>
      </div>
    );

  return (
    <div className={styles.list}>
      {transactions.map((tx) => {
        const icon = CATEGORY_ICONS[tx.category] ?? "💳";
        const date = new Date(tx.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return (
          <div key={tx._id} className={styles.item}>
            <div
              className={`${styles.icon} ${tx.type === "income" ? styles.iconIncome : styles.iconExpense}`}
            >
              {icon}
            </div>
            <div className={styles.info}>
              <div className={styles.title}>{tx.title}</div>
              <div className={styles.meta}>
                <span className={styles.category}>
                  {tx.category.replace("_", " ")}
                </span>
                {tx.note && (
                  <>
                    <span className={styles.dot}>·</span>
                    <span className={styles.note}>{tx.note}</span>
                  </>
                )}
                <span className={styles.dot}>·</span>
                <span className={styles.date}>{date}</span>
              </div>
            </div>
            <div className={styles.right}>
              <div
                className={`${styles.amount} ${tx.type === "income" ? styles.amountIncome : styles.amountExpense}`}
              >
                {tx.type === "income" ? "+" : "-"}
                {fmt(tx.amount)}
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(tx._id)}
                title="Delete"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
