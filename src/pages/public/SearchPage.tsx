import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { ContentList } from '../../types';
import ContentCard from '../../components/public/ContentCard';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [contents, setContents] = useState<ContentList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevSearchRef = useRef(searchInput);

  const q = searchParams.get('q') || '';
  useEffect(() => {
    if (q !== searchInput) {
      setSearchInput(q);
      setPage(1);
    }
  }, [q]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!searchInput.trim()) {
      setContents([]);
      setTotal(0);
      return;
    }
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    const callApi = () => {
      setSearchParams({ q: searchInput.trim() }, { replace: true });
      setIsLoading(true);
      contentService.getContents({ page, search: searchInput.trim() }, controller.signal)
        .then((res) => {
          setContents(res.data);
          setTotalPages(res.meta.last_page);
          setTotal(res.meta.total);
        })
        .catch(() => {})
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false);
        });
    };

    const isTyping = searchInput !== prevSearchRef.current;
    prevSearchRef.current = searchInput;

    if (isTyping) {
      timerRef.current = setTimeout(callApi, 400);
    } else {
      callApi();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchInput, page]);

  return (
    <div className="container-custom py-24">
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchInput}
            onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
            placeholder="Cari berita, kategori, atau topik..."
            className="w-full pl-12 pr-6 py-4 text-base border border-surface-muted rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface transition-all shadow-soft"
            autoFocus
          />
          {searchInput && (
            <button
              onClick={() => { setSearchInput(''); setContents([]); setTotal(0); inputRef.current?.focus(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-surface-muted rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchInput.trim() && !isLoading && (
          <p className="text-muted mt-3 text-sm">
            {total} hasil untuk &quot;<span className="font-medium text-text">{searchInput}</span>&quot;
          </p>
        )}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : contents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
          <Pagination currentPage={page} lastPage={totalPages} onPageChange={setPage} />
        </>
      ) : searchInput.trim() ? (
        <EmptyState icon="🔍" title="Tidak ada hasil" description={`Tidak ada berita yang cocok dengan "${searchInput}"`} />
      ) : null}
    </div>
  );
}
