import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { login: doLogin, isLoading } = useAuthStore();
  const addToast = useUIStore((state) => state.addToast);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await doLogin(login, password);
      addToast('Login berhasil', 'success');
      navigate('/');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Login gagal', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="font-display text-xl text-text">Selamat Datang</h2>
        <p className="text-muted text-sm mt-1">Masuk ke akun Anda</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Username atau Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
            placeholder="username atau email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
            placeholder="Masukkan password"
          />
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
          'Masuk'
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-muted" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface px-4 text-muted">atau</span>
        </div>
      </div>

      <p className="text-center text-sm text-muted">
        Belum punya akun?{' '}
        <Link to="/register" className="text-primary font-semibold hover:text-primary-600 transition-colors">Daftar</Link>
      </p>
    </form>
  );
}
