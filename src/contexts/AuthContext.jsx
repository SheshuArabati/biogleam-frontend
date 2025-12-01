import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as apiLogout } from '../lib/api';
import { getUserFromToken } from '../lib/jwt';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Try to get user from token first
    const userFromToken = getUserFromToken(token);
    if (userFromToken) {
      setUser(userFromToken);
      setLoading(false);
      return;
    }

    // Fallback to API call if token decode fails
    try {
      const response = await getCurrentUser();
      setUser(response.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      // Ignore errors
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user);
    } catch (error) {
      await logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
