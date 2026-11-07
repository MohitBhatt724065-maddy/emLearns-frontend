import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Microscope,
  Activity,
  Layers,
  Sparkles,
  Stethoscope,
  ScanLine,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CourseCard from '../../components/courses/CourseCard';
import { COURSES } from '../../data/mockData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredCourses = COURSES.filter((c) => c.featured);

  const categories = [
    {
      title: 'Neuroscience Fundamentals',
      desc: 'Cellular neurobiology, synaptic receptors, and electrophysiological membrane dynamics.',
      icon: Microscope,
      count: '14 Modules',
      path: '/courses?category=Neuroscience%20Fundamentals',
    },
    {
      title: 'Neuroanatomy',
      desc: 'Functional 3D cranial nerve nuclei, cerebral white matter tracts, and brainstem cross-sections.',
      icon: Layers,
      count: '22 Modules',
      path: '/courses?category=Neuroanatomy',
    },
    {
      title: 'Neurophysiology',
      desc: 'Action potential kinetics, synaptic plasticity, EEG microstates, and intraoperative neuromonitoring.',
      icon: Activity,
      count: '16 Modules',
      path: '/courses?category=Neurophysiology',
    },
    {
      title: 'Neurological Disorders',
      desc: 'Acute ischemic stroke protocols, vascular penumbra mapping, epilepsy, and neurodegeneration.',
      icon: Stethoscope,
      count: '18 Modules',
      path: '/courses?category=Neurological%20Disorders',
    },
    {
      title: 'Neurosurgery',
      desc: 'Microsurgical skull base approaches, petrous apex anatomy, and cerebrovascular bypass technique.',
      icon: Brain,
      count: '24 Modules',
      path: '/courses?category=Neurosurgery',
    },
    {
      title: 'Brain Imaging',
      desc: 'Diffusion Tensor Imaging (DTI), fMRI task activation, and structural MRI radiologic analysis.',
      icon: ScanLine,
      count: '12 Modules',
      path: '/courses?category=Brain%20Imaging',
    },
  ];

  const whyPillars = [
    {
      title: 'Structured Surgical & Academic Curriculum',
      desc: 'Step-by-step modular paths modeled after top residency training guidelines (EANS, AANS, and WFNS standards).',
      icon: BookOpen,
    },
    {
      title: 'Subspecialty Surgical Corridors',
      desc: 'High-definition microscopic dissections, 3D anatomical orientations, and realistic operative pearls.',
      icon: Brain,
    },
    {
      title: 'Interactive Board-Simulation Assessments',
      desc: 'Timed multiple-choice case exams with clinical reasoning rationales, difficulty ratings, and knowledge gap reports.',
      icon: Award,
    },
    {
      title: 'Granular Performance Tracking',
      desc: 'Continuous tracking across functional sub-disciplines, revision topic recommendations, and CME readiness.',
      icon: Activity,
    },
  ];

  const stats = [
    { value: '14,200+', label: 'Active Medical Trainees', sub: 'From 42 countries worldwide' },
    { value: '48', label: 'Neurosurgical Masterclasses', sub: 'Peer-reviewed operative curricula' },
    { value: '98.4%', label: 'Board Examination Pass Rate', sub: 'Among verified course graduates' },
    { value: '32', label: 'Global Teaching Hospitals', sub: 'Integrated into residency syllabi' },
  ];

  const testimonials = [
    {
      quote:
        'The anterior clinoidectomy module with microdissection correlations gave me unprecedented spatial clarity before performing my first unroofing in the OR. emLearns sets a benchmark for surgical education.',
      author: 'Dr. Julian Thorne, MD',
      role: 'Chief Neurosurgery Resident, Massachusetts General Hospital',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256',
    },
    {
      quote:
        'Finally an LMS built specifically for our discipline rather than generic slides. The interactive assessments simulate real neurosurgery board questions with thorough anatomical explanations.',
      author: 'Dr. Sofia Lindholm, MBBS',
      role: 'Clinical Fellow in Cerebrovascular Surgery, Karolinska Institute',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
    },
    {
      quote:
        'The DTI tractography and fMRI courses provide preclinical students with the clinical relevance that traditional neuroanatomy textbooks fail to deliver.',
      author: 'Prof. Arthur Pendelton, DSc',
      role: 'Professor of Neurobiology, University of Oxford',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-white via-[#F5F8FC] to-[#F5F8FC] pt-12 pb-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>Specialized Medical Education Platform</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-normal">Peer-Reviewed Syllabi</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#142D4E] leading-[1.12]">
                Explore the Human Brain. <br className="hidden sm:inline" />
                <span className="text-[#2563EB]">Master Neuroscience.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                The centralized digital learning environment for neuroscience trainees, neurosurgery residents, and medical students. Delve into high-yield neuroanatomy, microsurgical corridors, and clinical board simulations.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#142D4E] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                  <span>Join emLearns</span>
                </button>
              </div>

              {/* Accreditation and trust micro-strip */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> EANS & AANS Aligned
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CME Ready Credits
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Intraoperative Case Vault
                </span>
              </div>
            </div>

            {/* Right Visual Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white group">
                <img
                  src="/src/assets/images/hero_brain_neuroscience_1794031422423.jpg"
                  alt="Biomedical neural connectome 3D visualization"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142D4E]/90 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <p className="text-xs uppercase tracking-wider text-sky-400 font-mono">
                      CORTICAL TRACTOGRAPHY & SYNAPSES
                    </p>
                    <p className="text-sm font-medium leading-snug">
                      High-resolution 3D fiber tract reconstruction for surgical planning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Categories */}
      <section id="categories" className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Systematic Curricula
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
              Core Neuroscience Learning Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              From foundational molecular biology to microsurgical cranial base corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  onClick={() => navigate(cat.path)}
                  className="group cursor-pointer p-6 rounded-xl border border-slate-200 hover:border-blue-400 bg-[#F5F8FC] hover:bg-white transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors mb-4 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-[#142D4E] group-hover:text-[#2563EB] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-slate-700">{cat.count}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#2563EB]">
                      Explore Track <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-[#F5F8FC] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                Residency & Pre-Clinical
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
                Featured Clinical Courses
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Hand-picked neuroanatomy and operative technique courses taught by international department chairs.
              </p>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-blue-800 transition-colors shrink-0"
            >
              <span>View All 18 Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why emLearns Section */}
      <section id="why-emlearns" className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Educational Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
              Engineered for the Rigor of Modern Brain Surgery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Combining operative nuance with academic cognitive retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyPillars.map((p, idx) => {
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
                    <span className="text-xs font-mono text-slate-400">0{idx + 1}.</span>
                    <h3 className="text-base font-semibold text-[#142D4E] mt-1 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#142D4E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-700/60">
            {stats.map((s) => (
              <div key={s.label} className="pt-6 lg:pt-0 lg:px-6 first:pt-0">
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono tabular-nums">
                  {s.value}
                </p>
                <p className="text-sm font-semibold text-sky-300 mt-1">{s.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="faculty" className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Peer Endorsements
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
              Trusted by Trainees & Surgical Program Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-slate-200 bg-[#F5F8FC] flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#142D4E]">{t.author}</p>
                    <p className="text-[11px] text-slate-500 leading-tight">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional CTA Banner */}
      <section className="py-16 bg-linear-to-r from-[#142D4E] to-[#1c3f6e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Elevate Your Neurosurgical Training Today
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Join thousands of residents preparing for European and American Board of Neurological Surgery (ABNS) examinations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3 text-sm font-semibold text-[#142D4E] bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-all"
            >
              Create Resident Account
            </button>
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
