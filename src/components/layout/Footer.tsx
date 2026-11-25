import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#142D4E] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-700/60">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">emLearns</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A learning platform for neuroscience and neurosurgery students, with structured
              courses, lessons and progress tracking.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Learn
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/my-learning" className="hover:text-white transition-colors">
                  My Learning
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-xs text-slate-500">
          <p>© 2026 emLearns. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;