'use client';
import { gaugeDefaults, gaugeStatusZones } from '@/data/demos';

export default function GaugeComponent({ variant = 'half', state = 'default' }) {
  const stateClass = { default: '', hover: 'shadow-xl border-primary/30', selected: 'ring-2 ring-primary', disabled: 'opacity-40 grayscale' }[state] || '';

  const { value, target } = gaugeDefaults;

  if (variant === 'linear') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-on-surface-variant">Completion</span>
          <span className="text-sm font-bold text-on-surface">{value}%</span>
        </div>
        <div className="w-full h-3 bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000" style={{ width: `${value}%` }} />
        </div>
        <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
          <span>0%</span>
          <span className="text-primary font-medium">Target: {target}%</span>
          <span>100%</span>
        </div>
      </div>
    );
  }

  if (variant === 'status') {
    const current = 78;
    const zone = gaugeStatusZones.find(z => current <= z.pct) || gaugeStatusZones[3];

    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 text-center transition-all duration-300 ${stateClass}`}>
        <p className="text-3xl font-bold text-on-surface">{current}%</p>
        <p className="text-sm mt-1" style={{ color: zone.color }}>{zone.label}</p>
        <div className="flex gap-1 mt-3">
          {gaugeStatusZones.map(z => (
            <div key={z.label} className="flex-1 h-2 rounded-full" style={{ backgroundColor: current >= z.pct - 24 ? z.color : 'var(--surface-variant)' }} />
          ))}
        </div>
      </div>
    );
  }

  // Half or full circle gauge (SVG)
  const isFull = variant === 'full';
  const radius = 70;
  const circumference = isFull ? 2 * Math.PI * radius : Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const viewBox = isFull ? '0 0 180 180' : '0 0 180 100';

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 flex flex-col items-center transition-all duration-300 ${stateClass}`}>
      <svg viewBox={viewBox} className="w-48">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--surface-variant)" strokeWidth="12"
          strokeDasharray={circumference} strokeDashoffset={isFull ? 0 : circumference / 2}
          transform={isFull ? '' : 'rotate(180 90 90)'} strokeLinecap="round" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke={`url(#gaugeGrad-${variant})`} strokeWidth="12"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          transform={isFull ? 'rotate(-90 90 90)' : 'rotate(180 90 90)'} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
        {variant === 'target' && (
          <line x1="90" y1={90 - radius + 6} x2="90" y2={90 - radius - 6} stroke="#f59e0b" strokeWidth="3"
            transform={`rotate(${(target / 100) * (isFull ? 360 : 180) - (isFull ? 90 : 180)} 90 90)`} />
        )}
        <text x="90" y={isFull ? '85' : '85'} textAnchor="middle" className="fill-on-surface text-2xl font-bold" style={{ fontSize: '24px' }}>
          {value}%
        </text>
        <text x="90" y={isFull ? '105' : '97'} textAnchor="middle" className="fill-on-surface-variant" style={{ fontSize: '10px' }}>
          Performance
        </text>
        <defs>
          <linearGradient id={`gaugeGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
