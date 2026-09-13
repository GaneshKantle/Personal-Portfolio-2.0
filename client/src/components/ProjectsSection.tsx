import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Button } from "../components/ui/button";
import { getAllProjects } from "../shared/projectData";
import { DotPattern } from "./DotPattern";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  ProjectSpecimenCard,
} from "./projects/ProjectSpecimenCard";

const projects = getAllProjects();

function SnapGallery() {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const toggleFlip = (id: number) => {
    setFlippedId((current) => (current === id ? null : id));
  };

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
            Swipe the archive — click a plate to flip it open.
          </p>
        </div>
        <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-4 snap-x snap-mandatory sm:gap-5">
          {projects.map((project, index) => (
            <div key={project.id} className="snap-start">
              <ProjectSpecimenCard
                project={project}
                index={index}
                flipped={flippedId === project.id}
                onFlip={() => toggleFlip(project.id)}
              />
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
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const toggleFlip = (id: number) => {
    setFlippedId((current) => (current === id ? null : id));
  };

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
                Keep scrolling — the archive slides sideways. Click a plate to
                flip it open.
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
              className="flex items-center gap-5 pl-4 pr-8 sm:gap-6 sm:pl-8 sm:pr-12 md:pl-12 md:pr-16 lg:pl-16"
              style={{ x }}
            >
              {projects.map((project, index) => (
                <ProjectSpecimenCard
                  key={project.id}
                  project={project}
                  index={index}
                  flipped={flippedId === project.id}
                  onFlip={() => toggleFlip(project.id)}
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
