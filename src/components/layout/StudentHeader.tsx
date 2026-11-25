import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

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
        <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-48 lg:w-72">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F8FC] border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {user && (
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 pl-2 border-l border-slate-200"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#142D4E] text-white flex items-center justify-center text-xs font-bold">
                {(user.name || '?').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-[#142D4E] leading-tight">{user.name}</p>
              {user.trainingLevel && (
                <p className="text-[11px] text-slate-500 leading-tight">{user.trainingLevel}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default StudentHeader;