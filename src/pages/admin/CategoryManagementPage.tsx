import { useEffect, useState } from 'react';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useUIStore } from '../../store/uiStore';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '', show_in_sidebar: false });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const addToast = useUIStore((state) => state.addToast);

  const loadCategories = () => {
    setIsLoading(true);
    categoryService.getDashboardCategories()
      .then(setCategories)
      .catch(() => addToast('Gagal memuat kategori', 'error'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { loadCategories(); }, []);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setIsSaving(true);
    try {
      if (editCat) {
        await categoryService.update(editCat.id, form);
        addToast('Kategori diupdate', 'success');
      } else {
        await categoryService.create(form);
        addToast('Kategori dibuat', 'success');
      }
      setShowModal(false); setEditCat(null);
      setForm({ name: '', description: '', show_in_sidebar: false });
      loadCategories();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Gagal menyimpan', 'error');
    } finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await categoryService.delete(deleteId);
      addToast('Kategori dihapus', 'success');
      setDeleteId(null);
      loadCategories();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Gagal menghapus', 'error');
    }
  };

  const openEdit = (cat: Category) => {
    setEditCat(cat);
    setForm({ name: cat.name, description: cat.description || '', show_in_sidebar: cat.show_in_sidebar });
    setShowModal(true);
  };

  const columns = [
    { key: 'name', header: 'Nama Kategori', render: (item: Category) => (
      <span className="font-medium text-sm">{item.name}</span>
    )},
    { key: 'slug', header: 'Slug', render: (item: Category) => (
      <span className="text-sm text-muted font-mono">{item.slug}</span>
    )},
    { key: 'contents_count', header: 'Konten', render: (item: Category) => (
      <span className="text-sm">{item.contents_count || 0}</span>
    )},
    { key: 'show_in_sidebar', header: 'Sidebar', render: (item: Category) => (
      <span className={`text-xs font-medium ${item.show_in_sidebar ? 'text-green-600' : 'text-muted'}`}>
        {item.show_in_sidebar ? '✓ Tampil' : '—'}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text mb-1">Manajemen Kategori</h1>
          <p className="text-muted text-sm">{categories.length} kategori</p>
        </div>
        <button onClick={() => { setEditCat(null); setForm({ name: '', description: '', show_in_sidebar: false }); setShowModal(true); }}
          className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600">+ Tambah Kategori</button>
      </div>

      <DataTable columns={columns} data={categories} isLoading={isLoading} emptyMessage="Belum ada kategori"
        actions={(item: Category) => (
          <div className="flex gap-1 justify-end">
            <button onClick={() => openEdit(item)} className="px-2 py-1 text-xs text-primary">Edit</button>
            <button onClick={() => setDeleteId(item.id)} className="px-2 py-1 text-xs text-accent">Hapus</button>
          </div>
        )}
      />

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditCat(null); }}
        title={editCat ? 'Edit Kategori' : 'Tambah Kategori'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Nama Kategori</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="block text-sm font-medium mb-1">Deskripsi (Opsional)</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" /></div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.show_in_sidebar} onChange={(e) => setForm({ ...form, show_in_sidebar: e.target.checked })}
              className="w-4 h-4 rounded text-primary" />
            <span className="text-sm">Tampilkan di sidebar</span>
          </label>
          <button onClick={handleSave} disabled={isSaving}
            className="w-full py-2.5 bg-primary text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 text-sm font-medium">
            {isSaving ? 'Menyimpan...' : editCat ? 'Update' : 'Tambah'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Hapus Kategori" message="Kategori beserta konten di dalamnya akan terpengaruh. Lanjutkan?"
        confirmText="Hapus" variant="danger" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}