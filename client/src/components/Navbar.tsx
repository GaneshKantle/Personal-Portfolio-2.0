import React from "react";
import { useEffect, useState } from "react";
import { scrollToElement } from "../lib/utils";
import { useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  // { name: "Home", href: "#home", isHash: true },
  { name: "About", href: "#about", isHash: true },
  { name: "Skills", href: "#skills", isHash: true },
  { name: "Experience", href: "#experience", isHash: true },
  { name: "Production", href: "#production", isHash: true },
  { name: "Projects", href: "#projects", isHash: true },
  { name: "Contact", href: "#contact", isHash: true },
  { name: "Resume", href: "#resume", isHash: true }, // special case in handler
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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
      setIsNavigating(true);
      setLocation("/");

      // Use a more reliable approach with multiple checks
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loops

      const checkAndScroll = () => {
        attempts++;
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          scrollToElement(id);
          setIsNavigating(false);
        } else if (attempts < maxAttempts) {
          // If element not found and we haven't exceeded max attempts, wait a bit more and try again
          setTimeout(checkAndScroll, 100);
        } else {
          // If max attempts reached, just stop trying
          setIsNavigating(false);
        }
      };

      // Start checking after a short delay
      setTimeout(checkAndScroll, 100);
    }

    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      setLocation("/");
      // Reset navigation state after a short delay
      setTimeout(() => setIsNavigating(false), 500);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl border-b border-border ${
          scrolled ? "bg-background/95 shadow-sm" : "bg-background/80"
        }`}
      >
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16 lg:h-20">
            {/* Left side - Logo */}
            <div
              className={`flex items-center cursor-pointer group transition-all duration-300 hover:scale-105 ${
                isNavigating ? "opacity-70" : ""
              }`}
              onClick={handleLogoClick}
            >
              <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-primary mr-1 group-hover:text-primary/80 transition-colors">
                &lt;
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                GaneshKantle
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-primary ml-1 group-hover:text-primary/80 transition-colors">
                /&gt;
              </span>
              {isNavigating && (
                <div className="ml-2 w-3 h-3 sm:w-4 sm:h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>

            {/* Right side - Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-auto space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.isHash)}
                  disabled={isNavigating}
                  className={`relative text-muted-foreground hover:text-primary transition-all duration-300 group font-medium px-3 lg:px-4 py-2 ${
                    isNavigating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              <ThemeToggle className="ml-2" />
            </div>

            {/* Right side - Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden ml-auto">
              <ThemeToggle />
              <button
                className="relative w-8 h-8 sm:w-10 sm:h-10 flex flex-col items-center justify-center space-y-1 sm:space-y-1.5 group"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-5 sm:w-6 h-0.5 bg-muted-foreground group-hover:bg-primary transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5 sm:translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 sm:w-6 h-0.5 bg-muted-foreground group-hover:bg-primary transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 sm:w-6 h-0.5 bg-muted-foreground group-hover:bg-primary transition-all duration-300 ${
                    mobileMenuOpen
                      ? "-rotate-45 -translate-y-1.5 sm:-translate-y-2"
                      : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Mobile menu slide-in from right */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[90vw] z-50 bg-background/95 backdrop-blur-xl border-l border-border shadow-lg transition-transform duration-500 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <div className="flex items-center">
              <span className="text-lg sm:text-xl font-semibold text-primary mr-1">
                &lt;
              </span>
              <span className="text-lg sm:text-xl font-semibold text-foreground">
                GaneshKantle
              </span>
              <span className="text-lg sm:text-xl font-semibold text-primary ml-1">
                /&gt;
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 border border-border transition-all duration-300 ease-in-out"
              aria-label="Close menu"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu content */}
          <div className="flex-1 p-4 sm:p-6 space-y-2 overflow-y-auto">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.isHash)}
                disabled={isNavigating}
                className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium group ${
                  isNavigating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative text-sm sm:text-base">
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
