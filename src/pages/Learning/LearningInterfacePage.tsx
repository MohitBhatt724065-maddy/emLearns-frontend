import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Layers,
} from 'lucide-react';
import courseService from '../../services/courseService';
import type {
  BackendCourseDetail,
  BackendLesson,
  CourseModuleWithLessons,
} from '../../types/course';
import { useCourseProgress } from '../../context/CourseProgressContext';

interface FlatLesson {
  lesson: BackendLesson;
  module: CourseModuleWithLessons;
}

const getVideoInfo = (url: string): { embedUrl: string | null; href: string } | null => {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    const v = u.searchParams.get('v');
    if (u.hostname.endsWith('youtube.com') && v) {
      return { embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(v)}`, href: u.href };
    }
    if (u.hostname === 'youtu.be' && u.pathname.length > 1) {
      return { embedUrl: `https://www.youtube.com/embed${u.pathname}`, href: u.href };
    }
    return { embedUrl: null, href: u.href };
  } catch {
    return null;
  }
};

export const LearningInterfacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isEnrolled, enrollInCourse, refreshEnrollments } = useCourseProgress();

  const [course, setCourse] = useState<BackendCourseDetail | null>(null);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    let active = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [courseData, progress] = await Promise.all([
          courseService.getCourseById(id),
          courseService.getCourseProgress(Number(id)),
        ]);
        if (!active) return;
        setCourse(courseData);
        setCompletedIds(progress.completed_lesson_ids);
      } catch {
        if (active) setError('Unable to load this course. Please try again.');
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [id]);

  const allLessons: FlatLesson[] = useMemo(
    () =>
      course
        ? course.modules.flatMap((m) => m.lessons.map((l) => ({ lesson: l, module: m })))
        : [],
    [course]
  );

  const lessonParam = Number(searchParams.get('lesson'));
  const currentIndex = useMemo(() => {
    const idx = allLessons.findIndex((item) => item.lesson.id === lessonParam);
    return idx === -1 ? 0 : idx;
  }, [allLessons, lessonParam]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center text-sm text-slate-600">
        Loading lesson...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-700">{error ?? 'Course unavailable'}</p>
        <button
          onClick={() => navigate('/courses')}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Back to catalog
        </button>
      </div>
    );
  }

  if (allLessons.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-slate-700">This course has no published lessons yet.</p>
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Back to course
        </button>
      </div>
    );
  }

  const activeItem = allLessons[currentIndex];
  const activeLesson = activeItem.lesson;
  const activeModule = activeItem.module;
  const enrolled = course.is_enrolled || isEnrolled(course.id);
  const isCompleted = completedIds.includes(activeLesson.id);
  const progressPercent = Math.round((completedIds.length / allLessons.length) * 100);
  const video = activeLesson.video_url ? getVideoInfo(activeLesson.video_url) : null;

  const selectLesson = (index: number) => {
    setNotice(null);
    setSearchParams({ lesson: String(allLessons[index].lesson.id) });
  };

  const handleComplete = async () => {
    if (isCompleted) return;
    if (!enrolled) {
      setNotice('Enroll in this course to save your progress.');
      return;
    }
    try {
      setSaving(true);
      setNotice(null);
      await courseService.completeLesson(activeLesson.id);
      setCompletedIds((prev) => [...prev, activeLesson.id]);
      await refreshEnrollments();
    } catch {
      setNotice('Could not save your progress. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEnroll = async () => {
    try {
      await enrollInCourse(course.id);
      setCourse((prev) => (prev ? { ...prev, is_enrolled: true } : prev));
      setNotice(null);
    } catch {
      setNotice('Could not enroll. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      <header className="sticky top-0 z-30 bg-[#142D4E] text-white px-4 sm:px-6 h-14 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Exit to course details"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-semibold truncate text-white">{course.title}</h2>
            <p className="text-[10px] text-sky-400 truncate">
              {activeModule.title} · Lesson {currentIndex + 1} of {allLessons.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
            <span>Progress:</span>
            <span className="font-mono font-semibold text-white tabular-nums">{progressPercent}%</span>
          </div>

          <button
            onClick={handleComplete}
            disabled={saving || isCompleted}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-80 ${
              isCompleted ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : saving ? 'Saving...' : 'Mark Complete'}</span>
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors hidden lg:block"
            title="Toggle curriculum outline"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {sidebarOpen && (
          <aside className="w-72 lg:w-80 bg-white border-r border-slate-200/90 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-slate-100">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Curriculum Outline
              </span>
              <p className="text-xs font-semibold text-[#142D4E]">
                {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'} ·{' '}
                {allLessons.length} {allLessons.length === 1 ? 'Lesson' : 'Lessons'}
              </p>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 space-y-4">
              {course.modules.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-1">
                  <div className="px-2 py-1.5 text-xs font-semibold text-slate-700">
                    <span className="text-[10px] font-mono text-blue-600 mr-1.5">M{mIdx + 1}</span>
                    <span>{mod.title}</span>
                  </div>
                  <div className="space-y-1 pl-2 border-l border-slate-200">
                    {mod.lessons.map((les) => {
                      const flatIndex = allLessons.findIndex((i) => i.lesson.id === les.id);
                      const isCurrent = les.id === activeLesson.id;
                      const done = completedIds.includes(les.id);
                      return (
                        <button
                          key={les.id}
                          onClick={() => selectLesson(flatIndex)}
                          className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                            isCurrent
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                          )}
                          <span className="flex-1 min-w-0 leading-tight">{les.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          {!enrolled && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs text-amber-900">
              <span>You are previewing this course. Enroll to save your progress.</span>
              <button
                onClick={handleEnroll}
                className="px-3 py-1.5 rounded-lg bg-[#142D4E] text-white font-semibold hover:bg-[#1a3860] shrink-0"
              >
                Enroll Now
              </button>
            </div>
          )}

          {notice && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800">
              {notice}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
            <span className="font-mono text-xs text-blue-600 font-semibold">{activeModule.title}</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E] tracking-tight">
              {activeLesson.title}
            </h1>
            {activeLesson.description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeLesson.description}
              </p>
            )}
          </div>

          {video?.embedUrl && (
            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-black shadow-lg">
              <iframe
                src={video.embedUrl}
                title={activeLesson.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {video && !video.embedUrl && (
            <a
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold text-blue-600 hover:underline"
            >
              Open lesson video in a new tab
            </a>
          )}

          {activeLesson.image && (
            <img
              src={activeLesson.image}
              alt={activeLesson.title}
              className="w-full rounded-2xl border border-slate-200 object-cover"
            />
          )}

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            {activeLesson.content ? (
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {activeLesson.content}
              </div>
            ) : (
              <p className="text-xs text-slate-500">This lesson has no written content yet.</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between gap-4">
            <button
              onClick={() => selectLesson(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleComplete}
              disabled={saving || isCompleted}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-80 ${
                isCompleted ? 'bg-emerald-600 text-white' : 'bg-[#2563EB] hover:bg-blue-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : saving ? 'Saving...' : 'Mark as Completed'}</span>
            </button>

            <button
              onClick={() => selectLesson(currentIndex + 1)}
              disabled={currentIndex === allLessons.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearningInterfacePage;