import { useState } from 'react'
import pokemons from './assets/pokemons'
import PokemonCard from './components/pokemonCard'
import './App.css'

function App() { 
  const [filter, setFilter] = useState("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.french.toLowerCase().includes(filter.toLowerCase())
  );

  return ( 
    <div className="app"> 
      <h1>Liste des Pokémons</h1> 
      <input 
        type="text" 
        placeholder="Filtrer par nom..." 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      /> 
      <div className="pokemon-list"> 
        {filteredPokemons.map((pokemon, index) => ( 
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
