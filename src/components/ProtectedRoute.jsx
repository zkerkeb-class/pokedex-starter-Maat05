// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const Spinner = () => <div style={{ padding: 20 }}>Chargement…</div>;

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Spinner />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
