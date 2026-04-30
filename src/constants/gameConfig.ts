// src/constants/gameConfig.ts
// ─────────────────────────────────────────────
// Centraliza todos los parámetros del juego.
// Cambiar un valor aquí afecta todo el sistema.
// ─────────────────────────────────────────────

export const GAME_CONFIG = {
  OBSTACLE_COUNT:      8,
  OBSTACLE_SPEED_MIN:  1.5,
  OBSTACLE_SPEED_MAX:  4.0,
  PLAYER_SIZE:         52,
  OBSTACLE_SIZE_MIN:   40,
  OBSTACLE_SIZE_MAX:   80,
  COOLDOWN_DURATION_MS: 1500,
  BOUNCE_DURATION_MS:  400,
  WAYPOINT_RADIUS:     44,
  PERSPECTIVE:         900,
  ARENA_TILT_X:        18,
} as const;

export const GAME_STATES = {
  START:    'START',
  PLAYING:  'PLAYING',
  GAMEOVER: 'GAMEOVER',
} as const;

// Posiciones fijas de los waypoints (porcentaje del viewport)
export const WAYPOINTS = {
  A: { x: 0.12, y: 0.80 },   // abajo-izquierda
  B: { x: 0.85, y: 0.18 },   // arriba-derecha
} as const;
