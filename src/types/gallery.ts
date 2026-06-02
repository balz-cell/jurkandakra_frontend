import { User } from './user';

export interface Gallery {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  uploader?: User;
  created_at: string;
}