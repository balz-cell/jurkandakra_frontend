export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  show_in_sidebar: boolean;
  contents_count?: number;
  topics?: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
}