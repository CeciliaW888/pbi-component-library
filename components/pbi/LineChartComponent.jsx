'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

if (typeof window !== 'undefined') {
  Chart.register(...registerables);
}

const configs = {
  single: {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{ label: 'Revenue', data: [120, 190, 170, 250, 280, 300, 310, 340, 370, 350, 400, 420], borderColor: '#6366f1', backgroundColor: 'transparent', tension: 0.4, pointRadius: 3, pointBackgroundColor: '#6366f1' }]
    },
  },
  multi: {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Revenue', data: [120, 190, 170, 250, 280, 300], borderColor: '#6366f1', tension: 0.4, pointRadius: 3 },
        { label: 'Expenses', data: [100, 140, 160, 180, 200, 220], borderColor: '#8b5cf6', tension: 0.4, pointRadius: 3, borderDash: [5, 5] },
        { label: 'Profit', data: [20, 50, 10, 70, 80, 80], borderColor: '#14b8a6', tension: 0.4, pointRadius: 3 },
      ]
    },
  },
  area: {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{ label: 'Users', data: [400, 600, 550, 800, 750, 950], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true, tension: 0.4, pointRadius: 0 }]
    },
  },
  sparkline: {
    data: {
      labels: Array.from({ length: 20 }, (_, i) => ''),
      datasets: [{ data: [40, 45, 38, 52, 48, 60, 55, 70, 65, 80, 75, 84, 78, 90, 85, 95, 88, 100, 96, 105], borderColor: '#6366f1', tension: 0.4, pointRadius: 0, borderWidth: 2 }]
    },
    options: { scales: { x: { display: false }, y: { display: false } }, plugins: { legend: { display: false } } },
  },
  step: {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ label: 'Status', data: [1, 1, 2, 2, 3, 3, 3], borderColor: '#6366f1', stepped: 'before', tension: 0, pointRadius: 4, pointBackgroundColor: '#6366f1' }]
    },
  },
};

export default function LineChartComponent({ variant = 'single', state = 'default' }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const config = configs[variant] || configs.single;
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
