'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
              About EduStake
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Revolutionizing education through AI-powered learning experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                At EduStake, we believe that every learner deserves access to personalized, 
                intelligent education. Our platform combines cutting-edge AI technology with 
                proven educational methodologies to create learning experiences that adapt 
                to each student&apos;s unique needs.
              </p>
              <p className="text-lg text-blue-100">
                We&apos;re committed to making quality education accessible, engaging, and effective 
                for learners worldwide, regardless of their background or learning style.
              </p>
            </motion.div>
            <motion.div
              className="bg-blue-900/30 p-8 rounded-2xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Why Choose EduStake?</h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  AI-powered personalized learning paths
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Interactive content and assessments
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Real-time progress tracking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Community-driven learning
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-blue-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            What Makes Us Different
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Learning",
                description: "Our advanced AI analyzes your learning patterns and creates personalized study plans.",
                icon: "🤖"
              },
              {
                title: "Interactive Content",
                description: "Engage with dynamic content, quizzes, and hands-on projects designed for your level.",
                icon: "🎯"
              },
              {
                title: "Progress Tracking",
                description: "Monitor your growth with detailed analytics and achievement milestones.",
                icon: "📊"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-blue-900/20 p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-300 mb-3">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-300 mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-blue-200 mb-8">
              Join thousands of learners who are already experiencing the future of education.
            </p>
            <motion.a
              href="/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-white font-bold text-lg shadow-lg shadow-blue-600/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
