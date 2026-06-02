import api from './api';

export const likeService = {
  async toggle(contentId: number): Promise<{ is_liked: boolean; like_count: number }> {
    const { data } = await api.post(`/contents/${contentId}/like`);
    return data.data;
  },

  async getCount(contentId: number): Promise<number> {
    const { data } = await api.get(`/contents/${contentId}/likes/count`);
    return data.data.like_count;
  },
};