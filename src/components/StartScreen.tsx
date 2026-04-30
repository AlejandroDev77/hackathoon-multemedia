// import { useGameStore } from '../../store/useGameStore';

export function StartScreen() {
  const gameState = useGameStore((s) => s.gameState);
  const startGame = useGameStore((s) => s.startGame);

  if (gameState !== 'START') return null;

  return (
    <div style={{
      position:       'fixed',
      inset:          0,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      background:     'radial-gradient(ellipse at center, #0d1b2a 0%, #050a0f 100%)',
      gap:            24,
      zIndex:         200,
    }}>
      <h1 style={{
        fontFamily:    'monospace',
        fontSize:      64,
        fontWeight:    700,
        color:         '#ffffff',
        letterSpacing: '-0.02em',
        margin:        0,
      }}>
        El <span style={{ color: '#4ecdc4' }}>Guardaespaldas</span>
      </h1>

      <p style={{
        fontFamily: 'monospace',
        fontSize:   16,
        color:      'rgba(255,255,255,0.5)',
        margin:     0,
        textAlign:  'center',
        maxWidth:   400,
        lineHeight: 1.6,
      }}>
        Mueve el objeto VIP del punto <span style={{ color: '#4ecdc4' }}>A</span> al punto{' '}
        <span style={{ color: '#f9ca24' }}>B</span> evitando los obstáculos.
        <br />
        Cada colisión suma un golpe.
      </p>

      <button
        onClick={startGame}
        style={{
          marginTop:     16,
          padding:       '14px 48px',
          fontSize:      18,
          fontFamily:    'monospace',
          fontWeight:    700,
          letterSpacing: '0.08em',
          background:    'transparent',
          color:         '#4ecdc4',
          border:        '2px solid #4ecdc4',
          borderRadius:  8,
          cursor:        'pointer',
          transition:    'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = '#4ecdc4';
          (e.target as HTMLButtonElement).style.color      = '#050a0f';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = 'transparent';
          (e.target as HTMLButtonElement).style.color      = '#4ecdc4';
        }}
      >
        INICIAR
      </button>
    </div>
  );
}
