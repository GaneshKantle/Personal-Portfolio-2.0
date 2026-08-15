import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, Stagger, StaggerItem } from "./motion/ScrollReveal";
import { fadeInScale, popIn, viewportOnce } from "../lib/motion";

const aboutCards = [
  { icon: "fas fa-code", title: "AI Web Dev", color: "text-primary" },
  {
    icon: "fas fa-laptop-code",
    title: "Web3 Explorer",
    color: "text-green-600",
  },
  { icon: "fas fa-pen-fancy", title: "Tech Writer", color: "text-purple-600" },
  { icon: "fas fa-users", title: "Team Player", color: "text-primary" },
];

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <motion.div
              className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full origin-center"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.1 }}
            />
          </ScrollReveal>

          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal variants={fadeInScale}>
              <motion.div
                className="p-4 sm:p-6 md:p-8 bg-card rounded-xl sm:rounded-2xl shadow-sm border border-border mb-8 sm:mb-10 transform-gpu hover:shadow-md transition-all duration-300 ease-in-out"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { rotateX: 5, rotateY: 5, scale: 1.02 }
                }
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)",
                  }}
                >
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                    I'm an AI web developer who builds fast, responsive
                    interfaces with React, TypeScript, and Java. I ship
                    production-ready client work and keep pushing into Web3 —
                    blockchain, Solidity, and the tooling that connects apps to
                    the chain.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                    Outside of shipping features, I write about what I'm
                    learning and contribute to open-source. I care about clear
                    UX, clean code, and products people actually want to use.
                  </p>
                </motion.div>
              </motion.div>
            </ScrollReveal>

            <Stagger
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8"
              stagger={0.1}
            >
              {aboutCards.map((card) => (
                <StaggerItem key={card.title} variants={popIn}>
                  <motion.div
                    className="bg-card p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 ease-in-out h-full"
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -8, scale: 1.04 }
                    }
                  >
                    <div className={`text-2xl sm:text-3xl ${card.color} mb-2`}>
                      <i className={card.icon}></i>
                    </div>
                    <h3 className="font-semibold text-foreground text-xs sm:text-sm">
                      {card.title}
                    </h3>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}
