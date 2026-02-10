'use client';
import { CreditCard, TrendingUp, Award, BarChart3, AlertCircle } from 'lucide-react';

const variations = {
  large: { label: 'Total Revenue', value: '$2,458,192', icon: null },
  icon: { label: 'Active Users', value: '84,293', icon: CreditCard },
  comparison: { label: 'Profit Margin', value: '24.8%', prev: '22.1%', change: '+2.7pp' },
  percentage: { label: 'Goal Progress', value: '78%', total: 100 },
  status: { label: 'System Health', value: 'Healthy', statusColor: '#16a34a', icon: Award },
};

export default function SingleCard({ variant = 'large', state = 'default' }) {
  const v = variations[variant] || variations.large;
  const stateClass = { default: '', hover: 'shadow-xl border-primary/30 -translate-y-1', selected: 'ring-2 ring-primary', disabled: 'opacity-40 grayscale' }[state] || '';

  if (variant === 'percentage') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs text-on-surface-variant mb-1">{v.label}</p>
        <p className="text-3xl font-bold text-on-surface mb-3">{v.value}</p>
        <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: v.value }} />
        </div>
      </div>
    );
  }

  if (variant === 'comparison') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs text-on-surface-variant mb-1">{v.label}</p>
        <p className="text-3xl font-bold text-on-surface">{v.value}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-on-surface-variant">was {v.prev}</span>
          <span className="text-sm font-medium text-success">{v.change}</span>
        </div>
      </div>
    );
  }

  if (variant === 'status') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs text-on-surface-variant mb-2">{v.label}</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${v.statusColor}20` }}>
            <v.icon size={20} style={{ color: v.statusColor }} />
          </div>
          <p className="text-2xl font-bold" style={{ color: v.statusColor }}>{v.value}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
      {v.icon && <v.icon size={20} className="text-primary mb-2" />}
      <p className="text-xs text-on-surface-variant mb-1">{v.label}</p>
      <p className="text-3xl font-bold text-on-surface">{v.value}</p>
    </div>
  );
}
