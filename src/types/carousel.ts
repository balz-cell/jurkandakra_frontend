export interface Carousel {
  id: number;
  title: string;
  subtitle?: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  display_order: number;
}