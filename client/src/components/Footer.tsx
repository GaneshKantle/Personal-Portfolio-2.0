import React from "react";
import { motion } from "framer-motion";
import { scrollToElement } from "../lib/utils";
import { DotPattern } from "./DotPattern";

const socialLinks = [
  { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/ganeshkantle", label: "LinkedIn" },
  { icon: "fab fa-github", url: "https://www.github.com/ganeshkantle", label: "GitHub" },
  { icon: "fab fa-twitter", url: "https://www.x.com/ganeshkantle", label: "Twitter" },
  // { icon: "fas fa-code", url: "https://leetcode.com/u/ganeshkantle/", label: "Leet Code" },
  { icon: "fab fa-instagram", url: "https://www.instagram.com/ganeshkantle", label: "Instagram" },
];

const footerNav = [
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <DotPattern />

      <div className="page-shell relative z-10">
        {/* Large brand mark */}
        <motion.div
          className="flex justify-center px-2 pb-10 pt-16 sm:pb-12 sm:pt-20 md:pt-24"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="select-none whitespace-nowrap font-bold leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.25rem, 9.5vw, 7.5rem)" }}
            aria-label="GaneshKantle"
          >
            <span className="text-primary">&lt;</span>
            GaneshKantle
            <span className="text-primary">/&gt;</span>
          </div>
        </motion.div>

        {/* Nav + contact */}
        <div className="border-t border-border pb-10 pt-8 text-center sm:pb-12 sm:pt-10">
          <nav
            className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mb-8 sm:gap-x-8"
            aria-label="Footer"
          >
            {footerNav.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToElement(link.id)}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <a
            href="mailto:ganeshkantle@gmail.com"
            className="block text-sm text-foreground/80 transition-colors hover:text-primary sm:text-base"
          >
            ganeshkantle@gmail.com
          </a>
          <p className="mt-1.5 text-sm text-muted-foreground">Bangalore, India</p>

          <div className="mt-6 flex justify-center gap-4 sm:mt-8 sm:gap-5">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex items-center justify-center text-base text-muted-foreground transition-colors hover:text-primary sm:text-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <i className={link.icon} aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-5 text-xs text-muted-foreground sm:flex-row sm:py-6 sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Ganesh Kantle. All rights reserved.</p>
          <p className="text-center sm:text-right">
            AI Web Developer · Web3 Explorer · Tech Writer
          </p>
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
}

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-10 isolate flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-md sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up text-sm sm:text-base" aria-hidden="true" />
    </motion.button>
  );
}
