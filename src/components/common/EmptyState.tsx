interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-16 h-16 bg-surface-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
        {icon}
      </div>
      <h3 className="font-display text-xl text-text mb-1">{title}</h3>
      {description && <p className="text-muted text-sm max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}