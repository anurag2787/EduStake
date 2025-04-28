// Dashboard.jsx - Main dashboard component
'use client'
import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext'; // Adjust the import based on your project structure
import {
    User,
    LogOut,
    Award,
    Book,
    ChevronRight,
    Edit3,
    Copy,
    ArrowRight,
    Play,
    Database,
    Code,
    Globe,
    TrendingUp,
    Bookmark,
    Terminal,
    FileCode,
    Clock,
    Layers
} from 'lucide-react';
import { SiCplusplus, SiHtml5, SiC } from "react-icons/si";
import { FaPython, FaReact } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "@/auth";

const Dashboard = () => {
    const { user, logOut } = useAuth();
    const router = useRouter();
    const handleSignOut = async () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (!confirmed) {
            return;
        }
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.push("/login");
          }
        });
        return () => unsubscribe();
      }, [user, router]);

    // Mock userdemo data - this would come from your Firebase/backend
    const [userdemo, setUser] = useState({
        name: "Alex Johnson",
        email: "alex@example.com",
        walletAddress: "0x7c2C195CD6D34B8F845992d380aADB2730bB9C6F",
        profilePicture: "",
        totalRewards: 250,
        quizzesCompleted: 7,
        refundStatus: "80% Eligible"
    });

    // console.log(user);
    useEffect(() => {
        if (user) {
            setUser({
                ...userdemo,
                name: user.displayName || "Alex Johnson",
                email: user.email || "copy@gmail.com",
                profilePicture: user.photoURL,
            });
        }
    }, [user]);

    useEffect(() => {
        console.log(userdemo.profilePicture); // Now you can track updated value
    }, [userdemo.profilePicture]);

    // Mock courses data
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "C++ Programming",
            image: "/api/placeholder/100/60",
            progress: 75,
            lastAccessed: "2 days ago"
        },
        {
            id: 2,
            title: "C Programming",
            image: "/api/placeholder/100/60",
            progress: 45,
            lastAccessed: "Yesterday"
        },
        {
            id: 3,
            title: "Python Basics",
            image: "/api/placeholder/100/60",
            progress: 20,
            lastAccessed: "1 week ago"
        },
        {
            id: 4,
            title: "Web Development",
            image: "/api/placeholder/100/60",
            progress: 10,
            lastAccessed: "Just started"
        }
    ]);

    const [rewards, setRewards] = useState([
        { id: 1, type: "Quiz Completion", amount: 50, date: "Apr 22" },
        { id: 2, type: "Streak Bonus", amount: 75, date: "Apr 20" },
        { id: 3, type: "Module Completion", amount: 125, date: "Apr 15" }
    ]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 20px rgba(0, 140, 255, 0.2)",
            borderColor: "rgba(100, 180, 255, 0.7)",
            transition: { type: "spring", stiffness: 300, damping: 15 }
        }
    };

    const truncateWalletAddress = (address) => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Animation counters for rewards
    const [countedRewards, setCountedRewards] = useState(0);

    useEffect(() => {
        // Animate the number counting up
        const duration = 1500; // ms
        const frameRate = 30; // fps
        const totalFrames = duration * frameRate / 1000;
        const increment = userdemo.totalRewards / totalFrames;

        let currentCount = 0;
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            currentCount += increment;

            if (frame <= totalFrames) {
                setCountedRewards(Math.floor(currentCount));
            } else {
                setCountedRewards(userdemo.totalRewards);
                clearInterval(counter);
            }
        }, 1000 / frameRate);

        return () => clearInterval(counter);
    }, [userdemo.totalRewards]);

    const [copied, setCopied] = useState(false);

    const copyWalletAddress = () => {
        navigator.clipboard.writeText(userdemo.walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
            {/* Background gradient effect */}
            <div className="mt-23 inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black pointer-events-none" />

            {/* Top Navigation */}
            <header className="mb-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg mr-2 shadow-md shadow-blue-500/20">
                        <BookOpen size={20} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                        EduStake
                    </span>
                </div>

                <button onClick={handleSignOut} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-all">
                    <LogOut size={16} />
                    <span className="inline">Log Out</span>
                </button>
            </header>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {/* Profile Section */}
                <motion.section
                    variants={itemVariants}
                    whileHover="hover"
                    // variants={cardHoverVariants}
                    className="col-span-1 bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg shadow-blue-500/20">
                                {userdemo.profilePicture && (
                                    <img
                                        src={userdemo.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                )}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-4">{userdemo.name}</h2>
                        <p className="text-gray-400">{userdemo.email}</p>

                        <div className="mt-4 w-full p-3 bg-gray-700/50 rounded-lg flex items-center justify-between">
                            <div className="truncate text-xs text-gray-300">
                                {truncateWalletAddress(userdemo.walletAddress)}
                            </div>
                            <button
                                onClick={copyWalletAddress}
                                className="text-blue-400 hover:text-blue-300"
                            >
                                {copied ? 'Copied!' : <Copy size={16} />}
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 rounded-lg font-medium"
                        >
                            Edit Profile
                        </motion.button>
                    </div>
                </motion.section>

                {/* Active Learning Modules Section */}
                <motion.section
                    variants={itemVariants}
                    className="col-span-1 md:col-span-2 bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Book size={20} className="text-blue-400" />
                            Active Learning Modules
                        </h2>
                        <motion.button
                            whileHover={{ x: 3 }}
                            className="bg-blue-900/30 text-blue-300 text-sm flex items-center gap-1 py-1 px-3 rounded-lg hover:bg-blue-800/40 transition-colors"
                        >
                            View All
                            <ChevronRight size={16} />
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {courses.map((course, index) => (
                            <ImprovedCourseCard key={course.id} course={course} index={index} />
                        ))}
                    </div>
                </motion.section>

                {/* Rewards Section */}
                {/* <motion.section
                    variants={itemVariants}
                    className="col-span-1 md:col-span-2 bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Award size={18} className="text-purple-400" />
                            Rewards & Refunds
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-700/30 shadow-lg"
                        >
                            <p className="text-gray-400 text-sm">Total Rewards</p>
                            <div className="flex items-end gap-1">
                                <h3 className="text-2xl font-bold text-blue-300">{countedRewards}</h3>
                                <span className="text-blue-400 text-sm">TKN</span>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg p-4 border border-purple-700/30 shadow-lg"
                        >
                            <p className="text-gray-400 text-sm">Quizzes Completed</p>
                            <h3 className="text-2xl font-bold text-purple-300">{userdemo.quizzesCompleted}</h3>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-lg p-4 border border-green-700/30 shadow-lg"
                        >
                            <p className="text-gray-400 text-sm">Refund Status</p>
                            <h3 className="text-2xl font-bold text-green-300">{userdemo.refundStatus}</h3>
                        </motion.div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Recent Rewards</h3>
                        <div className="space-y-3">
                            {rewards.map((reward) => (
                                <RewardItem key={reward.id} reward={reward} />
                            ))}
                        </div>
                    </div>
                </motion.section> */}

            </motion.main>
        </div>
    );
};

// Course Card Component

const ImprovedCourseCard = ({ course, index }) => {
    // Get appropriate icon based on programming language/course type
    const getCourseIcon = (title) => {
        if (title.includes("C++ Programming")) return <SiCplusplus size={16} className="text-blue-400" />;
        if (title.includes("C Programming")) return <SiC size={16} className="text-purple-400" />;
        if (title.includes("Python")) return <FaPython size={16} className="text-green-400" />;
        if (title.includes("Web Development")) return < SiHtml5 size={16} className="text-yellow-400" />;
        if (title.includes("React")) return <FaReact size={16} className="text-cyan-400" />;
        return <BookOpen size={16} className="text-blue-400" />;
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            scale: 1.03,
            y: -5,
            transition: { type: "spring", stiffness: 300, damping: 15 }
        }
    };

    // Simplified status text
    const getProgressStatus = (progress) => {
        if (progress < 25) return "Just Started";
        if (progress < 50) return "In Progress";
        if (progress < 75) return "Advancing";
        return "Almost Complete";
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-gray-800/90 rounded-lg overflow-hidden border border-gray-700/70 shadow-lg"
        >
            <div className="p-5">
                {/* Course header with icon */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        {getCourseIcon(course.title)}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">
                            {course.title}
                        </h3>
                        {/* Single time indicator with clock icon */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock size={12} />
                            <span>{course.lastAccessed}</span>
                        </div>
                    </div>
                </div>

                {/* Simple progress bar */}
                <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden mb-3">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (index * 0.1) }}
                    />
                </div>

                {/* Progress indicator */}
                <div className="flex justify-between text-xs mb-4">
                    <span className="text-blue-300">{getProgressStatus(course.progress)}</span>
                    <span className="text-gray-400">{course.progress}% completed</span>
                </div>

                {/* Continue button */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg text-sm font-medium"
                >
                    <Play size={14} />
                    Continue Learning
                </motion.button>
            </div>
        </motion.div>
    );
};

// Reward Item Component
const RewardItem = ({ reward }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/30"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Award size={14} className="text-purple-400" />
                </div>
                <div>
                    <p className="font-medium text-sm">{reward.type}</p>
                    <p className="text-xs text-gray-400">{reward.date}</p>
                </div>
            </div>
            <div className="font-semibold text-blue-300">+{reward.amount} TKN</div>
        </motion.div>
    );
};

// Leaderboard Item Component
const LeaderboardItem = ({ userdemo }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, x: 5 }}
            className={`flex items-center p-3 rounded-lg ${userdemo.isYou ? 'bg-blue-900/30 border border-blue-700/40' : 'bg-gray-700/30 border border-gray-600/30'}`}
        >
            <div className="flex items-center gap-3 flex-1">
                <div className="w-6 text-center font-bold text-sm text-gray-400">#{userdemo.rank}</div>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={userdemo.avatar} alt={userdemo.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-medium text-sm">
                    {userdemo.name} {userdemo.isYou && <span className="text-xs text-blue-400">(You)</span>}
                </p>
            </div>
            <div className="font-semibold text-sm text-purple-300">{userdemo.points} pts</div>
        </motion.div>
    );
};

export default Dashboard;