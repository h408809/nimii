@@ .. @@
               >
                 <ThreeAvatar
                   mousePosition={mousePosition}
                   onWave={() => console.log('Avatar waved!')}
                 />
-                
-                {/* Floating icons around avatar */}
-                {[
-                  { icon: '🤖', delay: 2, angle: 0 },
-                  { icon: '💻', delay: 2.2, angle: 60 },
-                  { icon: '🏆', delay: 2.4, angle: 120 },
-                  { icon: '🎓', delay: 2.6, angle: 180 },
-                  { icon: '🚀', delay: 2.8, angle: 240 },
-                  { icon: '⚡', delay: 3, angle: 300 }
-                ].map((item, index) => (
-                  <motion.div
-                    key={index}
-                    className="absolute text-2xl"
-                    style={{
-                      top: `${50 + 40 * Math.sin(item.angle * Math.PI / 180)}%`,
-                      left: `${50 + 40 * Math.cos(item.angle * Math.PI / 180)}%`,
-                      transform: 'translate(-50%, -50%)'
-                    }}
-                    initial={{ opacity: 0, scale: 0 }}
-                    animate={{ 
-                      opacity: 1, 
-                      scale: 1,
-                      rotate: 360,
-                      y: [0, -10, 0]
-                    }}
-                    transition={{ 
-                      opacity: { delay: item.delay },
-                      scale: { delay: item.delay },
-                      rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
-                      y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
-                    }}
-                  >
-                    {item.icon}
-                  </motion.div>
-                ))}
               </motion.div>
             </motion.div>
           </ScrollAnimatedSection>