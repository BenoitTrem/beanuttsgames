import styles from "./about.module.css";

export default function About() {
  return (
    <section>
      <div className="container">
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Beanutts Games</span>
          <h1 className={styles.title}>About the studio</h1>
          <p className={styles.text}>
            Beanutts Games is a solo indie studio focused on slow-burn,
            atmospheric horror. No jump-scare gimmicks for the sake of it — just
            dread that builds, and stories that sit with you after the credits
            roll.
          </p>
          <p className={styles.text}>
            Right now, all the effort is going into{" "}
            <strong>The Last Wait</strong>, a hospital-set horror experience
            about holding on to hope while reality slips away.
          </p>
          <p className={styles.text}>
            This is a one-person operation, built in public. Following along on
            the news page or socials is the best way to see how it all comes
            together.
          </p>
        </div>
      </div>
    </section>
  );
}
