import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, logout as apiLogout } from '../API/ApiResponse';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token && !user) { // Only fetch if token exists and user isn’t set
        try {
          const response = await getProfile();
          setUser(response);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          apiLogout();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };
    fetchUser();
  }, []); // Run once on mount

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    apiLogout(); // Clears token from localStorage
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};