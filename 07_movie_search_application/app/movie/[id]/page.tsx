import { getMovieDetails, IMG_BASE, IMG_LARGE } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import styles from "./movie.module.css";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let movie: any = null;
  let error = false;

  try {
    movie = await getMovieDetails(id);
  } catch {
    error = true;
  }

  if (error || !movie) {
    return (
      <div className={styles.errorPage}>
        <p>Movie not found.</p>
        <Link href="/" className={styles.backBtn}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube",
  );
  const director = movie.credits?.crew?.find((c: any) => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 8) ?? [];
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";

  return (
    <div className={styles.page}>
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className={styles.backdrop}>
          <Image
            src={`${IMG_LARGE}${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className={styles.backdropImg}
            priority
          />
          <div className={styles.backdropOverlay} />
        </div>
      )}

      {/* Back button */}
      <Link href="/" className={styles.backBtn}>
        ← Back
      </Link>

      <div className={styles.content}>
        {/* Poster + info */}
        <div className={styles.topSection}>
          <div className={styles.posterWrap}>
            {movie.poster_path ? (
              <Image
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className={styles.poster}
                priority
              />
            ) : (
              <div className={styles.noPoster}>🎬</div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.genres}>
              {movie.genres?.map((g: any) => (
                <span key={g.id} className={styles.genreBadge}>
                  {g.name}
                </span>
              ))}
            </div>
            <h1 className={styles.title}>{movie.title}</h1>
            {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

            <div className={styles.meta}>
              <div className={styles.rating}>
                <span className={styles.ratingNum}>
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span className={styles.ratingCount}>
                  ({movie.vote_count?.toLocaleString()} votes)
                </span>
              </div>
              <span className={styles.metaDot}>·</span>
              <span>{movie.release_date?.split("-")[0]}</span>
              <span className={styles.metaDot}>·</span>
              <span>{runtime}</span>
              {director && (
                <>
                  <span className={styles.metaDot}>·</span>
                  <span>Dir. {director.name}</span>
                </>
              )}
            </div>

            <p className={styles.overview}>{movie.overview}</p>

            {trailer && (
              <a
                href={`https://youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className={styles.trailerBtn}
              >
                ▶ Watch Trailer
              </a>
            )}
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.titleBar} />
              <h2>Top Cast</h2>
            </div>
            <div className={styles.castGrid}>
              {cast.map((actor: any) => (
                <div key={actor.id} className={styles.castCard}>
                  {actor.profile_path ? (
                    <Image
                      src={`${IMG_BASE}${actor.profile_path}`}
                      alt={actor.name}
                      width={80}
                      height={80}
                      className={styles.castImg}
                    />
                  ) : (
                    <div className={styles.castNoImg}>👤</div>
                  )}
                  <p className={styles.castName}>{actor.name}</p>
                  <p className={styles.castChar}>{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
