import React from 'react';
import { motion } from 'framer-motion';
import { useSectionVisibility, useScrollDirection } from '../hooks/useScrollDirection';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  threshold?: number;
  id?: string;
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  id
}) => {
  const [ref, isVisible, isActive] = useSectionVisibility(id || '', threshold);
  const { scrollDirection } = useScrollDirection();

  const getAnimationVariants = (dir: string, scrollDir: string, visible: boolean) => {
    const baseDistance = 40;
    const exitDistance = 20;
    
    if (!visible) {
      // Exit animations based on scroll direction
      const exitVariants = {
        left: { 
          x: scrollDir === 'down' ? -exitDistance : exitDistance,
          opacity: 0.3,
          scale: 0.98,
          filter: 'blur(1px)'
        },
        right: { 
          x: scrollDir === 'down' ? exitDistance : -exitDistance,
          opacity: 0.3,
          scale: 0.98,
          filter: 'blur(1px)'
        },
        up: { 
          y: scrollDir === 'down' ? -exitDistance : exitDistance,
          opacity: 0.3,
          scale: 0.98,
          filter: 'blur(1px)'
        },
        down: { 
          y: scrollDir === 'down' ? exitDistance : -exitDistance,
          opacity: 0.3,
          scale: 0.98,
          filter: 'blur(1px)'
        }
      };
      return exitVariants[dir as keyof typeof exitVariants] || exitVariants.up;
    }

    // Entry/visible animations
    const visibleVariants = {
      left: { 
        x: 0,
        opacity: isActive ? 1 : 0.9,
        scale: isActive ? 1 : 0.99,
        filter: 'blur(0px)'
      },
      right: { 
        x: 0,
        opacity: isActive ? 1 : 0.9,
        scale: isActive ? 1 : 0.99,
        filter: 'blur(0px)'
      },
      up: { 
        y: 0,
        opacity: isActive ? 1 : 0.9,
        scale: isActive ? 1 : 0.99,
        filter: 'blur(0px)'
      },
      down: { 
        y: 0,
        opacity: isActive ? 1 : 0.9,
        scale: isActive ? 1 : 0.99,
        filter: 'blur(0px)'
      }
    };
    return visibleVariants[dir as keyof typeof visibleVariants] || visibleVariants.up;
  };

  const getInitialVariants = (dir: string) => {
    const baseDistance = 60;
    const variants = {
      left: { x: -baseDistance, opacity: 0, scale: 0.95, filter: 'blur(3px)' },
      right: { x: baseDistance, opacity: 0, scale: 0.95, filter: 'blur(3px)' },
      up: { y: baseDistance, opacity: 0, scale: 0.95, filter: 'blur(3px)' },
      down: { y: -baseDistance, opacity: 0, scale: 0.95, filter: 'blur(3px)' }
    };
    return variants[dir as keyof typeof variants] || variants.up;
  };

  const animationVariants = getAnimationVariants(direction, scrollDirection, isVisible);
  const initialVariants = getInitialVariants(direction);

  return (
    <motion.div
      ref={ref}
      className={className}
      id={id}
      initial={initialVariants}
      animate={animationVariants}
      transition={{
        duration: isVisible ? duration : duration * 0.6,
        delay: isVisible ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: isVisible ? 100 : 150,
        damping: isVisible ? 20 : 25
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;