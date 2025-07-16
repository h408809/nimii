@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
+import { usePersistentInView } from '../hooks/useScrollDirection';
import { ExternalLink, Github, Brain, Shield, Newspaper } from 'lucide-react';

const Projects: React.FC = () => {
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
              key={project.title}
             variants={itemVariants}
             initial="hidden"
-            animate={inView ? "visible" : "hidden"}
+            animate="visible"
            transition={{ delay: index * 0.2 }}
            className="group"
          >
@@ .. @@
                        <motion.li
                          key={featureIndex}
                          className="text-gray-600 text-sm flex items-start"
                          initial={{ opacity: 0, x: -10 }}
-                          animate={inView ? { opacity: 1, x: 0 } : {}}
+                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                        >
@@ .. @@
        <motion.div
          variants={itemVariants}
         initial="hidden"
-        animate={inView ? "visible" : "hidden"}
+        animate="visible"
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >