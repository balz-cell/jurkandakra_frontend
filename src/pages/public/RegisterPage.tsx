import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', full_name: '', password: '', password_confirmation: '' });
  const { register, isLoading } = useAuthStore();
  const addToast = useUIStore((state) => state.addToast);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      addToast('Password tidak cocok', 'error');
      return;
    }
    try {
      await register(form);
      addToast('Registrasi berhasil', 'success');
      navigate('/');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Registrasi gagal', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-2">
        <h2 className="font-display text-xl text-text">Buat Akun Baru</h2>
        <p className="text-muted text-sm mt-1">Daftar untuk bergabung</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Nama Lengkap</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
            placeholder="Nama lengkap"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Username</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
            placeholder="Pilih username"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
            placeholder="email@contoh.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full pl-10 pr-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
              placeholder="Min. 6 karakter"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Konfirmasi Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
              placeholder="Ulangi password"
            />
          </div>
          {form.password && form.password_confirmation && form.password !== form.password_confirmation && (
            <p className="text-xs text-accent mt-1">Password tidak cocok</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50 text-sm shadow-lg shadow-primary/20 active:scale-[0.99]"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Memproses...
          </span>
        ) : (
          'Daftar'
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-muted" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface px-4 text-muted">sudah punya akun?</span>
        </div>
      </div>

      <p className="text-center text-sm">
        <Link to="/login" className="text-primary font-semibold hover:text-primary-600 transition-colors">Masuk</Link>
      </p>
    </form>
  );
}
