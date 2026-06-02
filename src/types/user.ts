export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  avatar: string;
  role: 'user' | 'anggota_jurnals' | 'kontributor' | 'admin';
  role_label: string;
  is_active: boolean;
  last_login_at: string;
  created_at: string;
  anggota_jurnal?: AnggotaJurnal;
  contents_count?: number;
}

export interface Division {
  id: number;
  name: string;
  slug: string;
  description?: string;
  order: number;
  members_count?: number;
}

export interface AnggotaJurnal {
  id: number;
  user_id?: number;
  nis?: string;
  photo?: string;
  full_name?: string;
  position: string;
  status: string;
  joined_at: string;
  divisions?: Division[];
  user?: User;
}

export interface UserProfile extends User {
  stats: {
    contents_count: number;
    comments_count: number;
    likes_count: number;
  };
  joined_at: string;
}

