import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  GraduationCap,
  UserCircle2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Brain,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

    const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Explore Courses', path: '/courses', icon: Compass },
    { label: 'My Learning', path: '/my-learning', icon: GraduationCap },
    { label: 'Profile', path: '/profile', icon: UserCircle2 },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#142D4E] text-slate-300 border-r border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-700/60 shrink-0">
        <NavLink
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 overflow-hidden"
        >
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight leading-none">
                emLearns
              </span>
              <span className="text-[10px] text-sky-400 font-mono tracking-wider mt-0.5">
                NEUROSURGERY LMS
              </span>
            </div>
          )}
        </NavLink>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-slate-400 hover:text-white p-1"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                } ${collapsed && !mobileOpen ? 'justify-center' : ''}`
              }
              title={collapsed && !mobileOpen ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {(!collapsed || mobileOpen) && (
                <span className="truncate whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Student Profile Quick Strip & Logout */}
      <div className="p-3 border-t border-slate-700/60 shrink-0 space-y-2">
        {(!collapsed || mobileOpen) && user && (
          <div className="flex items-center gap-3 px-2 py-1.5">
            <img
               src={user.avatarUrl}
               alt={user.name}
               className="w-8 h-8 rounded-full object-cover border border-sky-400/30 shrink-0"
               referrerPolicy="no-referrer"
              />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.trainingLevel}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 rounded-lg transition-colors ${
            collapsed && !mobileOpen ? 'justify-center' : ''
          }`}
          title="Logout"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {(!collapsed || mobileOpen) && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="fixed top-0 bottom-0 z-30 transition-all duration-300 h-screen" style={{ width: collapsed ? '5rem' : '16rem' }}>
          {content}
        </div>
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
