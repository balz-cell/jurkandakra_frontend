import api from './api';
import { Comment, PaginatedResponse } from '../types';

export const commentService = {
  async getByContent(contentId: number, page?: number): Promise<PaginatedResponse<Comment>> {
    const { data } = await api.get(`/contents/${contentId}/comments`, { params: { page } });
    return data;
  },

  async create(contentId: number, comment: string): Promise<Comment> {
    const { data } = await api.post(`/contents/${contentId}/comments`, { comment });
    return data.data;
  },

  async update(commentId: number, comment: string): Promise<Comment> {
    const { data } = await api.put(`/comments/${commentId}`, { comment });
    return data.data;
  },

  async delete(commentId: number): Promise<void> {
    await api.delete(`/comments/${commentId}`);
  },
};