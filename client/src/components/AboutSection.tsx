import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PageShell } from "./layout/PageShell";
import { DotPattern } from "./DotPattern";
import { easeOutExpo, viewportOnce } from "../lib/motion";

const roles = [
  {
    mark: "A",
    title: "AI Web Developer",
    detail: "Calm, fast interfaces · React & TypeScript",
  },
  {
    mark: "W",
    title: "Web3 Explorer",
    detail: "On-chain experiments · one careful step at a time",
  },
  {
    mark: "T",
    title: "Tech Writer",
    detail: "Notes from learning · open-source gifts",
  },
  {
    mark: "P",
    title: "Team Player",
    detail: "Friendly screens · quiet code · ship together",
  },
];

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section
        id="about"
        className="section-y relative overflow-hidden cv-auto scroll-mt-[var(--nav-offset)] bg-background"
      >
        <DotPattern />
        <PageShell className="relative z-10">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-primary sm:text-sm">
              About me
            </p>
            <h2 className="text-title font-semibold tracking-tight text-foreground">
              Who I am <span className="text-primary">online</span>
            </h2>
            <motion.div
              className="mx-auto mt-3 h-1 w-16 origin-center rounded-full bg-primary sm:mt-4 sm:w-20"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.06 }}
            />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              I make little corners of the web that feel calm and quick -
              places people actually enjoy using. Mostly with React,
              TypeScript, and Java, for clients and for curiosity. Lately
              I&apos;ve been exploring Web3 - connecting interfaces to the
              chain without losing that calm, careful feel.
            </p>
          </motion.div>

          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-10 xs:grid-cols-2 sm:mt-14 sm:gap-8 lg:grid-cols-4">
            {roles.map((role, index) => (
              <motion.li
                key={role.mark + role.title}
                className="group relative text-center"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.55,
                  delay: 0.08 * index,
                  ease: easeOutExpo,
                }}
              >
                <motion.span
                  className="block select-none text-[5rem] font-bold leading-none tracking-tight text-primary/15 transition-colors duration-300 group-hover:text-primary/30 sm:text-[5.75rem]"
                  aria-hidden="true"
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.04 }
                  }
                >
                  {role.mark}
                </motion.span>

                <div className="relative -mt-5 sm:-mt-6">
                  <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {role.title}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {role.detail}
                  </p>
                  <motion.span
                    className="mx-auto mt-4 block h-0.5 w-8 origin-center bg-primary"
                    initial={prefersReducedMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.45,
                      delay: 0.12 + 0.06 * index,
                      ease: easeOutExpo,
                    }}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </PageShell>
      </section>

      <div className="bg-background py-10 sm:py-14">
        <PageShell>
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
            <div className="mx-3 h-2 w-2 rounded-full bg-primary sm:mx-4" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
          </div>
        </PageShell>
      </div>
    </>
  );
}
