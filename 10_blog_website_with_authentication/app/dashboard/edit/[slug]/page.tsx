"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PostEditor from "@/components/PostEditor";
import styles from "../../new/new.module.css";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        setPost(d);
        setLoading(false);
      });
  }, [slug]);

  if (status === "loading" || loading) return null;
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Edit Post</h1>
          <p className={styles.sub}>Update your post</p>
        </div>
        {post && <PostEditor initialData={post} isEdit />}
      </main>
    </div>
  );
}
