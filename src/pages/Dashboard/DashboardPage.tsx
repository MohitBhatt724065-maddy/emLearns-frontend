import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  Play,
  Calendar,
  Sparkles,
  ExternalLink,
  Brain
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useCourseProgress } from '../../context/CourseProgressContext';
import { COURSES, STUDENT_ANALYTICS, ASSESSMENTS } from '../../data/mockData';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const {
    enrolledCourseIds,
    totalCompletedCoursesCount,
    totalStudyHours,
    getCourseProgressPercent,
  } = useCourseProgress();
  const navigate = useNavigate();

  const enrolledCourses = COURSES.filter((c) => enrolledCourseIds.includes(c.id));
  const activeCourse = enrolledCourses[0] || COURSES[0];
  const activeCourseProgress = getCourseProgressPercent(activeCourse);

  const recommendedCourses = COURSES.filter((c) => !enrolledCourseIds.includes(c.id)).slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>Residency Learning Portal</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">{user?.institution}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
              Welcome back, {user?.name || 'Doctor'}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              You are currently engaged with <span className="font-semibold text-slate-800">{activeCourse.title}</span>. Your upcoming board simulation is scheduled in 2 days.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate(`/learning/${activeCourse.id}`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-current text-sky-400" />
              <span>Resume Study</span>
            </button>
            <button
              onClick={() => navigate('/assessments')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-[#F5F8FC] hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <Award className="w-4 h-4 text-[#2563EB]" />
              <span>Take Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Enrolled Courses
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#142D4E] font-mono tabular-nums">
              {enrolledCourseIds.length}
            </span>
            <span className="text-xs text-slate-500">Active Tracks</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Core Curricula</span>
            <Link to="/courses" className="text-blue-600 hover:underline font-medium">
              Browse More
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Courses Completed
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#142D4E] font-mono tabular-nums">
              {totalCompletedCoursesCount}
            </span>
            <span className="text-xs text-slate-500">Certificates Earned</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Requirements</span>
            <span className="font-mono text-slate-700">6 Tracks Needed</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learning Hours
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#142D4E] font-mono tabular-nums">
              {totalStudyHours.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">Hours Recorded</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>This Academic Term</span>
            <span className="text-emerald-600 font-medium">+4.5 hrs this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Avg. Board Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#142D4E] font-mono tabular-nums">
              {STUDENT_ANALYTICS.averageScorePercent}%
            </span>
            <span className="text-xs text-emerald-600 font-medium">Top 5% Cohort</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Passing Threshold</span>
            <span className="font-mono text-slate-700">75% Min.</span>
          </div>
        </div>
      </div>

      {/* Continue Learning Spotlight */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-[#142D4E]">Current In-Progress Course</h2>
            <p className="text-xs text-slate-500">Pick up right where you left off</p>
          </div>
          <button
            onClick={() => navigate('/my-learning')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            View All Enrolled Courses
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#F5F8FC] p-4 sm:p-5 rounded-xl border border-slate-200/70">
          <div className="lg:col-span-3 rounded-lg overflow-hidden aspect-16/10 bg-slate-200">
            <img
              src={activeCourse.thumbnailUrl}
              alt={activeCourse.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-blue-600">{activeCourse.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeCourse.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>{activeCourse.instructor.name}</span>
            </div>
            <h3 className="text-lg font-bold text-[#142D4E] leading-snug">
              {activeCourse.title}
            </h3>
            <p className="text-xs text-slate-600 line-clamp-2">
              Next Lesson: <span className="font-medium text-slate-900">{activeCourse.modules[0]?.lessons[0]?.title || 'Introduction to Surgical Approaches'}</span>
            </p>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Progress: {activeCourseProgress}% completed</span>
                <span className="font-mono">{activeCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)} total lessons</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(activeCourseProgress, 8)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex lg:justify-end">
            <button
              onClick={() => navigate(`/learning/${activeCourse.id}`)}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <span>Resume Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Weekly Study Hours</h3>
              <p className="text-xs text-slate-500">Logged surgical video study and case reviews</p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
              Total: 29.8 hrs
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STUDENT_ANALYTICS.weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} unit="h" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-md text-xs">
                          <p className="font-semibold text-slate-800">{payload[0].payload.day}</p>
                          <p className="text-blue-600 font-mono mt-0.5">{payload[0].value} hours logged</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="hours" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Board Simulation Performance Trend */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Score Trend (%)</h3>
              <p className="text-xs text-slate-500">Board simulation test trajectory</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              +9% Trajectory
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={STUDENT_ANALYTICS.performanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-md text-xs">
                          <p className="font-semibold text-slate-800">{payload[0].payload.date}</p>
                          <p className="text-blue-600 font-mono">Your Score: {payload[0].value}%</p>
                          <p className="text-slate-500 font-mono">Cohort Avg: {payload[0].payload.average}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: '#2563EB' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="average" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upcoming Assessments & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upcoming Assessments */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Upcoming Board Assessments</h3>
              <p className="text-xs text-slate-500">Standardized clinical evaluations</p>
            </div>
            <Link to="/assessments" className="text-xs font-semibold text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {ASSESSMENTS.map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 rounded-lg bg-[#F5F8FC] border border-slate-200/80 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-blue-600">{quiz.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{quiz.timeLimitMinutes} mins</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{quiz.questions.length} questions</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                    {quiz.title}
                  </h4>
                </div>

                <button
                  onClick={() => navigate(`/assessments/${quiz.id}`)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-md transition-colors shrink-0"
                >
                  Start Exam
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Recent Activity</h3>
              <p className="text-xs text-slate-500">Your study progress timestamps</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {STUDENT_ANALYTICS.recentActivities.map((act) => (
              <div key={act.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-900">{act.title}</p>
                  <p className="text-[11px] text-slate-500">{act.courseName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono tabular-nums">{act.timestamp}</span>
                  {act.score !== undefined && (
                    <p className="text-xs font-semibold text-emerald-600 font-mono">{act.score}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Courses Track */}
      {recommendedCourses.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-[#142D4E]">Recommended for Your Subspecialty</h3>
              <p className="text-xs text-slate-500">Based on your focus in cranial base and clinical neurophysiology</p>
            </div>
            <Link to="/courses" className="text-xs font-semibold text-blue-600 hover:underline">
              Explore All Tracks
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#F5F8FC] border border-slate-200/80 flex flex-col sm:flex-row gap-4 items-center"
              >
                <div className="w-full sm:w-36 aspect-16/10 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src={c.thumbnailUrl}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-blue-600">{c.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{c.durationHours} hrs</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#142D4E] leading-snug line-clamp-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{c.shortDescription}</p>
                  <button
                    onClick={() => navigate(`/courses/${c.id}`)}
                    className="pt-1 text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    View Syllabus <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
