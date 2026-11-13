import { useCallback, useEffect, useRef, useState } from "react";
import MovieHeader from "./components/MovieHeader";
import MovieBanner from "./components/MovieBanner";
import MovieCard from "./components/MovieCard";
import PremieresSection from "./components/PremieresSection";
import Toast from "./components/Toast";
import useDebounce from "./hooks/useDebounce";
import useWindowSize from "./hooks/useWindowSize";
import { rawMovies } from "./data/movies";
import { adaptMovie } from "./lib/movieAdapter";

const movies = rawMovies.map(adaptMovie);
const genres = ["Todas", ...new Set(movies.map((movie) => movie.genre))];
const STORAGE_KEY = "cineclub-favorites";

function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? [...new Set(value.filter((id) => movies.some((movie) => movie.id === id)))] : [];
  } catch { return []; }
}

export default function App() {
  const [favorites, setFavorites] = useState(readFavorites);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Todas");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [notification, setNotification] = useState(null);
  const sequence = useRef(0);
  const quietQuery = useDebounce(query, 300);
  const { width } = useWindowSize();
  const columns = width < 560 ? 1 : width < 800 ? 2 : width < 1120 ? 3 : 4;
  const dismissToast = useCallback(() => setNotification(null), []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)); } catch { /* Storage can be unavailable in private contexts. */ }
  }, [favorites]);

  function toggleFavorite(movie) {
    const removing = favorites.includes(movie.id);
    setFavorites((current) => removing ? current.filter((id) => id !== movie.id) : [...new Set([...current, movie.id])]);
    setNotification({ id: ++sequence.current, message: `${movie.title}: ${removing ? "eliminada de" : "añadida a"} tus favoritas.` });
  }
  function clearFilters() {
    setQuery("");
    setGenre("Todas");
    setOnlyFavorites(false);
  }
  function showFavorites() {
    setOnlyFavorites((value) => !value);
    document.getElementById("cartelera")?.scrollIntoView?.({ behavior: "smooth" });
  }
  const needle = quietQuery.trim().toLocaleLowerCase("es");
  const visible = movies.filter((movie) =>
    movie.title.toLocaleLowerCase("es").includes(needle) &&
    (genre === "Todas" || movie.genre === genre) &&
    (!onlyFavorites || favorites.includes(movie.id))
  );
  const hasFilters = query !== "" || genre !== "Todas" || onlyFavorites;

  return (
    <div className="cinema-app" id="inicio">
      <MovieHeader favoriteCount={favorites.length} onlyFavorites={onlyFavorites} onShowFavorites={showFavorites} />
      <main className="cinema-main">
        <MovieBanner hasFilters={hasFilters} onClearFilters={clearFilters} />
        <section className="now-showing" id="cartelera" aria-labelledby="movies-title">
          <div className="section-heading"><div><p className="eyebrow">ELIGE TU PRÓXIMO PLAN</p><h2 id="movies-title">{onlyFavorites ? "Tus favoritas" : "En cartelera"}<span className="accent-dot">.</span></h2></div><p className="result-count" role="status">{visible.length} {visible.length === 1 ? "película" : "películas"} para descubrir</p></div>
          <div className="movie-filters">
            <div className="genre-filters" role="group" aria-label="Filtrar por género">{genres.map((item) => <button key={item} type="button" aria-pressed={genre === item} className={genre === item ? "selected" : ""} onClick={() => setGenre(item)}>{item}</button>)}</div>
            <label className="movie-search"><span aria-hidden="true">⌕</span><span className="sr-only">Buscar película</span><input type="search" placeholder="Buscar una película…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          </div>
          <div className="movie-grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} data-columns={columns}>
            {visible.map((movie) => <MovieCard key={movie.id} movie={movie} isFavorite={favorites.includes(movie.id)} onToggleFavorite={toggleFavorite} />)}
          </div>
          {visible.length === 0 && <div className="movie-empty"><span aria-hidden="true">⌕</span><h3>No encontramos películas</h3><p>Prueba otra búsqueda o guarda alguna favorita.</p><button className="cinema-button" type="button" onClick={clearFilters}>Limpiar filtros</button></div>}
        </section>
        <PremieresSection />
      </main>
      <footer className="cinema-footer"><a className="cinema-brand" href="#inicio">cineclub<span className="brand-dot">●</span></a><p>Historias que merecen tu tiempo.</p><span>LAB 11 · HECHO CON AMOR POR EL CINE</span></footer>
      <Toast notification={notification} onDismiss={dismissToast} />
    </div>
  );
}
