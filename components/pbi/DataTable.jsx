'use client';
import { tableData, tableHeatmapValues } from '@/data/demos';

export default function DataTable({ variant = 'simple', state = 'default' }) {
  const stateClass = { default: '', hover: 'shadow-xl border-primary/30', selected: 'ring-2 ring-primary', disabled: 'opacity-40 grayscale' }[state] || '';

  if (variant === 'conditional') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
        <table className="w-full text-sm">
          <thead><tr className="bg-surface-variant/50">
            <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Region</th>
            <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Revenue</th>
            <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Growth</th>
          </tr></thead>
          <tbody>{tableData.map((row, i) => (
            <tr key={i} className="border-t border-outline-variant/20 hover:bg-surface-variant/30 transition-colors">
              <td className="px-4 py-3 text-on-surface">{row.region}</td>
              <td className="px-4 py-3 text-right text-on-surface font-medium">{row.revenue}</td>
              <td className="px-4 py-3 text-right">
                <span className={`font-medium ${row.status === 'positive' ? 'text-success' : row.status === 'negative' ? 'text-error' : 'text-on-surface-variant'}`}>
                  {row.growth}
                </span>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    );
  }

  if (variant === 'heatmap') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
        <table className="w-full text-sm">
          <thead><tr className="bg-surface-variant/50">
            <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Region</th>
            {['Q1', 'Q2', 'Q3', 'Q4'].map(q => <th key={q} className="text-center px-4 py-3 font-medium text-on-surface-variant text-xs">{q}</th>)}
          </tr></thead>
          <tbody>{tableData.map((row, i) => (
            <tr key={i} className="border-t border-outline-variant/20">
              <td className="px-4 py-3 text-on-surface">{row.region}</td>
              {tableHeatmapValues[i].map((v, j) => (
                <td key={j} className="px-4 py-3 text-center">
                  <div className="w-full h-8 rounded flex items-center justify-center text-xs font-medium"
                    style={{ backgroundColor: `rgba(99,102,241,${v / 10})`, color: v > 6 ? '#fff' : '#1c1b1f' }}>
                    {v * 10}%
                  </div>
                </td>
              ))}
            </tr>
          ))}</tbody>
        </table>
      </div>
    );
  }

  // Simple table
  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
      <table className="w-full text-sm">
        <thead><tr className="bg-surface-variant/50">
          <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Region</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Revenue</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Units</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Growth</th>
        </tr></thead>
        <tbody>{tableData.map((row, i) => (
          <tr key={i} className="border-t border-outline-variant/20 hover:bg-surface-variant/30 transition-colors">
            <td className="px-4 py-3 text-on-surface">{row.region}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.revenue}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.units.toLocaleString()}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.growth}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
