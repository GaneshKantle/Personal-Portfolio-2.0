import React from "react";
import { motion } from "framer-motion";

const certificates = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    issuer: "Springboard",
    year: "2024",
    icon: "fas fa-certificate",
    color: "text-blue-600",
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
  return (
    <>
      <section id="certificates" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4">
              My <span className="text-blue-600">Certificates</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.div 
                key={cert.id}
                className="relative z-10 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`flex items-center justify-center mb-3 sm:mb-4 ${cert.color} text-2xl sm:text-4xl`}>
                  <i className={cert.icon}></i>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-center mb-2 text-gray-900">{cert.title}</h3>
                <p className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base">{cert.issuer}</p>
                <div className="flex justify-center">
                  <span className="bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-200">{cert.year}</span>
                </div>
              </motion.div>
            ))}
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
