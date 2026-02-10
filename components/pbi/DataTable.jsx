'use client';

const sampleData = [
  { region: 'North', revenue: '$520K', units: 1240, growth: '+12.5%', status: 'positive' },
  { region: 'South', revenue: '$380K', units: 890, growth: '-3.2%', status: 'negative' },
  { region: 'East', revenue: '$450K', units: 1100, growth: '+8.1%', status: 'positive' },
  { region: 'West', revenue: '$290K', units: 650, growth: '+1.4%', status: 'neutral' },
  { region: 'Central', revenue: '$410K', units: 980, growth: '+5.7%', status: 'positive' },
];

export default function DataTable({ variant = 'simple', state = 'default' }) {
  const stateClass = { default: '', hover: 'shadow-xl border-primary/30', selected: 'ring-2 ring-primary', disabled: 'opacity-40 grayscale' }[state] || '';

  if (variant === 'conditional') {
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
        <table className="w-full text-sm">
          <thead><tr className="bg-surface-variant/50">
            <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Region</th>
            <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Revenue</th>
            <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Growth</th>
          </tr></thead>
          <tbody>{sampleData.map((row, i) => (
            <tr key={i} className="border-t border-outline-variant/20 hover:bg-surface-variant/30 transition-colors">
              <td className="px-4 py-3 text-on-surface">{row.region}</td>
              <td className="px-4 py-3 text-right text-on-surface font-medium">{row.revenue}</td>
              <td className="px-4 py-3 text-right">
                <span className={`font-medium ${row.status === 'positive' ? 'text-success' : row.status === 'negative' ? 'text-error' : 'text-on-surface-variant'}`}>
                  {row.growth}
                </span>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    );
  }

  if (variant === 'heatmap') {
    const vals = [[8, 6, 9, 5], [4, 7, 3, 8], [6, 9, 7, 4], [3, 5, 8, 6], [7, 4, 5, 9]];
    return (
      <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
        <table className="w-full text-sm">
          <thead><tr className="bg-surface-variant/50">
            <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Region</th>
            {['Q1', 'Q2', 'Q3', 'Q4'].map(q => <th key={q} className="text-center px-4 py-3 font-medium text-on-surface-variant text-xs">{q}</th>)}
          </tr></thead>
          <tbody>{sampleData.map((row, i) => (
            <tr key={i} className="border-t border-outline-variant/20">
              <td className="px-4 py-3 text-on-surface">{row.region}</td>
              {vals[i].map((v, j) => (
                <td key={j} className="px-4 py-3 text-center">
                  <div className="w-full h-8 rounded flex items-center justify-center text-xs font-medium"
                    style={{ backgroundColor: `rgba(99,102,241,${v / 10})`, color: v > 6 ? '#fff' : '#1c1b1f' }}>
                    {v * 10}%
                  </div>
                </td>
              ))}
            </tr>
          ))}</tbody>
        </table>
      </div>
    );
  }

  // Simple table
  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 ${stateClass}`}>
      <table className="w-full text-sm">
        <thead><tr className="bg-surface-variant/50">
          <th className="text-left px-4 py-3 font-medium text-on-surface-variant text-xs">Region</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Revenue</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Units</th>
          <th className="text-right px-4 py-3 font-medium text-on-surface-variant text-xs">Growth</th>
        </tr></thead>
        <tbody>{sampleData.map((row, i) => (
          <tr key={i} className="border-t border-outline-variant/20 hover:bg-surface-variant/30 transition-colors">
            <td className="px-4 py-3 text-on-surface">{row.region}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.revenue}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.units.toLocaleString()}</td>
            <td className="px-4 py-3 text-right text-on-surface">{row.growth}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
