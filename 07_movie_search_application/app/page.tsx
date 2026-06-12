"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { searchMovies, getTrending } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import styles from "./page.module.css";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  overview: string;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchMovies = useCallback(
    async (q: string, pg: number, append = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError("");
        const data = q.trim()
          ? await searchMovies(q, pg)
          : await getTrending(pg);
        setMovies((prev) =>
          append ? [...prev, ...data.results] : data.results,
        );
        setTotalPages(data.total_pages);
      } catch {
        setError("Failed to fetch movies. Check your API key.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setPage(1);
      setIsSearching(!!query.trim());
      fetchMovies(query, 1);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, fetchMovies]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchMovies(query, next, true);
  };

  return (
    <div className={styles.page}>
      {/* ── Hero / Navbar ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎬</span>
            <span className={styles.logoText}>CineSearch</span>
          </div>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search movies, titles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => setQuery("")}>
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Section title ── */}
      <main className={styles.main}>
        <div className={styles.sectionTitle}>
          <div className={styles.titleLeft}>
            <span className={styles.titleBar} />
            <h2>
              {isSearching ? `Results for "${query}"` : "Trending This Week"}
            </h2>
          </div>
          {!loading && (
            <span className={styles.resultCount}>{movies.length} movies</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorBox}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className={styles.grid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        )}

        {/* Movies grid */}
        {!loading && movies.length > 0 && (
          <div className={styles.grid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && movies.length === 0 && !error && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🎭</div>
            <p className={styles.emptyTitle}>No movies found</p>
            <p className={styles.emptySub}>Try a different search term</p>
          </div>
        )}

        {/* Load more */}
        {!loading && movies.length > 0 && page < totalPages && (
          <div className={styles.loadMoreWrap}>
            <button
              className={styles.loadMoreBtn}
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <span className={styles.spinner} /> Loading...
                </>
              ) : (
                "Load More Movies"
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
