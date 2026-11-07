import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ShieldCheck, Award, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#142D4E] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">emLearns</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Advancing surgical competency, clinical neurophysiology, and neuroanatomy through peer-reviewed curricula designed for medical trainees and neurosurgeons.
            </p>
            <div className="flex items-center gap-4 text-xs text-sky-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> CME Accredited
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Board Aligned
              </span>
            </div>
          </div>

          {/* Academic Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Curricula
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/courses?category=Neurosurgery" className="hover:text-white transition-colors">
                  Neurosurgical Approaches
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Neuroanatomy" className="hover:text-white transition-colors">
                  Functional Neuroanatomy
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Neurophysiology" className="hover:text-white transition-colors">
                  Clinical Neurophysiology
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Brain%20Imaging" className="hover:text-white transition-colors">
                  fMRI & DTI Tractography
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Neurological%20Disorders" className="hover:text-white transition-colors">
                  Acute Stroke & Cerebrovascular
                </Link>
              </li>
            </ul>
          </div>

          {/* Student & Faculty Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Student Learning Room
                </Link>
              </li>
              <li>
                <Link to="/assessments" className="hover:text-white transition-colors">
                  Board Simulation Quizzes
                </Link>
              </li>
              <li>
                <Link to="/performance" className="hover:text-white transition-colors">
                  Academic Analytics
                </Link>
              </li>
              <li>
                <a href="#faculty" className="hover:text-white transition-colors">
                  Contributing Faculty
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  DICOM 3D Case Vault (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Institutional Integration Notice */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Backend Integration
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Designed as a decoupled React client connecting to the Django REST Framework (DRF) educational core service with Course → Module → Lesson relational hierarchies.
            </p>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Compatible with standard residency ACGME & EANS educational tracking frameworks.</span>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 emLearns Medical Education Platform. All clinical cases peer-reviewed.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Educational Service</span>
            <span>·</span>
            <span>Medical Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
