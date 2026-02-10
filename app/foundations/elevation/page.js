export default function ElevationPage() {
  const levels = [
    { name: 'Level 0', shadow: 'none', use: 'Flat elements, backgrounds', css: 'shadow-none' },
    { name: 'Level 1', shadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)', use: 'Cards, surfaces at rest', css: 'shadow-sm' },
    { name: 'Level 2', shadow: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)', use: 'Hover state on cards', css: 'shadow-md' },
    { name: 'Level 3', shadow: '0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.05)', use: 'Dropdowns, popovers', css: 'shadow-lg' },
    { name: 'Level 4', shadow: '0 20px 25px rgba(0,0,0,0.08), 0 8px 10px rgba(0,0,0,0.04)', use: 'Modals, dialogs', css: 'shadow-xl' },
    { name: 'Level 5', shadow: '0 25px 50px rgba(0,0,0,0.15)', use: 'Toast notifications', css: 'shadow-2xl' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Elevation</h1>
        <p className="text-on-surface-variant">Shadow and layering system for visual hierarchy and depth perception.</p>
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-6">Elevation Levels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map(l => (
            <div key={l.name} className="space-y-3">
              <div
                className="bg-surface rounded-2xl border border-outline-variant/30 h-32 flex items-center justify-center"
                style={{ boxShadow: l.shadow }}
              >
                <span className="text-sm font-medium text-on-surface">{l.name}</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant">{l.use}</p>
                <p className="text-[10px] text-on-surface-variant font-mono mt-1">{l.css}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Power BI Considerations</h2>
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 space-y-3 text-sm text-on-surface">
          <p>Power BI visuals support limited elevation through the <strong>Visual Background Shadow</strong> property (available in newer visuals).</p>
          <p>Use card borders and subtle background color differences to create visual hierarchy instead of heavy shadows.</p>
          <p>The page background + visual background contrast creates the primary sense of depth in PBI reports.</p>
        </div>
      </section>
    </div>
  );
}
