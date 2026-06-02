import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { Content } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';
import { useUIStore } from '../../store/uiStore';
import LikeButton from '../../components/public/LikeButton';
import CommentSection from '../../components/public/CommentSection';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import ShareButton from '../../components/public/ShareButton';

export default function ContentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user: currentUser } = useAuth();
  const addToast = useUIStore((state) => state.addToast);
  const [content, setContent] = useState<Content | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    contentService.getBySlug(slug)
      .then(setContent)
      .catch(() => setError('Berita tidak ditemukan'))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const isAuthor = currentUser?.username === content?.author?.username;
  const isAdmin = currentUser?.role === 'admin';
  const canManage = isAuthor || isAdmin;

  const handleToggleStatus = async (action: 'publish' | 'archive') => {
    if (!content) return;
    setIsToggling(true);
    try {
      if (action === 'publish') {
        await contentService.publish(content.id);
        addToast('Konten dipublikasikan', 'success');
      } else {
        await contentService.archive(content.id);
        addToast('Konten diarsipkan', 'success');
      }
      setContent((prev) => prev ? { ...prev, status: action === 'publish' ? 'published' : 'archived', status_label: action === 'publish' ? 'Published' : 'Archived' } : prev);
    } catch {
      addToast('Gagal mengubah status konten', 'error');
    } finally {
      setIsToggling(false);
    }
  };

  if (isLoading) return <div className="container-custom py-24"><LoadingSpinner size="lg" /></div>;
  if (error || !content) return <div className="container-custom py-24"><ErrorState message={error || 'Berita tidak ditemukan'} /></div>;

  return (
    <article className="container-custom py-24">
      <div className="max-w-4xl mx-auto">
        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in">
          {content.category && (
            <Link
              to={`/kategori/${content.category.slug}`}
              className="px-3 py-1.5 bg-primary/5 text-primary text-caption font-medium rounded-full hover:bg-primary/10 transition-colors"
            >
              {content.category.name}
            </Link>
          )}
          <span className="text-caption text-muted">{formatDate(content.published_at)}</span>
          <span className="w-1 h-1 rounded-full bg-muted/30" />
          <span className="text-caption text-muted">{content.reading_time} min read</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-hero text-text leading-tight mb-8 animate-slide-up">
          {content.title}
        </h1>

        {/* Author + Actions */}
        <div className="flex flex-wrap items-center gap-4 mb-10 animate-fade-in">
          <div className="flex items-center gap-3">
            <img
              src={content.author?.avatar || `/images/default-avatar.svg`}
              alt={content.author?.full_name}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div>
              <Link to={`/profil/${content.author?.username}`} className="font-semibold text-text hover:text-primary transition-colors">
                {content.author?.full_name || 'Pengguna'}
              </Link>
              <p className="text-caption text-muted">Author</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <LikeButton contentId={content.id} initialLiked={content.is_liked} initialCount={content.like_count} />
            <ShareButton title={content.title} slug={content.slug} />
          </div>
        </div>

        {/* Admin/Author Action Bar */}
        {canManage && (
          <div className="flex items-center gap-2 mb-8 p-3 bg-surface-muted/50 rounded-2xl border border-surface-muted animate-fade-in">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-2 h-2 rounded-full ${content.status === 'published' ? 'bg-green-500' : content.status === 'draft' ? 'bg-amber-500' : 'bg-gray-400'}`} />
              <span className="text-xs font-medium text-muted">{content.status_label}</span>
            </div>
            <div className="flex items-center gap-1">
              <Link
                to={`/dashboard/${isAdmin ? 'admin' : 'kontributor'}/konten/${content.id}/edit`}
                className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                Edit
              </Link>
              {content.status === 'published' ? (
                <button
                  onClick={() => handleToggleStatus('archive')}
                  disabled={isToggling}
                  className="px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isToggling ? '...' : 'Arsip'}
                </button>
              ) : (
                <button
                  onClick={() => handleToggleStatus('publish')}
                  disabled={isToggling}
                  className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isToggling ? '...' : content.status === 'archived' ? 'Publikasikan Ulang' : 'Publish'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Thumbnail */}
        <div className="rounded-3xl overflow-hidden mb-10 shadow-soft bg-surface-muted">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full max-h-[500px] object-cover"
            loading="eager"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-display prose-img:rounded-2xl prose-a:text-primary prose-blockquote:border-secondary prose-blockquote:bg-secondary/5 prose-blockquote:py-1 prose-blockquote:not-italic"
          dangerouslySetInnerHTML={{ __html: content.content || '' }}
        />

        {/* Tags / Topics */}
        {content.topics && content.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-surface-muted">
            <span className="text-xs text-muted font-medium uppercase tracking-wider mr-2 self-center">Topik</span>
            {content.topics.map((topic) => (
              <span key={topic.id} className="px-3 py-1.5 bg-surface-muted text-text-secondary text-caption rounded-full hover:bg-primary/5 hover:text-primary transition-colors cursor-default">
                #{topic.name}
              </span>
            ))}
          </div>
        )}

        {/* Comments */}
        <div className="mt-12 pt-8 border-t border-surface-muted">
          <CommentSection contentId={content.id} />
        </div>
      </div>
    </article>
  );
}