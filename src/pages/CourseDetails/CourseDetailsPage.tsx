import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  FileText,
  Activity,
  ArrowLeft,
  Award,
  ShieldCheck,
  Share2,
  Check
} from 'lucide-react';
import { COURSES } from '../../data/mockData';
import { useCourseProgress } from '../../context/CourseProgressContext';

export const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEnrolled, enrollInCourse, getCourseProgressPercent } = useCourseProgress();

  const course = COURSES.find((c) => c.id === id || c.slug === id) || COURSES[0];
  const enrolled = isEnrolled(course.id);
  const progress = enrolled ? getCourseProgressPercent(course) : 0;

  // Track expanded modules
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(
    course.modules.map((m) => m.id)
  );

  const [copiedLink, setCopiedLink] = useState(false);

  const toggleModule = (modId: string) => {
    setExpandedModuleIds((prev) =>
      prev.includes(modId) ? prev.filter((i) => i !== modId) : [...prev, modId]
    );
  };

  const handleEnrollOrResume = () => {
    if (!enrolled) {
      enrollInCourse(course.id);
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
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>
      </div>

      {/* Main Course Hero Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-5">
            {/* Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-blue-600">{course.category}</span>
              <span aria-hidden="true">·</span>
              <span>{course.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-slate-700 tabular-nums">{course.rating.toFixed(2)}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-mono">{course.enrolledStudentsCount.toLocaleString()} surgeons enrolled</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#142D4E] leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {course.fullDescription}
            </p>

            {/* Quick Summary Pill-Free Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Total Duration</span>
                <span className="text-slate-800 font-semibold text-sm tabular-nums flex items-center gap-1 mt-0.5">
                  <Clock className="w-4 h-4 text-slate-400" /> {course.durationHours} Hours
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Curriculum Structure</span>
                <span className="text-slate-800 font-semibold text-sm tabular-nums flex items-center gap-1 mt-0.5">
                  <BookOpen className="w-4 h-4 text-slate-400" /> {course.modules.length} Modules / {course.totalLessons} Lessons
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Board Accreditation</span>
                <span className="text-emerald-700 font-semibold text-sm flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 18 CME Category 1
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Card */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#F5F8FC] p-6 rounded-xl border border-slate-200/90">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden aspect-16/10 bg-slate-200 shadow-2xs">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {enrolled && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Enrolled Progress</span>
                    <span className="font-mono font-semibold text-slate-900">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(progress, 8)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleEnrollOrResume}
                className="w-full py-3 px-4 rounded-lg text-sm font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-sky-400" />
                <span>{enrolled ? 'Enter Learning Room' : 'Enroll in Masterclass'}</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Link Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Share Syllabus with Department</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left Curriculum Syllabus + Right Instructor & Prerequisites */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Learning Objectives & Module Curriculum */}
        <div className="lg:col-span-8 space-y-8">
          {/* Learning Objectives */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-base font-semibold text-[#142D4E] mb-4">
              Key Learning Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {course.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Accordion (Course -> Module -> Lesson) */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-semibold text-[#142D4E]">Course Curriculum</h3>
                <p className="text-xs text-slate-500">
                  {course.modules.length} Modules · {course.totalLessons} Lessons
                </p>
              </div>
              <button
                onClick={() => {
                  if (expandedModuleIds.length === course.modules.length) {
                    setExpandedModuleIds([]);
                  } else {
                    setExpandedModuleIds(course.modules.map((m) => m.id));
                  }
                }}
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                {expandedModuleIds.length === course.modules.length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, mIdx) => {
                const isExpanded = expandedModuleIds.includes(module.id);
                return (
                  <div
                    key={module.id}
                    className="border border-slate-200 rounded-lg overflow-hidden bg-white"
                  >
                    {/* Module Accordion Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-4 py-3.5 bg-[#F5F8FC] hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono text-blue-600 font-semibold uppercase">
                          Module {mIdx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-[#142D4E]">
                          {module.title}
                        </h4>
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

                    {/* Module Lessons List */}
                    {isExpanded && (
                      <div className="divide-y divide-slate-100">
                        {module.lessons.map((lesson, lIdx) => (
                          <div
                            key={lesson.id}
                            className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 text-xs font-mono">
                                {lesson.type === 'video' ? (
                                  <Play className="w-3.5 h-3.5 text-blue-600" />
                                ) : lesson.type === 'reading' ? (
                                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Activity className="w-3.5 h-3.5 text-purple-600" />
                                )}
                              </div>
                              <div>
                                <h5 className="text-xs sm:text-sm font-medium text-slate-900 leading-snug">
                                  {lesson.title}
                                </h5>
                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                  {lesson.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs text-slate-400 font-mono tabular-nums">
                                {lesson.durationMinutes}m
                              </span>
                              <Link
                                to={`/learning/${course.id}?lesson=${lesson.id}`}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                              >
                                View
                              </Link>
                            </div>
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

        {/* Right Column: Instructor & Prerequisites */}
        <div className="lg:col-span-4 space-y-6">
          {/* Instructor Bio */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Principal Faculty
            </h3>
            <div className="flex items-start gap-4">
              <img
                src={course.instructor.avatarUrl}
                alt={course.instructor.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-bold text-[#142D4E]">
                  {course.instructor.name}
                </h4>
                <p className="text-xs text-blue-600 font-medium">
                  {course.instructor.credentials}
                </p>
                <p className="text-xs text-slate-500 leading-tight mt-0.5">
                  {course.instructor.institution}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {course.instructor.bio}
            </p>
          </div>

          {/* Academic Prerequisites */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Prerequisites
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {course.prerequisites.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Associated Assessment Card */}
          {course.assessmentId && (
            <div className="bg-[#142D4E] text-white rounded-xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
                <Award className="w-4 h-4" />
                <span>BOARD SIMULATION MODULE</span>
              </div>
              <h4 className="text-sm font-semibold text-white">
                Comprehensive Assessment Available
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Test your mastery of this curriculum with our timed multiple-choice exam.
              </p>
              <button
                onClick={() => navigate(`/assessments/${course.assessmentId}`)}
                className="w-full py-2 px-3 text-xs font-semibold text-[#142D4E] bg-white hover:bg-slate-100 rounded-lg transition-colors mt-2"
              >
                Attempt Board Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
