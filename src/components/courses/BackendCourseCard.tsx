import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import type { BackendCourse } from '../../types/course';

interface BackendCourseCardProps {
  course: BackendCourse;
}

const BackendCourseCard: React.FC<BackendCourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {course.thumbnail && (
        <div className="aspect-16/10 overflow-hidden bg-slate-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="font-medium text-[#2563EB]">
            {course.category || 'Neuroscience'}
          </span>
          {course.level && (
            <>
              <span aria-hidden="true">·</span>
              <span>{course.level}</span>
            </>
          )}
        </div>

        <h3 className="text-base font-semibold text-[#142D4E] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
          <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
          {course.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-slate-500 tabular-nums">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            {course.lesson_count} {course.lesson_count === 1 ? 'lesson' : 'lessons'}
          </span>
          <Link
            to={`/courses/${course.id}`}
            className="font-semibold text-[#2563EB] hover:text-blue-800"
          >
            View Course →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackendCourseCard;