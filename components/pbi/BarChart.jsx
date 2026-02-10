'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

if (typeof window !== 'undefined') {
  Chart.register(...registerables);
}

const chartConfigs = {
  vertical: {
    type: 'bar',
    data: {
      labels: ['North', 'South', 'East', 'West', 'Central'],
      datasets: [{ label: 'Sales ($K)', data: [450, 380, 520, 290, 410], backgroundColor: '#6366f1', borderRadius: 6 }]
    },
  },
  horizontal: {
    type: 'bar',
    data: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      datasets: [{ label: 'Revenue', data: [320, 280, 510, 420, 180], backgroundColor: '#8b5cf6', borderRadius: 6 }]
    },
    options: { indexAxis: 'y' },
  },
  grouped: {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { label: '2023', data: [400, 450, 380, 520], backgroundColor: '#6366f1', borderRadius: 4 },
        { label: '2024', data: [480, 520, 440, 610], backgroundColor: '#8b5cf6', borderRadius: 4 },
      ]
    },
  },
  stacked: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        { label: 'Online', data: [300, 350, 280, 420, 380], backgroundColor: '#6366f1', borderRadius: 0 },
        { label: 'In-Store', data: [200, 180, 220, 250, 190], backgroundColor: '#8b5cf6', borderRadius: 0 },
        { label: 'Partner', data: [100, 120, 90, 130, 110], backgroundColor: '#ec4899', borderRadius: { topLeft: 4, topRight: 4 } },
      ]
    },
    options: { scales: { x: { stacked: true }, y: { stacked: true } } },
  },
  stacked100: {
    type: 'bar',
    data: {
      labels: ['North', 'South', 'East', 'West'],
      datasets: [
        { label: 'Category A', data: [40, 55, 35, 50], backgroundColor: '#6366f1' },
        { label: 'Category B', data: [35, 25, 40, 30], backgroundColor: '#8b5cf6' },
        { label: 'Category C', data: [25, 20, 25, 20], backgroundColor: '#ec4899' },
      ]
    },
    options: { scales: { x: { stacked: true }, y: { stacked: true, max: 100 } } },
  },
};

export default function BarChart({ variant = 'vertical', state = 'default' }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const config = chartConfigs[variant] || chartConfigs.vertical;
    chartRef.current = new Chart(canvasRef.current, {
      type: config.type,
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
      <div className="h-64">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
