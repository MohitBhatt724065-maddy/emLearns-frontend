import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Sparkles,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Layers,
  TrendingUp,
  Video,
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BackendCourseCard from '../../components/courses/BackendCourseCard';
import courseService from '../../services/courseService';
import type { BackendCourse } from '../../types/course';
import { useAuth } from '../../context/AuthContext';
import heroImage from '../../assets/images/hero_brain_neuroscience_1794031422423.jpg';

const pillars = [
  {
    title: 'Structured Curriculum',
    desc: 'Every course is organised into modules and lessons, so you always know what to study next.',
    icon: Layers,
    soon: false,
  },
  {
    title: 'Your Progress, Saved',
    desc: 'Enroll in a course, mark lessons complete, and pick up where you left off from any device.',
    icon: TrendingUp,
    soon: false,
  },
  {
    title: 'Text and Video Lessons',
    desc: 'Read written lessons and watch linked lecture videos in one learning room.',
    icon: Video,
    soon: false,
  },
  {
    title: 'AI Study Assistant',
    desc: 'Ask questions and get answers grounded in the course lessons.',
    icon: Sparkles,
    soon: true,
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [courses, setCourses] = useState<BackendCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    let active = true;

    courseService
      .getCourses()
      .then((data) => {
        if (active) setCourses(data);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const featuredCourses = useMemo(
    () =>
      [...courses]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 3),
    [courses]
  );

  const totalLessons = useMemo(
    () => courses.reduce((sum, c) => sum + c.lesson_count, 0),
    [courses]
  );

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    courses.forEach((c) => {
      const name = c.category.trim();
      if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [courses]);

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-white via-[#F5F8FC] to-[#F5F8FC] pt-12 pb-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>Neuroscience & Neurosurgery Learning Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#142D4E] leading-[1.12]">
                Explore the Human Brain. <br className="hidden sm:inline" />
                <span className="text-[#2563EB]">Master Neuroscience.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                A learning environment for neuroscience trainees, neurosurgery
                residents, and medical students. Study structured courses in
                neuroanatomy, neurological disorders and neurosurgery, with your
                progress saved as you go.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#142D4E] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                  <span>{isAuthenticated ? 'Go to Dashboard' : 'Join emLearns'}</span>
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Structured courses
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Progress saved to your account
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Text and video lessons
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white group">
                <img
                  src={heroImage}
                  alt="Neural connectome visualization"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142D4E]/90 via-transparent to-transparent flex items-end p-6">
                  <p className="text-xs uppercase tracking-wider text-sky-400 font-mono">
                    Neural connectome visualization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories (built from real courses) */}
      {categories.length > 0 && (
        <section id="categories" className="py-20 bg-white border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                Browse by Topic
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
                Learning Categories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => navigate(`/courses?category=${encodeURIComponent(cat.name)}`)}
                  className="group text-left p-6 rounded-xl border border-slate-200 hover:border-blue-400 bg-[#F5F8FC] hover:bg-white transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors mb-4 shadow-2xs">
                      <Brain className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-[#142D4E] group-hover:text-[#2563EB] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-slate-700">
                      {cat.count} {cat.count === 1 ? 'course' : 'courses'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#2563EB]">
                      View courses{' '}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured courses */}
      <section className="py-20 bg-[#F5F8FC] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                Latest Courses
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
                Start Learning
              </h2>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-blue-800 transition-colors shrink-0"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {isLoading && <p className="text-sm text-slate-600">Loading courses...</p>}

          {!isLoading && loadError && (
            <p className="text-sm text-red-700">
              Courses could not be loaded right now. Please try again later.
            </p>
          )}

          {!isLoading && !loadError && featuredCourses.length === 0 && (
            <p className="text-sm text-slate-600">New courses are on the way.</p>
          )}

          {!isLoading && !loadError && featuredCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <BackendCourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What the platform offers */}
      <section id="why-emlearns" className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Why emLearns
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
              Built for Focused Study
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-xl border border-slate-200/90 bg-[#F5F8FC] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#142D4E] text-sky-400 flex items-center justify-center mb-5 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">0{idx + 1}.</span>
                      {p.soon && (
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-[#142D4E] mt-1 mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real numbers from the database */}
      {!isLoading && !loadError && courses.length > 0 && (
        <section className="py-16 bg-[#142D4E] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 text-center divide-x divide-slate-700/60">
              <div className="px-6">
                <p className="text-3xl sm:text-4xl font-bold tracking-tight font-mono tabular-nums">
                  {courses.length}
                </p>
                <p className="text-sm font-semibold text-sky-300 mt-1 flex items-center justify-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {courses.length === 1 ? 'Course available' : 'Courses available'}
                </p>
              </div>
              <div className="px-6">
                <p className="text-3xl sm:text-4xl font-bold tracking-tight font-mono tabular-nums">
                  {totalLessons}
                </p>
                <p className="text-sm font-semibold text-sky-300 mt-1">
                  {totalLessons === 1 ? 'Lesson published' : 'Lessons published'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="py-16 bg-linear-to-r from-[#142D4E] to-[#1c3f6e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Start Your Neuroscience Learning Today
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Create an account, enroll in a course, and track your progress lesson by lesson.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {!isAuthenticated && (
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3 text-sm font-semibold text-[#142D4E] bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-all"
              >
                Create Account
              </button>
            )}
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all"
            >
              Browse Course Catalog
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;