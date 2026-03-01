'use client';
import { useState } from 'react';
import { ChevronDown, Check, Calendar } from 'lucide-react';
import { slicerOptions } from '@/data/demos';

export default function Slicer({ variant = 'dropdown', state = 'default' }) {
  const [selected, setSelected] = useState([slicerOptions[0]]);
  const [open, setOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState(65);

  const stateClass = {
    default: '',
    hover: 'shadow-lg border-primary/30',
    selected: 'ring-2 ring-primary',
    disabled: 'opacity-40 pointer-events-none',
  }[state] || '';

  if (variant === 'chips') {
    return (
      <div className={`space-y-2 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs font-medium text-on-surface-variant">Region</p>
        <div className="flex flex-wrap gap-2">
          {slicerOptions.map(opt => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => setSelected(prev => isSelected ? prev.filter(s => s !== opt) : [...prev, opt])}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                  isSelected ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {isSelected && <Check size={14} />}
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-4 w-56 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs font-medium text-on-surface-variant mb-3">Region</p>
        <div className="space-y-0.5">
          {slicerOptions.map(opt => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => setSelected(prev => isSelected ? prev.filter(s => s !== opt) : [...prev, opt])}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  isSelected ? 'bg-primary-container/50 text-on-primary-container' : 'text-on-surface hover:bg-surface-variant'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-outline'}`}>
                  {isSelected && <Check size={10} className="text-on-primary" />}
                </div>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'range') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-4 w-64 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs font-medium text-on-surface-variant mb-1">Revenue Range</p>
        <p className="text-lg font-semibold text-on-surface mb-3">${rangeValue}K — $500K</p>
        <input
          type="range"
          min="0"
          max="500"
          value={rangeValue}
          onChange={(e) => setRangeValue(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
          <span>$0</span><span>$500K</span>
        </div>
      </div>
    );
  }

  if (variant === 'date') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-4 w-64 transition-all duration-300 ${stateClass}`}>
        <p className="text-xs font-medium text-on-surface-variant mb-3">Date Range</p>
        <div className="flex items-center gap-2 bg-surface-variant rounded-xl px-3 py-2">
          <Calendar size={16} className="text-on-surface-variant" />
          <span className="text-sm text-on-surface">Jan 1 — Dec 31, 2024</span>
        </div>
      </div>
    );
  }

  // Dropdown (default)
  return (
    <div className={`relative w-56 transition-all duration-300 ${stateClass}`}>
      <p className="text-xs font-medium text-on-surface-variant mb-2">Region</p>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-surface rounded-xl border border-outline-variant/50 px-3 py-2.5 text-sm text-on-surface hover:border-primary/30 transition-colors"
      >
        <span>{selected[0] || 'Select...'}</span>
        <ChevronDown size={16} className={`text-on-surface-variant transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface rounded-xl border border-outline-variant/30 shadow-xl z-10 py-1">
          {slicerOptions.map(opt => (
            <button
              key={opt}
              onClick={() => { setSelected([opt]); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-surface-variant transition-colors ${opt === selected[0] ? 'text-primary font-medium' : 'text-on-surface'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
