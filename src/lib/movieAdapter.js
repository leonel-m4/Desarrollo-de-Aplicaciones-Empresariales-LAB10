// Boundary between the external (snake_case) data and the application's movie model.
export function adaptMovie(raw = {}) {
  const rating = Number(raw.vote_average ?? raw.rating ?? 0);
  return {
    id: String(raw.id ?? ""),
    title: raw.title || raw.original_title || "Sin título",
    year: String(raw.release_date ?? raw.year ?? "").slice(0, 4) || "Por anunciar",
    genre: raw.genre || "Cine",
    duration: Number(raw.runtime ?? raw.duration) || 0,
    rating: Number.isFinite(rating) ? Math.min(10, Math.max(0, rating)) : 0,
    overview: raw.overview || "Una nueva historia por descubrir.",
    poster: raw.poster_path || raw.poster || "",
    color: raw.color || "#355e68",
    label: raw.label || "En cartelera",
  };
}
