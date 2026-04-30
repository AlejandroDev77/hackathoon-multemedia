// src/components/hud/TimerDisplay.tsx
// ─────────────────────────────────────────────
// CAPA DE PRESENTACIÓN — HUD
// Muestra el cronómetro A→B actualizado cada frame.
// ─────────────────────────────────────────────

import { useTimer } from '../../hooks/useTimer';
import { formatTime } from '../../utils/formatTime';
import { useGameStore } from '../../store/useGameStore';

export function TimerDisplay() {
  const elapsed     = useTimer();
  const startTimestamp = useGameStore((s) => s.stats.startTimestamp);
  const running     = startTimestamp !== null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
        Tiempo A → B
      </span>
      <span
        style={{
          fontSize:   28,
          fontWeight: 600,
          fontFamily: 'monospace',
          lineHeight: 1,
          color:      running ? '#4ecdc4' : 'rgba(255,255,255,0.35)',
          letterSpacing: '0.04em',
        }}
      >
        {formatTime(elapsed)}
      </span>
    </div>
  );
}
