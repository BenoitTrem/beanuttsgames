import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Gamepad2, ExternalLink, AlertTriangle, ArrowLeft } from "lucide-react";
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
    descriptionParagraphs,
    closingLines,
    controls,
    contentWarning,
    tags,
    status,
    steamUrl,
    itchUrl,
    folder,
    screenshotCount,
  } = game;

  const shot = (n: number) =>
    `/images/games/${folder}/Game_ScreenShot_${n}.png`;

  const editorialShotNumbers = [1, 12, 10];

  const galleryShots = Array.from(
    { length: screenshotCount },
    (_, i) => i + 1,
  ).filter((n) => !editorialShotNumbers.includes(n));

  return (
    <article>
      {/* ---------------- Hero ---------------- */}
      <div className={styles.detailHero}>
        <Image
          src={`/images/games/${folder}/Pip.png`}
          alt={`${title} splash art`}
          fill
          sizes="100vw"
          priority
          className={styles.detailHeroImg}
        />
        <div className={styles.detailHeroOverlay} />

        <div className={`container ${styles.detailHeroContent}`}>
          <Link href="/games" className={styles.detailBack}>
            <ArrowLeft size={14} />
            Back to games
          </Link>

          <span className={styles.status}>
            <span className={styles.dot} />
            {status}
          </span>

          <h1 className={styles.detailTitle}>{title}</h1>

          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.detailHeroActions}>
            <a
              href={steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cardBtn} ${styles.cardBtnPrimary}`}
            >
              <Gamepad2 size={14} />
              Steam
            </a>
            <a
              href={itchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cardBtn} ${styles.cardBtnSecondary}`}
            >
              <ExternalLink size={14} />
              Itch.io
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        {/* ---------------- Alternating editorial sections ---------------- */}
        <div className={styles.editorial}>
          {descriptionParagraphs.map((paragraph, i) => (
            <div
              key={i}
              className={`${styles.editorialRow} ${
                i % 2 === 1 ? styles.editorialRowReverse : ""
              }`}
            >
              <div className={styles.editorialText}>
                <span className={styles.editorialIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{paragraph}</p>
              </div>

              <div
                className={`${styles.editorialImage} ${
                  i === 1 ? styles.editorialImageTall : ""
                }`}
              >
                <Image
                  src={shot(editorialShotNumbers[i])}
                  alt={`${title} screenshot ${editorialShotNumbers[i]}`}
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- Pull quote ---------------- */}
        <div className={styles.pullQuote}>
          {closingLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {/* ---------------- Controls ---------------- */}
        <div className={styles.controlsSection}>
          <span className={styles.eyebrow}>Controls</span>
          <div className={styles.controlsGrid}>
            {controls.map((c) => (
              <div key={c.action} className={styles.controlRow}>
                <kbd className={styles.controlKey}>{c.key}</kbd>
                <span className={styles.controlAction}>{c.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Warning ---------------- */}
        <div className={styles.warningBox}>
          <AlertTriangle size={20} className={styles.warningIcon} />
          <p>{contentWarning}</p>
        </div>

        {/* ---------------- Gallery ---------------- */}
        {galleryShots.length > 0 && (
          <div className={styles.gallery}>
            {galleryShots.map((n, i) => (
              <div
                key={n}
                className={`${styles.galleryItem} ${
                  i % 5 === 0 ? styles.galleryItemWide : ""
                }`}
              >
                <Image
                  src={shot(n)}
                  alt={`${title} screenshot ${n}`}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
