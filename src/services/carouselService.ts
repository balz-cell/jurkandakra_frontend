import api from './api';
import { Carousel } from '../types';

export const carouselService = {
  async getAll(): Promise<Carousel[]> {
    const { data } = await api.get('/dashboard/carousels');
    return data.data;
  },

  async getPublic(): Promise<Carousel[]> {
    const { data } = await api.get('/carousels');
    return data.data;
  },

  async create(formData: FormData): Promise<Carousel> {
    const { data } = await api.post('/dashboard/carousels', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async update(id: number, formData: FormData): Promise<Carousel> {
    // Kirim sebagai POST dengan _method=PUT di FormData
    const { data } = await api.post(`/dashboard/carousels/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/dashboard/carousels/${id}`);
  },
};