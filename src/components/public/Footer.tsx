import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { configurationService } from '../../services/configurationService';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types';
import { storageUrl } from '../../utils/storage';

export default function Footer() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    configurationService.getAll().then(setConfig).catch(() => {});
    categoryService.getAll().then(setCategories).catch(() => {});
  }, []);

  return (
    <footer className="relative bg-primary text-white mt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container-custom relative py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              {config?.logo ? (
                <div className="w-11 h-11 bg-white/90 rounded-xl p-1.5 flex items-center justify-center">
                  <img src={storageUrl(config.logo)} alt="Logo" className="h-full w-auto object-contain" />
                </div>
              ) : (
                <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-display text-lg">J</span>
                </div>
              )}
              <div>
                <h3 className="font-display text-xl leading-tight">Jurnalistik</h3>
                <p className="text-primary-200/80 text-xs">SMKN 2 Karanganyar</p>
              </div>
            </div>
            <p className="text-primary-200/80 text-sm leading-relaxed mb-6 max-w-md">
              {config.about || 'Portal berita resmi Ekstrakurikuler Jurnalistik SMKN 2 Karanganyar. Menyajikan informasi terkini seputar kegiatan sekolah, prestasi, dan karya siswa.'}
            </p>
            <div className="inline-flex flex-col gap-2">
              <p className="text-xs text-secondary/80 font-medium uppercase tracking-wider">Ikuti Kami</p>
              <a
                href={`https://instagram.com/${(config.instagram || 'journalistic_smkn2kra').replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-secondary/20 transition-all duration-300 hover:scale-[1.02] border border-secondary/20 hover:border-secondary/40"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/20 group-hover:bg-secondary/30 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-secondary/80">Instagram</p>
                  <p className="text-sm font-semibold">{config.instagram || '@journalistic_smkn2kra'}</p>
                </div>
                <svg className="w-4 h-4 text-secondary/70 group-hover:translate-x-0.5 transition-transform ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary/80 mb-5">Halaman</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-200/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:w-2 transition-all" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-primary-200/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:w-2 transition-all" />
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-primary-200/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:w-2 transition-all" />
                  Tentang
                </Link>
              </li>
              <li>
                <Link to="/cari" className="text-primary-200/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:w-2 transition-all" />
                  Cari Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Dynamic Categories */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary/80 mb-5">Kategori</h4>
            <ul className="space-y-3">
              {categories.length > 0 ? categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/kategori/${cat.slug}`} className="text-primary-200/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:w-2 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              )) : (
                <>
                  <li><span className="text-primary-200/80 text-sm flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary/50" />Berita Sekolah</span></li>
                  <li><span className="text-primary-200/80 text-sm flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary/50" />Prestasi</span></li>
                  <li><span className="text-primary-200/80 text-sm flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary/50" />Ekstrakurikuler</span></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary/80 mb-5">Kontak</h4>
            <ul className="space-y-4">
              {config.address && (
                <li className="flex items-start gap-3 text-sm text-primary-200/80">
                  <svg className="w-4 h-4 text-secondary/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{config.address}</span>
                </li>
              )}
              {config.phone && (
                <li className="flex items-center gap-3 text-sm text-primary-200/80">
                  <svg className="w-4 h-4 text-secondary/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{config.phone}</span>
                </li>
              )}
              {config.email && (
                <li>
                  <a href={`mailto:${config.email}`} className="flex items-center gap-3 text-sm text-primary-200/80 hover:text-white transition-colors">
                    <svg className="w-4 h-4 text-secondary/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{config.email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-300/80 text-sm">
            © {new Date().getFullYear()} Jurnalistik SMKN 2 Karanganyar. All rights reserved.
          </p>
          <p className="text-secondary/60 text-xs flex items-center gap-1">
            Made with
            <svg className="w-3.5 h-3.5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            by Tim Jurnalistik
          </p>
        </div>
      </div>
    </footer>
  );
}