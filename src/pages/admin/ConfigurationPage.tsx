import { useEffect, useState, useRef } from 'react';
import { configurationService } from '../../services/configurationService';
import { useUIStore } from '../../store/uiStore';
import api from '../../services/api';
import { storageUrl } from '../../utils/storage';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const FIELDS = [
  { key: 'website_title', label: 'Judul Website', type: 'text' },
  { key: 'website_description', label: 'Deskripsi Website', type: 'text' },
  { key: 'hero_title', label: 'Teks Hero Welcome', type: 'text' },
  { key: 'about', label: 'Tentang', type: 'textarea' },
  { key: 'instagram', label: 'Instagram', type: 'text' },
  { key: 'facebook', label: 'Facebook', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'address', label: 'Alamat', type: 'textarea' },
  { key: 'phone', label: 'No. Telepon', type: 'text' },
];

export default function ConfigurationPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const addToast = useUIStore((state) => state.addToast);

  useEffect(() => {
    configurationService.getAll()
      .then((data) => {
        setConfig(data);
        if (data.logo) {
          setLogoPreview(storageUrl(data.logo));
        }
        if (data.hero_image) {
          setHeroPreview(storageUrl(data.hero_image));
        }
      })
      .catch(() => addToast('Gagal memuat konfigurasi', 'error'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = FIELDS.map(f => ({ key: f.key, value: config[f.key] || '' }));
      await configurationService.update(payload);
      addToast('Konfigurasi berhasil disimpan', 'success');
    } catch {
      addToast('Gagal menyimpan', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const { data } = await api.post('/dashboard/configurations/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setLogoPreview(data.data.logo_url);
      addToast('Logo berhasil diupload', 'success');
    } catch {
      addToast('Gagal upload logo', 'error');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleRemoveLogo = async () => {
    setLogoPreview(null);
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHero(true);
    try {
      const formData = new FormData();
      formData.append('hero_image', file);

      const { data } = await api.post('/dashboard/configurations/hero-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setHeroPreview(data.data.hero_image_url);
      addToast('Gambar hero berhasil diupload', 'success');
    } catch {
      addToast('Gagal upload gambar hero', 'error');
    } finally {
      setIsUploadingHero(false);
    }
  };

  if (isLoading) return <LoadingSpinner size="lg" />;

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl text-text mb-1">Konfigurasi Website</h1>
        <p className="text-muted text-sm">Atur informasi dan identitas website</p>
      </div>

      {/* Logo Section */}
      <div className="bg-surface rounded-2xl shadow-soft p-6">
        <h3 className="font-semibold text-text mb-4">Logo Website</h3>
        <div className="flex items-center gap-6">
          {/* Logo Preview */}
          <div className="w-24 h-24 bg-surface-muted rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-light">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <div className="text-center text-muted">
                <div className="text-2xl">🏫</div>
                <p className="text-caption">No logo</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => logoInputRef.current?.click()}
              disabled={isUploadingLogo}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50"
            >
              {isUploadingLogo ? 'Uploading...' : 'Upload Logo'}
            </button>
            {logoPreview && (
              <button
                onClick={handleRemoveLogo}
                className="block text-sm text-accent hover:underline"
              >
                Hapus Logo
              </button>
            )}
            <p className="text-caption text-muted">PNG, JPG, SVG (Max 2MB)</p>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="bg-surface rounded-2xl shadow-soft p-6">
        <h3 className="font-semibold text-text mb-4">Gambar Hero Welcome</h3>
        <p className="text-sm text-muted mb-4">Background untuk banner selamat datang di halaman utama</p>
        <div className="flex items-center gap-6">
          <div className="w-36 h-24 bg-surface-muted rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-light">
            {heroPreview ? (
              <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-muted">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-caption">No image</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => heroInputRef.current?.click()}
              disabled={isUploadingHero}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50"
            >
              {isUploadingHero ? 'Uploading...' : 'Upload Hero Image'}
            </button>
            <p className="text-caption text-muted">PNG, JPG, WebP (Max 5MB)</p>
            <input
              ref={heroInputRef}
              type="file"
              accept="image/*"
              onChange={handleHeroUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="bg-surface rounded-2xl shadow-soft p-6 space-y-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-text mb-1.5">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={config[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            ) : (
              <input
                type={field.type}
                value={config[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-4 py-3 border border-surface-muted rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-600 transition-all disabled:opacity-50"
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Konfigurasi'}
        </button>
      </div>
    </div>
  );
}