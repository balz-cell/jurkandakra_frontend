import { useEffect, useState } from 'react';
import { carouselService } from '../../services/carouselService';
import { Carousel } from '../../types';
import Modal from '../../components/admin/Modal';
import ImageUploader from '../../components/admin/ImageUploader';
import { useUIStore } from '../../store/uiStore';

export default function CarouselPage() {
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Carousel | null>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', link_url: '', is_active: true, display_order: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const addToast = useUIStore((state) => state.addToast);

  const load = () => {
    setIsLoading(true);
    carouselService.getAll()
      .then(setCarousels)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
  setIsSaving(true);
  try {
    const formData = new FormData();
    formData.append('title', form.title || '');
    formData.append('subtitle', form.subtitle || '');
    formData.append('link_url', form.link_url || '');
    formData.append('is_active', form.is_active ? '1' : '0');
    formData.append('display_order', String(form.display_order));
    
    if (file) {
      formData.append('image', file);
    }

    if (editItem) {
      // Update - pakai POST dengan _method PUT
      formData.append('_method', 'PUT');
      await carouselService.update(editItem.id, formData);
      addToast('Carousel berhasil diupdate', 'success');
    } else {
      // Create
      if (!file) {
        addToast('Pilih gambar untuk carousel baru', 'error');
        setIsSaving(false);
        return;
      }
      await carouselService.create(formData);
      addToast('Carousel berhasil ditambahkan', 'success');
    }
    
    setShowModal(false);
    setEditItem(null);
    setFile(null);
    setForm({ title: '', subtitle: '', link_url: '', is_active: true, display_order: 0 });
    load();
  } catch (err: any) {
    const message = err.response?.data?.message || 'Gagal menyimpan carousel';
    addToast(message, 'error');
  } finally {
    setIsSaving(false);
  }
};

  const handleDelete = async (id: number) => {
    try {
      await carouselService.delete(id);
      addToast('Dihapus', 'success');
      load();
    } catch { addToast('Gagal hapus', 'error'); }
  };

  const openEdit = (item: Carousel) => {
    setEditItem(item);
    setForm({ title: item.title || '', subtitle: item.subtitle || '', link_url: item.link_url || '', is_active: item.is_active, display_order: item.display_order });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Carousel</h1>
        <button onClick={() => { setEditItem(null); setForm({ title: '', subtitle: '', link_url: '', is_active: true, display_order: 0 }); setFile(null); setShowModal(true); }}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-600">+ Tambah</button>
      </div>

      {isLoading ? <div className="space-y-4">{[1,2].map(i => <div key={i} className="h-24 bg-surface-muted rounded-2xl animate-pulse" />)}</div> : (
        <div className="space-y-3">
          {carousels.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-surface rounded-2xl shadow-soft p-4">
              <img src={item.image_url} alt={item.title} className="w-32 h-20 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.title || 'Tanpa Judul'}</p>
                <p className="text-caption text-muted">Order: {item.display_order} · {item.is_active ? 'Aktif' : 'Nonaktif'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="px-3 py-1 text-xs text-primary hover:bg-primary/5 rounded-lg">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="px-3 py-1 text-xs text-accent hover:bg-accent/5 rounded-lg">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Carousel' : 'Tambah Carousel'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Judul</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="block text-sm font-medium mb-1">Subtitle</label><input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none" /></div>
          <div><label className="block text-sm font-medium mb-1">Link URL</label><input value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none" /></div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" /><span className="text-sm">Aktif</span></label>
            <div><label className="text-sm mr-2">Order:</label><input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-20 px-2 py-1 border rounded-lg text-sm text-center" /></div>
          </div>
          <ImageUploader onFileSelect={(f) => setFile(f)} currentImage={editItem?.image_url} onRemove={() => setFile(null)} />
          <button onClick={handleSave} disabled={isSaving} className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-600 disabled:opacity-50">
            {isSaving ? 'Menyimpan...' : editItem ? 'Update' : 'Tambah'}
          </button>
        </div>
      </Modal>
    </div>
  );
}