import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";

const experiences = [
{
  title: "Freelance Frontend Developer",
  company: "Self-Employed",
  period: "Nov 2024 – Present",
  description: "Built and maintained 3+ responsive client websites, including a video editor portfolio that increased engagement 60%. Integrated WhatsApp API chatbot, cutting response time by 70%, deployed via Vercel.",

  skills: ["React.js", "TypeScript", "Tailwind CSS", "Vercel", "API Integration"],
},
{
  title: "Python Programming Intern",
  company: "VaultofCodes",
  period: "Nov – Dec 2023",
  description: "Completed a 1-month Python internship, delivering 3+ functional scripts with 95% code efficiency. Recognized for strong problem-solving and technical precision.",
  skills: ["Python", "Problem Solving", "Git", "Teamwork"],
},

{
  title: "Web Development Intern",
  company: "Motion Cut",
  period: "Oct – Nov 2023",
  description: "Developed a Netflix clone and Weather UI with 30% faster load times. Designed and launched a portfolio that boosted visitor engagement by 40%.",
  skills: ["JavaScript", "HTML5/CSS3",, "GitHub", "Responsive Design"],
},

];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:border-primary transition-colors"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="md:flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  <p className="text-primary font-mono mb-4">{exp.company}</p>
                  <p className="text-muted-foreground mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="bg-primary/20 text-primary"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="md:text-right mt-4 md:mt-0">
                  <span className="bg-background text-muted-foreground px-4 py-2 rounded-lg font-mono inline-block whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
