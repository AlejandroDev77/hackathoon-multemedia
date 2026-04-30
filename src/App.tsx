// src/App.tsx
// ─────────────────────────────────────────────
// Máquina de estados principal:
//   START → PLAYING → GAMEOVER → START
//
// Monta todas las capas en orden:
//   1. Background visual (arena grid)
//   2. GameCanvas  (lógica + presentación del juego)
//   3. HUD         (contadores superpuestos)
//   4. StartScreen / GameOverScreen (UI de flujo)
// ─────────────────────────────────────────────

import './styles/game.css';
import { GameCanvas }     from './components/game/GameCanvas';
import { HUD }            from './components/hud/HUD';
import { StartScreen }    from './components/ui/StartScreen';
import { GameOverScreen } from './components/ui/GameOverScreen';
import { useGameStore }   from './store/useGameStore';

export default function App() {
  const gameState = useGameStore((s) => s.gameState);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>

      {/* Fondo: grid perspectivo siempre visible */}
      <div className="arena-grid" />

      {/* Juego activo */}
      {gameState === 'PLAYING' && (
        <>
          <GameCanvas />
          <HUD />
        </>
      )}

      {/* Pantallas de flujo */}
      <StartScreen />
      <GameOverScreen />

    </div>
  );
}
