import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Clock, FileCheck2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { ASSESSMENTS, STUDENT_ANALYTICS } from '../../data/mockData';

export const AssessmentsListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
            <Award className="w-4 h-4 text-sky-500" />
            <span>Academic Assessment Engine</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">Board Simulation Format</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142D4E]">
            Clinical Quizzes & Subspecialty Board Simulations
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Timed clinical evaluations designed to simulate European (EANS) and American (ABNS) board examinations with comprehensive anatomical rationales.
          </p>
        </div>
      </div>

      {/* Available Assessments Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[#142D4E]">Available Masterclass Assessments</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ASSESSMENTS.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-600">{quiz.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {quiz.timeLimitMinutes} min
                    </span>
                    <span className="font-mono tabular-nums">{quiz.questions.length} questions</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-[#142D4E] leading-snug">
                  {quiz.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {quiz.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Passing Threshold: <span className="font-mono font-semibold text-slate-800">{quiz.passingScorePercentage}%</span>
                </span>
                <button
                  onClick={() => navigate(`/assessments/${quiz.id}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#142D4E] hover:bg-[#1a3860] rounded-lg shadow-2xs transition-colors"
                >
                  <span>Launch Exam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Quiz Attempts */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-semibold text-[#142D4E]">Past Assessment Records</h3>
          <p className="text-xs text-slate-500">Your logged exam attempts and pass certifications</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Assessment Title</th>
                <th className="py-3 px-3">Date Completed</th>
                <th className="py-3 px-3">Correct Ratio</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STUDENT_ANALYTICS.quizHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-medium text-slate-900">{item.title}</td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono tabular-nums">{item.date}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-mono tabular-nums">
                    {item.correctAnswers} / {item.totalQuestions}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-blue-600 tabular-nums">
                    {item.score}%
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => navigate('/assessments/quiz-skull-base')}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsListPage;
