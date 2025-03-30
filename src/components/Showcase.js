import React from 'react'
import { motion } from 'framer-motion';
import { Brain, Coins, Award, BookOpen } from 'lucide-react';


function Showcase() {
    const features = [
        {
            icon: Brain,
            title: 'AI-Powered Learning',
            description: 'AI summarizes & explains concepts'
        },
        {
            icon: Coins,
            title: 'Web3 Staking',
            description: 'Stake coins & get refunded on success'
        },
        {
            icon: Award,
            title: 'AI Quizzes & Rewards',
            description: 'Pass quizzes to earn bonuses'
        },
        {
            icon: BookOpen,
            title: 'Flexible Learning',
            description: 'Upload PDFs, Images for AI analysis'
        }
    ];

    return (
        <div id="features" className="bg-transparent py-16 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Why EduStake is Different
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-[#3b3737] to-[#0652e8] backdrop-blur-sm border-blue-600/30 rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500 hover:-translate-y-4 transition-all duration-300"
                        >
                            <feature.icon size={48} className="mx-auto mb-4 text-blue-400" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Showcase