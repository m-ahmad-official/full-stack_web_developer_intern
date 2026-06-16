"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import PostEditor from "@/components/PostEditor";
import styles from "../new/new.module.css";

export default function NewPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);
  if (status === "loading" || !session) return null;
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>New Post</h1>
          <p className={styles.sub}>Write something amazing</p>
        </div>
        <PostEditor />
      </main>
    </div>
  );
}
