import { memo, forwardRef } from 'react';
import type { ObstacleData } from '../../types/game.types';

interface ObstacleProps {
  data: ObstacleData;
}

const SHAPE_COLORS: Record<ObstacleData['shape'], string> = {
  circle:   'radial-gradient(circle at 35% 35%, #f9ca74, #c0781a)',
  square:   'radial-gradient(circle at 35% 35%, #a29bfe, #6c5ce7)',
  triangle: 'radial-gradient(circle at 50% 30%, #fd79a8, #d63031)',
};

const SHAPE_SHADOW: Record<ObstacleData['shape'], string> = {
  circle:   '0 6px 20px rgba(192,120,26,0.55)',
  square:   '0 6px 20px rgba(108,92,231,0.55)',
  triangle: '0 6px 20px rgba(214,48,49,0.55)',
};

export const Obstacle = memo(
  forwardRef<HTMLDivElement, ObstacleProps>(function Obstacle({ data }, ref) {
    const { position, size, shape } = data;

    const borderRadius =
      shape === 'circle'   ? '50%' :
      shape === 'square'   ? '8px' :
      '0%'; 

    const clipPath =
      shape === 'triangle'
        ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
        : undefined;

    return (
      <div
        ref={ref}
        style={{
          position:     'absolute',
          left:         position.x,
          top:          position.y,
          width:        size,
          height:       size,
          borderRadius,
          clipPath,
          background:   SHAPE_COLORS[shape],
          boxShadow:    SHAPE_SHADOW[shape],
          pointerEvents:'none',
          willChange:   'left, top',
          transform:    'translateZ(0)',
          zIndex:       50,
        }}
      />
    );
  })
);
