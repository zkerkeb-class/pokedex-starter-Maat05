import { useEffect, useState } from 'react'
import pokemons from './assets/pokemons'
import PokemonCard from './components/pokemonCard'
import SearchBar from './components/searchBar'
import './App.css'


function App() {
  const [search, setSearch] = useState("")
  const [types, setTypes] = useState([])

  useEffect(() => {
    console.log(search)
    console.log('types', types)
  }, [search, types])

  return (
    <div className="app-container">
      <SearchBar types={types} setTypes={setTypes} search={search} setSearch={setSearch}/>

    <div className="pokemon-list">
      {pokemons.map((pokemon) => {
        const isTypeIncluded = types.length === 0 || types.every(type => pokemon.type.includes(type))
        const isNameIncluded = search === "" || pokemon.name.french.toLowerCase().includes(search.toLowerCase())

        if(!isNameIncluded || !isTypeIncluded){
          return null
        }
        
        return (
          <div key={pokemon.id} className="pokemon-card-container">
          <PokemonCard 
          name={pokemon.name.french} 
          types={pokemon.type} 
          image={pokemon.imageShiny}
          attack={pokemon.base.Attack}
          defense={pokemon.base.Defense}
          hp={pokemon.base.HP}
        />
        </div>
        )
      })}
    </div>
    </div>
  )
}

export default App