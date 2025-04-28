// src/services/api.js
import axios from 'axios';

// --------------------------------------------------------------
// Construit l'URL de base :
// - Lis VITE_API_URL (ex : http://192.168.56.1:3000 ou http://192.168.56.1:3000/api)
// - S'assure qu'elle se termine par « /api » pour pointer vers les routes Express
// --------------------------------------------------------------

let base = import.meta.env.VITE_API_URL || 'http://192.168.56.1:3000';
if (!base.endsWith('/api')) base = base.replace(/\/?$/, '/api');

export const API_BASE = base; // utile pour debug

const api = axios.create({ baseURL: API_BASE });

// Attache automatiquement le JWT s'il existe
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
