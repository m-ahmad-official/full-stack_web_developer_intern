const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";
export const IMG_LARGE = "https://image.tmdb.org/t/p/original";

export async function searchMovies(query: string, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getTrending(page = 1) {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getMovieDetails(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );
  if (!res.ok) throw new Error("Movie not found");
  return res.json();
}

export async function getGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
}
