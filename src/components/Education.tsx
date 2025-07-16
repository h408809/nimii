@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
+import { usePersistentInView } from '../hooks/useScrollDirection';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const Education: React.FC = () => {
-  const [ref, inView] = useInView({
-    triggerOnce: false,
-    threshold: 0.1,
-  });
+  const [ref, inView] = usePersistentInView(0.1);

@@ .. @@
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
-            animate={inView ? "visible" : "hidden"}
+            animate="visible"
          >
@@ .. @@
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
-                  animate={inView ? "visible" : "hidden"}
+                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >