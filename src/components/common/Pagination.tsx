interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
  if (lastPage <= 1) return null;

  const pages = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(lastPage, currentPage + 2); i++) {
    pages.push(i);
  }

  const btn = (active = false) =>
    `px-3 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${
      active
        ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
        : 'border-surface-muted text-text hover:bg-primary/5 hover:border-primary/30'
    }`;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btn()} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-surface-muted`}
      >
        Sebelumnya
      </button>
      {pages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={btn()}>1</button>
          {pages[0] > 2 && <span className="px-2 text-muted text-sm">...</span>}
        </>
      )}
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className={btn(page === currentPage)}>
          {page}
        </button>
      ))}
      {pages[pages.length - 1] < lastPage && (
        <>
          {pages[pages.length - 1] < lastPage - 1 && <span className="px-2 text-muted text-sm">...</span>}
          <button onClick={() => onPageChange(lastPage)} className={btn()}>{lastPage}</button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={`${btn()} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-surface-muted`}
      >
        Selanjutnya
      </button>
    </div>
  );
}