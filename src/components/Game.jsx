// src/components/Game.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import api from "../services/api";
import bgImage from "../assets/background.png";
import "./Game.css";

export default function Game() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const player = state?.player;
  if (!player) return <Navigate to="/" replace />;

  const { width, height } = useWindowSize();

  // XP / Level
  const [xp, setXp] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [xpToNext, setXpToNext] = useState(100);
  const [showConfetti, setShowConfetti] = useState(false);

  // Enemies & Shots
  const [enemies, setEnemies] = useState([]);
  const [shots, setShots] = useState([]);
  const spawnInterval = useRef(null);
  const animationFrame = useRef(null);
  const lastTimeRef = useRef(0); // throttle reference

  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const spawnEnemy = async () => {
    try {
      const id = randInt(1, 151);
      const res = await api.get(`/pokemons/${id}`);
      const pokemon = res.data;
      const size = 250;
      const x = randInt(0, window.innerWidth - size);
      const y = randInt(0, window.innerHeight - size);
      const vx = (Math.random() - 0.5) * 2;
      const vy = (Math.random() - 0.5) * 2;
      const isShiny = Math.random() < 0.1;
      setEnemies((prev) => [
        ...prev,
        { uid: Date.now() + Math.random(), pokemon, x, y, vx, vy, size, isShiny },
      ]);
    } catch {
      // ignore spawn errors
    }
  };

  const updatePositions = (t) => {
    // throttle to ~10fps (every 100ms)
    if (t - lastTimeRef.current > 100) {
      setEnemies((prev) =>
        prev.map((e) => {
          let nx = e.x + e.vx;
          let ny = e.y + e.vy;
          if (nx < 0 || nx > window.innerWidth - e.size) e.vx *= -1;
          if (ny < 0 || ny > window.innerHeight - e.size) e.vy *= -1;
          nx = Math.max(0, Math.min(nx, window.innerWidth - e.size));
          ny = Math.max(0, Math.min(ny, window.innerHeight - e.size));
          return { ...e, x: nx, y: ny };
        })
      );
      lastTimeRef.current = t;
    }
    animationFrame.current = requestAnimationFrame(updatePositions);
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  useEffect(() => {
    const base = 2000;
    const delay = Math.max(base - (playerLevel - 1) * 150, 400);
    clearInterval(spawnInterval.current);
    spawnInterval.current = setInterval(spawnEnemy, delay);
    return () => clearInterval(spawnInterval.current);
  }, [playerLevel]);

  const gainXp = (amount) => {
    setXp((oldXp) => {
      let total = oldXp + amount;
      let lvl = playerLevel;
      let nextReq = xpToNext;
      while (total >= nextReq) {
        total -= nextReq;
        lvl++;
        nextReq = lvl * 100;
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
      setPlayerLevel(lvl);
      setXpToNext(nextReq);
      return total;
    });
  };

  const handleHit = (ev, uid) => {
    const enemy = enemies.find((e) => e.uid === uid);
    // spawn a projectile
    const projImg = `/assets/projectiles/${player.type[0].toLowerCase()}.png`;
    const projId = Date.now();
    setShots((prev) => [
      ...prev,
      { uid: projId, img: projImg, x: ev.clientX - 16, y: ev.clientY - 16 },
    ]);
    setTimeout(
      () => setShots((prev) => prev.filter((s) => s.uid !== projId)),
      500
    );
    // remove enemy & award XP
    setEnemies((prev) => prev.filter((e) => e.uid !== uid));
    gainXp(enemy?.isShiny ? 20 : 10);
  };

  return (
    <div className="game-container">
      {showConfetti && <Confetti width={width} height={height} />}
      <button className="game-exit" onClick={() => navigate("/")}>
        ← Exit Game
      </button>
      <img src={bgImage} alt="Background" className="game-bg" />
      <div className="game-info">
        {player.name.english || player.name}: XP {xp}/{xpToNext} | Lvl {playerLevel}
      </div>
      <div className="xp-bar-container">
        <div
          className="xp-bar"
          style={{ width: `${Math.min((xp / xpToNext) * 100, 100)}%` }}
        />
      </div>

      {shots.map((s) => (
        <img
          key={s.uid}
          src={s.img}
          className="shot"
          style={{ left: s.x, top: s.y }}
        />
      ))}

      {enemies.map((e) => {
        const src = e.isShiny
          ? `http://192.168.56.1:3000/assets/pokemons/shiny/${e.pokemon.id}.png`
          : `http://192.168.56.1:3000/assets/pokemons/${e.pokemon.id}.png`;
        return (
          <img
            key={e.uid}
            src={src}
            alt={e.pokemon.name.english}
            className="enemy"
            style={{ left: e.x, top: e.y, width: e.size, height: e.size }}
            onClick={(ev) => handleHit(ev, e.uid)}
          />
        );
      })}
    </div>
  );
}
