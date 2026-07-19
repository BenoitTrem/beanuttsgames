import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "@/app/games/games.module.css";
import { games, getGame } from "@/lib/games";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return {};

  return {
    title: `${game.title} — Beanutts Games`,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.description,
      images: [`/images/games/${game.folder}/Game_Splash.png`],
    },
  };
}

export default async function GameDetail({ params }: Props) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const {
    title,
    description,
    tags,
    status,
    steamUrl,
    folder,
    screenshotCount,
  } = game;
  const screenshots = Array.from({ length: screenshotCount }, (_, i) => i + 1);

  return (
    <section>
      <div className="container">
        <Link href="/games" className={styles.detailBack}>
          ← Back to games
        </Link>

        <div className={styles.splash}>
          <Image
            src={`/images/games/${folder}/Game_Splash.png`}
            alt={`${title} splash art`}
            fill
            sizes="100vw"
            priority
          />
        </div>

        <div className={styles.detailHead}>
          <div>
            <span className={styles.status}>
              <span className={styles.dot} />
              {status}
            </span>
            <h1 className={styles.detailTitle}>{title}</h1>
          </div>

          <a
            href={steamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View on Steam →
          </a>
        </div>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className={styles.detailDescription}>{description}</p>

        <div className={styles.screenshots}>
          {screenshots.map((n) => (
            <div key={n} className={styles.screenshot}>
              <Image
                src={`/images/games/${folder}/Game_ScreenShot_${n}.png`}
                alt={`${title} screenshot ${n}`}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
