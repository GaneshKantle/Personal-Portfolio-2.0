import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { scrollToElement, RESUME_URL } from "../lib/utils";
import { useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { DotPattern } from "./DotPattern";

const navLinks = [
  { name: "About", href: "#about", isHash: true },
  { name: "Skills", href: "#skills", isHash: true },
  { name: "Experience", href: "#experience", isHash: true },
  { name: "Production", href: "#production", isHash: true },
  { name: "Projects", href: "#projects", isHash: true },
  { name: "Contact", href: "#contact", isHash: true },
  { name: "Resume", href: "#resume", isHash: true },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [location, setLocation] = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const isHomePage = location === "/";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        setScrolled((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setHoveredIndex(null);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((open) => !open);

  const handleNavClick = (href: string, isHash: boolean) => {
    if (isHash && isHomePage) {
      const id = href.substring(1);
      scrollToElement(id);
    } else if (!isHash) {
      setLocation(href);
    } else {
      setIsNavigating(true);
      setLocation("/");

      let attempts = 0;
      const maxAttempts = 10;

      const checkAndScroll = () => {
        attempts++;
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          scrollToElement(id);
          setIsNavigating(false);
        } else if (attempts < maxAttempts) {
          setTimeout(checkAndScroll, 100);
        } else {
          setIsNavigating(false);
        }
      };

      setTimeout(checkAndScroll, 100);
    }

    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      setLocation("/");
      setTimeout(() => setIsNavigating(false), 500);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-border transition-colors duration-300 ${
          scrolled
            ? "bg-background/95 shadow-sm backdrop-blur-md"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <DotPattern />
        <div className="page-shell relative z-10">
          <div className="flex h-14 items-center sm:h-16 lg:h-20">
            <div
              className={`group flex min-w-0 cursor-pointer items-center transition-all duration-300 hover:scale-105 ${
                isNavigating ? "opacity-70" : ""
              }`}
              onClick={handleLogoClick}
            >
              <span className="mr-1 shrink-0 text-base font-semibold text-primary transition-colors group-hover:text-primary/80 xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                &lt;
              </span>
              <span className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                GaneshKantle
              </span>
              <span className="ml-1 shrink-0 text-base font-semibold text-primary transition-colors group-hover:text-primary/80 xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                /&gt;
              </span>
              {isNavigating && (
                <div className="ml-2 h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent sm:h-4 sm:w-4" />
              )}
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={toggleMenu}
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                className="group relative flex h-10 items-center gap-2.5 overflow-hidden rounded-md border border-border bg-background px-3 text-foreground transition-colors duration-300 hover:border-primary/40 hover:bg-muted sm:h-11 sm:gap-3 sm:px-3.5"
              >
                <span className="relative h-3.5 w-5 sm:h-4 sm:w-5">
                  <motion.span
                    className="absolute left-0 top-0 block h-[1.5px] origin-center bg-current"
                    animate={
                      menuOpen
                        ? { rotate: 45, y: 6.5, width: "100%" }
                        : { rotate: 0, y: 0, width: "100%" }
                    }
                    transition={{ duration: 0.35, ease }}
                  />
                  <motion.span
                    className="absolute left-0 top-1/2 block h-[1.5px] -translate-y-1/2 bg-current"
                    animate={
                      menuOpen
                        ? { opacity: 0, x: 6, width: "55%" }
                        : { opacity: 1, x: 0, width: "70%" }
                    }
                    transition={{ duration: 0.25, ease }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 block h-[1.5px] origin-center bg-current"
                    animate={
                      menuOpen
                        ? { rotate: -45, y: -6.5, width: "100%" }
                        : { rotate: 0, y: 0, width: "42%" }
                    }
                    transition={{ duration: 0.35, ease }}
                  />
                </span>
                <span className="relative h-4 overflow-hidden text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={menuOpen ? "close" : "explore"}
                      className="block"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { y: 12, opacity: 0 }
                      }
                      animate={{ y: 0, opacity: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { y: -12, opacity: 0 }
                      }
                      transition={{ duration: 0.22, ease }}
                    >
                      {menuOpen ? "Close" : "Explore"}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0 0 100% 0)" }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0 0 0% 0)" }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease }}
          >
            <DotPattern className="opacity-80" />

            {/* Ambient brand wash */}
            <div
              className="pointer-events-none absolute -right-24 top-1/4 h-[55vh] w-[55vh] rounded-full bg-primary/[0.07] blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-20 bottom-0 h-[40vh] w-[40vh] rounded-full bg-secondary/[0.08] blur-3xl"
              aria-hidden="true"
            />

            {/* Top bar inside overlay */}
            <div className="page-shell relative z-10">
              <div className="flex h-14 items-center justify-between border-b border-border/70 sm:h-16 lg:h-20">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">
                    nav.open
                  </span>
                  <span className="hidden h-1 w-1 rounded-full bg-success sm:inline-block" />
                  <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline sm:text-xs">
                    index[{navLinks.length}]
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground sm:text-xs"
                  aria-label="Close menu"
                >
                  <span>esc</span>
                  <span className="flex h-8 w-8 items-center justify-center border border-border transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="page-shell relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden py-6 sm:py-8 lg:py-10">
              <nav
                className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden"
                aria-label="Primary"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ul className="divide-y divide-border/60 border-y border-border/60">
                  {navLinks.map((link, index) => {
                    const isHovered = hoveredIndex === index;
                    const dimmed =
                      hoveredIndex !== null && hoveredIndex !== index;
                    const isResume = link.href === "#resume";
                    const itemClassName = `group relative flex w-full items-center gap-4 py-3 text-left transition-opacity duration-300 sm:gap-6 sm:py-3.5 md:py-4 ${
                      dimmed ? "opacity-35" : "opacity-100"
                    } ${isNavigating && !isResume ? "cursor-not-allowed" : ""}`;
                    const itemInner = (
                      <>
                        <span
                          className={`font-mono text-[10px] tabular-nums transition-colors duration-300 sm:text-xs ${
                            isHovered
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`relative text-2xl font-semibold tracking-tight transition-all duration-300 xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] ${
                            isHovered
                              ? "translate-x-2 text-primary sm:translate-x-3"
                              : "text-foreground"
                          }`}
                        >
                          {link.name}
                          <span
                            className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500 ${
                              isHovered ? "w-full" : "w-0"
                            }`}
                          />
                        </span>

                        <span
                          className={`ml-auto hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-all duration-300 sm:flex sm:text-xs ${
                            isHovered
                              ? "translate-x-0 opacity-100"
                              : "translate-x-3 opacity-0"
                          }`}
                        >
                          {isResume ? "open ↗" : "scroll →"}
                        </span>
                      </>
                    );

                    return (
                      <motion.li
                        key={link.name}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 28 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -8 }
                        }
                        transition={{
                          duration: 0.45,
                          delay: prefersReducedMotion ? 0 : 0.08 + index * 0.045,
                          ease,
                        }}
                      >
                        {isResume ? (
                          <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onFocus={() => setHoveredIndex(index)}
                            className={itemClassName}
                          >
                            {itemInner}
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleNavClick(link.href, link.isHash)
                            }
                            onMouseEnter={() => setHoveredIndex(index)}
                            onFocus={() => setHoveredIndex(index)}
                            disabled={isNavigating}
                            className={itemClassName}
                          >
                            {itemInner}
                          </button>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer meta */}
              <motion.div
                className="mt-6 flex flex-col gap-4 border-t border-border/70 pt-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:pt-6"
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: prefersReducedMotion ? 0 : 0.4,
                  ease,
                }}
              >
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    status
                  </p>
                  <p className="flex items-center gap-2 text-sm text-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    Available for opportunities
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <a
                    href="mailto:ganeshkantle@gmail.com"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    ganeshkantle@gmail.com
                  </a>
                  <a
                    href="https://www.github.com/ganeshkantle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ganeshkantle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
