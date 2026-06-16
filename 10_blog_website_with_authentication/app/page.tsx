"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const CATEGORIES = [
  "All",
  "Technology",
  "Design",
  "Development",
  "Career",
  "Life",
  "Tutorial",
];

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category !== "All") params.set("category", category);
      const res = await fetch(`/api/posts?${params}`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchPosts();
  }, [search, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroTag}>✍️ Welcome to DevNotes</span>
          <h1 className={styles.heroTitle}>
            Ideas worth
            <br />
            <span className={styles.heroAccent}>reading.</span>
          </h1>
          <p className={styles.heroSub}>
            Stories, tutorials, and insights from developers around the world.
          </p>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search articles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className={styles.searchBtn} type="submit">
              Search
            </button>
          </form>
        </div>
      </section>

      <main className={styles.main}>
        {/* Category tabs */}
        <div className={styles.catWrap}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`${styles.catBtn} ${category === c ? styles.catActive : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.skeletonGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📭</div>
            <p className={styles.emptyTitle}>No posts found</p>
            <p className={styles.emptySub}>
              Try a different search or category
            </p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && !search && category === "All" && (
              <div className={styles.featuredWrap}>
                <p className={styles.featuredLabel}>✦ Featured</p>
                <PostCard post={featured} featured />
              </div>
            )}
            {/* Grid */}
            <div className={styles.grid}>
              {(search || category !== "All" ? posts : rest).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
