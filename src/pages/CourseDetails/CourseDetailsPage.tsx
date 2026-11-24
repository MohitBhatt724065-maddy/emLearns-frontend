import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  ArrowLeft,
  Share2,
  Check,
  Play,
} from 'lucide-react';
import courseService from '../../services/courseService';
import type { BackendCourseDetail } from '../../types/course';
import { useAuth } from '../../context/AuthContext';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { enrollments, isEnrolled, enrollInCourse } = useCourseProgress();

  const [course, setCourse] = useState<BackendCourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModuleIds, setExpandedModuleIds] = useState<number[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    let active = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await courseService.getCourseById(id);
        if (!active) return;
        setCourse(data);
        setExpandedModuleIds(data.modules.map((m) => m.id));
      } catch (err) {
        if (!active) return;
        const status = (err as { response?: { status?: number } })?.response?.status;
        setError(
          status === 404
            ? 'This course could not be found.'
            : 'Unable to load this course. Please try again.'
        );
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [id, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-sm text-slate-600">
        Loading course...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-12 text-center space-y-3">
        <h3 className="text-base font-semibold text-red-700">
          {error ?? 'Course unavailable'}
        </h3>
        <Link to="/courses" className="text-xs font-semibold text-blue-600 hover:underline">
          Back to catalog
        </Link>
      </div>
    );
  }

  const enrolled = course.is_enrolled || isEnrolled(course.id);
  const progress =
    enrollments.find((e) => e.course.id === course.id)?.progress_percent ?? 0;

  const toggleModule = (moduleId: number) => {
    setExpandedModuleIds((prev) =>
      prev.includes(moduleId) ? prev.filter((m) => m !== moduleId) : [...prev, moduleId]
    );
  };

  const handleEnrollOrResume = async () => {
    setActionError(null);

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!enrolled) {
      try {
        setEnrolling(true);
        await enrollInCourse(course.id);
        setCourse((prev) => (prev ? { ...prev, is_enrolled: true } : prev));
      } catch {
        setActionError('Could not enroll. Please try again.');
        return;
      } finally {
        setEnrolling(false);
      }
    }

    navigate(`/learning/${course.id}`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-blue-600">
                {course.category || 'Neuroscience'}
              </span>
              {course.level && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{course.level}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#142D4E] leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {course.description}
            </p>

            <div className="flex gap-6 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Curriculum</span>
                <span className="text-slate-800 font-semibold text-sm tabular-nums flex items-center gap-1 mt-0.5">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'} ·{' '}
                  {course.lesson_count} {course.lesson_count === 1 ? 'Lesson' : 'Lessons'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between bg-[#F5F8FC] p-6 rounded-xl border border-slate-200/90">
            <div className="space-y-4">
              {course.thumbnail && (
                <div className="rounded-lg overflow-hidden aspect-16/10 bg-slate-200">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {enrolled && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Your Progress</span>
                    <span className="font-mono font-semibold text-slate-900">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              {actionError && (
                <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2.5">
                  {actionError}
                </p>
              )}

              <button
                onClick={handleEnrollOrResume}
                disabled={enrolling || course.lesson_count === 0}
                className="w-full py-3 px-4 rounded-lg text-sm font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current text-sky-400" />
                <span>
                  {enrolling
                    ? 'Enrolling...'
                    : enrolled
                    ? 'Enter Learning Room'
                    : isAuthenticated
                    ? 'Enroll in Course'
                    : 'Sign in to Enroll'}
                </span>
              </button>

              {course.lesson_count === 0 && (
                <p className="text-[11px] text-slate-500 text-center">
                  Lessons for this course have not been published yet.
                </p>
              )}

              <button
                onClick={handleShare}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Course Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-[#142D4E]">Course Curriculum</h3>
            <p className="text-xs text-slate-500">
              {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'} ·{' '}
              {course.lesson_count} {course.lesson_count === 1 ? 'Lesson' : 'Lessons'}
            </p>
          </div>
          {course.modules.length > 0 && (
            <button
              onClick={() =>
                setExpandedModuleIds(
                  expandedModuleIds.length === course.modules.length
                    ? []
                    : course.modules.map((m) => m.id)
                )
              }
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              {expandedModuleIds.length === course.modules.length ? 'Collapse All' : 'Expand All'}
            </button>
          )}
        </div>

        {course.modules.length === 0 && (
          <p className="text-xs text-slate-500">No modules have been added yet.</p>
        )}

        <div className="space-y-3">
          {course.modules.map((module, mIdx) => {
            const isExpanded = expandedModuleIds.includes(module.id);
            return (
              <div key={module.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-4 py-3.5 bg-[#F5F8FC] hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono text-blue-600 font-semibold uppercase">
                      Module {mIdx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-[#142D4E]">{module.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 font-mono tabular-nums">
                      {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="divide-y divide-slate-100">
                    {module.lessons.length === 0 && (
                      <p className="p-4 text-xs text-slate-500">No published lessons in this module.</p>
                    )}
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div>
                            <h5 className="text-xs sm:text-sm font-medium text-slate-900 leading-snug">
                              {lesson.title}
                            </h5>
                            {lesson.description && (
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {lesson.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <Link
                          to={`/learning/${course.id}?lesson=${lesson.id}`}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 shrink-0"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;