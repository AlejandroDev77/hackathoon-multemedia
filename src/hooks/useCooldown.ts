
import { useEffect } from 'react';
import { useSpring, type SpringValues } from '@react-spring/web';
import { useGameStore } from '../store/useGameStore';
import { GAME_CONFIG } from '../constants/gameConfig';

interface CooldownSpring {
  scale: number;
  rotate: number;
  opacity: number;
}

export function useCooldown(): SpringValues<CooldownSpring> {
  const cooldownActive   = useGameStore((s) => s.cooldown.active);
  const deactivateCooldown = useGameStore((s) => s.deactivateCooldown);

  const [spring, api] = useSpring<CooldownSpring>(() => ({
    scale:   1,
    rotate:  0,
    opacity: 1,
    config: { tension: 400, friction: 12 },
  }));

  useEffect(() => {
    if (!cooldownActive) return;

    api.start({
      to: [
        { scale: 1.35, rotate: -12, opacity: 0.6 },
        { scale: 0.85, rotate:  10, opacity: 0.8 },
        { scale: 1.15, rotate:  -6, opacity: 0.9 },
        { scale: 1.00, rotate:   0, opacity: 1.0 },
      ],
      config: { tension: 350, friction: 10 },
    });

 
    const timer = setTimeout(() => {
      deactivateCooldown();
    }, GAME_CONFIG.COOLDOWN_DURATION_MS);

    return () => clearTimeout(timer);
  }, [cooldownActive, api, deactivateCooldown]);

  return spring;
}
