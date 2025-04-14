import React from 'react';
import './PokemonCard.css';

function PokemonCard({ pokemon, onToggleShiny, isShiny }) {
  // Vérifie que le tableau pokemon.type est bien défini et non vide
  const primaryType = (pokemon.type && pokemon.type.length > 0)
    ? pokemon.type[0].charAt(0).toUpperCase() + pokemon.type[0].slice(1).toLowerCase()
    : "Normal";

// console.log(primaryType);
console.log("test");
  // Construit l'URL de l'image selon l'état shiny
  const imageUrl = isShiny 
    ? pokemon.image.replace("/pokemons/", "/pokemons/shiny/") 
    : pokemon.image;

  return (
    <div className={`pokemon-card type-${primaryType}`} onClick={() => onToggleShiny(pokemon.id)}>
      <img className="pokemon-image" src={imageUrl} alt={pokemon.name.english} />
      <h2 className="pokemon-name">{pokemon.name.english}</h2>
      <ul className="pokemon-stats">
        <li>HP: {pokemon.base.HP}</li>
        <li>Attack: {pokemon.base.Attack}</li>
        <li>Defense: {pokemon.base.Defense}</li>
      </ul>
      <div className="pokemon-types">
        {pokemon.type.map((type) => {
          // Formatage de chaque type pour correspondre aux classes (première lettre en majuscule)
          const formattedType = primaryType.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
          return (
            <span key={type} className={`pokemon-type type-${formattedType}`}>
              {formattedType}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonCard;
