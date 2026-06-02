import api from './api';
import { AnggotaJurnal } from '../types';

export const anggotaService = {
  async getAll(): Promise<AnggotaJurnal[]> {
    const { data } = await api.get('/dashboard/anggota');
    return data.data;
  },

  async getById(id: number): Promise<AnggotaJurnal> {
    const { data } = await api.get(`/dashboard/anggota/${id}`);
    return data.data;
  },

  async create(formData: FormData): Promise<AnggotaJurnal> {
    const { data } = await api.post('/dashboard/anggota', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async update(id: number, formData: FormData): Promise<AnggotaJurnal> {
    const { data } = await api.post(`/dashboard/anggota/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/dashboard/anggota/${id}`);
  },
};
