import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, BookOpen, Filter } from 'lucide-react';

import BackendCourseCard from '../../components/courses/BackendCourseCard';
import { courseService } from '../../services/courseService';
import type { BackendCourse } from '../../types/course';

const CourseCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('newest');

  const [backendCourses, setBackendCourses] = useState<BackendCourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch courses from Django when the page loads
  useEffect(() => {
    let isActive = true;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setApiError(null);

        const courses = await courseService.getCourses();

        if (isActive) {
          setBackendCourses(courses);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);

        if (isActive) {
          setApiError('Unable to load courses. Please try again.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isActive = false;
    };
  }, []);

  // Keep the search field synchronized with URL parameters
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Filter and sort the courses received from Django
  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = backendCourses.filter((course) => {
      const matchesSearch =
        query === '' ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === '' ||
        course.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }

      // Newest courses first
      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });
  }, [backendCourses, searchQuery, sortBy, categoryFilter]);

  // Clear the search and URL parameters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="space-y-8">

      {/* Catalog Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">

          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Curriculum Catalog</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">
              {categoryFilter || 'All Courses'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
            Explore Neuroscience & Neurosurgery Courses
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            Explore courses covering neuroscience, neuroanatomy,
            neurological disorders, and neurosurgery.
          </p>
        </div>

        {/* Search and Sorting */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-100">

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F8FC] border border-slate-300 rounded-lg pl-10 pr-9 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />

            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-500 font-medium">
              Sort:
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="newest">Newest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing{' '}
          <span className="font-semibold text-slate-900 font-mono tabular-nums">
            {filteredCourses.length}
          </span>{' '}
          course{filteredCourses.length === 1 ? '' : 's'}
        </span>

        {(searchQuery || categoryFilter) && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-sm text-slate-600">
            Loading courses from emLearns...
          </p>
        </div>
      )}

      {/* API Error State */}
      {!isLoading && apiError && (
        <div className="bg-white rounded-2xl border border-red-200 p-12 text-center space-y-3">
          <h3 className="text-base font-semibold text-red-700">
            Unable to load courses
          </h3>

          <p className="text-sm text-slate-600">
            {apiError}
          </p>

          <p className="text-xs text-slate-500">
            Check that your Django backend is running, then refresh this page.
          </p>
        </div>
      )}

      {/* Course Grid */}
      {!isLoading && !apiError && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <BackendCourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !apiError && filteredCourses.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">

          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-6 h-6" />
          </div>

          <h3 className="text-base font-semibold text-slate-900">
            {backendCourses.length === 0
              ? 'No courses available yet'
              : 'No courses match your filters'}
          </h3>

          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {backendCourses.length === 0
              ? 'Courses added through the Django administration panel will appear here.'
              : 'Try another search term or clear your filters.'}
          </p>

          {(searchQuery || categoryFilter) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] rounded-lg hover:bg-[#1a3860] transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default CourseCatalogPage;