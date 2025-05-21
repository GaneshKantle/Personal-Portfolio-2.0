import React from "react";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Button } from "../components/ui/button";
import Project1 from "../img/project1.png";
import Project2 from "../img/project2.png";
import Project3 from "../img/project3.png"; // Replace with actual image import

const projects = [
  {
    id: 1,
    title: "Video Editor Portfolio",
    description:
      "Developed as a Freelance project where I engineered a sleek, responsive portfolio of my client. Highlights: React, TypeScript, Google Drive, dark mode, SVG icons.",
    categoryColor: "primary",
    technologies: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Google Drive API",
    ],
    githubUrl: "https://github.com/GaneshKantle/Client-Portfolio",
    liveUrl: "https://vijaykumar-gamma.vercel.app/",
    image: (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-md border border-border">
        {/* Top Bar */}
        <div className="p-4 bg-card border-b border-border flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">{`Project 1`}</div>
        </div>

        {/* Full photo taking all remaining space */}
        <img
          src={Project1} // Replace with your image path
          alt="DeFi Dashboard Screenshot"
          className="w-full h-64 object-cover rounded-b-xl"
        />
      </div>
    ),
  },
  {
    id: 2,
    title: "Stroke Risk Prediction System",
    description:
      "A machine learning web app predicting stroke risk using five models for high accuracy. Users input health data for early detection.",
    categoryColor: "primary",
    technologies: [
      "Python",
      "Flask",
      "JavaScript",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
    githubUrl:
      "https://github.com/GaneshKantle/Stroke-Risk-Prediction-using-ML",
    liveUrl: "https://github.com/GaneshKantle/Stroke-Risk-Prediction-using-ML",
    image: (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-md border border-border">
        {/* Top Bar */}
        <div className="p-4 bg-card border-b border-border flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">{`Project 2`}</div>
        </div>

        {/* Full photo taking all remaining space */}
        <img
          src={Project2} // Replace with your image path
          alt="DeFi Dashboard Screenshot"
          className="w-full h-64 object-cover rounded-b-xl"
        />
      </div>
    ),
  },
  {
    id: 3,
    title: "Google AI Chatbot",
    description:
      "Python Flask app with Google AI integration, theme toggle, chat history, and secure API keys. Over 1,000 conversations and 95% uptime.",
    categoryColor: "primary",
    technologies: [
      "Python",
      "Flask",
      "HTML5/CSS3",
      "Google API",
      "Responsive Design",
    ],
    githubUrl: "https://github.com/GaneshKantle/Shapes-Chatbot",
    liveUrl: "https://github.com/GaneshKantle/Shapes-Chatbot",
    image: (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-md border border-border">
        {/* Top Bar */}
        <div className="p-4 bg-card border-b border-border flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">{`Project 3`}</div>
        </div>

        {/* Full photo taking all remaining space */}
        <img
          src={Project3} // Replace with your image path
          alt="DeFi Dashboard Screenshot"
          className="w-full h-64 object-cover rounded-b-xl"
        />
      </div>
    ),
  },
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const controls = useAnimation();
  const { ref, inView } = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Set color based on category
  const getCategoryColor = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "secondary":
        return "bg-secondary/10 text-secondary";
      case "accent":
        return "bg-accent/10 text-accent";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  // Handle project scrolling and animation
  useEffect(() => {
    const handleProjectScroll = () => {
      const projectCards = document.querySelectorAll(".project-card");
      const windowHeight = window.innerHeight;

      projectCards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardTop = cardElement.getBoundingClientRect().top;
        const cardCenter = cardTop + cardElement.offsetHeight / 2;

        // Check if card center is in the middle portion of the viewport
        if (
          cardCenter > windowHeight * 0.35 &&
          cardCenter < windowHeight * 0.65
        ) {
          setActiveProject(index);
        }
      });
    };

    window.addEventListener("scroll", handleProjectScroll);
    handleProjectScroll(); // Run once on page load

    return () => {
      window.removeEventListener("scroll", handleProjectScroll);
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            transition={{ duration: 0.5 }}
          >
            My <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto rounded-full"
            initial={{ opacity: 0, width: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, width: 80 },
              hidden: { opacity: 0, width: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Check out some of my highlighted projects. Scroll through to explore
            each one.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-24" id="projects-container">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card bg-background rounded-2xl shadow-xl overflow-hidden border border-border hover:border-primary transition-all ${
                  activeProject === index
                    ? "scale-105 z-10"
                    : activeProject !== null
                    ? "scale-95 -translate-y-5 opacity-70"
                    : ""
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                <div className="md:flex">
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:w-1/2 p-6 md:p-8">
                        <h3 className="text-2xl font-bold mb-4 font-display">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-card px-3 py-1 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-4">
                          <a
                            href={project.githubUrl}
                            className={`text-${
                              project.categoryColor === "primary"
                                ? "primary"
                                : project.categoryColor === "secondary"
                                ? "[#10B981]"
                                : "[#8B5CF6]"
                            } hover:text-primary/80 transition-colors`}
                          >
                            <i className="fab fa-github"></i> Source
                          </a>
                          <a
                            href={project.liveUrl}
                            className={`text-${
                              project.categoryColor === "primary"
                                ? "primary"
                                : project.categoryColor === "secondary"
                                ? "[#10B981]"
                                : "[#8B5CF6]"
                            } hover:text-primary/80 transition-colors`}
                          >
                            <i className="fas fa-external-link-alt"></i> Live
                          </a>
                        </div>
                      </div>
                      <div className="md:w-1/2 bg-card flex items-center justify-center p-6">
                        {project.image}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 bg-card flex items-center justify-center p-6">
                        {project.image}
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8">
                        <h3 className="text-2xl font-bold mb-4 font-display">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-card px-3 py-1 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-4">
                          <a
                            href={project.githubUrl}
                            className={`text-${
                              project.categoryColor === "primary"
                                ? "primary"
                                : project.categoryColor === "secondary"
                                ? "[#10B981]"
                                : "[#8B5CF6]"
                            } hover:text-opacity-80 transition-colors`}
                          >
                            <i className="fab fa-github"></i> Source
                          </a>
                          <a
                            href={project.liveUrl}
                            className={`text-${
                              project.categoryColor === "primary"
                                ? "primary"
                                : project.categoryColor === "secondary"
                                ? "[#10B981]"
                                : "[#8B5CF6]"
                            } hover:text-opacity-80 transition-colors`}
                          >
                            <i className="fas fa-external-link-alt"></i> Live
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.github.com/ganeshkantle" // replace with actual URL
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold transition-all transform hover:scale-105 hover:shadow-lg"
              >
                View All Projects
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
