@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
-import { useInView } from 'react-intersection-observer';
+import { usePersistentInView } from '../hooks/useScrollDirection';
import { Code, Database, Palette, MessageSquare, Lightbulb, Users, Star, Zap, Target, Award } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const Skills: React.FC = () => {
-  const [ref, inView] = useInView({
-    triggerOnce: false,
-    threshold: 0.1,
-  });
+  const [ref, inView] = usePersistentInView(0.1);

@@ .. @@
          <motion.p
            ref={ref}
            variants={itemVariants}
            initial="hidden"
-            animate={inView ? "visible" : "hidden"}
+            animate="visible"
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
@@ .. @@
              <motion.div
                variants={itemVariants}
                initial="hidden"
-                animate={inView ? "visible" : "hidden"}
+                animate="visible"
                transition={{ delay: categoryIndex * 0.2 }}
                className="glass p-8 rounded-3xl hover-lift transition-all-300 group h-full relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
@@ .. @@
                    <motion.div
                      key={skill.name}
                     variants={skillVariants}
                     initial="hidden"
-                    animate={inView ? "visible" : "hidden"}
+                    animate="visible"
                     transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                     className="group/skill relative"
                   >
@@ .. @@
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${category.color} rounded-full relative overflow-hidden`}
                          initial={{ width: 0 }}
-                          animate={inView ? { width: `${skill.level}%` } : {}}
+                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        >
@@ .. @@
                      <motion.span
                        className="text-xs font-bold text-gray-600"
                        initial={{ opacity: 0 }}
-                        animate={inView ? { opacity: 1 } : {}}
+                        animate={{ opacity: 1 }}
                        transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 + 1 }}
                      >
@@ .. @@
                <motion.div
                  className="mt-6 p-4 bg-white/40 rounded-xl border border-gray-200/30 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
-                  animate={inView ? { opacity: 1, y: 0 } : {}}
+                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.2 + 0.8 }}
                >
@@ .. @@
                <motion.div
                  key={item.level}
                  className="text-center group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
-                  animate={inView ? { opacity: 1, scale: 1 } : {}}
+                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
@@ .. @@
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
-                        animate={inView ? { 
+                        animate={{ 
                          strokeDashoffset: 2 * Math.PI * 56 * (1 - item.percentage / 100)
-                        } : {}}
+                        }}
                        transition={{ duration: 2, delay: index * 0.3 }}
                      />
@@ .. @@
                     {item.skills.map((skill, skillIndex) => (
                       <motion.span
                         key={skill}
                         className="inline-block text-xs bg-white/60 text-gray-700 px-3 py-1 rounded-full mr-1 mb-1 border border-gray-200/50"
                         initial={{ opacity: 0, scale: 0 }}
-                        animate={inView ? { opacity: 1, scale: 1 } : {}}
+                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + skillIndex * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.05, borderColor: '#dc2626' }}
                      >