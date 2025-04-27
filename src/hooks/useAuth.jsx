// src/hooks/useAuth.jsx
// --------------------------------------------------------------
// Auth client simplifié : plus d'appel /auth/me.
// On se base sur la présence du JWT. Si on a besoin d'infos user,
// on les décode directement depuis le payload du token (aucune
// requête supplémentaire au backend).
// --------------------------------------------------------------

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();
const decodeToken = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------------
  // À l'initialisation : lit le token et, si présent, le décode.
  // ----------------------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(decodeToken(token));
    }
    setLoading(false);
  }, []);

  // ----------------------------------------------------------
  // login(username, password)
  // ----------------------------------------------------------
  const login = useCallback(async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setUser(decodeToken(data.token)); // stocke les infos issues du payload
  }, []);

  // ----------------------------------------------------------
  // logout()
  // ----------------------------------------------------------
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }, []);

  const register = useCallback(async (username, password, role = 'user') => {
    // appel à POST /api/auth/register
    await api.post('/auth/register', { username, password, role });
    // puis on redirige vers login ou on auto‐login si tu préfères :
    // navigate('/login');
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,       // ← exporte register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default useAuth;
