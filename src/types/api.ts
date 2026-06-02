export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  full_name: string;
}

export interface AuthResponse {
  user: import('./user').User;
  token: string;
}

export interface ContentFormData {
  title: string;
  category_id?: number;
  content: string;
  excerpt?: string;
  thumbnail?: File;
  topic_ids?: number[];
  status?: string;
}