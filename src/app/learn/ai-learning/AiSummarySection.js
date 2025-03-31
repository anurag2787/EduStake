import { motion } from 'framer-motion';

export default function AiSummarySection({ aiSummary, setAiSummary, setActiveSection }) {
  if (!aiSummary) return null;
  
  return (
    <motion.section
      className="min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        AI Summary: {aiSummary.title}
      </motion.h2>
      
      {/* Summary Card */}
      <motion.div 
        className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl p-8 mb-12 shadow-lg shadow-blue-900/50 border border-blue-700/30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-10 pointer-events-none"
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        
        <h3 className="text-xl font-semibold text-blue-200 mb-4">Summary</h3>
        <p className="text-blue-100 mb-6 leading-relaxed">
          {aiSummary.summary}
        </p>
        
        <h3 className="text-xl font-semibold text-blue-200 mb-4">Key Points</h3>
        <ul className="space-y-2 mb-6">
          {aiSummary.keyPoints.map((point, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <span className="text-blue-400 mr-2">•</span>
              <span className="text-blue-100">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-bold shadow-lg shadow-blue-600/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.4)',
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveSection('flashcards')}
        >
          Generate Flashcards
        </motion.button>
        
        
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-bold shadow-lg shadow-blue-600/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.4)',
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveSection('forum')}
        >
          Ask Questions
        </motion.button>
      </div>
    </motion.section>
  );
}