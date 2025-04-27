// src/App.jsx
// --------------------------------------------------------------
// Structure principale de l'application React
// --------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import api from './services/api';

/* --- Pages & composants --- */
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchBar from './components/searchbar';
import PokemonCard from './components/pokemonCard';
import PokemonDetailWrapper from './components/pokemonCard/pokemonDetail/PokemonDetailWrapper';

import './App.css';

/* --------------------------------------------------------------
 *  Page liste Pokémons
 * ------------------------------------------------------------*/
const PokemonListPage = ({ language }) => {
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const compareMode = location.state?.primaryCompare;

  useEffect(() => {
    api
      .get('/pokemons')
      .then((r) => setPokemons(r.data))
      .catch((err) => console.error('Error fetching pokemons:', err));
  }, []);

  return (
    <div className="app-container">
      {/* -------- Sélecteur de langue -------- */}
      <div className="language-selector">
        <label htmlFor="language">Select Language:&nbsp;</label>
        <select
          name="language"
          value={language}
          onChange={(e) =>
            navigate(location.pathname, {
              replace: true,
              state: { ...location.state, language: e.target.value },
            })
          }
        >
          <option value="english">English</option>
          <option value="french">Français</option>
          <option value="japanese">日本語</option>
          <option value="chinese">中文</option>
        </select>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        types={types}
        setTypes={setTypes}
      />

      {/* -------- Liste des cartes -------- */}
      <div className="pokemon-list">
        {pokemons
          .filter((pokemon) => {
            const s = search.toLowerCase();
            const nameMatch =
              s === '' ||
              (pokemon.name.english &&
                pokemon.name.english.toLowerCase().includes(s)) ||
              (pokemon.name.french &&
                pokemon.name.french.toLowerCase().includes(s));
            const typeMatch =
              types.length === 0 || types.every((t) => pokemon.type.includes(t));
            return nameMatch && typeMatch;
          })
          .map((pokemon) => {
            if (compareMode) {
              return (
                <div
                  key={pokemon.id}
                  onClick={() =>
                    navigate(`/pokemon/${location.state.primaryCompare}`, {
                      state: {
                        primaryCompare: location.state.primaryCompare,
                        compareId: pokemon.id,
                        language,
                      },
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <PokemonCard pokemon={pokemon} language={language} />
                </div>
              );
            }
            return (
              <Link
                to={`/pokemon/${pokemon.id}`}
                state={{ language }}
                key={pokemon.id}
                style={{ textDecoration: 'none' }}
              >
                <PokemonCard pokemon={pokemon} language={language} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------
 *  Définition des routes
 * ------------------------------------------------------------*/
function AppRoutes() {
  const [language] = useState('english');

  return (
    <Routes>
      {/* publique */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protégée */}
      <Route element={<ProtectedRoute />}>
        <Route index element={<PokemonListPage language={language} />} />
        <Route
          path="pokemon/:id"
          element={<PokemonDetailWrapper language={language} />}
        />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* --------------------------------------------------------------
 *  Composant racine exporté
 * ------------------------------------------------------------*/
export default function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}
