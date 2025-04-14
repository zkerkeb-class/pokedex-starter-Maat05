import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";

function PokemonDetailWrapper({ language }) {
  const { id } = useParams(); // primary Pokémon id from the URL
  const location = useLocation();
  const compareIdFromState = location.state?.compareId || null;
  
  const [primaryPokemon, setPrimaryPokemon] = useState(null);
  const [comparePokemon, setComparePokemon] = useState(null);

  useEffect(() => {
    axios
      .get(`http://192.168.1.132:3000/api/pokemons/${id}`)
      .then((res) => setPrimaryPokemon(res.data))
      .catch((err) => console.error("Error fetching primary Pokémon:", err));
  }, [id]);

  useEffect(() => {
    if (compareIdFromState) {
      axios
        .get(`http://192.168.1.132:3000/api/pokemons/${compareIdFromState}`)
        .then((res) => setComparePokemon(res.data))
        .catch((err) =>
          console.error("Error fetching compare Pokémon:", err)
        );
    } else {
      setComparePokemon(null);
    }
  }, [compareIdFromState]);

  // Adding a key forces remounting if compareId changes.
  return (
    <PokemonDetail
      key={`${id}-${compareIdFromState || "none"}`}
      pokemon={primaryPokemon}
      comparePokemon={comparePokemon}
      language={language}
    />
  );
}

export default PokemonDetailWrapper;
