import { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/Toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = useCallback((message) => {
    setToast({ message: String(message), visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((p) => ({ ...p, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast message={toast.message} visible={toast.visible} onDismiss={hideToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  return ctx || { showToast: () => {}, hideToast: () => {} };
}
