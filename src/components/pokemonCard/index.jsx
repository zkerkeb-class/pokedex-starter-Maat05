import { useState, useEffect } from "react";
import "./index.css";
const PokemonCard = ({ name, types, image, attack, defense, hp }) => {
  const [currentHP, setCurrentHP] = useState(hp);

  useEffect(() => {
    // alert("le combat commence")
  }, []);

  useEffect(() => {
    console.log("currentHP useEffect", currentHP);
    if (currentHP <= 0) {
      alert("bulbizarre est mort");
    }
  }, [currentHP]);

  const handleAttack = () => {
    console.log("bulbizarre ce mange une patate");
    setCurrentHP(currentHP - 10);
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-name-container">
        <span className="pokemon-name">{name}</span>
      </div>
      <img className="pokemon-image" src={image} alt={name} />
      <div className="pokemon-types-container">
        {types.map((type) => {
          return <span key={type}>{type}</span>;
        })}
      </div>
      <div className="pokemon-stats-container">
        <span>Attack: {attack}</span>
        <span>Defense: {defense}</span>
        <span>HP: {currentHP}</span>
      </div>
      {/* <button onClick={handleAttack}>Attack</button> */}
    </div>
  );
};

export default PokemonCard;