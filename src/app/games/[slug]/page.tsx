import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Gamepad2, ExternalLink, AlertTriangle, ArrowLeft } from "lucide-react";
import styles from "@/app/games/games.module.css";
import { games, getGame } from "@/lib/games";
import FeedMosaic from "./ImageGroup";

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

  const title = `${game.title} — Beanutts Games`;
  const ogImage = `/images/games/${game.folder}/Game_Splash.png`;

  return {
    title: game.title,
    description: game.tagline,
    openGraph: {
      title,
      description: game.tagline,
      url: `/games/${game.slug}`,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${game.title} splash art`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: game.tagline,
      images: [ogImage],
    },
    alternates: { canonical: `/games/${game.slug}` },
  };
}

function chunk<T>(arr: T[], parts: number): T[][] {
  if (parts <= 0) return [arr];
  const size = Math.ceil(arr.length / parts);
  return Array.from({ length: parts }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
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
    steamUrl,
    itchUrl,
    folder,
  } = game;

  const mosaicSets: { hero: string; small: [string, string] }[] = [
    {
      hero: "Game_ScreenShot_10.png",
      small: ["Game_ScreenShot_12.png", "Game_ScreenShot_11.png"],
    },
    {
      hero: "Game_ScreenShot_2.png",
      small: ["Game_ScreenShot_1.png", "Game_ScreenShot_4.png"],
    },
    {
      hero: "Game_ScreenShot_8.png",
      small: ["Game_ScreenShot_5.png", "Game_ScreenShot_3.png"],
    },
  ];

  const finalSet: { hero: string; small: [string, string] } = {
    hero: "Game_ScreenShot_9.png",
    small: ["Game_ScreenShot_6.png", "Game_ScreenShot_7.png"],
  };

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

          <h1 className={styles.detailTitle}>{title}</h1>

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
        <div className={styles.caseLog}>
          {descriptionParagraphs.map((paragraph, i) => (
            <div
              key={i}
              className={`${styles.logRow} ${i % 2 === 1 ? styles.logRowReverse : ""}`}
            >
              <div className={styles.logText}>
                <span className={styles.logIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{paragraph}</p>
              </div>

              <FeedMosaic
                folder={folder}
                title={title}
                hero={mosaicSets[i].hero}
                small={mosaicSets[i].small}
                reversed={i % 2 === 1}
              />
            </div>
          ))}
        </div>

        {/* ---------------- Pull quote ---------------- */}
        <div className={styles.pullQuote}>
          {closingLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {/* ---------------- Final image set ---------------- */}
        <div className={styles.finalGallery}>
          {[finalSet.hero, ...finalSet.small].map((filename) => (
            <div key={filename} className={styles.finalTile}>
              <Image
                src={`/images/games/${folder}/${filename}`}
                alt={`${title} screenshot`}
                fill
                sizes="(max-width: 760px) 100vw, 32vw"
                className={styles.finalImg}
              />
            </div>
          ))}
        </div>

        {/* ---------------- Languages ---------------- */}
        <div className={styles.languagesSection}>
          <span className={styles.eyebrow}>Available languages</span>
          <div className={styles.tags_2}>
            {[
              "English",
              "French",
              "Spanish",
              "Dutch",
              "Russian",
              "Japanese",
              "Chinese (Simplified)",
              "Portuguese (Brazil)",
            ].map((lang) => (
              <span key={lang} className={styles.tag_2}>
                {lang}
              </span>
            ))}
          </div>
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
      </div>
    </article>
  );
}
