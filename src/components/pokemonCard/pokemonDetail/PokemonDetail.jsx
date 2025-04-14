// /src/components/pokemonCard/pokemonDetail/PokemonDetail.jsx
import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import PokemonCard from "../index"; // ensure correct relative import
import "./PokemonDetail.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function PokemonDetail({ pokemon, comparePokemon, language = "english" }) {
  const [isShiny, setIsShiny] = useState(false);
  const navigate = useNavigate();

  if (!pokemon) {
    return <div>Loading details...</div>;
  }

  // Extract primary Pokémon stats.
  const { HP, Attack, Defense, Speed } = pokemon.base;
  const spAttack = pokemon.base["Sp. Attack"];
  const spDefense = pokemon.base["Sp. Defense"];

  // Primary dataset.
  const primaryDataset = {
    label: pokemon.name.english,
    data: [HP, Attack, Defense, spAttack, spDefense, Speed],
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 2,
  };

  // Build merged datasets.
  const datasets = [primaryDataset];
  if (comparePokemon) {
    const { HP: cHP, Attack: cAtk, Defense: cDef, Speed: cSpd } = comparePokemon.base;
    const cSpAttack = comparePokemon.base["Sp. Attack"];
    const cSpDefense = comparePokemon.base["Sp. Defense"];
    datasets.push({
      label: comparePokemon.name.english,
      data: [cHP, cAtk, cDef, cSpAttack, cSpDefense, cSpd],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    });
  }

  const data = {
    labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
    datasets,
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: "#ccc" },
        grid: { color: "#ccc" },
        pointLabels: { color: "#fff", font: { size: 14 } },
        suggestedMin: 0,
        suggestedMax: 150,
      },
    },
  };

  const handleCardClick = () => {
    setIsShiny(!isShiny);
  };

  // Button to trigger compare mode (navigate to list with state).
  const handleCompareButton = () => {
    navigate("/", { state: { primaryCompare: pokemon.id, language } });
  };

  return (
    <div className="pokemon-detail-container">
      {/* Left: primary Pokémon card toggles shiny on click */}
      <div className="pokemon-detail-card" onClick={handleCardClick}>
        <PokemonCard
          pokemon={pokemon}
          language={language}
          isShiny={isShiny}
        />
      </div>

      {/* Center: merged radar chart and primary Pokémon stats */}
      <div className="pokemon-detail-stats">
        <h2>{pokemon.name.english} - Detailed Stats</h2>
        <div className="chart-container">
          <Radar data={data} options={options} />
        </div>
        <div className="pokemon-extra-details">
          <p><strong>Types:</strong> {pokemon.type.join(", ")}</p>
          <p><strong>HP:</strong> {HP}</p>
          <p><strong>Attack:</strong> {Attack}</p>
          <p><strong>Defense:</strong> {Defense}</p>
          <p><strong>Sp. Attack:</strong> {spAttack}</p>
          <p><strong>Sp. Defense:</strong> {spDefense}</p>
          <p><strong>Speed:</strong> {Speed}</p>
        </div>
      </div>

      {/* Right: compare section */}
      <div className="pokemon-compare-section">
        {comparePokemon ? (
          <div className="compare-card">
            <h3>Compared Pokémon</h3>
            <PokemonCard pokemon={comparePokemon} language={language} />
          </div>
        ) : (
          <button className="compare-button" onClick={handleCompareButton}>
            Compare Stats
          </button>
        )}
      </div>
    </div>
  );
}

function PokemonDetailCard({
  pokemon,
  language,
  isShiny = false,
  onCardClick,
  title,
}) {
  if (!pokemon) {
    // If there's no Pokémon data, show a placeholder
    return <div className="pokemon-detail-card empty-card">No Pokémon</div>;
  }

  const baseStats = pokemon.base;
  const spAttack = baseStats["Sp. Attack"];
  const spDefense = baseStats["Sp. Defense"];

  return (
    <div className="pokemon-detail-card" onClick={onCardClick}>
      {title && <h3 className="detail-card-title">{title}</h3>}
      <PokemonCard
        pokemon={pokemon}
        language={language}
        isShiny={isShiny}
        // We do not pass onCardClick here, because we capture click in the parent div
      />
      <div className="detail-card-stats">
        <p><strong>HP:</strong> {baseStats.HP}</p>
        <p><strong>Attack:</strong> {baseStats.Attack}</p>
        <p><strong>Defense:</strong> {baseStats.Defense}</p>
        <p><strong>Sp. Attack:</strong> {spAttack}</p>
        <p><strong>Sp. Defense:</strong> {spDefense}</p>
        <p><strong>Speed:</strong> {baseStats.Speed}</p>
      </div>
    </div>
  );
}
export default PokemonDetail;
