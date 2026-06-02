import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { configurationService } from '../services/configurationService';
import { storageUrl } from '../utils/storage';

export default function AuthLayout() {
  const [config, setConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    configurationService.getAll().then(setConfig).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-surface-secondary to-primary/5 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg shadow-primary/20 mb-4">
            {config?.logo ? (
              <img src={storageUrl(config.logo)} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-white font-display text-2xl">J</span>
            )}
          </div>
          <h1 className="font-display text-2xl text-text">Jurnalistik</h1>
          <p className="text-muted text-sm mt-1">SMKN 2 Karanganyar</p>
        </div>
        <div className="bg-surface rounded-3xl shadow-soft border border-surface-muted/50 p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}