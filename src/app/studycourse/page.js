'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, X } from 'lucide-react';
import { FaPython, FaJava, FaReact, FaChartLine, FaBusinessTime } from "react-icons/fa";
import { SiCplusplus, SiHtml5, SiJavascript } from "react-icons/si";
import { GiMoneyStack } from "react-icons/gi";
import { MdBusinessCenter, MdOutlineAnalytics } from "react-icons/md";
import { SiC } from "react-icons/si";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Ensure this is correctly imported";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

// Sample course data
const courseCategories = [
  {
    id: "programming",
    name: "Programming 🖥️",
    courses: [
      {
        id: "c-programming",
        title: "C Programming",
        icon: <SiC />,
        description: "Learn the fundamentals of C programming language",
        fullDescription: "Master the C programming language from basics to advanced concepts. This course covers variables, loops, functions, pointers, and memory management.",
        topics: ["Introduction to C", "Data Types & Variables", "Control Structures", "Functions", "Pointers & Memory"],
        duration: "4 weeks",
        stakeAmount: "50 EDST",
        difficulty: "Beginner",
      },
      {
        id: "cpp",
        title: "C++ Programming",
        icon: <SiCplusplus />,
        description: "Object-oriented programming with C++",
        fullDescription: "Build upon your C knowledge and learn object-oriented programming with C++. This course covers classes, inheritance, polymorphism, and STL.",
        topics: ["C++ Basics", "Classes & Objects", "Inheritance", "Polymorphism", "Standard Template Library"],
        duration: "6 weeks",
        stakeAmount: "75 EDST",
        difficulty: "Intermediate",
      },
      {
        id: "java",
        title: "Java",
        icon: <FaJava />,
        description: "Platform-independent programming with Java",
        fullDescription: "Learn Java programming language for cross-platform development. This course covers core Java concepts, OOP principles, and basic GUI development.",
        topics: ["Java Syntax", "Object-Oriented Programming", "Exception Handling", "Collections Framework", "GUI with Swing"],
        duration: "8 weeks",
        stakeAmount: "80 EDST",
        difficulty: "Intermediate",
      },
      {
        id: "python-basics",
        title: "Python Basics",
        icon: <FaPython />,
        description: "Start your programming journey with Python",
        fullDescription: "Begin your programming journey with Python, one of the most beginner-friendly languages. Learn syntax, data structures, and basic algorithms.",
        topics: ["Python Syntax", "Data Types", "Control Flow", "Functions", "Basic Data Structures"],
        duration: "3 weeks",
        stakeAmount: "40 EDST",
        difficulty: "Beginner",
      },
      {
        id: "web-dev",
        title: "Web Development",
        icon: <SiHtml5 />,
        description: "Build responsive websites with HTML, CSS, and JavaScript",
        fullDescription: "Master the fundamentals of web development. Learn to create responsive, interactive websites using HTML, CSS, and JavaScript.",
        topics: ["HTML5 Fundamentals", "CSS Styling & Layout", "JavaScript Basics", "DOM Manipulation", "Responsive Design"],
        duration: "5 weeks",
        stakeAmount: "60 EDST",
        difficulty: "Beginner",
      },
      {
        id: "react",
        title: "React.js",
        icon: <FaReact />,
        description: "Build modern user interfaces with React",
        fullDescription: "Learn to build modern, component-based user interfaces with React. This course covers components, state management, hooks, and routing.",
        topics: ["React Components", "Props & State", "Hooks", "Context API", "React Router"],
        duration: "6 weeks",
        stakeAmount: "70 EDST",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    id: "business",
    name: "Business 💼",
    courses: [
      {
        id: "entrepreneurship",
        title: "Entrepreneurship",
        icon: <MdBusinessCenter />,
        description: "Learn how to launch and grow your business",
        fullDescription: "Discover how to identify opportunities, develop business models, and build successful ventures. This course covers all aspects of entrepreneurship.",
        topics: ["Ideation & Opportunity", "Business Model Canvas", "Market Research", "Funding Strategies", "Growth Hacking"],
        duration: "8 weeks",
        stakeAmount: "100 EDST",
        difficulty: "Intermediate",
      },
      {
        id: "marketing-basics",
        title: "Marketing Basics",
        icon: "📣",
        description: "Learn fundamental marketing principles and strategies",
        fullDescription: "Master the essentials of marketing from market research to campaign execution. Learn how to reach your target audience effectively.",
        topics: ["Marketing Fundamentals", "Target Audience Analysis", "Brand Positioning", "Marketing Mix", "Digital Marketing Intro"],
        duration: "4 weeks",
        stakeAmount: "60 EDST",
        difficulty: "Beginner",
      },
      {
        id: "business-analytics",
        title: "Business Analytics",
        icon: <MdOutlineAnalytics />,
        description: "Data-driven decision making for business",
        fullDescription: "Learn how to use data to make better business decisions. This course covers data collection, analysis, visualization, and interpretation.",
        topics: ["Data Collection Methods", "Statistical Analysis", "Data Visualization", "Business Intelligence Tools", "Predictive Analytics"],
        duration: "6 weeks",
        stakeAmount: "80 EDST",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    id: "finance",
    name: "Finance 📊",
    courses: [
      {
        id: "personal-finance",
        title: "Personal Finance",
        icon: <GiMoneyStack />,
        description: "Take control of your financial future",
        fullDescription: "Learn how to manage your money effectively, build wealth, and achieve financial independence. This course covers budgeting, saving, investing, and more.",
        topics: ["Budgeting Basics", "Debt Management", "Emergency Funds", "Retirement Planning", "Tax Strategies"],
        duration: "4 weeks",
        stakeAmount: "50 EDST",
        difficulty: "Beginner",
      },
      {
        id: "stock-market",
        title: "Stock Market Basics",
        icon: <FaChartLine />,
        description: "Learn how to invest in stocks and equities",
        fullDescription: "Understand how the stock market works and develop strategies for successful investing. This course covers stock analysis, portfolio management, and risk assessment.",
        topics: ["Stock Market Fundamentals", "Technical Analysis", "Fundamental Analysis", "Portfolio Theory", "Risk Management"],
        duration: "6 weeks",
        stakeAmount: "75 EDST",
        difficulty: "Intermediate",
      },
      {
        id: "crypto-investing",
        title: "Crypto Investing",
        icon: "🪙",
        description: "Navigate the world of cryptocurrency investments",
        fullDescription: "Learn the fundamentals of blockchain technology and cryptocurrency investing. This course covers different cryptocurrencies, trading strategies, and security best practices.",
        topics: ["Blockchain Fundamentals", "Cryptocurrency Types", "Trading Platforms", "Investment Strategies", "Security & Storage"],
        duration: "5 weeks",
        stakeAmount: "90 EDST",
        difficulty: "Intermediate",
      },
    ],
  },
];

export default function CourseSelectionPage() {
  const [activeCategory, setActiveCategory] = useState('programming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('popularity');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { user } = useAuth();


  useEffect(() => {
    if (!user?.uid) return;
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PUBLIC_BACKEND_URL}/api/courses/allenroll`, {
          params: { userId: user?.uid } // adjust based on your user object
        });

        console.log(response.data.courses);
        setEnrolledCourses(response.data.courses);
      } catch (err) {
        console.log(err.response?.data?.message || 'Something went wrong');
      }
    };

    if (user?.uid) {
      fetchEnrolledCourses();
    }
  }, [user?.uid]);

  const handlelearning = async (courseId) => {
    if (!user) {
      alert("Please login to continue learning.");
      router.push("/login");
      return;
    }
    const stakeAmountStr = typeof courseId.stakeAmount === 'number' ? courseId.stakeAmount.toString() : courseId.stakeAmount;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_PUBLIC_BACKEND_URL}/api/courses/enroll`,
        {
          userId: user.uid,
          courseId: courseId.id, // Ensure courseId is an object with id property
          stakeAmount: stakeAmountStr, // Ensure stakeAmount exists
        }
      );
      console.log(user.uid, courseId.id, stakeAmountStr);

      // Only show success if request was successful
      toast.success("Enrollment successful!", {
        position: "top-right"
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/learncourse?id=${courseId.id}`);
    } catch (error) {
      console.error('Enrollment error:', error);

      // Show error message to user
      toast.error(`Enrollment failed: ${error.response?.data?.message || error.message}`, {
        position: "top-right"
      });
    }
  };

  const filteredCourses = courseCategories
    .find(category => category.id === activeCategory)
    ?.courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Sort courses based on selected filter
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (selectedFilter === 'duration') {
      return parseInt(a.duration) - parseInt(b.duration);
    } else if (selectedFilter === 'difficulty') {
      const difficultyRank = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      return difficultyRank[a.difficulty] - difficultyRank[b.difficulty];
    }
    // Default: sort by popularity (just using array order for this example)
    return 0;
  });

  const openCourseModal = (course) => {
    setSelectedCourse(course);
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-transparent text-white">
        <Head>
          <title>EduStake - Course Selection</title>
          <meta name="description" content="Choose your learning path at EduStake" />
        </Head>

        {/* Hero Section */}
        <section className="relative py-16 px-4 md:px-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 relative mt-36"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Choose Your Learning Path 🚀
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-200 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Stake Your Knowledge, Learn with AI, and Get Rewarded!
            </motion.p>

            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full flex items-center mx-auto"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="ml-2" />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-transparent">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent blur-3xl"></div>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 pb-16">
          {/* Search & Filtering */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <motion.div
              className="relative w-full md:w-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-300" />
              </div>
              <motion.input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 bg-blue-900/30 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                animate={isExpanded ? { width: "100%" } : { width: "100%" }}
                onFocus={() => setIsExpanded(true)}
                onBlur={() => setIsExpanded(false)}
              />
            </motion.div>
            {/* For future filter as we don't have enough details now */}
            {/* <motion.div 
            className="relative w-full md:w-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full md:w-48 p-3 bg-blue-900/30 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none"
            >
              <option value="popularity">Popularity</option>
              <option value="duration">Duration</option>
              <option value="difficulty">Difficulty</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronRight className="h-5 w-5 text-blue-300 transform rotate-90" />
            </div>
          </motion.div> */}


          </div>

          {/* Course Categories (Tabs) */}
          <motion.div
            className="mb-8 overflow-x-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >

            <div className="flex space-x-1 md:space-x-4 border-b border-blue-700">
              {courseCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-3 text-sm md:text-base font-medium relative whitespace-nowrap ${activeCategory === category.id ? 'text-white' : 'text-blue-300 hover:text-white'
                    }`}
                >
                  {category.name}
                  {activeCategory === category.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

          </motion.div>

          {/* Course Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence>
              {sortedCourses.map((course, index) => {
                const isEnrolled = enrolledCourses.includes(course.id); // Check if enrolled

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                      transition: { duration: 0.3 }
                    }}
                    className="bg-gradient-to-br bg-transparent backdrop-blur-xl rounded-xl overflow-hidden border border-blue-700/50"
                  >
                    <div
                      className="p-6 cursor-pointer h-full flex flex-col"
                      onClick={() => {
                        if (isEnrolled) {
                          router.push(`/learncourse?id=${course.id}`);
                        } else {
                          openCourseModal(course);
                        }
                      }}
                    >
                      <div className="text-3xl mb-4">{course.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-blue-200 mb-4 flex-grow">{course.description}</p>

                      <button
                        className={`mt-auto ${isEnrolled ? 'bg-green-800 hover:bg-green-900' : 'bg-blue-600 hover:bg-blue-700'
                          } text-white font-medium py-2 px-4 rounded-lg transition-colors`}
                      >
                        {isEnrolled ? 'View Course' : 'Enroll Now'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}

            </AnimatePresence>
          </motion.div>

          {/* Course Details Modal */}
          <AnimatePresence>
            {selectedCourse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              >
                <motion.div
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeCourseModal}
                />

                <motion.div
                  className="bg-transparent border-blue-700/50 rounded-xl w-full max-w-2xl z-10 overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center">
                        <span className="text-4xl mr-4">{selectedCourse.icon}</span>
                        <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                      </div>
                      <button
                        onClick={closeCourseModal}
                        className="text-blue-300 hover:text-white"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <p className="text-blue-100 mb-6">{selectedCourse.fullDescription}</p>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Topics Covered:</h3>
                      <ul className="list-disc pl-5 text-blue-200 space-y-1">
                        {selectedCourse.topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-blue-900/30 p-4 rounded-lg">
                        <h4 className="text-sm text-blue-300 mb-1">Duration</h4>
                        <p className="font-medium">{selectedCourse.duration}</p>
                      </div>
                      <div className="bg-blue-900/30 p-4 rounded-lg">
                        <h4 className="text-sm text-blue-300 mb-1">Stake Amount</h4>
                        <p className="font-medium">{selectedCourse.stakeAmount}</p>
                      </div>
                    </div>

                    <motion.button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 15px rgba(37, 99, 235, 0.7)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlelearning(selectedCourse)}
                    >
                      Start Learning
                      <ChevronRight className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Motivational Quote Section */}
        <motion.div
          className="py-6 bg-transparent overflow-hidden border-t border-b border-blue-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear"
            }}
            className="whitespace-nowrap text-xl md:text-2xl font-medium text-blue-200"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                times: [0, 0.5, 1],
                repeatDelay: 1
              }}
              className="inline-block mx-2"
            >
              Commit to Learning.
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                times: [0, 0.5, 1],
                repeatDelay: 1,
                delay: 0.7
              }}
              className="inline-block mx-2"
            >
              Stay Focused.
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                times: [0, 0.5, 1],
                repeatDelay: 1,
                delay: 1.4
              }}
              className="inline-block mx-2"
            >
              Your Success is Staked!
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}