import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Button } from "../components/ui/button";
import { getAllProjects } from "../shared/projectData";
import { DotPattern } from "./DotPattern";

const projects = getAllProjects();

interface Project {
  id: number;
  title: string;
  tagline?: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  category?: string;
  status?: string;
  difficulty?: string;
}

const CARD_WIDTH =
  "w-[min(85vw,20rem)] sm:w-[22rem] md:w-[24rem] xl:w-[28rem] 3xl:w-[32rem]";
const CARD_HEIGHT =
  "h-[min(420px,calc(100svh-14rem))] sm:h-[min(440px,calc(100svh-15rem))]";

function CropMarks() {
  const mark =
    "pointer-events-none absolute h-3 w-3 border-foreground/35 sm:h-3.5 sm:w-3.5";
  return (
    <>
      <span className={`${mark} left-2 top-2 border-l border-t`} />
      <span className={`${mark} right-2 top-2 border-r border-t`} />
      <span className={`${mark} bottom-2 left-2 border-b border-l`} />
      <span className={`${mark} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, hsl(var(--primary) / 0.18), transparent 55%)`;

  const specimenNo = String(index + 1).padStart(2, "0");
  const techLine = project.technologies.slice(0, 5).join(" · ");
  const metaBits = [
    project.category,
    project.difficulty,
    project.status,
  ].filter(Boolean);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
            }
      }
      className={`group relative z-10 box-border flex ${CARD_WIDTH} ${CARD_HEIGHT} shrink-0 flex-col overflow-hidden rounded-none border border-foreground/15 bg-card shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]`}
    >
      <CropMarks />

      {/* Specimen index watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 top-6 z-0 select-none font-mono text-[7.5rem] font-bold leading-none tracking-tighter text-foreground/[0.04] transition-colors duration-500 group-hover:text-primary/[0.08] sm:text-[9rem]"
      >
        {specimenNo}
      </span>

      {/* Image plate */}
      <div className="relative h-[58%] min-h-[190px] shrink-0 overflow-hidden border-b border-foreground/10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,hsl(var(--card)_/_0.92)_100%)] z-[1]" />
        <img
          src={project.image}
          alt={`${project.title} Screenshot`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />

        <div className="absolute left-3 top-3 z-[3] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 sm:left-4 sm:top-4">
          <span className="rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
            SPEC {specimenNo}
          </span>
          {project.status ? (
            <span className="rounded-sm border border-white/25 bg-black/35 px-2 py-1 backdrop-blur-sm">
              {project.status}
            </span>
          ) : null}
        </div>

        {/* Film sprocket edge */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 z-[3] flex w-3 flex-col justify-between py-2 sm:w-3.5"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="mx-auto block h-2 w-1.5 rounded-[1px] bg-background/80 shadow-sm sm:h-2.5 sm:w-2"
            />
          ))}
        </div>
      </div>

      {/* Label plate */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pt-4">
        <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="truncate">{metaBits.join(" / ") || "Archive"}</span>
          <span className="shrink-0 tabular-nums">{specimenNo}</span>
        </div>

        <h3 className="shrink-0 text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-1.5 shrink-0 text-sm font-medium leading-snug text-primary/90">
          {project.tagline || project.description}
        </p>

        <p className="mt-0 max-h-0 overflow-hidden text-sm leading-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-12 group-hover:opacity-100 group-focus-within:mt-2 group-focus-within:max-h-12 group-focus-within:opacity-100 max-sm:mt-2 max-sm:max-h-12 max-sm:line-clamp-2 max-sm:opacity-100">
          {project.description}
        </p>

        <div className="mt-auto overflow-hidden border-y border-dashed border-border py-2">
          <p className="truncate font-mono text-[11px] tracking-wide text-muted-foreground transition-colors group-hover:text-foreground/80">
            {techLine}
            {project.technologies.length > 5
              ? ` · +${project.technologies.length - 5}`
              : ""}
          </p>
        </div>

        <div className="mt-3 flex shrink-0 items-center gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 flex-1 items-center justify-center gap-2 bg-foreground text-xs font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 sm:text-sm"
          >
            Open live
            <i className="fas fa-arrow-up-right-from-square text-[10px]" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground/40 hover:bg-muted"
            aria-label={`${project.title} source code`}
          >
            <i className="fab fa-github" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function SnapGallery() {
  return (
    <section id="projects" className="section-y relative overflow-hidden bg-background">
      <DotPattern />
      <div className="page-shell relative z-10">
        <div className="mb-8 text-center">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Selected work
          </p>
          <h2 className="text-title mb-3 font-semibold tracking-tight text-foreground">
            Project <span className="text-primary">Specimens</span>
          </h2>
          <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-primary sm:w-20" />
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Swipe the archive — each plate is a build you can open.
          </p>
        </div>
        <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-4 snap-x snap-mandatory sm:gap-5">
          {projects.map((project, index) => (
            <div key={project.id} className="snap-start">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="/all-projects">
            <Button
              size="lg"
              className="rounded-none bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 sm:px-8 sm:py-3 sm:text-base"
            >
              View full archive
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function useIsMdUp() {
  // Avoid a false→true flip on desktop (that remounts a ~100vh section and
  // advances scroll progress before travel is measured).
  const [isMd, setIsMd] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMd(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMd;
}

/** Vertical scroll distance per 1px of horizontal travel — slows the gallery. */
const SCROLL_PX_PER_TRAVEL = 2.4;
/** Hold first cards still at the start so momentum from prior sections doesn't skip them. */
const INTRO_HOLD = 0.18;
/** Hold the final card / CTA briefly before releasing to the next section. */
const OUTRO_HOLD = 0.1;
/** Rough card+gap width used only to size the section before measure settles. */
const EST_CARD_TRAVEL = 420;

function estimateTravel(viewportWidth: number) {
  const trackItems = projects.length + 1; // cards + "View all" CTA
  return Math.max(0, trackItems * EST_CARD_TRAVEL - viewportWidth);
}

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMd = useIsMdUp();
  const containerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Non-zero estimate so the pin distance is never ~0vh (that maxes progress
  // immediately, then snaps the track to the CTA once real travel is known).
  const [travel, setTravel] = useState(() =>
    typeof window !== "undefined" ? estimateTravel(window.innerWidth) : 0
  );
  const [trackReady, setTrackReady] = useState(false);

  useLayoutEffect(() => {
    if (!isMd || prefersReducedMotion) return;
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const maxTravel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setTravel((prev) => (prev === maxTravel ? prev : maxTravel));
      setTrackReady(true);
    };

    measure();
    // Re-measure after layout/fonts settle so travel isn't understated.
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    if (trackRef.current && ro) ro.observe(trackRef.current);
    if (viewportRef.current && ro) ro.observe(viewportRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [isMd, prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dead zones at both ends: first cards stay on screen, then the track moves.
  // Until the track is measured, keep x at 0 so a stale progress value (from a
  // too-short pre-measure height) cannot jump straight to the CTA.
  const endX = trackReady ? -travel : 0;
  const x = useTransform(
    scrollYProgress,
    [0, INTRO_HOLD, 1 - OUTRO_HOLD, 1],
    [0, 0, endX, endX]
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scrollBudget = Math.max(travel * SCROLL_PX_PER_TRAVEL, 800);

  if (prefersReducedMotion || !isMd) {
    return (
      <>
        <SnapGallery />
        <SectionSeparator />
      </>
    );
  }

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative isolate bg-background"
        style={{ height: `calc(100svh + ${scrollBudget}px)` }}
      >
        <div
          ref={viewportRef}
          className="sticky top-0 z-10 flex h-[100svh] flex-col overflow-x-hidden overflow-y-hidden bg-background"
        >
          <DotPattern />
          <div className="page-shell relative z-10 shrink-0 pt-16 sm:pt-20">
            <div className="mb-3 text-center sm:mb-4">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Selected work
              </p>
              <h2 className="text-title mb-2 font-semibold tracking-tight text-foreground">
                Project <span className="text-primary">Specimens</span>
              </h2>
              <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-primary sm:w-20" />
              <p className="mx-auto max-w-2xl px-2 text-sm text-muted-foreground sm:text-base">
                Keep scrolling — the archive slides sideways. Each plate is a
                build you can open.
              </p>
            </div>

            <div className="mx-auto mb-4 h-1 max-w-xs overflow-hidden rounded-full bg-muted sm:mb-5">
              <motion.div
                className="h-full origin-left rounded-full bg-primary"
                style={{ width: progressWidth }}
              />
            </div>
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-start pb-6 pt-1 sm:pb-8">
            <motion.div
              ref={trackRef}
              className="flex items-center gap-5 pl-4 pr-8 sm:gap-6 sm:pl-8 sm:pr-12 md:pl-12 md:pr-16 lg:pl-16 [perspective:1200px]"
              style={{ x }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}

              <a
                href="/all-projects"
                className={`${CARD_WIDTH} ${CARD_HEIGHT} box-border flex shrink-0 flex-col items-center justify-center gap-3 border border-dashed border-foreground/25 bg-card/60 p-6 text-center transition-colors hover:border-primary hover:bg-primary/5`}
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  End of reel
                </span>
                <span className="text-2xl text-primary sm:text-3xl">
                  <i className="fas fa-arrow-right" />
                </span>
                <p className="text-base font-semibold text-foreground sm:text-lg">
                  View full archive
                </p>
                <p className="text-sm text-muted-foreground">
                  Every build, catalogued
                </p>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionSeparator />
    </>
  );
}

function SectionSeparator() {
  return (
    <div className="bg-background py-10 sm:py-14">
      <div className="page-shell">
        <div className="flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
          <div className="mx-3 h-2 w-2 rounded-full bg-primary sm:mx-4" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
        </div>
      </div>
    </div>
  );
}
