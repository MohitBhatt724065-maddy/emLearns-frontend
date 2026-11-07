import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import {
  BarChart3,
  Award,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Brain,
  Layers,
  Sparkles
} from 'lucide-react';
import { STUDENT_ANALYTICS, COURSES } from '../../data/mockData';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const PerformanceAnalyticsPage: React.FC = () => {
  const { totalStudyHours } = useCourseProgress();

  const strengths = [
    { area: 'Anterior Skull Base Anatomy', score: '96%', note: 'Exceptional 3D mastery of optic strut and paraclinoid corridors.' },
    { area: 'DTI White Matter Fiber Reconstruction', score: '93%', note: 'Accurate ROI placement for arcuate fasciculus and Meyer’s loop.' },
    { area: 'Acute Stroke ASPECTS Scoring', score: '91%', note: 'Reliable localization on non-contrast CT and CT perfusion.' }
  ];

  const weaknesses = [
    { area: 'Kawase Triangle Petroclival Corridors', score: '72%', note: 'Recommended re-study of GSPN mobilization and internal acoustic meatus margins.' },
    { area: 'Spinal MEP Amplitude Thresholds', score: '74%', note: 'Review latency vs amplitude drop criteria during spinal cord instrumentation.' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
            <BarChart3 className="w-4 h-4 text-sky-500" />
            <span>Academic Performance Dashboard</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">Demonstration Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
            Clinical Knowledge & Board Examination Analytics
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Multi-dimensional evaluation across neurosurgical sub-disciplines, board simulation historical percentiles, and personalized revision gaps.
          </p>
        </div>

        {/* Top Quantitative Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
          <div className="p-4 rounded-xl bg-[#F5F8FC] border border-slate-200/80">
            <span className="text-slate-500 block font-medium">Cumulative Board Mean</span>
            <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
              {STUDENT_ANALYTICS.averageScorePercent}%
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">+4.2% vs previous quarter</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F8FC] border border-slate-200/80">
            <span className="text-slate-500 block font-medium">Recorded Clinical Study</span>
            <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
              {totalStudyHours.toFixed(1)} hrs
            </span>
            <span className="text-[11px] text-slate-500">Across 6 neuro tracks</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F8FC] border border-slate-200/80">
            <span className="text-slate-500 block font-medium">Exams Passed</span>
            <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
              3 of 3
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">100% First-Pass Rate</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F8FC] border border-slate-200/80">
            <span className="text-slate-500 block font-medium">Cohort Percentile</span>
            <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
              95th
            </span>
            <span className="text-[11px] text-blue-600 font-medium">National Residency Benchmark</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts: Subject Mastery & Performance Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Subject Mastery Radar */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Subject-Wise Proficiency</h3>
              <p className="text-xs text-slate-500">Comparing your score vs peer national benchmark</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={STUDENT_ANALYTICS.subjectMastery} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#172B4D' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Radar name="Your Score" dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.35} />
                <Radar name="Peer Benchmark" dataKey="benchmark" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.15} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-md text-xs">
                          <p className="font-semibold text-slate-800">{payload[0].payload.subject}</p>
                          <p className="text-blue-600 font-mono">Your Score: {payload[0].value}%</p>
                          <p className="text-slate-500 font-mono">Peer Avg: {payload[1]?.value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Trend Over Time */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Assessment Progression Trend</h3>
              <p className="text-xs text-slate-500">Historical performance across standardized test dates</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={STUDENT_ANALYTICS.performanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-md text-xs">
                          <p className="font-semibold text-slate-800">{payload[0].payload.date}</p>
                          <p className="text-blue-600 font-mono">Exam Score: {payload[0].value}%</p>
                          <p className="text-slate-500 font-mono">Benchmark: {payload[0].payload.average}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} dot={{ r: 5, fill: '#2563EB' }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="average" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Identified Clinical Strengths */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Demonstrated Clinical Strengths</h3>
              <p className="text-xs text-slate-500">Topics scoring in 90th percentile</p>
            </div>
          </div>

          <div className="space-y-3">
            {strengths.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-emerald-50/40 border border-emerald-100 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-900">{item.area}</span>
                  <span className="font-mono font-bold text-emerald-700">{item.score}</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Targeted Revision Needs */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Targeted Revision Recommendations</h3>
              <p className="text-xs text-slate-500">Key knowledge gaps identified in assessments</p>
            </div>
          </div>

          <div className="space-y-3">
            {weaknesses.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-amber-50/40 border border-amber-100 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-900">{item.area}</span>
                  <span className="font-mono font-bold text-amber-700">{item.score}</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-semibold text-slate-700">Educational Simulation Notice:</span> All analytics, percentiles, and predictive trajectory data presented on this dashboard represent simulated demonstration metrics based on emLearns mock assessment criteria and do not constitute legal medical certification without proctored institutional board review.
        </p>
      </div>
    </div>
  );
};

export default PerformanceAnalyticsPage;
