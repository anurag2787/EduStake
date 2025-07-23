'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, BookOpen } from 'lucide-react';
import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/90 text-white/80 py-6 border-t border-gray-800">
      <div className="container mx-auto px-6">
        {/* Top section with logo and links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-blue-600/20 p-1.5 rounded-md mr-2">
              <BookOpen size={18} className="text-blue-400" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              EduStake
            </span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Courses", path: "/studycourse" },
              { name: "FAQ", path: "/contact/faq" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-sm hover:text-blue-400 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex space-x-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="bg-gray-800 hover:bg-blue-500 text-white/70 hover:text-white p-2 rounded-full transition-colors duration-300"
            >
              <Twitter size={16} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="bg-gray-800 hover:bg-blue-500 text-white/70 hover:text-white p-2 rounded-full transition-colors duration-300"
            >
              <Linkedin size={16} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              className="bg-gray-800 hover:bg-blue-500 text-white/70 hover:text-white p-2 rounded-full transition-colors duration-300"
            >
              <Github size={16} />
            </motion.a>
          </div>
        </div>

        {/* Bottom section with copyright and additional links */}
        <div className="pt-4 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div>
            © {currentYear} EduStake. All rights reserved.
          </div>

          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;