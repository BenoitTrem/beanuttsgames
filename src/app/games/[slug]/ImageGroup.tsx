import Image from "next/image";
import styles from "@/app/games/games.module.css";

type Props = {
  folder: string;
  title: string;
  hero: string;
  small: [string, string]; // exactly 2, in the order you want them shown
  reversed?: boolean;
};

export default function FeedMosaic({
  folder,
  title,
  hero,
  small,
  reversed = false,
}: Props) {
  return (
    <div
      className={`${styles.feedMosaic} ${reversed ? styles.feedMosaicReversed : ""}`}
    >
      <FeedTile
        folder={folder}
        title={title}
        filename={hero}
        className={styles.feedHero}
        sizes="(max-width: 760px) 100vw, 34vw"
      />
      {small.map((filename) => (
        <FeedTile
          key={filename}
          folder={folder}
          title={title}
          filename={filename}
          className={styles.feedSmall}
          sizes="(max-width: 760px) 50vw, 24vw"
        />
      ))}
    </div>
  );
}

function FeedTile({
  folder,
  title,
  filename,
  className,
  sizes,
}: {
  folder: string;
  title: string;
  filename: string;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`${styles.feedTile} ${className}`}>
      <Image
        src={`/images/games/${folder}/${filename}`}
        alt={`${title} screenshot`}
        fill
        sizes={sizes}
        className={styles.feedImg}
      />
      <div className={styles.feedScan} />
    </div>
  );
}
