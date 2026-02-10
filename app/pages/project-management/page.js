'use client';
import { useState } from 'react';
import BarChart from '@/components/pbi/BarChart';
import LineChartComponent from '@/components/pbi/LineChartComponent';
import GaugeComponent from '@/components/pbi/GaugeComponent';
import DonutChart from '@/components/pbi/DonutChart';
import Slicer from '@/components/pbi/Slicer';
import ThemePanel from '@/components/ui/ThemePanel';
import { useTheme } from '@/context/ThemeContext';
import { Eye, EyeOff, Calendar, Users, Clock, CheckCircle2, AlertTriangle, CircleDot, ArrowRight } from 'lucide-react';

const atomicOverlayColors = {
  Atom: 'border-blue-500/40 bg-blue-500/5',
  Molecule: 'border-violet-500/40 bg-violet-500/5',
  Organism: 'border-pink-500/40 bg-pink-500/5',
};

function ProjectCard({ name, status, progress, dueDate, lead, budget, spent }) {
  const statusColors = {
    'On Track': 'bg-emerald-100 text-emerald-700',
    'At Risk': 'bg-amber-100 text-amber-700',
    'Delayed': 'bg-red-100 text-red-700',
    'Complete': 'bg-blue-100 text-blue-700',
  };
  const statusIcons = {
    'On Track': CheckCircle2,
    'At Risk': AlertTriangle,
    'Delayed': CircleDot,
    'Complete': CheckCircle2,
  };
  const StatusIcon = statusIcons[status] || CircleDot;

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 hover:shadow-lg hover:border-primary/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-on-surface">{name}</h4>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColors[status]}`}>
          <StatusIcon size={12} />{status}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs font-medium text-on-surface">{progress}%</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[11px]">
        <div>
          <p className="text-on-surface-variant">Due</p>
          <p className="text-on-surface font-medium">{dueDate}</p>
        </div>
        <div>
          <p className="text-on-surface-variant">Lead</p>
          <p className="text-on-surface font-medium">{lead}</p>
        </div>
        <div>
          <p className="text-on-surface-variant">Budget</p>
          <p className="text-on-surface font-medium">{spent}/{budget}</p>
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  const milestones = [
    { date: 'Jan 15', name: 'Project Kickoff', status: 'done' },
    { date: 'Feb 28', name: 'Requirements Sign-off', status: 'done' },
    { date: 'Apr 1', name: 'Design Complete', status: 'done' },
    { date: 'Jun 15', name: 'Development Phase 1', status: 'current' },
    { date: 'Aug 30', name: 'UAT Start', status: 'upcoming' },
    { date: 'Oct 15', name: 'Go-Live', status: 'upcoming' },
  ];

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
      <h3 className="text-sm font-semibold text-on-surface mb-4">Project Timeline</h3>
      <div className="relative">
        <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-outline-variant/30" />
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-3 relative">
              <div className={`w-3 h-3 rounded-full shrink-0 mt-0.5 z-10 ${
                m.status === 'done' ? 'bg-primary' : m.status === 'current' ? 'bg-primary ring-4 ring-primary/20' : 'bg-surface-variant border-2 border-outline'
              }`} />
              <div className="flex-1">
                <p className={`text-sm ${m.status === 'current' ? 'font-semibold text-primary' : m.status === 'done' ? 'text-on-surface' : 'text-on-surface-variant'}`}>{m.name}</p>
                <p className="text-[11px] text-on-surface-variant">{m.date}</p>
              </div>
              {m.status === 'done' && <CheckCircle2 size={14} className="text-primary mt-0.5" />}
              {m.status === 'current' && <ArrowRight size={14} className="text-primary mt-0.5 animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceTable() {
  const resources = [
    { name: 'Alice Chen', role: 'Project Lead', allocation: 100, utilization: 92, projects: 1, status: 'optimal' },
    { name: 'Bob Martinez', role: 'Developer', allocation: 80, utilization: 95, projects: 2, status: 'over' },
    { name: 'Carol Kim', role: 'Designer', allocation: 60, utilization: 45, projects: 1, status: 'under' },
    { name: 'David Patel', role: 'Analyst', allocation: 100, utilization: 88, projects: 3, status: 'optimal' },
    { name: 'Eva Thompson', role: 'QA Engineer', allocation: 40, utilization: 38, projects: 1, status: 'optimal' },
  ];
  const statusColors = { optimal: 'text-emerald-600', over: 'text-red-600', under: 'text-amber-600' };

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
      <div className="px-5 py-3 bg-surface-variant/50 border-b border-outline-variant/20">
        <h3 className="text-sm font-semibold text-on-surface">Resource Allocation</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-outline-variant/20 text-[11px] text-on-surface-variant uppercase">
            <th className="text-left px-5 py-2 font-medium">Name</th>
            <th className="text-left px-4 py-2 font-medium">Role</th>
            <th className="text-right px-4 py-2 font-medium">Allocation</th>
            <th className="text-right px-4 py-2 font-medium">Utilization</th>
            <th className="text-right px-5 py-2 font-medium">Projects</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r, i) => (
            <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-variant/30 transition-colors">
              <td className="px-5 py-2.5 font-medium text-on-surface">{r.name}</td>
              <td className="px-4 py-2.5 text-on-surface-variant">{r.role}</td>
              <td className="px-4 py-2.5 text-right text-on-surface">{r.allocation}%</td>
              <td className={`px-4 py-2.5 text-right font-medium ${statusColors[r.status]}`}>{r.utilization}%</td>
              <td className="px-5 py-2.5 text-right text-on-surface">{r.projects}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProjectManagementPage() {
  const [overlay, setOverlay] = useState(null);
  const { getCSSOverrides } = useTheme();

  const projects = [
    { name: 'Platform Migration', status: 'On Track', progress: 65, dueDate: 'Oct 15', lead: 'Alice C.', budget: '$280K', spent: '$182K' },
    { name: 'Mobile App v2', status: 'At Risk', progress: 42, dueDate: 'Sep 30', lead: 'Bob M.', budget: '$150K', spent: '$95K' },
    { name: 'Data Warehouse', status: 'On Track', progress: 78, dueDate: 'Aug 15', lead: 'David P.', budget: '$320K', spent: '$248K' },
    { name: 'Customer Portal', status: 'Delayed', progress: 30, dueDate: 'Jul 31', lead: 'Carol K.', budget: '$200K', spent: '$120K' },
    { name: 'API Gateway', status: 'Complete', progress: 100, dueDate: 'Jun 1', lead: 'Eva T.', budget: '$90K', spent: '$87K' },
    { name: 'Analytics Engine', status: 'On Track', progress: 55, dueDate: 'Nov 30', lead: 'Alice C.', budget: '$175K', spent: '$96K' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6" style={getCSSOverrides()}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Project Management</h1>
          <p className="text-on-surface-variant">Portfolio overview, timelines, resource utilization, and budget tracking</p>
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
        {/* Summary KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Active Projects', value: '5', icon: Calendar },
            { label: 'Team Members', value: '24', icon: Users },
            { label: 'Avg Utilization', value: '82%', icon: Clock },
            { label: 'On Track', value: '60%', icon: CheckCircle2 },
          ].map((kpi, i) => (
            <div key={i} className={`rounded-2xl transition-all ${overlay === 'Atom' ? atomicOverlayColors.Atom + ' border-2 p-1' : ''}`}>
              {overlay === 'Atom' && <span className="text-[10px] font-bold text-blue-600 mb-1 block px-2">ATOM</span>}
              <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/50 flex items-center justify-center">
                  <kpi.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">{kpi.label}</p>
                  <p className="text-xl font-bold text-on-surface">{kpi.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Cards */}
        <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-2' : ''}`}>
          {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-2 block px-2">MOLECULE — Project Cards</span>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </div>

        {/* Timeline + Budget */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`rounded-2xl transition-all ${overlay === 'Organism' ? atomicOverlayColors.Organism + ' border-2 p-1' : ''}`}>
            {overlay === 'Organism' && <span className="text-[10px] font-bold text-pink-600 mb-1 block px-2">ORGANISM — Timeline</span>}
            <Timeline />
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Budget</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Budget Allocation</h3>
              <DonutChart variant="donut" />
            </div>
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Burn Rate</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Burn Rate</h3>
              <LineChartComponent variant="area" />
            </div>
          </div>
        </div>

        {/* Resource Table */}
        <div className={`rounded-2xl transition-all ${overlay === 'Organism' ? atomicOverlayColors.Organism + ' border-2 p-1' : ''}`}>
          {overlay === 'Organism' && <span className="text-[10px] font-bold text-pink-600 mb-1 block px-2">ORGANISM — Resource Table</span>}
          <ResourceTable />
        </div>
      </div>
    </div>
  );
}
