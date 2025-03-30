'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ScrollBanner = () => {
  const messages = [
    'Learn & Earn', 
    'AI-Powered Learning', 
    'Stake Knowledge', 
    'Commit & Win', 
    'Earn While Learning', 
    'Motivation Locked', 
    'Study & Succeed'
  ];

  return (
    <div className="w-full bg-transparent backdrop-blur-xs backdrop-brightness-100 overflow-hidden py-6 border-y border-purple-500/20 relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Left-to-right infinite scroll (top) */}
      <div className="relative h-20 overflow-hidden mb-1">
        <motion.div
          className="absolute whitespace-nowrap flex items-center h-full"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {messages.map((message, index) => (
            <React.Fragment key={`ltr-${index}`}>
              <span className="inline-block mx-12 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-cyan-200 tracking-wide">
                {message}
              </span>
              <div className="inline-flex mx-6">
                <svg 
                  className="text-purple-400/80" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M12 2L4 12l8 10 8-10z" />
                </svg>
              </div>
            </React.Fragment>
          ))}
          {/* Clone first item for seamless transition */}
          <span className="inline-block mx-12 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-cyan-200 tracking-wide">
            {messages[0]}
          </span>
        </motion.div>
      </div>

      {/* Right-to-left infinite scroll (bottom) */}
      <div className="relative h-20 overflow-hidden mt-1">
        <motion.div
          className="absolute whitespace-nowrap flex items-center h-full right-0"
          animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {messages.map((message, index) => (
            <React.Fragment key={`rtl-${index}`}>
              <div className="inline-flex mx-6">
                <svg 
                  className="text-cyan-300/80 rotate-180" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M12 2L4 12l8 10 8-10z" />
                </svg>
              </div>
              <span className="inline-block mx-12 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-purple-200 tracking-wide">
                {message}
              </span>
            </React.Fragment>
          ))}
          {/* Clone first item for seamless transition */}
          <div className="inline-flex mx-6">
            <svg 
              className="text-cyan-300/80 rotate-180" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M12 2L4 12l8 10 8-10z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollBanner;