'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function HeroSection() {
  const router = useRouter();

  const handleexplore = () => {
    router.push('/studycourse');
  };

  const handlelearn= () => {
    router.push('/learn');
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white flex items-center justify-center text-center overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white/20 rounded-full animate-float"
            style={{
              width: `${Math.random() * 10}px`,
              height: `${Math.random() * 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Centered Content */}
      <div className="container mx-auto px-4 pt-24 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Learn with <span className="text-blue-400">Confidence</span>, 
            Earn with <span className="text-blue-400">Knowledge</span>!
          </motion.h1>
  
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stake your amount, Learn with AI, Get rewarded for mastering topics!
          </p>
  
          <div className="flex justify-center space-x-4 mb-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlelearn}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Start Learning
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleexplore}
              className="bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Explore Courses
            </motion.button>
          </div>
        </div>
    </div>
  );
}

export default HeroSection;
