import styles from "./BalanceCard.module.css";

interface Props {
  balance: number;
  income: number;
  expense: number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

export default function BalanceCard({ balance, income, expense }: Props) {
  const savingsRate =
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  return (
    <div className={styles.wrap}>
      {/* Main balance */}
      <div className={styles.balanceCard}>
        <div className={styles.balanceTop}>
          <span className={styles.balanceLabel}>Total Balance</span>
          <span
            className={`${styles.balanceBadge} ${balance >= 0 ? styles.positive : styles.negative}`}
          >
            {balance >= 0 ? "▲ Positive" : "▼ Negative"}
          </span>
        </div>
        <div
          className={`${styles.balanceAmount} ${balance < 0 ? styles.balanceRed : ""}`}
        >
          {fmt(balance)}
        </div>
        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progress}>
            <div
              className={styles.progressFill}
              style={{
                width:
                  income > 0
                    ? `${Math.min((expense / income) * 100, 100)}%`
                    : "0%",
              }}
            />
          </div>
          <span className={styles.progressLabel}>
            {income > 0
              ? `${Math.round((expense / income) * 100)}% spent`
              : "No income yet"}
          </span>
        </div>
      </div>

      {/* Income card */}
      <div className={`${styles.miniCard} ${styles.incomeCard}`}>
        <div className={styles.miniIcon}>↑</div>
        <div>
          <div className={styles.miniLabel}>Total Income</div>
          <div className={styles.miniAmount}>{fmt(income)}</div>
        </div>
      </div>

      {/* Expense card */}
      <div className={`${styles.miniCard} ${styles.expenseCard}`}>
        <div className={`${styles.miniIcon} ${styles.expenseIcon}`}>↓</div>
        <div>
          <div className={styles.miniLabel}>Total Expenses</div>
          <div className={`${styles.miniAmount} ${styles.expenseAmount}`}>
            {fmt(expense)}
          </div>
        </div>
      </div>

      {/* Savings rate */}
      <div className={`${styles.miniCard} ${styles.savingsCard}`}>
        <div className={`${styles.miniIcon} ${styles.savingsIcon}`}>💎</div>
        <div>
          <div className={styles.miniLabel}>Savings Rate</div>
          <div className={`${styles.miniAmount} ${styles.savingsAmount}`}>
            {savingsRate}%
          </div>
        </div>
      </div>
    </div>
  );
}
