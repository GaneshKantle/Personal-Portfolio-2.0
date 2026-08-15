import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, Stagger, StaggerItem } from "./motion/ScrollReveal";
import { popIn, viewportOnce } from "../lib/motion";
import { DotPattern } from "./DotPattern";

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
        className="section-y relative overflow-hidden cv-auto bg-background"
      >
        <DotPattern />
        <div className="page-shell relative z-10">
          <ScrollReveal className="mb-12 text-center sm:mb-16">
            <h2 className="text-title mb-3 font-semibold tracking-tight text-foreground sm:mb-4">
              My <span className="text-primary">Certificates</span>
            </h2>
            <motion.div
              className="mx-auto h-1 w-16 origin-center rounded-full bg-primary sm:w-20"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.1 }}
            />
          </ScrollReveal>

          <Stagger
            className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:gap-8 3xl:max-w-7xl"
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

      <div className="bg-background py-10 sm:py-14">
        <div className="page-shell">
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32"></div>
            <div className="mx-3 h-2 w-2 rounded-full bg-primary sm:mx-4"></div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32"></div>
          </div>
        </div>
      </div>
    </>
  );
}
