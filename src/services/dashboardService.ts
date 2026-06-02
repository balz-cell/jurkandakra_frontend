import api from './api';

interface DashboardStats {
  total_contents: number;
  published_contents: number;
  draft_contents: number;
  total_users: number;
  total_categories: number;
  total_comments: number;
  total_likes: number;
  total_views: number;
  total_views_today: number;
  recent_contents: Array<{
    id: number;
    title: string;
    status: string;
    author: string;
    published_at: string;
  }>;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get('/dashboard/stats');
    return data.data;
  },

  async getMyStats() {
    const { data } = await api.get('/dashboard/stats/my');
    return data.data;
  },
};