
import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { tickObstacle } from '../utils/obstacleUtils';
import type { ObstacleData } from '../types/game.types';

export function useGameLoop(): void {
  const rafRef      = useRef<number | null>(null);
  const gameState   = useGameStore((s) => s.gameState);
  const setObstacles = useGameStore((s) => s.setObstacles);


  const obstaclesRef = useRef<ObstacleData[]>([]);
  useEffect(() => {
    return useGameStore.subscribe(
      (s) => s.obstacles,
      (obs) => { obstaclesRef.current = obs; }
    );
  }, []);

  useEffect(() => {
    if (gameState !== 'PLAYING') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const arenaWidth  = window.innerWidth;
    const arenaHeight = window.innerHeight;

    const loop = () => {
      const updated = obstaclesRef.current.map((obs) =>
        tickObstacle(obs, arenaWidth, arenaHeight)
      );
      setObstacles(updated);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState, setObstacles]);
}
