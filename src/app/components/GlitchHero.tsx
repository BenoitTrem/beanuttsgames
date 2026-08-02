"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

type GlitchHeroProps = {
  folder: string;
  title: string;
  className?: string;
};

const IMAGES = ["Pip_2.png", "Pip_3.png", "Pip_4.png"];

export default function GlitchHero({
  folder,
  title,
  className,
}: GlitchHeroProps) {
  const [current, setCurrent] = useState(IMAGES[0]);
  const [isGlitching, setIsGlitching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const scheduleNextGlitch = () => {
      const delay = 3000 + Math.random() * 6000;
      timeoutRef.current = setTimeout(runGlitch, delay);
    };

    const runGlitch = () => {
      setIsGlitching(true);
      let ticks = 0;
      const maxTicks = 6 + Math.floor(Math.random() * 6);

      intervalRef.current = setInterval(
        () => {
          ticks += 1;
          const next = IMAGES[Math.floor(Math.random() * IMAGES.length)];
          setCurrent(next);

          if (ticks >= maxTicks) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setCurrent(IMAGES[0]);
            setIsGlitching(false);
            scheduleNextGlitch();
          }
        },
        60 + Math.random() * 70,
      );
    };

    scheduleNextGlitch();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const glitchStyle: CSSProperties | undefined = isGlitching
    ? {
        filter: "hue-rotate(12deg) saturate(1.5) contrast(1.15)",
        transform: `translate(${(Math.random() - 0.5) * 8}px, ${(Math.random() - 0.5) * 5}px)`,
      }
    : undefined;

  return (
    <Image
      src={`/images/games/${folder}/${current}`}
      alt={`${title} splash art`}
      fill
      sizes="100vw"
      priority
      className={className}
      style={glitchStyle}
    />
  );
}
