// src/utils/collision.ts
// ─────────────────────────────────────────────
// Detección AABB usando getBoundingClientRect()
// ─────────────────────────────────────────────

import type { Position } from '../types/game.types';

/**
 * Comprueba si dos elementos del DOM se solapan (AABB).
 */
export function rectsCollide(
  refA: React.RefObject<HTMLElement | null>,
  refB: React.RefObject<HTMLElement | null>
): boolean {
  if (!refA.current || !refB.current) return false;

  const a = refA.current.getBoundingClientRect();
  const b = refB.current.getBoundingClientRect();

  return !(
    a.right  < b.left   ||
    a.left   > b.right  ||
    a.bottom < b.top    ||
    a.top    > b.bottom
  );
}

/**
 * Comprueba si el centro del jugador está dentro del radio del waypoint.
 */
export function isNearWaypoint(
  playerRef: React.RefObject<HTMLElement | null>,
  waypoint: Position,
  radius: number
): boolean {
  if (!playerRef.current) return false;

  const r = playerRef.current.getBoundingClientRect();
  const centerX = r.left + r.width  / 2;
  const centerY = r.top  + r.height / 2;

  const dx = centerX - waypoint.x;
  const dy = centerY - waypoint.y;

  return Math.sqrt(dx * dx + dy * dy) <= radius;
}
