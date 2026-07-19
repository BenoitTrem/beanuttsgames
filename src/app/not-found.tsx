import Link from "next/link";
import styles from "./error-pages.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <span className={`${styles.code} ${styles.flicker}`}>404</span>
      <h1 className={styles.title}>There&apos;s nothing here.</h1>
      <p className={styles.message}>
        The page you&apos;re looking for doesn&apos;t exist, or wandered off
        somewhere it shouldn&apos;t have.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={`btn ${styles.btnGame}`}>
          Back home
        </Link>
        <Link
          href="/games"
          className={`${styles.btnGame} ${styles.btnGameSecondary}`}
        >
          See my games
        </Link>
      </div>
    </div>
  );
}
