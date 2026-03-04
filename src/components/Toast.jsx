import { useEffect } from 'react';

export function Toast({ message, visible, onDismiss }) {
  useEffect(() => {
    if (!visible || !message) return;
    const t = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearTimeout(t);
  }, [visible, message, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className="toast"
      role="status"
      aria-live="polite"
      aria-label={`Notification: ${message}`}
    >
      {message}
    </div>
  );
}
