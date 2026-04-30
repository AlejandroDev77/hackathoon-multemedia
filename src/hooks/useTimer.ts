// src/hooks/useTimer.ts
// ─────────────────────────────────────────────
// Expone el tiempo transcurrido en vivo (ms)
// para que TimerDisplay pueda actualizarlo cada frame.
// ─────────────────────────────────────────────

import { useEffect, useState, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useTimer(): number {
  const startTimestamp = useGameStore((s) => s.stats.startTimestamp);
  const endTimestamp   = useGameStore((s) => s.stats.endTimestamp);
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Si ya tiene fin, mostrar el valor final fijo
    if (endTimestamp !== null && startTimestamp !== null) {
      setElapsed(endTimestamp - startTimestamp);
      return;
    }

    // Si aún no empezó, mostrar cero
    if (startTimestamp === null) {
      setElapsed(0);
      return;
    }

    // Actualizar cada frame mientras corre
    const tick = () => {
      setElapsed(Date.now() - startTimestamp);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startTimestamp, endTimestamp]);

  return elapsed;
}
