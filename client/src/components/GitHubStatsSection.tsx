import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "./motion/AnimatedCounter";

const GITHUB_USER = "ganeshkantle";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`;

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

type StreakStats = {
  total: number;
  currentStreak: number;
  longestStreak: number;
  currentRange: string | null;
  longestRange: string | null;
  totalRange: string | null;
};

function parseHsl(
  cssValue: string,
): { h: number; s: number; l: number } | null {
  const parts = cssValue.trim().split(/\s+/);
  if (parts.length < 3) return null;

  const h = Number(parts[0].replace("deg", ""));
  const s = Number(parts[1].replace("%", ""));
  const l = Number(parts[2].replace("%", ""));

  if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(l)) return null;
  return { h, s, l };
}

function hslToHex(hIn: number, sIn: number, lIn: number): string {
  const h = ((hIn % 360) + 360) % 360;
  const s = Math.max(0, Math.min(100, sIn)) / 100;
  const l = Math.max(0, Math.min(100, lIn)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);

  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function cssVarHex(varName: string): string | null {
  if (typeof window === "undefined") return null;
  const raw = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return null;

  const hsl = parseHsl(raw);
  if (!hsl) return null;

  return hslToHex(hsl.h, hsl.s, hsl.l);
}

function formatDay(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatRange(start: string | null, end: string | null) {
  if (!start || !end) return null;
  const startFull = new Date(`${start}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const endFull = new Date(`${end}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (start === end) return startFull;
  // Same year → "Aug 1 - Aug 15, 2026"
  const sy = start.slice(0, 4);
  const ey = end.slice(0, 4);
  if (sy === ey) {
    return `${formatDay(start)} - ${formatDay(end)}, ${ey}`;
  }
  return `${startFull} - ${endFull}`;
}

function toIsoLocal(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDaysIso(iso: string, delta: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + delta);
  return toIsoLocal(d);
}

function computeStreakStats(data: ContributionsResponse): StreakStats {
  const byDate = new Map<string, number>();
  for (const day of data.contributions) {
    byDate.set(day.date, day.count);
  }

  const dates = [...byDate.keys()].sort();
  const total = Object.values(data.total).reduce((sum, n) => sum + n, 0);

  let longestStreak = 0;
  let longestStart: string | null = null;
  let longestEnd: string | null = null;
  let run = 0;
  let runStart: string | null = null;

  for (const date of dates) {
    const count = byDate.get(date) ?? 0;
    if (count > 0) {
      if (run === 0) runStart = date;
      run += 1;
      if (run > longestStreak) {
        longestStreak = run;
        longestStart = runStart;
        longestEnd = date;
      }
    } else {
      run = 0;
      runStart = null;
    }
  }

  const today = toIsoLocal(new Date());
  const yesterday = addDaysIso(today, -1);
  const todayCount = byDate.get(today) ?? 0;

  let cursor = todayCount > 0 ? today : yesterday;
  let currentStreak = 0;
  let currentEnd: string | null = null;
  let currentStart: string | null = null;

  while (true) {
    const count = byDate.get(cursor) ?? 0;
    if (count <= 0) break;
    currentStreak += 1;
    currentStart = cursor;
    if (!currentEnd) currentEnd = cursor;
    cursor = addDaysIso(cursor, -1);
  }

  const firstContrib = dates.find((d) => (byDate.get(d) ?? 0) > 0) ?? null;

  return {
    total,
    currentStreak,
    longestStreak,
    currentRange: formatRange(currentStart, currentEnd),
    longestRange: formatRange(longestStart, longestEnd),
    totalRange: firstContrib
      ? `${new Date(`${firstContrib}T12:00:00`).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })} - Present`
      : null,
  };
}

/** Classic streak-stats fire glyph sits inline in the CurrentStreak SVG */

function SideStat({
  value,
  label,
  hint,
}: {
  value: number;
  label: string;
  hint: string | null;
}) {
  return (
    <div className="flex h-full min-w-0 flex-col items-center justify-center px-3 text-center sm:px-4">
      <p className="text-[1.65rem] font-bold tabular-nums leading-none tracking-tight text-foreground sm:text-[1.85rem]">
        <AnimatedCounter value={value} duration={1.1} />
      </p>
      <p className="mt-2 text-[13px] font-semibold leading-tight text-foreground sm:text-[14px]">
        {label}
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
        {hint ?? "—"}
      </p>
    </div>
  );
}

function CurrentStreak({
  value,
  hint,
}: {
  value: number;
  hint: string | null;
}) {
  const prefersReducedMotion = useReducedMotion();
  const maskId = React.useId().replace(/:/g, "");

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-2 py-2">
      <div className="relative mb-1 h-[5.5rem] w-[5.5rem] sm:h-[6.25rem] sm:w-[6.25rem]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <mask id={maskId}>
              <rect x="-10" y="-10" width="120" height="120" fill="white" />
              <ellipse cx="50" cy="14" rx="10" ry="13" fill="black" />
            </mask>
          </defs>

          {/* Ring — gap cut out at top center for the fire */}
          <motion.circle
            cx="50"
            cy="54"
            r="36"
            fill="none"
            stroke="#FB8C00"
            strokeWidth="5"
            mask={`url(#${maskId})`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          />

          {/* Fire — locked to SVG center (x=50) */}
          <motion.g
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <g transform="translate(50, 1)">
              <path
                fill="#FB8C00"
                transform="translate(-0.5, 0) scale(0.92)"
                d="M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z"
              />
            </g>
          </motion.g>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pt-3">
          <p className="text-[1.65rem] font-bold tabular-nums leading-none tracking-tight text-foreground sm:text-[1.85rem]">
            <AnimatedCounter value={value} duration={1.15} />
          </p>
        </div>
      </div>

      <p className="text-[13px] font-bold leading-tight text-[#FB8C00] sm:text-[14px]">
        Current Streak
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
        {hint ?? "No active streak"}
      </p>
    </div>
  );
}

function StreakCard({ stats }: { stats: StreakStats }) {
  return (
    <div className="w-full max-w-[600px] overflow-hidden rounded-[10px] border border-border bg-card shadow-sm">
      <div className="grid min-h-[11.5rem] grid-cols-3 sm:min-h-[12.25rem]">
        <SideStat
          value={stats.total}
          label="Total Contributions"
          hint={stats.totalRange}
        />

        <div className="relative border-x border-border">
          <CurrentStreak value={stats.currentStreak} hint={stats.currentRange} />
        </div>

        <SideStat
          value={stats.longestStreak}
          label="Longest Streak"
          hint={stats.longestRange}
        />
      </div>
    </div>
  );
}

function StreakSkeleton() {
  return (
    <div className="w-full max-w-[600px] overflow-hidden rounded-[10px] border border-border bg-card shadow-sm">
      <div className="grid min-h-[11.5rem] grid-cols-3 sm:min-h-[12.25rem]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center gap-2 ${
              i === 1 ? "border-x border-border" : ""
            }`}
          >
            {i === 1 ? (
              <div className="h-[5.5rem] w-[5.5rem] animate-pulse rounded-full bg-muted sm:h-[6.25rem] sm:w-[6.25rem]" />
            ) : (
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            )}
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubStatsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [stats, setStats] = useState<StreakStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      setMode(root.classList.contains("dark") ? "dark" : "light");
    };

    update();

    const observer = new MutationObserver(() => update());
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(CONTRIBUTIONS_API);
        if (!res.ok) throw new Error(`Stats request failed (${res.status})`);
        const data = (await res.json()) as ContributionsResponse;
        if (cancelled) return;
        setStats(computeStreakStats(data));
      } catch {
        if (!cancelled) {
          setError("Couldn’t load streak stats right now.");
          setStats(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const ghUrl = useMemo(() => {
    const ringHex = cssVarHex("--ring") ?? "#3b82f6";
    const ring = ringHex.replace("#", "");
    return `https://ghchart.rshah.org/${ring}/${GITHUB_USER}`;
  }, [mode]);

  return (
    <section
      id="github-stats"
      className="bg-background py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={
            prefersReducedMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            GitHub <span className="text-primary">Activity</span>
          </h2>
          <motion.div
            className="mx-auto h-1 w-16 origin-center rounded-full bg-primary sm:w-20"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          />
        </motion.div>

        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <motion.a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground sm:text-base"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <i className="fab fa-github text-lg" />
            <span className="border-b border-transparent transition-colors duration-300 group-hover:border-foreground">
              github.com/{GITHUB_USER}
            </span>
            <i className="fas fa-arrow-up-right-from-square text-xs opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.a>

          <motion.img
            key={ghUrl}
            src={ghUrl}
            alt="GitHub contributions heatmap"
            className="h-auto w-full max-w-[663px]"
            loading="lazy"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 40, scale: 0.96 }
            }
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="w-full max-w-[600px]"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 40, scale: 0.96 }
            }
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {loading ? (
              <StreakSkeleton />
            ) : stats ? (
              <StreakCard stats={stats} />
            ) : (
              <div className="rounded-2xl border border-border bg-card px-5 py-8 text-center shadow-sm">
                <p className="text-sm text-muted-foreground">
                  {error ?? "Stats unavailable."}
                </p>
                <a
                  href={`https://github.com/${GITHUB_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
                >
                  View on GitHub
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
