export interface BackendCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnail: string | null;
  lesson_count: number;
  created_at: string;
  updated_at: string;
}

export interface BackendModule {
  id: number;
  course: number;
  title: string;
  description: string;
  order: number;
}

export interface BackendLesson {
  id: number;
  module: number;
  title: string;
  description: string;
  content: string;
  order: number;
  video_url: string;
  is_published: boolean;
  created_at: string;
  image: string | null;
}

export interface CourseModuleWithLessons extends BackendModule {
  lessons: BackendLesson[];
}

export interface BackendCourseDetail extends BackendCourse {
  modules: CourseModuleWithLessons[];
  is_enrolled: boolean;
}

export interface BackendEnrollment {
  id: number;
  course: BackendCourse;
  enrolled_at: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percent: number;
}

export interface BackendCourseProgress {
  course: number;
  completed_lesson_ids: number[];
  completed_lessons: number;
  total_lessons: number;
  progress_percent: number;
}