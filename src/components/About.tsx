import React from 'react';
import { motion } from 'framer-motion';
import { useSectionVisibility } from '../hooks/useScrollDirection';
import { Award, Trophy, Users, Heart, Target, Sparkles, Code2, Zap } from 'lucide-react';
import DynamicHeading from './DynamicHeading';
import ScrollAnimatedSection from './ScrollAnimatedSection';

const About: React.FC = () => {
  const [ref, isVisible, isActive] = useSectionVisibility('about', 0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const achievements = [
    {
      icon: Award,
      title: "Excellence in Development",
      description: "Consistently delivering high-quality solutions",
      delay: 0.1,
    },
    {
      icon: Trophy,
      title: "Innovation Leader",
      description: "Pioneering new approaches to complex problems",
      delay: 0.2,
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Building strong partnerships across organizations",
      delay: 0.3,
    },
    {
      icon: Heart,
      title: "Passion-Driven",
      description: "Bringing enthusiasm to every project",
      delay: 0.4,
    },
  ];

  const skills = [
    { name: "Frontend Development", level: 95, icon: Code2 },
    { name: "Backend Architecture", level: 90, icon: Zap },
    { name: "UI/UX Design", level: 85, icon: Sparkles },
    { name: "Team Leadership", level: 88, icon: Users },
    { name: "Problem Solving", level: 92, icon: Target },
  ];

  return (
    <ScrollAnimatedSection id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-orange-50/30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <DynamicHeading
            level="h2"
            className="text-4xl lg:text-5xl mb-6"
            gradient="from-red-600 to-orange-600"
          >
            About Me
          </DynamicHeading>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
              animate={{
                opacity: isActive ? 1 : 0.7,
                y: isVisible ? 0 : 20
              }}
            >
              I'm a passionate full-stack developer with a love for creating beautiful, 
              functional, and user-centered digital experiences. With years of experience 
              in modern web technologies, I bring ideas to life through clean code and 
              innovative solutions.
            </motion.p>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              animate={{
                opacity: isActive ? 1 : 0.7,
                y: isVisible ? 0 : 15
              }}
            >
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the 
              developer community. I believe in continuous learning and pushing 
              the boundaries of what's possible.
            </motion.p>
          </motion.div>
        </div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.title}
                className="glass p-6 rounded-2xl text-center group hover:shadow-xl transition-all duration-300 gradient-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isVisible ? 1 : 0.3,
                  y: isVisible ? 0 : 20,
                  scale: isActive ? 1 : 0.98
                }}
                transition={{ delay: achievement.delay }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Section */}
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isVisible ? 1 : 0.4,
                x: isVisible ? 0 : -30,
                scale: isActive ? 1 : 0.98
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-200/30 rounded-full blur-xl" />
              <div className="glass p-8 rounded-3xl relative">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 text-red-500 mr-3" />
                  Core Skills
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        className="group"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{
                          opacity: isVisible ? 1 : 0.4,
                          x: isVisible ? 0 : -20
                        }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Icon className="w-5 h-5 text-red-500 mr-3" />
                            <span className="font-medium text-gray-800">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full relative"
                            initial={{ width: 0 }}
                            animate={{
                              width: isVisible ? `${skill.level}%` : '0%'
                            }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isVisible ? 1 : 0.4,
                x: isVisible ? 0 : 30,
                scale: isActive ? 1 : 0.98
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-200/30 rounded-full blur-xl" />
              <div className="glass p-8 rounded-3xl relative">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  My Approach
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-gray-800">User-Centered Design:</strong> Every 
                      decision starts with understanding user needs and creating intuitive experiences.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-gray-800">Clean Code:</strong> Writing maintainable, 
                      scalable code that stands the test of time and team collaboration.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-gray-800">Continuous Learning:</strong> Staying 
                      current with emerging technologies and best practices in the industry.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-gray-800">Performance First:</strong> Optimizing 
                      for speed, accessibility, and seamless user experiences across all devices.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Personal Quote */}
        <div className="mt-16">
          <motion.div
            className="glass p-10 rounded-3xl max-w-4xl mx-auto gradient-border relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            animate={{
              opacity: isVisible ? 1 : 0.3,
              scale: isActive ? 1 : 0.98,
              y: isVisible ? 0 : 30
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-red-200/50 rounded-full blur-sm" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange-200/50 rounded-full blur-sm" />
            
            <motion.blockquote
              className="text-2xl lg:text-3xl font-medium text-gray-700 mb-6 font-playfair italic text-center relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 1 : 0.4,
                scale: isActive ? 1 : 0.98
              }}
              transition={{ duration: 1 }}
            >
              "Code is poetry written in logic. Every line should tell a story, 
              solve a problem, and inspire the next developer who reads it."
            </motion.blockquote>
            
            <motion.div
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0.4,
                y: isVisible ? 0 : 15
              }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">My Development Philosophy</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ScrollAnimatedSection>
  );
};

export default About;