import { useState, useCallback } from 'react';

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((pageNum: number) => {
    setPage(Math.min(Math.max(pageNum, 1), totalPages));
  }, [totalPages]);

  return { page, totalPages, setTotalPages, nextPage, prevPage, goToPage, setPage };
}