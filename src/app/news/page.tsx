import type { Metadata } from "next";
import styles from "./news.module.css";

export const metadata: Metadata = {
  title: "News",
  description:
    "Updates, devlogs, and progress on The Last Wait and other projects from Beanutts Games.",
  openGraph: {
    title: "News — Beanutts Games",
    description:
      "Updates, devlogs, and progress on The Last Wait and other projects from Beanutts Games.",
    url: "/news",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News — Beanutts Games",
    description:
      "Updates, devlogs, and progress on The Last Wait and other projects from Beanutts Games.",
  },
  alternates: {
    canonical: "/news",
  },
};

type PostLink = {
  label: string;
  url: string;
};

type Post = {
  date: string;
  title: string;
  body: string;
  links?: PostLink[];
};

const posts: Post[] = [
  {
    date: "July 2026",
    title: "Official trailer is here",
    body: "The first official trailer for The Last Wait is live. Watch it to get a first look at the atmosphere I've been building.",
    links: [
      {
        label: "Watch the trailer",
        url: "https://www.youtube.com/@BeanuttsGames",
      },
    ],
  },
  {
    date: "July 2026",
    title: "Join the Discord",
    body: "A Discord server is now open for anyone following the project. Come chat, share feedback, and get the earliest updates.",
    links: [
      { label: "Join the Discord", url: "https://discord.gg/67tRE3TjMr" },
    ],
  },
  {
    date: "December 2025",
    title: "The Steam page is live",
    body: "The Last Wait now has an official Steam page. Wishlist it to help support the project and get notified when it releases.",
    links: [
      {
        label: "Wishlist on Steam",
        url: "https://store.steampowered.com/app/4165280/The_Last_Wait/",
      },
    ],
  },
  {
    date: "July 2025",
    title: "Development has begun",
    body: "The Last Wait is officially in production. Follow along here for updates as the project takes shape.",
  },
];

export default function News() {
  return (
    <section>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Beanutts Games</span>
          <h1 className={styles.headerTitle}>News</h1>
          <p className={styles.headerSubtitle}>
            Updates, progress, and the occasional bad idea.
          </p>
        </div>

        <div className={styles.list}>
          {posts.map((post) => (
            <article key={post.title} className={styles.post}>
              <span className={styles.date}>{post.date}</span>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postBody}>{post.body}</p>

              {post.links && post.links.length > 0 && (
                <div className={styles.postLinks}>
                  {post.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.postLink}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
