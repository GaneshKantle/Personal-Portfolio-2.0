import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, Stagger, StaggerItem } from "./motion/ScrollReveal";
import { PageShell } from "./layout/PageShell";
import { DotPattern } from "./DotPattern";
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
      <section id="about" className="section-y relative overflow-hidden cv-auto bg-background">
        <DotPattern />
        <PageShell className="relative z-10">
          <ScrollReveal className="mb-12 text-center sm:mb-16">
            <h2 className="text-title mb-3 font-semibold tracking-tight text-foreground sm:mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <motion.div
              className="mx-auto h-1 w-16 origin-center rounded-full bg-primary sm:w-20"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.1 }}
            />
          </ScrollReveal>

          <div className="mx-auto max-w-3xl text-center 2xl:max-w-4xl">
            <ScrollReveal variants={fadeInScale}>
              <motion.div
                className="mb-8 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md sm:mb-10 sm:rounded-2xl sm:p-6 md:p-8"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -4, scale: 1.01 }
                }
                transition={{ duration: 0.35 }}
              >
                <p className="mb-4 px-2 text-base leading-relaxed text-muted-foreground sm:mb-6 sm:px-0 sm:text-lg md:text-xl">
                  I'm an AI web developer who builds fast, responsive
                  interfaces with React, TypeScript, and Java. I ship
                  production-ready client work and keep pushing into Web3 —
                  blockchain, Solidity, and the tooling that connects apps to
                  the chain.
                </p>
                <p className="mb-4 px-2 text-base leading-relaxed text-muted-foreground sm:mb-6 sm:px-0 sm:text-lg md:text-xl">
                  Outside of shipping features, I write about what I'm
                  learning and contribute to open-source. I care about clear
                  UX, clean code, and products people actually want to use.
                </p>
              </motion.div>
            </ScrollReveal>

            <Stagger
              className="mt-6 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:mt-8 sm:grid-cols-4 sm:gap-4"
              stagger={0.08}
            >
              {aboutCards.map((card) => (
                <StaggerItem key={card.title} variants={popIn}>
                  <motion.div
                    className="h-full rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-md sm:rounded-2xl sm:p-4"
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -6, scale: 1.03 }
                    }
                  >
                    <div className={`mb-2 text-2xl sm:text-3xl ${card.color}`}>
                      <i className={card.icon}></i>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {card.title}
                    </h3>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </PageShell>
      </section>

      <div className="bg-background py-10 sm:py-14">
        <PageShell>
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32"></div>
            <div className="mx-3 h-2 w-2 rounded-full bg-primary sm:mx-4"></div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32"></div>
          </div>
        </PageShell>
      </div>
    </>
  );
}
