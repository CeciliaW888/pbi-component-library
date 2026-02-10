export default function PBIMappingPanel({ mapping }) {
  if (!mapping) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/30 rounded-2xl overflow-hidden border border-outline-variant/30">
      <div className="bg-surface p-5 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-violet-500" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Design Intent</h4>
        </div>
        <p className="text-sm text-on-surface leading-relaxed">{mapping.designIntent}</p>
      </div>
      <div className="bg-surface p-5 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Web Implementation</h4>
        </div>
        <p className="text-sm text-on-surface leading-relaxed">{mapping.webTechnique}</p>
      </div>
      <div className="bg-surface p-5 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Power BI Translation</h4>
        </div>
        <p className="text-sm text-on-surface leading-relaxed">{mapping.pbiTranslation}</p>
      </div>
    </div>
  );
}
