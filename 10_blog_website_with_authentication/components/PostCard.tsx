import Link from "next/link";
import { formatDate, truncate } from "@/lib/utils";
import styles from "./PostCard.module.css";

interface Props {
  post: any;
  featured?: boolean;
}

export default function PostCard({ post, featured }: Props) {
  const author = post.author?.name ?? "Anonymous";
  const date = formatDate(post.createdAt);

  return (
    <Link
      href={`/post/${post.slug}`}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      {/* Cover */}
      <div
        className={`${styles.cover} ${featured ? styles.coverFeatured : ""}`}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className={styles.coverImg}
          />
        ) : (
          <div className={styles.coverPlaceholder}>
            <span className={styles.placeholderIcon}>📝</span>
          </div>
        )}
        {post.category && (
          <span className={styles.categoryBadge}>{post.category}</span>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h2
          className={`${styles.title} ${featured ? styles.titleFeatured : ""}`}
        >
          {post.title}
        </h2>
        {post.excerpt && (
          <p className={styles.excerpt}>
            {truncate(post.excerpt, featured ? 200 : 120)}
          </p>
        )}
        <div className={styles.meta}>
          <div className={styles.authorWrap}>
            <div className={styles.avatar}>{author[0].toUpperCase()}</div>
            <div>
              <div className={styles.authorName}>{author}</div>
              <div className={styles.date}>{date}</div>
            </div>
          </div>
          <div className={styles.readMeta}>
            <span>⏱ {post.readTime} min</span>
            <span>👁 {post.views}</span>
          </div>
        </div>
        {post.tags?.length > 0 && (
          <div className={styles.tags}>
            {post.tags.slice(0, 3).map((t: string) => (
              <span key={t} className={styles.tag}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
