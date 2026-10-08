import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'bangtan_audio_session_v1';

function hasSession() {
  return localStorage.getItem(AUTH_KEY) === 'remembered' || sessionStorage.getItem(AUTH_KEY) === 'active';
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(hasSession);

  const signIn = (rememberMe) => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    (rememberMe ? localStorage : sessionStorage).setItem(AUTH_KEY, rememberMe ? 'remembered' : 'active');
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
