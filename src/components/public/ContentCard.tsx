import { Link } from 'react-router-dom';
import { ContentList } from '../../types';
import { timeAgo } from '../../utils/formatDate';

interface ContentCardProps {
  content: ContentList;
  variant?: 'default' | 'featured' | 'horizontal';
}

export default function ContentCard({ content, variant = 'default' }: ContentCardProps) {
  if (variant === 'featured') {
    return (
      <Link to={`/berita/${content.slug}`} className="group block relative overflow-hidden rounded-3xl shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-1">
        <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 via-50% to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {content.category && (
            <span className="inline-block px-3 py-1 bg-secondary text-white text-caption font-medium rounded-full mb-3 shadow-lg shadow-secondary/20">
              {content.category.name}
            </span>
          )}
          <h2 className="font-display text-xl md:text-3xl lg:text-4xl text-white leading-tight mb-2 line-clamp-2">{content.title}</h2>
          <p className="text-white/70 text-sm md:text-base line-clamp-2 mb-3 max-w-2xl">{content.excerpt}</p>
          <div className="flex items-center gap-3 text-white/50 text-caption">
            <span className="text-white/80">{content.author?.full_name}</span>
            <span className="text-white/30">·</span>
            <span>{timeAgo(content.published_at)}</span>
            <span className="text-white/30">·</span>
            <span>{content.reading_time} min read</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/berita/${content.slug}`} className="group flex gap-4 p-3 rounded-2xl hover:bg-surface-muted/70 transition-all duration-200">
        <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-soft">
          <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">{content.title}</h4>
          <div className="flex items-center gap-2 mt-2 text-caption text-muted">
            <span className="font-mono">{timeAgo(content.published_at)}</span>
            <span>·</span>
            <span>{content.view_count} views</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/berita/${content.slug}`} className="group block bg-surface rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-caption rounded-full font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          {content.reading_time} min
        </div>
      </div>
      <div className="p-5">
        {content.category && (
          <span className="inline-block px-2.5 py-1 bg-secondary/10 text-secondary text-caption font-medium rounded-full mb-3">
            {content.category.name}
          </span>
        )}
        <h3 className="font-display text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{content.title}</h3>
        <p className="text-muted text-sm line-clamp-2 mb-4">{content.excerpt}</p>
        <div className="flex items-center justify-between text-caption text-muted">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={content.author?.avatar || `/images/default-avatar.svg`}
              alt={content.author?.full_name}
              className="w-5 h-5 rounded-full flex-shrink-0"
            />
            <span className="font-medium truncate">{content.author?.full_name || 'Pengguna'}</span>
          </div>
          <span className="font-mono flex-shrink-0 ml-2">{timeAgo(content.published_at)}</span>
        </div>
      </div>
    </Link>
  );
}