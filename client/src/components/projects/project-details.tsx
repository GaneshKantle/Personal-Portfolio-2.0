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
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-muted-foreground mb-4">Project Not Found</h1>
            <button onClick={() => setLocation("/")} className="text-primary hover:underline cursor-pointer">← Back to Home</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              {project.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {project.tagline}
            </p>
            <p className="text-lg text-foreground max-w-4xl mx-auto leading-relaxed">
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
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-2xl font-bold text-primary mb-2">{project.developmentTime}</div>
              <div className="text-sm text-muted-foreground">Development Time</div>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-2xl font-bold text-primary mb-2">{project.teamSize}</div>
              <div className="text-sm text-muted-foreground">Team Size</div>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-2xl font-bold text-primary mb-2">{project.difficulty}</div>
              <div className="text-sm text-muted-foreground">Complexity</div>
            </div>
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="text-2xl font-bold text-primary mb-2">{project.status}</div>
              <div className="text-sm text-muted-foreground">Status</div>
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
              className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              View Live Project
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-card hover:bg-card/80 text-primary hover:text-primary/80 border border-border hover:border-primary font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <i className="fab fa-github mr-2"></i>
              View Source Code
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-card hover:bg-card/80 text-primary hover:text-primary/80 border border-border hover:border-primary font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <i className="fas fa-play mr-2"></i>
                Watch Demo
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Screenshots */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Project Screenshots</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                <div className="bg-background rounded-xl overflow-hidden shadow-lg border border-border group-hover:border-primary transition-all duration-300">
                  <div className="p-4 bg-card border-b border-border flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">{screenshot.alt}</div>
                  </div>
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground text-center">{screenshot.caption}</p>
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
                <h3 className="text-2xl font-bold font-display mb-6 text-primary">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary transition-colors duration-200"
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
                <h3 className="text-2xl font-bold font-display mb-6 text-primary">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">{feature}</span>
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
                <h3 className="text-2xl font-bold font-display mb-6 text-primary">Architecture</h3>
                <p className="text-foreground leading-relaxed">{project.architecture}</p>
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
                <h3 className="text-2xl font-bold font-display mb-6 text-primary">Challenges Faced</h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">{challenge}</span>
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
                <h3 className="text-2xl font-bold font-display mb-6 text-primary">Key Learnings</h3>
                <ul className="space-y-3">
                  {project.learnings.map((learning: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-foreground">{learning}</span>
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
                <h3 className="text-2xl font-bold font-display mb-6 text-primary">Project Impact</h3>
                <p className="text-foreground leading-relaxed">{project.impact}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Additional Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore more about this project through documentation and related resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.documentationUrl && (
              <motion.a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center">
                  <i className="fas fa-book text-3xl text-primary mb-4 group-hover:scale-110 transition-transform duration-200"></i>
                  <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                  <p className="text-muted-foreground text-sm">Comprehensive project documentation and setup guides</p>
                </div>
              </motion.a>
            )}

            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-background rounded-xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="text-center">
                <i className="fab fa-github text-3xl text-primary mb-4 group-hover:scale-110 transition-transform duration-200"></i>
                <h3 className="text-xl font-semibold mb-2">Source Code</h3>
                <p className="text-muted-foreground text-sm">Browse the complete source code and contribute</p>
              </div>
            </motion.a>

            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-background rounded-xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center">
                <i className="fas fa-external-link-alt text-3xl text-primary mb-4 group-hover:scale-110 transition-transform duration-200"></i>
                <h3 className="text-xl font-semibold mb-2">Live Demo</h3>
                <p className="text-muted-foreground text-sm">Experience the project in action</p>
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
              className="inline-flex items-center justify-center px-8 py-4 bg-card hover:bg-card/80 text-primary hover:text-primary/80 border border-border hover:border-primary font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </button>
            <button
              onClick={() => setLocation("/all-projects")}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg cursor-pointer"
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
