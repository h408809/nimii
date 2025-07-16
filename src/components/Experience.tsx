@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
+import { usePersistentInView } from '../hooks/useScrollDirection';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const Experience: React.FC = () => {
-  const [ref, inView] = useInView({
-    triggerOnce: true,
-    threshold: 0.1,
-  });
+  const [ref, inView] = usePersistentInView(0.1);

@@ .. @@
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
-          animate={inView ? "visible" : "hidden"}
+          animate="visible"
          className="text-center mb-16"
        >
@@ .. @@
        <motion.div
          variants={itemVariants}
          initial="hidden"
-          animate={inView ? "visible" : "hidden"}
+          animate="visible"
          className="max-w-4xl mx-auto"
        >
@@ .. @@
                    <motion.div
                      key={index}
                      variants={achievementVariants}
                     initial="hidden"
-                    animate={inView ? "visible" : "hidden"}
+                     animate="visible"
                     transition={{ delay: 0.5 + index * 0.1 }}
                     className="flex items-start group/achievement"
                   >
@@ .. @@
        <motion.div
          variants={itemVariants}
         initial="hidden"
-        animate={inView ? "visible" : "hidden"}
+        animate="visible"
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >