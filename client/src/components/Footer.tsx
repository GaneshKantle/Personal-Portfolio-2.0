import React from "react";

import { motion } from "framer-motion";
import { scrollToElement } from "../lib/utils";
import { DotPattern } from "./DotPattern";

const socialLinks = [
  { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/ganeshkantle", label: "LinkedIn" },
  { icon: "fab fa-github", url: "https://www.github.com/ganeshkantle", label: "GitHub" },
  { icon: "fab fa-twitter", url: "https://www.x.com/ganeshkantle", label: "Twitter" },
  { icon: "fas fa-code", url: "https://leetcode.com/u/ganeshkantle/", label: "Leet Code" },
  { icon: "fab fa-instagram", url: "https://www.instagram.com/ganeshkantle", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background py-8 sm:py-12">
      <DotPattern />
      <div className="page-shell relative z-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start">
              <span className="mr-1 text-lg font-semibold text-primary sm:text-xl">&lt;</span>
              <span className="text-lg font-semibold text-foreground sm:text-xl">GaneshKantle</span>
              <span className="ml-1 text-lg font-semibold text-primary sm:text-xl">/&gt;</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">AI Web Developer • Web3 Explorer • Tech Writer</p>
          </div>
          
          <div className="mb-0 flex space-x-4 sm:space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                className="touch-target flex items-center justify-center text-lg text-muted-foreground transition-all duration-300 ease-in-out hover:text-primary sm:text-xl"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
          
          <div className="text-center text-xs text-muted-foreground sm:text-sm lg:text-right">
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
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-primary hover:bg-primary/90 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform transition-all duration-300 ease-in-out hover:scale-[1.02] z-10 isolate"
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
