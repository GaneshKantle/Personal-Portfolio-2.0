import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { scrollToElement } from "../lib/utils";
import { useLocation } from "wouter";

const navLinks = [
  { name: "Home", href: "#home", isHash: true },
  { name: "About", href: "#about", isHash: true },
  { name: "Skills", href: "#skills", isHash: true },
  { name: "Experience", href: "#experience", isHash: true },
  { name: "Projects", href: "#projects", isHash: true },
  { name: "Contact", href: "#contact", isHash: true },
  { name: "Resume", href: "#resume", isHash: true }, // special case in handler
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location, setLocation] = useLocation();

  // Check if we're on the home page
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (href: string, isHash: boolean) => {
    if (href === "#resume") {
      window.open(
        "https://drive.google.com/drive/folders/1uNqBhasvr7ovsl79eEA4_6PkM6cGvN3n?usp=sharing",
        "_blank"
      );
      setMobileMenuOpen(false);
      return;
    }

    if (isHash && isHomePage) {
      // Hash navigation on home page
      const id = href.substring(1);
      scrollToElement(id);
    } else if (!isHash) {
      // Router navigation for other pages
      setLocation(href);
    } else {
      // If on other pages and trying to use hash, go to home first
      setLocation("/");
      // Wait a bit then scroll to the section
      setTimeout(() => {
        const id = href.substring(1);
        scrollToElement(id);
      }, 100);
    }
    
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setLocation("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl border-b-2 border-primary/20 ${
          scrolled 
            ? "bg-background/95 border-primary/40 shadow-lg" 
            : "bg-transparent border-primary/20"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            {/* Left side - Logo */}
            <div 
              className="flex items-center cursor-pointer group transition-all duration-300 hover:scale-105" 
              onClick={handleLogoClick}
            >
              <span className="text-xl lg:text-1xl xl:text-2xl font-bold font-mono text-primary mr-1 group-hover:text-primary/80 transition-colors">&lt;</span>
              <span className="text-xl lg:text-1xl xl:text-2xl font-bold font-mono group-hover:text-primary transition-colors">GaneshKantle</span>
              <span className="text-xl lg:text-1xl xl:text-2xl font-bold font-mono text-primary ml-1 group-hover:text-primary/80 transition-colors">/&gt;</span>
            </div>

            {/* Right side - Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-auto">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.isHash)}
                  className="relative text-muted-foreground hover:text-primary transition-all duration-300 group font-medium px-4 py-2"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Right side - Mobile menu button */}
            <div className="flex items-center lg:hidden ml-auto">
              <button
                className="relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-muted-foreground group-hover:bg-primary transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`block w-6 h-0.5 bg-muted-foreground group-hover:bg-primary transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-6 h-0.5 bg-muted-foreground group-hover:bg-primary transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Mobile menu slide-in from right */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl transition-transform duration-500 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center">
              <span className="text-xl font-bold font-mono text-primary mr-1">&lt;</span>
              <span className="text-xl font-bold font-mono">GaneshKantle</span>
              <span className="text-xl font-bold font-mono text-primary ml-1">/&gt;</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-card hover:bg-card/80 border border-border transition-colors"
              aria-label="Close menu"
            >
              <i className="fas fa-times text-muted-foreground"></i>
            </button>
          </div>

          {/* Mobile menu content */}
          <div className="flex-1 p-6 space-y-2">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.isHash)}
                className="w-full text-left px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
