'use client';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { kpiCardVariations } from '@/data/demos';

function Sparkline({ data, width = 120, height = 32 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} className="text-primary" />
      <circle cx={(data.length - 1) / (data.length - 1) * width} cy={height - ((data[data.length - 1] - min) / range) * height} r="3" className="fill-primary" />
    </svg>
  );
}

export default function KPICard({ variant = 'revenue', state = 'default' }) {
  const v = kpiCardVariations[variant] || kpiCardVariations.revenue;

  const stateClass = {
    default: '',
    hover: 'shadow-xl shadow-primary/10 -translate-y-1 border-primary/30',
    selected: 'ring-2 ring-primary border-primary/30',
    disabled: 'opacity-40 grayscale pointer-events-none',
    focus: 'ring-2 ring-primary ring-offset-2',
    active: 'scale-[0.98] shadow-sm',
  }[state] || '';

  if (variant === 'multi') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs font-medium text-on-surface-variant mb-4">{v.label}</p>
        <div className="grid grid-cols-3 gap-4">
          {v.metrics.map((m, i) => (
            <div key={i}>
              <p className="text-lg font-bold text-on-surface">{m.value}</p>
              <p className="text-[11px] text-on-surface-variant">{m.label}</p>
              <span className={`text-[11px] font-medium ${m.change.startsWith('+') ? 'text-success' : 'text-error'}`}>{m.change}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'target') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs font-medium text-on-surface-variant mb-1">{v.label}</p>
        <div className="flex items-end gap-2 mb-3">
          <p className="text-2xl font-bold text-on-surface">{v.value}</p>
          <p className="text-sm text-on-surface-variant mb-0.5">/ {v.target}</p>
        </div>
        <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000" style={{ width: `${v.progress}%` }} />
        </div>
        <p className="text-[11px] text-on-surface-variant mt-2">{v.progress}% of target</p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-4 flex items-center gap-4 transition-all duration-300 ${stateClass}`}>
        <div>
          <p className="text-xs text-on-surface-variant">{v.label}</p>
          <p className="text-xl font-bold text-on-surface">{v.value}</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-success">
          <ArrowUpRight size={14} />
          <span className="text-sm font-medium">{v.change}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
      <p className="text-xs font-medium text-on-surface-variant mb-1">{v.label}</p>
      <div className="flex items-end gap-3 mb-2">
        <p className="text-3xl font-bold text-on-surface">{v.value}</p>
        {variant === 'trend' && v.sparkline && <Sparkline data={v.sparkline} />}
      </div>
      <div className="flex items-center gap-2">
        {v.changeType === 'positive' ? (
          <div className="flex items-center gap-1 text-success">
            <TrendingUp size={14} />
            <span className="text-sm font-medium">{v.change}</span>
          </div>
        ) : v.changeType === 'negative' ? (
          <div className="flex items-center gap-1 text-error">
            <TrendingDown size={14} />
            <span className="text-sm font-medium">{v.change}</span>
          </div>
        ) : null}
        {v.period && <span className="text-[11px] text-on-surface-variant">{v.period}</span>}
      </div>
    </div>
  );
}
