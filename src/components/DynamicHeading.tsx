import React from 'react';
import { motion } from 'framer-motion';
import { usePersistentInView, useScrollDirection } from '../hooks/useScrollDirection';

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
  const [ref, inView] = usePersistentInView(0.3);

  const { scrollDirection } = useScrollDirection();

  const textVariants = {
    hidden: {
      opacity: 0,
      y: scrollDirection === 'down' ? 30 : -30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const HeadingTag = level;

  return (
    <motion.div
      ref={ref}
      variants={textVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <HeadingTag className={`font-bold tracking-tight ${className}`}>
        {children}
      </HeadingTag>
    </motion.div>
  );
};

export default DynamicHeading;