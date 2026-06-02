import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { ContentList } from '../../types';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import Pagination from '../../components/common/Pagination';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useUIStore } from '../../store/uiStore';
import { timeAgo } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';

export default function ContentManagementPage() {
  const { isAdmin } = useAuth();
  const [contents, setContents] = useState<ContentList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const addToast = useUIStore((state) => state.addToast);

  const loadContents = () => {
    setIsLoading(true);
    contentService.getDashboardContents({ page, search, status: statusFilter })
      .then((res) => {
        setContents(res.data);
        setTotalPages(res.meta.last_page);
      })
      .catch(() => addToast('Gagal memuat konten', 'error'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { loadContents(); }, [page, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadContents();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await contentService.delete(deleteId);
      addToast('Konten berhasil dihapus', 'success');
      setDeleteId(null);
      loadContents();
    } catch {
      addToast('Gagal menghapus konten', 'error');
    }
  };

  const handlePublish = async (id: number) => {
    try {
      await contentService.publish(id);
      addToast('Konten dipublikasikan', 'success');
      loadContents();
    } catch {
      addToast('Gagal publish konten', 'error');
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await contentService.archive(id);
      addToast('Konten diarsipkan', 'success');
      loadContents();
    } catch {
      addToast('Gagal arsip konten', 'error');
    }
  };

  const columns = [
    { key: 'title', header: 'Judul', render: (item: ContentList) => (
      <div className="max-w-xs">
        <p className="font-medium truncate">{item.title}</p>
        <p className="text-caption text-muted">{item.author?.full_name} · {timeAgo(item.published_at)}</p>
      </div>
    )},
    { key: 'category', header: 'Kategori', render: (item: ContentList) => (
      <span className="text-sm">{item.category?.name || '-'}</span>
    )},
    { key: 'status', header: 'Status', render: (item: ContentList) => (
      <StatusBadge status={item.status} />
    )},
    { key: 'view_count', header: 'Views', render: (item: ContentList) => (
      <span className="font-mono text-sm">{item.view_count}</span>
    )},
    { key: 'like_count', header: 'Likes', render: (item: ContentList) => (
      <span className="font-mono text-sm">{item.like_count}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text mb-1">Manajemen Konten</h1>
          <p className="text-muted text-sm">{contents.length} konten</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/kontributor/konten/buat')}
          className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all"
        >
          + Buat Konten
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="flex-1 max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari konten..."
            className="w-full px-4 py-2 text-sm border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </form>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 text-sm border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        >
          <option value="">Semua Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={contents}
        isLoading={isLoading}
        emptyMessage="Belum ada konten"
        actions={(item: ContentList) => (
        <div className="flex items-center gap-1 justify-end">
            <button onClick={() => navigate(`/dashboard/${isAdmin ? 'admin' : 'kontributor'}/konten/${item.id}/edit`)} className="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
            Edit
            </button>
            
            {item.status === 'published' ? (
              <button onClick={() => handleArchive(item.id)} className="px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                Arsip
              </button>
            ) : (
              <button onClick={() => handlePublish(item.id)} className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                {item.status === 'archived' ? 'Publikasikan Ulang' : 'Publish'}
              </button>
            )}
            
            <button onClick={() => setDeleteId(item.id)} className="px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/5 rounded-lg transition-colors">
            Hapus
            </button>
        </div>
        )}
      />

      <Pagination currentPage={page} lastPage={totalPages} onPageChange={setPage} />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Hapus Konten"
        message="Konten akan dipindahkan ke trash. Yakin ingin melanjutkan?"
        confirmText="Hapus"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}