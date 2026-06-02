import { useUIStore } from '../../store/uiStore';

export default function Toast() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[300px] animate-slide-in`}
        >
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white">✕</button>
        </div>
      ))}
    </div>
  );
}