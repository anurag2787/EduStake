import React from 'react'
import { motion } from 'framer-motion';
import { Brain, Coins, Award, Star } from 'lucide-react';


function HowItWorksSection() {
    const steps = [
      { number: '1️⃣', title: 'Stake Securely', icon: Coins },
      { number: '2️⃣', title: 'AI-Driven Learning', icon: Brain },
      { number: '3️⃣', title: 'Take AI Quizzes', icon: Award },
      { number: '4️⃣', title: 'Earn Rewards', icon: Star }
    ];
  
    return (
      <div className="bg-gradient-to-br from-[#0D0D0D] to-[#0057FF] py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            How EduStake Works
          </h2>
          <div className="flex justify-between items-center space-x-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                className="text-center"
              >
                <div className="bg-blue-900/30 rounded-full p-4 mb-4 inline-block">
                  <step.icon size={48} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default HowItWorksSection