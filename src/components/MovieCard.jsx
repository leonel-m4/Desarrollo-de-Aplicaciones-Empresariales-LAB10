export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <article className="movie-card" aria-label={`Película ${movie.title}`}>
      <div className="poster-wrap" style={{ "--poster-color": movie.color }}>
        <img src={movie.poster} alt={`Póster ilustrado de ${movie.title}`} loading="lazy" width="400" height="560" />
        <span className="movie-rating"><span aria-hidden="true">★</span> {movie.rating.toFixed(1)}</span>
        <button type="button" className={`heart-button ${isFavorite ? "is-favorite" : ""}`} aria-label={`${isFavorite ? "Quitar" : "Añadir"} ${movie.title} ${isFavorite ? "de" : "a"} favoritas`} aria-pressed={isFavorite} onClick={() => onToggleFavorite(movie)}>
          <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
        </button>
        <p className="poster-overview">{movie.overview}</p>
      </div>
      <div className="movie-card-info"><h3>{movie.title}</h3><p>{movie.year}<span>·</span>{movie.genre}<span>·</span>{movie.duration} min</p></div>
    </article>
  );
}
