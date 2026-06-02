import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  backgroundUrl?: string;
  title?: string;
  description?: string;
}

export default function HeroBanner({ backgroundUrl, title, description }: HeroBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      container.style.setProperty('--mouse-x', String(x));
      container.style.setProperty('--mouse-y', String(y));
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[2rem] min-h-[420px] md:min-h-[520px] flex items-center"
    >
      {/* Background Image */}
      {backgroundUrl ? (
        <img
          src={backgroundUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[20s] hover:scale-100"
          style={{ transform: 'scale(1.05) translate(calc(var(--mouse-x, 0) * -20px), calc(var(--mouse-y, 0) * -20px))' }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-accent" />
      )}

      {/* Overlay Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Decorative Orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 py-16 md:py-20 max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-medium mb-6 border border-white/10">
          <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
          Portal Berita Resmi
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-5">
          {title || 'Selamat Datang di Portal Berita Jurnalistik'}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/trending"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-medium rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 active:scale-[0.98]"
          >
            Jelajahi Berita
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/10"
          >
            Beranda
          </Link>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}