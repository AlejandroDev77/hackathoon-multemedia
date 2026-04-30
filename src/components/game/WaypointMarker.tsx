import type { WaypointData } from '../../types/game.types';

interface WaypointMarkerProps {
  waypoint: WaypointData;
  reached?: boolean;
}

const COLORS: Record<'A' | 'B', { ring: string; fill: string; glow: string }> = {
  A: {
    ring: '#4ecdc4',
    fill: 'rgba(78,205,196,0.15)',
    glow: '0 0 20px rgba(78,205,196,0.5)',
  },
  B: {
    ring: '#f9ca24',
    fill: 'rgba(249,202,36,0.15)',
    glow: '0 0 20px rgba(249,202,36,0.5)',
  },
};

export function WaypointMarker({ waypoint, reached = false }: WaypointMarkerProps) {
  const { id, position } = waypoint;
  const color = COLORS[id];
  const size  = 56;

  return (
    <div
      style={{
        position:     'absolute',
        left:         position.x - size / 2,
        top:          position.y - size / 2,
        width:        size,
        height:       size,
        borderRadius: '50%',
        border:       `2px solid ${color.ring}`,
        background:   reached ? color.ring : color.fill,
        boxShadow:    color.glow,
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        transition:    'background 0.3s ease',
        animation:     reached ? 'none' : 'pulse 2s ease-in-out infinite',
      }}
    >
      <span style={{
        color:      color.ring,
        fontFamily: 'monospace',
        fontSize:   '18px',
        fontWeight: 700,
        letterSpacing: '0.05em',
      }}>
        {id}
      </span>
    </div>
  );
}
