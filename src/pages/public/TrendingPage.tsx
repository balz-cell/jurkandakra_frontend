import { useEffect, useState } from 'react';
import { contentService } from '../../services/contentService';
import { ContentList } from '../../types';
import ContentCard from '../../components/public/ContentCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export default function TrendingPage() {
  const [trending, setTrending] = useState<ContentList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    contentService.getTrending(30)
      .then(setTrending)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="container-custom py-24"><LoadingSpinner /></div>;

  return (
    <div className="container-custom py-24">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-8 bg-secondary rounded-full" />
        <h1 className="font-display text-section text-text">Trending</h1>
      </div>
      <p className="text-muted mb-10 ml-4">Berita paling populer bulan ini</p>

      {trending.length > 0 ? (
        <>
          {/* Hero item */}
          {trending[0] && (
            <div className="mb-8">
              <ContentCard content={trending[0]} variant="featured" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.slice(1).map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState icon="🔥" title="Belum ada trending" description="Belum ada berita yang trending saat ini" />
      )}
    </div>
  );
}