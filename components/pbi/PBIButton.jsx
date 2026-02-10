'use client';

const variants = {
  primary: { base: 'bg-primary text-on-primary hover:opacity-90 shadow-sm', label: 'Primary' },
  secondary: { base: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80', label: 'Secondary' },
  ghost: { base: 'bg-transparent text-primary hover:bg-primary-container/30 border border-outline-variant/50', label: 'Ghost' },
  icon: { base: 'bg-surface-variant text-on-surface hover:bg-surface-container-high', label: 'Icon Only', isIcon: true },
  toggle: { base: '', label: 'Toggle' },
};

import { Plus, Download, Filter, ChevronRight, Bookmark } from 'lucide-react';

export default function PBIButton({ variant = 'primary', state = 'default' }) {
  const v = variants[variant] || variants.primary;

  const stateClass = {
    default: '',
    hover: 'shadow-lg -translate-y-0.5',
    focus: 'ring-2 ring-primary ring-offset-2',
    active: 'scale-95',
    disabled: 'opacity-40 pointer-events-none',
  }[state] || '';

  if (variant === 'toggle') {
    return (
      <div className="flex gap-1 bg-surface-variant/50 p-1 rounded-xl">
        <button className={`px-4 py-2 rounded-lg text-sm font-medium bg-primary text-on-primary transition-all ${stateClass}`}>Chart</button>
        <button className={`px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface transition-all ${stateClass}`}>Table</button>
        <button className={`px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface transition-all ${stateClass}`}>Map</button>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className="flex gap-2">
        <button className={`p-2.5 rounded-xl ${v.base} transition-all duration-200 ${stateClass}`}><Plus size={18} /></button>
        <button className={`p-2.5 rounded-xl ${v.base} transition-all duration-200 ${stateClass}`}><Download size={18} /></button>
        <button className={`p-2.5 rounded-xl ${v.base} transition-all duration-200 ${stateClass}`}><Filter size={18} /></button>
        <button className={`p-2.5 rounded-xl ${v.base} transition-all duration-200 ${stateClass}`}><Bookmark size={18} /></button>
      </div>
    );
  }

  return (
    <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${v.base} ${stateClass}`}>
      {variant === 'primary' && <><span>View Details</span><ChevronRight size={16} /></>}
      {variant === 'secondary' && <><Download size={16} /><span>Export Report</span></>}
      {variant === 'ghost' && <><Filter size={16} /><span>Apply Filters</span></>}
    </button>
  );
}
