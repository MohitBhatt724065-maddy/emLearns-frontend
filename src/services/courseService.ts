import apiClient from './api';
import type {
  BackendCourse,
  BackendCourseDetail,
  BackendEnrollment,
  BackendCourseProgress,
} from '../types/course';

export const courseService = {
  async getCourses(filters?: {
    category?: string;
    search?: string;
  }): Promise<BackendCourse[]> {
    const res = await apiClient.get<BackendCourse[]>('/courses/', {
      params: filters,
    });
    return res.data;
  },

  async getCourseById(id: string | number): Promise<BackendCourseDetail> {
    const res = await apiClient.get<BackendCourseDetail>(`/courses/${id}/`);
    return res.data;
  },

  async enroll(courseId: number): Promise<BackendEnrollment> {
    const res = await apiClient.post<BackendEnrollment>(
      `/courses/${courseId}/enroll/`
    );
    return res.data;
  },

  async getMyEnrollments(): Promise<BackendEnrollment[]> {
    const res = await apiClient.get<BackendEnrollment[]>('/enrollments/');
    return res.data;
  },

  async completeLesson(lessonId: number): Promise<void> {
    await apiClient.post(`/lessons/${lessonId}/complete/`);
  },

  async getCourseProgress(courseId: number): Promise<BackendCourseProgress> {
    const res = await apiClient.get<BackendCourseProgress>(
      `/courses/${courseId}/progress/`
    );
    return res.data;
  },
};

export default courseService;