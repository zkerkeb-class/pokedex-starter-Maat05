// src/components/pokemonCard/index.jsx
import React from "react";

const IMAGE_HOST = "192.168.56.1";
const IMAGE_PORT = "3000";

export default function PokemonCard({ pokemon, language = "english", onCardClick, isShiny }) {
  // Résolution du nom à afficher
  let displayName = "";
  if (pokemon.name) {
    if (typeof pokemon.name === "object") {
      displayName = pokemon.name[language] || pokemon.name.english || "";
    } else {
      displayName = pokemon.name;
    }
  }

  // Construction de l'URL de l'image
  let imageUrl = isShiny
    ? pokemon.image.replace("/pokemons/", "/pokemons/shiny/")
    : pokemon.image;
  imageUrl = imageUrl.replace(
    /https?:\/\/localhost(:\d+)?/,
    `http://${IMAGE_HOST}:${IMAGE_PORT}`
  );

  // Type primaire pour le style
  const primaryType =
    pokemon.type && pokemon.type.length > 0
      ? pokemon.type[0].charAt(0).toUpperCase() + pokemon.type[0].slice(1).toLowerCase()
      : "Normal";

  return (
    <div
      className={`pokemon-card type-${primaryType}`}
      onClick={onCardClick}
    >
      <div className="pokemon-name-container">
        <h3 className="pokemon-name">{displayName}</h3>
      </div>

      <img
        className="pokemon-image"
        src={imageUrl}
        alt={displayName}
      />

      <div className="pokemon-types-container">
        {pokemon.type.map((t) => {
          const formatted = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
          return (
            <span key={t} className={`pokemon-type type-${formatted}`}>
              {formatted}
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
}
