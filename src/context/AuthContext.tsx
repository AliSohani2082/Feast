'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserType {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  // Add more user details as needed
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('authStatus');
    const storedUser = localStorage.getItem('user');

    if (storedAuthStatus && storedUser) {
      setAuthenticated(JSON.parse(storedAuthStatus));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: UserType) => {
    setAuthenticated(true);
    setUser(userData);

    localStorage.setItem('authStatus', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);

    localStorage.removeItem('authStatus');
    localStorage.removeItem('user');
  };

  const value: AuthContextProps = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
