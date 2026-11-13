export default function MovieSkeleton() {
  return (
    <div className="premiere-skeleton" role="status" aria-label="Cargando estrenos">
      {[0, 1, 2].map((item) => <div className="premiere-placeholder" key={item}><div className="skeleton-line" /><div className="skeleton-line skeleton-short" /></div>)}
      <span className="sr-only">Cargando estrenos…</span>
    </div>
  );
}
