import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { PageShell } from "./layout/PageShell";
import { AnimatedCounter } from "./motion/AnimatedCounter";
import { easeOutExpo, viewportOnce } from "../lib/motion";
import { DotPattern } from "./DotPattern";
import heyzineLogo from "../img/heyzine.svg";

const technicalSkills = [
  { name: "Java / Spring Boot", percentage: 90 },
  { name: "JavaScript", percentage: 90 },
  { name: "HTML / CSS / Tailwind", percentage: 85 },
  { name: "React / TypeScript", percentage: 70 },
  { name: "MySQL", percentage: 70 },
  { name: "Web3 / Solidity", percentage: 65 },
];

type TechItem = {
  name: string;
  icon?: string;
  color?: string;
  fallback?: boolean;
  image?: string;
};

const technologies: TechItem[] = [
  { name: "Java", icon: "logos:java" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "HTML5", icon: "logos:html-5" },
  { name: "CSS3", icon: "logos:css-3" },
  { name: "ReactJS", icon: "logos:react" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "Bootstrap", icon: "logos:bootstrap" },
  { name: "Solidity", icon: "logos:solidity" },
  { name: "Ethereum", icon: "logos:ethereum" },
  { name: "GitHub", icon: "simple-icons:github", color: "#6e5494" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "VS Code", icon: "logos:visual-studio-code" },
  { name: "Cursor IDE", icon: "fas fa-terminal", color: "#CCCCCC", fallback: true },
  { name: "Replit", icon: "logos:replit-icon" },
  { name: "Vercel", icon: "simple-icons:vercel", color: "#000000" },
  { name: "Postman", icon: "logos:postman-icon" },
  { name: "ChatGPT", icon: "logos:openai-icon" },
  { name: "Grok", icon: "fas fa-comment-dots", color: "#FF4500", fallback: true },
  { name: "Claude AI", icon: "fas fa-cloud", color: "#5A5A5A", fallback: true },
  { name: "Copilot", icon: "logos:github-copilot" },
  { name: "Gemini", icon: "logos:google-gemini" },
  { name: "Llama Coder", icon: "fas fa-hippo", color: "#A07F5F", fallback: true },
  { name: "Blackbox AI", icon: "fas fa-box", color: "#3E64FF", fallback: true },
  { name: "Figma", icon: "logos:figma" },
  { name: "Canva", icon: "simple-icons:canva", color: "#00C4CC" },
  { name: "WordPress", icon: "logos:wordpress-icon" },
  { name: "Wix Studio", icon: "simple-icons:wix", color: "#0C6EFC" },
  { name: "HeyZine", image: heyzineLogo },
  { name: "Shopify", icon: "logos:shopify" },
  { name: "Zapier", icon: "logos:zapier" },
  { name: "Firebase", icon: "logos:firebase" },
  { name: "bunny.net", icon: "logos:bunny-net" },
  { name: "Google Cloud", icon: "logos:google-cloud" },
  { name: "Google Drive", icon: "logos:google-drive" },
  { name: "Google Sheets", icon: "simple-icons:googlesheets", color: "#34A853" },
  { name: "Mailchimp", icon: "logos:mailchimp" },
  { name: "Calendly", icon: "simple-icons:calendly", color: "#006BFF" },
  { name: "W3Schools", icon: "fas fa-graduation-cap", color: "#04AA6D", fallback: true },
  { name: "LaTeX", icon: "fas fa-file-code", color: "#008080", fallback: true },
];

function TechIcon({ tech }: { tech: TechItem }) {
  if (tech.image) {
    return (
      <img
        src={tech.image}
        alt=""
        width={32}
        height={32}
        className="h-6 w-6 object-contain sm:h-8 sm:w-8"
        loading="lazy"
      />
    );
  }

  if (tech.fallback && tech.icon) {
    return (
      <i
        className={`${tech.icon} text-2xl sm:text-4xl`}
        style={{ color: tech.color || "#666" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Icon
      icon={tech.icon!}
      width="24"
      height="24"
      className="sm:h-8 sm:w-8"
      color={tech.color || undefined}
      aria-hidden="true"
    />
  );
}

function SkillPlate({
  name,
  percentage,
  index,
  reducedMotion,
}: {
  name: string;
  percentage: number;
  index: number;
  reducedMotion: boolean;
}) {
  const label = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group relative flex flex-col justify-between border border-border bg-card/30 p-4 transition-colors hover:border-primary/35 sm:p-5"
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: 0.5,
        delay: 0.06 * index,
        ease: easeOutExpo,
      }}
    >
      <div className="mb-6 flex items-start justify-between gap-3 sm:mb-8">
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:text-[11px]">
          {label}
        </span>
        <span className="tabular-nums text-sm font-semibold text-primary sm:text-base">
          <AnimatedCounter
            value={percentage}
            duration={1.35}
            delay={0.08 * index}
            suffix="%"
          />
        </span>
      </div>

      <p className="mb-4 text-base font-semibold tracking-tight text-foreground sm:mb-5 sm:text-lg">
        {name}
      </p>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted sm:h-2">
        <motion.div
          className="water-fill h-full !rounded-full !transition-none"
          initial={reducedMotion ? false : { width: "0%" }}
          whileInView={{ width: `${percentage}%` }}
          viewport={viewportOnce}
          transition={{
            duration: 1.35,
            delay: 0.08 * index,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const mid = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, mid);
  const row2 = technologies.slice(mid);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const marqueePaused = isPaused || !inView || !!prefersReducedMotion;

  return (
    <>
      <section
        id="skills"
        className="section-y relative overflow-hidden cv-auto scroll-mt-[var(--nav-offset)] bg-background"
      >
        <DotPattern />
        <PageShell className="relative z-10">
          <motion.div
            className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary sm:text-sm">
              Technical skills
            </p>
            <h2 className="text-title mb-3 font-semibold tracking-tight text-foreground sm:mb-4">
              What I build{" "}
              <span className="text-primary">with</span>
            </h2>
            <motion.div
              className="mx-auto mb-4 h-1 w-16 origin-center rounded-full bg-primary sm:mb-5 sm:w-20"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.08 }}
            />
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Core strengths I lean on when shipping products end to end.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4 md:grid-cols-3">
            {technicalSkills.map((skill, index) => (
              <SkillPlate
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                index={index}
                reducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>

          <div className="mt-16 sm:mt-20 md:mt-24" ref={marqueeRef}>
            <motion.div
              className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
            >
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Technologies & tools I work with
              </h3>
            </motion.div>

            <div className="w-full space-y-6 overflow-x-clip sm:space-y-8">
              <div className="relative w-full overflow-hidden">
                <div
                  className={`marquee-row reverse${marqueePaused ? " paused" : ""}`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="marquee-track">
                    {[...row1, ...row1].map((tech, index) => (
                      <div
                        key={tech.name + index}
                        className="marquee-icon mx-2 flex cursor-pointer flex-col items-center sm:mx-4"
                      >
                        <div className="marquee-icon-inner flex items-center justify-center rounded-full border border-border bg-card p-3 shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary hover:shadow-md sm:p-4">
                          <TechIcon tech={tech} />
                        </div>
                        <div className="mt-1 text-center text-xs font-medium text-muted-foreground sm:mt-2 sm:text-sm">
                          {tech.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  className={`marquee-row${marqueePaused ? " paused" : ""}`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="marquee-track">
                    {[...row2, ...row2].map((tech, index) => (
                      <div
                        key={tech.name + index}
                        className="marquee-icon mx-2 flex cursor-pointer flex-col items-center sm:mx-4"
                      >
                        <div className="marquee-icon-inner flex items-center justify-center rounded-full border border-border bg-card p-3 shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary hover:shadow-md sm:p-4">
                          <TechIcon tech={tech} />
                        </div>
                        <div className="mt-1 text-center text-xs font-medium text-muted-foreground sm:mt-2 sm:text-sm">
                          {tech.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
