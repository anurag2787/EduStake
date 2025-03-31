'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function UserUploads({ fileUploaded, setFileUploaded, setAiSummary, setActiveSection }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  const handleFileUpload = (files) => {
    setError(null);
    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
      return;
    }

    setFileUploaded(file);
  };

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const extractTextFromFile = async (file) => {
    return new Promise((resolve, reject) => {
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Failed to read text file'));
        reader.readAsText(file);
      } else {
        // For all other file types, we'll send as base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result.split(',')[1]; // Remove the data URL prefix
          resolve({
            content: base64,
            mimeType: file.type
          });
        };
        reader.onerror = (e) => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      }
    });
  };

  const callGeminiAPI = async (fileContent) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gemini-summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: fileContent,
          filename: fileUploaded.name,
          generateFlashcards: true,  // New parameter to request flashcards
          generateMindMap: true      // New parameter to request mind map data
        }),
      });

      const responseText = await response.text(); // First get as text

      if (!response.ok) {
        // Try to parse error JSON, fallback to response text
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || `API error: ${response.status}`;
        } catch {
          errorMessage = responseText || `API error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      // Try to parse successful response
      try {
        return JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!fileUploaded) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Extract content from file
      let fileContent;
      if (fileUploaded.type === 'text/plain') {
        // For text files, send as plain text
        fileContent = await extractTextFromFile(fileUploaded);
      } else {
        // For other files, send as base64 with mimeType
        fileContent = await extractTextFromFile(fileUploaded);
      }

      // Call Gemini API with the content
      const geminiResponse = await callGeminiAPI(fileContent);

      // Parse and set the AI summary with additional data for flashcards and mind map
      setAiSummary({
        title: fileUploaded.name.split('.')[0],
        summary: geminiResponse.summary,
        keyPoints: geminiResponse.keyPoints,
        concepts: geminiResponse.concepts || {}, // Ensure concepts exists
        flashcards: geminiResponse.flashcards || [], // Add flashcards array
        mindMapData: geminiResponse.mindMapData || {} // Add mind map data
      });

      // Switch to summary view
      setActiveSection('summary');
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err.message || 'Failed to process file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-blue-300 mb-12 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Upload Your Learning Material
      </motion.h2>

      <motion.div
        className={`w-full max-w-xl border-2 border-dashed rounded-lg p-12 mx-auto flex flex-col items-center justify-center relative ${isDragging ? 'border-blue-400 bg-blue-900/20' : 'border-blue-700 bg-blue-900/10'}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        whileHover={{ boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.3)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg pointer-events-none"></div>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>

        <p className="text-blue-200 mb-6 text-center text-lg">Drag & drop your file here or <span className="text-blue-400 cursor-pointer">browse</span></p>

        <p className="text-blue-300/60 text-sm mb-2">Supports PDF, DOCX, TXT, JPG, PNG</p>

        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFileUpload(e.target.files)}
          accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
        />
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-4 p-4 bg-red-900/50 rounded-lg max-w-xl w-full text-red-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Preview */}
      <AnimatePresence>
        {fileUploaded && (
          <motion.div
            className="mt-8 p-4 bg-blue-900/50 rounded-lg max-w-xl w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-700/50 rounded-md mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-200 truncate">
                  {fileUploaded.name}
                </p>
                <p className="text-xs text-blue-400">
                  {(fileUploaded.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                className="text-blue-400 hover:text-blue-200"
                onClick={() => setFileUploaded(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summarize Button */}
      <motion.button
        className={`mt-8 px-8 py-4 rounded-full text-white text-lg font-bold shadow-lg ${fileUploaded ? 'bg-gradient-to-r from-blue-600 to-indigo-700 shadow-blue-600/30 cursor-pointer' : 'bg-blue-800/50 cursor-not-allowed'}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={fileUploaded ? {
          scale: 1.05,
          boxShadow: '0 0 20px 5px rgba(37, 99, 235, 0.5)',
        } : {}}
        whileTap={fileUploaded ? { scale: 0.98 } : {}}
        onClick={handleSubmit}
        disabled={!fileUploaded || isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Summarize Now"
        )}
      </motion.button>
    </motion.section>
  );
}