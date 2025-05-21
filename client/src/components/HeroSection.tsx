import React from "react";
import { Button } from "../components/ui/button";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { setupTypewriterEffect, scrollToElement } from "../lib/utils";
import profilePic from "../img/profile.jpg";
import "../index.css";
const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/ganesh-kantle",
  },
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://www.github.com/ganeshkantle",
  },
  {
    name: "LeetCode",
    icon: "fas fa-code",
    url: "https://leetcode.com/u/ganeshkantle",
  },
];

export default function HeroSection() {
  const typingTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setupTypewriterEffect(
      typingTextRef.current,
      "ReactJS • JavaScript • Java • Web3 • Blockchain",
      100
    );
  }, []);

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden"
    >
      {/* Matrix-like background */}
      <div className="absolute inset-0 z-0 matrix-bg before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-background/90 before:to-background/99 before:z-[1]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-4">
              I'm <span className="text-primary">Frontend Developer</span>
            </h1>

            <p
              ref={typingTextRef}
              className="text-xl text-muted-foreground mb-6 font-mono"
            >
              {/* Content will be filled by typewriter effect */}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => scrollToElement("projects")}
                className="bg-primary hover:bg-primary/90 text-white font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center"
              >
                <i className="fas fa-code mr-2"></i> View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open("https://drive.google.com/drive/folders/1uNqBhasvr7ovsl79eEA4_6PkM6cGvN3n?usp=sharing", "_blank")
                }
                className="border-primary text-primary font-bold transition-all transform hover:scale-105 hover:shadow-lg flex items-center no-hover-orange"
              >
                <i className="fas fa-download mr-2"></i> Resume
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="bg-card p-3 rounded-full hover:bg-primary/20 hover:text-primary transition-all text-muted-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <i className={link.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-[#8B5CF6] blur-md opacity-20 animate-pulse-slow"></div>
              <div className="relative bg-card border-4 border-primary/30 rounded-full w-full h-full overflow-hidden flex items-center justify-center">
                {/* Replace icon with image */}
                <img
                  src={profilePic}
                  alt="My Photo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 bg-card p-3 rounded-lg border border-border shadow-lg"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                <div className="text-primary text-xl">
                  <i className="fas fa-laptop-code"></i>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-10">
        <motion.a
          href="#about"
          className="inline-block text-muted-foreground hover:text-primary transition-colors"
          onClick={(e) => {
            e.preventDefault();
            scrollToElement("about");
          }}
          whileHover={{ y: 3 }}
        >
          <span className="block mb-1 text-sm">Scroll Down</span>
          <motion.i
            className="fas fa-chevron-down"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          ></motion.i>
        </motion.a>
      </div>
    </section>
  );
}
