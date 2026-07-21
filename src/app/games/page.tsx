import type { Metadata } from "next";
import styles from "./games.module.css";
import GameCard from "../components/GameCard";
import { games } from "../../lib/games";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Every game from Beanutts Games, including The Last Wait — a psychological horror game set in a hospital where reality slowly slips away.",
  openGraph: {
    title: "Games — Beanutts Games",
    description:
      "Every game from Beanutts Games, including The Last Wait — a psychological horror game set in a hospital where reality slowly slips away.",
    url: "/games",
    type: "website",
    images: [
      {
        url: "/images/games/the-last-wait/Game_Splash.png",
        width: 1200,
        height: 630,
        alt: "The Last Wait — game splash art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Games — Beanutts Games",
    description:
      "Every game from Beanutts Games, including The Last Wait — a psychological horror game set in a hospital where reality slowly slips away.",
    images: ["/images/games/the-last-wait/Game_Splash.png"],
  },
  alternates: {
    canonical: "/games",
  },
};

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
