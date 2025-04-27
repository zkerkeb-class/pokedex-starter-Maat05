// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password, role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur inscription');
    }
  };

  return (
    <div className="register-container">
      <h2>S'inscrire</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Nom d’utilisateur
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Rôle
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </label>
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}
