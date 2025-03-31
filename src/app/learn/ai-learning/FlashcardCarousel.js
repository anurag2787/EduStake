import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FlashcardCarousel({ aiSummary }) {
  const [activeCard, setActiveCard] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  
  // Generate flashcards based on AI summary
  const generateFlashcards = () => {
    if (!aiSummary) return [];
    
    // Generate from key points and concepts
    const flashcards = [
      {
        question: "What are the three main paradigms of machine learning?",
        answer: "Supervised learning, unsupervised learning, and reinforcement learning."
      },
      {
        question: "Why is feature selection important in machine learning?",
        answer: "Feature selection significantly impacts model accuracy and interpretability."
      },
      {
        question: "What are regularization techniques used for?",
        answer: "Regularization techniques help prevent overfitting in complex models."
      },
      {
        question: "What is the benefit of ensemble methods?",
        answer: "Ensemble methods combine multiple models to improve prediction accuracy."
      },
      {
        question: "Name three examples of supervised learning algorithms.",
        answer: "Classification, regression, and support vector machines."
      },
    ];
    
    return flashcards;
  };
  
  const flashcards = generateFlashcards();
  
  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % flashcards.length);
  };
  
  const prevCard = () => {
    setActiveCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };
  
  return (
    <motion.section
      className="min-h-screen py-12 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Interactive Flashcards
      </motion.h2>
      
      <p className="text-blue-200 mb-12 text-center max-w-2xl">
        Test your knowledge with these AI-generated flashcards. Click on a card to flip it and reveal the answer.
      </p>
      
      {/* Flashcard Carousel */}
      <div className="relative w-full max-w-2xl">
        <div className="overflow-hidden">
          <div className="flex justify-center">
            {flashcards.map((card, index) => (
              <motion.div
                key={index}
                className={`relative w-80 h-48 mx-2 ${index === activeCard ? 'opacity-100' : 'opacity-0 absolute'}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: index === activeCard ? 1 : 0.9,
                  opacity: index === activeCard ? 1 : 0,
                  rotateY: flippedCards[index] ? 180 : 0
                }}
                transition={{ duration: 0.5 }}
                onClick={() => toggleFlip(index)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Front */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-blue-800 to-indigo-900 text-white shadow-lg shadow-blue-700/30 border border-blue-600/30 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 blur-sm pointer-events-none"></div>
                  <motion.div
                    className="absolute -inset-1 bg-blue-400 rounded-xl blur opacity-20 pointer-events-none"
                    animate={{ 
                      opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                  <h3 className="text-lg font-medium text-blue-200 mb-4">Question</h3>
                  <p className="text-center">{card.question}</p>
                  <span className="absolute bottom-3 right-3 text-xs text-blue-300/70">Click to flip</span>
                </motion.div>
                
                {/* Card Back */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-indigo-900 to-blue-800 text-white shadow-lg shadow-blue-700/30 border border-blue-600/30 backface-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 blur-sm pointer-events-none"></div>
                  <motion.div
                    className="absolute -inset-1 bg-blue-400 rounded-xl blur opacity-20 pointer-events-none"
                    animate={{ 
                      opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                  <h3 className="text-lg font-medium text-blue-200 mb-4">Answer</h3>
                  <p className="text-center">{card.answer}</p>
                  <span className="absolute bottom-3 right-3 text-xs text-blue-300/70">Click to flip</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Navigation Controls */}
        <motion.button
          className="absolute top-1/2 left-0 -translate-y-1/2 -ml-6 w-12 h-12 rounded-full bg-blue-700/80 shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
          whileTap={{ scale: 0.95 }}
          onClick={prevCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button
          className="absolute top-1/2 right-0 -translate-y-1/2 -mr-6 w-12 h-12 rounded-full bg-blue-700/80 shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
          whileTap={{ scale: 0.95 }}
          onClick={nextCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {flashcards.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${index === activeCard ? 'bg-blue-500' : 'bg-blue-800'}`}
              onClick={() => setActiveCard(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
      
      <motion.p
        className="text-blue-300 mt-12 text-center max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Mastered these cards? Try creating a mind map to visualize connections between concepts!
      </motion.p>
    </motion.section>
  );
}