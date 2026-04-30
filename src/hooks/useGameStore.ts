// src/store/useGameStore.ts
// ─────────────────────────────────────────────
// CAPA DE ESTADO — Zustand store global
// Toda la lógica de estado pasa por aquí.
// Los componentes sólo leen y llaman acciones.
// ─────────────────────────────────────────────

import { create } from 'zustand';
import { GAME_CONFIG } from '../constants/gameConfig';
import type {
  GameStoreState,
  GameState,
  ObstacleData,
  GameStats,
  CooldownState,
} from '../types/game.types';

const INITIAL_STATS: GameStats = {
  collisionCount:  0,
  elapsedMs:       0,
  startTimestamp:  null,
  endTimestamp:    null,
};

const INITIAL_COOLDOWN: CooldownState = {
  active:      false,
  remainingMs: 0,
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  // ── Estado inicial ──────────────────────────
  gameState: 'START' as GameState,
  stats:     INITIAL_STATS,
  cooldown:  INITIAL_COOLDOWN,
  obstacles: [],

  // ── Ciclo de partida ─────────────────────────
  startGame: () =>
    set({
      gameState: 'PLAYING',
      stats:     INITIAL_STATS,
      cooldown:  INITIAL_COOLDOWN,
    }),

  endGame: () => {
    const { stats } = get();
    const endTimestamp = Date.now();
    const elapsedMs = stats.startTimestamp
      ? endTimestamp - stats.startTimestamp
      : 0;
    set({
      gameState: 'GAMEOVER',
      stats: { ...stats, endTimestamp, elapsedMs },
    });
  },

  resetGame: () =>
    set({
      gameState: 'START',
      stats:     INITIAL_STATS,
      cooldown:  INITIAL_COOLDOWN,
      obstacles: [],
    }),

  // ── Colisiones ───────────────────────────────
  registerCollision: () => {
    const { cooldown, stats } = get();
    if (cooldown.active) return; // invulnerable → ignorar

    set({
      stats:    { ...stats, collisionCount: stats.collisionCount + 1 },
      cooldown: { active: true, remainingMs: GAME_CONFIG.COOLDOWN_DURATION_MS },
    });
  },

  activateCooldown: () =>
    set({ cooldown: { active: true, remainingMs: GAME_CONFIG.COOLDOWN_DURATION_MS } }),

  deactivateCooldown: () =>
    set({ cooldown: { active: false, remainingMs: 0 } }),

  // ── Cronómetro A → B ─────────────────────────
  startTimer: () => {
    const { stats } = get();
    if (stats.startTimestamp !== null) return; // ya inició
    set({ stats: { ...stats, startTimestamp: Date.now() } });
  },

  stopTimer: () => {
    const { stats } = get();
    if (!stats.startTimestamp) return;
    const endTimestamp = Date.now();
    set({
      stats: {
        ...stats,
        endTimestamp,
        elapsedMs: endTimestamp - stats.startTimestamp,
      },
    });
  },

  // ── Obstáculos ───────────────────────────────
  setObstacles: (obstacles: ObstacleData[]) => set({ obstacles }),

  updateObstacle: (id: string, position) =>
    set((state) => ({
      obstacles: state.obstacles.map((o) =>
        o.id === id ? { ...o, position } : o
      ),
    })),
}));
