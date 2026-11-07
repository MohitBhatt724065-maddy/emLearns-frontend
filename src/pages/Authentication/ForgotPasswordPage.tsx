import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
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
          Reset Portal Password
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Enter your institutional email to receive secure recovery instructions
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Recovery Link Dispatched</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an active trainee account exists for <span className="font-medium text-slate-800">{email}</span>, password reset instructions have been forwarded.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft className="w-4 h-4" /> Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Institutional Email
                </label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@hospital.org"
                    className="block w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] focus:outline-none transition-colors"
              >
                Send Recovery Instructions
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
