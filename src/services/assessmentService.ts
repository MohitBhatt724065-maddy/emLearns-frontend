import { Assessment, ASSESSMENTS, STUDENT_ANALYTICS } from '../data/mockData';
import apiClient from './api';

export interface AssessmentResult {
  assessmentId: string;
  totalQuestions: number;
  correctAnswersCount: number;
  scorePercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  submittedAt: string;
  answers: Record<string, number>;
  questionReviews: {
    questionId: string;
    questionText: string;
    selectedOption: number;
    correctOption: number;
    isCorrect: boolean;
    explanation: string;
    topic: string;
  }[];
}

export const assessmentService = {
  async getAssessments(): Promise<Assessment[]> {
    try {
      const response = await apiClient.get<Assessment[]>('/assessments/');
      return response.data;
    } catch {
      return ASSESSMENTS;
    }
  },

  async getAssessmentById(id: string): Promise<Assessment | null> {
    try {
      const response = await apiClient.get<Assessment>(`/assessments/${id}/`);
      return response.data;
    } catch {
      const quiz = ASSESSMENTS.find((a) => a.id === id || a.courseId === id);
      return quiz || null;
    }
  },

  async submitAssessment(
    assessmentId: string,
    answers: Record<string, number>,
    timeSpentSeconds: number
  ): Promise<AssessmentResult> {
    try {
      const response = await apiClient.post<AssessmentResult>(`/assessments/${assessmentId}/submit/`, {
        answers,
        timeSpentSeconds,
      });
      return response.data;
    } catch {
      const quiz = ASSESSMENTS.find((a) => a.id === assessmentId) || ASSESSMENTS[0];
      let correct = 0;

      const questionReviews = quiz.questions.map((q) => {
        const selected = answers[q.id];
        const isCorrect = selected === q.correctOptionIndex;
        if (isCorrect) correct += 1;
        return {
          questionId: q.id,
          questionText: q.questionText,
          selectedOption: selected ?? -1,
          correctOption: q.correctOptionIndex,
          isCorrect,
          explanation: q.explanation,
          topic: q.clinicalTopic,
        };
      });

      const scorePercentage = Math.round((correct / quiz.questions.length) * 100);
      const passed = scorePercentage >= quiz.passingScorePercentage;

      const result: AssessmentResult = {
        assessmentId,
        totalQuestions: quiz.questions.length,
        correctAnswersCount: correct,
        scorePercentage,
        passed,
        timeSpentSeconds,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        answers,
        questionReviews,
      };

      // Store in local storage history for persistent reflection
      try {
        const storedHistory = localStorage.getItem('emlearns_assessment_history');
        const history = storedHistory ? JSON.parse(storedHistory) : STUDENT_ANALYTICS.quizHistory;
        const newRecord = {
          id: `qh-${Date.now()}`,
          title: quiz.title,
          date: result.submittedAt,
          score: scorePercentage,
          totalQuestions: quiz.questions.length,
          correctAnswers: correct,
          status: passed ? ('Passed' as const) : ('Retake Required' as const),
        };
        localStorage.setItem('emlearns_assessment_history', JSON.stringify([newRecord, ...history]));
      } catch (e) {
        console.error('Failed to update assessment history', e);
      }

      return result;
    }
  },
};

export default assessmentService;
