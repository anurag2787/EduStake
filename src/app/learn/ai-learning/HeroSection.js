// components/ai-learning/HeroSection.jsx
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

// // components/ai-learning/UserUploads.jsx
// import { motion } from 'framer-motion';
// import { useState } from 'react';

// export default function UserUploads({ fileUploaded, setFileUploaded, setAiSummary, setActiveSection }) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   const handleFileUpload = (files) => {
//     // Simulate file upload
//     const file = files[0];
//     setFileUploaded(file);
//   };
  
//   const handleDragEnter = () => setIsDragging(true);
//   const handleDragLeave = () => setIsDragging(false);
  
//   const handleSubmit = () => {
//     if (!fileUploaded) return;
    
//     // Simulate AI processing
//     setIsProcessing(true);
//     setTimeout(() => {
//       // Mock AI summary data
//       setAiSummary({
//         title: fileUploaded.name.split('.')[0],
//         summary: "The document explores the fundamental concepts of machine learning, focusing on supervised, unsupervised, and reinforcement learning paradigms. Key algorithms discussed include linear regression, decision trees, and neural networks with their applications.",
//         keyPoints: [
//           "Machine learning algorithms require clean, structured data for optimal performance",
//           "Feature selection significantly impacts model accuracy and interpretability",
//           "Regularization techniques help prevent overfitting in complex models",
//           "Ensemble methods combine multiple models to improve prediction accuracy"
//         ],
//         concepts: {
//           "Supervised Learning": ["Classification", "Regression", "Support Vector Machines"],
//           "Unsupervised Learning": ["Clustering", "Dimensionality Reduction", "Anomaly Detection"],
//           "Neural Networks": ["Convolutional Neural Networks", "Recurrent Neural Networks", "Transformers"]
//         }
//       });
//       setIsProcessing(false);
//       setActiveSection('summary');
//     }, 2000);
//   };
  
//   return (
//     <motion.section
//       className="min-h-screen flex flex-col items-center justify-center py-12"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.h2 
//         className="text-3xl md:text-4xl font-bold text-blue-300 mb-12 text-center"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         Upload Your Learning Material
//       </motion.h2>
      
//       <motion.div 
//         className={`w-full max-w-xl border-2 border-dashed rounded-lg p-12 mx-auto flex flex-col items-center justify-center relative ${isDragging ? 'border-blue-400 bg-blue-900/20' : 'border-blue-700 bg-blue-900/10'}`}
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         onDragEnter={handleDragEnter}
//         onDragLeave={handleDragLeave}
//         whileHover={{ boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.3)' }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg pointer-events-none"></div>
        
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//         </svg>
        
//         <p className="text-blue-200 mb-6 text-center text-lg">Drag & drop your file here or <span className="text-blue-400 cursor-pointer">browse</span></p>
        
//         <p className="text-blue-300/60 text-sm mb-2">Supports PDF, DOCX, TXT, JPG, PNG</p>
        
//         <input 
//           type="file" 
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
//           onChange={(e) => handleFileUpload(e.target.files)}
//         />
//       </motion.div>
      
//       {/* File Preview */}
//       <AnimatePresence>
//         {fileUploaded && (
//           <motion.div 
//             className="mt-8 p-4 bg-blue-900/50 rounded-lg max-w-xl w-full"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -10, opacity: 0 }}
//           >
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-700/50 rounded-md mr-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-blue-200 truncate">
//                   {fileUploaded.name}
//                 </p>
//                 <p className="text-xs text-blue-400">
//                   {(fileUploaded.size / 1024).toFixed(2)} KB
//                 </p>
//               </div>
//               <button 
//                 className="text-blue-400 hover:text-blue-200"
//                 onClick={() => setFileUploaded(null)}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* Summarize Button */}
//       <motion.button
//         className={`mt-8 px-8 py-4 rounded-full text-white text-lg font-bold shadow-lg ${fileUploaded ? 'bg-gradient-to-r from-blue-600 to-indigo-700 shadow-blue-600/30 cursor-pointer' : 'bg-blue-800/50 cursor-not-allowed'}`}
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         whileHover={fileUploaded ? { 
//           scale: 1.05, 
//           boxShadow: '0 0 20px 5px rgba(37, 99, 235, 0.5)',
//         } : {}}
//         whileTap={fileUploaded ? { scale: 0.98 } : {}}
//         onClick={handleSubmit}
//         disabled={!fileUploaded || isProcessing}
//       >
//         {isProcessing ? (
//           <span className="flex items-center">
//             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Processing...
//           </span>
//         ) : (
//           "Summarize Now"
//         )}
//       </motion.button>
//     </motion.section>
//   );
// }

// // components/ai-learning/AiSummarySection.jsx
// import { motion } from 'framer-motion';

// export default function AiSummarySection({ aiSummary, setAiSummary }) {
//   if (!aiSummary) return null;
  
//   return (
//     <motion.section
//       className="min-h-screen py-12"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.h2 
//         className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         AI Summary: {aiSummary.title}
//       </motion.h2>
      
//       {/* Summary Card */}
//       <motion.div 
//         className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl p-8 mb-12 shadow-lg shadow-blue-900/50 border border-blue-700/30"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <motion.div
//           className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-10 pointer-events-none"
//           animate={{ 
//             opacity: [0.05, 0.1, 0.05],
//           }}
//           transition={{ repeat: Infinity, duration: 3 }}
//         />
        
//         <h3 className="text-xl font-semibold text-blue-200 mb-4">Summary</h3>
//         <p className="text-blue-100 mb-6 leading-relaxed">
//           {aiSummary.summary}
//         </p>
        
//         <h3 className="text-xl font-semibold text-blue-200 mb-4">Key Points</h3>
//         <ul className="space-y-2 mb-6">
//           {aiSummary.keyPoints.map((point, index) => (
//             <motion.li 
//               key={index} 
//               className="flex items-start"
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3 + (index * 0.1) }}
//             >
//               <span className="text-blue-400 mr-2">•</span>
//               <span className="text-blue-100">{point}</span>
//             </motion.li>
//           ))}
//         </ul>
//       </motion.div>
      
//       {/* Action Buttons */}
//       <div className="flex flex-wrap justify-center gap-4 mb-16">
//         <motion.button
//           className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-bold shadow-lg shadow-blue-600/20"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           whileHover={{ 
//             scale: 1.05, 
//             boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.4)',
//           }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => window.location.href = '#flashcards'}
//         >
//           Generate Flashcards
//         </motion.button>
        
//         <motion.button
//           className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-bold shadow-lg shadow-blue-600/20"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           whileHover={{ 
//             scale: 1.05, 
//             boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.4)',
//           }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => window.location.href = '#mindmap'}
//         >
//           Create Mind Map
//         </motion.button>
        
//         <motion.button
//           className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-bold shadow-lg shadow-blue-600/20"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           whileHover={{ 
//             scale: 1.05, 
//             boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.4)',
//           }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => window.location.href = '#forum'}
//         >
//           Ask Questions
//         </motion.button>
//       </div>
//     </motion.section>
//   );
// }

// // components/ai-learning/FlashcardCarousel.jsx
// import { motion } from 'framer-motion';
// import { useState } from 'react';

// export default function FlashcardCarousel({ aiSummary }) {
//   const [activeCard, setActiveCard] = useState(0);
//   const [flippedCards, setFlippedCards] = useState({});
  
//   // Generate flashcards based on AI summary
//   const generateFlashcards = () => {
//     if (!aiSummary) return [];
    
//     // Generate from key points and concepts
//     const flashcards = [
//       {
//         question: "What are the three main paradigms of machine learning?",
//         answer: "Supervised learning, unsupervised learning, and reinforcement learning."
//       },
//       {
//         question: "Why is feature selection important in machine learning?",
//         answer: "Feature selection significantly impacts model accuracy and interpretability."
//       },
//       {
//         question: "What are regularization techniques used for?",
//         answer: "Regularization techniques help prevent overfitting in complex models."
//       },
//       {
//         question: "What is the benefit of ensemble methods?",
//         answer: "Ensemble methods combine multiple models to improve prediction accuracy."
//       },
//       {
//         question: "Name three examples of supervised learning algorithms.",
//         answer: "Classification, regression, and support vector machines."
//       },
//     ];
    
//     return flashcards;
//   };
  
//   const flashcards = generateFlashcards();
  
//   const toggleFlip = (index) => {
//     setFlippedCards(prev => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };
  
//   const nextCard = () => {
//     setActiveCard((prev) => (prev + 1) % flashcards.length);
//   };
  
//   const prevCard = () => {
//     setActiveCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
//   };
  
//   return (
//     <motion.section
//       className="min-h-screen py-12 flex flex-col items-center justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.h2 
//         className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         Interactive Flashcards
//       </motion.h2>
      
//       <p className="text-blue-200 mb-12 text-center max-w-2xl">
//         Test your knowledge with these AI-generated flashcards. Click on a card to flip it and reveal the answer.
//       </p>
      
//       {/* Flashcard Carousel */}
//       <div className="relative w-full max-w-2xl">
//         <div className="overflow-hidden">
//           <div className="flex justify-center">
//             {flashcards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 className={`relative w-80 h-48 mx-2 ${index === activeCard ? 'opacity-100' : 'opacity-0 absolute'}`}
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ 
//                   scale: index === activeCard ? 1 : 0.9,
//                   opacity: index === activeCard ? 1 : 0,
//                   rotateY: flippedCards[index] ? 180 : 0
//                 }}
//                 transition={{ duration: 0.5 }}
//                 onClick={() => toggleFlip(index)}
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 {/* Card Front */}
//                 <motion.div
//                   className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-blue-800 to-indigo-900 text-white shadow-lg shadow-blue-700/30 border border-blue-600/30 backface-hidden"
//                   style={{ backfaceVisibility: 'hidden' }}
//                 >
//                   // components/ai-learning/FlashcardCarousel.jsx (continued)
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 blur-sm pointer-events-none"></div>
//                   <motion.div
//                     className="absolute -inset-1 bg-blue-400 rounded-xl blur opacity-20 pointer-events-none"
//                     animate={{ 
//                       opacity: [0.15, 0.25, 0.15],
//                     }}
//                     transition={{ repeat: Infinity, duration: 3 }}
//                   />
//                   <h3 className="text-lg font-medium text-blue-200 mb-4">Question</h3>
//                   <p className="text-center">{card.question}</p>
//                   <span className="absolute bottom-3 right-3 text-xs text-blue-300/70">Click to flip</span>
//                 </motion.div>
                
//                 {/* Card Back */}
//                 <motion.div
//                   className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-indigo-900 to-blue-800 text-white shadow-lg shadow-blue-700/30 border border-blue-600/30 backface-hidden"
//                   style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
//                 >
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 blur-sm pointer-events-none"></div>
//                   <motion.div
//                     className="absolute -inset-1 bg-blue-400 rounded-xl blur opacity-20 pointer-events-none"
//                     animate={{ 
//                       opacity: [0.15, 0.25, 0.15],
//                     }}
//                     transition={{ repeat: Infinity, duration: 3 }}
//                   />
//                   <h3 className="text-lg font-medium text-blue-200 mb-4">Answer</h3>
//                   <p className="text-center">{card.answer}</p>
//                   <span className="absolute bottom-3 right-3 text-xs text-blue-300/70">Click to flip</span>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
        
//         {/* Navigation Controls */}
//         <motion.button
//           className="absolute top-1/2 left-0 -translate-y-1/2 -ml-6 w-12 h-12 rounded-full bg-blue-700/80 shadow-lg flex items-center justify-center"
//           whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
//           whileTap={{ scale: 0.95 }}
//           onClick={prevCard}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </motion.button>
        
//         <motion.button
//           className="absolute top-1/2 right-0 -translate-y-1/2 -mr-6 w-12 h-12 rounded-full bg-blue-700/80 shadow-lg flex items-center justify-center"
//           whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
//           whileTap={{ scale: 0.95 }}
//           onClick={nextCard}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </motion.button>
        
//         {/* Indicators */}
//         <div className="flex justify-center mt-8 space-x-2">
//           {flashcards.map((_, index) => (
//             <motion.button
//               key={index}
//               className={`w-3 h-3 rounded-full ${index === activeCard ? 'bg-blue-500' : 'bg-blue-800'}`}
//               onClick={() => setActiveCard(index)}
//               whileHover={{ scale: 1.2 }}
//             />
//           ))}
//         </div>
//       </div>
      
//       <motion.p
//         className="text-blue-300 mt-12 text-center max-w-lg"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8 }}
//       >
//         Mastered these cards? Try creating a mind map to visualize connections between concepts!
//       </motion.p>
//     </motion.section>
//   );
// }

// // components/ai-learning/DiscussionForum.jsx
// import { motion } from 'framer-motion';
// import { useState } from 'react';

// export default function DiscussionForum() {
//   const [question, setQuestion] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'user',
//       text: 'How does feature selection impact model performance?',
//       timestamp: '3 min ago',
//       likes: 2
//     },
//     {
//       id: 2,
//       type: 'ai',
//       text: 'Feature selection can significantly improve model performance in several ways:\n\n1) It reduces overfitting by eliminating irrelevant features\n2) It improves accuracy by focusing on the most predictive variables\n3) It reduces training time and computational requirements\n4) It enhances model interpretability by simplifying the model',
//       timestamp: '2 min ago',
//       likes: 4
//     }
//   ]);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!question.trim()) return;
    
//     // Add user question
//     const newMessage = {
//       id: messages.length + 1,
//       type: 'user',
//       text: question,
//       timestamp: 'Just now',
//       likes: 0
//     };
    
//     setMessages([...messages, newMessage]);
//     setQuestion('');
    
//     // Simulate AI typing
//     setIsTyping(true);
//     setTimeout(() => {
//       const aiResponse = {
//         id: messages.length + 2,
//         type: 'ai',
//         text: "Based on your question, I can provide these insights:\n\nRegularization techniques like L1 (Lasso) and L2 (Ridge) help prevent overfitting by penalizing model complexity. L1 regularization can perform feature selection by shrinking some coefficients to zero, while L2 regularization reduces the impact of features without eliminating them completely.\n\nThis is particularly useful when dealing with high-dimensional datasets where the risk of overfitting is higher.",
//         timestamp: 'Just now',
//         likes: 0
//       };
      
//       setMessages(prev => [...prev, aiResponse]);
//       setIsTyping(false);
//     }, 3000);
//   };
  
//   const handleLike = (id) => {
//     setMessages(messages.map(msg => 
//       msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
//     ));
//   };
  
//   return (
//     <motion.section
//       className="min-h-screen py-12"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.h2 
//         className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         AI Discussion Forum
//       </motion.h2>
      
//       <p className="text-blue-200 mb-12 text-center max-w-2xl mx-auto">
//         Ask questions and get instant AI responses. Explore complex topics through interactive dialogue.
//       </p>
      
//       {/* Chat Area */}
//       <div className="max-w-3xl mx-auto bg-blue-900/30 rounded-xl p-4 md:p-6 mb-6">
//         <div className="space-y-6 mb-6">
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//               initial={{ opacity: 0, y: 10, x: message.type === 'user' ? 10 : -10 }}
//               animate={{ opacity: 1, y: 0, x: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div 
//                 className={`max-w-xs md:max-w-md rounded-xl p-4 ${
//                   message.type === 'user' 
//                     ? 'bg-blue-600 text-white ml-12' 
//                     : 'bg-indigo-900/80 text-blue-100 mr-12 border border-blue-700/30'
//                 }`}
//               >
//                 {message.type === 'ai' && (
//                   <div className="flex items-center mb-2">
//                     <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                       </svg>
//                     </div>
//                     <span className="text-blue-300 text-sm font-medium">AI Assistant</span>
//                   </div>
//                 )}
                
//                 <p className="whitespace-pre-line">{message.text}</p>
                
//                 <div className="flex justify-between items-center mt-2 text-xs">
//                   <span className={message.type === 'user' ? 'text-blue-200' : 'text-blue-400'}>
//                     {message.timestamp}
//                   </span>
                  
//                   <button 
//                     className={`flex items-center ${message.type === 'user' ? 'text-blue-200' : 'text-blue-400'}`}
//                     onClick={() => handleLike(message.id)}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905C11 6.432 9.432 8 7.5 8H5a2 2 0 00-2 2v10c0 .568.447 1.059 1 1.093m11-6c0 .568-.447 1.059-1 1.093m0 0h-5.656c-.5 0-.905.405-.905.905a3 3 0 01-3 3h0" />
//                     </svg>
//                     {message.likes}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
          
//           {isTyping && (
//             <motion.div
//               className="flex justify-start"
//               initial={{ opacity: 0, y: 10, x: -10 }}
//               animate={{ opacity: 1, y: 0, x: 0 }}
//             >
//               <div className="max-w-xs md:max-w-md rounded-xl p-4 bg-indigo-900/80 text-blue-100 mr-12 border border-blue-700/30">
//                 <div className="flex items-center mb-2">
//                   <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                     </svg>
//                   </div>
//                   <span className="text-blue-300 text-sm font-medium">AI Assistant</span>
//                 </div>
                
//                 <div className="flex space-x-2">
//                   <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
//                   <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
        
//         {/* Input Area */}
//         <form onSubmit={handleSubmit} className="flex">
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Ask a question about your learning material..."
//             className="flex-1 bg-blue-800/30 border border-blue-700/50 rounded-l-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-500 rounded-r-lg px-4 py-3 text-white transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </form>
//       </div>
      
//       <motion.p 
//         className="text-blue-300/70 text-center text-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.6 }}
//       >
//         Questions and responses are not stored permanently. This is a simulated discussion.
//       </motion.p>
//     </motion.section>
//   );
// }

// // components/ai-learning/MindMapGenerator.jsx
// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';

// export default function MindMapGenerator({ aiSummary }) {
//   const [expandedNodes, setExpandedNodes] = useState({});
//   const [hoveredNode, setHoveredNode] = useState(null);
  
//   const toggleNode = (id) => {
//     setExpandedNodes(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };
  
//   // Create mindmap from AI summary
//   const generateMindMap = () => {
//     if (!aiSummary) return { nodes: [], links: [] };
    
//     const nodes = [
//       { id: 'root', label: 'Machine Learning', x: 400, y: 150, level: 0 }
//     ];
    
//     const links = [];
    
//     // Add main concept nodes
//     let nodeId = 1;
//     Object.keys(aiSummary.concepts).forEach((concept, index) => {
//       const angle = (Math.PI * 2 / Object.keys(aiSummary.concepts).length) * index - Math.PI / 2;
//       const radius = 150;
//       const x = 400 + Math.cos(angle) * radius;
//       const y = 150 + Math.sin(angle) * radius;
      
//       const id = `node-${nodeId}`;
//       nodes.push({ id, label: concept, x, y, level: 1, parentId: 'root' });
//       links.push({ source: 'root', target: id, value: 1 });
      
//       // Add subconcept nodes
//       aiSummary.concepts[concept].forEach((subconcept, subIndex) => {
//         nodeId++;
//         const subAngle = angle - Math.PI/8 + (Math.PI/4 / aiSummary.concepts[concept].length) * subIndex;
//         const subRadius = 100;
//         const subX = x + Math.cos(subAngle) * subRadius;
//         const subY = y + Math.sin(subAngle) * subRadius;
        
//         const subId = `node-${nodeId}`;
//         nodes.push({ id: subId, label: subconcept, x: subX, y: subY, level: 2, parentId: id });
//         links.push({ source: id, target: subId, value: 1 });
//       });
      
//       nodeId++;
//     });
    
//     return { nodes, links };
//   };
  
//   const { nodes, links } = generateMindMap();
  
//   // Calculate positions based on expanded state
//   const calculatePositions = () => {
//     // This would contain more complex logic for dynamic node positioning
//     // based on which nodes are expanded
//     return nodes;
//   };
  
//   const displayNodes = calculatePositions();
  
//   return (
//     <motion.section
//       className="min-h-screen py-12"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.h2 
//         className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         AI-Generated Mind Map
//       </motion.h2>
      
//       <p className="text-blue-200 mb-12 text-center max-w-2xl mx-auto">
//         Visualize connections between concepts with this interactive mind map. Click on nodes to expand subtopics.
//       </p>
      
//       {/* Mind Map Canvas */}
//       <div className="relative w-full h-96 md:h-[32rem] max-w-4xl mx-auto bg-blue-900/30 rounded-xl overflow-hidden border border-blue-800/50 mb-8">
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-br from-blue-900/0 to-indigo-900/40"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         />
        
//         {/* Links */}
//         <svg className="absolute inset-0 w-full h-full">
//           {links.map((link, index) => {
//             const source = nodes.find(n => n.id === link.source);
//             const target = nodes.find(n => n.id === link.target);
            
//             // Only show links to visible nodes
//             if (target.level === 2 && !expandedNodes[target.parentId]) return null;
            
//             return (
//               <motion.line
//                 key={`${link.source}-${link.target}`}
//                 x1={source.x}
//                 y1={source.y}
//                 x2={target.x}
//                 y2={target.y}
//                 stroke={hoveredNode === source.id || hoveredNode === target.id ? "#60A5FA" : "#2563EB"}
//                 strokeWidth={hoveredNode === source.id || hoveredNode === target.id ? 2 : 1}
//                 strokeOpacity={0.6}
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 transition={{ 
//                   duration: 0.8, 
//                   delay: 0.2 + (index * 0.05),
//                   type: "spring"
//                 }}
//               />
//             );
//           })}
//         </svg>
        
//         {/* Nodes */}
//         {nodes.map((node) => {
//           // Hide level 2 nodes if parent not expanded
//           if (node.level === 2 && !expandedNodes[node.parentId]) return null;
          
//           return (
//             <motion.div
//               key={node.id}
//               className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
//                 node.level === 0 
//                   ? 'bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2' 
//                   : node.level === 1 
//                     ? 'bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-1.5' 
//                     : 'bg-gradient-to-r from-blue-700 to-indigo-800 px-2 py-1'
//               } rounded-lg shadow-lg ${hoveredNode === node.id ? 'shadow-blue-400/30' : ''}`}
//               style={{ left: node.x, top: node.y }}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ 
//                 opacity: 1, 
//                 scale: 1,
//                 boxShadow: hoveredNode === node.id 
//                   ? '0 0 15px 5px rgba(59, 130, 246, 0.3)' 
//                   : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//               }}
//               transition={{ 
//                 duration: 0.5, 
//                 delay: 0.3 + (node.level * 0.2),
//                 type: "spring"
//               }}
//               onClick={() => toggleNode(node.id)}
//               onMouseEnter={() => setHoveredNode(node.id)}
//               onMouseLeave={() => setHoveredNode(null)}
//             >
//               <div className="text-white text-sm font-medium whitespace-nowrap">
//                 {node.label}
//                 {node.level < 2 && (
//                   <span className="ml-1 text-xs">
//                     {expandedNodes[node.id] ? '−' : '+'}
//                   </span>
//                 )}
//               </div>
//               <motion.div
//                 className="absolute -inset-1 bg-blue-400 rounded-lg blur opacity-0 pointer-events-none"
//                 animate={{ 
//                   opacity: hoveredNode === node.id ? 0.2 : 0,
//                 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </motion.div>
//           );
//         })}
//       </div>
      
//       <motion.p 
//         className="text-blue-300 text-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8 }}
//       >
//         Pro Tip: Click on concepts to expand or collapse related subtopics
//       </motion.p>
//     </motion.section>
//   );
// }

// Create a file for each component and import them in the main page file