@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
-import { useScrollDirection } from '../hooks/useScrollDirection';
+import { usePersistentInView, useScrollDirection } from '../hooks/useScrollDirection';

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
-  const [ref, inView] = useInView({
-    triggerOnce: false,
-    threshold: 0.3
-  });
+  const [ref, inView] = usePersistentInView(0.3);

  const { scrollDirection } = useScrollDirection();

@@ .. @@
    <motion.div
      ref={ref}
      variants={textVariants}
      initial="hidden"
-      animate={inView ? "visible" : "hidden"}
+      animate="visible"
      className="relative"
    >