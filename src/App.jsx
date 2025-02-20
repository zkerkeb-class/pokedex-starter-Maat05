import { useState } from "react";
import pokemons from "./assets/pokemons";
import PokemonCard from "./components/pokemonCard";
import "./App.css";

function App() {
  const [filterNom, setFilterNom] = useState("");
  const [filterType, setFilterType] = useState("");
  const [shinyStates, setShinyStates] = useState({});

  const allTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.type))].sort();

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.french.toLowerCase().includes(filterNom.toLowerCase())
  );

  const finalFilteredPokemons = filterType
    ? filteredPokemons.filter((pokemon) => pokemon.type.includes(filterType))
    : filteredPokemons;

  const toggleShiny = (pokemonId) => {
    setShinyStates((prev) => ({
      ...prev,
      [pokemonId]: !prev[pokemonId],
    }));
  };

  return (
    <div className="app">
      <h1>Liste des Pokémons</h1>

      <input
        type="text"
        placeholder="Filtrer par nom..."
        value={filterNom}
        onChange={(e) => setFilterNom(e.target.value)}
      />

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
          const isShiny = shinyStates[pokemon.id] || false;

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
                {isShiny ? "Shiny" : "Normal"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App