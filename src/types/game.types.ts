
export type GameState = 'START' | 'PLAYING' | 'GAMEOVER';

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  vx: number;
  vy: number;
}

export interface ObstacleData {
  id: string;
  position: Position;
  velocity: Velocity;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
}

export interface WaypointData {
  id: 'A' | 'B';
  position: Position;
}

export interface GameStats {
  collisionCount: number;
  elapsedMs: number;        
  startTimestamp: number | null;
  endTimestamp: number | null;
}

export interface CooldownState {
  active: boolean;
  remainingMs: number;
}

export interface GameStoreState {
  gameState: GameState;
  stats: GameStats;
  cooldown: CooldownState;
  obstacles: ObstacleData[];


  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  registerCollision: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  setObstacles: (obstacles: ObstacleData[]) => void;
  updateObstacle: (id: string, position: Position) => void;
  activateCooldown: () => void;
  deactivateCooldown: () => void;
}
