import React from 'react';
import { motion } from 'framer-motion';

function CTASection() {
  return (
    <div className="text-white py-16"> {/* Removed 'bg-transparent' */}
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Don&apos;t Just Learn, Earn Your Knowledge!
        </motion.h2>
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition"
          >
            Sign Up &amp; Start Learning
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="border border-white/50 text-white px-8 py-4 rounded-full hover:bg-white/10 transition"
          >
            Explore Free Content
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default CTASection;