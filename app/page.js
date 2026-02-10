import Link from 'next/link';
import { COMPONENTS, CATEGORIES } from '@/data/components';
import { ArrowRight, Sparkles, Palette, Type, LayoutGrid, Layers } from 'lucide-react';

const atomicLevels = [
  { level: 'Atom', description: 'Smallest building blocks — buttons, labels, single value cards, icons', color: 'from-blue-500 to-cyan-500', pbi: 'Card visual, Button, Shape' },
  { level: 'Molecule', description: 'Functional groups — KPI cards, slicers, charts with axes and legends', color: 'from-violet-500 to-purple-500', pbi: 'KPI visual, Slicer, Charts' },
  { level: 'Organism', description: 'Complex sections — tables, filter panels, composed chart groups', color: 'from-pink-500 to-rose-500', pbi: 'Matrix, Filter pane, Dashboard sections' },
  { level: 'Template', description: 'Page layouts defining structure and placement of organisms', color: 'from-amber-500 to-orange-500', pbi: 'Report page layout template' },
  { level: 'Page', description: 'Fully composed pages with live data and interactions', color: 'from-emerald-500 to-teal-500', pbi: 'Complete report page' },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12 space-y-16">
      {/* Hero */}
      <section className="relative">
        <div className="absolute -top-8 -left-8 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-primary-container/50 text-on-primary-container px-3 py-1 rounded-full text-xs font-medium mb-6">
            <Sparkles size={14} />
            Atomic Design · Material 3 Inspired
          </div>
          <h1 className="text-5xl font-bold text-on-surface tracking-tight leading-tight mb-4">
            Power BI<br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Design System
            </span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
            An interactive reference for designing beautiful, data-driven Power BI reports. 
            Explore components, understand design intent, and translate web patterns into Power BI visuals.
          </p>
          <div className="flex gap-3">
            <Link
              href="/components/kpi-card"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Explore Components <ArrowRight size={16} />
            </Link>
            <Link
              href="/foundations/color"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-variant text-on-surface rounded-xl font-medium text-sm hover:bg-surface-container-high transition-colors"
            >
              View Foundations
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Foundations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Color', icon: Palette, href: '/foundations/color', desc: 'Palette & themes' },
            { name: 'Typography', icon: Type, href: '/foundations/typography', desc: 'Type scale' },
            { name: 'Spacing', icon: LayoutGrid, href: '/foundations/spacing', desc: 'Layout grid' },
            { name: 'Elevation', icon: Layers, href: '/foundations/elevation', desc: 'Depth & shadow' },
          ].map(f => (
            <Link
              key={f.name}
              href={f.href}
              className="group flex items-center gap-4 p-4 bg-surface rounded-2xl border border-outline-variant/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-container/50 flex items-center justify-center group-hover:bg-primary-container transition-colors">
                <f.icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-on-surface">{f.name}</p>
                <p className="text-xs text-on-surface-variant">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Components Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Components</h2>
          <span className="text-xs text-on-surface-variant">{COMPONENTS.length} components</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENTS.map(c => (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              className="group p-5 bg-surface rounded-2xl border border-outline-variant/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors">{c.name}</h3>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-container/50 text-primary">
                  {c.atomicLevel}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-3">{c.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded">{c.category}</span>
                <span className="text-[11px] text-on-surface-variant">{c.variations.length} variations</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Atomic Design Explainer */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-2">Atomic Design · SQLBI Aligned</h2>
        <p className="text-sm text-on-surface-variant mb-6 max-w-2xl">
          Each component is classified using atomic design principles aligned with SQLBI methodology. 
          This hierarchy guides how components compose into complete dashboard pages.
        </p>
        <div className="space-y-3">
          {atomicLevels.map(a => (
            <div key={a.level} className="flex items-start gap-4 p-4 bg-surface rounded-2xl border border-outline-variant/30">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {a.level[0]}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-on-surface">{a.level}</h3>
                <p className="text-sm text-on-surface-variant">{a.description}</p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <p className="text-xs text-on-surface-variant">PBI Equivalent</p>
                <p className="text-sm font-medium text-primary">{a.pbi}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
