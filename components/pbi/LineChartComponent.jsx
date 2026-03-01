'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { lineChartConfigs } from '@/data/demos';

if (typeof window !== 'undefined') {
  Chart.register(...registerables);
}

export default function LineChartComponent({ variant = 'single', state = 'default' }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const config = lineChartConfigs[variant] || lineChartConfigs.single;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: JSON.parse(JSON.stringify(config.data)),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        plugins: { legend: { display: config.data.datasets.length > 1, position: 'bottom', labels: { usePointStyle: true, padding: 16, font: { size: 11 } } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } }, ...(config.options?.scales?.x || {}) },
          y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 11 } }, ...(config.options?.scales?.y || {}) },
        },
        ...(config.options?.plugins ? { plugins: { ...config.options.plugins } } : {}),
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [variant]);

  const stateClass = { default: '', hover: 'shadow-xl border-primary/30', selected: 'ring-2 ring-primary', disabled: 'opacity-40 grayscale' }[state] || '';

  return (
    <div className={`bg-surface rounded-2xl border border-outline-variant/30 p-5 transition-all duration-300 ${stateClass}`}>
      <div className={variant === 'sparkline' ? 'h-16' : 'h-64'}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
