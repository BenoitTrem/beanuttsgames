import styles from "./about.module.css";

export default function About() {
  return (
    <section>
      <div className="container">
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Beanutts Games</span>
          <h1 className={styles.title}>About the studio</h1>
          <div className={styles.textsection}>
            <p className={styles.text}>
              Beanutts Games is a solo indie game studio focused on creating
              atmospheric psychological horror experiences that immerse players
              through storytelling, tension, and carefully crafted environments.
            </p>

            <p className={styles.text}>
              Every project is developed independently. As a self-taught
              developer, everything I&apos;ve learned has come through
              curiosity, practice, and countless hours of experimentation, and I
              continue to grow with every game I create.
            </p>

            <p className={styles.text}>
              I&apos;m currently developing <strong>The Last Wait</strong>, a
              first-person psychological horror game set in a hospital where
              reality, memory, and fear slowly become impossible to separate.
            </p>

            <p className={styles.text}>
              I occasionally share development updates and news about current
              and future projects here and on social media. Thank you for
              following the journey and supporting independent game development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
