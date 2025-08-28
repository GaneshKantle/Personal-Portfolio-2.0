import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";

const experiences = [
  {
    title: "AI Web Developer",
    company: "@WI Thinkers",
    period: "July 2025 – Present",
    description: "I manage multiple production websites end-to-end, from development to deployment, and recently delivered a new production project that improved performance by 30% and reduced downtime to under 1%.",
  
    skills: ["TypeScript", "Cursor",  "REST API", "Production", "WIX", "Tailwind CSS"],
  },
{
  title: "Freelance Frontend Developer",
  company: "@Self-Employed",
  period: "Nov 2024 – July 2025",
  description: "Built and maintained 3+ responsive client websites, including a video editor portfolio that increased engagement 60%. Integrated WhatsApp API chatbot, cutting response time by 70%, deployed via Vercel.",

  skills: ["React.js", "TypeScript", "Tailwind CSS", "Vercel", "API Integration"],
},
{
  title: "Python Programming Intern",
  company: "@VaultofCodes",
  period: "Nov – Dec 2023",
  description: "Completed a 1-month Python internship, delivering 3+ functional scripts with 95% code efficiency. Recognized for strong problem-solving and technical precision.",
  skills: ["Python", "Problem Solving", "Git", "Teamwork"],
},

{
  title: "Web Development Intern",
  company: "@Motion Cut",
  period: "Oct – Nov 2023",
  description: "Developed a Netflix clone and Weather UI with 30% faster load times. Designed and launched a portfolio that boosted visitor engagement by 40%.",
  skills: ["JavaScript", "HTML5/CSS3", "GitHub", "Responsive Design"],
},

];

export default function ExperienceSection() {
  return (
    <>
      <section id="experience" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              Work <span className="text-blue-600">Experience</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="md:flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">{exp.title}</h3>
                    <p className="text-blue-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">{exp.company}</p>
                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-300 text-xs sm:text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right mt-3 sm:mt-4 md:mt-0">
                    <span className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium inline-block whitespace-nowrap text-xs sm:text-sm">
                      {exp.period}
                    </span>
                  </div>
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
