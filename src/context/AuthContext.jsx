import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

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
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        let parsedUser = JSON.parse(storedUser);
        
        // 🚨 PERMANENT ROLE FIX: Normalize admin role to company_admin
        if (parsedUser && parsedUser.role === 'admin' && (parsedUser.email?.includes('admin') || parsedUser.email?.includes('@spc') || parsedUser.email?.includes('@company'))) {
          console.log('🚨 FIXING ROLE: admin → company_admin for', parsedUser.email);
          parsedUser = { ...parsedUser, role: 'company_admin' };
          localStorage.setItem('user', JSON.stringify(parsedUser));
        }
        
        setUser(parsedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, companyId = null) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password,
        ...(companyId && { companyId })
      });
      const { token, user } = response.data.data;

      // 🚨 PERMANENT ROLE FIX: Normalize admin role to company_admin
      let normalizedUser = user;
      if (user && user.role === 'admin' && (user.email?.includes('admin') || user.email?.includes('@spc') || user.email?.includes('@company'))) {
        console.log('🚨 FIXING ROLE: admin → company_admin for', user.email);
        normalizedUser = { ...user, role: 'company_admin' };
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      
      // Apply user's theme preference
      if (normalizedUser.themePreference) {
        localStorage.setItem('theme', normalizedUser.themePreference);
      }
      
      setToken(token);
      setUser(normalizedUser);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const googleLogin = async (credential) => {
    try {
      const response = await api.post('/auth/google', { credential });
      const { token, user } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Apply user's theme preference
      if (user.themePreference) {
        localStorage.setItem('theme', user.themePreference);
      }
      
      setToken(token);
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Google login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    login,
    googleLogin,
    register,
    logout,
    updateUser,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
