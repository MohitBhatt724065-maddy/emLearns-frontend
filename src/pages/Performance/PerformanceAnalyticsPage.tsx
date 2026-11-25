import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const PerformanceAnalyticsPage: React.FC = () => {
  const { enrollments } = useCourseProgress();
  const totalLessons = enrollments.reduce((a, e) => a + e.total_lessons, 0);
  const doneLessons = enrollments.reduce((a, e) => a + e.completed_lessons, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase">
          <BarChart3 className="w-4 h-4" /> Performance
        </div>
        <h1 className="text-2xl font-bold text-[#142D4E]">Your Progress</h1>
        <p className="text-sm text-slate-600">
          Lessons completed: <span className="font-mono font-semibold">{doneLessons}</span> of{' '}
          <span className="font-mono font-semibold">{totalLessons}</span> across your enrolled courses.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
        Quiz scores and detailed analytics will appear here once assessments are available.
      </div>
    </div>
  );
};

export default PerformanceAnalyticsPage;