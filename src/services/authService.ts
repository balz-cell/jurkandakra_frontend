import api from './api';
import { AuthResponse, LoginCredentials, RegisterData } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', credentials);
    return data.data;
  },

  async register(registerData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', registerData);
    return data.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getMe(): Promise<AuthResponse['user']> {
    const { data } = await api.get('/auth/me');
    return data.data;
  },
};