// Demo data for PBI components
// Keep all hardcoded demo/sample data here for easy maintenance

export const kpiCardVariations = {
  revenue: {
    title: 'Revenue',
    label: 'Total Revenue',
    value: '$2.4M',
    change: '+12.5%',
    changeType: 'positive',
    period: 'vs last quarter',
  },
  trend: {
    title: 'Trend Sparkline',
    label: 'Active Users',
    value: '84,293',
    change: '+8.2%',
    changeType: 'positive',
    period: 'last 30 days',
    sparkline: [40, 45, 38, 52, 48, 60, 55, 70, 65, 80, 75, 84],
  },
  target: {
    title: 'Target vs Actual',
    label: 'Sales Target',
    value: '$1.8M',
    target: '$2.0M',
    progress: 90,
    changeType: 'warning',
  },
  multi: {
    title: 'Multi-metric',
    label: 'Performance',
    metrics: [
      { label: 'Revenue', value: '$2.4M', change: '+12%' },
      { label: 'Users', value: '84K', change: '+8%' },
      { label: 'Conversion', value: '3.2%', change: '-0.4%' },
    ],
  },
  compact: {
    title: 'Compact',
    label: 'Orders',
    value: '1,247',
    change: '+5.3%',
    changeType: 'positive',
  },
};

export const buttonVariants = {
  primary: { base: 'bg-primary text-on-primary hover:opacity-90 shadow-sm', label: 'Primary' },
  secondary: { base: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80', label: 'Secondary' },
  ghost: { base: 'bg-transparent text-primary hover:bg-primary-container/30 border border-outline-variant/50', label: 'Ghost' },
  icon: { base: 'bg-surface-variant text-on-surface hover:bg-surface-container-high', label: 'Icon Only', isIcon: true },
  toggle: { base: '', label: 'Toggle' },
};

export const barChartConfigs = {
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

export const lineChartConfigs = {
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
      labels: Array.from({ length: 20 }, () => ''),
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

export const donutChartConfigs = {
  donut: {
    type: 'doughnut',
    data: {
      labels: ['Online', 'In-Store', 'Partner', 'Wholesale'],
      datasets: [{ data: [40, 25, 20, 15], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f97316'], borderWidth: 0 }]
    },
    options: { cutout: '65%' }
  },
  pie: {
    type: 'pie',
    data: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [{ data: [55, 35, 10], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899'], borderWidth: 2, borderColor: '#fff' }]
    }
  },
  semicircle: {
    type: 'doughnut',
    data: {
      labels: ['Complete', 'Remaining'],
      datasets: [{ data: [72, 28], backgroundColor: ['#6366f1', '#e2e8f0'], borderWidth: 0 }]
    },
    options: { rotation: -90, circumference: 180, cutout: '70%' }
  },
  nested: {
    type: 'doughnut',
    data: {
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      datasets: [
        { data: [40, 30, 30], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899'], borderWidth: 2, borderColor: '#fff' },
        { data: [25, 25, 20, 30], backgroundColor: ['#a5b4fc', '#c4b5fd', '#f9a8d4', '#fdba74'], borderWidth: 2, borderColor: '#fff' },
      ]
    },
    options: { cutout: '30%' }
  },
};

export const slicerOptions = ['North', 'South', 'East', 'West', 'Central'];

export const tableData = [
  { region: 'North', revenue: '$520K', units: 1240, growth: '+12.5%', status: 'positive' },
  { region: 'South', revenue: '$380K', units: 890, growth: '-3.2%', status: 'negative' },
  { region: 'East', revenue: '$450K', units: 1100, growth: '+8.1%', status: 'positive' },
  { region: 'West', revenue: '$290K', units: 650, growth: '+1.4%', status: 'neutral' },
  { region: 'Central', revenue: '$410K', units: 980, growth: '+5.7%', status: 'positive' },
];

export const tableHeatmapValues = [
  [8, 6, 9, 5],
  [4, 7, 3, 8],
  [6, 9, 7, 4],
  [3, 5, 8, 6],
  [7, 4, 5, 9],
];

export const gaugeDefaults = {
  value: 72,
  target: 85,
};

export const gaugeStatusZones = [
  { label: 'Critical', pct: 25, color: '#ef4444' },
  { label: 'Warning', pct: 50, color: '#f59e0b' },
  { label: 'Good', pct: 75, color: '#6366f1' },
  { label: 'Excellent', pct: 100, color: '#16a34a' },
];

export const singleCardVariations = {
  large: { label: 'Total Revenue', value: '$2,458,192', icon: null },
  icon: { label: 'Active Users', value: '84,293', iconName: 'CreditCard' },
  comparison: { label: 'Profit Margin', value: '24.8%', prev: '22.1%', change: '+2.7pp' },
  percentage: { label: 'Goal Progress', value: '78%', total: 100 },
  status: { label: 'System Health', value: 'Healthy', statusColor: '#16a34a', iconName: 'Award' },
};
