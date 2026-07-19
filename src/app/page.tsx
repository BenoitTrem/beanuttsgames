import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
import Typewriter from "./components/Typewriter";

export default function Home() {
  const title = "Making games I'd want to play.";

  return (
    <section className={styles.hero}>
      <span className={styles.particle} />
      <span className={styles.particle} />
      <span className={styles.particle} />
      <span className={styles.particle} />
      <span className={styles.particle} />
      <span className={styles.particle} />
      <span className={styles.particle} />

      <div className="container">
        <div className={styles.logo}>
          <Image
            src="/images/BeanuttsGames_Logo.png"
            alt="Beanutts Games logo"
            fill
            sizes="220px"
            priority
          />
        </div>

        <h1 className={styles.title} data-text={title}>
          {title}
        </h1>

        <p className={styles.subtitle}>
          <Typewriter text="Small studio, dark ideas. Follow along as I build" />
        </p>

        <div className={styles.actions}>
          <Link href="/games" className="btn">
            See my games
          </Link>
          <Link href="/donate" className="btn btn-outline">
            Support me
          </Link>
        </div>
      </div>
    </section>
  );
}
