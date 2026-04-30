import { useRef, useEffect, forwardRef } from 'react';
import { animated } from '@react-spring/web';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useCooldown } from '../../hooks/useCooldown';
import { useGameStore } from '../../store/useGameStore';
import { GAME_CONFIG } from '../../constants/gameConfig';

interface PlayerObjectProps {
  className?: string;
}

export const PlayerObject = forwardRef<HTMLDivElement, PlayerObjectProps>(
  function PlayerObject({ className }, ref) {
    const innerRef   = useRef<HTMLDivElement>(null);
    const mousePos   = useMousePosition();
    const spring     = useCooldown();
    const cooldown   = useGameStore((s) => s.cooldown.active);
    const rafRef     = useRef<number | null>(null);

    useEffect(() => {
      if (typeof ref === 'function') ref(innerRef.current);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = innerRef.current;
    });

    useEffect(() => {
      const move = () => {
        if (innerRef.current) {
          const half = GAME_CONFIG.PLAYER_SIZE / 2;
          innerRef.current.style.left = `${mousePos.current.x - half}px`;
          innerRef.current.style.top  = `${mousePos.current.y - half}px`;
        }
        rafRef.current = requestAnimationFrame(move);
      };
      rafRef.current = requestAnimationFrame(move);
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [mousePos]);

    return (
      <animated.div
        ref={innerRef}
        className={className}
        style={{
          position: 'absolute',
          width:  GAME_CONFIG.PLAYER_SIZE,
          height: GAME_CONFIG.PLAYER_SIZE,
          pointerEvents: 'none',
          zIndex: 10,
          scale:   spring.scale,
          rotate:  spring.rotate,
          opacity: spring.opacity,
          outline: cooldown
            ? '3px solid rgba(255, 80, 80, 0.8)'
            : '3px solid rgba(80, 220, 180, 0.9)',
          outlineOffset: '3px',
          borderRadius:  '50%',
          transition:    'outline 0.2s ease',
        }}
      >
        <div style={{
          width:        '100%',
          height:       '100%',
          borderRadius: '50%',
          background:   cooldown
            ? 'radial-gradient(circle at 35% 35%, #ff9a7a, #c0392b)'
            : 'radial-gradient(circle at 35% 35%, #a8edca, #1a8a6a)',
          boxShadow: cooldown
            ? '0 8px 24px rgba(192,57,43,0.6), inset 0 -4px 12px rgba(0,0,0,0.3)'
            : '0 8px 24px rgba(26,138,106,0.5), inset 0 -4px 12px rgba(0,0,0,0.3)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }} />
      </animated.div>
    );
  }
);
