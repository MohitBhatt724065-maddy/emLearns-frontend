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
  enrolledCourseIds: string[];
  isLoading: boolean;
  isEnrolled: (courseId: string | number) => boolean;
  enrollInCourse: (courseId: string | number) => Promise<void>;
  refreshEnrollments: () => Promise<void>;
  completedCoursesCount: number;
  totalCompletedCoursesCount: number;
  getCourseProgressPercent: (course: { id: string | number }) => number;
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

  const isEnrolled = (courseId: string | number) =>
    enrollments.some((e) => String(e.course.id) === String(courseId));

  const enrollInCourse = async (courseId: string | number) => {
    await courseService.enroll(Number(courseId));
    await refreshEnrollments();
  };

  const enrolledCourseIds = enrollments.map((e) => String(e.course.id));

  const getCourseProgressPercent = (course: { id: string | number }) => {
    const enrollment = enrollments.find(
      (e) => String(e.course.id) === String(course.id)
    );
    return enrollment?.progress_percent ?? 0;
  };

  const completedCoursesCount = enrollments.filter(
    (e) => e.total_lessons > 0 && e.progress_percent === 100
  ).length;

  return (
    <CourseProgressContext.Provider
      value={{
        enrollments,
        enrolledCourseIds,
        isLoading,
        isEnrolled,
        enrollInCourse,
        refreshEnrollments,
        completedCoursesCount,
        totalCompletedCoursesCount: completedCoursesCount,
        getCourseProgressPercent,
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