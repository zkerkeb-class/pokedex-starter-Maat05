import { useState } from 'react'
import pokemons from './assets/pokemons'
import PokemonCard from './components/pokemonCard'
import './App.css'

function App() { 
  const [filterNom, setFilterNom] = useState("");
  const [filterType, setFilterType] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.french.toLowerCase().includes(filterNom.toLowerCase())
  );

  const filteredTypes = filteredPokemons.filter((pokemon) => 
    pokemon.type.some((type) => type.toLowerCase().includes(filterType.toLowerCase()))
  );

  return ( 
    <div className="app"> 
      <h1>Liste des Pokémons</h1> 
      
      <input 
        type="text" 
        placeholder="Filtrer par nom..." 
        value={filterNom} 
        onChange={(e) => setFilterNom(e.target.value)} 
      />
      
      <input 
        type="text" 
        placeholder="Filtrer par type..." 
        value={filterType} 
        onChange={(e) => setFilterType(e.target.value)} 
      />

      <div className="pokemon-list"> 
        {filteredTypes.map((pokemon, index) => ( 
          <PokemonCard 
            key={index} 
            name={pokemon.name.french} 
            types={pokemon.type} 
            image={pokemon.image} 
            attack={pokemon.base.Attack} 
            defense={pokemon.base.Defense} 
            hp={pokemon.base.HP} 
          /> 
        ))}
      </div>
    </div> 
  ); 
}

export default App;
