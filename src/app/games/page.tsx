import styles from "./games.module.css";
import GameCard from "../components/GameCard";
import { games } from "../../lib/games";

export default function Games() {
  return (
    <section>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Beanutts Games</span>
          <h1 className={styles.headerTitle}>Games</h1>
          <p className={styles.headerSubtitle}>Everything I&apos;m building.</p>
        </div>

        <div className={styles.grid}>
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
