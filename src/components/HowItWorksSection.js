import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Coins, Award, Star } from 'lucide-react';

function HowItWorksSection() {
  const steps = [
    { 
      number: '1️⃣', 
      title: 'Stake Securely', 
      icon: Coins,
      description: 'Stake your assets securely on our platform with full transparency and control.'
    },
    { 
      number: '2️⃣', 
      title: 'AI-Driven Learning', 
      icon: Brain,
      description: 'Access personalized learning materials powered by advanced AI algorithms.'
    },
    { 
      number: '3️⃣', 
      title: 'Take AI Quizzes', 
      icon: Award,
      description: 'Test your knowledge with adaptive quizzes that adjust to your learning progress.'
    },
    { 
      number: '4️⃣', 
      title: 'Earn Rewards', 
      icon: Star,
      description: 'Get rewarded for your learning achievements with token incentives.'
    }
  ];
  
  return (
    <section id="features" className="bg-transparent py-24 text-white">
      <div  className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            How EduStake Works
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Our platform combines blockchain staking with AI-powered learning to create a rewarding educational experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-[#2e2d2d] to-[#0057FF] backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-8 transition-all duration-300"
            >
              <div className="bg-blue-500/30 rounded-full p-5 mb-6 mx-auto w-20 h-20 flex items-center justify-center">
                <step.icon size={36} className="text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{step.title}</h3>
              <p className="text-blue-200 text-sm mt-3">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
            Start Your Learning Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorksSection;