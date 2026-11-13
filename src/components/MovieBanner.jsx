export default function MovieBanner({ hasFilters, onClearFilters }) {
  return (
    <section className="movie-banner" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="live-dot" /> TU PRÓXIMA GRAN HISTORIA</p>
        <h1 id="hero-title">Hay películas.<br />Y hay <em>momentos.</em></h1>
        <p>Descubre historias que se quedan contigo.<br />Explora la cartelera y guarda tus próximas favoritas.</p>
        <div className="hero-actions">
          <a className="cinema-button" href="#cartelera">Explorar cartelera <span aria-hidden="true">↗</span></a>
          <button type="button" className="text-button" onClick={onClearFilters} disabled={!hasFilters}>Limpiar filtros ↺</button>
        </div>
        <span className="hero-note">BUEN CINE. SIN COMPLICACIONES.</span>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="hero-ticket"><span>UNA HISTORIA TE ESPERA</span><strong>ADMIT<br />ONE</strong><span>CINECLUB / EST. 2026</span><div className="ticket-bars" /></div>
        <div className="floating-star">✦</div><span className="hero-art-caption">LA VIDA SE VE MEJOR EN PANTALLA GRANDE.</span>
      </div>
    </section>
  );
}
