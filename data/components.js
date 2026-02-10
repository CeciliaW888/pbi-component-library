export const COMPONENTS = [
  {
    slug: "kpi-card",
    name: "KPI Card",
    category: "Data Display",
    atomicLevel: "Molecule",
    description:
      "Display key performance indicators with trend indicators, sparklines, and comparison values. The most essential Power BI component for executive dashboards.",
    usage:
      "Place KPI cards at the top of your dashboard following the F-pattern reading flow. Limit to 3-5 key metrics to avoid overwhelming users.",
    bestPractices: [
      "Always include context: time period, comparison to target, or previous period",
      "Use color coding consistently (green for positive, red for negative)",
      "Keep labels short and use standard abbreviations (YoY, MoM)",
      "Limit to 3-5 key metrics per dashboard view",
      "Place in the top row following F-pattern reading flow",
    ],
    pbiMapping: {
      designIntent:
        "Highlight the most critical business metric at a glance with trend context",
      webTechnique:
        "Card component with animated number counter, color-coded trend indicator, and hover elevation change",
      pbiTranslation:
        "Card visual or Multi-row card with conditional formatting rules. Use KPI visual for target comparison. Add tooltip pages for drill-down detail.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["revenue", "trend", "target", "multi", "compact"],
  },
  {
    slug: "card",
    name: "Card (Single Value)",
    category: "Data Display",
    atomicLevel: "Atom",
    description:
      "Simple card displaying a single metric value with optional icon, comparison, or status indicator.",
    usage:
      "Use single value cards for secondary metrics or when you need a clean, focused display of one number.",
    bestPractices: [
      "Use large, bold typography for the primary value",
      "Include a descriptive label above or below",
      "Add icons to improve scannability",
      "Use semantic colors for status indicators",
      "Keep card height consistent across a row",
    ],
    pbiMapping: {
      designIntent:
        "Present a single important value with clear labeling and optional visual emphasis",
      webTechnique:
        "Container with large typography, optional icon/badge, subtle border and shadow",
      pbiTranslation:
        "Card visual with font size and color configured. Use conditional formatting for dynamic coloring. Reference labels via DAX measures.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["large", "icon", "comparison", "percentage", "status"],
  },
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    atomicLevel: "Atom",
    description:
      "Interactive buttons for navigation, actions, and toggling views. Essential for bookmark navigation and report interactions.",
    usage:
      "Use buttons for clear call-to-action elements. In Power BI, buttons drive bookmark navigation, page navigation, and drillthrough actions.",
    bestPractices: [
      'Use clear, action-oriented labels ("View Details", not "Click Here")',
      "Maintain visual hierarchy: primary > secondary > ghost",
      "Ensure sufficient contrast for accessibility",
      "Add hover and focus states for interactivity feedback",
      "Keep button text concise (2-4 words)",
    ],
    pbiMapping: {
      designIntent: "Prompt user action — navigate, filter, toggle, or submit",
      webTechnique:
        "Button element with hover/focus/active/disabled CSS states and ripple animation",
      pbiTranslation:
        "Button visual linked to Bookmarks for view switching. Use Action type: Page navigation or Drillthrough. Style with fill, border, and icon options.",
    },
    states: ["default", "hover", "focus", "active", "disabled"],
    variations: ["primary", "secondary", "ghost", "icon", "toggle"],
  },
  {
    slug: "slicer",
    name: "Slicer",
    category: "Selection",
    atomicLevel: "Molecule",
    description:
      "Filter controls allowing users to narrow data by selecting values, ranges, or dates. Core Power BI interaction pattern.",
    usage:
      "Slicers are the primary filtering mechanism in Power BI. Place them consistently — left side or top — and sync across pages for consistency.",
    bestPractices: [
      "Position slicers consistently across all report pages",
      "Use dropdown style for slicers with many items (>7)",
      'Enable "Select All" for convenience',
      "Sync slicers across pages for consistent filtering",
      "Group related slicers together visually",
    ],
    pbiMapping: {
      designIntent: "Allow users to filter and scope data to relevant subsets",
      webTechnique:
        "Select/dropdown with search, chip buttons with multi-select, or range slider with handles",
      pbiTranslation:
        "Slicer visual — Dropdown, List, Between (for ranges), or Relative Date. Configure sync settings across pages. Use hierarchy slicers for drill-down filtering.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["dropdown", "chips", "list", "range", "date"],
  },
  {
    slug: "bar-chart",
    name: "Bar Chart",
    category: "Charts",
    atomicLevel: "Molecule",
    description:
      "Compare values across categories using vertical or horizontal bars. The workhorse chart for categorical comparisons in Power BI.",
    usage:
      "Bar charts are ideal for comparing discrete categories or showing rankings. Use when you have 3-12 categories to compare.",
    bestPractices: [
      "Sort bars by value (descending) unless category order matters",
      "Start the Y-axis at zero to avoid misleading comparisons",
      "Use a single color for one series; multiple colors only for segments",
      "Use horizontal bars for long category labels",
      "Limit to 12 categories maximum for readability",
    ],
    pbiMapping: {
      designIntent:
        "Compare discrete values across categories or show ranking order",
      webTechnique:
        "Chart.js bar chart with animated transitions, tooltip on hover, and click-to-filter interaction",
      pbiTranslation:
        "Clustered bar/column chart. Enable cross-filtering on click. Use data labels for values. Configure sort order via visual header menu.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["vertical", "horizontal", "grouped", "stacked", "stacked100"],
  },
  {
    slug: "line-chart",
    name: "Line Chart",
    category: "Charts",
    atomicLevel: "Molecule",
    description:
      "Show trends and changes over time with continuous data lines. Essential for time-series analysis in Power BI.",
    usage:
      "Line charts are perfect for displaying trends over time. Use them to show patterns, growth, or cyclical behavior.",
    bestPractices: [
      "Use no more than 4-5 lines per chart for clarity",
      "Differentiate lines with distinct colors and optional dash patterns",
      "Label the most recent data point directly on the chart",
      "Include a clear time reference on the X-axis",
      "Use area fills sparingly and only for emphasis",
    ],
    pbiMapping: {
      designIntent:
        "Reveal trends, patterns, and rate of change over time periods",
      webTechnique:
        "Chart.js line chart with tension curves, point markers, tooltip slicer, and optional area fill",
      pbiTranslation:
        "Line chart or Area chart visual. Add forecast line via Analytics pane. Use reference lines for targets. Enable drill-down for date hierarchy.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["single", "multi", "area", "sparkline", "step"],
  },
  {
    slug: "donut-chart",
    name: "Donut / Pie Chart",
    category: "Charts",
    atomicLevel: "Molecule",
    description:
      "Show part-to-whole relationships with circular segments. Best for 3-6 categories that total 100%.",
    usage:
      "Donut charts work best with 3-6 categories. Use the center space for a total or key metric. Consider bar charts if you have more categories.",
    bestPractices: [
      "Limit to 5-6 segments maximum for readability",
      "Sort segments by size (largest first)",
      "Use the donut center for total value or key metric",
      "Ensure color contrast between adjacent segments",
      "Use a bar chart if you have more than 6 categories",
    ],
    pbiMapping: {
      designIntent:
        "Show composition — how parts relate to a whole (percentages)",
      webTechnique:
        "Chart.js doughnut chart with cutout center, animated segments, and hover expansion",
      pbiTranslation:
        'Donut chart visual with detail labels showing percentage. Use "Other" category for small segments. Enable cross-filtering on click.',
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["donut", "pie", "semicircle", "nested"],
  },
  {
    slug: "table",
    name: "Table / Matrix",
    category: "Data Display",
    atomicLevel: "Organism",
    description:
      "Structured data tables with sorting, conditional formatting, and expandable hierarchies. Essential for detailed data exploration.",
    usage:
      "Use tables when users need to see exact values, compare many items, or drill into detail. Tables are the most information-dense visual.",
    bestPractices: [
      "Right-align numeric columns for easy comparison",
      "Use alternating row shading for readability",
      "Apply conditional formatting (data bars, icons, color scales)",
      "Enable sorting on all relevant columns",
      "Keep column count manageable (5-8 visible columns)",
    ],
    pbiMapping: {
      designIntent:
        "Present detailed, row-level data with sorting and visual encoding of values",
      webTechnique:
        "HTML table with sticky headers, hover rows, sortable columns, and inline data bars",
      pbiTranslation:
        "Table or Matrix visual. Use conditional formatting for data bars, icon sets, and color scales. Enable totals and subtotals. Configure column width and text wrapping.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["simple", "conditional", "heatmap", "matrix", "paginated"],
  },
  {
    slug: "gauge",
    name: "Gauge",
    category: "Data Display",
    atomicLevel: "Molecule",
    description:
      "Display progress toward a target or threshold using a radial or linear gauge. Effective for KPIs with defined targets.",
    usage:
      "Use gauges when you have a clear target value and want to show progress. Best for single metrics like completion rate or performance score.",
    bestPractices: [
      "Always include a target/maximum value for context",
      "Use color zones (red/yellow/green) for threshold indicators",
      "Show the actual value prominently in the center",
      "Limit to 3-4 gauges per dashboard to avoid clutter",
      "Consider a bullet chart as a space-efficient alternative",
    ],
    pbiMapping: {
      designIntent:
        "Show progress toward a goal with visual thresholds for performance levels",
      webTechnique: "SVG arc with animated fill, color zones, and center label",
      pbiTranslation:
        "Gauge visual with min, max, and target values configured. Use conditional formatting for threshold colors. Consider KPI visual as alternative.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["half", "full", "linear", "target", "status"],
  },
  {
    slug: "map",
    name: "Map (Conceptual)",
    category: "Charts",
    atomicLevel: "Organism",
    description:
      "Geographic data visualization using filled regions or bubble overlays. Shows spatial patterns and regional comparisons.",
    usage:
      "Use maps when geographic context adds meaning to data. Avoid maps when a simple bar chart would convey the comparison more clearly.",
    bestPractices: [
      "Use filled maps for regional comparisons (choropleth)",
      "Use bubble maps for point values with magnitude",
      "Include a legend with clear value ranges",
      "Avoid maps if geography is not central to the insight",
      "Provide a table or bar chart alternative for accessibility",
    ],
    pbiMapping: {
      designIntent:
        "Reveal spatial patterns and geographic distribution of data",
      webTechnique:
        "SVG map with data-driven fill colors, hover tooltips, and zoom controls",
      pbiTranslation:
        "Filled Map, Shape Map, or Azure Map visual. Configure geographic role for location fields. Use color saturation for value encoding.",
    },
    states: ["default", "hover", "selected", "disabled"],
    variations: ["filled", "bubble"],
  },
];

export const FOUNDATIONS = [
  {
    slug: "color",
    name: "Color",
    description:
      "Data visualization palette with WCAG contrast ratios and Power BI theme export",
  },
  {
    slug: "typography",
    name: "Typography",
    description: "Type scale, weights, and font recommendations for dashboards",
  },
  {
    slug: "spacing",
    name: "Spacing & Layout",
    description:
      "Consistent spacing scale and grid system for visual alignment",
  },
  {
    slug: "elevation",
    name: "Elevation",
    description: "Shadow and layering system for visual hierarchy and depth",
  },
];

export const CATEGORIES = ["Data Display", "Actions", "Selection", "Charts"];

export const PBI_THEME_JSON = {
  name: "PBI Design System",
  dataColors: [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f97316",
    "#14b8a6",
    "#06b6d4",
    "#eab308",
    "#ef4444",
  ],
  background: { color: "#ffffff" },
  foreground: { color: "#1e293b" },
  tableAccent: "#6366f1",
  good: "#16a34a",
  neutral: "#6366f1",
  bad: "#dc2626",
  maximum: "#6366f1",
  center: "#8b5cf6",
  minimum: "#fbbf24",
  textClasses: {
    callout: { fontSize: 28, fontFace: "Inter", color: "#1e293b" },
    title: { fontSize: 12, fontFace: "Inter", color: "#64748b" },
    header: { fontSize: 14, fontFace: "Inter", color: "#1e293b" },
    label: { fontSize: 11, fontFace: "Inter", color: "#94a3b8" },
  },
  visualStyles: {
    "*": {
      "*": {
        background: [
          { color: { solid: { color: "#ffffff" } }, transparency: 0 },
        ],
        border: [{ color: { solid: { color: "#e2e8f0" } }, width: 1 }],
        visualHeader: [{ visible: false }],
      },
    },
  },
};
