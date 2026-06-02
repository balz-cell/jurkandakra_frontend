import api from './api';
import { Division } from '../types';

export const divisionService = {
  async getAll(): Promise<Division[]> {
    const { data } = await api.get('/dashboard/divisions');
    return data.data;
  },

  async create(payload: { name: string; description?: string; order?: number }): Promise<Division> {
    const { data } = await api.post('/dashboard/divisions', payload);
    return data.data;
  },

  async update(id: number, payload: { name: string; description?: string; order?: number }): Promise<Division> {
    const { data } = await api.put(`/dashboard/divisions/${id}`, payload);
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/dashboard/divisions/${id}`);
  },
};
