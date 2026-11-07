import { Course, COURSES, Lesson, Module } from '../data/mockData';
import apiClient from './api';

export const courseService = {
  async getCourses(filters?: { category?: string; difficulty?: string; search?: string }): Promise<Course[]> {
    try {
      const response = await apiClient.get<Course[]>('/courses/', { params: filters });
      return response.data;
    } catch {
      let filtered = [...COURSES];
      if (filters?.category && filters.category !== 'All') {
        filtered = filtered.filter((c) => c.category === filters.category);
      }
      if (filters?.difficulty && filters.difficulty !== 'All') {
        filtered = filtered.filter((c) => c.difficulty === filters.difficulty);
      }
      if (filters?.search && filters.search.trim() !== '') {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.shortDescription.toLowerCase().includes(query) ||
            c.instructor.name.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query)
        );
      }
      return filtered;
    }
  },

  async getCourseById(id: string): Promise<Course | null> {
    try {
      const response = await apiClient.get<Course>(`/courses/${id}/`);
      return response.data;
    } catch {
      const found = COURSES.find((c) => c.id === id || c.slug === id);
      return found || null;
    }
  },

  async getLesson(courseId: string, lessonId: string): Promise<{ course: Course; module: Module; lesson: Lesson } | null> {
    const course = await this.getCourseById(courseId);
    if (!course) return null;

    for (const mod of course.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { course, module: mod, lesson };
      }
    }
    return null;
  }
};

export default courseService;
