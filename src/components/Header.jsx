// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  // Déterminer l'affichage du rôle : 'admin' pour admin, 'user' sinon
  const role = user?.username === 'admin' ? 'admin' : 'user';

  return (
    <header className="app-header">
      <nav>
        <Link to="/">Home</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
