'use client';
import { useState } from 'react';
import KPICard from '@/components/pbi/KPICard';
import BarChart from '@/components/pbi/BarChart';
import LineChartComponent from '@/components/pbi/LineChartComponent';
import DonutChart from '@/components/pbi/DonutChart';
import DataTable from '@/components/pbi/DataTable';
import Slicer from '@/components/pbi/Slicer';
import { Layers, Eye, EyeOff } from 'lucide-react';

const atomicOverlayColors = {
  Atom: 'border-blue-500/40 bg-blue-500/5',
  Molecule: 'border-violet-500/40 bg-violet-500/5',
  Organism: 'border-pink-500/40 bg-pink-500/5',
};

export default function ExecutiveDashboardPage() {
  const [overlay, setOverlay] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Executive Dashboard</h1>
          <p className="text-on-surface-variant">A composed page built from atoms, molecules, and organisms</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant">Atomic Overlay:</span>
          {['Atom', 'Molecule', 'Organism'].map(level => (
            <button
              key={level}
              onClick={() => setOverlay(overlay === level ? null : level)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                overlay === level ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {overlay === level ? <Eye size={12} /> : <EyeOff size={12} />}
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="bg-surface-variant/20 rounded-3xl border border-outline-variant/20 p-6 space-y-4">
        {/* Slicers Row */}
        <div className={`rounded-2xl p-4 transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2' : ''}`}>
          {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-2 block">MOLECULE — Slicer</span>}
          <div className="flex gap-4">
            <Slicer variant="chips" />
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          {['revenue', 'trend', 'target', 'compact'].map(v => (
            <div key={v} className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
              {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE</span>}
              <KPICard variant={v} />
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`col-span-2 rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Bar Chart</span>}
            <BarChart variant="grouped" />
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Donut</span>}
            <DonutChart variant="donut" />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`col-span-2 rounded-2xl transition-all ${overlay === 'Organism' ? atomicOverlayColors.Organism + ' border-2 p-1' : ''}`}>
            {overlay === 'Organism' && <span className="text-[10px] font-bold text-pink-600 mb-1 block px-2">ORGANISM — Data Table</span>}
            <DataTable variant="conditional" />
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Line Chart</span>}
            <LineChartComponent variant="area" />
          </div>
        </div>
      </div>
    </div>
  );
}
