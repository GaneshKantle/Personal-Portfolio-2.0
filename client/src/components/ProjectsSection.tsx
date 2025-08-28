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
  <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm w-full max-w-full border border-gray-200">
    <div className="p-2 sm:p-3 md:p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
      <div className="flex space-x-1.5 sm:space-x-2">
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-xs sm:text-sm font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] text-gray-600 truncate ml-2">
        {project.title}
      </div>
    </div>
    <img
      src={project.image}
      alt={`${project.title} Screenshot`}
      className="w-full h-48 sm:h-56 md:h-64 object-cover"
    />
  </div>
);

export default function ProjectsSection() {
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
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "secondary":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "accent":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <>
      <section id="projects" className="py-12 sm:py-16 md:py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-blue-600">Projects</span>
            </motion.h2>
            <motion.div
              className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"
              initial={{ opacity: 0, width: 0 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, width: 64 },
                hidden: { opacity: 0, width: 0 },
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <motion.p
              className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] px-4"
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
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8"
              id="projects-container"
            >
              {projects.map((project: Project, index: number) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02] h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6">
                      {renderProjectImage(project)}
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 flex-1 leading-relaxed text-sm sm:text-base">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                        {project.technologies.map(
                          (tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-200"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                      <div className="mt-auto space-y-2 sm:space-y-3">
                        {/* First row: Source and Live buttons side by side */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium text-center flex items-center justify-center"
                          >
                            <i className="fab fa-github mr-1 sm:mr-2"></i> Source
                          </a>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium text-center flex items-center justify-center"
                          >
                            <i className="fab fa-external-link-alt mr-1 sm:mr-2"></i> Live
                          </a>
                        </div>

                        {/* Second row: View More Details button (full width) */}
                        {/* <a
                          href={`/projects/${project.id}`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 hover:border-blue-700 transition-all duration-300 ease-in-out py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs font-medium transform hover:scale-[1.02] text-center block"
                        >
                          <span className="hidden sm:inline">
                            View More Details
                          </span>
                          <span className="sm:hidden">View Details</span>
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <a href="/all-projects">
                <Button
                  size="lg"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
                >
                  View All Projects
                </Button>
              </a>
            </div>
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
