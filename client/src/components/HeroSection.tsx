import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PageShell } from "./layout/PageShell";
import { DotPattern } from "./DotPattern";
import { scrollToElement } from "../lib/utils";
import { easeOutExpo } from "../lib/motion";
import profilePic from "../img/profile.jpg";

const roles = [
  "AI Web Developer",
  "Content Creator",
  "Freelancer",
  "Vibe Coder",
  "Web3 Developer",
  "Chess Player",
  "Basketball Player",
  "Magician",
  "Tech Entrepreneur",
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/ganeshkantle",
  },
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://www.github.com/ganeshkantle",
  },
];

const PROMPT_DELAY_MS = 5000;
const REVEAL_MS = 980;

type RevealPhase = "idle" | "wipe" | "open";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [glitchRole, setGlitchRole] = useState(false);

  const [promptVisible, setPromptVisible] = useState(false);
  const [promptFinished, setPromptFinished] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [revealPhase, setRevealPhase] = useState<RevealPhase>("idle");

  const dockVisible = promptFinished;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(roles[roleIndex]);
      return;
    }

    const full = roles[roleIndex];
    const typeSpeed = isDeleting ? 36 : 70;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && display === full) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && display === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 260);
    } else {
      timeout = setTimeout(() => {
        setDisplay(
          isDeleting
            ? full.slice(0, display.length - 1)
            : full.slice(0, display.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, roleIndex, prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const t = setTimeout(() => setPromptVisible(true), PROMPT_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const finishPrompt = () => {
    setPromptVisible(false);
    setPromptFinished(true);
  };

  const closePortrait = () => {
    setPhotoOpen(false);
    setRevealPhase("idle");
  };

  const openPortrait = () => {
    if (photoOpen || revealPhase === "wipe") return;

    setPromptVisible(false);

    if (prefersReducedMotion) {
      setRevealPhase("open");
      setPhotoOpen(true);
      setPromptFinished(true);
      return;
    }

    setRevealPhase("wipe");
    setGlitchRole(true);
    window.setTimeout(() => setGlitchRole(false), 180);
    window.setTimeout(() => {
      setRevealPhase("open");
      setPhotoOpen(true);
      setPromptFinished(true);
    }, REVEAL_MS);
  };

  useEffect(() => {
    if (!photoOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPhotoOpen(false);
        setRevealPhase("idle");
      }
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [photoOpen]);

  useEffect(() => {
    if (!promptVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPromptVisible(false);
        setPromptFinished(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [promptVisible]);

  const roleText = prefersReducedMotion ? roles[roleIndex] : display;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background"
      style={{ paddingTop: "var(--nav-offset)" }}
    >
      <DotPattern />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background)/0.85)_100%)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center text-center font-bold tracking-[0.08em] text-foreground/[0.035] dark:text-foreground/[0.05] text-[clamp(8rem,28vw,22rem)] leading-[0.85]">
          <span>Ganesh</span>
          <span>Kantle</span>
        </span>
      </div>

      <motion.div
        className="relative z-10 w-full py-10 sm:py-14"
        style={prefersReducedMotion ? undefined : { opacity }}
      >
        <PageShell>
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOutExpo }}
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:mb-8">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
              Open to work
            </p>

            <h1 className="font-bold tracking-tight text-foreground">
              <span className="block text-[clamp(3.25rem,10vw,6rem)] leading-[0.9]">
                I am
              </span>
              <span
                className={`mt-3 flex min-h-[1.2em] flex-wrap items-baseline justify-center gap-x-1 ${
                  glitchRole ? "hero-role-glitch" : ""
                }`}
              >
                <span className="text-[clamp(1.65rem,4.8vw,3rem)] font-semibold text-primary">
                  /
                </span>
                <span className="text-[clamp(1.65rem,4.8vw,3rem)] font-semibold text-primary">
                  {roleText}
                </span>
                <span
                  className="inline-block h-[0.9em] w-[3px] translate-y-[0.06em] bg-primary"
                  style={{
                    animation: prefersReducedMotion
                      ? undefined
                      : "hero-caret 1s step-end infinite",
                  }}
                  aria-hidden="true"
                />
              </span>
            </h1>

            <div className="mx-auto mt-7 h-px w-20 bg-border" />

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Building calm, fast interfaces - with chess, courts, and on-chain
              experiments in the mix.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => scrollToElement("projects")}
                className="rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:text-base"
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/drive/folders/1uNqBhasvr7ovsl79eEA4_6PkM6cGvN3n?usp=sharing",
                    "_blank"
                  )
                }
                className="rounded-full border border-border bg-background px-7 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary sm:text-base"
              >
                Resume
              </Button>
            </div>

            <div className="mt-7 flex items-center justify-center gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={link.name}
                >
                  <i className={`${link.icon} text-lg`} />
                </a>
              ))}
            </div>
          </motion.div>
        </PageShell>
      </motion.div>

      {!dockVisible && (
        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 sm:bottom-7">
          <motion.button
            type="button"
            className="text-muted-foreground transition-colors hover:text-primary"
            onClick={() => scrollToElement("about")}
            whileHover={{ y: 3 }}
            aria-label="Scroll to about"
          >
            <motion.i
              className="fas fa-chevron-down text-sm"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.button>
        </div>
      )}

      {/* Sealed empty frame — photo never shown until click */}
      <AnimatePresence>
        {promptVisible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-background/55"
              aria-label="Dismiss"
              onClick={finishPrompt}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="hero-face-prompt-title"
              className="relative z-10 w-full max-w-[17.5rem] sm:max-w-[19rem]"
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              transition={{ duration: 0.45, ease: easeOutExpo }}
            >
              <button
                type="button"
                onClick={finishPrompt}
                className="absolute -right-1 -top-11 z-20 flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <i className="fas fa-times" />
              </button>

              <motion.button
                type="button"
                onClick={openPortrait}
                className="group relative block w-full text-left"
                whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                aria-label="Show photo"
              >
                <div
                  className="pointer-events-none absolute -inset-3 border border-primary/20"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -right-2 -top-2 h-11 w-11 border-r-2 border-t-2 border-primary sm:h-12 sm:w-12"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-2 -left-2 h-11 w-11 border-b-2 border-l-2 border-primary sm:h-12 sm:w-12"
                  aria-hidden="true"
                />

                {/* Empty slot — no portrait */}
                <div className="relative aspect-[4/5] overflow-hidden border border-border bg-muted">
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, hsl(var(--foreground) / 0.03) 25%, transparent 25%), linear-gradient(225deg, hsl(var(--foreground) / 0.03) 25%, transparent 25%), linear-gradient(45deg, hsl(var(--foreground) / 0.03) 25%, transparent 25%), linear-gradient(315deg, hsl(var(--foreground) / 0.03) 25%, transparent 25%)",
                      backgroundPosition: "10px 0, 10px 0, 0 0, 0 0",
                      backgroundSize: "20px 20px",
                      backgroundRepeat: "repeat",
                    }}
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute inset-x-0 h-px bg-primary/50"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { top: ["8%", "92%", "8%"] }
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    aria-hidden="true"
                  />

                  {/* Seal band */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[118%] -rotate-6 border border-border bg-background px-4 py-3.5 shadow-sm">
                      <h2
                        id="hero-face-prompt-title"
                        className="text-center text-base font-semibold tracking-tight text-foreground sm:text-lg"
                      >
                        Wanna see how I look?
                      </h2>
                    </div>
                  </div>
                </div>
              </motion.button>

              <Button
                size="lg"
                onClick={openPortrait}
                className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background hover:opacity-90"
              >
                Open
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film develop wipe */}
      <AnimatePresence>
        {revealPhase === "wipe" && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <motion.div
              className="relative h-[min(72vh,30rem)] w-[min(100%-2rem,22rem)] overflow-hidden border border-foreground/20 bg-muted sm:w-[24rem]"
              initial={{ scale: 0.72, y: 48, opacity: 0.4 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              {/* Darkroom fog */}
              <motion.div
                className="absolute inset-0 z-20 bg-background"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
              />

              {/* Developing scan */}
              <motion.div
                className="absolute inset-x-0 z-30 h-16 bg-gradient-to-b from-transparent via-foreground/25 to-transparent mix-blend-overlay"
                initial={{ top: "-20%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 0.75, delay: 0.12, ease: "easeInOut" }}
              />

              {/* Preview ghost — soft, not fully clear yet */}
              <motion.img
                src={profilePic}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
                initial={{ opacity: 0, filter: "blur(14px) brightness(1.35) contrast(0.75)" }}
                animate={{
                  opacity: 0.85,
                  filter: "blur(2px) brightness(1.05) contrast(0.95)",
                }}
                transition={{ duration: 0.7, delay: 0.22, ease: easeOutExpo }}
              />

              <div className="absolute inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3">
                <motion.p
                  className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Developing portrait…
                </motion.p>
                <motion.div
                  className="mt-2 h-0.5 origin-left bg-foreground"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: easeOutExpo }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portrait lightbox */}
      <AnimatePresence>
        {photoOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              aria-label="Close portrait"
              onClick={closePortrait}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Portrait"
              className="relative z-10 w-full max-w-[min(100%,22rem)] sm:max-w-[24rem]"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 36, rotate: -2.5, scale: 0.94 }
              }
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.97 }
              }
              transition={{ duration: 0.65, ease: easeOutExpo }}
            >
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closePortrait}
                className="absolute -right-1 -top-10 z-20 flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:-right-2 sm:-top-11"
                aria-label="Close"
              >
                <i className="fas fa-times text-lg" />
              </button>

              <div className="relative">
                <motion.div
                  className="pointer-events-none absolute -inset-3 border border-foreground/15"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                />
                <motion.div
                  className="pointer-events-none absolute -right-2 -top-2 h-12 w-12 border-r-2 border-t-2 border-foreground/50 sm:h-14 sm:w-14"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 8, y: -8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: easeOutExpo }}
                />
                <motion.div
                  className="pointer-events-none absolute -bottom-2 -left-2 h-12 w-12 border-b-2 border-l-2 border-foreground/50 sm:h-14 sm:w-14"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -8, y: 8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: easeOutExpo }}
                />
                <div className="relative overflow-hidden border border-border bg-muted">
                  <motion.img
                    src={profilePic}
                    alt="Portrait"
                    className="aspect-[4/5] max-h-[min(72vh,30rem)] w-full object-cover object-[center_15%]"
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 0.55,
                            filter: "blur(8px) brightness(1.2) contrast(0.85)",
                            scale: 1.06,
                          }
                    }
                    animate={{
                      opacity: 1,
                      filter: "blur(0px) brightness(1) contrast(1)",
                      scale: 1,
                    }}
                    transition={{ duration: 0.85, ease: easeOutExpo }}
                  />
                </div>
              </div>
              <motion.p
                className="mt-4 text-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                Bangalore · Remote-ready
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom recovery — portrait ticket dock */}
      <AnimatePresence>
        {dockVisible && !photoOpen && revealPhase !== "wipe" && (
          <motion.div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.1rem,env(safe-area-inset-bottom))]"
            initial={prefersReducedMotion ? false : { y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <motion.button
              type="button"
              onClick={openPortrait}
              className="pointer-events-auto group relative flex w-full max-w-[18.5rem] items-stretch overflow-hidden border border-foreground/15 bg-card shadow-[0_18px_50px_-28px_rgba(0,0,0,0.55)]"
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
              aria-label="Show photo"
            >
              {/* Corner marks */}
              <span
                className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-foreground/40"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-foreground/40"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-foreground/40"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-foreground/40"
                aria-hidden="true"
              />

              {/* Film strip thumb */}
              <span className="relative flex w-14 shrink-0 flex-col justify-between border-r border-dashed border-border bg-muted py-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="mx-auto block h-1.5 w-2.5 rounded-[1px] bg-background/90"
                    aria-hidden="true"
                  />
                ))}
                <span
                  className="absolute inset-2 border border-border/70 bg-background/40"
                  aria-hidden="true"
                />
                <motion.span
                  className="absolute inset-x-2 h-px bg-foreground/40"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { top: ["18%", "82%", "18%"] }
                  }
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
              </span>

              <span className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-3 text-left">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  Portrait · sealed
                </span>
                <span className="mt-1 text-sm font-semibold tracking-tight text-foreground">
                  Wanna see how I look?
                </span>
              </span>

              <span className="flex shrink-0 items-center border-l border-border bg-foreground px-3.5 text-background transition-opacity group-hover:opacity-90">
                <span className="flex flex-col items-center gap-1">
                  <i className="fas fa-arrow-up-right text-[10px]" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                    Open
                  </span>
                </span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes hero-caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes hero-glitch {
          0% { transform: translate(0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, 0); }
          100% { transform: translate(0); }
        }
        .hero-role-glitch {
          animation: hero-glitch 0.18s steps(2) 1;
        }
      `}</style>
    </section>
  );
}
