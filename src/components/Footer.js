import React from 'react'
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
function Footer (){
    const socialIcons = [Twitter, Linkedin, Github];
  
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            {['Home', 'About', 'Courses', 'Contact'].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="block py-2 hover:text-blue-400 transition"
              >
                {link}
              </a>
            ))}
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p>support@edustake.com</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialIcons.map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };

export default Footer