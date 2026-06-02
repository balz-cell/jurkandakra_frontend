import api from './api';
import { Content, ContentList, PaginatedResponse, ContentFormData } from '../types';

export const contentService = {
  async getContents(params?: { page?: number; category?: string; search?: string }, signal?: AbortSignal) {
    const { data } = await api.get<PaginatedResponse<ContentList>>('/contents', { params, signal });
    return data;
  },

  async getTrending(days?: number) {
    const { data } = await api.get<{ data: ContentList[] }>('/contents/trending', { params: { days } });
    return data.data;
  },

  async getFeatured() {
    const { data } = await api.get<{ data: ContentList[] }>('/contents/featured');
    return data.data;
  },

  async getBySlug(slug: string): Promise<Content> {
    const { data } = await api.get(`/contents/${slug}`);
    return data.data;
  },

  async getDashboardContents(params?: { page?: number; status?: string; search?: string }) {
    const { data } = await api.get<PaginatedResponse<ContentList>>('/dashboard/contents', { params });
    return data;
  },

  async create(contentData: ContentFormData & { status?: string }): Promise<Content> {
    const formData = new FormData();
    Object.entries(contentData).forEach(([key, value]) => {
      if (key === 'topic_ids' && Array.isArray(value)) {
        value.forEach(id => formData.append('topic_ids[]', String(id)));
      } else if (key === 'thumbnail' && value instanceof File) {
        formData.append('thumbnail', value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const { data } = await api.post('/dashboard/contents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async update(id: number, contentData: Partial<ContentFormData> & { status?: string }): Promise<Content> {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    Object.entries(contentData).forEach(([key, value]) => {
      if (key === 'topic_ids' && Array.isArray(value)) {
        value.forEach(id => formData.append('topic_ids[]', String(id)));
      } else if (key === 'thumbnail' && value instanceof File) {
        formData.append('thumbnail', value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const { data } = await api.post(`/dashboard/contents/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/dashboard/contents/${id}`);
  },

  async publish(id: number): Promise<void> {
    await api.patch(`/dashboard/contents/${id}/publish`);
  },

  async archive(id: number): Promise<void> {
    await api.patch(`/dashboard/contents/${id}/archive`);
  },
};