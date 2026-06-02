import { useEffect, useState, useRef } from 'react';
import { anggotaService } from '../../services/anggotaService';
import { divisionService } from '../../services/divisionService';
import { AnggotaJurnal, Division } from '../../types';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useUIStore } from '../../store/uiStore';

const POSITIONS = [
  'Ketua', 'Wakil',
  'Sekretaris 1', 'Sekretaris 2',
  'Bendahara 1', 'Bendahara 2',
  'Ketua divisi kameramen', 'Ketua divisi penulis', 'Ketua divisi editor', 'Ketua divisi reporter',
  'Anggota',
];

export default function AnggotaManagementPage() {
  const [anggota, setAnggota] = useState<AnggotaJurnal[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editAnggota, setEditAnggota] = useState<AnggotaJurnal | null>(null);
  const [form, setForm] = useState({
    full_name: '', nis: '', position: 'Anggota', status: 'aktif',
    joined_at: '', division_ids: [] as number[], user_id: '',
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addToast = useUIStore((state) => state.addToast);

  const load = () => {
    setIsLoading(true);
    Promise.all([
      anggotaService.getAll(),
      divisionService.getAll(),
    ])
      .then(([anggotaData, divData]) => { setAnggota(anggotaData); setDivisions(divData); })
      .catch(() => addToast('Gagal memuat data', 'error'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({ full_name: '', nis: '', position: 'Anggota', status: 'aktif', joined_at: '', division_ids: [], user_id: '' });
    setPhotoPreview(null); setPhotoFile(null); setEditAnggota(null);
  };

  const openEdit = (a: AnggotaJurnal) => {
    setEditAnggota(a);
    setForm({
      full_name: a.full_name || '', nis: a.nis || '', position: a.position,
      status: a.status, joined_at: a.joined_at || '',
      division_ids: a.divisions?.map(d => d.id) || [], user_id: a.user_id?.toString() || '',
    });
    setPhotoPreview(a.photo || null);
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.full_name.trim()) return;
    setIsSaving(true);
    try {
      const fd = new FormData();
      fd.append('full_name', form.full_name);
      fd.append('nis', form.nis);
      fd.append('position', form.position);
      fd.append('status', form.status);
      fd.append('joined_at', form.joined_at || new Date().toISOString().split('T')[0]);
      form.division_ids.forEach(id => fd.append('division_ids[]', id.toString()));
      if (photoFile) fd.append('photo', photoFile);

      if (editAnggota) {
        await anggotaService.update(editAnggota.id, fd);
        addToast('Anggota diupdate', 'success');
      } else {
        await anggotaService.create(fd);
        addToast('Anggota ditambahkan', 'success');
      }
      setShowModal(false); resetForm(); load();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Gagal menyimpan', 'error');
    } finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await anggotaService.delete(deleteId);
      addToast('Anggota dihapus', 'success');
      setDeleteId(null); load();
    } catch { addToast('Gagal menghapus', 'error'); }
  };

  const positionColors: Record<string, string> = {
    'Ketua': 'bg-yellow-100 text-yellow-700',
    'Wakil': 'bg-orange-100 text-orange-700',
    'Sekretaris 1': 'bg-blue-100 text-blue-700',
    'Sekretaris 2': 'bg-blue-50 text-blue-600',
    'Bendahara 1': 'bg-green-100 text-green-700',
    'Bendahara 2': 'bg-green-50 text-green-600',
    'Anggota': 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text">Anggota Jurnalistik</h1>
          <p className="text-muted text-sm mt-1">Kelola susunan kepengurusan organisasi</p>
        </div>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all">
          + Tambah Anggota
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'photo', header: 'Foto', render: (a: AnggotaJurnal) => (
            <img src={a.photo || '/images/default-avatar.svg'} alt={a.full_name} className="w-10 h-10 rounded-xl object-cover" />
          )},
          { key: 'full_name', header: 'Nama' },
          { key: 'nis', header: 'NIS', render: (a: AnggotaJurnal) => <span className="text-muted">{a.nis || '-'}</span> },
          { key: 'position', header: 'Posisi', render: (a: AnggotaJurnal) => (
            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${positionColors[a.position] || 'bg-surface-muted text-muted'}`}>{a.position}</span>
          )},
          { key: 'divisions', header: 'Divisi', render: (a: AnggotaJurnal) => (
            <div className="flex gap-1 flex-wrap">
              {a.divisions?.length ? a.divisions.map(d => (
                <span key={d.id} className="inline-block px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-lg">{d.name}</span>
              )) : <span className="text-muted text-xs">-</span>}
            </div>
          )},
          { key: 'status', header: 'Status', render: (a: AnggotaJurnal) => (
            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${a.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{a.status}</span>
          )},
        ]}
        data={anggota}
        isLoading={isLoading}
        emptyMessage="Belum ada anggota"
        actions={(a: AnggotaJurnal) => (
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => openEdit(a)} className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors">Edit</button>
            <button onClick={() => setDeleteId(a.id)} className="px-3 py-1.5 text-xs font-medium bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors">Hapus</button>
          </div>
        )}
      />

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editAnggota ? 'Edit Anggota' : 'Tambah Anggota'} size="lg">
        <div className="space-y-5">
          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">Foto</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-surface-muted rounded-2xl overflow-hidden border-2 border-dashed border-muted-light flex items-center justify-center">
                {photoPreview ? (
                  <img src={photoPreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all">Pilih Foto</button>
                {photoPreview && editAnggota && <button type="button" onClick={() => { setPhotoPreview(null); setPhotoFile(null); }} className="block mt-1 text-xs text-accent hover:underline">Hapus</button>}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-text mb-1.5">Nama Lengkap</label>
              <input value={form.full_name} onChange={(e) => setForm(f => ({ ...f, full_name: e.target.value }))} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nama anggota" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">NIS</label>
              <input value={form.nis} onChange={(e) => setForm(f => ({ ...f, nis: e.target.value }))} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nomor induk" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Tanggal Bergabung</label>
              <input type="date" value={form.joined_at} onChange={(e) => setForm(f => ({ ...f, joined_at: e.target.value }))} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Posisi</label>
              <select value={form.position} onChange={(e) => setForm(f => ({ ...f, position: e.target.value }))} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-surface">
                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-surface">
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
          </div>

          {/* Divisions Selection */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">Divisi (bisa pilih lebih dari satu)</label>
            <div className="grid grid-cols-2 gap-2">
              {divisions.map(div => (
                <label key={div.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.division_ids.includes(div.id) ? 'border-primary bg-primary/5' : 'border-surface-muted hover:border-primary/30'}`}>
                  <input type="checkbox" checked={form.division_ids.includes(div.id)} onChange={(e) => {
                    if (e.target.checked) setForm(f => ({ ...f, division_ids: [...f.division_ids, div.id] }));
                    else setForm(f => ({ ...f, division_ids: f.division_ids.filter(id => id !== div.id) }));
                  }} className="rounded text-primary focus:ring-primary/20" />
                  <span className="text-sm font-medium">{div.name}</span>
                </label>
              ))}
              {divisions.length === 0 && <p className="text-sm text-muted col-span-2">Buat divisi terlebih dahulu</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => { setShowModal(false); resetForm(); }} className="flex-1 py-3 border border-surface-muted text-text text-sm font-medium rounded-xl hover:bg-surface-muted transition-all">Batal</button>
            <button onClick={handleSave} disabled={isSaving || !form.full_name.trim()} className="flex-1 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50">{isSaving ? 'Menyimpan...' : 'Simpan'}</button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} title="Hapus Anggota" message="Yakin ingin menghapus anggota ini?" />
    </div>
  );
}
