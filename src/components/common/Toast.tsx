import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
}

export function Toast({ type, message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <XCircle className="w-5 h-5 text-error" />,
    info: <AlertCircle className="w-5 h-5 text-accent" />
  };

  const bgColors = {
    success: 'bg-success/10 border-success/30',
    error: 'bg-error/10 border-error/30',
    info: 'bg-accent/10 border-accent/30'
  };

  return (
    <div
      className={`fixed top-20 right-4 z-50 max-w-sm w-full p-4 rounded-xl border ${bgColors[type]} backdrop-blur-md shadow-xl transition-all duration-300 ${
        isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="flex items-center gap-3">
        {icons[type]}
        <p className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

// Toast Manager Component
interface ToastState {
  id: string;
  type: ToastType;
  message: string;
}

let toastId = 0;
let setToasts: React.Dispatch<React.SetStateAction<ToastState[]>> | null = null;

export function showToast(type: ToastType, message: string) {
  if (setToasts) {
    const id = `toast-${++toastId}`;
    setToasts(prev => [...prev, { id, type, message }]);
  }
}

export function ToastContainer() {
  const [toasts, setToastsLocal] = useState<ToastState[]>([]);
  
  useEffect(() => {
    setToasts = setToastsLocal;
    return () => { setToasts = null; };
  }, []);

  const removeToast = (id: string) => {
    setToastsLocal(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
