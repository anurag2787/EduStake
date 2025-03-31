'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlashcardCarousel({ aiSummary, setActiveSection }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!aiSummary) {
      setError("No study material found. Please upload a document first.");
      setLoading(false);
      return;
    }

    // Check if there are flashcards in the aiSummary
    if (aiSummary.flashcards && aiSummary.flashcards.length > 0) {
      setFlashcards(aiSummary.flashcards);
      setLoading(false);
    } else {
      // Generate default flashcards if not available
      const generatedCards = generateDefaultFlashcards(aiSummary);
      setFlashcards(generatedCards);
      setLoading(false);
    }
  }, [aiSummary]);

  // Function to generate default flashcards from summary content
  const generateDefaultFlashcards = (summary) => {
    if (!summary) return [];
    
    // First try to extract key points if available
    if (summary.keyPoints && Array.isArray(summary.keyPoints) && summary.keyPoints.length > 0) {
      return summary.keyPoints.slice(0, 5).map((point, index) => {
        const words = point.split(' ');
        const keyWord = words.find(w => w.length > 5) || words[Math.floor(words.length / 2)];
        const question = point.replace(keyWord, "________");
        
        return {
          id: index,
          question: `Fill in the blank: ${question}`,
          answer: keyWord
        };
      });
    }
    
    // If no key points, try using the summary text
    if (summary.summary) {
      const sentences = summary.summary.split(/[.!?]+/).filter(s => s.trim().length > 10);
      
      // Create 3-5 flashcards from the content
      const cards = [];
      const maxCards = Math.min(5, Math.floor(sentences.length / 2));
      
      for (let i = 0; i < maxCards; i++) {
        const sentence = sentences[i * 2]?.trim();
        if (!sentence) continue;
        
        const words = sentence.split(' ');
        const keyWord = words.find(w => w.length > 5) || words[Math.floor(words.length / 2)];
        const question = sentence.replace(keyWord, "________");
        
        cards.push({
          id: i,
          question: `Fill in the blank: ${question}`,
          answer: keyWord
        });
      }
      
      if (cards.length > 0) return cards;
    }
    
    // Fallback to default flashcards if we couldn't generate any
    return [
      {
        id: 1,
        question: "What is the main purpose of using AI for learning?",
        answer: "To personalize and enhance the learning experience by adapting to individual needs."
      },
      {
        id: 2,
        question: "What are effective ways to improve retention when studying?",
        answer: "Active recall, spaced repetition, and teaching others."
      },
      {
        id: 3,
        question: "How does the spacing effect improve learning?",
        answer: "Spreading study sessions over time leads to better long-term retention than cramming."
      }
    ];
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }, 300);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  // If there's an error or loading state
  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-200">Loading flashcards...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-blue-900/50 p-8 rounded-lg max-w-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-blue-200 mb-2">{error}</h3>
          <p className="text-blue-300 mb-6">To generate flashcards, please first upload a document.</p>
          <button
            onClick={() => setActiveSection('upload')}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
          >
            Go to Upload
          </button>
        </div>
      </motion.div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-blue-900/50 p-8 rounded-lg max-w-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-xl font-bold text-blue-200 mb-2">No Flashcards Available</h3>
          <p className="text-blue-300 mb-6">We couldn't generate flashcards for this content. Try uploading a different document.</p>
          <button
            onClick={() => setActiveSection('upload')}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
          >
            Go to Upload
          </button>
        </div>
      </motion.div>
    );
  }

  // Display flashcards
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-blue-300 mb-4 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Interactive Flashcards
      </motion.h2>

      <motion.p
        className="text-blue-400 mb-12 text-center max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Tap the card to reveal the answer. Navigate with the arrows to move between cards.
      </motion.p>

      {/* Flashcard */}
      <div className="w-full max-w-xl mx-auto mb-12 relative" style={{ perspective: "1000px" }}>
        <motion.div
          className={`relative w-full h-64 md:h-80 cursor-pointer ${flipped ? 'z-10' : 'z-20'}`}
          onClick={toggleFlip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Front of card - Question */}
          <AnimatePresence initial={false} mode="wait">
            {!flipped && (
              <motion.div
                key="front"
                className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-800 to-indigo-900 rounded-xl shadow-2xl border border-blue-700/50"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-4 left-4 bg-blue-700/50 rounded-full px-3 py-1 text-xs text-blue-200">
                  {currentCardIndex + 1} of {flashcards.length}
                </div>
                <span className="text-blue-400 text-sm mb-2">Question:</span>
                <p className="text-white text-xl text-center font-medium">
                  {flashcards[currentCardIndex]?.question || "No question available"}
                </p>
                <div className="absolute bottom-4 text-blue-300 text-sm font-light">Tap to flip</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back of card - Answer */}
          <AnimatePresence initial={false} mode="wait">
            {flipped && (
              <motion.div
                key="back"
                className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-800 to-blue-900 rounded-xl shadow-2xl border border-indigo-700/50"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-4 left-4 bg-indigo-700/50 rounded-full px-3 py-1 text-xs text-blue-200">
                  {currentCardIndex + 1} of {flashcards.length}
                </div>
                <span className="text-indigo-400 text-sm mb-2">Answer:</span>
                <p className="text-white text-xl text-center font-medium">
                  {flashcards[currentCardIndex]?.answer || "No answer available"}
                </p>
                <div className="absolute bottom-4 text-indigo-300 text-sm font-light">Tap to flip back</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-8">
        <motion.button
          onClick={prevCard}
          className="p-3 bg-blue-800 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px 5px rgba(37, 99, 235, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button
          onClick={nextCard}
          className="p-3 bg-blue-800 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px 5px rgba(37, 99, 235, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.section>
  );
}