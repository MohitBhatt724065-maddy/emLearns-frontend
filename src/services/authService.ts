import type { StudentProfile } from '../types/user';
import apiClient, {
  ACCESS_KEY,
  REFRESH_KEY,
  USER_KEY,
  clearAuthStorage,
} from './api';

interface BackendUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  institution: string | null;
  academic_level: string | null;
  bio: string | null;
  profile_picture: string | null;
  date_joined: string;
}

export interface AuthResponse {
  token: string;
  user: StudentProfile;
}

const mapUser = (u: BackendUser): StudentProfile => ({
  id: String(u.id),
  name: `${u.first_name} ${u.last_name}`.trim() || u.username,
  email: u.email,
  institution: u.institution || '',
  department: '',
  trainingLevel: u.academic_level || '',
  studentId: `EML-${String(u.id).padStart(5, '0')}`,
  joinedDate: new Date(u.date_joined).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  }),
  avatarUrl: u.profile_picture || '',
  bio: u.bio || '',
});

// Turns Django's error JSON into one readable message
const extractError = (err: any, fallback: string): Error => {
  const data = err?.response?.data;
  if (data && typeof data === 'object') {
    const messages = Object.entries(data).map(([field, value]) => {
      const text = Array.isArray(value) ? value.join(' ') : String(value);
      return field === 'detail' || field === 'non_field_errors'
        ? text
        : `${field}: ${text}`;
    });
    if (messages.length) return new Error(messages.join('\n'));
  }
  if (!err?.response) {
    return new Error('Cannot reach the server. Is the backend running?');
  }
  return new Error(fallback);
};

const fetchMe = async (): Promise<StudentProfile> => {
  const res = await apiClient.get<BackendUser>('/auth/me/');
  const user = mapUser(res.data);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const authService = {
  async login(emailOrUsername: string, password: string): Promise<AuthResponse> {
    try {
      const res = await apiClient.post<{ access: string; refresh: string }>(
        '/auth/login/',
        { username: emailOrUsername, password }
      );
      localStorage.setItem(ACCESS_KEY, res.data.access);
      localStorage.setItem(REFRESH_KEY, res.data.refresh);
      const user = await fetchMe();
      return { token: res.data.access, user };
    } catch (err) {
      clearAuthStorage();
      throw extractError(err, 'Login failed. Check your email and password.');
    }
  },

  async register(data: {
    username: string;
    email: string;
    password: string;
    password2: string;
    firstName: string;
    lastName: string;
    institution?: string;
    academicLevel?: string;
  }): Promise<AuthResponse> {
    try {
      await apiClient.post('/auth/register/', {
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password2,
        first_name: data.firstName,
        last_name: data.lastName,
        institution: data.institution ?? '',
        academic_level: data.academicLevel ?? '',
      });
    } catch (err) {
      throw extractError(err, 'Registration failed.');
    }
    // Registered successfully, so sign the user in
    return this.login(data.email, data.password);
  },

  async logout(): Promise<void> {
    clearAuthStorage();
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ACCESS_KEY);
  },

  getCurrentUser(): StudentProfile | null {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as StudentProfile;
    } catch {
      return null;
    }
  },

  async refreshCurrentUser(): Promise<StudentProfile> {
    return fetchMe();
  },
};

export default authService;