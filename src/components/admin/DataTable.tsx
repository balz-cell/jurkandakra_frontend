interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: number }>({ 
  columns, 
  data, 
  actions, 
  isLoading,
  emptyMessage = 'Tidak ada data' 
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-surface rounded-2xl shadow-soft p-8">
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-surface-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-surface rounded-2xl shadow-soft p-12 text-center">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-muted">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {actions && <th className="text-right px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-muted">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-surface-muted/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-6 py-4 text-sm ${col.className || ''}`}>
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-right">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}