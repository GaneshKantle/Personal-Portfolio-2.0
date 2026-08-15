import React, { useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PageShell } from "./layout/PageShell";
import { DotPattern } from "./DotPattern";
import { setupTypewriterEffect, scrollToElement } from "../lib/utils";
import { easeOutExpo } from "../lib/motion";
import profilePic from "../img/profile.jpg";

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

  // Single light parallax — opacity + y only
  const textY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const isNarrow = window.matchMedia("(max-width: 474px)").matches;
    setupTypewriterEffect(
      typingTextRef.current,
      isNarrow
        ? "Java • Spring Boot • React • Web3 "
        : "Java • Spring Boot • WIX Studio • ReactJS • Web3 • Blockchain ",
      100
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background"
      style={{ paddingTop: "var(--nav-offset)" }}
    >
      <DotPattern />
      <motion.div
        className="relative z-10 w-full"
        style={prefersReducedMotion ? undefined : { opacity }}
      >
        <PageShell>
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 3xl:gap-16">
            <motion.div
              className="order-2 text-center lg:order-1 lg:text-left"
              style={prefersReducedMotion ? undefined : { y: textY }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <motion.h1
                className="text-display mb-3 font-semibold tracking-tight text-foreground sm:mb-4"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
              >
                I'm <span className="text-primary">Ganesh Kantle </span>
              </motion.h1>
              <motion.h2
                className="text-title mb-3 font-semibold tracking-tight text-foreground sm:mb-4"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
              >
                An <span className="text-primary">AI Web Developer</span>
              </motion.h2>

              <p
                ref={typingTextRef}
                className="mb-4 text-base leading-relaxed text-muted-foreground sm:mb-6 sm:text-lg md:text-xl"
              />

              <motion.div
                className="mb-6 flex flex-col justify-center gap-3 sm:mb-8 sm:flex-row sm:gap-4 lg:justify-start"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: easeOutExpo }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToElement("projects")}
                  className="flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-primary/90 hover:shadow-md sm:px-8 sm:py-3 sm:text-base"
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
                  className="flex items-center justify-center rounded-full border-2 border-border bg-card px-6 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary/40 hover:bg-muted hover:text-primary hover:shadow-md sm:px-8 sm:py-3 sm:text-base"
                >
                  <i className="fas fa-download mr-2"></i> Resume
                </Button>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    className="touch-target flex items-center justify-center rounded-full border border-border bg-card p-2.5 text-muted-foreground shadow-sm transition-all duration-300 ease-in-out hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-md sm:p-3"
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.06,
                      type: "spring",
                      stiffness: 220,
                    }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.name}
                  >
                    <i className={`${link.icon} text-sm sm:text-base`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="order-1 flex justify-center lg:order-2"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.12, ease: easeOutExpo }}
            >
              <motion.div
                className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80 3xl:h-96 3xl:w-96"
                animate={
                  prefersReducedMotion ? undefined : { y: [0, -10, 0] }
                }
                transition={{
                  repeat: Infinity,
                  duration: 3.2,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-muted opacity-50 blur-md" />
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-primary/20 bg-card shadow-lg">
                  <img
                    src={profilePic}
                    alt="My Photo"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 rounded-xl border border-border bg-card p-2 shadow-md sm:-bottom-3 sm:-right-3 sm:rounded-2xl sm:p-2.5 md:-bottom-4 md:-right-4 md:p-3">
                  <div className="text-lg text-primary sm:text-xl md:text-2xl">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </PageShell>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transform text-center sm:bottom-6">
        <motion.a
          href="#about"
          className="inline-block text-muted-foreground transition-all duration-300 ease-in-out hover:text-primary"
          onClick={(e) => {
            e.preventDefault();
            scrollToElement("about");
          }}
          whileHover={{ y: 3 }}
        >
          <span className="mb-1 block text-xs font-medium sm:text-sm">
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
