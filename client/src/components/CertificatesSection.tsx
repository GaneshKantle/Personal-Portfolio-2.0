import React from "react";
import { motion } from "framer-motion";

const certificates = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    issuer: "Infosys",
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
    color: "text-[#10B981]",
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    issuer: "Udemy",
    year: "2025",
    icon: "fas fa-certificate",
    color: "text-[#8B5CF6]",
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            My <span className="text-primary">Certificates</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div 
              key={cert.id}
              className="bg-background p-6 rounded-xl shadow-lg border border-border hover:border-primary transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`flex items-center justify-center mb-4 ${cert.color} text-4xl`}>
                <i className={cert.icon}></i>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">{cert.title}</h3>
              <p className="text-muted-foreground text-center mb-4">{cert.issuer}</p>
              <div className="flex justify-center">
                <span className="bg-card px-3 py-1 rounded-full text-sm">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
