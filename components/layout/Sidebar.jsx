'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPONENTS, FOUNDATIONS } from '@/data/components';
import {
  Home, Palette, Type, LayoutGrid, Layers,
  BarChart3, LineChart, PieChart, Table2,
  Gauge, Map, MousePointerClick, SlidersHorizontal,
  CreditCard, Square, ChevronDown, ChevronRight, Sparkles, PanelLeft,
  Activity, DollarSign, FolderKanban, Heart, Menu, X
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

function NavItem({ href, icon: Icon, label, badge, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
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

function SidebarContent({ collapsed, setCollapsed, onNavigate }) {
  if (collapsed) {
    return (
      <nav className="flex-1 py-4 space-y-2">
        <Link href="/" onClick={onNavigate} className="flex justify-center py-2 text-sidebar-muted hover:text-sidebar-foreground"><Home size={20} /></Link>
        <Link href="/foundations/color" onClick={onNavigate} className="flex justify-center py-2 text-sidebar-muted hover:text-sidebar-foreground"><Palette size={20} /></Link>
        <Link href="/components/kpi-card" onClick={onNavigate} className="flex justify-center py-2 text-sidebar-muted hover:text-sidebar-foreground"><Square size={20} /></Link>
      </nav>
    );
  }

  return (
    <nav className="flex-1 overflow-y-auto py-4 space-y-1">
      <NavItem href="/" icon={Home} label="Home" onClick={onNavigate} />

      <NavSection title="Foundations">
        {FOUNDATIONS.map(f => (
          <NavItem key={f.slug} href={`/foundations/${f.slug}`} icon={iconMap[f.slug]} label={f.name} onClick={onNavigate} />
        ))}
      </NavSection>

      <NavSection title="Components">
        {COMPONENTS.map(c => (
          <NavItem key={c.slug} href={`/components/${c.slug}`} icon={iconMap[c.slug] || Square} label={c.name} badge={c.atomicLevel} onClick={onNavigate} />
        ))}
      </NavSection>

      <NavSection title="Pages" defaultOpen={false}>
        <NavItem href="/pages/executive-dashboard" icon={LayoutGrid} label="Executive Dashboard" onClick={onNavigate} />
        <NavItem href="/pages/operational-report" icon={Activity} label="Operational Report" onClick={onNavigate} />
        <NavItem href="/pages/financial-report" icon={DollarSign} label="Financial Report" onClick={onNavigate} />
        <NavItem href="/pages/project-management" icon={FolderKanban} label="Project Management" onClick={onNavigate} />
        <NavItem href="/pages/customer-satisfaction" icon={Heart} label="Customer Satisfaction" onClick={onNavigate} />
      </NavSection>
    </nav>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3.5 left-4 z-50 p-2 rounded-xl bg-surface text-on-surface-variant hover:bg-surface-variant transition-colors lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless mobileOpen */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-sidebar flex flex-col z-50 border-r border-white/5 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} ${mobileOpen ? 'translate-x-0' : 'max-lg:-translate-x-full'} lg:translate-x-0`}
      >
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
          {/* Close button on mobile, collapse toggle on desktop */}
          {/* Close on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1 rounded hover:bg-white/5 text-sidebar-muted hover:text-sidebar-foreground transition-colors lg:hidden"
          >
            <X size={16} />
          </button>
          {/* Collapse on desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded hover:bg-white/5 text-sidebar-muted hover:text-sidebar-foreground transition-colors hidden lg:block"
          >
            <PanelLeft size={16} />
          </button>
        </div>

        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onNavigate={() => setMobileOpen(false)}
        />

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-white/5">
            <p className="text-[10px] text-sidebar-muted">v1.0 · SQLBI Aligned</p>
          </div>
        )}
      </aside>
    </>
  );
}
