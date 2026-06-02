import api from './api';
import { OrganizationStructure, AnggotaJurnal } from '../types';

export const organizationService = {
  async getStructure(): Promise<OrganizationStructure> {
    const { data } = await api.get('/organization/structure');
    return data.data;
  },

  async getMembers(): Promise<AnggotaJurnal[]> {
    const { data } = await api.get('/organization/members');
    return data.data;
  },
};
