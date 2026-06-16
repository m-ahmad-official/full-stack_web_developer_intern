import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDate } from "@/lib/utils";
import styles from "./post.module.css";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) notFound();
  const post = await res.json();

  return (
    <div className={styles.page}>
      <Navbar />
      <article className={styles.article}>
        {/* Header */}
        <div className={styles.articleHeader}>
          {post.category && (
            <span className={styles.category}>{post.category}</span>
          )}
          <h1 className={styles.title}>{post.title}</h1>
          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          <div className={styles.meta}>
            <div className={styles.authorWrap}>
              <div className={styles.avatar}>
                {post.author?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className={styles.authorName}>{post.author?.name}</div>
                {post.author?.bio && (
                  <div className={styles.authorBio}>{post.author.bio}</div>
                )}
              </div>
            </div>
            <div className={styles.metaRight}>
              <span>{formatDate(post.createdAt)}</span>
              <span>·</span>
              <span>⏱ {post.readTime} min read</span>
              <span>·</span>
              <span>👁 {post.views} views</span>
            </div>
          </div>
        </div>

        {/* Cover */}
        {post.coverImage && (
          <div className={styles.cover}>
            <img
              src={post.coverImage}
              alt={post.title}
              className={styles.coverImg}
            />
          </div>
        )}

        {/* Content */}
        <div
          className={`${styles.content} prose`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((t: string) => (
              <span key={t} className={styles.tag}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </article>
      <Footer />
    </div>
  );
}
