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
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    // Mock userdemo data - this would come from your Firebase/backend
    const [userdemo, setUser] = useState({
        name: "Alex Johnson",
        email: "alex@example.com",
        walletAddress: "0x7c2C195CD6D34B8F845992d380aADB2730bB9C6F",
        profilePicture: "hello",
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
                email:user.email || "copy@gmail.com",
                profilePicture:user.photoURL,
            });
            console.log(userdemo.profilePicture);
        }
    }, [user]);

    // Mock courses data
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "Blockchain Fundamentals",
            image: "/api/placeholder/100/60",
            progress: 75,
            lastAccessed: "2 days ago"
        },
        {
            id: 2,
            title: "Smart Contract Development",
            image: "/api/placeholder/100/60",
            progress: 45,
            lastAccessed: "Yesterday"
        },
        {
            id: 3,
            title: "Web3 Integration",
            image: "/api/placeholder/100/60",
            progress: 20,
            lastAccessed: "1 week ago"
        },
        {
            id: 4,
            title: "DeFi Applications",
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

                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-all">
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Log Out</span>
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
                                <img
                                    src={userdemo.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-lg"
                            >
                                <Edit3 size={14} />
                            </motion.button>
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
                                {copied ? 'Copied!' : <Copy size={14} />}
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
                            <Book size={18} className="text-blue-400" />
                            Active Learning Modules
                        </h2>
                        <button className="text-blue-400 text-sm flex items-center">
                            View All
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {courses.map((course, index) => (
                            <CourseCard key={course.id} course={course} index={index} />
                        ))}
                    </div>
                </motion.section>

                {/* Rewards Section */}
                <motion.section
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
                </motion.section>

                {/* Leaderboard Section */}
                <motion.section
                    variants={itemVariants}
                    className="col-span-1 bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Leaderboard</h2>
                        <span className="text-xs text-gray-400">This Week</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            { rank: 1, name: "Sophia Kim", points: 450, avatar: "/api/placeholder/32/32" },
                            { rank: 2, name: "James Chen", points: 380, avatar: "/api/placeholder/32/32" },
                            { rank: 3, name: "Alex Johnson", points: 320, avatar: "/api/placeholder/32/32", isYou: true },
                            { rank: 4, name: "Mia Wong", points: 290, avatar: "/api/placeholder/32/32" },
                            { rank: 5, name: "David Park", points: 260, avatar: "/api/placeholder/32/32" }
                        ].map((userdemo) => (
                            <LeaderboardItem key={userdemo.rank} userdemo={userdemo} />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full bg-gradient-to-r from-blue-800/50 to-purple-800/50 py-2 rounded-lg font-medium border border-blue-700/30 text-sm flex items-center justify-center gap-2"
                    >
                        View Full Leaderboard
                        <ArrowRight size={14} />
                    </motion.button>
                </motion.section>
            </motion.main>
        </div>
    );
};

// Course Card Component
const CourseCard = ({ course, index }) => {
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

    return (
        <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-gray-700/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-600/50 shadow-lg"
        >
            <div className="relative h-24 overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-300">{course.lastAccessed}</span>
                    <span className="text-xs font-medium text-blue-300">{course.progress}%</span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>

                <div className="relative h-2 bg-gray-600 rounded-full overflow-hidden mb-4">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (index * 0.1) }}
                    />
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-white/20 rounded-full blur-sm"
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress - 5}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + (index * 0.1) }}
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600/50 hover:bg-blue-500/60 py-2 rounded text-sm font-medium transition-all"
                >
                    Continue Learning
                    <ChevronRight size={14} />
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