@@ .. @@
import React, { useState } from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
+import { usePersistentInView } from '../hooks/useScrollDirection';
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
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
          className="space-y-6"
        >
@@ .. @@
                  <motion.a
                    key={item.title}
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center p-4 rounded-xl hover:bg-white/50 transition-all-300 group"
                    whileHover={{ x: 10 }}
                    initial={{ opacity: 0, x: -20 }}
-                    animate={inView ? { opacity: 1, x: 0 } : {}}
+                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
@@ .. @@
            <motion.div
              className="glass p-6 rounded-2xl"
              variants={itemVariants}
             initial="hidden"
-            animate={inView ? "visible" : "hidden"}
+            animate="visible"
            transition={{ delay: 0.4 }}
          >
@@ .. @@
        <motion.div
          variants={itemVariants}
        initial="hidden"
-        animate={inView ? "visible" : "hidden"}
+        animate="visible"
        transition={{ delay: 0.2 }}
      >
@@ .. @@
      <motion.div
        variants={itemVariants}
      initial="hidden"
-      animate={inView ? "visible" : "hidden"}
+      animate="visible"
      transition={{ delay: 0.6 }}
      className="text-center mt-16 pt-8 border-t border-pink-200"
    >