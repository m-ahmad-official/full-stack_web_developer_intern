import { recentOrders } from "@/lib/data";
import styles from "./OrdersTable.module.css";

const STATUS_STYLES: Record<string, string> = {
  Completed: "completed",
  Pending: "pending",
  Cancelled: "cancelled",
};

export default function OrdersTable() {
  return (
    <div>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Recent Orders</h3>
          <p className={styles.sub}>Latest 6 transactions</p>
        </div>
        <button className={styles.viewAll}>View all →</button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className={styles.orderId}>{order.id}</td>
                <td>
                  <div className={styles.customer}>
                    <div className={styles.avatar}>{order.avatar}</div>
                    {order.customer}
                  </div>
                </td>
                <td className={styles.product}>{order.product}</td>
                <td className={styles.amount}>{order.amount}</td>
                <td>
                  <span
                    className={`${styles.status} ${styles[STATUS_STYLES[order.status]]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
