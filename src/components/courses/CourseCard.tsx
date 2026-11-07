import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Star, ArrowUpRight } from 'lucide-react';
import { Course } from '../../data/mockData';
import { useCourseProgress } from '../../context/CourseProgressContext';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const { isEnrolled, getCourseProgressPercent } = useCourseProgress();
  const enrolled = isEnrolled(course.id);
  const progress = enrolled ? getCourseProgressPercent(course) : 0;

  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Thumbnail Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // High-grade fallback
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        {/* Soft contrast scrim for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Quiet status banner if enrolled */}
        {enrolled && (
          <div className="absolute top-3 left-3 bg-[#142D4E]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs">
            {progress === 100 ? 'Completed' : `${progress}% In Progress`}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="font-medium text-[#2563EB]">{course.category}</span>
            <span aria-hidden="true">·</span>
            <span>{course.difficulty}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[#142D4E] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Instructor & Metadata Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 truncate pr-2">
              <img
                src={course.instructor.avatarUrl}
                alt={course.instructor.name}
                className="w-5 h-5 rounded-full object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="truncate text-slate-700">{course.instructor.name}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="tabular-nums text-slate-700">{course.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 tabular-nums">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.durationHours} hrs
              </span>
              <span className="flex items-center gap-1 tabular-nums">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" /> {course.totalLessons} lessons
              </span>
            </div>

            <button
              onClick={() => navigate(enrolled ? `/learning/${course.id}` : `/courses/${course.id}`)}
              className="inline-flex items-center gap-1 font-semibold text-[#2563EB] hover:text-blue-800 transition-colors text-xs"
            >
              {enrolled ? 'Resume' : 'View Syllabus'}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
