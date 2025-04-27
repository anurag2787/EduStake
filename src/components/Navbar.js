'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, User, LogIn } from 'lucide-react';
import Link from "next/link";
import { useAuth } from '@/context/AuthContext'; 
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useAuth(); // Get user from auth context

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled
      setIsScrolled(currentScrollY > 10);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed left-0 right-0 z-50 transition-all duration-300 mt-4 mx-4`}
        >
          <div className={`max-w-7xl mx-auto rounded-full px-4 py-2 ${isScrolled ? 'bg-black/50 backdrop-blur-lg shadow-lg shadow-blue-900/20' : 'bg-black/30 backdrop-blur-md'
            }`}>
            <div className="flex justify-between items-center h-16">
              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-2 rounded-full hover:bg-blue-900/30 focus:outline-none"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Left menu items - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/#features" className="text-white/90 hover:text-blue-400 transition-colors text-sm font-medium">
                  Features
                </Link>
                <Link href="/#how-it-works" className="text-white/90 hover:text-blue-400 transition-colors text-sm font-medium">
                  How It Works
                </Link>
              </div>

              {/* Logo (centered) */}
              <div className="flex items-center">
                <motion.a
                  href="/"
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg mr-2 shadow-md shadow-blue-500/20">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    EduStake
                  </span>
                </motion.a>
              </div>

              {/* Right menu items - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="/studycourse" className="text-white/90 hover:text-blue-400 transition-colors text-sm font-medium">Courses</a>
                
                {/* Conditional auth button */}
                {user ? (
                  <motion.a
                    href="/profile"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 text-sm font-medium"
                  >
                    <User size={16} />
                    Profile
                  </motion.a>
                ) : (
                  <motion.a
                    href="/login"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 text-sm font-medium"
                  >
                    <LogIn size={16} />
                    Login
                  </motion.a>
                )}
                
                {/* <motion.a
                  href="#connect"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 text-sm font-medium"
                >
                  Connect Wallet
                </motion.a> */}
              </div>

              {/* Empty div to balance the mobile menu button */}
              <div className="flex md:hidden">
                <div className="w-10"></div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-black/70 backdrop-blur-lg rounded-3xl mt-2 mx-auto max-w-7xl overflow-hidden shadow-lg shadow-blue-900/20"
              >
                <div className="px-6 py-5 space-y-3">
                  <Link
                    href="/#features"
                    className="block text-white/90 hover:text-blue-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                  >
                    Features
                  </Link>

                  <Link
                    href="/#how-it-works"
                    className="block text-white/90 hover:text-blue-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                  >
                    How It Works
                  </Link>
                  <a href="/studycourse" className="block text-white/90 hover:text-blue-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5">
                    Courses
                  </a>
                  
                  {/* Conditional auth button for mobile */}
                  {user ? (
                    <a href="/profile" className="flex items-center gap-2 text-white/90 hover:text-blue-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5">
                      <User size={16} />
                      Profile
                    </a>
                  ) : (
                    <a href="/login" className="flex items-center gap-2 text-white/90 hover:text-blue-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5">
                      <LogIn size={16} />
                      Login
                    </a>
                  )}
                  
                  <a href="#connect" className="block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition text-center mt-4">
                    Connect Wallet
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default Navbar;