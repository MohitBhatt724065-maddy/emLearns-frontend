import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Clock, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCourseProgress } from '../../context/CourseProgressContext';
import { COURSES } from '../../data/mockData';

export const MyLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const { enrolledCourseIds, getCourseProgressPercent } = useCourseProgress();
  const [filterTab, setFilterTab] = useState<'all' | 'in-progress' | 'completed'>('all');

  const enrolledCourses = COURSES.filter((c) => enrolledCourseIds.includes(c.id));

  const filtered = enrolledCourses.filter((course) => {
    const prog = getCourseProgressPercent(course);
    if (filterTab === 'in-progress') return prog < 100;
    if (filterTab === 'completed') return prog === 100;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
              <GraduationCap className="w-4 h-4 text-sky-500" />
              <span>Trainee Curriculum</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">Active Progress</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
              My Enrolled Neuroscience Courses
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Continue your subspecialty masterclasses, review completed dissection credits, and track board competencies.
            </p>
          </div>

          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-2xs transition-colors shrink-0"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Browse More Tracks</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-200 mt-6 pt-2">
          <button
            onClick={() => setFilterTab('all')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              filterTab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            All Tracks ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setFilterTab('in-progress')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              filterTab === 'in-progress'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              filterTab === 'completed'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Courses List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course) => {
            const progress = getCourseProgressPercent(course);
            const isDone = progress === 100;

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#142D4E]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                      {isDone ? 'Curriculum Completed' : `${progress}% In Progress`}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-blue-600">{course.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.difficulty}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#142D4E] leading-snug">
                      <Link to={`/courses/${course.id}`} className="hover:text-blue-600 transition-colors">
                        {course.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Syllabus Completion</span>
                        <span className="font-mono font-medium">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(progress, 6)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.durationHours} Hours</span>
                  </div>

                  <button
                    onClick={() => navigate(`/learning/${course.id}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-2xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-sky-400" />
                    <span>{isDone ? 'Review Course' : 'Continue Study'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <GraduationCap className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-semibold text-slate-900">No courses in this category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't enrolled in courses with this status yet. Browse our catalog to expand your curriculum.
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] rounded-lg"
          >
            Browse Course Catalog
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLearningPage;
