import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import MovieCard from "../components/MovieCard";
import MovieHeader from "../components/MovieHeader";
import { adaptMovie } from "../lib/movieAdapter";
import { rawMovies } from "../data/movies";

const movieRegion = () => screen.getByRole("region", { name: /en cartelera|tus favoritas/i });
const movieCards = () => within(movieRegion()).queryAllByRole("article");
const tick = (ms) => act(() => { vi.advanceTimersByTime(ms); });

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value: 1280 });
});
afterEach(() => { vi.useRealTimers(); });

describe("Cartelera · adaptador y componentes desacoplados", () => {
  it("adapta los campos externos sin modificar la película original", () => {
    const raw = Object.freeze({ id: 42, original_title: "Prueba", release_date: "2026-11-20", runtime: 95, vote_average: "8.4", poster_path: "/poster.svg" });
    expect(adaptMovie(raw)).toMatchObject({ id: "42", title: "Prueba", year: "2026", duration: 95, rating: 8.4, poster: "/poster.svg" });
    expect(raw).not.toHaveProperty("year");
  });
  it("tolera campos ausentes y normaliza valoraciones inválidas", () => {
    expect(adaptMovie()).toMatchObject({ title: "Sin título", year: "Por anunciar", rating: 0 });
    expect(adaptMovie({ vote_average: "no" }).rating).toBe(0);
    expect(adaptMovie({ vote_average: 99 }).rating).toBe(10);
  });
  it("la tarjeta solo comunica el evento, sin mostrar avisos por su cuenta", () => {
    const movie = adaptMovie(rawMovies[0]);
    const onToggleFavorite = vi.fn();
    render(<MovieCard movie={movie} isFavorite={false} onToggleFavorite={onToggleFavorite} />);
    fireEvent.click(screen.getByRole("button", { name: /añadir interestelar/i }));
    expect(onToggleFavorite).toHaveBeenCalledWith(movie);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
  it("la cabecera se puede representar recibiendo solo el contador", () => {
    render(<MovieHeader favoriteCount={3} />);
    expect(screen.getByLabelText("Cantidad de favoritas")).toHaveTextContent("3");
  });
});

describe("Cartelera · integración", () => {
  it("muestra ocho películas adaptadas y los estrenos tras la carga", () => {
    render(<App />);
    expect(movieCards()).toHaveLength(8);
    expect(screen.getByRole("status", { name: "Cargando estrenos" })).toBeInTheDocument();
    tick(900);
    expect(screen.queryByRole("status", { name: "Cargando estrenos" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Carrusel de estrenos")).toBeInTheDocument();
  });
  it("marca y desmarca favoritas, muestra ambos avisos y actualiza el contador", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /añadir interestelar/i }));
    expect(screen.getByLabelText("Cantidad de favoritas")).toHaveTextContent("1");
    expect(screen.getByText("Interestelar: añadida a tus favoritas.")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("cineclub-favorites"))).toEqual(["1"]);
    fireEvent.click(screen.getByRole("button", { name: /quitar interestelar/i }));
    expect(screen.getByLabelText("Cantidad de favoritas")).toHaveTextContent("0");
    expect(screen.getByText("Interestelar: eliminada de tus favoritas.")).toBeInTheDocument();
    tick(3200);
    expect(screen.queryByText("Interestelar: eliminada de tus favoritas.")).not.toBeInTheDocument();
  });
  it("el input cambia al instante y el filtro espera 300 ms; el banner limpia ambos", () => {
    render(<App />);
    const input = screen.getByRole("searchbox", { name: "Buscar película" });
    fireEvent.change(input, { target: { value: "Dune" } });
    expect(input).toHaveValue("Dune");
    expect(movieCards()).toHaveLength(8);
    tick(299);
    expect(movieCards()).toHaveLength(8);
    tick(1);
    expect(movieCards()).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: /limpiar filtros/i }));
    expect(input).toHaveValue("");
    tick(300);
    expect(movieCards()).toHaveLength(8);
  });
  it("una búsqueda vacía de resultados se recupera sin perder favoritas", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /añadir interestelar/i }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "zzzz" } });
    tick(300);
    expect(screen.getByText("No encontramos películas")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Limpiar filtros" }));
    tick(300);
    expect(movieCards()).toHaveLength(8);
    expect(screen.getByLabelText("Cantidad de favoritas")).toHaveTextContent("1");
  });
  it("filtra por género y favoritas sin modificar el contador", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /añadir interestelar/i }));
    fireEvent.click(screen.getByRole("button", { name: /mis favoritas/i }));
    expect(movieCards()).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Animación" }));
    expect(movieCards()).toHaveLength(0);
    expect(screen.getByLabelText("Cantidad de favoritas")).toHaveTextContent("1");
    fireEvent.click(screen.getAllByRole("button", { name: /limpiar filtros/i })[0]);
    expect(movieCards()).toHaveLength(8);
  });
  it("restaura favoritas válidas y tolera almacenamiento corrupto", () => {
    localStorage.setItem("cineclub-favorites", '["1","1","no-existe"]');
    const view = render(<App />);
    expect(screen.getByLabelText("Cantidad de favoritas")).toHaveTextContent("1");
    view.unmount();
    localStorage.setItem("cineclub-favorites", "{roto");
    render(<App />);
    expect(screen.getByLabelText("Cantidad de favoritas")).toHaveTextContent("0");
  });
  it("el ancho controla una, dos, tres o cuatro columnas", () => {
    const { container } = render(<App />);
    const grid = container.querySelector(".movie-grid");
    for (const [width, columns] of [[1280, 4], [1000, 3], [700, 2], [390, 1]]) {
      act(() => { window.innerWidth = width; window.dispatchEvent(new Event("resize")); });
      expect(grid).toHaveAttribute("data-columns", String(columns));
    }
  });
  it("muestra error y reintento, y se recupera al restaurar la conexión", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("checkbox", { name: /simular error/i }));
    tick(900);
    expect(screen.getByRole("alert")).toHaveTextContent("No pudimos cargar los estrenos");
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(screen.getByRole("status", { name: "Cargando estrenos" })).toBeInTheDocument();
    tick(900);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: /simular error/i }));
    tick(900);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Carrusel de estrenos")).toBeInTheDocument();
  });
});
