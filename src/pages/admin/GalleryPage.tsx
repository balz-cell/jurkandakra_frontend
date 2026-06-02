import { useEffect, useState } from 'react';
import { galleryService } from '../../services/galleryService';
import { Gallery } from '../../types';
import Modal from '../../components/admin/Modal';
import ImageUploader from '../../components/admin/ImageUploader';
import { useUIStore } from '../../store/uiStore';

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const addToast = useUIStore((state) => state.addToast);

  const loadGalleries = () => {
    setIsLoading(true);
    galleryService.getDashboardGalleries()
      .then((res: any) => setGalleries(res.data || []))
      .catch(() => addToast('Gagal memuat galeri', 'error'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { loadGalleries(); }, []);

  const handleUpload = async () => {
    if (!file) return;
    setIsSaving(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);
    try {
      await galleryService.create(formData);
      addToast('Galeri ditambahkan', 'success');
      setShowModal(false); setFile(null); setTitle(''); setDescription('');
      loadGalleries();
    } catch {
      addToast('Gagal upload', 'error');
    } finally { setIsSaving(false); }
  };

  const handleDelete = async (id: number) => {
    try {
      await galleryService.delete(id);
      addToast('Galeri dihapus', 'success');
      loadGalleries();
    } catch { addToast('Gagal menghapus', 'error'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Galeri</h1>
        <button onClick={() => setShowModal(true)} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-600">+ Upload</button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-surface-muted rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleries.map((item) => (
            <div key={item.id} className="group relative bg-surface rounded-2xl shadow-soft overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-full">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-red-300 hover:text-red-100 mt-1">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Galeri">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Judul</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2 border rounded-xl text-sm outline-none resize-none" /></div>
          <ImageUploader onFileSelect={(f) => setFile(f)} onRemove={() => setFile(null)} />
          <button onClick={handleUpload} disabled={!file || isSaving}
            className="w-full py-2.5 bg-primary text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 text-sm font-medium">
            {isSaving ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </Modal>
    </div>
  );
}