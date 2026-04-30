import { nanoid } from 'nanoid';
import { GAME_CONFIG } from '../constants/gameConfig';
import type { ObstacleData } from '../types/game.types';

const SHAPES: ObstacleData['shape'][] = ['circle', 'square', 'triangle'];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomSign(): number {
  return Math.random() > 0.5 ? 1 : -1;
}

export function generateObstacles(
  arenaWidth: number,
  arenaHeight: number
): ObstacleData[] {
  return Array.from({ length: GAME_CONFIG.OBSTACLE_COUNT }, (): ObstacleData => {
    const size = randomBetween(
      GAME_CONFIG.OBSTACLE_SIZE_MIN,
      GAME_CONFIG.OBSTACLE_SIZE_MAX
    );
    const speed = randomBetween(
      GAME_CONFIG.OBSTACLE_SPEED_MIN,
      GAME_CONFIG.OBSTACLE_SPEED_MAX
    );

    return {
      id:    nanoid(),
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size,
      position: {
        x: randomBetween(size, arenaWidth  - size),
        y: randomBetween(size, arenaHeight - size),
      },
      velocity: {
        vx: speed * randomSign(),
        vy: speed * randomSign(),
      },
    };
  });
}


export function tickObstacle(
  obs: ObstacleData,
  arenaWidth: number,
  arenaHeight: number
): ObstacleData {
  let { x, y } = obs.position;
  let { vx, vy } = obs.velocity;

  x += vx;
  y += vy;

  if (x <= 0 || x >= arenaWidth - obs.size) {
    vx = -vx;
    x  = Math.max(0, Math.min(x, arenaWidth - obs.size));
  }

  if (y <= 0 || y >= arenaHeight - obs.size) {
    vy = -vy;
    y  = Math.max(0, Math.min(y, arenaHeight - obs.size));
  }

  return { ...obs, position: { x, y }, velocity: { vx, vy } };
}
