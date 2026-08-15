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

const CARD_WIDTH =
  "w-[min(85vw,20rem)] sm:w-[22rem] md:w-[24rem] xl:w-[28rem] 3xl:w-[32rem]";
const CARD_HEIGHT =
  "h-[min(420px,calc(100svh-14rem))] sm:h-[min(440px,calc(100svh-15rem))]";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`relative z-10 box-border flex ${CARD_WIDTH} ${CARD_HEIGHT} shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm sm:rounded-2xl`}
    >
      <div className="h-[46%] max-h-[230px] min-h-[170px] shrink-0 p-3 pb-0 sm:p-4">
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
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3 sm:px-5">
        <h3 className="shrink-0 truncate text-base font-semibold text-foreground sm:text-lg">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 shrink-0 text-sm leading-5 text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-2.5 flex h-7 shrink-0 items-center gap-2 overflow-hidden">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="max-w-[6rem] truncate rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 ? (
            <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
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

function SnapGallery() {
  return (
    <section id="projects" className="section-y relative overflow-hidden bg-background">
      <DotPattern />
      <div className="page-shell relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-title mb-3 font-semibold tracking-tight text-foreground">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-primary sm:w-20" />
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Swipe through the projects, then continue down the page.
          </p>
        </div>
        <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-4 snap-x snap-mandatory">
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
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 sm:px-8 sm:py-3 sm:text-base"
            >
              View All Projects
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function useIsMdUp() {
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMd(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMd;
}

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMd = useIsMdUp();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    if (!isMd || prefersReducedMotion) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const maxTravel = Math.max(0, track.scrollWidth - window.innerWidth);
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
  }, [isMd, prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
        style={{ height: `calc(100svh + ${Math.max(travel, 1)}px)` }}
      >
        <div className="sticky top-0 z-10 flex h-[100svh] flex-col overflow-x-hidden overflow-y-hidden bg-background">
          <DotPattern />
          <div className="page-shell relative z-10 shrink-0 pt-16 sm:pt-20">
            <div className="mb-3 text-center sm:mb-4">
              <h2 className="text-title mb-2 font-semibold tracking-tight text-foreground">
                My <span className="text-primary">Projects</span>
              </h2>
              <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-primary sm:w-20" />
              <p className="mx-auto max-w-2xl px-2 text-sm text-muted-foreground sm:text-base">
                Keep scrolling — the gallery moves sideways. When it ends, you
                continue down.
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
              className="flex items-center gap-4 px-4 sm:gap-6 sm:px-8 md:px-12"
              style={{ x }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}

              <a
                href="/all-projects"
                className={`${CARD_WIDTH} ${CARD_HEIGHT} box-border flex shrink-0 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-primary/40 bg-card/60 p-6 text-center transition-colors hover:border-primary hover:bg-primary/5 sm:rounded-2xl`}
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
