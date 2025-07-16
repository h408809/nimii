import React from 'react';
import { motion } from 'framer-motion';
import { usePersistentInView, useScrollDirection } from '../hooks/useScrollDirection';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1
}) => {
  const [ref, inView, hasBeenInView] = usePersistentInView(threshold);
  const { scrollDirection } = useScrollDirection();

  const getDirectionVariants = (dir: string, scrollDir: string) => {
    const baseDistance = 60;
    const variants = {
      left: { 
        x: scrollDir === 'down' ? [-baseDistance, 0] : [baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateY: [scrollDir === 'down' ? -15 : 15, 0]
      },
      right: { 
        x: scrollDir === 'down' ? [baseDistance, 0] : [-baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateY: [scrollDir === 'down' ? 15 : -15, 0]
      },
      up: { 
        y: scrollDir === 'down' ? [baseDistance, 0] : [-baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateX: [scrollDir === 'down' ? 15 : -15, 0]
      },
      down: { 
        y: scrollDir === 'down' ? [-baseDistance, 0] : [baseDistance, 0], 
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateX: [scrollDir === 'down' ? -15 : 15, 0]
      }
    };
    return variants[dir as keyof typeof variants] || variants.up;
  };

  const directionVariants = getDirectionVariants(direction, scrollDirection);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        x: directionVariants.x?.[0] || 0, 
        y: directionVariants.y?.[0] || 0, 
        opacity: 0,
        scale: 0.9,
        rotateX: directionVariants.rotateX?.[0] || 0,
        rotateY: directionVariants.rotateY?.[0] || 0,
        filter: 'blur(5px)'
      }}
      animate={{
        x: (inView || hasBeenInView) ? (directionVariants.x?.[1] || 0) : (directionVariants.x?.[0] || 0),
        y: (inView || hasBeenInView) ? (directionVariants.y?.[1] || 0) : (directionVariants.y?.[0] || 0),
        opacity: (inView || hasBeenInView) ? 1 : 0,
        scale: (inView || hasBeenInView) ? 1 : 0.9,
        rotateX: (inView || hasBeenInView) ? (directionVariants.rotateX?.[1] || 0) : (directionVariants.rotateX?.[0] || 0),
        rotateY: (inView || hasBeenInView) ? (directionVariants.rotateY?.[1] || 0) : (directionVariants.rotateY?.[0] || 0),
        filter: (inView || hasBeenInView) ? 'blur(0px)' : 'blur(5px)'
      }}
      transition={{
        duration,
        delay: hasBeenInView ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;