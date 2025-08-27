import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
// import BlogSection from "../components/BlogSection";
import CertificatesSection from "../components/CertificatesSection";
import ActivitiesSection from "../components/ActivitiesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useScrollRouting } from "../hooks/useScrollRouting";

export default function Home() {
  // Use scroll-based routing
  useScrollRouting();
  
  // Apply matrix-like background effect and custom styles
  useEffect(() => {
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        .matrix-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .dark .matrix-bg::before {
          background: linear-gradient(rgba(15,23,42,0.9), rgba(15,23,42,0.99));
        }
        
        .light .matrix-bg::before {
          background: linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.98));
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        .dark ::-webkit-scrollbar-track {
          background: rgba(30,41,59,0.5);
        }
        
        .dark ::-webkit-scrollbar-thumb {
          background: rgba(59,130,246,0.7);
          border-radius: 4px;
        }
        
        .light ::-webkit-scrollbar-track {
          background: rgba(220,220,220,0.5);
        }
        
        .light ::-webkit-scrollbar-thumb {
          background: rgba(59,130,246,0.5);
          border-radius: 4px;
        }
      `;
      document.head.appendChild(style);
    };

    addCustomStyles();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      {/* <BlogSection /> */}
      <CertificatesSection />
      <ActivitiesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
