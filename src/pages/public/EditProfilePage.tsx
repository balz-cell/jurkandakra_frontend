import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import { useUIStore } from '../../store/uiStore';
import ImageUploader from '../../components/admin/ImageUploader';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const addToast = useUIStore((state) => state.addToast);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('username', username);
      formData.append('email', email);

      if (avatar) {
        formData.append('avatar', avatar);
      }

      if (newPassword) {
        if (newPassword !== newPasswordConfirmation) {
          addToast('Konfirmasi password tidak cocok', 'error');
          setIsSaving(false);
          return;
        }
        formData.append('password', newPassword);
        formData.append('password_confirmation', newPasswordConfirmation);
        formData.append('current_password', currentPassword);
      }

      const updatedUser = await userService.updateProfile(formData);
      setUser(updatedUser as any);
      addToast('Profil berhasil diupdate', 'success');
      navigate(`/profil/${updatedUser.username}`);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Gagal update profil';
      addToast(message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <LoadingSpinner size="lg" />;

  return (
    <div className="container-custom py-24 max-w-2xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-surface-muted transition-colors">
            <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-display text-2xl text-text">Edit Profil</h1>
        </div>
        <p className="text-muted text-sm ml-10">Perbarui informasi profil Anda</p>
      </div>

      <div className="bg-surface rounded-3xl shadow-soft border border-surface-muted/50 overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Avatar Section */}
          <div className="px-6 md:px-8 pt-8 pb-6 border-b border-surface-muted/50">
            <ImageUploader
              label="Foto Profil"
              currentImage={user.avatar}
              onFileSelect={(file) => setAvatar(file)}
              onRemove={() => setAvatar(null)}
            />
          </div>

          {/* Form Fields */}
          <div className="px-6 md:px-8 py-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface-secondary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface-secondary/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface-secondary/50"
              />
            </div>

            {/* Password Section */}
            <div className="bg-surface-muted/30 -mx-6 md:-mx-8 px-6 md:px-8 py-6 mt-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-text text-sm">Ubah Password</h3>
                  <p className="text-xs text-muted">Kosongkan jika tidak ingin mengubah password</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Password Saat Ini</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini"
                    className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Password Baru</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 6 karakter"
                      minLength={6}
                      className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Konfirmasi Password</label>
                    <input
                      type="password"
                      value={newPasswordConfirmation}
                      onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                      placeholder="Ulangi password baru"
                      className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
                    />
                    {newPassword && newPasswordConfirmation && newPassword !== newPasswordConfirmation && (
                      <p className="text-xs text-accent mt-1">Password tidak cocok</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 md:px-8 py-5 border-t border-surface-muted/50 bg-surface-secondary/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 border border-surface-muted text-text font-medium rounded-xl hover:bg-surface-muted transition-colors text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50 text-sm shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
