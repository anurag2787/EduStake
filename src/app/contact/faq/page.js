'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is EduStake?",
          answer: "EduStake is an AI-powered learning platform that provides personalized education experiences. We use cutting-edge technology to create adaptive learning paths, interactive content, and intelligent assessments that adjust to your learning style and pace."
        },
        {
          question: "How do I create an account?",
          answer: "Creating an account is simple! Click the 'Login' button in the top navigation, then select 'Sign Up' on the login page. You can register with your email address or use social login options like Google or Facebook."
        },
        {
          question: "Is EduStake free to use?",
          answer: "EduStake offers both free and premium plans. The free plan includes access to basic courses and features. Premium plans unlock advanced AI features, unlimited course access, personalized learning paths, and priority support."
        },
        {
          question: "What devices can I use to access EduStake?",
          answer: "EduStake is fully responsive and works on all devices including desktop computers, laptops, tablets, and smartphones. You can access your courses anywhere with an internet connection."
        }
      ]
    },
    {
      category: "Learning Features",
      questions: [
        {
          question: "How does the AI-powered learning work?",
          answer: "Our AI analyzes your learning patterns, progress, and preferences to create personalized study plans. It identifies your strengths and weaknesses, adjusts content difficulty, and recommends the most effective learning resources for your specific needs."
        },
        {
          question: "Can I upload my own study materials?",
          answer: "Yes! You can upload various file types including PDFs, DOCX, TXT, and images. Our AI will analyze your materials and generate summaries, flashcards, mind maps, and interactive quizzes to enhance your learning experience."
        },
        {
          question: "What types of courses are available?",
          answer: "We offer courses in programming (Python, JavaScript, C++, Java, React), finance, cryptocurrency, data science, and many other subjects. Our catalog is continuously expanding with new courses added regularly."
        },
        {
          question: "How do flashcards and mind maps work?",
          answer: "Our AI automatically generates flashcards and mind maps from your study materials. Flashcards help with memorization and quick review, while mind maps visualize connections between concepts to improve understanding and retention."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble uploading files. What should I do?",
          answer: "Make sure your file is under 50MB and in a supported format (PDF, DOCX, TXT, JPG, PNG). If you're still having issues, try refreshing the page or clearing your browser cache. Contact our support team if the problem persists."
        },
        {
          question: "Why is my progress not saving?",
          answer: "Progress is automatically saved as you complete activities. If your progress isn't saving, check your internet connection and ensure you're logged in. If you're using private browsing mode, some features may not work properly."
        },
        {
          question: "The AI summary seems inaccurate. What can I do?",
          answer: "AI summaries are generally accurate but can occasionally make mistakes. You can provide feedback on specific summaries to help improve the system. For important materials, we recommend reviewing the AI-generated content alongside your original materials."
        },
        {
          question: "Can I access my courses offline?",
          answer: "Currently, EduStake requires an internet connection to access most features. We're working on offline capabilities for future releases. You can download certain materials like PDFs for offline review."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "How do I upgrade to a premium plan?",
          answer: "You can upgrade to premium by going to your account settings and selecting 'Upgrade Plan'. We offer monthly and annual subscription options with secure payment processing through Stripe."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time from your account settings. Your premium features will remain active until the end of your current billing period, and you'll retain access to any completed courses."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link via email. Follow the instructions in the email to create a new password."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can update your email address in your account settings. You'll need to verify the new email address before the change takes effect."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "How is my data protected?",
          answer: "We take data security seriously. All data is encrypted in transit and at rest. We use industry-standard security measures and regularly audit our systems. We never sell your personal information to third parties."
        },
        {
          question: "What happens to my uploaded files?",
          answer: "Uploaded files are processed by our AI and then securely stored in encrypted format. You can delete your files at any time from your account. We only use your content to provide the requested learning services."
        },
        {
          question: "Do you share my learning progress with others?",
          answer: "No, your learning progress and personal data are private. We may share aggregated, anonymized statistics for research purposes, but individual user data is never shared without explicit consent."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Find answers to common questions about EduStake and our AI-powered learning platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-6 border-b border-blue-700/50 pb-3">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                  
                  return (
                    <motion.div
                      key={questionIndex}
                      className="bg-blue-900/20 rounded-lg overflow-hidden"
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                      >
                        <h3 className="text-lg font-medium text-blue-200 pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-blue-100 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-blue-900/30 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-blue-200 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg text-white font-medium shadow-lg shadow-blue-600/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.a>
              <motion.a
                href="mailto:support@edustake.com"
                className="inline-flex items-center px-6 py-3 border border-blue-500 rounded-lg text-blue-300 font-medium hover:bg-blue-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
