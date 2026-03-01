'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { donutChartConfigs, getPbiColors, getSurfaceColor } from '@/data/demos';

if (typeof window !== 'undefined') Chart.register(...registerables);

export default function DonutChart({ variant = 'donut', state = 'default', title }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();
    const config = donutChartConfigs[variant] || donutChartConfigs.donut;
    const data = JSON.parse(JSON.stringify(config.data));
    const pbiColors = getPbiColors();
    const surfaceColor = getSurfaceColor();

    // Apply theme colors
    data.datasets.forEach((ds) => {
      if (Array.isArray(ds.backgroundColor)) {
        ds.backgroundColor = ds.backgroundColor.map((_, i) => pbiColors[i % pbiColors.length]);
      }
      // Fix border colors for dark mode
      if (ds.borderColor === '#fff' || ds.borderColor === '#e2e8f0') {
        ds.borderColor = surfaceColor;
      }
    });

    // Fix semicircle "Remaining" segment
    if (variant === 'semicircle' && data.datasets[0]?.backgroundColor) {
      data.datasets[0].backgroundColor[0] = pbiColors[0];
      data.datasets[0].backgroundColor[1] = surfaceColor;
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: config.type,
      data,
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 11 } } } },
        ...(config.options || {}),
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [variant]);

  const stateClass = { default: '', hover: 'shadow-xl border-primary/30', selected: 'ring-2 ring-primary', disabled: 'opacity-40 grayscale' }[state] || '';

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
      {title && <p className="text-xs font-medium text-on-surface-variant mb-3">{title}</p>}
      <div className="h-64 max-w-xs mx-auto"><canvas ref={canvasRef} /></div>
    </div>
  );
}
