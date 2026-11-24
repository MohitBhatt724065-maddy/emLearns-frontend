import React, { createContext, useContext, useState, useEffect } from 'react';
import type { StudentProfile } from '../types/user';
import authService from '../services/authService';
import { USER_KEY } from '../services/api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;
  institution?: string;
  academicLevel?: string;
}

interface AuthContextType {
  user: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, pass: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<StudentProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentProfile | null>(null);
  // Only true while the app checks the saved login on first load
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      if (!authService.isLoggedIn()) {
        setIsLoading(false);
        return;
      }

      // Show the saved user instantly, then confirm with the server
      setUser(authService.getCurrentUser());

      try {
        const fresh = await authService.refreshCurrentUser();
        if (!cancelled) setUser(fresh);
      } catch {
        // Token is invalid or expired and could not be refreshed
        await authService.logout();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (emailOrUsername: string, pass: string) => {
    const res = await authService.login(emailOrUsername, pass);
    setUser(res.user);
  };

  const register = async (data: RegisterData) => {
    const res = await authService.register(data);
    setUser(res.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  // NOTE: this updates the screen and the browser only. It does NOT save to
  // Django yet. A real profile-update endpoint comes in a later step.
  const updateProfile = (updatedFields: Partial<StudentProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updatedFields };
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};