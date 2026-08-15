import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { easeOutExpo } from "../lib/motion";

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Engineering",
    field: "Computer Science",
    institution: "SDM Institute of Technology",
    location: "Karnataka, India",
    start: "2022",
    end: "2026",
    status: "current" as const,
    focus: "",
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
    focus: "",
  },
];

export default function EducationSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [spineHeight, setSpineHeight] = useState(0);

  useEffect(() => {
    const el = journeyRef.current;
    if (!el) return;

    const update = () => setSpineHeight(el.getBoundingClientRect().height);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 45%"],
  });

  const drawHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(spineHeight, 1)]
  );
  const drawOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <>
      <section
        id="education"
        ref={sectionRef}
        className="relative py-12 sm:py-16 md:py-20 bg-background overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 10% 20%, hsl(var(--primary) / 0.08), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 80%, hsl(var(--muted) / 0.9), transparent 50%)",
          }}
        />

        <div className="container relative z-10 mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            className="mb-12 sm:mb-16 max-w-2xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Academic path
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3 sm:mb-4">
              Where I <span className="text-primary">learned</span>
            </h2>
            <motion.div
              className="w-16 sm:w-20 h-1 bg-primary rounded-full mb-4 sm:mb-5 origin-left"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 }}
            />
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              Two chapters so far — from science foundations to engineering systems.
            </p>
          </motion.div>

          <div ref={journeyRef} className="relative mx-auto max-w-5xl">
            {/* Journey spine track */}
            <div
              aria-hidden="true"
              className="absolute left-[1.15rem] top-3 bottom-3 w-px overflow-hidden sm:left-1/2 sm:-translate-x-px md:left-[7.5rem]"
            >
              <div className="absolute inset-0 bg-border/70" />
              {prefersReducedMotion ? (
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
              ) : (
                <motion.div
                  style={{ height: drawHeight, opacity: drawOpacity }}
                  className="absolute inset-x-0 top-0 w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/40"
                />
              )}
            </div>

            <ol className="relative space-y-10 sm:space-y-14">
              {educationData.map((item, index) => {
                const isCurrent = item.status === "current";
                const progressAt = (index + 0.35) / educationData.length;

                return (
                  <EducationChapter
                    key={item.id}
                    item={item}
                    index={index}
                    isCurrent={isCurrent}
                    prefersReducedMotion={!!prefersReducedMotion}
                    scrollYProgress={scrollYProgress}
                    progressAt={progressAt}
                  />
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <div className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-primary rounded-full" />
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}

type Chapter = (typeof educationData)[number];

function EducationChapter({
  item,
  index,
  isCurrent,
  prefersReducedMotion,
  scrollYProgress,
  progressAt,
}: {
  item: Chapter;
  index: number;
  isCurrent: boolean;
  prefersReducedMotion: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  progressAt: number;
}) {
  const nodeScale = useTransform(
    scrollYProgress,
    [progressAt - 0.12, progressAt, progressAt + 0.08],
    prefersReducedMotion ? [1, 1, 1] : [0.72, 1.14, 1]
  );
  const nodeOpacity = useTransform(
    scrollYProgress,
    [progressAt - 0.14, progressAt],
    prefersReducedMotion ? [1, 1] : [0.4, 1]
  );

  return (
    <motion.li
      className="relative grid grid-cols-[2.5rem_1fr] gap-4 sm:gap-6 md:grid-cols-[7.5rem_2.5rem_1fr] md:gap-0"
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 36, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.65,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: easeOutExpo,
      }}
    >
      {/* Giant year — desktop */}
      <motion.div
        className="hidden md:flex md:flex-col md:items-end md:justify-start md:pr-6 md:pt-1"
        initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration: 0.55,
          delay: prefersReducedMotion ? 0 : 0.08 + index * 0.1,
          ease: easeOutExpo,
        }}
      >
        <span
          className={`font-semibold leading-none tracking-tighter tabular-nums ${
            isCurrent
              ? "text-4xl lg:text-5xl text-primary"
              : "text-3xl lg:text-4xl text-muted-foreground/50"
          }`}
        >
          {item.start}
        </span>
        <span className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          → {item.end}
        </span>
      </motion.div>

      {/* Node on spine */}
      <div className="relative z-10 flex justify-center pt-2 md:pt-3">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { scale: nodeScale, opacity: nodeOpacity }
          }
          className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 ${
            isCurrent
              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_6px_hsl(var(--primary)/0.15)]"
              : "border-border bg-background text-muted-foreground"
          }`}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.12 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          {isCurrent ? (
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-40" />
          ) : null}
          <i
            className={`relative text-sm ${
              isCurrent ? "fas fa-graduation-cap" : "fas fa-book-open"
            }`}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Content panel */}
      <motion.article
        className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 md:p-7 transition-colors duration-300 ${
          isCurrent
            ? "border-primary/35 bg-card shadow-sm"
            : "border-border bg-card/70 hover:border-primary/25"
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration: 0.6,
          delay: prefersReducedMotion ? 0 : 0.14 + index * 0.1,
          ease: easeOutExpo,
        }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-1 ${
            isCurrent ? "bg-primary" : "bg-border group-hover:bg-primary/50"
          } transition-colors duration-300`}
        />

        <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
          <p className="text-sm font-semibold tabular-nums text-primary">
            {item.start} — {item.end}
          </p>
          <StatusChip status={item.status} />
        </div>

        <div className="mb-3 hidden md:flex md:justify-end">
          <StatusChip status={item.status} />
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          {item.degree}
        </h3>
        <p className="mt-1 text-sm sm:text-base font-medium text-primary">
          {item.field}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/80">
            {item.institution}
          </span>
          <span aria-hidden="true" className="text-border">
            ·
          </span>
          <span>{item.location}</span>
        </div>

        {item.focus ? (
          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground border-t border-border/80 pt-4">
            {item.focus}
          </p>
        ) : null}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
        />
      </motion.article>
    </motion.li>
  );
}

function StatusChip({ status }: { status: "current" | "completed" }) {
  const isCurrent = status === "current";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
        isCurrent
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isCurrent ? "bg-primary animate-pulse" : "bg-muted-foreground/60"
        }`}
      />
      {isCurrent ? "In progress" : "Completed"}
    </span>
  );
}
