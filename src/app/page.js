'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Vault, 
  Star, 
  BookOpen, 
  Coins, 
  Brain, 
  Award, 
  Twitter, 
  Linkedin, 
  Github 
} from 'lucide-react';
import Showcase from '@/components/Showcase';
import HowItWorksSection from '@/components/HowItWorksSection';
import HeroSection from '@/components/HeroSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

// // Hero Section
// const HeroSection = () => {
//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#0057FF] text-white overflow-hidden">
//       {/* Subtle Floating Particles (Simulated with CSS) */}
//       <div className="absolute inset-0 opacity-30">
//         {[...Array(20)].map((_, i) => (
//           <div 
//             key={i} 
//             className="absolute bg-white/20 rounded-full animate-float"
//             style={{
//               width: `${Math.random() * 10}px`,
//               height: `${Math.random() * 10}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 pt-24 text-center relative z-10">
//         <motion.h1 
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-6xl font-bold mb-6"
//         >
//           Learn with <span className="text-blue-400">Confidence</span>, 
//           Earn with <span className="text-blue-400">Knowledge</span>!
//         </motion.h1>

//         <p className="text-xl mb-8 max-w-2xl mx-auto">
//           Stake your amount, Learn with AI, Get rewarded for mastering topics!
//         </p>

//         <div className="flex justify-center space-x-4 mb-8">
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
//           >
//             Start Learning
//           </motion.button>
//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
//           >
//             Explore Courses
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // Features Section
// const Showcase = () => {
//   const features = [
//     {
//       icon: Brain,
//       title: 'AI-Powered Learning',
//       description: 'AI summarizes & explains concepts'
//     },
//     {
//       icon: Coins,
//       title: 'Web3 Staking',
//       description: 'Stake coins & get refunded on success'
//     },
//     {
//       icon: Award,
//       title: 'AI Quizzes & Rewards',
//       description: 'Pass quizzes to earn bonuses'
//     },
//     {
//       icon: BookOpen,
//       title: 'Flexible Learning',
//       description: 'Upload PDFs, Images for AI analysis'
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-[#0D0D0D] to-[#0057FF] py-16 text-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-12">
//           Why EduStake is Different
//         </h2>
//         <div className="grid md:grid-cols-4 gap-6">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.2 }}
//               whileHover={{ scale: 1.05 }}
//               className="bg-gray-800 border border-blue-600/30 rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500 transition"
//             >
//               <feature.icon size={48} className="mx-auto mb-4 text-blue-400" />
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-300">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // How It Works Section
// const HowItWorksSection = () => {
//   const steps = [
//     { number: '1️⃣', title: 'Stake Securely', icon: Coins },
//     { number: '2️⃣', title: 'AI-Driven Learning', icon: Brain },
//     { number: '3️⃣', title: 'Take AI Quizzes', icon: Award },
//     { number: '4️⃣', title: 'Earn Rewards', icon: Star }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-[#0D0D0D] to-[#0057FF] py-16 text-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-12">
//           How EduStake Works
//         </h2>
//         <div className="flex justify-between items-center space-x-4">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.3 }}
//               className="text-center"
//             >
//               <div className="bg-blue-900/30 rounded-full p-4 mb-4 inline-block">
//                 <step.icon size={48} className="text-blue-400" />
//               </div>
//               <h3 className="text-xl font-semibold">{step.title}</h3>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Final CTA Section
// const CTASection = () => {
//   return (
//     <div className="bg-gradient-to-br from-[#0D0D0D] to-[#0057FF] text-white py-16">
//       <div className="container mx-auto px-4 text-center">
//         <motion.h2
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-4xl font-bold mb-6"
//         >
//           Don't Just Learn, Earn Your Knowledge!
//         </motion.h2>
//         <div className="flex justify-center space-x-4">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition"
//           >
//             Sign Up & Start Learning
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="border border-white/50 text-white px-8 py-4 rounded-full hover:bg-white/10 transition"
//           >
//             Explore Free Content
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Footer Section
// const Footer = () => {
//   const socialIcons = [Twitter, Linkedin, Github];

//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
//         <div>
//           <h4 className="text-xl font-bold mb-4">Quick Links</h4>
//           {['Home', 'About', 'Courses', 'Contact'].map((link) => (
//             <a 
//               key={link} 
//               href="#" 
//               className="block py-2 hover:text-blue-400 transition"
//             >
//               {link}
//             </a>
//           ))}
//         </div>
//         <div>
//           <h4 className="text-xl font-bold mb-4">Contact</h4>
//           <p>support@edustake.com</p>
//         </div>
//         <div>
//           <h4 className="text-xl font-bold mb-4">Follow Us</h4>
//           <div className="flex space-x-4">
//             {socialIcons.map((Icon, index) => (
//               <motion.a
//                 key={index}
//                 href="#"
//                 whileHover={{ scale: 1.2, rotate: 5 }}
//                 className="text-blue-400 hover:text-blue-300 transition"
//               >
//                 <Icon size={24} />
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// Main Homepage Component

export default function HomePage() {
  return (
    <div className="bg-gray-950 text-white h-screen">
      <HeroSection />
      <Showcase />
      <HowItWorksSection/>
      <CTASection />
      <Footer />
    </div>
  );
}