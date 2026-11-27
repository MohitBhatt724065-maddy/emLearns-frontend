import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Play, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { enrollments, completedCoursesCount, isLoading, refreshEnrollments } = useCourseProgress();
  const navigate = useNavigate();

  useEffect(() => {
    refreshEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = user?.name || 'Learner';
  const inProgress = enrollments.filter((e) => e.progress_percent < 100);
  const current = inProgress[0] ?? null;

  const resume = () => {
    if (!current) return navigate('/courses');
    const lesson = current.next_lesson_id ? `?lesson=${current.next_lesson_id}` : '';
    navigate(`/learning/${current.course.id}${lesson}`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
            Welcome back, {name}
          </h1>
          <p className="text-sm text-slate-600">
            {current
              ? `You are currently studying ${current.course.title}.`
              : enrollments.length > 0
              ? 'You have completed all your enrolled courses. Browse the catalog for more.'
              : 'You have not enrolled in any course yet. Browse the catalog to get started.'}
          </p>
        </div>
        <button
          onClick={resume}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shrink-0"
        >
          <Play className="w-4 h-4 text-sky-400" />
          <span>{current ? 'Resume Study' : 'Browse Courses'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <BookOpen className="w-4 h-4" /> Enrolled Courses
          </div>
          <div className="text-3xl font-bold text-[#142D4E] mt-2 tabular-nums">{enrollments.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <CheckCircle2 className="w-4 h-4" /> Courses Completed
          </div>
          <div className="text-3xl font-bold text-[#142D4E] mt-2 tabular-nums">{completedCoursesCount}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#142D4E]">Current In-Progress Course</h2>
          <Link to="/my-learning" className="text-xs font-medium text-blue-600 hover:underline">
            View all enrolled courses
          </Link>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-500">Loading...</p>
        ) : current ? (
          <div className="p-4 rounded-lg border border-slate-200 space-y-3">
            <div className="text-xs text-slate-500">{current.course.category}</div>
            <div className="text-base font-bold text-[#142D4E]">{current.course.title}</div>
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>{current.completed_lessons} of {current.total_lessons} lessons completed</span>
                <span className="font-mono">{current.progress_percent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${current.progress_percent}%` }} />
              </div>
            </div>
            <button
              onClick={resume}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Resume Lesson
            </button>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">Nothing in progress right now.</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] rounded-lg"
            >
              Browse Course Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;