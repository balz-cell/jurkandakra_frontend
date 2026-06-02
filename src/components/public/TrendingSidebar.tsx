import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { ContentList } from '../../types';
import { timeAgo } from '../../utils/formatDate';
import LoadingSpinner from '../common/LoadingSpinner';

export default function TrendingSidebar() {
  const [trending, setTrending] = useState<ContentList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    contentService.getTrending(7)
      .then(setTrending)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="bg-surface rounded-3xl shadow-soft p-6"><LoadingSpinner size="sm" /></div>;

  return (
    <div className="bg-surface rounded-3xl shadow-soft p-6">
      <h3 className="font-display text-xl mb-6 flex items-center gap-2">
        <span className="text-secondary">🔥</span> Trending
      </h3>
      <div className="space-y-1">
        {trending.map((content, index) => (
          <Link
            key={content.id}
            to={`/berita/${content.slug}`}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-muted/70 transition-colors group"
          >
            <span className={`font-display text-2xl flex-shrink-0 w-8 leading-none ${index < 3 ? 'text-secondary' : 'text-muted'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h4 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">{content.title}</h4>
              <span className="text-caption text-muted mt-1 block">{timeAgo(content.published_at)}</span>
            </div>
          </Link>
        ))}
      </div>
      {trending.length >= 7 && (
        <Link to="/trending" className="block mt-4 pt-3 border-t border-surface-muted text-sm font-medium text-primary hover:text-primary-600 transition-colors text-center">
          Lihat semua trending
        </Link>
      )}
    </div>
  );
}