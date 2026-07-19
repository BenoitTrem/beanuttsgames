"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error-pages.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <span className={`${styles.code} ${styles.flicker}`}>500</span>
      <h1 className={styles.title}>Something broke.</h1>
      <p className={styles.message}>
        An error slipped through the cracks. Try again, or head back to
        somewhere safer.
      </p>
      <div className={styles.actions}>
        <button onClick={() => reset()} className={`btn ${styles.btnGame}`}>
          Try again
        </button>
        <Link
          href="/"
          className={`${styles.btnGame} ${styles.btnGameSecondary}`}
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
