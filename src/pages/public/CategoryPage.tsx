import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';
import { ContentList, Category } from '../../types';
import ContentCard from '../../components/public/ContentCard';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [contents, setContents] = useState<ContentList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    setError(null);
    setPage(1);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await categoryService.getContents(slug, page);
        if (response?.category) setCategory(response.category);
        if (response?.contents?.data) {
          setContents(response.contents.data);
          setTotalPages(response.contents.meta?.last_page || 1);
          setTotal(response.contents.meta?.total || 0);
        } else if (Array.isArray(response?.contents)) {
          setContents(response.contents);
          setTotalPages(1);
          setTotal(response.contents.length);
        } else {
          setContents([]);
          setTotal(0);
        }
      } catch (err: any) {
        setError('Gagal memuat data kategori. Silakan coba lagi.');
        setContents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug, page]);

  if (isLoading) return <div className="container-custom py-24"><LoadingSpinner /></div>;
  if (error) return (
    <div className="container-custom py-24">
      <ErrorState message={error} onRetry={() => setPage(1)} />
    </div>
  );

  return (
    <div className="container-custom py-24">
      {category && (
        <div className="relative mb-10 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-primary/5 to-secondary/5 border border-primary/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-7 bg-secondary rounded-full" />
              <h1 className="font-display text-2xl md:text-section text-text">{category.name}</h1>
            </div>
            {category.description && <p className="text-muted text-sm ml-4 max-w-2xl">{category.description}</p>}
            {total > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs rounded-full mt-3 ml-4 font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                {total} berita
              </div>
            )}
          </div>
        </div>
      )}

      {contents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
          <Pagination currentPage={page} lastPage={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <EmptyState icon="📰" title="Belum ada berita" description="Belum ada berita di kategori ini. Silakan cek kategori lain." />
      )}
    </div>
  );
}