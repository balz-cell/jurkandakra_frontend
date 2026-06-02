import api from './api';
import { Gallery } from '../types';

export const galleryService = {
  async getAll(page?: number) {
    const { data } = await api.get('/galleries', { params: { page } });
    return data;
  },

  async getDashboardGalleries(page?: number) {
    const { data } = await api.get('/dashboard/galleries', { params: { page } });
    return data;
  },

  async create(formData: FormData): Promise<Gallery> {
    const { data } = await api.post('/dashboard/galleries', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/dashboard/galleries/${id}`);
  },
};