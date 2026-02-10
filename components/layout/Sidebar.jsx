'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPONENTS, FOUNDATIONS } from '@/data/components';
import {
  Home, Palette, Type, LayoutGrid, Layers,
  BarChart3, LineChart, PieChart, Table2,
  Gauge, Map, MousePointerClick, SlidersHorizontal,
  CreditCard, Square, ChevronDown, ChevronRight, Sparkles, PanelLeft,
  Activity, DollarSign, FolderKanban, Heart
} from 'lucide-react';

const iconMap = {
  'kpi-card': BarChart3,
  'card': CreditCard,
  'button': MousePointerClick,
  'slicer': SlidersHorizontal,
  'bar-chart': BarChart3,
  'line-chart': LineChart,
  'donut-chart': PieChart,
  'table': Table2,
  'gauge': Gauge,
  'map': Map,
  'color': Palette,
  'typography': Type,
  'spacing': LayoutGrid,
  'elevation': Layers,
};

function NavSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-muted hover:text-sidebar-foreground transition-colors"
      >
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        {title}
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}

function NavItem({ href, icon: Icon, label, badge }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200 group ${
        isActive
          ? 'bg-white/10 text-sidebar-accent font-medium'
          : 'text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground'
      }`}
    >
      {Icon && <Icon size={18} className={`shrink-0 ${isActive ? 'text-sidebar-accent' : 'text-sidebar-muted group-hover:text-sidebar-foreground'}`} />}
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-sidebar-accent/20 text-sidebar-accent">
          {badge}
        </span>
      )}
    </Link>
  );
}

import { useState } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-sidebar flex flex-col z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} border-r border-white/5`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-sidebar-foreground truncate">PBI Design System</h1>
            <p className="text-[10px] text-sidebar-muted">Atomic Design Reference</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded hover:bg-white/5 text-sidebar-muted hover:text-sidebar-foreground transition-colors"
        >
          <PanelLeft size={16} />
        </button>
      </div>

      {collapsed ? (
        <nav className="flex-1 py-4 space-y-2">
          <Link href="/" className="flex justify-center py-2 text-sidebar-muted hover:text-sidebar-foreground"><Home size={20} /></Link>
          <Link href="/foundations/color" className="flex justify-center py-2 text-sidebar-muted hover:text-sidebar-foreground"><Palette size={20} /></Link>
          <Link href="/components" className="flex justify-center py-2 text-sidebar-muted hover:text-sidebar-foreground"><Square size={20} /></Link>
        </nav>
      ) : (
        <nav className="flex-1 overflow-y-auto py-4 space-y-1">
          <NavItem href="/" icon={Home} label="Home" />

          <NavSection title="Foundations">
            {FOUNDATIONS.map(f => (
              <NavItem key={f.slug} href={`/foundations/${f.slug}`} icon={iconMap[f.slug]} label={f.name} />
            ))}
          </NavSection>

          <NavSection title="Components">
            {COMPONENTS.map(c => (
              <NavItem key={c.slug} href={`/components/${c.slug}`} icon={iconMap[c.slug] || Square} label={c.name} badge={c.atomicLevel} />
            ))}
          </NavSection>

          <NavSection title="Pages" defaultOpen={false}>
            <NavItem href="/pages/executive-dashboard" icon={LayoutGrid} label="Executive Dashboard" />
            <NavItem href="/pages/operational-report" icon={Activity} label="Operational Report" />
            <NavItem href="/pages/financial-report" icon={DollarSign} label="Financial Report" />
            <NavItem href="/pages/project-management" icon={FolderKanban} label="Project Management" />
            <NavItem href="/pages/customer-satisfaction" icon={Heart} label="Customer Satisfaction" />
          </NavSection>
        </nav>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-white/5">
          <p className="text-[10px] text-sidebar-muted">v1.0 · SQLBI Aligned</p>
        </div>
      )}
    </aside>
  );
}
