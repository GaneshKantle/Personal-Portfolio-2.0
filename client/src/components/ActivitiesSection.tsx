import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DotPattern } from "./DotPattern";
import { easeOutExpo, viewportOnce } from "../lib/motion";

const activities = [
  {
    mark: "C",
    title: "Chess",
    detail: "State level player · Top 90 of 700+ players",
  },
  {
    mark: "R",
    title: "Red Cross",
    detail: "Head of Pre Post Dept. · Youth volunteer · Camps & awareness",
  },
  {
    mark: "H",
    title: "Hackathons",
    detail: "Top 3 at AquaTech 2025",
  },
];

export default function ActivitiesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="activities"
      className="section-y relative overflow-hidden cv-auto scroll-mt-[var(--nav-offset)] bg-background"
    >
      <DotPattern />
      <div className="page-shell relative z-10">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-primary sm:text-sm">
            Beyond the editor
          </p>
          <h2 className="text-title font-semibold tracking-tight text-foreground">
          Extracurricular <span className="text-primary">Activities</span>
          </h2>
          <motion.div
            className="mx-auto mt-3 h-1 w-16 origin-center rounded-full bg-primary sm:mt-4 sm:w-20"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.06 }}
          />
        </motion.div>

        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-3 sm:gap-8">
          {activities.map((activity, index) => (
            <motion.li
              key={activity.mark}
              className="group relative text-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.55,
                delay: 0.1 * index,
                ease: easeOutExpo,
              }}
            >
              <motion.span
                className="block select-none text-[5.5rem] font-bold leading-none tracking-tight text-primary/15 transition-colors duration-300 group-hover:text-primary/30 sm:text-[6.5rem]"
                aria-hidden="true"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
              >
                {activity.mark}
              </motion.span>

              <div className="relative -mt-6 sm:-mt-8">
                <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {activity.title}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {activity.detail}
                </p>
                <motion.span
                  className="mx-auto mt-4 block h-0.5 w-8 origin-center bg-primary"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + 0.08 * index,
                    ease: easeOutExpo,
                  }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
