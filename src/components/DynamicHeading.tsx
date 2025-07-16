import React from 'react';
import { motion } from 'framer-motion';
import { useSectionVisibility, useScrollDirection } from '../hooks/useScrollDirection';

interface DynamicHeadingProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

const DynamicHeading: React.FC<DynamicHeadingProps> = ({
  children,
  level = 'h2',
  className = ''
}) => {
  const [ref, isVisible, isActive] = useSectionVisibility('', 0.3);
  const { scrollDirection } = useScrollDirection();

  const HeadingTag = level;

  const getAnimationState = () => {
    if (!isVisible) {
      return {
        opacity: 0.2,
        y: scrollDirection === 'down' ? -20 : 20,
        scale: 0.98,
        filter: 'blur(2px)'
      };
    }

    return {
      opacity: isActive ? 1 : 0.8,
      y: 0,
      scale: isActive ? 1 : 0.99,
      filter: 'blur(0px)'
    };
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.95,
        filter: 'blur(3px)'
      }}
      animate={getAnimationState()}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 20
      }}
    >
      <HeadingTag
        className={`font-playfair font-bold text-cherry-red ${className}`}
        style={{
          background: 'linear-gradient(135deg, #dc2626, #b91c1c, #991b1b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        <motion.span className="inline-block">
          {String(children).split('').map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{
                opacity: isVisible ? 1 : 0.3,
                y: 0,
                rotateX: 0
              }}
              transition={{
                duration: 0.6,
                delay: isVisible ? index * 0.05 : 0,
                ease: 'easeOut'
              }}
              style={{ transformOrigin: '50% 100%' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.span>
      </HeadingTag>
    </motion.div>
  );
};

export default DynamicHeading;