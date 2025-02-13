import { useState } from "react";
import pokemons from "./assets/pokemons";
import PokemonCard from "./components/pokemonCard";
import "./App.css";

function App() {
  const [filterNom, setFilterNom] = useState("");
  const [filterType, setFilterType] = useState("");
  const [shinyStates, setShinyStates] = useState({});

  // Get all unique Pokémon types
  const allTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.type))].sort();

  // Apply name filter
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.french.toLowerCase().includes(filterNom.toLowerCase())
  );

  // Apply type filter
  const finalFilteredPokemons = filterType
    ? filteredPokemons.filter((pokemon) => pokemon.type.includes(filterType))
    : filteredPokemons;

  // Toggle shiny state for a specific Pokémon
  const toggleShiny = (pokemonId) => {
    setShinyStates((prev) => ({
      ...prev,
      [pokemonId]: !prev[pokemonId], // Toggle between true/false
    }));
  };

  return (
    <div className="app">
      <h1>Liste des Pokémons</h1>

      {/* Name Filter */}
      <input
        type="text"
        placeholder="Filtrer par nom..."
        value={filterNom}
        onChange={(e) => setFilterNom(e.target.value)}
      />

      {/* Type Filter */}
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">Tous les types</option>
        {allTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className="pokemon-list">
        {finalFilteredPokemons.map((pokemon) => {
          const isShiny = shinyStates[pokemon.id] || false; // Default to normal form

          return (
            <div key={pokemon.id} className="pokemon-container">
              <PokemonCard
                name={pokemon.name.french}
                types={pokemon.type}
                image={isShiny ? pokemon.imageShiny : pokemon.image}
                attack={pokemon.base.Attack}
                defense={pokemon.base.Defense}
                hp={pokemon.base.HP}
              />
              <button onClick={() => toggleShiny(pokemon.id)}>
                {isShiny ? "Normal" : "Shiny"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
