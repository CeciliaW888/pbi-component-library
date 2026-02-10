export default function TypographyPage() {
  const typeScale = [
    { name: 'Display Large', size: '57px', weight: '400', lineHeight: '64px', use: 'Hero headlines on landing/splash' },
    { name: 'Display Medium', size: '45px', weight: '400', lineHeight: '52px', use: 'Section headers' },
    { name: 'Headline Large', size: '32px', weight: '400', lineHeight: '40px', use: 'Page titles' },
    { name: 'Headline Medium', size: '28px', weight: '500', lineHeight: '36px', use: 'KPI primary values' },
    { name: 'Title Large', size: '22px', weight: '500', lineHeight: '28px', use: 'Card headers' },
    { name: 'Title Medium', size: '16px', weight: '500', lineHeight: '24px', use: 'Visual titles in PBI' },
    { name: 'Body Large', size: '16px', weight: '400', lineHeight: '24px', use: 'Body text, descriptions' },
    { name: 'Body Medium', size: '14px', weight: '400', lineHeight: '20px', use: 'Default body, table cells' },
    { name: 'Body Small', size: '12px', weight: '400', lineHeight: '16px', use: 'Captions, helper text' },
    { name: 'Label Large', size: '14px', weight: '500', lineHeight: '20px', use: 'Button labels, navigation' },
    { name: 'Label Medium', size: '12px', weight: '500', lineHeight: '16px', use: 'Chip labels, badges' },
    { name: 'Label Small', size: '11px', weight: '500', lineHeight: '16px', use: 'Chart axis labels' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-8 py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Typography</h1>
        <p className="text-on-surface-variant">Type scale based on Material Design 3, optimized for data dashboards.</p>
      </div>

      {/* Type Scale Preview */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-6">Type Scale</h2>
        <div className="space-y-6">
          {typeScale.map(t => (
            <div key={t.name} className="flex items-baseline gap-8 p-4 bg-surface rounded-2xl border border-outline-variant/30">
              <div className="w-48 shrink-0">
                <p className="text-xs font-medium text-primary">{t.name}</p>
                <p className="text-[10px] text-on-surface-variant font-mono">{t.size} / {t.lineHeight} / {t.weight}</p>
              </div>
              <p className="text-on-surface flex-1" style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.lineHeight }}>
                Power BI
              </p>
              <p className="text-xs text-on-surface-variant w-48 text-right shrink-0">{t.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PBI Font Recommendations */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Power BI Font Recommendations</h2>
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-primary">1</div>
            <p className="text-sm text-on-surface"><strong>Segoe UI</strong> — Power BI default. Safe choice for consistency across tenants.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-primary">2</div>
            <p className="text-sm text-on-surface"><strong>DIN</strong> — Excellent for numeric-heavy dashboards. Clear digit distinction.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-primary">3</div>
            <p className="text-sm text-on-surface"><strong>Inter</strong> — Modern, open-source. Great readability at small sizes. Used in this design system.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
