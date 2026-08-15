import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProductionWorkSection from "../components/ProductionWorkSection";
import ProjectsSection from "../components/ProjectsSection";
// import BlogSection from "../components/BlogSection";
import CertificatesSection from "../components/CertificatesSection";
import ActivitiesSection from "../components/ActivitiesSection";
import GitHubStatsSection from "../components/GitHubStatsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useScrollRouting } from "../hooks/useScrollRouting";

export default function Home() {
  // Use scroll-based routing
  useScrollRouting();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <GitHubStatsSection />
      <ExperienceSection />
      <ProductionWorkSection />
      <ProjectsSection />
      {/* <BlogSection /> */}
      <CertificatesSection />
      <ActivitiesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
