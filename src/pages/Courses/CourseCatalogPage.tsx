import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, BookOpen, Layers } from 'lucide-react';
import CourseCard from '../../components/courses/CourseCard';
import { COURSES, Course } from '../../data/mockData';

export const CourseCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('popular');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get('search');
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const categories = [
    'All',
    'Neuroscience Fundamentals',
    'Neuroanatomy',
    'Neurophysiology',
    'Neurological Disorders',
    'Neurosurgery',
    'Brain Imaging',
  ];

  const difficulties = [
    'All',
    'Undergraduate',
    'Medical Student',
    'Neurosurgery Resident',
  ];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course: Course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDifficulty && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.enrolledStudentsCount - a.enrolledStudentsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return b.durationHours - a.durationHours;
      return 0;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery, sortBy]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSearchQuery('');
    setSortBy('popular');
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
            <span className="text-slate-500 font-normal">All Specializations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
            Explore Neuroscience & Neurosurgery Masterclasses
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Search peer-reviewed operative courses, functional white matter anatomy modules, and neuroimaging curricula.
          </p>
        </div>

        {/* Search & Utility Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-100">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by operative approach, structure, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F8FC] border border-slate-300 rounded-lg pl-10 pr-9 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Difficulty Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
                Level:
              </span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff === 'All' ? 'All Difficulties' : diff}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="popular">Most Enrolled</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Longest Duration</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs (Segmented interactive buttons per Skill guidelines) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#142D4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <span className="font-semibold text-slate-900 font-mono tabular-nums">{filteredCourses.length}</span> course
          {filteredCourses.length === 1 ? '' : 's'}
          {selectedCategory !== 'All' && <span> in <span className="font-medium text-slate-800">{selectedCategory}</span></span>}
        </span>
        {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No courses match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your difficulty and category filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] rounded-lg hover:bg-[#1a3860] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCatalogPage;
