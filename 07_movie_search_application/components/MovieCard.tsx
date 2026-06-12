"use client";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/app/page";
import { IMG_BASE } from "@/lib/tmdb";
import styles from "./MovieCard.module.css";

export default function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date?.split("-")[0] ?? "N/A";
  const rating = movie.vote_average?.toFixed(1) ?? "0.0";
  const hasImg = !!movie.poster_path;

  return (
    <Link href={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.poster}>
        {hasImg ? (
          <Image
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 130px, 180px"
            className={styles.img}
          />
        ) : (
          <div className={styles.noImg}>
            <span>🎬</span>
            <p>{movie.title}</p>
          </div>
        )}
        {/* Rating badge */}
        <div
          className={`${styles.ratingBadge} ${parseFloat(rating) >= 7 ? styles.ratingGood : parseFloat(rating) >= 5 ? styles.ratingMid : styles.ratingBad}`}
        >
          ⭐ {rating}
        </div>
        {/* Hover overlay */}
        <div className={styles.overlay}>
          <p className={styles.overlayTitle}>{movie.title}</p>
          <p className={styles.overlayOverview}>
            {movie.overview?.slice(0, 100)}...
          </p>
          <span className={styles.viewBtn}>View Details →</span>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{movie.title}</p>
        <p className={styles.year}>{year}</p>
      </div>
    </Link>
  );
}
