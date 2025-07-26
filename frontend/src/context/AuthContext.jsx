import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if there's a stored token (fallback for development)
    const storedToken = typeof window !== 'undefined' ? window.localStorage?.getItem('token') : null;
    if (storedToken) {
      setToken(storedToken);
      getCurrentUser()
        .then((userData) => {
          setUser(userData.user);
        })
        .catch(() => {
          // Token invalid, clear it
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem('token');
          }
          setToken(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    // Store token if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('token', authToken);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // Remove token if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('token');
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};