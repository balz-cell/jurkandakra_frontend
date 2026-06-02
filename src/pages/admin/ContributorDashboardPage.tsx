import { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import { MyStats } from '../../types';
import StatCard from '../../components/admin/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ContributorDashboardPage() {
  const [stats, setStats] = useState<MyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardService.getMyStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (!stats) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-text mb-1">Dashboard Kontributor</h1>
        <p className="text-muted text-sm">Statistik konten Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Konten" value={stats.total_contents} icon="📝" />
        <StatCard title="Published" value={stats.published_contents} icon="✅" variant="success" />
        <StatCard title="Draft" value={stats.draft_contents} icon="📄" variant="warning" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Views" value={stats.total_views} icon="👁️" />
        <StatCard title="Total Likes" value={stats.total_likes} icon="❤️" />
        <StatCard title="Total Komentar" value={stats.total_comments} icon="💬" />
      </div>
    </div>
  );
}