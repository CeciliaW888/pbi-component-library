# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Power BI Design System - an interactive reference for designing Power BI reports. Built with Next.js 16 App Router, Tailwind CSS v4, and Chart.js. Features live component demos, theme customization with PBI JSON export, and atomic design methodology aligned with SQLBI practices.

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npm run test      # Run tests in watch mode
npm run test:run  # Run tests once
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages
  - `components/[slug]/` - Dynamic component detail pages (renders PBI components)
  - `foundations/` - Design tokens pages (color, typography, spacing, elevation)
  - `pages/` - Example dashboard pages (executive, operational, financial, etc.)
- `components/` - React components
  - `layout/` - App shell (Sidebar, Header, ClientLayout, ComponentTabs)
  - `pbi/` - Power BI visualization components (KPICard, BarChart, DataTable, etc.)
  - `ui/` - Utility components (ThemePanel, StateInspector, AtomicBadge)
- `context/` - React context (ThemeContext for live theme customization and import)
- `data/` - Data files
  - `components.js` - Component definitions including PBI mappings, variations, and states
  - `demos.js` - Centralized demo/sample data for PBI components
- `__tests__/` - Test files (Vitest + Testing Library)

### Key Patterns

**Path alias**: `@/*` maps to project root (e.g., `@/components/pbi/KPICard`)

**Theme System**: Material Design 3-inspired with CSS custom properties. Theme values defined in `globals.css` (`:root` and `[data-theme="dark"]`). ThemeContext enables live customization, import/export of Power BI theme JSON.

**Barrel Exports**: Each component folder has an `index.js` for cleaner imports (e.g., `import { KPICard, BarChart } from '@/components/pbi'`).

**Component Registry**: `app/components/[slug]/page.js` uses a `componentMap` to render PBI components dynamically based on slug.

**Data Colors**: 8-color palette defined in both `globals.css` (`--pbi-1` through `--pbi-8`) and `data/components.js` (`PBI_THEME_JSON`).

### Adding a New PBI Component

1. Add demo data to `data/demos.js`
2. Create component in `components/pbi/NewComponent.jsx` with `variant` and `state` props, importing data from `@/data/demos`
3. Export from `components/pbi/index.js`
4. Add entry to `COMPONENTS` array in `data/components.js`
5. Import and add to `componentMap` in `app/components/[slug]/page.js`
