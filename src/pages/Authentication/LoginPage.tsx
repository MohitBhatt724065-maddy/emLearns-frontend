import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('maya.lin@neuro.med.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please provide your academic email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid academic credentials. Please verify your institution login.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('maya.lin@neuro.med.edu');
    setPassword('demoPass123!');
    setLoading(true);
    await login('maya.lin@neuro.med.edu', 'demoPass123!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 text-[#142D4E] mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#142D4E] flex items-center justify-center text-sky-400 shadow-sm">
            <Brain className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#142D4E]">
            emLearns<span className="text-sky-500 font-semibold text-base ml-0.5">.neuro</span>
          </span>
        </Link>
        <h2 className="text-center text-2xl font-bold text-[#142D4E] tracking-tight">
          Sign in to your learning portal
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Access specialized neurosurgical and neuroscience course materials
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Institutional Email Address
              </label>
              <div className="relative rounded-md shadow-2xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="resident@hospital.org"
                  className="block w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-md shadow-2xs">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] focus:outline-none transition-colors disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Demonstration Quick Access */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-blue-200 rounded-lg text-xs font-medium text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Sign In as Demo Resident (Dr. Maya Lin)</span>
            </button>

            <div className="text-center">
              <span className="text-xs text-slate-500">Don't have an account yet? </span>
              <Link to="/register" className="text-xs font-semibold text-blue-600 hover:underline">
                Register here
              </Link>
            </div>
          </div>
        </div>

        {/* Security badge notice */}
        <p className="mt-6 text-center text-xs text-slate-400">
          emLearns LMS conforms to institutional single-sign-on (SSO) and Django REST token auth standards.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
