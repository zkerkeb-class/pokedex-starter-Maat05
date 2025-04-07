import { useEffect, useState } from 'react'
import pokemons from './assets/pokemons'
import PokemonCard from './components/pokemonCard'
import SearchBar from './components/searchBar'
import './App.css'
import axios from 'axios';
// import PersonList from '../services/api';

// function App() {
//   return (
//     <div ClassName="App">
//       <PersonList/>
//     </div>
//   )
// }


function App() { const [search, setSearch] = useState("")
const [types, setTypes] = useState([])
const [pokemonList, setPokemonList] = useState([])
console.log("test");
const [shinyStates, setShinyStates] = useState({})
useEffect(() => {
  axios
    .get("http://localhost:3000/api/pokemons")
    .then((response) => {
      console.log(response.data.pokemons)
      setPokemonList(response.data.pokemons);
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des Pokémon :", err);
    });
  }, []);
const toggleShiny = (id) => { setShinyStates((prev) => ({ ...prev, [id]: !prev[id] })) }
console.log(pokemonList)
useEffect(() => { console.log(search)
  
console.log(pokemonList)
console.log('types', types) }, [search, types])

return ( <div className="app-container"> <SearchBar types={types} setTypes={setTypes} search={search} setSearch={setSearch} />

  <div className="pokemon-list">
    {pokemons.map((pokemon) => {
      const isTypeIncluded =
        types.length === 0 || types.every((type) => pokemon.type.includes(type))
      const isNameIncluded =
        search === "" || pokemon.name.french.toLowerCase().includes(search.toLowerCase())

      if (!isNameIncluded || !isTypeIncluded) {
        return null
      }

      const isShiny = shinyStates[pokemon.id] || false
      const currentImage = isShiny ? pokemon.imageShiny : pokemon.image

      return (
        <div
          key={pokemon.id}
          className="pokemon-card-container"
          onClick={() => toggleShiny(pokemon.id)}
        >
          <PokemonCard
            name={pokemon.name.french}
            types={pokemon.type}
            image={currentImage}
            attack={pokemon.base.Attack}
            defense={pokemon.base.Defense}
            hp={pokemon.base.HP}
          />
        </div>
      )
    })}
  </div>
</div>

) }

export default App