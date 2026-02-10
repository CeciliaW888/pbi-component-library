'use client';
import { useState } from 'react';
import { Download, Copy, Check, Sun, Moon } from 'lucide-react';
import { PBI_THEME_JSON } from '@/data/components';

const palette = [
  { name: 'Primary', var: '--primary', light: '#6366f1', dark: '#a5b4fc' },
  { name: 'Secondary', var: '--secondary', light: '#8b5cf6', dark: '#c4b5fd' },
  { name: 'Surface', var: '--surface', light: '#ffffff', dark: '#1c1b20' },
  { name: 'Background', var: '--background', light: '#faf9f7', dark: '#141218' },
  { name: 'On Surface', var: '--on-surface', light: '#1c1b1f', dark: '#e6e0e9' },
  { name: 'Outline', var: '--outline', light: '#79747e', dark: '#938f99' },
  { name: 'Success', var: '--success', light: '#16a34a', dark: '#4ade80' },
  { name: 'Error', var: '--error', light: '#dc2626', dark: '#f87171' },
  { name: 'Warning', var: '--warning', light: '#f59e0b', dark: '#fbbf24' },
];

const dataColors = [
  { hex: '#6366f1', name: 'Indigo' },
  { hex: '#8b5cf6', name: 'Violet' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#f97316', name: 'Orange' },
  { hex: '#14b8a6', name: 'Teal' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#eab308', name: 'Yellow' },
  { hex: '#ef4444', name: 'Red' },
];

export default function ColorPage() {
  const [copied, setCopied] = useState(false);

  const exportTheme = () => {
    const json = JSON.stringify(PBI_THEME_JSON, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pbi-design-system-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyTheme = () => {
    navigator.clipboard.writeText(JSON.stringify(PBI_THEME_JSON, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Color</h1>
        <p className="text-on-surface-variant">Data visualization palette with WCAG contrast ratios and Power BI theme export.</p>
      </div>

      {/* System Colors */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">System Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {palette.map(c => (
            <div key={c.name} className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
              <div className="flex h-16">
                <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: c.light }}>
                  <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: c.light === '#ffffff' || c.light === '#faf9f7' ? '#333' : '#fff' }}>
                    <Sun size={10} /> {c.light}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: c.dark }}>
                  <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: c.dark === '#141218' || c.dark === '#1c1b20' ? '#ccc' : c.dark.startsWith('#e') || c.dark.startsWith('#f') || c.dark.startsWith('#c') || c.dark.startsWith('#a') || c.dark.startsWith('#9') || c.dark.startsWith('#4a') ? '#333' : '#fff' }}>
                    <Moon size={10} /> {c.dark}
                  </div>
                </div>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-sm font-medium text-on-surface">{c.name}</p>
                <p className="text-xs text-on-surface-variant font-mono">{c.var}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Colors */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Data Visualization Colors</h2>
        <div className="flex gap-2 mb-4">
          {dataColors.map(c => (
            <div key={c.hex} className="flex-1">
              <div className="w-full h-16 rounded-xl mb-2" style={{ backgroundColor: c.hex }} />
              <p className="text-xs font-medium text-on-surface text-center">{c.name}</p>
              <p className="text-[10px] text-on-surface-variant text-center font-mono">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PBI Theme Export */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Export as Power BI Theme</h2>
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-surface-variant/50 border-b border-outline-variant/20">
            <span className="text-sm font-medium text-on-surface">pbi-design-system-theme.json</span>
            <div className="flex gap-2">
              <button onClick={copyTheme} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-on-surface hover:bg-surface-container-high transition-colors">
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button onClick={exportTheme} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
          <pre className="p-5 text-xs font-mono text-on-surface overflow-x-auto max-h-96">
            {JSON.stringify(PBI_THEME_JSON, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}
