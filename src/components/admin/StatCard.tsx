import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'bg-primary/5 text-primary',
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
};

export default function StatCard({ title, value, icon, trend, variant = 'default' }: StatCardProps) {
  return (
    <div className="bg-surface rounded-2xl shadow-soft p-5 hover:shadow-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${variantStyles[variant]}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-caption text-muted font-mono">{trend}</span>
        )}
      </div>
      <h3 className="font-display text-2xl text-text mb-0.5">{value}</h3>
      <p className="text-xs text-muted">{title}</p>
    </div>
  );
}