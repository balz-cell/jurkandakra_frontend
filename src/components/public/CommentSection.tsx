import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { commentService } from '../../services/commentService';
import { Comment } from '../../types';
import { timeAgo } from '../../utils/formatDate';
import LoadingSpinner from '../common/LoadingSpinner';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';

interface CommentSectionProps {
  contentId: number;
}

export default function CommentSection({ contentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const addToast = useUIStore((state) => state.addToast);

  const loadComments = async () => {
    try {
      const { data } = await commentService.getByContent(contentId);
      setComments(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [contentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = await commentService.create(contentId, newComment.trim());
      setComments((prev) => [comment, ...prev]);
      setNewComment('');
      addToast('Komentar berhasil ditambahkan', 'success');
    } catch {
      addToast('Gagal menambahkan komentar', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="font-display text-xl mb-6">Komentar ({comments.length})</h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <img
              src={user?.avatar || `/images/default-avatar.svg`}
              alt={user?.full_name}
              className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar..."
                className="w-full px-4 py-3 border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none text-sm bg-surface transition-all"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50 active:scale-[0.97]"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-5 bg-surface-muted/50 rounded-2xl text-center border border-surface-muted">
          <p className="text-muted text-sm">
            <Link to="/login" className="text-primary font-medium hover:underline">Masuk</Link> untuk menulis komentar.
          </p>
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-surface-muted rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-muted text-sm">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 bg-surface-muted/30 rounded-2xl border border-surface-muted/50">
              <img
                src={comment.user?.avatar || `/images/default-avatar.svg`}
                alt={comment.user?.full_name || 'Pengguna dihapus'}
                className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {comment.user ? (
                    <Link to={`/profil/${comment.user.username}`} className="font-semibold text-sm hover:text-primary transition-colors">
                      {comment.user.full_name}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted">Pengguna dihapus</span>
                  )}
                  <span className="w-1 h-1 rounded-full bg-muted/30" />
                  <span className="text-caption text-muted">{timeAgo(comment.created_at)}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}