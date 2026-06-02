import { User } from './user';

export interface Comment {
  id: number;
  comment: string;
  is_approved: boolean;
  user: User;
  created_at: string;
  created_at_diff: string;
}