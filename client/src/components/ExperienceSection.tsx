import React, { useMemo } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";

const experiences = [
  // {
  //   title: "AI Web Developer",
  //   company: "@WI Thinkers",
  //   period: "July 2025 – Present",
  //   description: "I manage multiple production websites end-to-end, from development to deployment, and recently delivered a new production project that improved performance by 30% and reduced downtime to under 1%.",
  
  //   skills: ["TypeScript", "Cursor",  "REST API", "Production", "WIX", "Tailwind CSS"],
  // },
{
  title: "Freelance Frontend Developer",
  company: "@Self-Employed",
  period: "Nov 2024 – Present",
  description: "Built and maintained multiple responsive client websites, including a video editor portfolio that increased engagement 60%. Integrated WhatsApp API chatbot, cutting response time by 70%, deployed via Vercel.",

  skills: ["React.js", "TypeScript", "Tailwind CSS", "Vercel", "API Integration"],
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
  const timelineData = useMemo(() => {
    return experiences.map((exp) => {
      const yearMatch = exp.period.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : exp.period.split(" ")[0];

      return {
        title: year,
        content: (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
              {exp.title}
            </h3>
            <p className="text-blue-600 font-mono mb-3 text-sm md:text-base">
              {exp.company}
            </p>
            <p className="text-gray-600 text-xs md:text-sm font-normal mb-4 md:mb-6 leading-relaxed">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {exp.skills.map((skill, skillIndex) => (
                <Badge
                  key={skillIndex}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 text-xs md:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <span className="bg-gray-100 text-gray-700 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-mono inline-block text-xs md:text-sm border border-gray-200">
                {exp.period}
              </span>
            </div>
          </div>
        ),
      };
    });
  }, []);

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4">
            Work <span className="text-blue-600">Experience</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
      </div>
      <Timeline data={timelineData} />
    </section>
  );
}
