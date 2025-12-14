import React from "react";

import { motion } from "framer-motion";
import { scrollToElement } from "../lib/utils";

const socialLinks = [
  { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/ganesh-kantle", label: "LinkedIn" },
  { icon: "fab fa-github", url: "https://www.github.com/ganeshkantle", label: "GitHub" },
  { icon: "fab fa-twitter", url: "https://www.x.com/ganeshkantle", label: "Twitter" },
  { icon: "fas fa-code", url: "https://leetcode.com/u/ganeshkantle/", label: "Leet Code" },
  { icon: "fab fa-instagram", url: "https://www.instagram.com/_.ganesshhh_", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 bg-white border-t border-gray-200">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-lg sm:text-xl font-semibold text-blue-600 mr-1">&lt;</span>
              <span className="text-lg sm:text-xl font-semibold text-gray-900">GaneshKantle</span>
              <span className="text-lg sm:text-xl font-semibold text-blue-600 ml-1">/&gt;</span>
            </div>
            <p className="text-gray-600 mt-2 text-xs sm:text-sm">AI Web Developer • Web3 Explorer • Tech Writer</p>
          </div>
          
          <div className="flex space-x-4 sm:space-x-6 mb-6 md:mb-0">
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                className="text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out text-lg sm:text-xl"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
          
          <div className="text-gray-600 text-xs sm:text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Ganesh Kantle. All rights reserved.
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </footer>
  );
}

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button 
      onClick={scrollToTop}
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform transition-all duration-300 ease-in-out hover:scale-[1.02] z-10 isolate"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up text-sm sm:text-base"></i>
    </motion.button>
  );  
}
