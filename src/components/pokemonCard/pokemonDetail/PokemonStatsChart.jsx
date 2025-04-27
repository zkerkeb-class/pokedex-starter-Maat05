// src/components/pokemonCard/pokemonDetail/PokemonStatsChart.jsx
import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

/**
 * Affiche un radar chart comparant les stats de deux Pokémon.
 * @param {{primary: object, compare?: object}} props
 */
export default function PokemonStatsChart({ primary, compare }) {
  // Prépare les données du radar
  const data = Object.entries(primary.base).map(([stat, value]) => ({
    stat,
    primary: value,
    compare: compare ? compare.base[stat] : 0,
  }));

  // Calcule la valeur max pour l'échelle
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.primary, d.compare])
  );

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis angle={30} domain={[0, maxValue]} />
          <Radar
            name={primary.name.english || primary.name}
            dataKey="primary"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          {compare && (
            <Radar
              name={compare.name.english || compare.name}
              dataKey="compare"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
          )}
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
