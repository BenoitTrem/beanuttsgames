import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import styles from "./home.module.css";
import Typewriter from "./components/Typewriter";

export default function Home() {
  const title = "Indie game studio. I make games... I think.";

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
            src="/images/BeanuttsGames_Logo_Transparent.png"
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
          <Typewriter text="One guy, way too many ideas. Follow along as I build" />
        </p>

        <div className={styles.actions}>
          <Link href="/games" className={`btn ${styles.btnGame}`}>
            <ArrowRight size={16} />
            See my games
          </Link>

          <Link
            href="/donate"
            className={`${styles.btnGame} ${styles.btnGameSecondary}`}
          >
            <Heart size={16} />
            Support me
          </Link>
        </div>
      </div>
    </section>
  );
}
