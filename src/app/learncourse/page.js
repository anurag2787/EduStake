'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle, BookOpen, HelpCircle, MessageSquare, Play } from 'lucide-react';
import Link from 'next/link';
// Import the course data from the JSON file
import courseData from '../../assets/ccourseData.json';

export default function LearnCoursePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId') || "c-programming";
  
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('videos');
  const [showAIChat, setShowAIChat] = useState(false);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    // In a real app, you would fetch the course data based on courseId
    // For the demo, we're using the imported JSON data
    const selectedCourse = courseData[courseId] || courseData["c-programming"];
    setCourse(selectedCourse);
    
    if (selectedCourse && selectedCourse.videos.length > 0) {
      setSelectedVideo(selectedCourse.videos[0]);
    }
    
    // Load progress from localStorage in a real app
    const savedProgress = {};
    setUserProgress(savedProgress);
  }, [courseId]);

  const markVideoCompleted = (videoId) => {
    if (!course) return;
    
    const updatedCourse = {
      ...course,
      videos: course.videos.map(video => 
        video.id === videoId ? { ...video, completed: true } : video
      )
    };
    
    // Calculate progress
    const completedVideos = updatedCourse.videos.filter(v => v.completed).length;
    updatedCourse.progress = Math.round((completedVideos / updatedCourse.videos.length) * 100);
    
    setCourse(updatedCourse);
    
    // In a real app, you would save this to the backend/localStorage
    setUserProgress({
      ...userProgress,
      [videoId]: true
    });
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setShowAIChat(false);
  };

  if (!course || !selectedVideo) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-white text-xl">Loading course content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Header with back button */}
      <header className="bg-transparent backdrop-blur-md border-b border-blue-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href="/studycourse" className="flex items-center text-blue-300 hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Back to Courses</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course title and info with progress */}
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-blue-200">{course.description}</p>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-sm text-blue-300">Course Progress:</div>
              <div className="w-48 bg-blue-900/30 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
              <div className="text-sm font-medium">{course.progress || 0}%</div>
            </motion.div>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2">
          <motion.div 
            className="relative aspect-video bg-black/40 rounded-xl overflow-hidden mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {!showAIChat ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full p-4 flex flex-col">
                <h3 className="text-xl font-bold mb-4">AI Assistant</h3>
                <div className="flex-1 bg-blue-900/20 rounded-lg p-4 overflow-y-auto mb-4">
                  <div className="bg-blue-800/30 rounded-lg p-3 mb-3 max-w-[80%]">
                    <p className="text-sm font-medium mb-1">AI Assistant</p>
                    <p>Hello! I'm your AI learning assistant for this C Programming course. How can I help you today?</p>
                  </div>
                  
                  <div className="bg-blue-600/30 rounded-lg p-3 mb-3 max-w-[80%] ml-auto">
                    <p className="text-sm font-medium mb-1">You</p>
                    <p>Can you explain pointers in a simple way?</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-3 mb-3 max-w-[80%]">
                    <p className="text-sm font-medium mb-1">AI Assistant</p>
                    <p>Sure! Think of pointers like addresses in a city. If variables are houses where data lives, pointers are pieces of paper with addresses written on them. They don't contain the actual data, they just tell you where to find it in computer memory.</p>
                    <p className="mt-2">In C, you create a pointer with the * symbol:</p>
                    <pre className="bg-blue-950/50 p-2 rounded mt-2 overflow-x-auto">
                      int number = 42;<br/>
                      int *pointer = &number; // pointer now "points to" number
                    </pre>
                    <p className="mt-2">Does that help? Would you like me to explain more about how to use them?</p>
                  </div>
                </div>
                
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Ask anything about the course..." 
                    className="flex-1 px-4 py-2 bg-blue-900/30 border border-blue-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                    Send
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-3">{showAIChat ? "AI Assistant" : selectedVideo.title}</h2>
            {!showAIChat && (
              <p className="text-blue-200 mb-4">{selectedVideo.description}</p>
            )}
            
            <div className="flex space-x-3 mt-6">
              {!showAIChat && (
                <motion.button
                  onClick={() => markVideoCompleted(selectedVideo.id)}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Mark as Complete
                </motion.button>
              )}
              
              <motion.button
                onClick={() => setShowAIChat(!showAIChat)}
                className={`flex items-center ${showAIChat ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded-lg transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAIChat ? (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Return to Video
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Ask AI Assistant
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar with video list and tabs */}
        <div className="lg:row-span-2">
          <motion.div 
            className="bg-transparent border border-blue-800 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Tabs */}
            <div className="flex border-b border-blue-800">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 py-3 text-center font-medium text-sm ${
                  activeTab === 'videos' ? 'bg-blue-800/30 text-white' : 'text-blue-300 hover:bg-blue-800/20'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-3 text-center font-medium text-sm ${
                  activeTab === 'quiz' ? 'bg-blue-800/30 text-white' : 'text-blue-300 hover:bg-blue-800/20'
                }`}
              >
                Course Quiz
              </button>
            </div>
            
            {/* Tab content */}
            <div className="max-h-[600px] overflow-y-auto">
              {activeTab === 'videos' && (
                <div className="p-1">
                  {course.videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleVideoSelect(video)}
                      className={`p-3 mb-1 rounded-lg cursor-pointer ${
                        selectedVideo.id === video.id ? 'bg-blue-700/50' : 'hover:bg-blue-800/30'
                      } ${video.completed ? 'border-l-4 border-green-500' : ''}`}
                    >
                      <div className="flex justify-between">
                        <h3 className={`font-medium mb-1 ${video.completed ? 'text-green-400' : 'text-white'}`}>
                          {index + 1}. {video.title}
                        </h3>
                        <span className="text-sm text-blue-300">{video.duration}</span>
                      </div>
                      {video.completed && (
                        <div className="flex items-center text-xs text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
              
              {activeTab === 'quiz' && (
                <div className="p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-blue-800/20 rounded-lg border border-blue-700"
                  >
                    <h3 className="font-medium mb-2">{course.overallQuiz.title}</h3>
                    <p className="text-blue-200 mb-3 text-sm">{course.overallQuiz.description}</p>
                    <div className="flex justify-between text-sm text-blue-300 mb-3">
                      <span>{course.overallQuiz.questions} questions</span>
                      <span>{course.overallQuiz.duration}</span>
                    </div>
                    <motion.button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Quiz
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Help button */}
          <motion.div
            className="mt-6 bg-blue-900/30 border border-blue-700 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-3">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="font-medium">Need Help?</h3>
            </div>
            <p className="text-sm text-blue-200 mb-3">
              Stuck on a concept or having technical issues? Our support team is here to help!
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              Contact Support
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}