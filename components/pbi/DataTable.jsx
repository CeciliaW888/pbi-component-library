'use client';
import { useState } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { tableData, tableHeatmapValues, matrixData } from '@/data/demos';

const ROWS_PER_PAGE = 3;

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
                    style={{ backgroundColor: `color-mix(in srgb, var(--primary) ${v * 10}%, transparent)`, color: v > 6 ? 'var(--on-primary)' : 'var(--on-surface)' }}>
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

  if (variant === 'matrix') {
    return <MatrixTable stateClass={stateClass} />;
  }

  if (variant === 'paginated') {
    return <PaginatedTable stateClass={stateClass} />;
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

function MatrixTable({ stateClass }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (category) => {
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
      <table className="w-full text-sm">
        <thead><tr className="bg-surface-variant/50">
          <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Category</th>
          {['Q1', 'Q2', 'Q3', 'Q4'].map(q => <th key={q} className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">{q}</th>)}
        </tr></thead>
        <tbody>
          {matrixData.rows.map((row) => (
            <>
              <tr key={row.category} className="border-t border-outline-variant/20 hover:bg-surface-variant/30 cursor-pointer transition-colors" onClick={() => toggle(row.category)}>
                <td className="px-4 py-3 text-on-surface font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    {expanded[row.category] ? <ChevronDown size={14} className="text-on-surface-variant" /> : <ChevronRight size={14} className="text-on-surface-variant" />}
                    {row.category}
                  </span>
                </td>
                {['q1', 'q2', 'q3', 'q4'].map(q => (
                  <td key={q} className="px-4 py-3 text-right text-on-surface font-medium">—</td>
                ))}
              </tr>
              {expanded[row.category] && row.subcategories.map(sub => (
                <tr key={`${row.category}-${sub.name}`} className="border-t border-outline-variant/10 bg-surface-variant/20">
                  <td className="px-4 py-2.5 text-on-surface pl-10 text-xs">{sub.name}</td>
                  <td className="px-4 py-2.5 text-right text-on-surface text-xs">{sub.q1}</td>
                  <td className="px-4 py-2.5 text-right text-on-surface text-xs">{sub.q2}</td>
                  <td className="px-4 py-2.5 text-right text-on-surface text-xs">{sub.q3}</td>
                  <td className="px-4 py-2.5 text-right text-on-surface text-xs">{sub.q4}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaginatedTable({ stateClass }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(tableData.length / ROWS_PER_PAGE);
  const pageData = tableData.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
      <table className="w-full text-sm">
        <thead><tr className="bg-surface-variant/50">
          <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Region</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Revenue</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Units</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Growth</th>
        </tr></thead>
        <tbody>{pageData.map((row, i) => (
          <tr key={i} className="border-t border-outline-variant/20 hover:bg-surface-variant/30 transition-colors">
            <td className="px-4 py-3 text-on-surface">{row.region}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.revenue}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.units.toLocaleString()}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.growth}</td>
          </tr>
        ))}</tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant/20">
        <p className="text-xs text-on-surface-variant">
          {page * ROWS_PER_PAGE + 1}–{Math.min((page + 1) * ROWS_PER_PAGE, tableData.length)} of {tableData.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-variant disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                page === i ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-variant disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
