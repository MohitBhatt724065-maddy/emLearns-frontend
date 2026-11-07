import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  RotateCcw,
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ASSESSMENTS, Assessment, QuizQuestion } from '../../data/mockData';
import assessmentService, { AssessmentResult } from '../../services/assessmentService';

export const AssessmentTakingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const assessment: Assessment =
    ASSESSMENTS.find((a) => a.id === id || a.courseId === id) || ASSESSMENTS[0];

  // Assessment flow states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(assessment.timeLimitMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Timer effect
  useEffect(() => {
    if (result) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [result]);

  const currentQuestion: QuizQuestion = assessment.questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (result) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const toggleFlagQuestion = (qId: string) => {
    setFlaggedQuestions((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleAutoSubmit = async () => {
    await handleSubmitExam();
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    const timeSpent = assessment.timeLimitMinutes * 60 - timeLeftSeconds;
    const res = await assessmentService.submitAssessment(
      assessment.id,
      selectedAnswers,
      timeSpent
    );
    setResult(res);
    setIsSubmitting(false);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions([]);
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds(assessment.timeLimitMinutes * 60);
    setResult(null);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // RESULT VIEW
  // ----------------------------------------------------
  if (result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        {/* Result Score Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs text-center space-y-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              result.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            }`}
          >
            {result.passed ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
          </div>

          <div>
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                result.passed ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {result.passed ? 'Passing Standard Achieved' : 'Retake Recommendation'}
            </span>
            <h1 className="text-3xl font-bold text-[#142D4E] tracking-tight mt-1">
              Assessment Results: {result.scorePercentage}%
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Passing Benchmark: {assessment.passingScorePercentage}% · Time Logged: {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
            </p>
          </div>

          <div className="max-w-md mx-auto grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-[#F5F8FC] rounded-lg border border-slate-200/80">
              <span className="text-slate-400 block font-medium">Total Questions</span>
              <span className="text-slate-800 font-bold text-base font-mono tabular-nums">
                {result.totalQuestions}
              </span>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
              <span className="text-emerald-700 block font-medium">Correct</span>
              <span className="text-emerald-800 font-bold text-base font-mono tabular-nums">
                {result.correctAnswersCount}
              </span>
            </div>
            <div className="p-3 bg-rose-50/60 rounded-lg border border-rose-100">
              <span className="text-rose-700 block font-medium">Incorrect</span>
              <span className="text-rose-800 font-bold text-base font-mono tabular-nums">
                {result.totalQuestions - result.correctAnswersCount}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Retake Assessment</span>
            </button>
            <button
              onClick={() => navigate(`/learning/${assessment.courseId}`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-2xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Return to Learning Room</span>
            </button>
          </div>
        </div>

        {/* Question-by-Question Medical Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-semibold text-[#142D4E]">Detailed Clinical Review & Rationales</h2>
              <p className="text-xs text-slate-500">Board explanation breakdown for each anatomical question</p>
            </div>
          </div>

          <div className="space-y-6">
            {result.questionReviews.map((rev, idx) => (
              <div
                key={rev.questionId}
                className={`p-5 rounded-xl border ${
                  rev.isCorrect
                    ? 'bg-emerald-50/20 border-emerald-200'
                    : 'bg-rose-50/20 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-slate-700">Question {idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{rev.topic}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      rev.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {rev.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect
                      </>
                    )}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-3">
                  {rev.questionText}
                </h3>

                {/* Explanation Rationale Box */}
                <div className="mt-3 p-3.5 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Board Review Rationale:
                  </p>
                  <p className="leading-relaxed text-slate-600">{rev.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Revision Topics */}
        <div className="bg-[#142D4E] text-white rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs uppercase font-mono tracking-wider text-sky-400">
              TARGETED REVISION RECOMMENDATION
            </span>
            <h3 className="text-base font-semibold text-white">
              Cranial Base Microsurgical Anatomy (Module 1)
            </h3>
            <p className="text-xs text-slate-300">
              Re-review Parkinson's and Kawase's triangles prior to your clinical rotation exam.
            </p>
          </div>
          <button
            onClick={() => navigate(`/learning/${assessment.courseId}`)}
            className="px-4 py-2.5 text-xs font-semibold text-[#142D4E] bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Review Module 1 Now
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TEST TAKING VIEW
  // ----------------------------------------------------
  const answeredCount = Object.keys(selectedAnswers).length;
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      {/* Top Test Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-medium text-blue-600">{assessment.category}</span>
            <span aria-hidden="true">·</span>
            <span>Board Examination Simulation</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[#142D4E] tracking-tight">
            {assessment.title}
          </h1>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white flex items-center gap-2 shadow-xs">
            <Clock className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-sm font-semibold tabular-nums">
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to exit the exam? Your progress will not be saved.')) {
                navigate('/assessments');
              }
            }}
            className="text-xs text-slate-500 hover:text-slate-800 p-2"
          >
            Exit Exam
          </button>
        </div>
      </div>

      {/* Question Jumper Navigation Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-xs flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          {assessment.questions.map((q, idx) => {
            const isSelected = selectedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentQuestionIndex;
            const isFlagged = flaggedQuestions.includes(q.id);

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-colors relative shrink-0 ${
                  isCurrent
                    ? 'bg-[#142D4E] text-white'
                    : isSelected
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                )}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-mono shrink-0">
          Answered: {answeredCount}/{assessment.questions.length}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono font-semibold text-blue-600 uppercase">
            Question {currentQuestionIndex + 1} of {assessment.questions.length}
          </span>
          <button
            onClick={() => toggleFlagQuestion(currentQuestion.id)}
            className={`text-xs font-medium hover:underline ${
              flaggedQuestions.includes(currentQuestion.id) ? 'text-amber-600 font-semibold' : 'text-slate-500'
            }`}
          >
            {flaggedQuestions.includes(currentQuestion.id) ? '★ Flagged for Review' : '☆ Flag for Review'}
          </button>
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-[#142D4E] leading-relaxed">
          {currentQuestion.questionText}
        </h2>

        {/* Multiple Choice Options */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-600 text-blue-900 shadow-2xs'
                    : 'bg-[#F5F8FC] border-slate-200/90 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 bg-white text-slate-500'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <span className="leading-relaxed flex-1">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Question Controls */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-3">
          {isLastQuestion ? (
            <button
              onClick={handleSubmitExam}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Calculating Score...' : 'Submit Assessment'}</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(assessment.questions.length - 1, prev + 1))}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-2xs transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentTakingPage;
