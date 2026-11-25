import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, GraduationCap, Mail, BookOpen, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { enrollments, completedCoursesCount, isLoading } = useCourseProgress();
  const navigate = useNavigate();

  const initial = (user?.name || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#142D4E]/20"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-[#142D4E] text-white flex items-center justify-center text-3xl font-bold">
              {initial}
            </div>
          )}

          <div className="space-y-1.5">
            {user?.trainingLevel && (
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {user.trainingLevel}
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight">
              {user?.name || 'Student'}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.email}</span>
            </p>
            {user?.institution && (
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.institution}</span>
              </p>
            )}
          </div>
        </div>

        {user?.bio && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">About</h3>
            <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">{user.bio}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 block">Enrolled Courses</span>
          <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
            {enrollments.length}
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 block">Completed Courses</span>
          <span className="text-2xl font-bold text-emerald-600 font-mono tabular-nums mt-1 block">
            {completedCoursesCount}
          </span>
        </div>
      </div>

      {/* Enrolled courses */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-semibold text-[#142D4E]">Enrolled Courses</h3>
          <button
            onClick={() => navigate('/courses')}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Explore More
          </button>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-500">Loading...</p>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">You have not enrolled in any course yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {enrollments.map((e) => {
              const done = e.total_lessons > 0 && e.progress_percent === 100;
              const lesson = e.next_lesson_id ? `?lesson=${e.next_lesson_id}` : '';
              return (
                <div
                  key={e.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="font-medium text-blue-600">{e.course.category}</span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">{e.course.title}</h4>
                    <p className="text-xs text-slate-500">
                      {e.completed_lessons} of {e.total_lessons} lessons
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 sm:w-64">
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Progress</span>
                        <span className="font-mono font-medium">{e.progress_percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${e.progress_percent}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/learning/${e.course.id}${lesson}`)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg whitespace-nowrap"
                    >
                      {done ? 'Review' : 'Resume'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfilePage;