import React from "react";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Button } from "../components/ui/button";
import { getAllProjects } from "../shared/projectData";

const projects = getAllProjects();

// Define the project type
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

// Helper function to render project image with terminal-like styling
const renderProjectImage = (project: Project) => (
  <div className="bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-md border border-border">
    <div className="p-4 bg-card border-b border-border flex justify-between items-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-xs font-mono text-muted-foreground">
        {project.title}
      </div>
    </div>
    <img
      src={project.image}
      alt={`${project.title} Screenshot`}
      className="w-full h-64 object-cover rounded-b-xl"
    />
  </div>
);

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

        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            id="projects-container"
          >
            {projects.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                className={`project-card bg-background rounded-2xl shadow-xl overflow-hidden border border-border hover:border-primary transition-all h-full ${
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
                <div className="flex flex-col h-full">
                  <div className="bg-card flex items-center justify-center p-6">
                    {renderProjectImage(project)}
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 font-display">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map(
                        (tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="bg-card px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                    <div className="mt-auto space-y-3">
                      {/* First row: Source and Live buttons side by side */}
                      <div className="flex space-x-3">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-card hover:bg-card/80 text-primary hover:text-primary/80 border border-border hover:border-primary transition-all duration-200 py-2 px-4 rounded-lg text-sm font-medium text-center flex items-center justify-center"
                        >
                          <i className="fab fa-github mr-2"></i> Source
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-card hover:bg-card/80 text-primary hover:text-primary/80 border border-border hover:border-primary transition-all duration-200 py-2 px-4 rounded-lg text-sm font-medium text-center flex items-center justify-center"
                        >
                          <i className="fas fa-external-link-alt mr-2"></i> Live
                        </a>
                      </div>

                      {/* Second row: View More Details button (full width) */}
                      {/* <a
                        href={`/projects/${project.id}`}
                        className="w-full bg-primary hover:bg-primary/90 text-white border border-primary hover:border-primary/90 transition-all duration-200 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs font-medium transform hover:scale-[1.02] text-center block"
                      >
                        <span className="hidden sm:inline">
                          View More Details
                        </span>
                        <span className="sm:hidden">View Details</span>
                      </a> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/all-projects">
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
