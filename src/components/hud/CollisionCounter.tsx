import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGameStore } from '../../store/useGameStore';

export function CollisionCounter() {
  const count  = useGameStore((s) => s.stats.collisionCount);
  const prevRef = useRef(count);

  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 500, friction: 8 },
  }));

  useEffect(() => {
    if (count > prevRef.current) {
      api.start({
        to: [
          { scale: 1.4 },
          { scale: 0.9 },
          { scale: 1.0 },
        ],
      });
    }
    prevRef.current = count;
  }, [count, api]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
        Golpes
      </span>
      <animated.span
        style={{
          fontSize:   38,
          fontWeight: 700,
          fontFamily: 'monospace',
          lineHeight: 1,
          color:      count > 0 ? '#ff7675' : '#ffffff',
          scale:      spring.scale,
          transition: 'color 0.3s ease',
        }}
      >
        {String(count).padStart(2, '0')}
      </animated.span>
    </div>
  );
}
