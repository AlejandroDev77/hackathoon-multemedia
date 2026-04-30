import { useGameStore } from '../../store/useGameStore';
import { CollisionCounter } from './CollisionCounter';
import { TimerDisplay } from './TimerDisplay';

export function HUD() {
  const gameState  = useGameStore((s) => s.gameState);
  const cooldown   = useGameStore((s) => s.cooldown.active);

  if (gameState !== 'PLAYING') return null;

  return (
    <div
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         100,
        display:        'flex',
        justifyContent: 'center',
        gap:            64,
        alignItems:     'flex-end',
        padding:        '16px 32px',
        background:     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        pointerEvents:  'none',
      }}
    >
      <CollisionCounter />

      <div style={{
        width:      1,
        height:     48,
        background: 'rgba(255,255,255,0.15)',
        alignSelf:  'center',
      }} />

      <TimerDisplay />

      {cooldown && (
        <div style={{
          position:     'absolute',
          bottom:       8,
          left:         '50%',
          transform:    'translateX(-50%)',
          fontSize:     11,
          letterSpacing: '0.14em',
          color:        '#ff7675',
          textTransform: 'uppercase',
          fontFamily:   'monospace',
          animation:    'blink 0.5s step-start infinite',
        }}>
          ● Invulnerable
        </div>
      )}
    </div>
  );
}
