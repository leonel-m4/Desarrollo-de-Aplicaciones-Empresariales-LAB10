import { useRef } from "react";

export default function PremiereCarousel({ premieres }) {
  const track = useRef(null);
  function move(direction) {
    track.current?.scrollBy({ left: direction * track.current.clientWidth, behavior: "smooth" });
  }
  return (
    <div className="premiere-carousel">
      <div className="carousel-controls"><button type="button" aria-label="Estrenos anteriores" onClick={() => move(-1)}>←</button><button type="button" aria-label="Estrenos siguientes" onClick={() => move(1)}>→</button></div>
      <div className="premiere-track" ref={track} tabIndex={0} aria-label="Carrusel de estrenos">
        {premieres.map((movie) => <article className="premiere-card" key={movie.id} style={{ "--poster-color": movie.color }}><img src={movie.poster} alt={`Póster ilustrado de ${movie.title}`} loading="lazy" width="120" height="168" /><div><p className="eyebrow">{movie.label}</p><h3>{movie.title}</h3><p>{movie.genre} · {movie.duration} min</p></div></article>)}
      </div>
    </div>
  );
}
