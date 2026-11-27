import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Play } from 'lucide-react';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const MyLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const { enrollments, isLoading, refreshEnrollments } = useCourseProgress();
  const [tab, setTab] = useState<'all' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    refreshEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = enrollments.filter((e) => {
    if (tab === 'in-progress') return e.progress_percent < 100;
    if (tab === 'completed') return e.total_lessons > 0 && e.progress_percent === 100;
    return true;
  });

  const tabClass = (t: string) =>
    `pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
      tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
    }`;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">My Learning</h1>
            <p className="text-sm text-slate-600">Continue where you left off and track your progress.</p>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shrink-0"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Browse More Courses</span>
          </button>
        </div>
        <div className="flex gap-2 border-b border-slate-200 mt-6 pt-2">
          <button onClick={() => setTab('all')} className={tabClass('all')}>All ({enrollments.length})</button>
          <button onClick={() => setTab('in-progress')} className={tabClass('in-progress')}>In Progress</button>
          <button onClick={() => setTab('completed')} className={tabClass('completed')}>Completed</button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-xs text-slate-500">Loading...</p>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((e) => {
            const done = e.total_lessons > 0 && e.progress_percent === 100;
            const lesson = e.next_lesson_id ? `?lesson=${e.next_lesson_id}` : '';
            return (
              <div key={e.id} className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-blue-600">{e.course.category}</span>
                </div>
                <h3 className="text-base font-bold text-[#142D4E]">
                  <Link to={`/courses/${e.course.id}`} className="hover:text-blue-600">{e.course.title}</Link>
                </h3>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>{e.completed_lessons} of {e.total_lessons} lessons</span>
                    <span className="font-mono">{e.progress_percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${e.progress_percent}%` }} />
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/learning/${e.course.id}${lesson}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-sky-400" />
                  <span>{done ? 'Review Course' : 'Continue'}</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <GraduationCap className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-semibold text-slate-900">No courses here yet</h3>
          <button onClick={() => navigate('/courses')} className="px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] rounded-lg">
            Browse Course Catalog
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLearningPage;