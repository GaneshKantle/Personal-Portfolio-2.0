import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "./motion/AnimatedCounter";
import { ScrollReveal } from "./motion/ScrollReveal";
import { viewportOnce } from "../lib/motion";
import { DotPattern } from "./DotPattern";

const experiences = [
  {
    title: "AI Web Dev",
    company: "@WI Thinkers",
    period: "July 2025 – Present",
    description:
      "Build and manage production websites from development through deployment. Successfully shipped 5 production sites so far — see Production Work below.",
    skills: [
      "WIX Studio",
      "MailChimp",
      "Firebase",
      "Google Cloud Console",
      "ReactJS",
      "Cursor IDE",
      "Production",
      "Calendly",
    ],
  },
  {
    title: "Freelance Frontend Dev",
    company: "@Self-Employed",
    period: "Nov 2024 – July 2025",
    description:
      "Built and maintained responsive client sites. Shipped a video editor portfolio and a WhatsApp API chatbot, deployed on Vercel.",
    skills: ["ReactJS", "TypeScript", "Tailwind CSS", "Vercel", "REST API"],
  },
];

function formatDuration(totalMonths: number) {
  if (totalMonths <= 0) return "0 months";

  if (totalMonths < 12) {
    return totalMonths === 1 ? "1 month" : `${totalMonths} months`;
  }

  const years = Math.round((totalMonths / 12) * 10) / 10;
  return years === 1 ? "1 year" : `${years} years`;
}

function calculateMonths(period: string) {
  const monthsMap: Record<string, number> = {
    Jan: 0,
    January: 0,
    Feb: 1,
    February: 1,
    Mar: 2,
    March: 2,
    Apr: 3,
    April: 3,
    May: 4,
    Jun: 5,
    June: 5,
    Jul: 6,
    July: 6,
    Aug: 7,
    August: 7,
    Sep: 8,
    September: 8,
    Oct: 9,
    October: 9,
    Nov: 10,
    November: 10,
    Dec: 11,
    December: 11,
  };

  const now = new Date();
  const [start, end] = period.split(" – ");

  const [startMonthStr, startYearStr] = start.split(" ");
  const startMonth = monthsMap[startMonthStr];
  const startYear = parseInt(startYearStr);

  let endMonth: number;
  let endYear: number;

  if (end === "Present") {
    endMonth = now.getMonth();
    endYear = now.getFullYear();
  } else {
    const parts = end.split(" ");

    if (parts.length === 2) {
      endMonth = monthsMap[parts[0]];
      endYear = parseInt(parts[1]);
    } else {
      endMonth = monthsMap[parts[0]];
      endYear = startYear;
    }
  }

  let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

  if (totalMonths <= 0) totalMonths = 1;

  return totalMonths;
}

function getPrimaryExperienceMonths(exps: typeof experiences) {
  const validRoles = exps.filter(
    (exp) =>
      exp.period.includes("Present") &&
      !exp.company.toLowerCase().includes("self")
  );

  if (validRoles.length === 0) return 0;

  return calculateMonths(validRoles[0].period);
}

export default function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const totalMonths = useMemo(
    () => getPrimaryExperienceMonths(experiences),
    []
  );
  const experienceYears = Math.round((totalMonths / 12) * 10) / 10;
  const showAsYears = totalMonths >= 12;

  const timelineData = useMemo(() => {
    return experiences.map((exp) => {
      const duration = formatDuration(calculateMonths(exp.period));

      const yearMatch = exp.period.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : exp.period.split(" ")[0];

      return {
        title: year,
        content: (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
              {exp.title}
            </h3>

            <p className="text-primary font-mono mb-3 text-sm md:text-base">
              {exp.company}
            </p>

            <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {exp.skills.map((skill, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs md:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="mt-4">
              <span className="bg-muted text-muted-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-mono inline-block text-xs md:text-sm border border-border">
                {exp.period} • {duration}
              </span>
            </div>
          </div>
        ),
      };
    });
  }, []);

  return (
    <section id="experience" className="section-y relative overflow-hidden cv-auto bg-background">
      <DotPattern />
      <div className="page-shell relative z-10">
        <ScrollReveal className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Total Experience
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <div className="text-4xl font-semibold tracking-tighter text-primary sm:text-5xl md:text-6xl 3xl:text-7xl">
              {showAsYears ? (
                <AnimatedCounter
                  value={experienceYears}
                  decimals={1}
                  duration={1.8}
                />
              ) : (
                <AnimatedCounter value={totalMonths} duration={1.8} />
              )}
            </div>
            <span className="text-base font-medium text-muted-foreground sm:text-lg md:text-xl">
              {showAsYears
                ? experienceYears === 1
                  ? "year"
                  : "years"
                : totalMonths === 1
                  ? "month"
                  : "months"}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-12 text-center">
          <h2 className="text-title mb-3 font-semibold text-foreground">
            Work <span className="text-primary">Experience</span>
          </h2>
          <motion.div
            className="mx-auto h-1 w-20 origin-center rounded-full bg-primary"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: 0.1 }}
          />
        </ScrollReveal>

        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
