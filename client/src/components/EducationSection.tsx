import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { easeOutExpo } from "../lib/motion";
import { DotPattern } from "./DotPattern";

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Engineering",
    field: "Computer Science",
    institution: "SDM Institute of Technology",
    location: "Karnataka, India",
    start: "2022",
    end: "2026",
    status: "completed" as const,
    code: "BE · CSE",
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    field: "Science Stream",
    institution: "Vidya Nidhi PU College",
    location: "Karnataka, India",
    start: "2020",
    end: "2022",
    status: "completed" as const,
    code: "PU · SCI",
  },
];

export default function EducationSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 40%"],
  });

  const railScale = useTransform(scrollYProgress, [0, 0.55], [0.08, 1]);

  return (
    <>
      <section
        id="education"
        ref={sectionRef}
        className="section-y relative overflow-hidden bg-background cv-auto"
      >
        <DotPattern />
        <div className="page-shell relative z-10">
          <motion.div
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary sm:text-sm">
              Academic ledger
            </p>
            <h2 className="text-title mb-3 font-semibold tracking-tight text-foreground sm:mb-4">
              Where I <span className="text-primary">learned</span>
            </h2>
            <motion.div
              className="mx-auto mb-4 h-1 w-16 origin-center rounded-full bg-primary sm:mb-5 sm:w-20"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.08 }}
            />
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              Two chapters filed — science foundations into engineering systems.
            </p>
          </motion.div>

          {/* Year continuum rail — not a vertical timeline */}
          <div className="mx-auto mb-10 max-w-4xl sm:mb-14">
            <div className="relative px-1 pt-2 sm:px-4">
              <div className="relative h-px w-full bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left bg-primary"
                  style={
                    prefersReducedMotion
                      ? { scaleX: 1 }
                      : { scaleX: railScale }
                  }
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                <span>2020</span>
                <span className="text-primary">2022</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          {/* Staggered diploma folios */}
          <div className="relative mx-auto max-w-5xl space-y-8 sm:space-y-10 md:space-y-12">
            {educationData.map((item, index) => (
              <DiplomaFolio
                key={item.id}
                item={item}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-background py-10 sm:py-14">
        <div className="page-shell">
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
            <div className="mx-3 h-2 w-2 rounded-full bg-primary sm:mx-4" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
          </div>
        </div>
      </div>
    </>
  );
}

type Chapter = (typeof educationData)[number];

function DiplomaFolio({
  item,
  index,
  prefersReducedMotion,
}: {
  item: Chapter;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const isCurrent = item.status === "current";
  const fromLeft = index % 2 === 0;
  const passOutYear = item.end;

  return (
    <motion.article
      className={`relative mx-auto w-full max-w-3xl md:max-w-4xl ${
        fromLeft ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
      }`}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              x: fromLeft ? -24 : 24,
              y: 16,
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.55,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: easeOutExpo,
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -4 }
      }
    >
      <div
        className={`group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md ${
          isCurrent ? "border-primary/40" : "border-border"
        }`}
      >
        {/* Binder edge */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-10 flex w-7 flex-col items-center justify-evenly border-r border-border/80 bg-muted/40 sm:w-9"
        >
          {[0, 1, 2, 3].map((hole) => (
            <span
              key={hole}
              className="h-2 w-2 rounded-full border border-border bg-background shadow-inner sm:h-2.5 sm:w-2.5"
            />
          ))}
        </div>

        {/* Giant year watermark — pass-out year */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-2 top-1/2 z-0 -translate-y-1/2 select-none font-semibold leading-none tracking-tighter tabular-nums ${
            isCurrent
              ? "text-primary/[0.08]"
              : "text-foreground/[0.05]"
          } text-[5.5rem] sm:text-[7rem] md:text-[8.5rem]`}
        >
          {passOutYear}
        </div>

        <div className="relative z-[1] pl-10 pr-5 py-6 sm:pl-14 sm:pr-8 sm:py-8 md:pl-16 md:pr-10">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary sm:text-xs">
                {item.code}
              </p>
              <p className="mt-2 font-mono text-sm tabular-nums text-muted-foreground sm:text-base">
                <span>{item.start}</span>
                <span className="mx-2 text-border">→</span>
                <span className="text-foreground">{item.end}</span>
              </p>
            </div>

            <Stamp status={item.status} />
          </div>

          <h3 className="max-w-xl text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {item.degree}
          </h3>
          <p className="mt-2 text-base font-medium text-primary sm:text-lg">
            {item.field}
          </p>

          <div className="mt-6 flex flex-col gap-1 border-t border-dashed border-border pt-5 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-sm font-medium text-foreground sm:text-base">
              {item.institution}
            </span>
            <span
              aria-hidden="true"
              className="hidden text-muted-foreground/50 sm:inline"
            >
              /
            </span>
            <span className="text-sm text-muted-foreground sm:text-base">
              {item.location}
            </span>
          </div>
        </div>

        {/* Corner fold */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 bg-gradient-to-tl from-muted/80 to-transparent"
        />
      </div>
    </motion.article>
  );
}

function Stamp({ status }: { status: "current" | "completed" }) {
  const isCurrent = status === "current";

  return (
    <span
      className={`inline-flex rotate-[-6deg] items-center gap-1.5 rounded-sm border-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px] ${
        isCurrent
          ? "border-primary/50 text-primary"
          : "border-muted-foreground/35 text-muted-foreground"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isCurrent ? "bg-primary animate-pulse" : "bg-muted-foreground/50"
        }`}
      />
      {isCurrent ? "In progress" : "Completed"}
    </span>
  );
}
