import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";
import { 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  Code2,
  Rocket,
  TrendingUp
} from "lucide-react";

const experiences = [
  {
    title: "AI Web Developer",
    company: "@WI Thinkers",
    period: "July 2025 – Present",
    description: "I manage multiple production websites end-to-end, from development to deployment, and recently delivered a new production project that improved performance by 30% and reduced downtime to under 1%.",
    skills: ["TypeScript", "Cursor", "REST API", "Production", "WIX", "Tailwind CSS"],
    icon: <Rocket className="w-5 h-5" />,
    highlight: true,
  },
  {
    title: "Freelance Frontend Developer",
    company: "@Self-Employed",
    period: "Nov 2024 – July 2025",
    description: "Built and maintained 3+ responsive client websites, including a video editor portfolio that increased engagement 60%. Integrated WhatsApp API chatbot, cutting response time by 70%, deployed via Vercel.",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Vercel", "API Integration"],
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "Python Programming Intern",
    company: "@VaultofCodes",
    period: "Nov – Dec 2023",
    description: "Completed a 1-month Python internship, delivering 3+ functional scripts with 95% code efficiency. Recognized for strong problem-solving and technical precision.",
    skills: ["Python", "Problem Solving", "Git", "Teamwork"],
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    title: "Web Development Intern",
    company: "@Motion Cut",
    period: "Oct – Nov 2023",
    description: "Developed a Netflix clone and Weather UI with 30% faster load times. Designed and launched a portfolio that boosted visitor engagement by 40%.",
    skills: ["JavaScript", "HTML5/CSS3", "GitHub", "Responsive Design"],
    icon: <Briefcase className="w-5 h-5" />,
  },
];

const TimelineConnector = ({ isLast }: { isLast: boolean }) => {
  if (isLast) return null;
  
  return (
    <div className="absolute left-6 top-16 w-0.5 h-32 bg-gradient-to-b from-primary/50 to-primary/20 
                    lg:left-1/2 lg:-translate-x-1/2 lg:top-20 lg:h-20">
      <motion.div
        className="absolute -left-1 top-full w-2.5 h-2.5 bg-primary rounded-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ArrowRight className="w-4 h-4 text-primary rotate-90 lg:rotate-0" />
      </motion.div>
    </div>
  );
};

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary/30 rounded-full"
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 1, 0],
      y: [-20, 20],
      x: [-10, 10, -10],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
              Career Journey
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <motion.div
                  className={`flex flex-col lg:flex-row gap-8 mb-12 ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline dot and connector */}
                  <div className="absolute left-6 top-8 lg:left-1/2 lg:-translate-x-1/2 z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-card border-2 border-primary 
                                 flex items-center justify-center shadow-lg ${
                                   exp.highlight ? 'ring-4 ring-primary/20' : ''
                                 }`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {exp.icon}
                    </motion.div>
                    <TimelineConnector isLast={index === experiences.length - 1} />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pl-20 lg:pl-0 lg:pr-8">
                    <motion.div
                      className={`bg-card p-6 rounded-2xl shadow-lg border border-border 
                                 hover:border-primary transition-all duration-300 relative
                                 ${exp.highlight ? 'border-primary shadow-primary/20' : ''}`}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      {exp.highlight && (
                        <div className="absolute -top-3 right-6 bg-primary text-primary-foreground 
                                      px-3 py-1 rounded-full text-xs font-bold">
                          CURRENT
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                          <p className="text-primary font-mono text-sm">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="font-mono text-sm whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                          >
                            <Badge
                              variant="outline"
                              className="bg-primary/10 text-primary border-primary/20 
                                       hover:bg-primary/20 transition-colors cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden lg:block flex-1"></div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Journey progress indicator */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 
                          rounded-full border border-primary/20">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                Continuously evolving and learning
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}