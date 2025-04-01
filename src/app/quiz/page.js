'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Award, RotateCcw, Loader } from 'lucide-react';

const Quiz = ({ courseId, courseTitle, courseContent, courseTopics = [] }) => {
  const [quizState, setQuizState] = useState('intro'); // intro, loading, quiz, results
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [animateScore, setAnimateScore] = useState(0);
  const [generationError, setGenerationError] = useState(null);

  // Generate quiz questions using Gemini API
  const generateQuizQuestions = async () => {
    try {
      setQuizState('loading');
      setGenerationError(null);

      // Prepare the prompt for Gemini with course information
      const prompt = `
        Generate 5 multiple-choice questions for a quiz on the C++ programming course.
        The course covers the following topics: ${(courseTopics || []).join(', ')}.
        
        Here's a summary of the course content:
        ${courseContent?.substring(0, 2000) || ""}...
        
        For each question:
        1. Create a clear question about one of the topics
        2. Provide 4 possible answers (Only one should be correct)
        3. Indicate which answer is correct (0-based index)
        4. Return in JSON format as an array of objects with the structure:
        {
          "question": "Question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correct": 0 // Index of correct answer (0-3)
        }
      `;

      // In a real implementation, this would be an API call to your backend
      // where Gemini API is accessed. For demo purposes, we're simulating the response.
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - in production, this would come from Gemini API
      const mockGeminiResponse = [
        {
          "question": "Which of the following is NOT a fundamental data type in C++?",
          "options": ["int", "float", "string", "char"],
          "correct": 2
        },
        {
          "question": "What is the correct way to declare a pointer variable that points to an integer in C++?",
          "options": ["int ptr;", "pointer int ptr;", "int *ptr;", "int &ptr;"],
          "correct": 2
        },
        {
          "question": "Which C++ loop is guaranteed to execute at least once?",
          "options": ["for loop", "while loop", "do-while loop", "for-each loop"],
          "correct": 2
        },
        {
          "question": "What is the purpose of 'virtual' keyword in C++?",
          "options": [
            "To create a virtual copy of an object", 
            "To enable function overloading", 
            "To force compile-time binding", 
            "To enable function overriding and runtime polymorphism"
          ],
          "correct": 3
        },
        {
          "question": "Which operator is used for dynamic memory allocation in C++?",
          "options": ["malloc", "new", "create", "allocate"],
          "correct": 1
        }
      ];
      
      setQuestions(mockGeminiResponse);
      setQuizState('quiz');
      setTimeLeft(30);
    } catch (error) {
      console.error("Error generating quiz questions:", error);
      setGenerationError("Failed to generate quiz questions. Please try again.");
      setQuizState('intro');
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizState === 'quiz' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizState === 'quiz') {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizState]);

  // Score animation effect
  useEffect(() => {
    let scoreTimer;
    if (quizState === 'results' && animateScore < getScorePercentage()) {
      scoreTimer = setTimeout(() => setAnimateScore(prev => prev + 1), 50);
    }
    return () => clearTimeout(scoreTimer);
  }, [animateScore, quizState]);

  const startQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      generateQuizQuestions();
      setLoading(false);
    }, 1000);
  };

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correct;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setTimeLeft(30);
      }, 500);
    } else {
      setQuizState('results');
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const retryQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnimateScore(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    startQuiz();
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const renderIntroSection = () => (
    <motion.div 
      className="flex flex-col items-center justify-center text-center p-8 space-y-8 mt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
        animate={{ 
          textShadow: ["0 0 5px #4299e1", "0 0 15px #4299e1", "0 0 5px #4299e1"], 
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Test Your C++ Knowledge & Earn Rewards! 🚀
      </motion.h1>
      
      <p className="text-lg text-gray-300 max-w-2xl">
        Answer correctly, earn back your staked amount, and get extra rewards!
      </p>
      
      <motion.div 
        className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-blue-900/30 p-6 rounded-xl border border-blue-500/50 shadow-lg overflow-hidden relative"
        whileHover={{ 
          boxShadow: "0 0 20px rgba(66, 153, 225, 0.4)",
          borderColor: "rgba(66, 153, 225, 0.8)"
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div 
          className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
          <Award className="mr-2 text-blue-300" size={20} />
          Quiz Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <motion.div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800/50 backdrop-blur-sm"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 64, 175, 0.25)" }}
          >
            <p className="font-medium text-blue-300">Course</p>
            <p className="text-white">{courseTitle || "C++ Programming Fundamentals"}</p>
          </motion.div>
          
          <motion.div className="bg-purple-900/20 p-3 rounded-lg border border-purple-800/50 backdrop-blur-sm"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(126, 34, 206, 0.25)" }}
          >
            <p className="font-medium text-purple-300">Topics Covered</p>
            <p className="text-white text-sm">{courseTopics?.length ? courseTopics.join(', ') : "Variables, Data Types, Control Structures, Functions, Classes, Objects"}</p>
          </motion.div>
          
          <motion.div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-800/50 backdrop-blur-sm"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(79, 70, 229, 0.25)" }}
          >
            <p className="font-medium text-indigo-300">Format</p>
            <div className="flex justify-between text-white">
              <span>5 questions</span>
              <span>Multiple-choice</span>
            </div>
          </motion.div>
          
          <motion.div className="bg-cyan-900/20 p-3 rounded-lg border border-cyan-800/50 backdrop-blur-sm"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(8, 145, 178, 0.25)" }}
          >
            <p className="font-medium text-cyan-300">Requirements</p>
            <div className="flex justify-between text-white">
              <span>30 sec per question</span>
              <span>Pass: 60% (3/5)</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="w-32 h-32 flex items-center justify-center"
        animate={{ 
          rotateY: 360,
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="relative w-24 h-24">
          <motion.div 
            className="absolute inset-0 rounded-full bg-blue-500"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            📝
          </div>
        </div>
      </motion.div>
    
    {generationError && (
      <div className="text-red-400 bg-red-900 bg-opacity-20 p-3 rounded-lg border border-red-700">
        {generationError}
      </div>
    )}
    
    <motion.button
      className="px-8 py-4 text-lg font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={startQuiz}
    >
      {loading ? "Loading Quiz..." : "Start Quiz →"}
    </motion.button>
  </motion.div>
  );

  const renderLoadingSection = () => (
    <motion.div 
      className="flex flex-col items-center justify-center p-12 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-blue-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader size={48} />
      </motion.div>
      <h2 className="text-xl font-medium text-gray-300">
        Generating personalized C++ quiz questions...
      </h2>
      <p className="text-gray-400 max-w-md text-center">
        Our AI is creating challenging questions based on your course content. This will take just a moment.
      </p>
    </motion.div>
  );

  const renderQuizSection = () => (
    <motion.div 
      className="w-full max-w-3xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-300">Question {currentQuestion + 1}/{questions.length}</span>
        
        <div className="relative h-12 w-12">
          <svg className="w-full h-full" viewBox="0 0 24 24">
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="2"
            />
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke={timeLeft <= 5 ? "#f56565" : "#4299e1"}
              strokeWidth="2"
              strokeDasharray="62.83"
              strokeDashoffset={62.83 * (1 - timeLeft / 30)}
              strokeLinecap="round"
              animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
              transition={timeLeft <= 5 ? { 
                duration: 0.5, 
                repeat: timeLeft,
                repeatType: "loop"
              } : {}}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-blue-400'}`}>
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion}
          className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-blue-900 shadow-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ 
            boxShadow: '0 0 10px rgba(66, 153, 225, 0.3)' 
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            {questions[currentQuestion]?.question}
          </h2>
          
          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswer === index
                    ? isAnswerCorrect
                      ? 'bg-green-900 bg-opacity-30 border-green-500'
                      : 'bg-red-900 bg-opacity-30 border-red-500'
                    : 'bg-gray-800 bg-opacity-50 border-gray-700 hover:border-blue-500'
                }`}
                whileHover={{ 
                  scale: selectedAnswer === null ? 1.02 : 1,
                  boxShadow: selectedAnswer === null ? '0 0 5px rgba(66, 153, 225, 0.5)' : 'none'
                }}
                whileTap={{ 
                  scale: selectedAnswer === null ? 0.98 : 1
                }}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer === index && (
                    isAnswerCorrect ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      >
                        <CheckCircle className="text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                        transition={{ 
                          scale: { type: 'spring', stiffness: 500, damping: 15 },
                          rotate: { duration: 0.3, times: [0, 0.3, 0.6, 1] }
                        }}
                      >
                        <XCircle className="text-red-500" />
                      </motion.div>
                    )
                  )}
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between">
            <motion.button
              className="px-4 py-2 text-sm text-gray-400 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkipQuestion}
            >
              Skip Question
            </motion.button>
            
            <motion.button
              className={`px-6 py-2 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white ${
                selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              whileHover={{ 
                scale: selectedAnswer !== null ? 1.05 : 1,
                boxShadow: selectedAnswer !== null ? '0 0 10px rgba(66, 153, 225, 0.5)' : 'none'
              }}
              whileTap={{ 
                scale: selectedAnswer !== null ? 0.95 : 1
              }}
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              Next Question
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  const renderResultsSection = () => {
    const scorePercentage = getScorePercentage();
    const isPerfectScore = scorePercentage === 100;
    const isPassing = scorePercentage >= 60;
    
    return (
      <motion.div 
        className="w-full max-w-3xl mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl p-8 border border-blue-900 shadow-xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ 
            boxShadow: '0 0 15px rgba(66, 153, 225, 0.4)' 
          }}
        >
          <motion.h2 
            className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            animate={{ 
              textShadow: ["0 0 3px #4299e1", "0 0 8px #4299e1", "0 0 3px #4299e1"], 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Quiz Completed! 🎉 Here's Your Score
          </motion.h2>
          
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.div 
              className={`w-40 h-40 rounded-full flex items-center justify-center text-3xl font-bold ${
                isPerfectScore 
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                  : isPassing 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-br from-gray-600 to-gray-800'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: isPerfectScore ? 360 : 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20,
                duration: 1
              }}
            >
              <span className="text-white">
                {animateScore}%
              </span>
            </motion.div>
            
            {isPerfectScore && (
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <Award size={48} className="text-yellow-400" />
              </motion.div>
            )}
            
            <motion.div 
              className={`text-center p-6 rounded-lg border-2 ${
                isPerfectScore 
                  ? 'border-yellow-500 bg-yellow-900 bg-opacity-20' 
                  : isPassing 
                    ? 'border-blue-500 bg-blue-900 bg-opacity-20' 
                    : 'border-gray-500 bg-gray-800 bg-opacity-30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {isPerfectScore ? (
                <p className="text-lg font-medium text-yellow-300">
                  🏆 Perfect Score! You got your refund + bonus reward tokens!
                </p>
              ) : isPassing ? (
                <p className="text-lg font-medium text-blue-300">
                  🎉 Congratulations! You passed & earned a full refund!
                </p>
              ) : (
                <motion.p 
                  className="text-lg font-medium text-gray-300"
                  animate={{ x: [0, -10, 10, -10, 10, 0] }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  😢 Keep Learning! Try again to earn your refund.
                </motion.p>
              )}
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {isPassing ? (
                <motion.button
                  className="px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(66, 153, 225, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Claim Refund
                </motion.button>
              ) : (
                <motion.button
                  className="px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(66, 153, 225, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 0px rgba(66, 153, 225, 0.3)',
                      '0 0 15px rgba(66, 153, 225, 0.6)',
                      '0 0 0px rgba(66, 153, 225, 0.3)'
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  onClick={retryQuiz}
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw size={16} />
                    Try Again
                  </span>
                </motion.button>
              )}
            </div>
            
            <div className="text-gray-400 text-sm mt-4">
              Score breakdown: {score} correct out of {questions.length} questions
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      {quizState === 'intro' && renderIntroSection()}
      {quizState === 'loading' && renderLoadingSection()}
      {quizState === 'quiz' && renderQuizSection()}
      {quizState === 'results' && renderResultsSection()}
    </div>
  );
};

// Default props for demo purposes
Quiz.defaultProps = {
  courseId: 'cpp-fundamentals-101',
  courseTitle: 'C++ Programming Fundamentals',
  courseTopics: [
    'Variables & Data Types', 
    'Control Structures', 
    'Functions', 
    'Pointers', 
    'Object-Oriented Programming',
    'Memory Management'
  ],
  courseContent: `
    This comprehensive C++ course covers everything from basic syntax to advanced concepts.
    
    Module 1: Introduction to C++
    - History and evolution of C++
    - Setting up your development environment
    - Writing your first C++ program
    - Basic syntax and structure
    
    Module 2: Variables and Data Types
    - Primitive data types (int, float, char, bool)
    - Variables and constants
    - Type conversion and casting
    - Operators and expressions
    
    Module 3: Control Structures
    - Conditional statements (if, else, switch)
    - Loops (for, while, do-while)
    - Break and continue statements
    - Nested control structures
    
    Module 4: Functions
    - Function declaration and definition
    - Parameters and return values
    - Function overloading
    - Default parameters
    
    Module 5: Arrays and Strings
    - Array declaration and initialization
    - Multi-dimensional arrays
    - C-style strings vs string class
    - String manipulation
    
    Module 6: Pointers and References
    - Pointer declaration and initialization
    - Pointer arithmetic
    - Dynamic memory allocation
    - References vs pointers
    
    Module 7: Object-Oriented Programming
    - Classes and objects
    - Encapsulation, inheritance, polymorphism
    - Constructors and destructors
    - Access specifiers
    
    Module 8: Memory Management
    - Stack vs Heap memory
    - new and delete operators
    - Memory leaks and how to avoid them
    - Smart pointers
  `
};

export default Quiz;