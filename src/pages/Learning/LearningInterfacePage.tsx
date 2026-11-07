import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Volume2,
  Maximize2,
  RotateCcw,
  BookOpen,
  FileText,
  AlertTriangle,
  Award,
  Layers,
  Sparkles,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark
} from 'lucide-react';
import { COURSES, Course, Lesson, Module } from '../../data/mockData';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const LearningInterfacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    isLessonCompleted,
    markLessonComplete,
    markLessonIncomplete,
    getCourseProgressPercent,
  } = useCourseProgress();

  const course: Course = COURSES.find((c) => c.id === id || c.slug === id) || COURSES[0];

  // Identify current lesson
  const requestedLessonId = searchParams.get('lesson');

  // Find all lessons in flat order
  const allLessons: { lesson: Lesson; module: Module }[] = [];
  course.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      allLessons.push({ lesson: les, module: mod });
    });
  });

  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);

  useEffect(() => {
    if (requestedLessonId) {
      const idx = allLessons.findIndex((item) => item.lesson.id === requestedLessonId);
      if (idx !== -1) {
        setCurrentLessonIndex(idx);
      }
    }
  }, [requestedLessonId, course]);

  const activeItem = allLessons[currentLessonIndex] || allLessons[0];
  const activeLesson = activeItem.lesson;
  const activeModule = activeItem.module;

  const isCompleted = isLessonCompleted(activeLesson.id);
  const progressPercent = getCourseProgressPercent(course);

  // Video player simulation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'content' | 'pearls' | 'landmarks' | 'pitfalls'>('content');

  // Sidebar visibility on desktop/mobile
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const handleLessonSelect = (lessonId: string) => {
    const idx = allLessons.findIndex((item) => item.lesson.id === lessonId);
    if (idx !== -1) {
      setCurrentLessonIndex(idx);
      setSearchParams({ lesson: lessonId });
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      const nextIdx = currentLessonIndex + 1;
      setCurrentLessonIndex(nextIdx);
      setSearchParams({ lesson: allLessons[nextIdx].lesson.id });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      const prevIdx = currentLessonIndex - 1;
      setCurrentLessonIndex(prevIdx);
      setSearchParams({ lesson: allLessons[prevIdx].lesson.id });
    }
  };

  const handleToggleComplete = () => {
    if (isCompleted) {
      markLessonIncomplete(activeLesson.id);
    } else {
      markLessonComplete(activeLesson.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      {/* Top Learning Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#142D4E] text-white px-4 sm:px-6 h-14 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            title="Exit to Course Details"
            aria-label="Exit to course details"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <div className="overflow-hidden">
            <h2 className="text-xs sm:text-sm font-semibold truncate text-white">
              {course.title}
            </h2>
            <p className="text-[10px] text-sky-400 truncate">
              {activeModule.title} · Lesson {activeLesson.order}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
            <span>Overall Progress:</span>
            <span className="font-mono font-semibold text-white tabular-nums">{progressPercent}%</span>
          </div>

          <button
            onClick={handleToggleComplete}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors hidden xl:block"
            title="Toggle Curriculum Outline"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Learning Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR: Course & Lesson Navigation */}
        {leftSidebarOpen && (
          <aside className="w-72 lg:w-80 bg-white border-r border-slate-200/90 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Curriculum Outline
                </span>
                <p className="text-xs font-semibold text-[#142D4E]">
                  {course.modules.length} Modules · {allLessons.length} Lessons
                </p>
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
                      const isCurrent = les.id === activeLesson.id;
                      const completed = isLessonCompleted(les.id);
                      return (
                        <button
                          key={les.id}
                          onClick={() => handleLessonSelect(les.id)}
                          className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                            isCurrent
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="truncate leading-tight">{les.title}</p>
                            <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                              {les.durationMinutes} min · {les.type}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* CENTER STAGE: Video & Educational Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
          {/* Lesson Header */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono text-blue-600 font-semibold">{activeModule.title}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{activeLesson.durationMinutes} min read & lecture</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#142D4E] tracking-tight">
              {activeLesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeLesson.description}
            </p>
          </div>

          {/* Interactive Video / Case Lecture Stage */}
          <div className="bg-[#142D4E] rounded-2xl overflow-hidden shadow-lg border border-slate-800">
            {/* Visual Screen */}
            <div className="relative aspect-16/9 bg-slate-950 flex items-center justify-center">
              <img
                src={course.thumbnailUrl}
                alt="Operative field playback"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />

              {/* Center Play Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group"
                aria-label={isPlaying ? 'Pause operative lecture' : 'Play operative lecture'}
              >
                <div className="w-16 h-16 rounded-full bg-white/90 text-[#142D4E] flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  )}
                </div>
              </button>

              {/* Top video tag */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
                CLINICAL MICROSCOPY · HD 1080P
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="px-4 py-3 bg-[#0d1e33] border-t border-slate-800 flex items-center justify-between text-white text-xs gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-sky-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setVideoProgress(0)}
                  className="hover:text-sky-400 transition-colors"
                  title="Rewind"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                  14:32 / {activeLesson.durationMinutes}:00
                </span>
              </div>

              {/* Progress Slider */}
              <div className="flex-1 mx-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={videoProgress}
                  onChange={(e) => setVideoProgress(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-semibold"
                >
                  {playbackSpeed}x
                </button>
                <Volume2 className="w-4 h-4 text-slate-400" />
                <Maximize2 className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Tabbed Interactive Lesson Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="flex border-b border-slate-200 bg-[#F5F8FC] px-4 pt-2 gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'content'
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Comprehensive Text & Protocol
              </button>
              <button
                onClick={() => setActiveTab('pearls')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'pearls'
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Clinical Pearls ({activeLesson.clinicalPearls.length})
              </button>
              {activeLesson.anatomicalLandmarks && (
                <button
                  onClick={() => setActiveTab('landmarks')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'landmarks'
                      ? 'bg-white border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Anatomical Landmarks ({activeLesson.anatomicalLandmarks.length})
                </button>
              )}
              {activeLesson.surgicalPitfalls && (
                <button
                  onClick={() => setActiveTab('pitfalls')}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'pitfalls'
                      ? 'bg-white border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Surgical Pitfalls
                </button>
              )}
            </div>

            <div className="p-6">
              {activeTab === 'content' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-line font-normal">
                      {activeLesson.content}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pearls' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    High-Yield Clinical Pearls
                  </h4>
                  <div className="space-y-2.5">
                    {activeLesson.clinicalPearls.map((pearl, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-blue-900"
                      >
                        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pearl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'landmarks' && activeLesson.anatomicalLandmarks && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Key Dissection Landmarks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeLesson.anatomicalLandmarks.map((lm, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-medium text-slate-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>{lm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'pitfalls' && activeLesson.surgicalPitfalls && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Complication Avoidance & Technical Pitfalls
                  </h4>
                  <div className="space-y-2.5">
                    {activeLesson.surgicalPitfalls.map((pf, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-900"
                      >
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Lesson Navigation Controller */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between gap-4">
            <button
              onClick={handlePrevLesson}
              disabled={currentLessonIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Lesson</span>
            </button>

            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg shadow-sm transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#2563EB] hover:bg-blue-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Marked as Completed' : 'Mark as Completed'}</span>
            </button>

            <button
              onClick={handleNextLesson}
              disabled={currentLessonIndex === allLessons.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 transition-colors"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>

        {/* RIGHT SIDEBAR: Resources & Assessment Jump */}
        {rightSidebarOpen && (
          <aside className="w-72 lg:w-80 bg-white border-l border-slate-200/90 flex flex-col shrink-0 p-4 space-y-6 overflow-y-auto hidden lg:block">
            {/* Course Progress Card */}
            <div className="bg-[#F5F8FC] p-4 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Course Progress</span>
                <span className="font-mono font-bold text-blue-600">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(progressPercent, 6)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Lesson {currentLessonIndex + 1} of {allLessons.length}
              </p>
            </div>

            {/* Educational Downloads */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Lesson Resources
              </span>
              <div className="space-y-2">
                <button
                  onClick={() => alert('Downloading: High-Resolution Anatomical Dissection Atlas (PDF)')}
                  className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 flex items-center justify-between text-left text-xs transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Download className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate text-slate-800 font-medium">Dissection Guide (PDF)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">4.2 MB</span>
                </button>

                <button
                  onClick={() => alert('Launching DICOM Viewer Simulation for Case #914')}
                  className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 flex items-center justify-between text-left text-xs transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate text-slate-800 font-medium">Simulated DICOM CT Scan</span>
                  </div>
                  <span className="text-[10px] text-blue-600 font-medium">Interactive</span>
                </button>
              </div>
            </div>

            {/* Assessment Callout */}
            {course.assessmentId && (
              <div className="p-4 rounded-xl bg-[#142D4E] text-white space-y-3">
                <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
                  <Award className="w-4 h-4" />
                  <span>SIMULATION EXAM</span>
                </div>
                <h4 className="text-xs font-semibold text-white leading-tight">
                  Ready to test your surgical retention?
                </h4>
                <p className="text-[11px] text-slate-300">
                  Attempt the timed multiple-choice board simulation exam.
                </p>
                <button
                  onClick={() => navigate(`/assessments/${course.assessmentId}`)}
                  className="w-full py-2 px-3 text-xs font-semibold text-[#142D4E] bg-white hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Start Assessment
                </button>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};

export default LearningInterfacePage;
