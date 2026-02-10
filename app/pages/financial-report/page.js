'use client';
import { useState } from 'react';
import BarChart from '@/components/pbi/BarChart';
import LineChartComponent from '@/components/pbi/LineChartComponent';
import DonutChart from '@/components/pbi/DonutChart';
import DataTable from '@/components/pbi/DataTable';
import Slicer from '@/components/pbi/Slicer';
import ThemePanel from '@/components/ui/ThemePanel';
import { useTheme } from '@/context/ThemeContext';
import { Eye, EyeOff, TrendingUp, TrendingDown, DollarSign, Percent, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const atomicOverlayColors = {
  Atom: 'border-blue-500/40 bg-blue-500/5',
  Molecule: 'border-violet-500/40 bg-violet-500/5',
  Organism: 'border-pink-500/40 bg-pink-500/5',
};

function FinancialKPI({ label, value, change, changeType, subtitle }) {
  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
      <p className="text-xs font-medium text-on-surface-variant mb-1">{label}</p>
      <p className="text-2xl font-bold text-on-surface mb-1">{value}</p>
      <div className="flex items-center gap-2">
        {changeType === 'positive' && (
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600"><ArrowUpRight size={12} />{change}</span>
        )}
        {changeType === 'negative' && (
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-600"><ArrowDownRight size={12} />{change}</span>
        )}
        {changeType === 'neutral' && (
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-on-surface-variant"><Minus size={12} />{change}</span>
        )}
        {subtitle && <span className="text-[11px] text-on-surface-variant">{subtitle}</span>}
      </div>
    </div>
  );
}

function PLSummary() {
  const rows = [
    { label: 'Revenue', current: '$12.4M', prior: '$11.1M', variance: '+$1.3M', pct: '+11.7%', type: 'positive', indent: 0, bold: true },
    { label: 'Cost of Goods Sold', current: '$7.2M', prior: '$6.8M', variance: '+$0.4M', pct: '+5.9%', type: 'negative', indent: 1 },
    { label: 'Gross Profit', current: '$5.2M', prior: '$4.3M', variance: '+$0.9M', pct: '+20.9%', type: 'positive', indent: 0, bold: true },
    { label: 'Operating Expenses', current: '$3.1M', prior: '$2.9M', variance: '+$0.2M', pct: '+6.9%', type: 'negative', indent: 1 },
    { label: 'Salaries & Benefits', current: '$1.8M', prior: '$1.7M', variance: '+$0.1M', pct: '+5.9%', type: 'negative', indent: 2 },
    { label: 'Marketing', current: '$0.7M', prior: '$0.6M', variance: '+$0.1M', pct: '+16.7%', type: 'negative', indent: 2 },
    { label: 'Other', current: '$0.6M', prior: '$0.6M', variance: '$0', pct: '0%', type: 'neutral', indent: 2 },
    { label: 'EBITDA', current: '$2.1M', prior: '$1.4M', variance: '+$0.7M', pct: '+50.0%', type: 'positive', indent: 0, bold: true },
    { label: 'Depreciation', current: '$0.3M', prior: '$0.3M', variance: '$0', pct: '0%', type: 'neutral', indent: 1 },
    { label: 'Net Income', current: '$1.8M', prior: '$1.1M', variance: '+$0.7M', pct: '+63.6%', type: 'positive', indent: 0, bold: true },
  ];

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
      <div className="px-5 py-3 bg-surface-variant/50 border-b border-outline-variant/20">
        <h3 className="text-sm font-semibold text-on-surface">Profit & Loss Summary</h3>
        <p className="text-[10px] text-on-surface-variant">FY 2024 vs FY 2023</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-outline-variant/20 text-[11px] text-on-surface-variant uppercase">
            <th className="text-left px-5 py-2 font-medium">Line Item</th>
            <th className="text-right px-4 py-2 font-medium">Current</th>
            <th className="text-right px-4 py-2 font-medium">Prior</th>
            <th className="text-right px-4 py-2 font-medium">Variance</th>
            <th className="text-right px-5 py-2 font-medium">% Change</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-variant/30 transition-colors ${r.bold ? 'bg-surface-variant/20' : ''}`}>
              <td className={`px-5 py-2.5 text-on-surface ${r.bold ? 'font-semibold' : ''}`} style={{ paddingLeft: `${20 + r.indent * 16}px` }}>
                {r.label}
              </td>
              <td className={`px-4 py-2.5 text-right text-on-surface ${r.bold ? 'font-semibold' : ''}`}>{r.current}</td>
              <td className="px-4 py-2.5 text-right text-on-surface-variant">{r.prior}</td>
              <td className={`px-4 py-2.5 text-right font-medium ${r.type === 'positive' ? 'text-emerald-600' : r.type === 'negative' ? 'text-red-600' : 'text-on-surface-variant'}`}>
                {r.variance}
              </td>
              <td className={`px-5 py-2.5 text-right font-medium ${r.type === 'positive' ? 'text-emerald-600' : r.type === 'negative' ? 'text-red-600' : 'text-on-surface-variant'}`}>
                {r.pct}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FinancialReportPage() {
  const [overlay, setOverlay] = useState(null);
  const { getCSSOverrides } = useTheme();

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6" style={getCSSOverrides()}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Financial Report</h1>
          <p className="text-on-surface-variant">P&L summary, revenue trends, cost allocation, and margin analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant">Atomic Overlay:</span>
          {['Atom', 'Molecule', 'Organism'].map(level => (
            <button key={level} onClick={() => setOverlay(overlay === level ? null : level)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${overlay === level ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant hover:text-on-surface'}`}>
              {overlay === level ? <Eye size={12} /> : <EyeOff size={12} />}
              {level}
            </button>
          ))}
        </div>
      </div>

      <ThemePanel />

      <div className="bg-surface-variant/20 rounded-3xl border border-outline-variant/20 p-6 space-y-4">
        {/* Date Slicer */}
        <div className={`rounded-2xl p-4 transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2' : ''}`}>
          {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-2 block">MOLECULE — Slicer</span>}
          <Slicer variant="date" />
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '$12.4M', change: '+11.7%', changeType: 'positive', subtitle: 'vs prior year' },
            { label: 'Gross Margin', value: '41.9%', change: '+3.2pp', changeType: 'positive', subtitle: 'vs 38.7%' },
            { label: 'Net Income', value: '$1.8M', change: '+63.6%', changeType: 'positive', subtitle: 'vs $1.1M' },
            { label: 'OpEx Ratio', value: '25.0%', change: '+0.9pp', changeType: 'negative', subtitle: 'vs 26.1%' },
          ].map((kpi, i) => (
            <div key={i} className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
              {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE</span>}
              <FinancialKPI {...kpi} />
            </div>
          ))}
        </div>

        {/* Revenue Trend + Cost Breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`col-span-2 rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Revenue Trend</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Revenue vs Expenses (Monthly)</h3>
              <LineChartComponent variant="multi" />
            </div>
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Cost Allocation</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Cost Allocation</h3>
              <DonutChart variant="donut" />
            </div>
          </div>
        </div>

        {/* P&L Statement */}
        <div className={`rounded-2xl transition-all ${overlay === 'Organism' ? atomicOverlayColors.Organism + ' border-2 p-1' : ''}`}>
          {overlay === 'Organism' && <span className="text-[10px] font-bold text-pink-600 mb-1 block px-2">ORGANISM — P&L Statement</span>}
          <PLSummary />
        </div>

        {/* Revenue by Region */}
        <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
          {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Revenue by Region</span>}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Revenue by Region</h3>
            <BarChart variant="horizontal" />
          </div>
        </div>
      </div>
    </div>
  );
}
