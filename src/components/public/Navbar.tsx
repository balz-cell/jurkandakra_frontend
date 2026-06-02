import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../store/authStore';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types';
import { configurationService } from '../../services/configurationService';
import { storageUrl } from '../../utils/storage';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAuthenticated, user } = useAuth();
  const [config, setConfig] = useState<Record<string, string>>({});
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    categoryService.getAll().then(setCategories).catch(() => {});
    configurationService.getAll().then(setConfig).catch(() => {});
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/90 backdrop-blur-xl shadow-glass' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {config?.logo ? (
              <img src={storageUrl(config.logo)} alt="Logo" className="h-8 md:h-9 w-auto object-contain" />
            ) : (
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                <span className="text-white font-display text-sm">J</span>
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg md:text-xl text-primary">Jurnalistik</span>
              <span className="hidden sm:inline font-body text-xs text-muted">SMKN 2 Kra</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center gap-0.5">
            {[
              { to: '/', label: 'Beranda', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
              { to: '/trending', label: 'Trending', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
              { to: '/tentang', label: 'Tentang', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  currentPath === to
                    ? 'text-primary bg-primary/5'
                    : 'text-text/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {label}
                {currentPath === to && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            {categories.length > 0 && (
              <div className="relative group">
                <button className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                  currentPath.startsWith('/kategori/') ? 'text-primary bg-primary/5' : 'text-text/70 hover:text-primary hover:bg-primary/5'
                }`}>
                  Kategori
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${currentPath.startsWith('/kategori/') ? 'rotate-180' : 'group-hover:rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-surface rounded-2xl shadow-hover border border-surface-muted py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 origin-top">
                  <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">Kategori</div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/kategori/${cat.slug}`}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        currentPath === `/kategori/${cat.slug}`
                          ? 'text-primary bg-primary/5 font-semibold'
                          : 'text-text hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center justify-end gap-1">
            <button
              onClick={() => setIsSearchOpen(v => !v)}
              className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
                isSearchOpen ? 'bg-primary/10 text-primary' : 'text-text/60 hover:text-text hover:bg-surface-muted'
              }`}
              title="Cari"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isSearchOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )}
              </svg>
            </button>

            {isAuthenticated ? (
              <>
                {(user?.role === 'admin' || user?.role === 'kontributor') && (
                  <Link to="/dashboard" className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    currentPath.startsWith('/dashboard') ? 'bg-primary/10 text-primary' : 'text-primary hover:bg-primary/10'
                  }`}>
                    Dashboard
                  </Link>
                )}

                <div className="relative group ml-1">
                  <Link to={`/profil/${user?.username}`} className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-muted transition-colors border-2 border-transparent hover:border-primary/20">
                    <img
                      src={user?.avatar || `/images/default-avatar.svg`}
                      alt={user?.full_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </Link>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-surface rounded-2xl shadow-hover border border-surface-muted py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 origin-top-right">
                    <div className="px-4 py-2.5 border-b border-surface-muted mb-1">
                      <p className="text-sm font-semibold text-text truncate">{user?.full_name}</p>
                      <p className="text-xs text-muted">@{user?.username}</p>
                    </div>
                    <Link to={`/profil/${user?.username}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-primary/5 transition-colors">
                      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profil
                    </Link>
                    <Link to="/profil/edit" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-primary/5 transition-colors">
                      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Edit Profil
                    </Link>
                    {(user?.role === 'admin' || user?.role === 'kontributor') && (
                      <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${currentPath.startsWith('/dashboard') ? 'text-primary bg-primary/5' : 'text-text hover:bg-primary/5'}`}>
                        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dashboard
                      </Link>
                    )}
                    <hr className="my-1 border-surface-muted" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-accent hover:bg-accent/10 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]">
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile: Hamburger */}
          <div className="flex lg:hidden items-center gap-1 justify-end">
            <button onClick={() => setIsSearchOpen(v => !v)} className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isSearchOpen ? 'bg-primary/10 text-primary' : 'text-text hover:bg-surface-muted'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isSearchOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )}
              </svg>
            </button>
            <button onClick={() => setIsMobileMenuOpen(v => !v)} className={`p-2 rounded-xl transition-all ${isMobileMenuOpen ? 'bg-primary/10 text-primary' : 'text-text hover:bg-surface-muted'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className={`hidden lg:block overflow-hidden transition-all duration-300 ${isSearchOpen ? 'max-h-24 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-surface-muted/50 -mx-4 px-4 py-4 rounded-2xl">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berita, kategori, atau topik..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface transition-all"
                  autoFocus
                />
              </div>
              <button type="submit" className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all">Cari</button>
            </form>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isSearchOpen ? 'max-h-24 pb-3 opacity-100' : 'max-h-0 opacity-0'}`}>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berita..."
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface"
              />
            </div>
            <button type="submit" className="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all">Cari</button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-[600px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-surface-muted/50 -mx-4 px-4 py-4 rounded-2xl">
            <div className="flex flex-col gap-0.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted px-4 mb-2">Menu</div>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                currentPath === '/' ? 'text-primary bg-primary/5' : 'hover:bg-primary/5'
              }`}>
                <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                </svg>
                Beranda
              </Link>
              {categories.map((cat) => (
                <Link key={cat.id} to={`/kategori/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                  currentPath === `/kategori/${cat.slug}` ? 'text-primary bg-primary/5' : 'hover:bg-primary/5'
                }`}>
                  <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {cat.name}
                </Link>
              ))}
              <Link to="/tentang" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${currentPath === '/tentang' ? 'text-primary bg-primary/5' : 'hover:bg-primary/5'}`}>
                <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tentang
              </Link>
              <Link to="/trending" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${
                currentPath === '/trending' ? 'text-primary bg-primary/5' : 'hover:bg-primary/5'
              }`}>
                <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Trending
              </Link>
              <hr className="my-3 border-surface-muted" />
              {isAuthenticated ? (
                <>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted px-4 mb-2">Akun</div>
                  <Link to={`/profil/${user?.username}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium px-4 py-2.5 hover:bg-primary/5 rounded-xl transition-colors">
                    <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profil Saya
                  </Link>
                  <Link to="/profil/edit" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium px-4 py-2.5 hover:bg-primary/5 rounded-xl transition-colors">
                    <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Edit Profil
                  </Link>
                  {(user?.role === 'admin' || user?.role === 'kontributor') && (
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors hover:bg-primary/5 ${
                      currentPath.startsWith('/dashboard') ? 'text-primary bg-primary/5' : ''
                    }`}>
                      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Dashboard
                    </Link>
                  )}
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 text-sm font-medium px-4 py-2.5 hover:bg-accent/10 rounded-xl transition-colors text-accent">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted px-4 mb-2">Akun</div>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium px-4 py-2.5 text-primary hover:bg-primary/5 rounded-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Masuk
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm font-medium px-4 py-2.5 text-primary hover:bg-primary/5 rounded-xl transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}