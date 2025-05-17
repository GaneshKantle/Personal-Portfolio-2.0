import React from "react";
import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import "../index.css"; // Ensure you have the correct path to your CSS file

const technicalSkills = [
  { name: "React.js", percentage: 80 },
  { name: "JavaScript", percentage: 85 },
  { name: "HTML5/CSS3", percentage: 95 },
  { name: "Java", percentage: 75 },
  { name: "Web3/Blockchain", percentage: 60 },
  { name: "Python", percentage: 70 },
];

const technologies = [
  { name: "ReactJS", icon: "fab fa-react", color: "#61DAFB" },
  { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
  { name: "Solidity", icon: "fas fa-code", color: "lightblue" },
  { name: "Python", icon: "fab fa-python", color: "#3776AB" },
  { name: "GitHub", icon: "fab fa-github", color: "#ffffff" },
  { name: "Figma", icon: "fab fa-figma", color: "#F24E1E" },
  { name: "Docker", icon: "fab fa-docker", color: "#2496ED" }, // No official TS icon; use code icon
  { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952B3" }, // Official Bootstrap icon  // No official Tailwind icon; use wind icon as a proxy
  { name: "Smart Contracts", icon: "fas fa-file-contract", color: "#29B6AF" },
  { name: "Ethereum", icon: "fab fa-ethereum", color: "silver" },
  { name: "Java", icon: "fab fa-java", color: "#007396" },
  { name: "Postman", icon: "fas fa-paper-plane", color: "#FF6C37" },
];

const Technologies = () => {
  return (
    <div style={styles.grid}>
      {technologies.map((tech) => (
        <div key={tech.name} style={styles.item}>
          <i
            className={tech.icon}
            style={{ ...styles.icon, color: tech.color }}
          ></i>
          <div style={styles.label}>{tech.name}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap" as "wrap",
    gap: "30px",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  item: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    width: "100px",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "8px",
  },
  label: {
    fontSize: "14px",
    textAlign: "center" as const,
    marginTop: "4px",
  },
};

export default function SkillsSection() {
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
                    style={
                      {
                        "--progress-value": `${skill.percentage}%`,
                      } as React.CSSProperties
                    }
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies below */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 font-display text-center">
            Tools & Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-background p-4 rounded-full h-20 w-20 flex items-center justify-center border border-border hover:border-primary transition-all">
                  <i
                    className={`${tech.icon} text-4xl`}
                    style={{ color: tech.color }}
                  ></i>
                </div>
                <div className="text-sm font-medium text-center">
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
