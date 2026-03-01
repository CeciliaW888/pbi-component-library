'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { donutChartConfigs } from '@/data/demos';

if (typeof window !== 'undefined') Chart.register(...registerables);

export default function DonutChart({ variant = 'donut', state = 'default' }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();
    const config = donutChartConfigs[variant] || donutChartConfigs.donut;
    chartRef.current = new Chart(canvasRef.current, {
      type: config.type,
      data: JSON.parse(JSON.stringify(config.data)),
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
      <div className="h-64 max-w-xs mx-auto"><canvas ref={canvasRef} /></div>
    </div>
  );
}
