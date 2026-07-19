import styles from "./news.module.css";

type Post = {
  date: string;
  title: string;
  body: string;
};

const posts: Post[] = [
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
