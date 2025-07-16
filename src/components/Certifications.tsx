@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
+import { usePersistentInView } from '../hooks/useScrollDirection';
import { Award, ExternalLink, CheckCircle, Calendar } from 'lucide-react';

const Certifications: React.FC = () => {
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
              key={cert.title}
             variants={itemVariants}
            initial="hidden"
-            animate={inView ? "visible" : "hidden"}
+            animate="visible"
            transition={{ delay: index * 0.2 }}
            className="group"
          >
@@ .. @@
        <motion.div
          variants={itemVariants}
        initial="hidden"
-        animate={inView ? "visible" : "hidden"}
+        animate="visible"
        transition={{ delay: 0.6 }}
        className="mt-16"
      >
@@ .. @@
                <motion.div
                  key={item.title}
                  className="glass p-6 rounded-xl text-center hover-lift transition-all-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
-                  animate={inView ? { opacity: 1, y: 0 } : {}}
+                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >