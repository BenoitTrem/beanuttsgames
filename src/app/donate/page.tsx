import type { Metadata } from "next";
import styles from "./donate.module.css";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Beanutts Games, a solo indie studio making atmospheric horror games. Donation options coming soon.",
  openGraph: {
    title: "Donate — Beanutts Games",
    description:
      "Support Beanutts Games, a solo indie studio making atmospheric horror games. Donation options coming soon.",
    url: "/donate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate — Beanutts Games",
    description:
      "Support Beanutts Games, a solo indie studio making atmospheric horror games. Donation options coming soon.",
  },
  alternates: {
    canonical: "/donate",
  },
};

export default function Donate() {
  return (
    <section>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Beanutts Games</span>
          <h1 className={styles.title}>Support the studio</h1>
          <div className={styles.textsection}>
            <p className={styles.subtitle}>
              Not available yet — check back soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
