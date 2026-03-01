'use client';
import { useState } from 'react';
import { Download, Copy, Check, Sun, Moon, RotateCcw, Paintbrush, Upload } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const systemColorKeys = [
  { key: 'primary', label: 'Primary', var: '--primary' },
  { key: 'secondary', label: 'Secondary', var: '--secondary' },
  { key: 'success', label: 'Success', var: '--success' },
  { key: 'error', label: 'Error', var: '--error' },
  { key: 'warning', label: 'Warning', var: '--warning' },
];

const readOnlyPalette = [
  { name: 'Surface', var: '--surface', light: '#ffffff', dark: '#1c1b20' },
  { name: 'Background', var: '--background', light: '#faf9f7', dark: '#141218' },
  { name: 'On Surface', var: '--on-surface', light: '#1c1b1f', dark: '#e6e0e9' },
  { name: 'Outline', var: '--outline', light: '#79747e', dark: '#938f99' },
];

function ColorPicker({ label, value, onChange, cssVar }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden group hover:border-primary/40 transition-all hover:shadow-md"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <div className="relative h-20 flex items-center justify-center" style={{ backgroundColor: value }}>
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-medium transition-opacity ${hover ? 'opacity-100' : 'opacity-60'}`}>
          <Paintbrush size={12} />
          Click to edit
        </div>
      </div>
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-on-surface">{label}</p>
          <p className="text-xs text-on-surface-variant font-mono">{cssVar}</p>
        </div>
        <span className="text-xs font-mono text-on-surface-variant bg-surface-variant/50 px-2 py-1 rounded">{value}</span>
      </div>
    </div>
  );
}

function DataColorPicker({ color, index, onChange }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex-1 group"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full h-16 rounded-xl mb-2 overflow-hidden cursor-pointer" style={{ backgroundColor: color.hex }}>
        <input
          type="color"
          value={color.hex}
          onChange={e => onChange(index, e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity pointer-events-none ${hover ? 'opacity-100' : 'opacity-0'}`}>
          <Paintbrush size={14} className="text-white" />
        </div>
      </div>
      <p className="text-xs font-medium text-on-surface text-center">{color.name}</p>
      <p className="text-[10px] text-on-surface-variant text-center font-mono">{color.hex}</p>
    </div>
  );
}

export default function ColorPage() {
  const { theme, updateColor, updateDataColor, resetTheme, importTheme, getThemeJSON, defaultTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState(null);

  const themeJSON = getThemeJSON();
  const jsonString = JSON.stringify(themeJSON, null, 2);

  const hasChanges = JSON.stringify(theme) !== JSON.stringify(defaultTheme);

  const exportTheme = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pbi-design-system-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyTheme = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!json.dataColors && !json.tableAccent) {
          setImportError('Invalid PBI theme file: missing required fields');
          return;
        }
        importTheme(json);
      } catch {
        setImportError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Color</h1>
          <p className="text-on-surface-variant">Data visualization palette with WCAG contrast ratios and Power BI theme import/export.</p>
        </div>
        <div className="flex gap-2">
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-surface border border-outline-variant/30 text-on-surface hover:bg-surface-variant transition-colors cursor-pointer">
            <Upload size={14} /> Import Theme
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          {hasChanges && (
            <button onClick={resetTheme} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-surface border border-outline-variant/30 text-on-surface hover:bg-surface-variant transition-colors">
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>
      </div>
      {importError && (
        <div className="bg-error/10 border border-error/30 rounded-xl px-4 py-3 text-sm text-error">
          {importError}
        </div>
      )}

      {/* Customizable Theme Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 rounded-2xl border border-primary/20 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <Paintbrush size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-on-surface">Live Theme Customizer</h3>
          <p className="text-xs text-on-surface-variant">Click any color swatch below to customize your theme. Changes update the Power BI Theme JSON in real-time. Use the customized theme in the Pages section.</p>
        </div>
        {hasChanges && (
          <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium animate-pulse">
            Modified
          </span>
        )}
      </div>

      {/* Editable System Colors */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Theme Colors — Click to Customize</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemColorKeys.map(c => (
            <ColorPicker
              key={c.key}
              label={c.label}
              value={theme[c.key]}
              onChange={val => updateColor(c.key, val)}
              cssVar={c.var}
            />
          ))}
        </div>
      </section>

      {/* Read-only System Colors */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">System Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {readOnlyPalette.map(c => (
            <div key={c.name} className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
              <div className="flex h-16">
                <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: c.light }}>
                  <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: c.light === '#ffffff' || c.light === '#faf9f7' ? '#333' : '#fff' }}>
                    <Sun size={10} /> {c.light}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: c.dark }}>
                  <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: '#ccc' }}>
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

      {/* Editable Data Colors */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Data Visualization Colors — Click to Customize</h2>
        <div className="flex gap-2 mb-4">
          {theme.dataColors.map((c, i) => (
            <DataColorPicker key={i} color={c} index={i} onChange={updateDataColor} />
          ))}
        </div>
      </section>

      {/* PBI Theme Export - Live JSON */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Export as Power BI Theme</h2>
          {hasChanges && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary">LIVE — reflects your changes</span>
          )}
        </div>
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-surface-variant/50 border-b border-outline-variant/20">
            <span className="text-sm font-medium text-on-surface">pbi-design-system-theme.json</span>
            <div className="flex gap-2">
              <button onClick={copyTheme} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface text-on-surface hover:bg-surface-container-high transition-colors border border-outline-variant/30">
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button onClick={exportTheme} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
          <pre className="p-5 text-xs font-mono text-on-surface overflow-x-auto max-h-96">
            {jsonString}
          </pre>
        </div>
      </section>
    </div>
  );
}
