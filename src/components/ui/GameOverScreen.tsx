import { useGameStore } from '../../store/useGameStore';
import { formatTime } from '../../utils/formatTime';

export function GameOverScreen() {
  const gameState = useGameStore((s) => s.gameState);
  const stats     = useGameStore((s) => s.stats);
  const resetGame = useGameStore((s) => s.resetGame);

  if (gameState !== 'GAMEOVER') return null;

  const rating =
    stats.collisionCount === 0 ? '★★★ Perfecto'  :
    stats.collisionCount <= 3  ? '★★☆ Buen trabajo' :
                                 '★☆☆ A practicar';

  return (
    <div style={{
      position:       'fixed',
      inset:          0,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      background:     'radial-gradient(ellipse at center, #0d1b2a 0%, #050a0f 100%)',
      gap:            20,
      zIndex:         200,
    }}>
      <h2 style={{
        fontFamily:    'monospace',
        fontSize:      48,
        fontWeight:    700,
        color:         '#f9ca24',
        margin:        0,
        letterSpacing: '-0.02em',
      }}>
        ¡Llegaste!
      </h2>

      <p style={{
        fontFamily: 'monospace',
        fontSize:   22,
        color:      'rgba(255,255,255,0.7)',
        margin:     0,
      }}>
        {rating}
      </p>

      {/* Stats */}
      <div style={{
        display:        'flex',
        gap:            48,
        marginTop:      8,
        padding:        '24px 48px',
        border:         '1px solid rgba(255,255,255,0.1)',
        borderRadius:   12,
        background:     'rgba(255,255,255,0.04)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Golpes
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 42, fontWeight: 700, color: stats.collisionCount > 0 ? '#ff7675' : '#4ecdc4' }}>
            {String(stats.collisionCount).padStart(2, '0')}
          </div>
        </div>

        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Tiempo A → B
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 32, fontWeight: 600, color: '#4ecdc4', letterSpacing: '0.04em' }}>
            {formatTime(stats.elapsedMs)}
          </div>
        </div>
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop:     16,
          padding:       '12px 40px',
          fontSize:      16,
          fontFamily:    'monospace',
          fontWeight:    700,
          letterSpacing: '0.08em',
          background:    'transparent',
          color:         '#f9ca24',
          border:        '2px solid #f9ca24',
          borderRadius:  8,
          cursor:        'pointer',
          transition:    'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = '#f9ca24';
          (e.target as HTMLButtonElement).style.color      = '#050a0f';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = 'transparent';
          (e.target as HTMLButtonElement).style.color      = '#f9ca24';
        }}
      >
        JUGAR DE NUEVO
      </button>
    </div>
  );
}
