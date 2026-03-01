'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { barChartConfigs } from '@/data/demos';
import { getPbiColors, getGridColor } from '@/data/demos';

if (typeof window !== 'undefined') {
  Chart.register(...registerables);
}

export default function BarChart({ variant = 'vertical', state = 'default', title }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const config = barChartConfigs[variant] || barChartConfigs.vertical;
    const data = JSON.parse(JSON.stringify(config.data));
    const pbiColors = getPbiColors();
    const gridColor = getGridColor();

    // Apply theme colors to datasets
    data.datasets.forEach((ds, i) => {
      if (ds.backgroundColor && typeof ds.backgroundColor === 'string') {
        ds.backgroundColor = pbiColors[i % pbiColors.length];
      }
    });

    chartRef.current = new Chart(canvasRef.current, {
      type: config.type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        plugins: { legend: { display: data.datasets.length > 1, position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 11 } } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } }, ...(config.options?.scales?.x || {}) },
          y: { grid: { color: gridColor }, ticks: { font: { size: 11 } }, ...(config.options?.scales?.y || {}) },
        },
        ...(config.options?.indexAxis ? { indexAxis: config.options.indexAxis } : {}),
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [variant]);

  const stateClass = {
    default: '',
    hover: 'shadow-xl border-primary/30',
    selected: 'ring-2 ring-primary',
    disabled: 'opacity-40 grayscale',
  }[state] || '';

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
      {title && <p className="text-xs font-medium text-on-surface-variant mb-3">{title}</p>}
      <div className="h-64">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
