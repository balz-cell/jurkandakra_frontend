import { useEffect, useState } from 'react';
import { divisionService } from '../../services/divisionService';
import { Division } from '../../types';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useUIStore } from '../../store/uiStore';

export default function DivisionManagementPage() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editDiv, setEditDiv] = useState<Division | null>(null);
  const [form, setForm] = useState({ name: '', description: '', order: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const addToast = useUIStore((state) => state.addToast);

  const load = () => {
    setIsLoading(true);
    divisionService.getAll()
      .then(setDivisions)
      .catch(() => addToast('Gagal memuat divisi', 'error'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setIsSaving(true);
    try {
      if (editDiv) {
        await divisionService.update(editDiv.id, form);
        addToast('Divisi diupdate', 'success');
      } else {
        await divisionService.create(form);
        addToast('Divisi dibuat', 'success');
      }
      setShowModal(false); setEditDiv(null);
      setForm({ name: '', description: '', order: 0 });
      load();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Gagal menyimpan', 'error');
    } finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await divisionService.delete(deleteId);
      addToast('Divisi dihapus', 'success');
      setDeleteId(null);
      load();
    } catch { addToast('Gagal menghapus', 'error'); }
  };

  const openEdit = (div: Division) => {
    setEditDiv(div);
    setForm({ name: div.name, description: div.description || '', order: div.order });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text">Divisi</h1>
          <p className="text-muted text-sm mt-1">Kelola divisi organisasi jurnalistik</p>
        </div>
        <button onClick={() => { setEditDiv(null); setForm({ name: '', description: '', order: 0 }); setShowModal(true); }} className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all">
          + Tambah Divisi
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'order', header: 'Urutan' },
          { key: 'name', header: 'Nama Divisi' },
          { key: 'description', header: 'Deskripsi', render: (d: Division) => <span className="text-muted">{d.description || '-'}</span> },
          { key: 'members_count', header: 'Anggota', render: (d: Division) => <span className="font-medium">{d.members_count ?? 0}</span> },
        ]}
        data={divisions}
        isLoading={isLoading}
        emptyMessage="Belum ada divisi"
        actions={(div: Division) => (
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => openEdit(div)} className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors">Edit</button>
            <button onClick={() => setDeleteId(div.id)} className="px-3 py-1.5 text-xs font-medium bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors">Hapus</button>
          </div>
        )}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editDiv ? 'Edit Divisi' : 'Tambah Divisi'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Nama Divisi</label>
            <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Mis: Kameramen" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Deskripsi</label>
            <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Deskripsi divisi" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Urutan</label>
            <input type="number" value={form.order} onChange={(e) => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-surface-muted text-text text-sm font-medium rounded-xl hover:bg-surface-muted transition-all">Batal</button>
            <button onClick={handleSave} disabled={isSaving || !form.name.trim()} className="flex-1 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50">{isSaving ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} title="Hapus Divisi" message="Yakin ingin menghapus divisi ini? Anggota di dalamnya akan kehilangan relasi divisi." />
    </div>
  );
}
