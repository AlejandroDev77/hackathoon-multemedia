// src/hooks/useMousePosition.ts
// ─────────────────────────────────────────────
// Rastrea la posición del cursor en tiempo real.
// Devuelve un ref (no state) para evitar re-renders
// en cada movimiento del mouse.
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import type { Position } from '../types/game.types';

export function useMousePosition(): React.RefObject<Position> {
  const positionRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return positionRef;
}
