import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
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
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

const CARD_WIDTH = "w-[min(85vw,20rem)] sm:w-[22rem] md:w-[24rem]";
/** Fits under the section header inside a sticky viewport without clipping buttons */
const CARD_HEIGHT =
  "h-[min(450px,calc(100svh-16.5rem))] sm:h-[min(470px,calc(100svh-17rem))]";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`relative z-10 box-border flex ${CARD_WIDTH} ${CARD_HEIGHT} shrink-0 flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card shadow-sm`}
    >
      <div className="h-[46%] min-h-[170px] max-h-[230px] shrink-0 p-3 sm:p-4 pb-0">
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border">
          <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-muted px-3">
            <div className="flex space-x-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <div className="ml-2 truncate text-xs text-muted-foreground">
              {project.title}
            </div>
          </div>
          <img
            src={project.image}
            alt={`${project.title} Screenshot`}
            className="h-0 min-h-0 w-full flex-1 object-cover"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pt-3 pb-4 sm:px-5">
        <h3 className="shrink-0 truncate text-base sm:text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 shrink-0 text-sm leading-5 text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-2.5 flex h-7 shrink-0 items-center gap-2 overflow-hidden">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="max-w-[6rem] truncate rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 ? (
            <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              +{project.technologies.length - 3}
            </span>
          ) : null}
        </div>
        <div className="mt-auto flex shrink-0 gap-2 pt-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 flex-1 items-center justify-center rounded-lg border border-border text-xs font-medium text-primary transition-colors hover:border-primary/40 hover:bg-muted sm:text-sm"
          >
            <i className="fab fa-github mr-2" />
            Source
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 flex-1 items-center justify-center rounded-lg border border-border text-xs font-medium text-primary transition-colors hover:border-primary/40 hover:bg-muted sm:text-sm"
          >
            <i className="fas fa-external-link-alt mr-2" />
            Live
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const maxTravel = Math.max(0, track.scrollWidth - window.innerWidth + 48);
      setTravel(maxTravel);
    };

    measure();
    window.addEventListener("resize", measure);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    if (trackRef.current && ro) ro.observe(trackRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (prefersReducedMotion) {
    return (
      <>
        <section id="projects" className="relative bg-background py-12 sm:py-16 md:py-20">
          <DotPattern className="pointer-events-none absolute inset-0 z-0" />
          <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
                My <span className="text-primary">Projects</span>
              </h2>
              <div className="mx-auto mb-4 h-1 w-16 sm:w-20 rounded-full bg-primary" />
              <p className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base">
                Swipe through the projects, then continue down the page.
              </p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              {projects.map((project) => (
                <div key={project.id} className="snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href="/all-projects">
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-primary/90"
                >
                  View All Projects
                </Button>
              </a>
            </div>
          </div>
        </section>
        <SectionSeparator />
      </>
    );
  }

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative bg-background"
        style={{ height: `calc(100vh + ${Math.max(travel, 1)}px)` }}
      >
        <div className="relative sticky top-0 flex h-[100svh] flex-col overflow-x-hidden overflow-y-hidden bg-background">
          <DotPattern className="pointer-events-none absolute inset-0 z-0" />
          <div className="relative z-10 container mx-auto shrink-0 px-3 pt-20 sm:px-4 sm:pt-24 md:px-6 lg:px-8">
            <div className="mb-4 text-center sm:mb-5">
              <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
                My <span className="text-primary">Projects</span>
              </h2>
              <div className="mx-auto mb-2 h-1 w-16 sm:w-20 rounded-full bg-primary" />
              <p className="mx-auto max-w-2xl px-2 text-sm sm:text-base text-muted-foreground">
                Keep scrolling — the gallery moves sideways. When it ends, you
                continue down.
              </p>
            </div>

            <div className="mx-auto mb-6 h-1 max-w-xs overflow-hidden rounded-full bg-muted sm:mb-8">
              <motion.div
                className="h-full origin-left rounded-full bg-primary"
                style={{ width: progressWidth }}
              />
            </div>
          </div>

          {/* Extra top spacing so cards sit below the description, not on it */}
          <div className="relative z-10 flex min-h-0 flex-1 items-start justify-start pt-2 sm:pt-3 pb-8 sm:pb-10">
            <motion.div
              ref={trackRef}
              className="flex items-start gap-4 sm:gap-6 px-4 sm:px-8 md:px-12 will-change-transform"
              style={{ x }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}

              <a
                href="/all-projects"
                className={`${CARD_WIDTH} ${CARD_HEIGHT} box-border flex shrink-0 flex-col items-center justify-center gap-3 rounded-xl sm:rounded-2xl border border-dashed border-primary/40 bg-card/60 p-6 text-center transition-colors hover:border-primary hover:bg-primary/5`}
              >
                <span className="text-2xl text-primary sm:text-3xl">
                  <i className="fas fa-arrow-right" />
                </span>
                <p className="text-base font-semibold text-foreground sm:text-lg">
                  View all projects
                </p>
                <p className="text-sm text-muted-foreground">
                  Open the full archive
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
    <div className="bg-background py-12 sm:py-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="mx-3 sm:mx-4 h-2 w-2 rounded-full bg-primary" />
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </div>
  );
}
