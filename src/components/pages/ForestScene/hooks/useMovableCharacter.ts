import { useState, useEffect, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isMoving: boolean;
  direction: 'left' | 'right';
}

export const useMovableCharacter = (initialX = 100, initialY = 400) => {
  const [position, setPosition] = useState<Position>({
    x: initialX,
    y: initialY,
    targetX: initialX,
    targetY: initialY,
    isMoving: false,
    direction: 'right',
  });
  
  const animationRef = useRef<number | null>(null);

  const moveTo = useCallback((x: number, y: number) => {
    setPosition(prev => ({
      ...prev,
      targetX: x,
      targetY: y,
      isMoving: true,
      direction: x > prev.x ? 'right' : 'left',
    }));
  }, []);

  useEffect(() => {
    if (position.isMoving) {
      const animate = () => {
        setPosition(prev => {
          const dx = prev.targetX - prev.x;
          const dy = prev.targetY - prev.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 2) {
            return {
              ...prev,
              x: prev.targetX,
              y: prev.targetY,
              isMoving: false,
            };
          }
          
          const speed = 3;
          const stepX = (dx / distance) * speed;
          const stepY = (dy / distance) * speed;
          
          return {
            ...prev,
            x: prev.x + stepX,
            y: prev.y + stepY,
          };
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position.isMoving, position.targetX, position.targetY]);

  return { position, moveTo };
};