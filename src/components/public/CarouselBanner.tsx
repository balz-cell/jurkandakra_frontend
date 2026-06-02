import { useEffect, useState } from 'react';
import { carouselService } from '../../services/carouselService';
import { Carousel } from '../../types/carousel';

export default function CarouselBanner() {
  const [slides, setSlides] = useState<Carousel[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carouselService.getPublic()
      .then(setSlides)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) return <div className="aspect-[3/4] md:aspect-[16/10] bg-surface-muted rounded-3xl animate-pulse" />;
  if (slides.length === 0) return null;

  return (
    <div className="relative aspect-[3/4] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-soft">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h2 className="font-display text-xl md:text-3xl mb-1 line-clamp-2">{slide.title}</h2>
            {slide.subtitle && <p className="text-white/70 text-sm md:text-base line-clamp-2">{slide.subtitle}</p>}
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 md:right-8 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'bg-white w-8' : 'bg-white/50 w-2 hover:w-4'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}