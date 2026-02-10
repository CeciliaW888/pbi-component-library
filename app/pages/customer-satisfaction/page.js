'use client';
import { useState } from 'react';
import BarChart from '@/components/pbi/BarChart';
import LineChartComponent from '@/components/pbi/LineChartComponent';
import DonutChart from '@/components/pbi/DonutChart';
import GaugeComponent from '@/components/pbi/GaugeComponent';
import Slicer from '@/components/pbi/Slicer';
import ThemePanel from '@/components/ui/ThemePanel';
import { useTheme } from '@/context/ThemeContext';
import { Eye, EyeOff, Heart, UserCheck, Frown, Star, MessageSquare, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const atomicOverlayColors = {
  Atom: 'border-blue-500/40 bg-blue-500/5',
  Molecule: 'border-violet-500/40 bg-violet-500/5',
  Organism: 'border-pink-500/40 bg-pink-500/5',
};

function SatisfactionCard({ label, score, maxScore, icon: Icon, sentiment }) {
  const colors = { positive: 'text-emerald-600 bg-emerald-50', neutral: 'text-amber-600 bg-amber-50', negative: 'text-red-600 bg-red-50' };
  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors[sentiment]}`}><Icon size={18} /></div>
        <p className="text-xs font-medium text-on-surface-variant">{label}</p>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-on-surface">{score}</span>
        <span className="text-sm text-on-surface-variant mb-1">/{maxScore}</span>
      </div>
      <div className="w-full h-2 bg-surface-variant rounded-full mt-2 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${(score / maxScore) * 100}%` }} />
      </div>
    </div>
  );
}

function FeedbackTable() {
  const feedback = [
    { customer: 'Acme Corp', channel: 'Survey', score: 9, category: 'Product Quality', sentiment: 'positive', comment: 'Excellent product, exceeded expectations.' },
    { customer: 'TechStart', channel: 'Support', score: 4, category: 'Response Time', sentiment: 'negative', comment: 'Waited 3 days for a response to critical issue.' },
    { customer: 'GlobalRetail', channel: 'NPS', score: 8, category: 'Ease of Use', sentiment: 'positive', comment: 'Intuitive interface, team adopted quickly.' },
    { customer: 'MedHealth', channel: 'Survey', score: 6, category: 'Pricing', sentiment: 'neutral', comment: 'Good value but renewal pricing is a concern.' },
    { customer: 'EduTech', channel: 'Support', score: 9, category: 'Support Quality', sentiment: 'positive', comment: 'Outstanding support team, very knowledgeable.' },
    { customer: 'FinServe', channel: 'NPS', score: 3, category: 'Onboarding', sentiment: 'negative', comment: 'Onboarding process took too long, need improvement.' },
  ];
  const sentimentIcons = { positive: ThumbsUp, negative: ThumbsDown, neutral: Minus };
  const sentimentColors = { positive: 'text-emerald-600', negative: 'text-red-600', neutral: 'text-amber-600' };

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden">
      <div className="px-5 py-3 bg-surface-variant/50 border-b border-outline-variant/20">
        <h3 className="text-sm font-semibold text-on-surface">Recent Feedback</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-outline-variant/20 text-[11px] text-on-surface-variant uppercase">
            <th className="text-left px-5 py-2 font-medium">Customer</th>
            <th className="text-left px-4 py-2 font-medium">Category</th>
            <th className="text-center px-4 py-2 font-medium">Score</th>
            <th className="text-center px-4 py-2 font-medium">Sentiment</th>
            <th className="text-left px-5 py-2 font-medium">Comment</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((f, i) => {
            const SentIcon = sentimentIcons[f.sentiment];
            return (
              <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-variant/30 transition-colors">
                <td className="px-5 py-2.5 font-medium text-on-surface">{f.customer}</td>
                <td className="px-4 py-2.5 text-on-surface-variant">{f.category}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`font-bold ${f.score >= 7 ? 'text-emerald-600' : f.score >= 5 ? 'text-amber-600' : 'text-red-600'}`}>{f.score}</span>
                </td>
                <td className="px-4 py-2.5 text-center">
                  <SentIcon size={16} className={`inline ${sentimentColors[f.sentiment]}`} />
                </td>
                <td className="px-5 py-2.5 text-on-surface-variant text-xs max-w-xs truncate">{f.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function CustomerSatisfactionPage() {
  const [overlay, setOverlay] = useState(null);
  const { getCSSOverrides } = useTheme();

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 space-y-6" style={getCSSOverrides()}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Customer Satisfaction</h1>
          <p className="text-on-surface-variant">NPS scores, CSAT trends, sentiment analysis, and customer feedback</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant">Atomic Overlay:</span>
          {['Atom', 'Molecule', 'Organism'].map(level => (
            <button key={level} onClick={() => setOverlay(overlay === level ? null : level)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${overlay === level ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant hover:text-on-surface'}`}>
              {overlay === level ? <Eye size={12} /> : <EyeOff size={12} />}
              {level}
            </button>
          ))}
        </div>
      </div>

      <ThemePanel />

      <div className="bg-surface-variant/20 rounded-3xl border border-outline-variant/20 p-6 space-y-4">
        {/* Slicer */}
        <div className={`rounded-2xl p-4 transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2' : ''}`}>
          {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-2 block">MOLECULE — Slicer</span>}
          <Slicer variant="chips" />
        </div>

        {/* Satisfaction KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'NPS Score', score: 72, maxScore: 100, icon: Heart, sentiment: 'positive' },
            { label: 'CSAT', score: 4.3, maxScore: 5, icon: Star, sentiment: 'positive' },
            { label: 'Retention Rate', score: 94, maxScore: 100, icon: UserCheck, sentiment: 'positive' },
            { label: 'Churn Rate', score: 2.1, maxScore: 10, icon: Frown, sentiment: 'neutral' },
          ].map((kpi, i) => (
            <div key={i} className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
              {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE</span>}
              <SatisfactionCard {...kpi} />
            </div>
          ))}
        </div>

        {/* CSAT Trend + NPS Distribution */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`col-span-2 rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — CSAT Trend</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">CSAT Score Trend (12 months)</h3>
              <LineChartComponent variant="single" />
            </div>
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — NPS Distribution</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">NPS Distribution</h3>
              <DonutChart variant="donut" />
            </div>
          </div>
        </div>

        {/* Satisfaction by Category + Response Quality */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — By Category</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Satisfaction by Category</h3>
              <BarChart variant="horizontal" />
            </div>
          </div>
          <div className={`rounded-2xl transition-all ${overlay === 'Molecule' ? atomicOverlayColors.Molecule + ' border-2 p-1' : ''}`}>
            {overlay === 'Molecule' && <span className="text-[10px] font-bold text-violet-600 mb-1 block px-2">MOLECULE — Response Volume</span>}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5">
              <h3 className="text-sm font-semibold text-on-surface mb-3">Monthly Response Volume</h3>
              <BarChart variant="stacked" />
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className={`rounded-2xl transition-all ${overlay === 'Organism' ? atomicOverlayColors.Organism + ' border-2 p-1' : ''}`}>
          {overlay === 'Organism' && <span className="text-[10px] font-bold text-pink-600 mb-1 block px-2">ORGANISM — Feedback Table</span>}
          <FeedbackTable />
        </div>
      </div>
    </div>
  );
}
