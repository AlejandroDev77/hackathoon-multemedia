import { useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useCollisionDetection } from '../../hooks/useCollisionDetection';
import { generateObstacles } from '../../utils/obstacleUtils';
import { GAME_CONFIG, WAYPOINTS } from '../../constants/gameConfig';
import { PlayerObject } from './PlayerObject';
import { Obstacle } from './Obstacle';
import { WaypointMarker } from './WaypointMarker';
import type { WaypointData } from '../../types/game.types';

export function GameCanvas() {
  const playerRef     = useRef<HTMLDivElement>(null);
  const obstacleRefs  = useRef<Map<string, HTMLElement>>(new Map());

  const gameState  = useGameStore((s) => s.gameState);
  const obstacles  = useGameStore((s) => s.obstacles);
  const setObstacles = useGameStore((s) => s.setObstacles);

  useGameLoop();
  useCollisionDetection({ playerRef, obstacleRefs });

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const generated = generateObstacles(window.innerWidth, window.innerHeight);
    setObstacles(generated);
  }, [gameState, setObstacles]);

  const setObstacleRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) obstacleRefs.current.set(id, el);
      else    obstacleRefs.current.delete(id);
    },
    []
  );

  const waypoints: WaypointData[] = [
    { id: 'A', position: { x: WAYPOINTS.A.x * window.innerWidth, y: WAYPOINTS.A.y * window.innerHeight } },
    { id: 'B', position: { x: WAYPOINTS.B.x * window.innerWidth, y: WAYPOINTS.B.y * window.innerHeight } },
  ];

  if (gameState === 'START' || gameState === 'GAMEOVER') return null;

  return (
    <div
      style={{
        position:   'fixed',
        inset:      0,
        overflow:   'hidden',
        cursor:     'none',
        perspective: `${GAME_CONFIG.PERSPECTIVE}px`,
        background: 'transparent',
      }}
    >
      <div
        style={{
          position:       'absolute',
          inset:          0,
          transformStyle: 'preserve-3d',
          transform:      `rotateX(0deg)`,
          transformOrigin: 'center center',
        }}
      >
        {waypoints.map((wp) => (
          <WaypointMarker key={wp.id} waypoint={wp} />
        ))}


        {obstacles.map((obs) => (
          <Obstacle
            key={obs.id}
            data={obs}
            ref={setObstacleRef(obs.id)}
          />
        ))}

        <PlayerObject ref={playerRef} />
      </div>
    </div>
  );
}
