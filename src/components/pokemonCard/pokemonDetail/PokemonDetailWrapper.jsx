// src/components/pokemonCard/pokemonDetail/PokemonDetailWrapper.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../../../services/api';
import PokemonDetail from './PokemonDetail';

export default function PokemonDetailWrapper({ language }) {
  const { id } = useParams();
  const location = useLocation();
  const compareId = location.state?.compareId || null;

  const [primaryPokemon, setPrimaryPokemon] = useState(null);
  const [comparePokemon, setComparePokemon] = useState(null);

  useEffect(() => {
    api
      .get(`/pokemons/${id}`)
      .then((res) => setPrimaryPokemon(res.data))
      .catch((err) => console.error('Error fetching primary Pokémon:', err));
  }, [id]);

  useEffect(() => {
    if (compareId) {
      api
        .get(`/pokemons/${compareId}`)
        .then((res) => setComparePokemon(res.data))
        .catch((err) => console.error('Error fetching compare Pokémon:', err));
    } else {
      setComparePokemon(null);
    }
  }, [compareId]);

  if (!primaryPokemon) {
    return <div>Loading details...</div>;
  }

  return (
    <PokemonDetail
      pokemon={primaryPokemon}
      comparePokemon={comparePokemon}
      language={language}
    />
  );
}
