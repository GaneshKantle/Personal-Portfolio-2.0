import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    description: "Led the development of responsive web applications using React.js. Collaborated with UX/UI designers to implement pixel-perfect interfaces. Optimized application performance and mentored junior developers.",
    skills: ["React.js", "Redux", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Frontend Developer",
    company: "WebInnovate Solutions",
    period: "2019 - 2021",
    description: "Developed and maintained multiple client websites and web applications. Implemented responsive design principles and ensured cross-browser compatibility. Participated in code reviews and team planning sessions.",
    skills: ["JavaScript", "React.js", "HTML5/CSS3", "SASS"],
  },
  {
    title: "Web Development Intern",
    company: "StartUp Launch",
    period: "2018 - 2019",
    description: "Assisted in developing web applications using modern JavaScript frameworks. Created responsive UI components and integrated with backend APIs. Participated in daily stand-ups and sprint planning.",
    skills: ["JavaScript", "HTML/CSS", "jQuery", "Bootstrap"],
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
                      <Badge key={skillIndex} variant="outline" className="bg-primary/20 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="md:text-right mt-4 md:mt-0">
                  <span className="bg-background text-muted-foreground px-4 py-2 rounded-lg font-mono">
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
