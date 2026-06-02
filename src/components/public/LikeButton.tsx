import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { likeService } from '../../services/likeService';
import { useUIStore } from '../../store/uiStore';

interface LikeButtonProps {
  contentId: number;
  initialLiked?: boolean;
  initialCount?: number;
}

export default function LikeButton({ contentId, initialLiked = false, initialCount = 0 }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const addToast = useUIStore((state) => state.addToast);

  const handleLike = async () => {
    if (!isAuthenticated) {
      addToast('Silakan login untuk memberi like', 'info');
      return;
    }
    setIsLoading(true);
    try {
      const result = await likeService.toggle(contentId);
      setIsLiked(result.is_liked);
      setCount(result.like_count);
    } catch {
      addToast('Gagal memproses like', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 active:scale-90 ${
        isLiked
          ? 'bg-accent/10 border-accent/30 text-accent shadow-sm shadow-accent/10'
          : 'border-surface-muted text-muted hover:border-accent/30 hover:text-accent hover:bg-accent/5'
      }`}
    >
      <svg
        className={`w-4 h-4 transition-all duration-200 ${isLiked ? 'scale-110 fill-current' : ''}`}
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="text-sm font-medium">{count}</span>
    </button>
  );
}