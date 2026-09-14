import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface SpecimenProject {
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

export const CARD_WIDTH =
  "w-[min(85vw,20rem)] sm:w-[22rem] md:w-[24rem] xl:w-[28rem] 3xl:w-[32rem]";
export const CARD_HEIGHT =
  "h-[min(440px,calc(100svh-13.5rem))] sm:h-[min(500px,calc(100svh-12rem))] md:h-[min(520px,calc(100svh-11rem))]";

function CropMarks() {
  const mark =
    "pointer-events-none absolute h-3 w-3 border-foreground/35 transition-colors duration-300 group-hover:border-foreground/70 sm:h-3.5 sm:w-3.5";
  return (
    <>
      <span className={`${mark} left-2 top-2 border-l border-t`} />
      <span className={`${mark} right-2 top-2 border-r border-t`} />
      <span className={`${mark} bottom-2 left-2 border-b border-l`} />
      <span className={`${mark} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

export function ProjectSpecimenCard({
  project,
  index,
  flipped,
  onFlip,
  variant = "gallery",
}: {
  project: SpecimenProject;
  index: number;
  flipped: boolean;
  onFlip: () => void;
  variant?: "gallery" | "grid";
}) {
  const prefersReducedMotion = useReducedMotion();
  const specimenNo = String(index + 1).padStart(2, "0");
  const techLine = project.technologies.slice(0, 5).join(" · ");
  const metaBits = [project.category, project.difficulty].filter(Boolean);

  const faceStyle = {
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
  };

  const shellClass =
    variant === "gallery"
      ? `${CARD_WIDTH} ${CARD_HEIGHT} shrink-0`
      : "h-full min-h-[480px] w-full";

  return (
    <div
      className={`${shellClass} transition-transform duration-300 ease-out hover:-translate-y-1.5 [perspective:1400px]`}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {/* FRONT */}
        <article
          role="button"
          tabIndex={flipped ? -1 : 0}
          aria-pressed={flipped}
          aria-hidden={flipped}
          aria-label={`${project.title}. Click to flip for details.`}
          onClick={onFlip}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onFlip();
            }
          }}
          style={{
            ...faceStyle,
            transform: "rotateY(0deg) translateZ(1px)",
            pointerEvents: flipped ? "none" : "auto",
          }}
          className="group absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-none border border-foreground/15 bg-card shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-foreground/40 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.55)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-foreground/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
          />

          <CropMarks />

          <span
            aria-hidden
            className="pointer-events-none absolute -right-1 top-6 z-0 select-none font-mono text-[7.5rem] font-bold leading-none tracking-tighter text-foreground/[0.04] transition-colors duration-500 group-hover:text-foreground/[0.1] sm:text-[9rem]"
          >
            {specimenNo}
          </span>

          <div className="relative shrink-0 px-3 pt-3 sm:px-4 sm:pt-4">
            <div className="mb-2 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 rounded-sm border border-border bg-muted/60 px-2 py-1">
                  SPEC {specimenNo}
                </span>
                {project.status ? (
                  <span className="truncate rounded-sm border border-border px-2 py-1">
                    {project.status}
                  </span>
                ) : null}
              </div>
              <span className="shrink-0 text-[10px] tracking-[0.14em] text-muted-foreground/80">
                Flip →
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden border border-border bg-muted">
              <img
                src={project.image}
                alt={`${project.title} Screenshot`}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3 sm:px-5">
            <div className="mb-1.5 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="truncate">
                {metaBits.join(" / ") || "Archive"}
              </span>
              <span className="shrink-0 tabular-nums">{specimenNo}</span>
            </div>

            <h3 className="shrink-0 truncate text-base font-semibold leading-tight tracking-tight text-foreground sm:text-lg">
              {project.title}
            </h3>
            <p className="mt-1 line-clamp-2 shrink-0 text-sm leading-snug text-muted-foreground">
              {project.tagline || project.description}
            </p>

            <div className="mt-auto shrink-0 overflow-hidden border-y border-dashed border-border py-2">
              <p className="truncate font-mono text-[11px] tracking-wide text-muted-foreground transition-colors group-hover:text-foreground/80">
                {techLine}
                {project.technologies.length > 5
                  ? ` · +${project.technologies.length - 5}`
                  : ""}
              </p>
            </div>

            <div
              className="mt-3 flex shrink-0 items-center gap-2"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 flex-1 items-center justify-center gap-2 bg-foreground text-xs font-semibold text-background transition-opacity duration-200 hover:opacity-90 sm:text-sm"
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
        </article>

        {/* BACK — clear story plate: title + simple sentences */}
        <article
          role="button"
          tabIndex={flipped ? 0 : -1}
          aria-hidden={!flipped}
          aria-label={`${project.title} details. Click to flip back.`}
          onClick={onFlip}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onFlip();
            }
          }}
          style={{
            ...faceStyle,
            transform: "rotateY(180deg) translateZ(1px)",
            pointerEvents: flipped ? "auto" : "none",
          }}
          className="absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-none border border-foreground/20 bg-card shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,hsl(var(--muted)/0.55)_0%,transparent_42%,hsl(var(--foreground)/0.03)_100%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-3 select-none font-mono text-[7.5rem] font-bold leading-none tracking-tighter text-foreground/[0.04] sm:text-[8.5rem]"
          >
            {specimenNo}
          </span>

          <div className="relative z-10 flex h-full min-h-0 flex-col px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span></span>
              <span className="tabular-nums">{specimenNo}</span>
            </div>

            <div className="mt-5 h-px w-10 bg-foreground/25" />

            <h3 className="mt-4 text-balance text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[1.85rem]">
              {project.title}
            </h3>

            {project.tagline ? (
              <p className="mt-2 text-sm font-medium leading-snug text-muted-foreground">
                {project.tagline}
              </p>
            ) : null}

            <div className="mt-6 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
              {project.description
                .split(/(?<=[.!?])\s+/)
                .map((s) => s.trim())
                .filter(Boolean)
                .map((sentence, i) => (
                  <p
                    key={i}
                    className="flex gap-3 text-[0.98rem] leading-[1.55] text-foreground/80 sm:text-[1.02rem] sm:leading-[1.6]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35"
                    />
                    <span className="text-pretty">{sentence}</span>
                  </p>
                ))}
            </div>

            <p className="mt-5 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              Tap to flip back
            </p>
          </div>
        </article>
      </motion.div>
    </div>
  );
}
