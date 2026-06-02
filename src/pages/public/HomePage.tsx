import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { configurationService } from '../../services/configurationService';
import { ContentList } from '../../types';
import ContentCard from '../../components/public/ContentCard';
import TrendingSidebar from '../../components/public/TrendingSidebar';
import CarouselBanner from '../../components/public/CarouselBanner';
import HeroBanner from '../../components/public/HeroBanner';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { storageUrl } from '../../utils/storage';

function SectionHeader({ title, highlight, linkTo }: { title: string; highlight?: string; linkTo?: string }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1 h-7 bg-secondary rounded-full" />
        <h2 className="font-display text-2xl md:text-section text-text">
          {highlight ? (
            <><span className="text-secondary">{highlight}</span> {title}</>
          ) : title}
        </h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-600 transition-colors group">
          Lihat Semua
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const [featured, setFeatured] = useState<ContentList[]>([]);
  const [latest, setLatest] = useState<ContentList[]>([]);
  const [config, setConfig] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredData, latestData, configData] = await Promise.all([
          contentService.getFeatured(),
          contentService.getContents({ page: 1 }),
          configurationService.getAll(),
        ]);
        setFeatured(featuredData);
        setLatest(latestData.data);
        setConfig(configData);
      } catch (error) {
        // handle error
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="container-custom py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container-custom py-24">
      {/* Hero Section */}
      {featured.length > 0 && (
        <section className="mb-16 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContentCard content={featured[0]} variant="featured" />
            </div>
            <div className="flex flex-col gap-4">
              {featured.slice(1, 3).map((content) => (
                <ContentCard key={content.id} content={content} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero Welcome Banner */}
      <section className="mb-16 animate-fade-in">
        <HeroBanner
          backgroundUrl={config.hero_image ? storageUrl(config.hero_image) : undefined}
          title={config.hero_title || config.website_title}
          description={config.about || config.website_description}
        />
      </section>

      {/* Main Content + Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-slide-up">
        {/* Latest News */}
        <div className="lg:col-span-2">
          <SectionHeader title="Berita Terbaru" />
          {latest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latest.map((content) => (
                <ContentCard key={content.id} content={content} variant="default" />
              ))}
            </div>
          ) : (
            <EmptyState title="Belum ada berita" description="Konten akan segera hadir" />
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <TrendingSidebar />
          <CarouselBanner />
        </aside>
      </section>
    </div>
  );
}