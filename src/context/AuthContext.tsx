import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_STUDENT, StudentProfile } from '../data/mockData';
import authService from '../services/authService';

interface AuthContextType {
  user: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: { name: string; email: string; institution: string; trainingLevel: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<StudentProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check initial token and user state
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await authService.login(email, pass);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { name: string; email: string; institution: string; trainingLevel: string }) => {
    setIsLoading(true);
    try {
      const res = await authService.register(data);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = (updatedFields: Partial<StudentProfile>) => {
    const updated = authService.updateProfile(updatedFields);
    setUser(updated);
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
