import React, { useState } from "react";
import { color, motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import "../index.css";
import { Icon } from '@iconify/react';

const technicalSkills = [
  { name: "React.js", percentage: 80 },
  { name: "JavaScript", percentage: 85 },
  { name: "HTML5/CSS3", percentage: 95 },
  { name: "Java", percentage: 75 },
  { name: "Web3/Blockchain", percentage: 60 },
  { name: "Python", percentage: 70 },
];

const technologies = [
  // Core Languages
  { name: "JavaScript",  icon: "logos:javascript" },
  { name: "Python",      icon: "logos:python" },
  { name: "Java",        icon: "logos:java" },
  { name: "HTML5",       icon: "logos:html-5" },
  { name: "CSS3",        icon: "logos:css-3" },

  // Frontend & UI
  { name: "ReactJS",     icon: "logos:react" },
  { name: "Bootstrap",   icon: "logos:bootstrap" },

  // Blockchain & Web3
  { name: "Solidity",    icon: "logos:solidity" },
  { name: "Ethereum",    icon: "logos:ethereum" },

  // Dev Tools & Platforms
  { name: "GitHub",      icon: "simple-icons:github", color: "#6e5494" }, // purple for demo
  { name: "Docker",      icon: "logos:docker-icon" },
  { name: "VS Code",     icon: "logos:visual-studio-code" },
  { name: "Cursor IDE",  icon: "fas fa-terminal", color: "#CCCCCC", fallback: true },
  { name: "Replit",      icon: "logos:replit-icon" },
  { name: "Vercel",      icon: "simple-icons:vercel", color: "#0070f3" }, // blue for demo
  { name: "Postman",     icon: "logos:postman-icon" },

  // AI & ML Ecosystem
  { name: "ChatGPT", icon: "logos:openai-icon", color: "#fff" },
  { name: "Grok",            icon: "fas fa-comment-dots", color: "#FF4500", fallback: true },
  { name: "Claude AI",       icon: "fas fa-cloud", color: "#5A5A5A", fallback: true },
  { name: "Copilot",         icon: "logos:github-copilot", color: "#fff" },
  { name: "Runway ML",       icon: "fas fa-film", color: "#00FFB2", fallback: true },
  { name: "Gemini",          icon: "logos:google-gemini" },
  { name: "Llama Coder",     icon: "fas fa-hippo", color: "#A07F5F", fallback: true },
  { name: "Blackbox AI",     icon: "fas fa-box", color: "#3E64FF", fallback: true },
  { name: "Julius AI",       icon: "fas fa-robot", color: "#9ACD32", fallback: true },

  // Design & Creative
  { name: "Figma",       icon: "logos:figma" },
  { name: "Canva",       icon: "simple-icons:canva", color: "#00C4CC" },
  { name: "Gamma",       icon: "fas fa-lightbulb", color: "#FFD700", fallback: true },
  { name: "Napkin AI",   icon: "fas fa-note-sticky", color: "#FFDE00", fallback: true },

  // CMS & Site Builders
  { name: "WordPress",   icon: "simple-icons:wordpress", color: "#21759B" },
  { name: "Wix",         icon: "simple-icons:wix", color: "#FAAD4D" },

  // Learning & Docs
  { name: "LeetCode",    icon: "simple-icons:leetcode", color: "#FFA116" },
  { name: "W3Schools",   icon: "fas fa-graduation-cap", color: "#04AA6D", fallback: true },
  { name: "LaTeX",       icon: "fas fa-file-code", color: "#00A78E", fallback: true }
];

export default function SkillsSection() {
  // Split technologies into two unique rows (no overlap)
  const mid = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, mid);
  const row2 = technologies.slice(mid, technologies.length);

  // Shared hover state for both rows
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="skills" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Centered Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 font-display flex items-center justify-center">
            <span className="mr-3 text-primary">
              <i className="fas fa-laptop-code"></i>
            </span>
            Technical Skills
          </h3>

          <div className="space-y-6">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-1 font-mono font-bold">
                  <span>{skill.name}</span>
                  <span className="text-primary">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-background h-3 rounded-md overflow-hidden">
                  <div
                    className="water-fill"
                    style={{
                      "--progress-value": `${skill.percentage}%`,
                    } as React.CSSProperties}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies Marquee */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 font-display text-center">
            Tools & Technologies
          </h3>

          <div className="space-y-8">
            {/* Row 1: left to right, seamless - Full Screen */}
            <div className="relative w-screen left-1/2 -translate-x-1/2">
              <div
                className={`marquee-row${isPaused ? " paused" : ""}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="marquee-track">
                  {[...row1, ...row1].map((tech, index) => (
                    <div
                      key={tech.name + index}
                      className="marquee-icon flex flex-col items-center mx-4 cursor-pointer"
                    >
                      <div className="bg-background p-4 rounded-full flex items-center justify-center border border-border hover:border-primary transition-all marquee-icon-inner">
                        {tech.fallback
                          ? <i className={`${tech.icon} text-4xl`} style={{ color: tech.color }}></i>
                          : <Icon icon={tech.icon} width="32" height="32" color={tech.color} />
                        }
                      </div>
                      <div className="text-sm font-medium text-center mt-2">
                        {tech.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Row 2: right to left, seamless - Full Screen */}
            <div className="relative w-screen left-1/2 -translate-x-1/2">
              <div
                className={`marquee-row reverse${isPaused ? " paused" : ""}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="marquee-track">
                  {[...row2, ...row2].map((tech, index) => (
                    <div
                      key={tech.name + index}
                      className="marquee-icon flex flex-col items-center mx-4 cursor-pointer"
                    >
                      <div className="bg-background p-4 rounded-full flex items-center justify-center border border-border hover:border-primary transition-all marquee-icon-inner">
                        {tech.fallback
                          ? <i className={`${tech.icon} text-4xl`} style={{ color: tech.color }}></i>
                          : <Icon icon={tech.icon} width="32" height="32" color={tech.color} />
                        }
                      </div>
                      <div className="text-sm font-medium text-center mt-2">
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
  );
}
