import { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import { User } from '../../types';
import DataTable from '../../components/admin/DataTable';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/admin/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useUIStore } from '../../store/uiStore';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState({ username: '', email: '', full_name: '', role: 'user', password: '' });
  const [isSaving, setIsSaving] = useState(false);

  const addToast = useUIStore((state) => state.addToast);

  const loadUsers = () => {
    setIsLoading(true);
    userService.getDashboardUsers({ page, search, role: roleFilter })
      .then((res) => {
        setUsers(res.data);
        setTotalPages(res.meta.last_page);
      })
      .catch(() => addToast('Gagal memuat user', 'error'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { loadUsers(); }, [page, roleFilter]);

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      await userService.createUser(form);
      addToast('User berhasil dibuat', 'success');
      setShowCreateModal(false);
      resetForm();
      loadUsers();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Gagal membuat user', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editUser) return;
    setIsSaving(true);
    try {
      const data = { ...form };
      if (!data.password) delete (data as any).password;
      await userService.updateUser(editUser.id, data);
      addToast('User berhasil diupdate', 'success');
      setEditUser(null);
      resetForm();
      loadUsers();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Gagal update user', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await userService.deleteUser(deleteId);
      addToast('User berhasil dihapus', 'success');
      setDeleteId(null);
      loadUsers();
    } catch {
      addToast('Gagal menghapus user', 'error');
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      await userService.toggleActive(id);
      addToast('Status user diubah', 'success');
      loadUsers();
    } catch {
      addToast('Gagal mengubah status', 'error');
    }
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setForm({ username: user.username, email: user.email, full_name: user.full_name, role: user.role, password: '' });
  };

  const resetForm = () => setForm({ username: '', email: '', full_name: '', role: 'user', password: '' });

  const columns = [
    { key: 'full_name', header: 'Nama', render: (item: User) => (
      <div className="flex items-center gap-3">
        <img src={item.avatar} alt={item.full_name} className="w-8 h-8 rounded-full" />
        <div>
          <p className="font-medium text-sm">{item.full_name}</p>
          <p className="text-caption text-muted">@{item.username}</p>
        </div>
      </div>
    )},
    { key: 'email', header: 'Email', render: (item: User) => <span className="text-sm">{item.email}</span> },
    { key: 'role_label', header: 'Role', render: (item: User) => (
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary">{item.role_label}</span>
    )},
    { key: 'is_active', header: 'Status', render: (item: User) => (
      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {item.is_active ? 'Aktif' : 'Nonaktif'}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text mb-1">Manajemen User</h1>
          <p className="text-muted text-sm">Kelola akun pengguna</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all">
          + Tambah User
        </button>
      </div>

      <div className="flex gap-3">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari user..." onKeyDown={(e) => e.key === 'Enter' && loadUsers()}
          className="flex-1 max-w-sm px-4 py-2 text-sm border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
        <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 text-sm border border-surface-muted rounded-xl">
          <option value="">Semua Role</option>
          <option value="user">User</option>
          <option value="anggota_jurnals">Anggota Jurnals</option>
          <option value="kontributor">Kontributor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        emptyMessage="Tidak ada user"
        actions={(item: User) => (
          <div className="flex gap-1 justify-end">
            <button onClick={() => handleToggleActive(item.id)} className="px-2 py-1 text-xs">{item.is_active ? 'Nonaktifkan' : 'Aktifkan'}</button>
            <button onClick={() => openEditModal(item)} className="px-2 py-1 text-xs text-primary">Edit</button>
            <button onClick={() => setDeleteId(item.id)} className="px-2 py-1 text-xs text-accent">Hapus</button>
          </div>
        )}
      />

      <Pagination currentPage={page} lastPage={totalPages} onPageChange={setPage} />

      {/* Create/Edit Modal */}
      <Modal isOpen={showCreateModal || !!editUser} onClose={() => { setShowCreateModal(false); setEditUser(null); resetForm(); }}
        title={editUser ? 'Edit User' : 'Tambah User'}>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium mb-1">Username</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <div><label className="block text-sm font-medium mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none">
              <option value="user">User</option>
              <option value="anggota_jurnals">Anggota Jurnals</option>
              <option value="kontributor">Kontributor</option>
              <option value="admin">Admin</option>
            </select></div>
          <div><label className="block text-sm font-medium mb-1">Password {editUser && '(kosongkan jika tidak diubah)'}</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" /></div>
          <button onClick={editUser ? handleUpdate : handleCreate} disabled={isSaving}
            className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50">
            {isSaving ? 'Menyimpan...' : editUser ? 'Update User' : 'Tambah User'}
          </button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} title="Hapus User" message="User akan dihapus permanen. Lanjutkan?" confirmText="Hapus" variant="danger"
        onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}