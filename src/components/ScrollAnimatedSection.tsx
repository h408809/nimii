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
  stayVisible?: boolean; // New prop to control persistent visibility
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  id,
  stayVisible = true // Default to staying visible
}) => {
  const [ref, isVisible, isActive, hasBeenVisible] = useSectionVisibility(id || '', threshold);
  const { scrollDirection } = useScrollDirection();

  const getAnimationState = () => {
    if (stayVisible && hasBeenVisible) {
      // Once visible, stay visible with subtle opacity changes
      return {
        x: 0,
        y: 0,
        opacity: isActive ? 1 : 0.85, // Slight opacity reduction when not active
        scale: isActive ? 1 : 0.99, // Subtle scale change
        filter: 'blur(0px)',
        rotateX: 0,
        rotateY: 0
      };
    }

    if (!isVisible) {
      // Exit animations based on scroll direction (only if not staying visible)
      const exitDistance = 30;
      const exitVariants = {
        left: { 
          x: scrollDirection === 'down' ? -exitDistance : exitDistance,
          opacity: 0.2,
          scale: 0.95,
          filter: 'blur(2px)'
        },
        right: { 
          x: scrollDirection === 'down' ? exitDistance : -exitDistance,
          opacity: 0.2,
          scale: 0.95,
          filter: 'blur(2px)'
        },
        up: { 
          y: scrollDirection === 'down' ? -exitDistance : exitDistance,
          opacity: 0.2,
          scale: 0.95,
          filter: 'blur(2px)'
        },
        down: { 
          y: scrollDirection === 'down' ? exitDistance : -exitDistance,
          opacity: 0.2,
          scale: 0.95,
          filter: 'blur(2px)'
        }
      };
      return exitVariants[direction as keyof typeof exitVariants] || exitVariants.up;
    }

    // Entry/visible animations
    return {
      x: 0,
      y: 0,
      opacity: isActive ? 1 : 0.9,
      scale: isActive ? 1 : 0.99,
      filter: 'blur(0px)',
      rotateX: 0,
      rotateY: 0
    };
  };

  const getInitialState = () => {
    const baseDistance = 60;
    const variants = {
      left: { x: -baseDistance, opacity: 0, scale: 0.9, filter: 'blur(5px)' },
      right: { x: baseDistance, opacity: 0, scale: 0.9, filter: 'blur(5px)' },
      up: { y: baseDistance, opacity: 0, scale: 0.9, filter: 'blur(5px)' },
      down: { y: -baseDistance, opacity: 0, scale: 0.9, filter: 'blur(5px)' }
    };
    return variants[direction as keyof typeof variants] || variants.up;
  };

  const animationState = getAnimationState();
  const initialState = getInitialState();

  return (
    <motion.div
      ref={ref}
      className={className}
      id={id}
      initial={initialState}
      animate={animationState}
      transition={{
        duration: hasBeenVisible ? (isActive ? 0.6 : 0.4) : duration,
        delay: hasBeenVisible ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: hasBeenVisible ? 150 : 100,
        damping: hasBeenVisible ? 25 : 20
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;