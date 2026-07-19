import Image from "next/image";
import Link from "next/link";
import { Info, Gamepad2, ExternalLink } from "lucide-react";
import styles from "@/app/games/games.module.css";
import type { Game } from "@/lib/games";

export default function GameCard({ game }: { game: Game }) {
  const { slug, title, tagline, tags, status, steamUrl, itchUrl, folder } =
    game;

  return (
    <div className={styles.card}>
      <div className={styles.cover}>
        <Image
          src={`/images/games/${folder}/Game_Splash.png`}
          alt={`${title} splash art`}
          fill
          priority
        />
      </div>

      <div className={styles.body}>
        <span className={styles.status}>
          <span className={styles.dot} />
          {status}
        </span>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{tagline}</p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.cardActions}>
          <Link href={`/games/${slug}`} className={styles.cardBtn}>
            <Info size={14} />
            Learn more
          </Link>
          <a
            href={steamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardBtn}
          >
            <Gamepad2 size={14} />
            Steam
          </a>
          <a
            href={itchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardBtn}
          >
            <ExternalLink size={14} />
            Itch.io
          </a>
        </div>
      </div>
    </div>
  );
}
