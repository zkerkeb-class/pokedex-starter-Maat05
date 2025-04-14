import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const PokemonCard = ({ pokemon, language, onCardClick, isShiny }) => {
  // Calculate the primary type (first type in the array) and format it.
  let primaryType = "Normal";
  if (pokemon.type && pokemon.type.length > 0) {
    primaryType =
      pokemon.type[0].charAt(0).toUpperCase() +
      pokemon.type[0].slice(1).toLowerCase();
  }

  // Use the language prop to pick the appropriate name.
  const displayName =
    typeof pokemon.name === "object"
      ? pokemon.name[language] || pokemon.name.english
      : pokemon.name;

  // Use a shiny image if isShiny is true.
  const imageUrl = isShiny
    ? pokemon.image.replace("/pokemons/", "/pokemons/shiny/")
    : pokemon.image;

  return (
    <div
      className={`pokemon-card type-${primaryType}`}
      onClick={() => {
        if (onCardClick) onCardClick();
      }}
    >
      <div className="pokemon-name-container">
        <span className="pokemon-name">{displayName}</span>
      </div>
      <img className="pokemon-image" src={imageUrl} alt={displayName} />
      <div className="pokemon-types-container">
        {pokemon.type.map((type) => {
          const formattedType =
            type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
          return (
            <span key={type} className={`pokemon-type type-${formattedType}`}>
              {formattedType}
            </span>
          );
        })}
      </div>
      <div className="pokemon-stats-container">
        <span>Attack: {pokemon.base.Attack}</span>
        <span>Defense: {pokemon.base.Defense}</span>
        <span>HP: {pokemon.base.HP}</span>
      </div>
    </div>
  );
};

export default PokemonCard;
