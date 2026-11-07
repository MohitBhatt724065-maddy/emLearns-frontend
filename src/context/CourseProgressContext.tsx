import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES, Course } from '../data/mockData';

interface CourseProgressContextType {
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  markLessonComplete: (lessonId: string) => void;
  markLessonIncomplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getCourseProgressPercent: (course: Course) => number;
  totalCompletedCoursesCount: number;
  totalStudyHours: number;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export const CourseProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('emlearns_enrolled_courses');
    return saved ? JSON.parse(saved) : ['course-1', 'course-2', 'course-3', 'course-5'];
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('emlearns_completed_lessons');
    return saved ? JSON.parse(saved) : ['les-1-1', 'les-2-1', 'les-3-1', 'les-5-1'];
  });

  useEffect(() => {
    localStorage.setItem('emlearns_enrolled_courses', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  useEffect(() => {
    localStorage.setItem('emlearns_completed_lessons', JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  const enrollInCourse = (courseId: string) => {
    setEnrolledCourseIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
  };

  const unenrollFromCourse = (courseId: string) => {
    setEnrolledCourseIds((prev) => prev.filter((id) => id !== courseId));
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
  };

  const markLessonIncomplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => prev.filter((id) => id !== lessonId));
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessonIds.includes(lessonId);
  };

  const getCourseProgressPercent = (course: Course): number => {
    let total = 0;
    let completed = 0;

    course.modules.forEach((mod) => {
      mod.lessons.forEach((l) => {
        total += 1;
        if (completedLessonIds.includes(l.id)) {
          completed += 1;
        }
      });
    });

    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  // Calculate completed courses count
  const totalCompletedCoursesCount = COURSES.filter((course) => {
    if (!enrolledCourseIds.includes(course.id)) return false;
    const progress = getCourseProgressPercent(course);
    return progress === 100;
  }).length;

  const totalStudyHours = Math.round(completedLessonIds.length * 0.75 * 10) / 10 + 38.5;

  return (
    <CourseProgressContext.Provider
      value={{
        enrolledCourseIds,
        completedLessonIds,
        enrollInCourse,
        unenrollFromCourse,
        isEnrolled,
        markLessonComplete,
        markLessonIncomplete,
        isLessonCompleted,
        getCourseProgressPercent,
        totalCompletedCoursesCount,
        totalStudyHours,
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
