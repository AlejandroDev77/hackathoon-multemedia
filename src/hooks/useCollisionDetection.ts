// src/hooks/useCollisionDetection.ts
// ─────────────────────────────────────────────
// CAPA LÓGICA — Detecta colisiones cada frame
// entre el jugador y cada obstáculo del store.
// También detecta llegada al waypoint B.
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { rectsCollide, isNearWaypoint } from '../utils/colisiones';
import { GAME_CONFIG, WAYPOINTS } from '../constants/gameConfig';

interface UseCollisionDetectionParams {
  playerRef: React.RefObject<HTMLElement | null>;
  obstacleRefs: React.MutableRefObject<Map<string, HTMLElement>>;
}

export function useCollisionDetection({
  playerRef,
  obstacleRefs,
}: UseCollisionDetectionParams): void {
  const rafRef           = useRef<number | null>(null);
  const gameState        = useGameStore((s) => s.gameState);
  const cooldownActive   = useGameStore((s) => s.cooldown.active);
  const registerCollision = useGameStore((s) => s.registerCollision);
  const endGame           = useGameStore((s) => s.endGame);
  const startTimer        = useGameStore((s) => s.startTimer);
  const obstacles         = useGameStore((s) => s.obstacles);

  // Guardar en ref para leer en el loop sin re-crear el efecto
  const cooldownRef  = useRef(cooldownActive);
  const obstaclesRef = useRef(obstacles);

  useEffect(() => { cooldownRef.current  = cooldownActive; }, [cooldownActive]);
  useEffect(() => { obstaclesRef.current = obstacles;      }, [obstacles]);

  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    // Calcular posición absoluta de los waypoints al inicio
    const waypointA: { x: number; y: number } = {
      x: WAYPOINTS.A.x * window.innerWidth,
      y: WAYPOINTS.A.y * window.innerHeight,
    };
    const waypointB: { x: number; y: number } = {
      x: WAYPOINTS.B.x * window.innerWidth,
      y: WAYPOINTS.B.y * window.innerHeight,
    };

    let timerStarted = false;

    const check = () => {
      if (!playerRef.current) {
        rafRef.current = requestAnimationFrame(check);
        return;
      }

      // ── Detección waypoint A (inicia cronómetro) ──
      if (
        !timerStarted &&
        isNearWaypoint(playerRef, waypointA, GAME_CONFIG.WAYPOINT_RADIUS)
      ) {
        timerStarted = true;
        startTimer();
      }

      // ── Detección waypoint B (termina partida) ────
      if (isNearWaypoint(playerRef, waypointB, GAME_CONFIG.WAYPOINT_RADIUS)) {
        endGame();
        return;
      }

      // ── Colisión con obstáculos ───────────────────
      if (!cooldownRef.current) {
        for (const obs of obstaclesRef.current) {
          const obstacleEl = obstacleRefs.current.get(obs.id);
          if (!obstacleEl) continue;

          const fakeRef = { current: obstacleEl };
          if (rectsCollide(playerRef, fakeRef)) {
            registerCollision();
            break; // Una colisión por frame es suficiente
          }
        }
      }

      rafRef.current = requestAnimationFrame(check);
    };

    rafRef.current = requestAnimationFrame(check);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState, playerRef, obstacleRefs, registerCollision, endGame, startTimer]);
}
