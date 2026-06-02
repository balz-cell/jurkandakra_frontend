import api from './api';
import { Category, PaginatedResponse, ContentList } from '../types';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const { data } = await api.get('/categories');
    return data.data;
  },

  async getBySlug(slug: string): Promise<Category> {
    const { data } = await api.get(`/categories/${slug}`);
    return data.data;
  },

  async getContents(slug: string, page?: number): Promise<{ category: Category; contents: PaginatedResponse<ContentList> }> {
    const { data } = await api.get(`/categories/${slug}/contents`, { params: { page } });
    return data.data;
  },

  async getDashboardCategories(): Promise<Category[]> {
    const { data } = await api.get('/dashboard/categories');
    return data.data;
  },

  async create(categoryData: { name: string; description?: string; show_in_sidebar?: boolean }): Promise<Category> {
    const { data } = await api.post('/dashboard/categories', categoryData);
    return data.data;
  },

  async update(id: number, categoryData: Partial<Category>): Promise<Category> {
    const { data } = await api.put(`/dashboard/categories/${id}`, categoryData);
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/dashboard/categories/${id}`);
  },
};