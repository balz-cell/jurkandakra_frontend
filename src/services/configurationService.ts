import api from './api';

export const configurationService = {
  async getAll(): Promise<Record<string, string>> {
    const { data } = await api.get('/configurations');
    return data.data;
  },

  async update(configurations: Array<{ key: string; value: string }>): Promise<Record<string, string>> {
    const { data } = await api.put('/dashboard/configurations', { configurations });
    return data.data;
  },
};