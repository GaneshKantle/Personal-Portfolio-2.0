import React from "react";

import { motion } from "framer-motion";

const aboutCards = [
  { icon: "fas fa-code", title: "Frontend Dev", color: "text-blue-600" },
  {
    icon: "fas fa-laptop-code",
    title: "Web3 Explorer",
    color: "text-green-600",
  },
  { icon: "fas fa-pen-fancy", title: "Tech Writer", color: "text-purple-600" },
  { icon: "fas fa-users", title: "Team Player", color: "text-blue-600" },
];

export default function AboutSection() {
  return (
    <>
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4">
              About <span className="text-blue-600">Me</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 mb-8 sm:mb-10 transform-gpu hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02]"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ rotateX: 5, rotateY: 5 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)",
                }}
              >
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                  I'm a passionate frontend developer with 2+ years of academic
                  experience creating beautiful, responsive web applications. My
                  expertise lies in React.js, JavaScript, and Java, with a growing
                  interest in Web3, blockchain technologies, and Solidity
                  development.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                  I enjoy turning complex problems into simple, elegant solutions.
                  When I'm not coding, I'm writing technical blogs or contributing
                  to open-source projects.
                </p>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {aboutCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02]"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`text-2xl sm:text-3xl ${card.color} mb-2`}>
                    <i className={card.icon}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">{card.title}</h3>
                </motion.div>
              ))}
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
