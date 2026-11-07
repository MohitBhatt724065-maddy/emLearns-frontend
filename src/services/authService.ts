import { CURRENT_STUDENT, StudentProfile } from '../data/mockData';
import apiClient from './api';

export interface AuthResponse {
  token: string;
  user: StudentProfile;
}

export const authService = {
  async login(email: string, _password: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login/', { email, password: _password });
      localStorage.setItem('emlearns_auth_token', response.data.token);
      localStorage.setItem('emlearns_current_student', JSON.stringify(response.data.user));
      return response.data;
    } catch {
      // Fallback to demonstration user
      const stored = localStorage.getItem('emlearns_current_student');
      const student: StudentProfile = stored ? JSON.parse(stored) : { ...CURRENT_STUDENT, email: email || CURRENT_STUDENT.email };
      const fallbackToken = 'demo-jwt-token-neuro-auth-9821';
      localStorage.setItem('emlearns_auth_token', fallbackToken);
      localStorage.setItem('emlearns_current_student', JSON.stringify(student));
      return { token: fallbackToken, user: student };
    }
  },

  async register(data: { name: string; email: string; institution: string; trainingLevel: string }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register/', data);
      localStorage.setItem('emlearns_auth_token', response.data.token);
      localStorage.setItem('emlearns_current_student', JSON.stringify(response.data.user));
      return response.data;
    } catch {
      const newStudent: StudentProfile = {
        id: `std-${Math.floor(1000 + Math.random() * 9000)}`,
        name: data.name,
        email: data.email,
        institution: data.institution || 'Teaching Hospital & Academic Medical Center',
        department: 'Department of Clinical Neurosciences',
        trainingLevel: data.trainingLevel || 'Neurosurgery Resident',
        studentId: `NS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        joinedDate: 'November 2026',
        avatarUrl: CURRENT_STUDENT.avatarUrl,
        bio: 'Enrolled in emLearns specialized neurological curriculum.',
      };
      const fallbackToken = 'demo-jwt-token-registered-7123';
      localStorage.setItem('emlearns_auth_token', fallbackToken);
      localStorage.setItem('emlearns_current_student', JSON.stringify(newStudent));
      return { token: fallbackToken, user: newStudent };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout/');
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('emlearns_auth_token');
    }
  },

  getCurrentUser(): StudentProfile {
    const stored = localStorage.getItem('emlearns_current_student');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return CURRENT_STUDENT;
      }
    }
    return CURRENT_STUDENT;
  },

  updateProfile(profile: Partial<StudentProfile>): StudentProfile {
    const current = this.getCurrentUser();
    const updated = { ...current, ...profile };
    localStorage.setItem('emlearns_current_student', JSON.stringify(updated));
    return updated;
  }
};

export default authService;
