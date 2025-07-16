import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setScrollY(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return { scrollDirection, scrollY };
};

// New hook for persistent visibility
export const usePersistentInView = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
          setInView(true);
        } else if (isIntersecting) {
          setInView(true);
        } else if (hasBeenInView) {
          // Only hide if the element is completely out of view
          const rect = entry.boundingClientRect;
          const isCompletelyAbove = rect.bottom < 0;
          const isCompletelyBelow = rect.top > window.innerHeight;
          
          if (isCompletelyAbove || isCompletelyBelow) {
            setInView(false);
          }
        }
      },
      {
        threshold: [0, threshold, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenInView]);

  return [setRef, inView, hasBeenInView] as const;
};