import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircle2,
  Mail,
  Building2,
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  Edit3,
  CheckCircle2,
  Download,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourseProgress } from '../../context/CourseProgressContext';
import { COURSES } from '../../data/mockData';

export const StudentProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { enrolledCourseIds, getCourseProgressPercent, totalStudyHours } = useCourseProgress();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    institution: user?.institution || '',
    department: user?.department || '',
    trainingLevel: user?.trainingLevel || '',
    bio: user?.bio || '',
  });

  const enrolledCourses = COURSES.filter((c) => enrolledCourseIds.includes(c.id));
  const completedCourses = enrolledCourses.filter((c) => getCourseProgressPercent(c) === 100);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={user?.avatarUrl}
                alt={user?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#142D4E]/20 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white" title="Active Trainee">
                <CheckCircle2 className="w-3 h-3" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                <span>{user?.trainingLevel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-500">{user?.studentId}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#142D4E] tracking-tight">
                {user?.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {user?.department}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{user?.institution}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#142D4E] bg-[#F5F8FC] hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bio */}
        {user?.bio && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Academic Background
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
              {user.bio}
            </p>
          </div>
        )}
      </div>

      {/* Trainee Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 block">Enrolled Tracks</span>
          <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
            {enrolledCourseIds.length}
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 block">Completed Tracks</span>
          <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
            {completedCourses.length}
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 block">Logged Hours</span>
          <span className="text-2xl font-bold text-[#142D4E] font-mono tabular-nums mt-1 block">
            {totalStudyHours.toFixed(1)}
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs text-slate-500 block">Certificates</span>
          <span className="text-2xl font-bold text-emerald-600 font-mono tabular-nums mt-1 block">
            {completedCourses.length > 0 ? completedCourses.length : 1}
          </span>
        </div>
      </div>

      {/* Enrolled Courses Progress */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-[#142D4E]">Enrolled Courses</h3>
            <p className="text-xs text-slate-500">Your active subspecialty tracks and syllabus completion</p>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Explore More
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {enrolledCourses.map((c) => {
            const prog = getCourseProgressPercent(c);
            return (
              <div key={c.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-blue-600">{c.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{c.durationHours} hrs</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-500">Taught by {c.instructor.name}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:w-64">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Progress</span>
                      <span className="font-mono font-medium">{prog}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(prog, 8)}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/learning/${c.id}`)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-2xs whitespace-nowrap"
                  >
                    Resume
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Achievements & Certificates */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-semibold text-[#142D4E]">Learning Achievements & Credentials</h3>
          <p className="text-xs text-slate-500">Accredited certifications and verified surgical dissection credits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#F5F8FC] border border-slate-200/80 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                Foundations of Clinical Neurophysiology
              </h4>
              <p className="text-xs text-slate-500">
                Awarded October 2026 · Karolinska Institute Accredited
              </p>
              <button
                onClick={() => alert('Certificate verified: Download initiated (PDF format).')}
                className="pt-1 text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Download Certificate (PDF)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F8FC] border border-slate-200/80 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                Cranial Base Dissection Masterclass
              </h4>
              <p className="text-xs text-slate-500">
                18 Category 1 CME Credits Completed
              </p>
              <button
                onClick={() => alert('CME transcript generated.')}
                className="pt-1 text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> CME Transcript
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-[#142D4E]">Edit Trainee Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name & Credentials
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Affiliated Institution
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Department / Surgical Unit
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Training Level / Residency Year
                </label>
                <select
                  value={formData.trainingLevel}
                  onChange={(e) => setFormData({ ...formData, trainingLevel: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                >
                  <option value="Medical Student">Medical Student</option>
                  <option value="PGY-1 Neurosurgery Resident">PGY-1 Neurosurgery Resident</option>
                  <option value="PGY-2 Neurosurgery Resident">PGY-2 Neurosurgery Resident</option>
                  <option value="PGY-3 Neurosurgery Resident">PGY-3 Neurosurgery Resident</option>
                  <option value="PGY-4+ Neurosurgery Resident">PGY-4+ Neurosurgery Resident</option>
                  <option value="Clinical Fellow">Clinical Fellow</option>
                  <option value="Attending Neurosurgeon">Attending Neurosurgeon</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Academic Focus & Bio
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfilePage;
