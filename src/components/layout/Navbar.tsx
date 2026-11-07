import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <Link to="/" className="flex items-center gap-2.5 text-[#142D4E] hover:opacity-90 transition-opacity shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#142D4E] flex items-center justify-center text-sky-400 shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#142D4E] whitespace-nowrap">
              emLearns<span className="text-sky-500 font-semibold text-sm ml-0.5">.neuro</span>
            </span>
          </Link>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-[#142D4E] transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link to="/courses" className="hover:text-[#142D4E] transition-colors whitespace-nowrap">
              Explore Courses
            </Link>
            <a href="#categories" className="hover:text-[#142D4E] transition-colors whitespace-nowrap">
              Curriculum
            </a>
            <a href="#why-emlearns" className="hover:text-[#142D4E] transition-colors whitespace-nowrap">
              Why emLearns
            </a>
            <a href="#faculty" className="hover:text-[#142D4E] transition-colors whitespace-nowrap">
              Faculty
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-[#142D4E] transition-colors whitespace-nowrap"
                >
                  Log in
                </Link>
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-[#142D4E] hover:bg-slate-50 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-[#142D4E] hover:bg-slate-50 rounded-md"
          >
            Explore Courses
          </Link>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-[#142D4E] rounded-lg"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-[#2563EB] rounded-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
