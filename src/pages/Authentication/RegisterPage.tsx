import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Brain,
  ArrowRight,
  Lock,
  Mail,
  User,
  AtSign,
  Building2,
  GraduationCap,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const inputClass =
  'block w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none';
const labelClass =
  'block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1';
const iconClass =
  'w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [academicLevel, setAcademicLevel] = useState('Neurosurgery Resident');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !username || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    try {
      setLoading(true);
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
        password2: confirmPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        institution: institution.trim(),
        academicLevel,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 text-[#142D4E] mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#142D4E] flex items-center justify-center text-sky-400 shadow-sm">
            <Brain className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#142D4E]">
            emLearns<span className="text-sky-500 font-semibold text-base ml-0.5">.neuro</span>
          </span>
        </Link>
        <h2 className="text-center text-2xl font-bold text-[#142D4E] tracking-tight">
          Create Trainee Account
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Enroll in accredited neurosurgical & neuroscience curricula
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="whitespace-pre-line">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name</label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    className={inputClass}
                  />
                  <User className={iconClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Morgan"
                    className={inputClass}
                  />
                  <User className={iconClass} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Username</label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="alex_morgan"
                    className={inputClass}
                  />
                  <AtSign className={iconClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@hospital.edu"
                    className={inputClass}
                  />
                  <Mail className={iconClass} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Institution</label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Far Western University"
                    className={inputClass}
                  />
                  <Building2 className={iconClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Training Stage</label>
                <div className="relative rounded-md shadow-2xs">
                  <select
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value)}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="Medical Student">Medical Student</option>
                    <option value="Neurosurgery Resident">Neurosurgery Resident (PGY 1-7)</option>
                    <option value="Clinical Fellow">Clinical Fellow / Specialist</option>
                    <option value="Neuroscience Researcher">Neuroscience Researcher / PhD</option>
                    <option value="Attending Neurosurgeon">Attending / Consultant Neurosurgeon</option>
                  </select>
                  <GraduationCap className={iconClass} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Password</label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className={inputClass}
                  />
                  <Lock className={iconClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Confirm Password</label>
                <div className="relative rounded-md shadow-2xs">
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className={inputClass}
                  />
                  <Lock className={iconClass} />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 focus:outline-none transition-colors disabled:opacity-50"
              >
                <span>{loading ? 'Creating account...' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500">Already registered? </span>
            <Link to="/login" className="text-xs font-semibold text-blue-600 hover:underline">
              Sign in to your portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;