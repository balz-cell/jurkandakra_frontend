interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'Terjadi kesalahan', onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-red-600 mb-2">{message}</h3>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Coba Lagi
        </button>
      )}
    </div>
  );
}