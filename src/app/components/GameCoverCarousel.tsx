"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/app/games/games.module.css";

type Props = {
  folder: string;
  title: string;
  frames: string[];
};

export default function GameCoverCarousel({
  folder,
  title,
  frames = [],
}: Props) {
  const frameCount = frames.length;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (hovering || reduceMotion || frameCount <= 1) return;

    autoplayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % frameCount);
    }, 2600);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [hovering, frameCount]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!coverRef.current || frameCount <= 1) return;
    const rect = coverRef.current.getBoundingClientRect();
    const ratio = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      0.999,
    );
    setActive(Math.floor(ratio * frameCount));
  }

  return (
    <div
      ref={coverRef}
      className={styles.cover}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {frames.map((filename, i) => (
        <div
          key={filename}
          className={`${styles.coverFrame} ${i === active ? styles.coverFrameActive : ""}`}
        >
          <Image
            src={`/images/games/${folder}/${filename}`}
            alt={i === 0 ? `${title} splash art` : `${title} screenshot ${i}`}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
            priority={i === 0}
          />
        </div>
      ))}

      {frameCount > 1 && (
        <>
          <div className={styles.coverTicks}>
            {frames.map((filename, i) => (
              <span
                key={filename}
                className={`${styles.coverTick} ${i <= active ? styles.coverTickFilled : ""}`}
              />
            ))}
          </div>
          <span className={styles.coverCounter}>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(frameCount).padStart(2, "0")}
          </span>
        </>
      )}
    </div>
  );
}
