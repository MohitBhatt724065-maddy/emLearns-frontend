import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import StudentHeader from './StudentHeader';

interface StudentLayoutProps {
  title?: string;
  subtitle?: string;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({ title, subtitle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <StudentHeader
          onOpenMobileSidebar={() => setMobileOpen(true)}
          title={title}
          subtitle={subtitle}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
