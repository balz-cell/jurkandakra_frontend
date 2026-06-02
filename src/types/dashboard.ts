export interface DashboardStats {
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

export interface MyStats {
  total_contents: number;
  published_contents: number;
  draft_contents: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
}