import { useEffect } from "react";

export default function Toast({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(onDismiss, 3200);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);
  return (
    <div className="toast-region" role="status" aria-live="polite" aria-atomic="true">
      {notification && <div className="cinema-toast" key={notification.id}><span aria-hidden="true">✓</span><p>{notification.message}</p><button type="button" onClick={onDismiss} aria-label="Cerrar aviso">×</button></div>}
    </div>
  );
}
