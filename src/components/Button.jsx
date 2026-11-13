// Shared appearance and safe defaults; callers may explicitly override the type.
export default function Button({ variant = "primary", children, ...rest }) {
  return (
    <button className={`btn btn-${variant}`} type="button" {...rest}>
      {children}
    </button>
  );
}
