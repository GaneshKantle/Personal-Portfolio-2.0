import React from "react";
import { motion } from "framer-motion";
import { useRoute, useLocation } from "wouter";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { getProjectById } from "../../shared/projectData";

// Define the project type
interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  demoUrl?: string;
  documentationUrl?: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  screenshots: Array<{ src: string; alt: string; caption: string }>;
  architecture: string;
  deployment: string;
  status: string;
  developmentTime: string;
  teamSize: string;
  impact: string;
  image: string;
  category: string;
  difficulty: string;
}


export default function ProjectDetails() {
  const [, params] = useRoute("/project/:id");
  const [, setLocation] = useLocation();
  const project = getProjectById(parseInt(params?.id || "1"));

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-600 mb-4 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Project Not Found</h1>
            <button onClick={() => setLocation("/")} className="text-blue-600 hover:underline cursor-pointer font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">← Back to Home</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-700 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
              {project.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] leading-relaxed">
              {project.tagline}
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              {project.longDescription}
            </p>
          </motion.div>

          {/* Project Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
              <div className="text-2xl font-semibold text-blue-600 mb-2 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{project.developmentTime}</div>
              <div className="text-sm text-gray-600 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Development Time</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
              <div className="text-2xl font-semibold text-blue-600 mb-2 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{project.teamSize}</div>
              <div className="text-sm text-gray-600 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Team Size</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
              <div className="text-2xl font-semibold text-blue-600 mb-2 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{project.difficulty}</div>
              <div className="text-sm text-gray-600 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Complexity</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
              <div className="text-2xl font-semibold text-blue-600 mb-2 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{project.status}</div>
              <div className="text-sm text-gray-600 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Status</div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              View Live Project
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]"
            >
              <i className="fab fa-github mr-2"></i>
              View Source Code
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]"
              >
                <i className="fas fa-play mr-2"></i>
                Watch Demo
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Screenshots */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Project Screenshots</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] leading-relaxed">
              Visual walkthrough of the key features and user interface
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.screenshots.map((screenshot: { src: string; alt: string; caption: string }, index: number) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 group-hover:border-blue-300 transition-all duration-300 ease-in-out hover:shadow-md">
                  <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] text-gray-600">{screenshot.alt}</div>
                  </div>
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600 text-center font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{screenshot.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-16">
              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-300 transition-all duration-300 ease-in-out font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Architecture */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Architecture</h3>
                <p className="text-gray-700 leading-relaxed font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{project.architecture}</p>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-16">
              {/* Challenges */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Challenges Faced</h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Learnings */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Key Learnings</h3>
                <ul className="space-y-3">
                  {project.learnings.map((learning: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{learning}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Impact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Project Impact</h3>
                <p className="text-gray-700 leading-relaxed font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">{project.impact}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Additional Resources</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif] leading-relaxed">
              Explore more about this project through documentation and related resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.documentationUrl && (
              <motion.a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center">
                  <i className="fas fa-book text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-200"></i>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Documentation</h3>
                  <p className="text-gray-600 text-sm font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Comprehensive project documentation and setup guides</p>
                </div>
              </motion.a>
            )}

            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out hover:shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="text-center">
                <i className="fab fa-github text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-200"></i>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Source Code</h3>
                <p className="text-gray-600 text-sm font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Browse the complete source code and contribute</p>
              </div>
            </motion.a>

            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out hover:shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center">
                <i className="fas fa-external-link-alt text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-200"></i>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Live Demo</h3>
                <p className="text-gray-600 text-sm font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">Experience the project in action</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md cursor-pointer font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </button>
            <button
              onClick={() => setLocation("/all-projects")}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md cursor-pointer font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]"
            >
              View All Projects
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
