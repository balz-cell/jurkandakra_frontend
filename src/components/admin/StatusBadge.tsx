import { STATUS_COLORS } from '../../utils/constants';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {label || status}
    </span>
  );
}