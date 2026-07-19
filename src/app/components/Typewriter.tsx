"use client";

import { useEffect, useState } from "react";
import styles from "../home.module.css";

export default function Typewriter({
  text,
  speed = 45,
}: {
  text: string;
  speed?: number;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <>
      {shown}
      <span className={styles.cursor} />
    </>
  );
}
