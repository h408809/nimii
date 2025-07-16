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

// Enhanced hook for persistent visibility with better control
export const usePersistentInView = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Element is considered "in view" if any part is visible
        const isVisible = rect.bottom > 0 && rect.top < windowHeight;
        
        if (isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
          setInView(true);
        } else if (isVisible) {
          setInView(true);
        } else if (hasBeenInView) {
          // Only hide if the element is completely out of view
          const isCompletelyAbove = rect.bottom < -50; // 50px buffer
          const isCompletelyBelow = rect.top > windowHeight + 50; // 50px buffer
          
          if (isCompletelyAbove || isCompletelyBelow) {
            setInView(false);
          }
        }
      },
      {
        threshold: [0, threshold, 0.5, 1],
        rootMargin: '-5% 0px -5% 0px' // Smaller margin for better control
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, hasBeenInView]);

  return [setRef, inView, hasBeenInView] as const;
};

// New hook for section-based visibility
export const useSectionVisibility = (sectionId: string, threshold = 0.2) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        
        // Section is visible if any part is on screen
        const visible = rect.bottom > 0 && rect.top < windowHeight;
        setIsVisible(visible);
        
        // Section is active if it's prominently in view
        const centerY = windowHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionCenter - centerY);
        const isInCenter = distanceFromCenter < windowHeight * 0.3;
        
        setIsActive(visible && isInCenter);
      },
      {
        threshold: [0, threshold, 0.5, 1],
        rootMargin: '0px'
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return [setRef, isVisible, isActive] as const;
};