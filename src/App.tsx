import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CourseProgressProvider } from './context/CourseProgressContext';

// Layouts
import StudentLayout from './components/layout/StudentLayout';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Authentication/LoginPage';
import RegisterPage from './pages/Authentication/RegisterPage';
import ForgotPasswordPage from './pages/Authentication/ForgotPasswordPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import CourseCatalogPage from './pages/Courses/CourseCatalogPage';
import CourseDetailsPage from './pages/CourseDetails/CourseDetailsPage';
import LearningInterfacePage from './pages/Learning/LearningInterfacePage';
import AssessmentsListPage from './pages/Assessments/AssessmentsListPage';
import AssessmentTakingPage from './pages/Assessments/AssessmentTakingPage';
import PerformanceAnalyticsPage from './pages/Performance/PerformanceAnalyticsPage';
import StudentProfilePage from './pages/Profile/StudentProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import MyLearningPage from './pages/MyLearning/MyLearningPage';

// Sends logged-out visitors to the login page
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F8FC] text-sm text-slate-500">
        Loading your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

// Public Course Catalog Shell with top bar
const PublicCatalogLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <CourseCatalogPage />
      </main>
      <Footer />
    </div>
  );
};

// Public Course Details Shell
const PublicCourseDetailsLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <CourseDetailsPage />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CourseProgressProvider>
          <Routes>
            {/* Public Landing & Authentication */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Public Course Catalog Access */}
            <Route path="/courses" element={<PublicCatalogLayout />} />
            <Route path="/courses/:id" element={<PublicCourseDetailsLayout />} />

            {/* Learning room (login required) */}
            <Route
              path="/learning/:id"
              element={
                <ProtectedRoute>
                  <LearningInterfacePage />
                </ProtectedRoute>
              }
            />

            {/* Authenticated Student Portal */}
            <Route
              element={
                <ProtectedRoute>
                  <StudentLayout
                    title="emLearns Neuro Portal"
                    subtitle="Centralized Neurosurgery & Neuroscience LMS"
                  />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/my-learning" element={<MyLearningPage />} />
              <Route path="/assessments" element={<AssessmentsListPage />} />
              <Route path="/assessments/:id" element={<AssessmentTakingPage />} />
              <Route path="/performance" element={<PerformanceAnalyticsPage />} />
              <Route path="/profile" element={<StudentProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CourseProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}