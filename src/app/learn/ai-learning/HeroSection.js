import { motion } from 'framer-motion';

export default function HeroSection({ setActiveSection }) {
  return (
    <motion.section 
      className="flex flex-col items-center justify-center min-h-screen text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* AI Bot Animation */}
      <motion.div
        className="relative w-64 h-64 mb-8"
        initial={{ y: 20 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          y: { 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut" 
          }
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-blue-400">
            <circle cx="100" cy="70" r="40" />
            <rect x="60" y="120" width="80" height="60" rx="10" />
            <circle cx="80" cy="70" r="10" className="fill-white" />
            <circle cx="120" cy="70" r="10" className="fill-white" />
            <path d="M85 90 Q100 100 115 90" stroke="white" strokeWidth="3" fill="none" />
            <motion.circle 
              cx="80" cy="70" r="5" 
              className="fill-blue-900"
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.circle 
              cx="120" cy="70" r="5" 
              className="fill-blue-900"
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            />
          </svg>
        </div>
        <motion.div
          className="absolute inset-0 border-2 border-blue-400 rounded-full opacity-70"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      </motion.div>

      {/* Hero Text */}
      <motion.h1 
        className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 mb-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        AI-Powered Learning: Smarter, Faster, Better 🚀
      </motion.h1>
      
      <motion.p
        className="text-xl md:text-2xl text-blue-200 max-w-2xl mb-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Summarize, Understand, and Retain Knowledge with AI!
      </motion.p>
      
      {/* CTA Button */}
      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white text-lg font-bold shadow-lg shadow-blue-600/30"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 0 20px 5px rgba(37, 99, 235, 0.5)',
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setActiveSection('upload')}
      >
        Get AI Insights →
      </motion.button>
      
      {/* Background Animation */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-blue-900 to-indigo-900"></div>
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, -100, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.section>
  );
}
