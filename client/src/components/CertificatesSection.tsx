import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, Stagger, StaggerItem } from "./motion/ScrollReveal";
import { popIn, viewportOnce } from "../lib/motion";

const certificates = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    issuer: "Springboard",
    year: "2024",
    icon: "fas fa-certificate",
    color: "text-primary",
  },
  {
    id: 2,
    title: "Blockchain Fundamentals",
    issuer: "101 Blockchain",
    year: "2025",
    icon: "fas fa-certificate",
    color: "text-green-600",
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    issuer: "Udemy",
    year: "2025",
    icon: "fas fa-certificate",
    color: "text-purple-600",
  },
];

export default function CertificatesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section
        id="certificates"
        className="py-12 sm:py-16 md:py-20 bg-background"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4">
              My <span className="text-primary">Certificates</span>
            </h2>
            <motion.div
              className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full origin-center"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.1 }}
            />
          </ScrollReveal>

          <Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
            stagger={0.12}
          >
            {certificates.map((cert) => (
              <StaggerItem key={cert.id} variants={popIn}>
                <motion.div
                  className="relative z-10 bg-card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-300 ease-in-out h-full"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.04, y: -8 }
                  }
                >
                  <div
                    className={`flex items-center justify-center mb-3 sm:mb-4 ${cert.color} text-2xl sm:text-4xl`}
                  >
                    <i className={cert.icon}></i>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-center mb-2 text-foreground">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-3 sm:mb-4 text-sm sm:text-base">
                    {cert.issuer}
                  </p>
                  <div className="flex justify-center">
                    <span className="bg-muted px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-muted-foreground border border-border">
                      {cert.year}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
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
