import api from './api';
import { UserProfile, User, PaginatedResponse } from '../types';

export const userService = {
  async getProfile(username: string): Promise<UserProfile> {
    const { data } = await api.get(`/users/${username}`);
    return data.data;
  },

  async updateProfile(profileData: FormData): Promise<UserProfile> {
    const { data } = await api.put('/profile', profileData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async getDashboardUsers(params?: { page?: number; role?: string; search?: string }): Promise<PaginatedResponse<User>> {
    const { data } = await api.get('/dashboard/users', { params });
    return data;
  },

  async createUser(userData: object): Promise<User> {
    const { data } = await api.post('/dashboard/users', userData);
    return data.data;
  },

  async updateUser(id: number, userData: object): Promise<User> {
    const { data } = await api.put(`/dashboard/users/${id}`, userData);
    return data.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/dashboard/users/${id}`);
  },

  async toggleActive(id: number): Promise<User> {
    const { data } = await api.patch(`/dashboard/users/${id}/toggle-active`);
    return data.data;
  },
};