import { useEffect, useState, useRef } from 'react';

interface UseCounterOptions {
  target: number;
  duration?: number;
  startOnView?: boolean;
  parentRef?: React.RefObject<HTMLElement>;
}

export const useCounter = ({ 
  target, 
  duration = 2000, 
  startOnView = true,
  parentRef 
}: UseCounterOptions): number => {
  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(!startOnView);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Limpar animação anterior se existir
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (!startOnView || hasStarted) {
      // Animar imediatamente se não precisa esperar pela view
      const startTime = Date.now();
      
      const animate = (): void => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
          animationFrameRef.current = null;
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }

    // Usar IntersectionObserver para iniciar quando visível
    if (!parentRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            
            const startTime = Date.now();
            
            const animate = (): void => {
              const now = Date.now();
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.floor(easeOut * target);
              
              setCount(currentCount);
              
              if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
              } else {
                setCount(target);
                animationFrameRef.current = null;
              }
            };
            
            animationFrameRef.current = requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(parentRef.current);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target, duration, startOnView, hasStarted, parentRef]);

  return count;
};

export default useCounter;
