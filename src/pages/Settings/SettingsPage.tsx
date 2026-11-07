import React, { useState } from 'react';
import {
  Settings,
  Lock,
  Bell,
  Sliders,
  CheckCircle2,
  Shield,
  Save,
  Moon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications' | 'clinical'>('account');

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [institution, setInstitution] = useState(user?.institution || '');

  // Security states
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);

  // Notification states
  const [emailReminders, setEmailReminders] = useState(true);
  const [assessmentAlerts, setAssessmentAlerts] = useState(true);
  const [newCurriculumUpdates, setNewCurriculumUpdates] = useState(false);

  // Clinical interface preferences
  const [defaultSpeed, setDefaultSpeed] = useState('1');
  const [highContrastAnatomy, setHighContrastAnatomy] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, institution });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      setSecurityMessage('Please fill all password fields.');
      return;
    }
    if (newPass !== confirmPass) {
      setSecurityMessage('New passwords do not match.');
      return;
    }
    setSecurityMessage('Password updated successfully.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setSecurityMessage(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
            <Settings className="w-4 h-4 text-sky-500" />
            <span>Platform Configuration</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">Trainee Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
            Account & Learning Environment Settings
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Manage your institutional credentials, notification alerts, security passwords, and surgical interface display preferences.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex gap-2 border-b border-slate-200 mt-6 pt-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('account')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'account'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Account Details
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Password & Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Notification Preferences
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'clinical'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Clinical Interface
          </button>
        </div>
      </div>

      {/* Account Settings Tab */}
      {activeTab === 'account' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#142D4E]">Institutional Identity</h2>
              <p className="text-xs text-slate-500">Your verified medical credentials for CME issuance</p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Changes Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAccount} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hospital / Academic Center
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Update Account Information</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-semibold text-[#142D4E]">Password & Security Credentials</h2>
            <p className="text-xs text-slate-500">Ensure strong credentials protecting your clinical portfolio</p>
          </div>

          {securityMessage && (
            <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800">
              {securityMessage}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-sm transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Save New Password</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-semibold text-[#142D4E]">Notification Preferences</h2>
            <p className="text-xs text-slate-500">Configure how and when emLearns notifies you</p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#F5F8FC] border border-slate-200/80">
              <div>
                <p className="text-xs font-semibold text-slate-900">Upcoming Board Assessment Reminders</p>
                <p className="text-xs text-slate-500">Alerts 24 hours prior to scheduled simulation deadlines</p>
              </div>
              <input
                type="checkbox"
                checked={assessmentAlerts}
                onChange={(e) => setAssessmentAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#F5F8FC] border border-slate-200/80">
              <div>
                <p className="text-xs font-semibold text-slate-900">Weekly Study Progress Digests</p>
                <p className="text-xs text-slate-500">Summary of weekly hours logged and cohort percentiles</p>
              </div>
              <input
                type="checkbox"
                checked={emailReminders}
                onChange={(e) => setEmailReminders(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#F5F8FC] border border-slate-200/80">
              <div>
                <p className="text-xs font-semibold text-slate-900">New Operative Modules & Case Alerts</p>
                <p className="text-xs text-slate-500">Notifications when faculty publish new cranial masterclasses</p>
              </div>
              <input
                type="checkbox"
                checked={newCurriculumUpdates}
                onChange={(e) => setNewCurriculumUpdates(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Clinical Interface Tab */}
      {activeTab === 'clinical' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-semibold text-[#142D4E]">Clinical Learning Interface</h2>
            <p className="text-xs text-slate-500">Personalize player playback and high-yield anatomical annotations</p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Default Video Playback Velocity
              </label>
              <select
                value={defaultSpeed}
                onChange={(e) => setDefaultSpeed(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 bg-white"
              >
                <option value="1">1.0x (Standard Speed)</option>
                <option value="1.25">1.25x (Accelerated Review)</option>
                <option value="1.5">1.5x (Fast Didactic Lecture)</option>
                <option value="2">2.0x (Maximum Scrub)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#F5F8FC] border border-slate-200/80">
              <div>
                <p className="text-xs font-semibold text-slate-900">High-Contrast Radiological Windowing</p>
                <p className="text-xs text-slate-500">Enhance vessel boundary contrast in skull base video frames</p>
              </div>
              <input
                type="checkbox"
                checked={highContrastAnatomy}
                onChange={(e) => setHighContrastAnatomy(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
