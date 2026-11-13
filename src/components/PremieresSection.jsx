import { useState } from "react";
import usePremieres from "../hooks/usePremieres";
import MovieSkeleton from "./MovieSkeleton";
import PremiereCarousel from "./PremiereCarousel";

export default function PremieresSection() {
  const [failing, setFailing] = useState(() => new URLSearchParams(window.location.search).get("fail") === "1");
  const { status, premieres, error, reload } = usePremieres({ failing });
  return (
    <section className="premieres-section" id="estrenos" aria-labelledby="premieres-title">
      <div className="section-heading"><div><p className="eyebrow">MUY PRONTO EN PANTALLA</p><h2 id="premieres-title">Lo que viene<span className="accent-dot">.</span></h2></div><button type="button" className="text-button" onClick={reload}>Recargar estrenos ↻</button></div>
      {status === "loading" && <MovieSkeleton />}
      {status === "error" && <div className="premiere-error" role="alert"><p>{error.message}</p><button className="cinema-button" type="button" onClick={reload}>Reintentar</button></div>}
      {status === "ready" && <PremiereCarousel premieres={premieres} />}
      <label className="simulate-error"><input type="checkbox" checked={failing} onChange={(event) => setFailing(event.target.checked)} /> Simular error de conexión</label>
      <p className="demo-note">Estrenos de demostración · Datos y petición simulados, no representan una programación real.</p>
    </section>
  );
}
