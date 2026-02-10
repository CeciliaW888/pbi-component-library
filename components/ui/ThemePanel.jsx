'use client';
import { useTheme } from '@/context/ThemeContext';
import { Palette, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ThemePanel() {
  const { theme, getCSSOverrides, defaultTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const hasChanges = JSON.stringify(theme) !== JSON.stringify(defaultTheme);

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-surface-variant/30 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
          <Palette size={16} className="text-white" />
        </div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-sm font-semibold text-on-surface">Custom Theme</p>
          <p className="text-[11px] text-on-surface-variant truncate">
            {hasChanges ? 'Using your customized colors from the Color page' : 'Default theme active — customize in the Color page'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Color preview dots */}
          <div className="flex gap-1">
            {theme.dataColors.slice(0, 5).map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
          {expanded ? <ChevronUp size={16} className="text-on-surface-variant" /> : <ChevronDown size={16} className="text-on-surface-variant" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-4 border-t border-outline-variant/20 pt-3 space-y-3">
          {/* Current theme colors */}
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: 'Primary', color: theme.primary },
              { label: 'Secondary', color: theme.secondary },
              { label: 'Success', color: theme.success },
              { label: 'Error', color: theme.error },
              { label: 'Warning', color: theme.warning },
            ].map((c, i) => (
              <div key={i} className="text-center">
                <div className="w-full h-8 rounded-lg mb-1" style={{ backgroundColor: c.color }} />
                <p className="text-[10px] text-on-surface-variant">{c.label}</p>
              </div>
            ))}
          </div>

          {/* Data palette */}
          <div>
            <p className="text-[10px] font-medium text-on-surface-variant mb-1.5 uppercase tracking-wider">Data Palette</p>
            <div className="flex gap-1">
              {theme.dataColors.map((c, i) => (
                <div key={i} className="flex-1 h-6 rounded" style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
          </div>

          <Link
            href="/foundations/color"
            className="block w-full text-center text-xs font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-lg py-2 transition-colors"
          >
            Edit Theme in Color Page →
          </Link>
        </div>
      )}
    </div>
  );
}
