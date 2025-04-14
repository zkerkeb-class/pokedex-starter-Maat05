// /src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/searchbar"; // your search/type filter component
import PokemonCard from "./components/pokemonCard"; // your card component (unchanged except for onCardClick support)
import PokemonDetailWrapper from "./components/pokemonCard/pokemonDetail/PokemonDetailWrapper";
import "./App.css";

// The Pokémon List Page
const PokemonListPage = ({ language }) => {
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // If compare mode is active, location.state will contain a property "primaryCompare"
  const compareMode = location.state?.primaryCompare;

  useEffect(() => {
    axios
      .get("http://192.168.1.132:3000/api/pokemons")
      .then((response) => setPokemons(response.data))
      .catch((err) => console.error("Error fetching pokemons:", err));
  }, []);

  return (
    <div className="app-container">
      <div className="language-selector">
        <label htmlFor="language">Select Language: </label>
        <select
          name="language"
          value={language}
          onChange={(e) => {
            // For simplicity, you could manage language globally.
            // Here we simply refresh the component.
            navigate(location.pathname, { replace: true, state: { ...location.state, language: e.target.value } });
          }}
        >
          <option value="english">English</option>
          <option value="french">Français</option>
          <option value="japanese">日本語</option>
          <option value="chinese">中文</option>
        </select>
      </div>

      <SearchBar search={search} setSearch={setSearch} types={types} setTypes={setTypes} />

      <div className="pokemon-list">
  {pokemons
    .filter((pokemon) => {
      const searchLower = search.toLowerCase();
      const nameMatch =
        search === "" ||
        (pokemon.name.english &&
          pokemon.name.english.toLowerCase().includes(searchLower)) ||
        (pokemon.name.french &&
          pokemon.name.french.toLowerCase().includes(searchLower));
      const typeMatch =
        types.length === 0 ||
        types.every((selectedType) => pokemon.type.includes(selectedType));
      return nameMatch && typeMatch;
    })
    .map((pokemon) => {
      const locationState = location.state || {};
      const compareMode = !!locationState.primaryCompare; // if present, compare mode is active

      if (compareMode) {
        // In compare mode, hovering over a card should update the compareId dynamically.
        return (
          <div
            key={pokemon.id}
            onClick={() =>
              navigate(`/pokemon/${locationState.primaryCompare}`, {
                state: {
                  primaryCompare: locationState.primaryCompare,
                  compareId: pokemon.id,
                  language,
                },
              })
            }
            style={{ cursor: "pointer" }}
          >
            <PokemonCard
              pokemon={pokemon}
              language={language}
            />
          </div>
        );
      } else {
        // Normal mode: clicking navigates directly to the card’s own detail page.
        return (
          <Link
            to={{
              pathname: `/pokemon/${pokemon.id}`,
              state: { language },
            }}
            key={pokemon.id}
            style={{ textDecoration: "none" }}
          >
            <PokemonCard
              pokemon={pokemon}
              language={language}
            />
          </Link>
        );
      }
    })}
</div>
    </div>
  );
};

const AppRoutes = () => {
  // Manage language state here (could also use context)
  const [language, setLanguage] = useState("english");
  return (
    <Routes>
      <Route path="/" element={<PokemonListPage language={language} setLanguage={setLanguage} />} />
      <Route path="/pokemon/:id" element={<PokemonDetailWrapper language={language} />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
