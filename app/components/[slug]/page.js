'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { COMPONENTS } from '@/data/components';
import ComponentTabs from '@/components/layout/ComponentTabs';
import AtomicBadge from '@/components/ui/AtomicBadge';
import StateInspector from '@/components/ui/StateInspector';
import PBIMappingPanel from '@/components/ui/PBIMappingPanel';
import { ArrowLeft, Check, Info } from 'lucide-react';
import Link from 'next/link';

// Dynamic imports for PBI components
import KPICard from '@/components/pbi/KPICard';
import PBIButton from '@/components/pbi/PBIButton';
import Slicer from '@/components/pbi/Slicer';
import BarChart from '@/components/pbi/BarChart';
import LineChartComponent from '@/components/pbi/LineChartComponent';
import DonutChart from '@/components/pbi/DonutChart';
import DataTable from '@/components/pbi/DataTable';
import SingleCard from '@/components/pbi/SingleCard';
import GaugeComponent from '@/components/pbi/GaugeComponent';
import MapVisual from '@/components/pbi/MapVisual';

const componentMap = {
  'kpi-card': KPICard,
  'card': SingleCard,
  'button': PBIButton,
  'slicer': Slicer,
  'bar-chart': BarChart,
  'line-chart': LineChartComponent,
  'donut-chart': DonutChart,
  'table': DataTable,
  'gauge': GaugeComponent,
  'map': MapVisual,
};

export default function ComponentDetailPage({ params }) {
  const { slug } = use(params);
  const component = COMPONENTS.find(c => c.slug === slug);
  if (!component) notFound();

  const [activeTab, setActiveTab] = useState('overview');
  const [activeState, setActiveState] = useState('default');
  const [activeVariant, setActiveVariant] = useState(component.variations[0]);
  const DemoComponent = componentMap[slug];

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6">
        <ArrowLeft size={14} /> All Components
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-on-surface">{component.name}</h1>
            <AtomicBadge level={component.atomicLevel} size="lg" />
          </div>
          <p className="text-on-surface-variant max-w-2xl">{component.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <ComponentTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Live Demo */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Live Demo</h2>
            <div className="bg-surface-variant/30 rounded-2xl p-8 border border-outline-variant/20">
              <StateInspector states={component.states} onStateChange={setActiveState}>
                {DemoComponent && <DemoComponent variant={activeVariant} state={activeState} />}
              </StateInspector>
            </div>
          </section>

          {/* Variations */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">
              Variations <span className="text-on-surface-variant/50 font-normal">({component.variations.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {component.variations.map(v => (
                <button
                  key={v}
                  onClick={() => setActiveVariant(v)}
                  className={`p-3 rounded-xl text-sm font-medium capitalize text-center transition-all ${
                    activeVariant === v
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface border border-outline-variant/30 text-on-surface-variant hover:border-primary/30 hover:text-on-surface'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </section>

          {/* All Variations Preview */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">All Variations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {component.variations.map(v => (
                <div key={v} className="bg-surface-variant/20 rounded-2xl p-6 border border-outline-variant/20">
                  <p className="text-xs font-medium text-on-surface-variant mb-3 capitalize">{v}</p>
                  {DemoComponent && <DemoComponent variant={v} state="default" />}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Guidelines Tab */}
      {activeTab === 'guidelines' && (
        <div className="space-y-8">
          {/* Usage */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Usage</h2>
            <p className="text-on-surface leading-relaxed bg-surface rounded-2xl border border-outline-variant/30 p-5">
              {component.usage}
            </p>
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Best Practices</h2>
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 space-y-3">
              {component.bestPractices.map((bp, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-success" />
                  </div>
                  <p className="text-sm text-on-surface">{bp}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PBI Mapping Panel */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Power BI Mapping</h2>
            <PBIMappingPanel mapping={component.pbiMapping} />
          </section>
        </div>
      )}

      {/* Specs Tab */}
      {activeTab === 'specs' && (
        <div className="space-y-8">
          {/* States */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Interactive States</h2>
            <div className="bg-surface-variant/30 rounded-2xl p-8 border border-outline-variant/20">
              <StateInspector states={component.states} onStateChange={setActiveState}>
                {DemoComponent && <DemoComponent variant={component.variations[0]} state={activeState} />}
              </StateInspector>
            </div>
          </section>

          {/* Component Info */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Component Info</h2>
            <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-outline-variant/20">
                    <td className="px-5 py-3 text-on-surface-variant font-medium">Atomic Level</td>
                    <td className="px-5 py-3"><AtomicBadge level={component.atomicLevel} /></td>
                  </tr>
                  <tr className="border-b border-outline-variant/20">
                    <td className="px-5 py-3 text-on-surface-variant font-medium">Category</td>
                    <td className="px-5 py-3 text-on-surface">{component.category}</td>
                  </tr>
                  <tr className="border-b border-outline-variant/20">
                    <td className="px-5 py-3 text-on-surface-variant font-medium">Variations</td>
                    <td className="px-5 py-3 text-on-surface">{component.variations.join(', ')}</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 text-on-surface-variant font-medium">States</td>
                    <td className="px-5 py-3 text-on-surface">{component.states.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Accessibility */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Accessibility</h2>
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Info size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-on-surface">Ensure WCAG 2.1 AA contrast ratio (4.5:1 for text, 3:1 for large text and UI components)</p>
              </div>
              <div className="flex items-start gap-3">
                <Info size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-on-surface">Provide visible focus indicators for keyboard navigation (focus-visible state)</p>
              </div>
              <div className="flex items-start gap-3">
                <Info size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-on-surface">In Power BI: use Alt Text field for screen reader support on all visuals</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
