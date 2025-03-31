'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUploader } from 'react-drag-drop-files';

// Component imports
import HeroSection from '@/app/learn/ai-learning/HeroSection';
import AiSummarySection from '@/app/learn/ai-learning/AiSummarySection';
import UserUploads from '@/app/learn/ai-learning/UserUploads';
import FlashcardCarousel from '@/app/learn/ai-learning/FlashcardCarousel';
import DiscussionForum from '@/app/learn/ai-learning/DiscussionForum';
import MindMapGenerator from '@/app/learn/ai-learning/MindMapGenerator';

export default function AiLearningPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [fileUploaded, setFileUploaded] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [learningStreak, setLearningStreak] = useState(5); // Example streak count
  const [hoveredButton, setHoveredButton] = useState(null);

  // Navigation items with their icons and label names
  const navigationItems = [
    { id: 'hero', icon: '🏠', label: 'Home' },
    { id: 'upload', icon: '📤', label: 'Upload' },
    { id: 'summary', icon: '📝', label: 'Summary' },
    { id: 'flashcards', icon: '🃏', label: 'Flashcards' },
    { id: 'forum', icon: '💬', label: 'Discussion' },
    { id: 'mindmap', icon: '🧠', label: 'Mind Map' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white overflow-hidden">
      {/* Floating AI Ask Button - Always Accessible */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-4 shadow-lg shadow-blue-500/30 z-50"
        whileHover={{ scale: 1.1, boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0.5)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      </motion.button>
      
      {/* Streak Display */}
      <motion.div 
        className="fixed top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full px-4 py-2 flex items-center gap-2 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-lg">🔥</span>
        <span className="font-bold">{learningStreak} day streak</span>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <HeroSection setActiveSection={setActiveSection} />
        
        {/* AI Summary Section */}
        <AnimatePresence>
          {activeSection === 'summary' && (
            <AiSummarySection aiSummary={aiSummary} setAiSummary={setAiSummary} />
          )}
        </AnimatePresence>

        {/* User Uploads */}
        <AnimatePresence>
          {activeSection === 'upload' && (
            <UserUploads fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} setAiSummary={setAiSummary} setActiveSection={setActiveSection} />
          )}
        </AnimatePresence>

        {/* Interactive Flashcards */}
        <AnimatePresence>
          {activeSection === 'flashcards' && (
            <FlashcardCarousel aiSummary={aiSummary} />
          )}
        </AnimatePresence>

        {/* AI Discussion Forum */}
        <AnimatePresence>
          {activeSection === 'forum' && (
            <DiscussionForum />
          )}
        </AnimatePresence>

        {/* Auto-Generated Mind Maps */}
        <AnimatePresence>
          {activeSection === 'mindmap' && (
            <MindMapGenerator aiSummary={aiSummary} />
          )}
        </AnimatePresence>

        {/* Navigation Pills */}
        <motion.div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-900/80 backdrop-blur-md rounded-full px-4 py-3 flex gap-4 shadow-lg z-40"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {navigationItems.map((item) => (
            <div key={item.id} className="relative">
              <motion.button
                onClick={() => setActiveSection(item.id)}
                className={`rounded-full p-2 ${activeSection === item.id ? 'bg-blue-500 text-white' : 'text-blue-300 hover:text-white'}`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredButton(item.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span>{item.icon}</span>
              </motion.button>
              
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredButton === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -5 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap pointer-events-none"
                  >
                    {item.label}
                    {/* Small triangle pointer */}
                    <div className="absolute w-2 h-2 bg-blue-600 transform rotate-45 left-1/2 -ml-1 bottom-0 translate-y-1/2"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}