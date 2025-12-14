import React from "react";
import { Button } from "../components/ui/button";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BackgroundPattern } from "./BackgroundPattern";
import { DotPattern } from "./DotPattern";
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
      "ReactJS • JavaScript • Java • Web3 • Blockchain • Typescript",
      100
    );
  }, []);

  return (
    <section
    id="home"
    className="relative min-h-screen flex items-center bg-white"
  >
    <DotPattern className="absolute inset-0 z-0" />
      {/* Subtle background pattern */}
      {/* <div className="absolute inset-0 z-0 bg-white/10 pointer-events-none"></div> */}


      <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 leading-tight">
              I'm <span className="text-blue-600">Ganesh Kantle </span>
            </h1>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 leading-tight">
              An <span className="text-blue-600">AI Web Developer</span>
            </h1>

            <p
              ref={typingTextRef}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed"
            >
              {/* Content will be filled by typewriter effect */}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToElement("projects")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
              >
                <i className="fas fa-code mr-2"></i> View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open("https://drive.google.com/drive/folders/1uNqBhasvr7ovsl79eEA4_6PkM6cGvN3n?usp=sharing", "_blank")
                }
                className="border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center bg-white hover:bg-gray-50 text-sm sm:text-base"
              >
                <i className="fas fa-download mr-2"></i> Resume
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="bg-white p-2.5 sm:p-3 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 ease-in-out text-gray-600 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <i className={`${link.icon} text-sm sm:text-base`}></i>
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
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-md opacity-40 animate-pulse-slow"></div>
              <div className="relative bg-white border-4 border-blue-200 rounded-full w-full h-full overflow-hidden flex items-center justify-center shadow-lg">
                {/* Replace icon with image */}
                <img
                  src={profilePic}
                  alt="My Photo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 bg-white p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl border border-gray-200 shadow-md"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                <div className="text-blue-600 text-lg sm:text-xl md:text-2xl">
                  <i className="fas fa-laptop-code"></i>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
        <motion.a
          href="#about"
          className="inline-block text-gray-600 hover:text-blue-600 transition-all duration-300 ease-in-out"
          onClick={(e) => {
            e.preventDefault();
            scrollToElement("about");
          }}
          whileHover={{ y: 3 }}
        >
          <span className="block mb-1 text-xs sm:text-sm font-medium">Scroll Down</span>
          <motion.i
            className="fas fa-chevron-down text-sm sm:text-base"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          ></motion.i>
        </motion.a>
      </div>
    </section>
  );
}
