import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext';
import courseService from '../services/courseService';
import type { BackendEnrollment } from '../types/course';

interface CourseProgressContextType {
  enrollments: BackendEnrollment[];
  isLoading: boolean;
  isEnrolled: (courseId: number) => boolean;
  enrollInCourse: (courseId: number) => Promise<void>;
  refreshEnrollments: () => Promise<void>;
  completedCoursesCount: number;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(
  undefined
);

export const CourseProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [enrollments, setEnrollments] = useState<BackendEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshEnrollments = useCallback(async () => {
    if (!isAuthenticated) {
      setEnrollments([]);
      return;
    }
    try {
      setIsLoading(true);
      const data = await courseService.getMyEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error('Failed to load enrollments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshEnrollments();
  }, [refreshEnrollments]);

  const isEnrolled = (courseId: number) =>
    enrollments.some((e) => e.course.id === courseId);

  const enrollInCourse = async (courseId: number) => {
    await courseService.enroll(courseId);
    await refreshEnrollments();
  };

  const completedCoursesCount = enrollments.filter(
    (e) => e.total_lessons > 0 && e.progress_percent === 100
  ).length;

  return (
    <CourseProgressContext.Provider
      value={{
        enrollments,
        isLoading,
        isEnrolled,
        enrollInCourse,
        refreshEnrollments,
        completedCoursesCount,
      }}
    >
      {children}
    </CourseProgressContext.Provider>
  );
};

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};