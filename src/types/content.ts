import { User } from './user';
import { Category, Topic } from './category';

export interface Content {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'archived';
  status_label: string;
  is_featured: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  reading_time: number;
  published_at: string;
  published_at_diff: string;
  created_at: string;
  author?: User;
  category?: Category;
  topics?: Topic[];
  is_liked?: boolean;
}

export interface ContentList {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'archived'; // <-- tambahin
  status_label?: string; // <-- tambahin
  is_featured: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  reading_time: number;
  published_at: string; // <-- tambahin
  published_at_diff: string;
  author?: User;
  category?: Category;
}