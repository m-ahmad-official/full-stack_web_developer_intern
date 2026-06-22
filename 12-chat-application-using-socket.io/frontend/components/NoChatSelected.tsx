import styles from "./NoChatSelected.module.css";
export default function NoChatSelected() {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>💬</div>
      <h2 className={styles.title}>ChatFlow</h2>
      <p className={styles.sub}>
        Select a conversation from the sidebar
        <br />
        or search for a person to start chatting.
      </p>
      <div className={styles.tips}>
        <div className={styles.tip}>
          <span>👥</span> Create group chats with the 👥 button
        </div>
        <div className={styles.tip}>
          <span>🔍</span> Search users in the People tab
        </div>
        <div className={styles.tip}>
          <span>⚡</span> Messages delivered in real time
        </div>
      </div>
    </div>
  );
}
