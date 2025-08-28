import React, { useState } from "react";
import { motion } from "framer-motion";
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
  { name: "JavaScript", icon: "logos:javascript", fallback: false },
  { name: "Python", icon: "logos:python", fallback: false },
  { name: "Java", icon: "logos:java", fallback: false },
  { name: "HTML5", icon: "logos:html-5", fallback: false },
  { name: "CSS3", icon: "logos:css-3", fallback: false },

  // Frontend & UI
  { name: "ReactJS", icon: "logos:react", fallback: false },
  { name: "Bootstrap", icon: "logos:bootstrap", fallback: false },

  // Blockchain & Web3
  { name: "Solidity", icon: "logos:solidity", fallback: false },
  { name: "Ethereum", icon: "logos:ethereum", fallback: false },

  // Dev Tools & Platforms
  { name: "GitHub", icon: "simple-icons:github", color: "#6e5494", fallback: false },
  { name: "Docker", icon: "logos:docker-icon", fallback: false },
  { name: "VS Code", icon: "logos:visual-studio-code", fallback: false },
  { name: "Cursor IDE", icon: "fas fa-terminal", color: "#CCCCCC", fallback: true },
  { name: "Replit", icon: "logos:replit-icon", fallback: false },
  { name: "Vercel", icon: "simple-icons:vercel", color: "#0070f3", fallback: false },
  { name: "Postman", icon: "logos:postman-icon", fallback: false },

  // AI & ML Ecosystem
  { name: "ChatGPT", icon: "logos:openai-icon", color: "#fff", fallback: false },
  { name: "Grok", icon: "fas fa-comment-dots", color: "#FF4500", fallback: true },
  { name: "Claude AI", icon: "fas fa-cloud", color: "#5A5A5A", fallback: true },
  { name: "Copilot", icon: "logos:github-copilot", color: "#fff", fallback: false },
  { name: "Runway ML", icon: "fas fa-film", color: "#00FFB2", fallback: true },
  { name: "Gemini", icon: "logos:google-gemini", fallback: false },
  { name: "Llama Coder", icon: "fas fa-hippo", color: "#A07F5F", fallback: true },
  { name: "Blackbox AI", icon: "fas fa-box", color: "#3E64FF", fallback: true },
  { name: "Julius AI", icon: "fas fa-robot", color: "#9ACD32", fallback: true },

  // Design & Creative
  { name: "Figma", icon: "logos:figma", fallback: false },
  { name: "Canva", icon: "simple-icons:canva", color: "#00C4CC", fallback: false },
  { name: "Gamma", icon: "fas fa-lightbulb", color: "#FFD700", fallback: true },
  { name: "Napkin AI", icon: "fas fa-note-sticky", color: "#FFDE00", fallback: true },

  // CMS & Site Builders
  { name: "WordPress", icon: "simple-icons:wordpress", color: "#21759B", fallback: false },
  { name: "Wix", icon: "simple-icons:wix", color: "#FAAD4D", fallback: false },

  // Learning & Docs
  { name: "LeetCode", icon: "simple-icons:leetcode", color: "#FFA116", fallback: false },
  { name: "W3Schools", icon: "fas fa-graduation-cap", color: "#04AA6D", fallback: true },
  { name: "LaTeX", icon: "fas fa-file-code", color: "#00A78E", fallback: true }
];

export default function SkillsSection() {
  // Split technologies into two unique rows (no overlap)
  const mid = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, mid);
  const row2 = technologies.slice(mid, technologies.length);

  // Shared hover state for both rows
  const [isPaused, setIsPaused] = useState(false);

  return (
    <>
      <section id="skills" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              My <span className="text-blue-600">Skills</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Centered Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 flex items-center justify-center font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              <span className="mr-2 sm:mr-3 text-blue-600">
                <i className="fas fa-laptop-code text-lg sm:text-xl"></i>
              </span>
              Technical Skills
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-1 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] font-semibold text-gray-900 text-sm sm:text-base">
                    <span>{skill.name}</span>
                    <span className="text-blue-600">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 sm:h-3 rounded-md overflow-hidden">
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
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-gray-900 text-center font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              Tools & Technologies
            </h3>

            <div className="space-y-6 sm:space-y-8">
              {/* Row 1: right to left, seamless - Full Screen */}
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
                        <div className="bg-white p-3 sm:p-4 rounded-full flex items-center justify-center border border-gray-200 hover:border-blue-600 transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-sm hover:shadow-md marquee-icon-inner">
                          {tech.fallback ? (
                            <i 
                              className={`${tech.icon} text-2xl sm:text-4xl`} 
                              style={{ color: tech.color || '#666' }}
                            ></i>
                          ) : (
                            <Icon 
                              icon={tech.icon} 
                              width="24" 
                              height="24" 
                              className="sm:w-8 sm:h-8" 
                              color={tech.color || undefined}
                            />
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-center mt-1 sm:mt-2 text-gray-700">
                          {tech.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Row 2: left to right, seamless - Full Screen */}
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
                        <div className="bg-white p-3 sm:p-4 rounded-full flex items-center justify-center border border-gray-200 hover:border-blue-600 transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-sm hover:shadow-md marquee-icon-inner">
                          {tech.fallback ? (
                            <i 
                              className={`${tech.icon} text-2xl sm:text-4xl`} 
                              style={{ color: tech.color || '#666' }}
                            ></i>
                          ) : (
                            <Icon 
                              icon={tech.icon} 
                              width="24" 
                              height="24" 
                              className="sm:w-8 sm:h-8" 
                              color={tech.color || undefined}
                            />
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-center mt-1 sm:mt-2 text-gray-700">
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
      
      {/* Section Separator */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}
