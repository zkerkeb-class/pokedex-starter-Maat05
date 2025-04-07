import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/pokemons')
      .then(res => {
        console.log("Le résultat est :", res.data);
        setPokemons(res.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []); // Le tableau vide signifie que ça s'exécute une seule fois après le montage.

  return (
    <ul>
      {pokemons.map(pokemon => (
        <li key={pokemon.id}>{pokemon.name}</li>
      ))}
    </ul>
  );
};

export default PersonList;

// getAllPokemons(){
    
// }
// getPokemonById(id);
// createPokemon(data);
// updatePokemon(id, data);
// deletePokemon(id);