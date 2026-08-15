import React, { useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { DotPattern } from "./DotPattern";
import { setupTypewriterEffect, scrollToElement } from "../lib/utils";
import { easeOutExpo } from "../lib/motion";
import profilePic from "../img/profile.jpg";
import "../index.css";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/ganeshkantle",
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
  const sectionRef = useRef<HTMLElement>(null);
  const typingTextRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    setupTypewriterEffect(
      typingTextRef.current,
      "Java • Spring Boot • WIX Studio • ReactJS • Web3 • Blockchain ",
      100
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      <DotPattern className="absolute inset-0 z-0" />

      <motion.div
        className="container mx-auto relative z-10"
        style={prefersReducedMotion ? undefined : { opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            style={prefersReducedMotion ? undefined : { y: textY }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4 leading-tight"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 32, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: easeOutExpo }}
            >
              I'm <span className="text-primary">Ganesh Kantle </span>
            </motion.h1>
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4 leading-tight"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOutExpo }}
            >
              An <span className="text-primary">AI Web Developer</span>
            </motion.h1>

            <p
              ref={typingTextRef}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed"
            />

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: easeOutExpo }}
            >
              <Button
                size="lg"
                onClick={() => scrollToElement("projects")}
                className="bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center text-sm sm:text-base"
              >
                <i className="fas fa-code mr-2"></i> View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/drive/folders/1uNqBhasvr7ovsl79eEA4_6PkM6cGvN3n?usp=sharing",
                    "_blank"
                  )
                }
                className="border-2 border-border text-muted-foreground hover:border-primary/40 hover:text-primary font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center bg-card hover:bg-muted text-sm sm:text-base"
              >
                <i className="fas fa-download mr-2"></i> Resume
              </Button>
            </motion.div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="bg-card p-2.5 sm:p-3 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out text-muted-foreground border border-border hover:border-primary/40 shadow-sm hover:shadow-md"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + index * 0.08, type: "spring", stiffness: 220 }}
                  whileHover={{ scale: 1.12, y: -2 }}
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
            style={
              prefersReducedMotion
                ? undefined
                : { y: imageY, scale: imageScale }
            }
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOutExpo }}
          >
            <motion.div
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
              animate={
                prefersReducedMotion ? undefined : { y: [0, -12, 0] }
              }
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-muted blur-md opacity-50" />
              <div className="relative bg-card border-4 border-primary/20 rounded-full w-full h-full overflow-hidden flex items-center justify-center shadow-lg">
                <img
                  src={profilePic}
                  alt="My Photo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 bg-card p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl border border-border shadow-md"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { rotate: [0, 5, 0, -5, 0] }
                }
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                <div className="text-primary text-lg sm:text-xl md:text-2xl">
                  <i className="fas fa-laptop-code"></i>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
        <motion.a
          href="#about"
          className="inline-block text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out"
          onClick={(e) => {
            e.preventDefault();
            scrollToElement("about");
          }}
          whileHover={{ y: 3 }}
        >
          <span className="block mb-1 text-xs sm:text-sm font-medium">
            Scroll Down
          </span>
          <motion.i
            className="fas fa-chevron-down text-sm sm:text-base"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.a>
      </div>
    </section>
  );
}
