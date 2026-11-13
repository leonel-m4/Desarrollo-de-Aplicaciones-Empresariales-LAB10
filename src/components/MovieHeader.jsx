export default function MovieHeader({ favoriteCount, onShowFavorites, onlyFavorites }) {
  return (
    <header className="cinema-header">
      <a className="cinema-brand" href="#inicio" aria-label="Cineclub, inicio"><span className="brand-mark">c.</span>cineclub<span className="brand-dot">●</span></a>
      <nav aria-label="Navegación principal">
        <a href="#cartelera">Cartelera</a>
        <a href="#estrenos">Estrenos</a>
      </nav>
      <button className={`favorites-button ${onlyFavorites ? "is-active" : ""}`} type="button" onClick={onShowFavorites} aria-pressed={onlyFavorites}>
        <span aria-hidden="true">♡</span> Mis favoritas <span className="favorite-count" aria-label="Cantidad de favoritas">{favoriteCount}</span>
      </button>
    </header>
  );
}
