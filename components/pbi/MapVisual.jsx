'use client';
import { MapPin } from 'lucide-react';

export default function MapVisual({ variant = 'filled', state = 'default' }) {
  const stateClass = { default: '', hover: 'shadow-xl border-primary/30', selected: 'ring-2 ring-primary', disabled: 'opacity-40 grayscale' }[state] || '';

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
      <div className="h-64 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary-container/50 flex items-center justify-center mb-4">
          <MapPin size={28} className="text-primary" />
        </div>
        <p className="text-sm font-medium text-on-surface mb-1">
          {variant === 'filled' ? 'Filled Map (Choropleth)' : 'Bubble Map'}
        </p>
        <p className="text-xs text-on-surface-variant max-w-xs">
          {variant === 'filled'
            ? 'Color-filled geographic regions showing intensity of values. Use Shape Map or Filled Map visual in Power BI.'
            : 'Bubble overlays positioned on geographic coordinates, sized by value. Use Azure Map or Map visual in Power BI.'}
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {['US', 'EU', 'APAC', 'LATAM'].map((region, i) => (
            <div key={region} className="text-center">
              <div className="w-12 h-8 rounded bg-primary/20 mb-1 flex items-center justify-center relative" style={{ opacity: 0.3 + i * 0.2 }}>
                <div className="w-full h-full rounded bg-primary" style={{ opacity: 0.3 + i * 0.2 }} />
              </div>
              <span className="text-[10px] text-on-surface-variant">{region}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
