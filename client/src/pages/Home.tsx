import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import CertificatesSection from "@/components/CertificatesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  // Apply matrix-like background effect
  useEffect(() => {
    const addMatrixEffect = () => {
      const style = document.createElement('style');
      style.textContent = `
        .matrix-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(15,23,42,0.9), rgba(15,23,42,0.99));
          z-index: 1;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(30,41,59,0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(59,130,246,0.7);
          border-radius: 4px;
        }
      `;
      document.head.appendChild(style);
    };

    addMatrixEffect();
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
      <BlogSection />
      <CertificatesSection />
      <ActivitiesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
