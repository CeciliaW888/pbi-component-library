export default function SpacingPage() {
  const scale = [
    { name: 'xs', value: '4px', tailwind: '1' },
    { name: 'sm', value: '8px', tailwind: '2' },
    { name: 'md', value: '12px', tailwind: '3' },
    { name: 'base', value: '16px', tailwind: '4' },
    { name: 'lg', value: '24px', tailwind: '6' },
    { name: 'xl', value: '32px', tailwind: '8' },
    { name: '2xl', value: '48px', tailwind: '12' },
    { name: '3xl', value: '64px', tailwind: '16' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Spacing & Layout</h1>
        <p className="text-on-surface-variant">Consistent spacing scale and grid system for visual alignment in dashboards.</p>
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Spacing Scale</h2>
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 space-y-4">
          {scale.map(s => (
            <div key={s.name} className="flex items-center gap-6">
              <div className="w-16 text-right">
                <p className="text-sm font-medium text-on-surface">{s.name}</p>
                <p className="text-[10px] text-on-surface-variant font-mono">{s.value}</p>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div className="h-6 rounded bg-primary/20 border border-primary/30" style={{ width: s.value }} />
                <span className="text-xs text-on-surface-variant font-mono">space-{s.tailwind}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Power BI Layout Grid</h2>
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 space-y-3 text-sm text-on-surface">
          <p><strong>Canvas Size:</strong> 1280 × 720px (16:9) or 1920 × 1080px for high-res displays</p>
          <p><strong>Margins:</strong> 24px outer margin on all sides</p>
          <p><strong>Grid:</strong> 12-column grid with 16px gutters</p>
          <p><strong>Card Spacing:</strong> 8px between adjacent cards for clean separation</p>
          <p><strong>Section Spacing:</strong> 24px between major dashboard sections</p>
        </div>
      </section>
    </div>
  );
}
