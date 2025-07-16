@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
+import { usePersistentInView } from '../hooks/useScrollDirection';
import { Award, Trophy, Users, Heart, Target, Sparkles, Code2, Zap } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const About: React.FC = () => {
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
                initial={{ opacity: 0, y: 30 }}
-                animate={inView ? { opacity: 1, y: 0 } : {}}
+                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: achievement.delay }}
              >
@@ .. @@
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
-             animate={inView ? { opacity: 1, x: 0 } : {}}
+             animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
@@ .. @@
            <motion.div
              className="relative"
             initial={{ opacity: 0, x: -50 }}
-            animate={inView ? { opacity: 1, x: 0 } : {}}
+            animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
           >
@@ .. @@
                    <motion.div
                     key={index}
                     className="group"
                     initial={{ opacity: 0, x: -30 }}
-                    animate={inView ? { opacity: 1, x: 0 } : {}}
+                    animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.2 }}
                   >
@@ .. @@
                       <motion.div
                         className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full relative"
                         initial={{ width: 0 }}
-                        animate={inView ? { width: `${skill.level}%` } : {}}
+                        animate={{ width: `${skill.level}%` }}
                         transition={{ duration: 1.5, delay: index * 0.2 }}
                       >
@@ .. @@
            <motion.blockquote
              className="text-2xl lg:text-3xl font-medium text-gray-700 mb-6 font-playfair italic text-center relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
-             animate={inView ? { opacity: 1, scale: 1 } : {}}
+             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
           >
@@ .. @@
           <motion.div
             className="text-center relative z-10"
             initial={{ opacity: 0, y: 20 }}
-            animate={inView ? { opacity: 1, y: 0 } : {}}
+            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >