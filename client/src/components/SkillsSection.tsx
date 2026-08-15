import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "../index.css";
import { Icon } from "@iconify/react";
import { AnimatedCounter } from "./motion/AnimatedCounter";
import { ScrollReveal } from "./motion/ScrollReveal";
import { fadeUp, popIn, viewportOnce } from "../lib/motion";
import heyzineLogo from "../img/heyzine.svg";

const technicalSkills = [
  { name: "Java / Spring Boot", percentage: 90 },
  { name: "React / TypeScript", percentage: 70 },
  { name: "JavaScript", percentage: 90 },
  { name: "HTML / CSS / Tailwind", percentage: 85 },
  { name: "Web3 / Solidity", percentage: 65 },
  { name: "MySQL", percentage: 70 },
];

type TechItem = {
  name: string;
  icon?: string;
  color?: string;
  fallback?: boolean;
  image?: string;
};

const technologies: TechItem[] = [
  { name: "Java", icon: "logos:java" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "HTML5", icon: "logos:html-5" },
  { name: "CSS3", icon: "logos:css-3" },
  { name: "ReactJS", icon: "logos:react" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "Bootstrap", icon: "logos:bootstrap" },
  { name: "Solidity", icon: "logos:solidity" },
  { name: "Ethereum", icon: "logos:ethereum" },
  { name: "GitHub", icon: "simple-icons:github", color: "#6e5494" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "VS Code", icon: "logos:visual-studio-code" },
  { name: "Cursor IDE", icon: "fas fa-terminal", color: "#CCCCCC", fallback: true },
  { name: "Replit", icon: "logos:replit-icon" },
  { name: "Vercel", icon: "simple-icons:vercel", color: "#000000" },
  { name: "Postman", icon: "logos:postman-icon" },
  { name: "ChatGPT", icon: "logos:openai-icon" },
  { name: "Grok", icon: "fas fa-comment-dots", color: "#FF4500", fallback: true },
  { name: "Claude AI", icon: "fas fa-cloud", color: "#5A5A5A", fallback: true },
  { name: "Copilot", icon: "logos:github-copilot" },
  { name: "Gemini", icon: "logos:google-gemini" },
  { name: "Llama Coder", icon: "fas fa-hippo", color: "#A07F5F", fallback: true },
  { name: "Blackbox AI", icon: "fas fa-box", color: "#3E64FF", fallback: true },
  { name: "Figma", icon: "logos:figma" },
  { name: "Canva", icon: "simple-icons:canva", color: "#00C4CC" },
  { name: "WordPress", icon: "logos:wordpress-icon" },
  { name: "Wix Studio", icon: "simple-icons:wix", color: "#0C6EFC" },
  { name: "HeyZine", image: heyzineLogo },
  { name: "Shopify", icon: "logos:shopify" },
  { name: "Zapier", icon: "logos:zapier" },
  { name: "Firebase", icon: "logos:firebase" },
  { name: "bunny.net", icon: "logos:bunny-net" },
  { name: "Google Cloud Console", icon: "logos:google-cloud" },
  { name: "Google Drive", icon: "logos:google-drive" },
  { name: "Google Sheets", icon: "simple-icons:googlesheets", color: "#34A853" },
  { name: "Mailchimp", icon: "logos:mailchimp" },
  { name: "Calendly", icon: "simple-icons:calendly", color: "#006BFF" },
  { name: "LeetCode", icon: "simple-icons:leetcode", color: "#FFA116" },
  { name: "W3Schools", icon: "fas fa-graduation-cap", color: "#04AA6D", fallback: true },
  { name: "LaTeX", icon: "fas fa-file-code", color: "#008080", fallback: true },
];

function TechIcon({ tech }: { tech: TechItem }) {
  if (tech.image) {
    return (
      <img
        src={tech.image}
        alt=""
        width={32}
        height={32}
        className="h-6 w-6 object-contain sm:h-8 sm:w-8"
        loading="lazy"
      />
    );
  }

  if (tech.fallback && tech.icon) {
    return (
      <i
        className={`${tech.icon} text-2xl sm:text-4xl`}
        style={{ color: tech.color || "#666" }}
      />
    );
  }

  return (
    <Icon
      icon={tech.icon!}
      width="24"
      height="24"
      className="sm:h-8 sm:w-8"
      color={tech.color || undefined}
    />
  );
}

export default function SkillsSection() {
  const mid = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, mid);
  const row2 = technologies.slice(mid, technologies.length);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section id="skills" className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4">
              My <span className="text-primary">Skills</span>
            </h2>
            <motion.div
              className="w-16 sm:w-20 h-1 bg-primary mx-auto rounded-full origin-center"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.15 }}
            />
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="max-w-lg mx-auto"
          >
            <motion.h3
              variants={fadeUp}
              className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground flex items-center justify-center"
            >
              <span className="mr-2 sm:mr-3 text-primary">
                <i className="fas fa-laptop-code text-lg sm:text-xl"></i>
              </span>
              Technical Skills
            </motion.h3>

            <div className="space-y-4 sm:space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div key={skill.name} variants={popIn}>
                  <div className="flex justify-between mb-1 font-semibold text-foreground text-sm sm:text-base">
                    <span>{skill.name}</span>
                    <span className="text-primary">
                      <AnimatedCounter
                        value={skill.percentage}
                        suffix="%"
                        duration={1.4 + index * 0.08}
                      />
                    </span>
                  </div>
                  <div className="w-full bg-muted h-2.5 sm:h-3 rounded-md overflow-hidden">
                    <motion.div
                      className="water-fill h-full"
                      initial={
                        prefersReducedMotion
                          ? { width: `${skill.percentage}%` }
                          : { width: "0%" }
                      }
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={
                        {
                          "--progress-value": "100%",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 sm:mt-16">
            <ScrollReveal>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-foreground text-center">
                Technologies & Tools I Work With
              </h3>
            </ScrollReveal>

            <div className="space-y-6 sm:space-y-8">
              <div className="relative w-screen left-1/2 -translate-x-1/2">
                <div
                  className={`marquee-row reverse${isPaused ? " paused" : ""}`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="marquee-track">
                    {[...row1, ...row1].map((tech, index) => (
                      <div
                        key={tech.name + index}
                        className="marquee-icon flex flex-col items-center mx-2 sm:mx-4 cursor-pointer"
                      >
                        <div className="bg-card p-3 sm:p-4 rounded-full flex items-center justify-center border border-border hover:border-primary transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-sm hover:shadow-md marquee-icon-inner">
                          <TechIcon tech={tech} />
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-center mt-1 sm:mt-2 text-muted-foreground">
                          {tech.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative w-screen left-1/2 -translate-x-1/2">
                <div
                  className={`marquee-row${isPaused ? " paused" : ""}`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="marquee-track">
                    {[...row2, ...row2].map((tech, index) => (
                      <div
                        key={tech.name + index}
                        className="marquee-icon flex flex-col items-center mx-2 sm:mx-4 cursor-pointer"
                      >
                        <div className="bg-card p-3 sm:p-4 rounded-full flex items-center justify-center border border-border hover:border-primary transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-sm hover:shadow-md marquee-icon-inner">
                          <TechIcon tech={tech} />
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-center mt-1 sm:mt-2 text-muted-foreground">
                          {tech.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
