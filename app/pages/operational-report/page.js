'use client';
import { useState } from 'react';
import KPICard from '@/components/pbi/KPICard';
import BarChart from '@/components/pbi/BarChart';
import LineChartComponent from '@/components/pbi/LineChartComponent';
import GaugeComponent from '@/components/pbi/GaugeComponent';
import DataTable from '@/components/pbi/DataTable';
import Slicer from '@/components/pbi/Slicer';
import ThemePanel from '@/components/ui/ThemePanel';
import { useTheme } from '@/context/ThemeContext';
import { Layers, Eye, EyeOff, Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const atomicOverlayColors = {
  Atom: 'border-blue-500/40 bg-blue-500/5',
  Molecule: 'border-violet-500/40 bg-violet-500/5',
  Organism: 'border-pink-500/40 bg-pink-500/5',
};

function StatusCard({ label, value, status, icon: Icon }) {
  const colors = {
    good: 'text-emerald-600 bg-emerald-50',
    warning: 'text-amber-600 bg-amber-50',
    critical: 'text-red-600 bg-red-50',
    info: 'text-blue-600 bg-blue-50',
  };
  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[status]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-on-surface-variant">{label}</p>
        <p className="text-xl font-bold text-on-surface">{value}</p>
      </div>
    </div>
  );
}

function LiveFeed() {
  const events = [
    { time: '16:34', msg: 'Server CPU spike resolved — Region: US-East', type: 'success' },
    { time: '16:28', msg: 'Throughput dropped below threshold — Line 4', type: 'warning' },
    { time: '16:15', msg: 'Batch #4821 completed — 1,240 units processed', type: 'info' },
    { time: '16:02', msg: 'Maintenance window scheduled — Machine D', type: 'info' },
    { time: '15:55', msg: 'Error rate elevated — API Gateway > 2%', type: 'error' },
    { time: '15:41', msg: 'Auto-scaling triggered — 3 new instances', type: 'success' },
  ];
  const dotColors = { success: 'bg-emerald-500', warning: 'bg-amber-500', info: 'bg-blue-500', error: 'bg-red-500' };

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <h3 className="text-sm font-semibold text-on-surface">Live Activity Feed</h3>
      </div>
      <div className="space-y-3 max-h-72 overflow-y-auto">
        {events.map((e, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-[10px] font-mono text-on-surface-variant w-10 shrink-0 pt-1">{e.time}</span>
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColors[e.type]}`} />
            <p className="text-sm text-on-surface">{e.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OperationalReportPage() {
  const [overlay, setOverlay] = useState(null);
  const { getCSSOverrides } = useTheme();

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6" style={getCSSOverrides()}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Operational Report</h1>
          <p className="text-on-surface-variant">Real-time monitoring, throughput tracking, and operational KPIs</p>
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
        {/* Slicers */}
        <div className={`rounded-2xl p-4 transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2' : ''}`}>
          {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-2 block">MOLECULE — Slicer</span>}
          <div className="flex gap-4">
            <Slicer variant="chips" />
          </div>
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Uptime', value: '99.7%', status: 'good', icon: CheckCircle2 },
            { label: 'Active Alerts', value: '3', status: 'warning', icon: AlertTriangle },
            { label: 'Throughput', value: '1,240/hr', status: 'good', icon: Activity },
            { label: 'Avg Response', value: '142ms', status: 'info', icon: Clock },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl transition-all ${overlay === 'Atom' ? atomicOverlayColors.Atom + ' border-2 p-1' : ''}`}>
              {overlay === 'Atom' && <span className="text-[10px] font-bold text-blue-600 mb-1 block px-2">ATOM</span>}
              <StatusCard {...s} />
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`col-span-2 rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Line Chart (Throughput)</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Hourly Throughput</h3>
              <LineChartComponent variant="area" />
            </div>
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Gauge</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">System Health</h3>
              <GaugeComponent variant="status" />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`col-span-2 rounded-2xl transition-all ${overlay === 'Organism' ? atomicOverlayColors.Organism + ' border-2 p-1' : ''}`}>
            {overlay === 'Organism' && <span className="text-[10px] font-bold text-pink-600 mb-1 block px-2">ORGANISM — Data Table</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Recent Incidents</h3>
              <DataTable variant="conditional" />
            </div>
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Organism' ? atomicOverlayColors.Organism + ' border-2 p-1' : ''}`}>
            {overlay === 'Organism' && <span className="text-[10px] font-bold text-pink-600 mb-1 block px-2">ORGANISM — Live Feed</span>}
            <LiveFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
