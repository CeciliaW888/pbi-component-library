'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const defaultTheme = {
  name: 'PBI Design System',
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#16a34a',
  error: '#dc2626',
  warning: '#f59e0b',
  dataColors: [
    { hex: '#6366f1', name: 'Indigo' },
    { hex: '#8b5cf6', name: 'Violet' },
    { hex: '#ec4899', name: 'Pink' },
    { hex: '#f97316', name: 'Orange' },
    { hex: '#14b8a6', name: 'Teal' },
    { hex: '#06b6d4', name: 'Cyan' },
    { hex: '#eab308', name: 'Yellow' },
    { hex: '#ef4444', name: 'Red' },
  ],
  background: '#ffffff',
  foreground: '#1e293b',
  fontFamily: 'Inter',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  const updateColor = useCallback((key, value) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateDataColor = useCallback((index, hex) => {
    setTheme(prev => ({
      ...prev,
      dataColors: prev.dataColors.map((c, i) => i === index ? { ...c, hex } : c),
    }));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(defaultTheme);
  }, []);

  const importTheme = useCallback((pbiThemeJson) => {
    const colorNames = ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5', 'Color 6', 'Color 7', 'Color 8'];
    const newTheme = { ...defaultTheme };

    if (pbiThemeJson.name) newTheme.name = pbiThemeJson.name;
    if (pbiThemeJson.tableAccent) newTheme.primary = pbiThemeJson.tableAccent;
    if (pbiThemeJson.center) newTheme.secondary = pbiThemeJson.center;
    if (pbiThemeJson.good) newTheme.success = pbiThemeJson.good;
    if (pbiThemeJson.bad) newTheme.error = pbiThemeJson.bad;
    if (pbiThemeJson.minimum) newTheme.warning = pbiThemeJson.minimum;
    if (pbiThemeJson.foreground?.color) newTheme.foreground = pbiThemeJson.foreground.color;
    if (pbiThemeJson.background?.color) newTheme.background = pbiThemeJson.background.color;

    if (Array.isArray(pbiThemeJson.dataColors)) {
      newTheme.dataColors = pbiThemeJson.dataColors.slice(0, 8).map((hex, i) => ({
        hex,
        name: colorNames[i] || `Color ${i + 1}`,
      }));
      while (newTheme.dataColors.length < 8) {
        newTheme.dataColors.push({ hex: defaultTheme.dataColors[newTheme.dataColors.length].hex, name: colorNames[newTheme.dataColors.length] });
      }
    }

    setTheme(newTheme);
  }, []);

  const getThemeJSON = useCallback(() => {
    return {
      name: theme.name,
      dataColors: theme.dataColors.map(c => c.hex),
      background: { color: theme.background },
      foreground: { color: theme.foreground },
      tableAccent: theme.primary,
      good: theme.success,
      neutral: theme.primary,
      bad: theme.error,
      maximum: theme.primary,
      center: theme.secondary,
      minimum: theme.warning,
      textClasses: {
        callout: { fontSize: 28, fontFace: theme.fontFamily, color: theme.foreground },
        title: { fontSize: 12, fontFace: theme.fontFamily, color: '#64748b' },
        header: { fontSize: 14, fontFace: theme.fontFamily, color: theme.foreground },
        label: { fontSize: 11, fontFace: theme.fontFamily, color: '#94a3b8' },
      },
      visualStyles: {
        '*': {
          '*': {
            background: [{ color: { solid: { color: theme.background } }, transparency: 0 }],
            border: [{ color: { solid: { color: '#e2e8f0' } }, width: 1 }],
            visualHeader: [{ visible: false }],
          },
        },
      },
    };
  }, [theme]);

  // Generate CSS custom property overrides
  const getCSSOverrides = useCallback(() => ({
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--success': theme.success,
    '--error': theme.error,
    '--warning': theme.warning,
    '--data-1': theme.dataColors[0]?.hex,
    '--data-2': theme.dataColors[1]?.hex,
    '--data-3': theme.dataColors[2]?.hex,
    '--data-4': theme.dataColors[3]?.hex,
    '--data-5': theme.dataColors[4]?.hex,
    '--data-6': theme.dataColors[5]?.hex,
    '--data-7': theme.dataColors[6]?.hex,
    '--data-8': theme.dataColors[7]?.hex,
  }), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateColor, updateDataColor, resetTheme, importTheme, getThemeJSON, getCSSOverrides, defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
