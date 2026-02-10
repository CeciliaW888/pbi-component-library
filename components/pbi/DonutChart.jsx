'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
if (typeof window !== 'undefined') Chart.register(...registerables);

const configs = {
  donut: { type: 'doughnut', data: { labels: ['Online', 'In-Store', 'Partner', 'Wholesale'], datasets: [{ data: [40, 25, 20, 15], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f97316'], borderWidth: 0 }] }, options: { cutout: '65%' } },
  pie: { type: 'pie', data: { labels: ['Desktop', 'Mobile', 'Tablet'], datasets: [{ data: [55, 35, 10], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899'], borderWidth: 2, borderColor: '#fff' }] } },
  semicircle: { type: 'doughnut', data: { labels: ['Complete', 'Remaining'], datasets: [{ data: [72, 28], backgroundColor: ['#6366f1', '#e2e8f0'], borderWidth: 0 }] }, options: { rotation: -90, circumference: 180, cutout: '70%' } },
  nested: { type: 'doughnut', data: { labels: ['A', 'B', 'C', 'D', 'E', 'F'], datasets: [
    { data: [40, 30, 30], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899'], borderWidth: 2, borderColor: '#fff' },
    { data: [25, 25, 20, 30], backgroundColor: ['#a5b4fc', '#c4b5fd', '#f9a8d4', '#fdba74'], borderWidth: 2, borderColor: '#fff' },
  ] }, options: { cutout: '30%' } },
};

export default function DonutChart({ variant = 'donut', state = 'default' }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();
    const config = configs[variant] || configs.donut;
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
