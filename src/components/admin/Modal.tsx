interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative bg-surface rounded-3xl shadow-hover p-6 w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto animate-scale-in`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-text">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-surface-muted flex items-center justify-center transition-colors">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}