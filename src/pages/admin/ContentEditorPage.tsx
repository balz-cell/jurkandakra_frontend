import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types';
import ImageUploader from '../../components/admin/ImageUploader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useUIStore } from '../../store/uiStore';
import { timeAgo } from '../../utils/formatDate';
import { storageUrl } from '../../utils/storage';

export default function ContentEditorPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const addToast = useUIStore((state) => state.addToast);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [body, setBody] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [currentThumbnail, setCurrentThumbnail] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    categoryService.getAll().then(setCategories).catch(() => {});

    if (isEdit && id) {
      contentService.getDashboardContents({ page: 1 })
        .then((res) => {
          // Simple find - ideally ada API get by id
          const found = res.data.find(c => c.id === parseInt(id));
          if (found) {
            // Fetch full content by slug
            return contentService.getBySlug(found.slug);
          }
          return null;
        })
        .then((content) => {
          if (content) {
            setTitle(content.title);
            setBody(content.content || '');
            setExcerpt(content.excerpt || '');
            setCategoryId(content.category?.id || '');
            setCurrentThumbnail(content.thumbnail || '');
            setCreatedAt(content.created_at);
          }
        })
        .catch(() => addToast('Gagal memuat konten', 'error'))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent, action: 'draft' | 'published') => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      addToast('Judul dan konten wajib diisi', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const now = new Date();
      const jakartaTime = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now).replace(',', '');

      const data: Record<string, any> = {
        title,
        content: body,
        excerpt: excerpt || undefined,
        category_id: categoryId || undefined,
        thumbnail: thumbnail || undefined,
        status: action,
      };

      if (action === 'published') {
        data.published_at = jakartaTime;
      }

      if (isEdit && id) {
        await contentService.update(parseInt(id), data);
        addToast('Konten berhasil diupdate', 'success');
      } else {
        await contentService.create(data as any);
        addToast(action === 'published' ? 'Konten berhasil dipublikasikan' : 'Konten berhasil dibuat', 'success');
      }
      navigate('/dashboard/kontributor/konten');
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Gagal menyimpan konten', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner size="lg" />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text mb-1">{isEdit ? 'Edit Konten' : 'Buat Konten Baru'}</h1>
          <p className="text-muted text-sm">
            {isEdit ? (
              <>{timeAgo(createdAt)}</>
            ) : (
              'Tulis berita untuk portal jurnalistik'
            )}
          </p>
        </div>
        <button onClick={() => navigate(-1)} className="text-sm text-muted hover:text-text transition-colors">← Kembali</button>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-surface rounded-2xl shadow-soft p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Judul Berita</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita..."
              className="w-full px-4 py-3 text-lg border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Kategori</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value ? parseInt(e.target.value) : '')}
              className="w-full px-4 py-3 border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
              <option value="">Pilih Kategori (Opsional)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Ringkasan (Opsional)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan singkat berita..."
              rows={3}
              className="w-full px-4 py-3 border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none text-sm"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Isi Berita</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tulis isi berita di sini... (HTML supported)"
              rows={15}
              className="w-full px-4 py-3 border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y font-mono text-sm"
            />
            <p className="text-caption text-muted mt-1">Kamu bisa menggunakan tag HTML untuk formatting (p, h2, h3, strong, em, img, dll)</p>
          </div>

          {/* Thumbnail */}
          <ImageUploader
            label="Thumbnail Berita"
            currentImage={storageUrl(currentThumbnail)}
            onFileSelect={(file) => setThumbnail(file)}
            onRemove={() => setThumbnail(null)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={isSaving}
            className="px-6 py-3 border border-surface-muted text-text text-sm font-medium rounded-xl hover:bg-surface-muted transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Draft'}
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={isSaving}
            className="px-6 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50"
          >
            {isSaving ? 'Mempublish...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}