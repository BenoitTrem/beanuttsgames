import styles from "./donate.module.css";

export default function Donate() {
  return (
    <section>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Beanutts Games</span>
          <h1 className={styles.title}>Support the studio</h1>
        </div>
      </div>
    </section>
  );
}
