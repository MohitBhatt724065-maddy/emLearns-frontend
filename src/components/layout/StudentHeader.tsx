import React, { useState } from 'react';
import { Menu, Search, Bell, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface StudentHeaderProps {
  onOpenMobileSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  onOpenMobileSidebar,
  title = 'Student Learning Center',
  subtitle,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 'notif-1',
      title: 'Upcoming Assessment Scheduled',
      time: 'Tomorrow at 09:00',
      description: 'Cranial Base & Vascular Neurosurgery Board Simulation is due.',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'New Dissection Lecture Added',
      time: 'Yesterday',
      description: 'Module 2: Retrosigmoid Keyhole approach published by Prof. Sterling.',
      unread: false,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-semibold text-[#142D4E] tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-48 lg:w-72">
          <input
            type="text"
            placeholder="Search anatomy, cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F8FC] border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Academic Alerts
                </span>
                <span className="text-xs text-blue-600 font-medium cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-slate-900">{n.title}</p>
                      <span className="text-[10px] text-slate-400 tabular-nums">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">{n.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Info */}
        {user && (
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 pl-2 border-l border-slate-200"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
              referrerPolicy="no-referrer"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-[#142D4E] leading-tight">{user.name}</p>
              <p className="text-[11px] text-slate-500 leading-tight flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-500" /> {user.trainingLevel}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default StudentHeader;
