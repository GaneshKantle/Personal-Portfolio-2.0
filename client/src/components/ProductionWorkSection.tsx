import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  getHost,
  productionSites,
  type ProductionSite,
} from "../shared/productionSites";
import { DotPattern } from "./DotPattern";

const CODE_LINES = [
  "// compile reality — ship live products",
  "import { deploy } from \"@wi/ship\";",
  "",
  "const sites = [",
  "  \"influencerxmedia.com\",",
  "  \"thewithinkers.com\",",
  "  \"crm.thewithinkers.com\",",
  "  \"app.swingboudoirmag.com\",",
  "  \"onlyfans.theglammodel.com\",",
  "];",
  "",
  "await Promise.all(",
  "  sites.map((host) => deploy({ host, live: true }))",
  ");",
  "",
  "// ✓ five products online",
];

const DEPLOY_LINES = [
  { text: "$ npm run build", tone: "cmd" as const },
  { text: "✓ Compiled successfully in 1.8s", tone: "ok" as const },
  { text: "$ deploy --prod --sites=5", tone: "cmd" as const },
  { text: "→ uploading assets…", tone: "dim" as const },
  { text: "✓ DNS healthy · TLS active · LIVE", tone: "ok" as const },
];

function SectionSeparator() {
  return (
    <div className="bg-background py-10 sm:py-14">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
          <div className="mx-3 h-2 w-2 rounded-full bg-primary sm:mx-4" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
        </div>
      </div>
    </div>
  );
}

function windowClassName(featured: boolean, dimmed: boolean) {
  return `group relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border will-change-transform
    border-black/[0.08] bg-[#F7F8FA] shadow-sm
    hover:border-primary/30
    dark:border-border dark:bg-card dark:hover:border-primary/35
    ${dimmed ? "opacity-45" : "opacity-100"}
    ${featured ? "" : ""}`;
}

function WindowChrome({
  site,
  index,
  featured,
  showLiveBadge = false,
}: {
  site: ProductionSite;
  index: number;
  featured: boolean;
  showLiveBadge?: boolean;
}) {
  const host = getHost(site.url);

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 border-b border-black/[0.06] bg-[#EEF1F5] px-3 py-2 sm:px-3.5 sm:py-2.5 dark:border-border dark:bg-muted/60">
        <div className="flex shrink-0 gap-1">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]/90" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/90" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]/90" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-2.5 py-1 dark:border-border dark:bg-background">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate font-mono text-[10px] text-slate-500 sm:text-[11px] dark:text-muted-foreground">
            {host}
          </span>
        </div>
        {showLiveBadge ? (
          <span className="hidden shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-700 sm:inline dark:text-emerald-400">
            Live
          </span>
        ) : null}
      </div>

      <div
        className={`relative flex min-h-0 flex-1 flex-col justify-between bg-white px-4 py-3.5 dark:bg-card sm:px-5 sm:py-4 ${
          featured ? "sm:px-6 sm:py-5" : ""
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-4 text-6xl font-semibold leading-none tracking-tighter text-slate-900/[0.07] sm:-right-2.5 sm:-top-5 sm:text-7xl md:text-8xl dark:text-foreground/[0.08]"
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative min-w-0 pr-10 sm:pr-14">
          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.16em] text-primary sm:mb-1.5 sm:text-[10px]">
            Live product
          </p>
          <h3
            className={`truncate font-semibold tracking-tight text-slate-900 group-hover:text-primary dark:text-foreground ${
              featured ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base"
            }`}
          >
            {site.title}
          </h3>
          <p
            className={`mt-1.5 line-clamp-2 text-slate-600 dark:text-muted-foreground ${
              featured ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
            }`}
          >
            {site.description}
          </p>
        </div>

        <div className="relative mt-3 flex items-center justify-between gap-2 sm:mt-4">
          <span className="truncate font-mono text-[10px] text-slate-500 dark:text-muted-foreground">
            {host}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white dark:text-primary-foreground">
            Open
            <i className="fas fa-arrow-up-right text-[8px]" />
          </span>
        </div>
      </div>
    </>
  );
}

function StaticLiveWindow({
  site,
  index,
  featured = false,
}: {
  site: ProductionSite;
  index: number;
  featured?: boolean;
}) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className={windowClassName(featured, false)}
    >
      <WindowChrome site={site} index={index} featured={featured} showLiveBadge />
    </a>
  );
}

function AnimatedLiveWindow({
  site,
  index,
  featured = false,
  progress,
  dimmed = false,
  onHover,
  showLive,
}: {
  site: ProductionSite;
  index: number;
  featured?: boolean;
  progress: MotionValue<number>;
  dimmed?: boolean;
  onHover?: (index: number | null) => void;
  showLive: boolean;
}) {
  const spawnStart = 0.52 + index * 0.04;
  const spawnEnd = Math.min(0.82, spawnStart + 0.1);

  const opacity = useTransform(progress, [spawnStart, spawnEnd], [0, 1]);
  const y = useTransform(progress, [spawnStart, spawnEnd], [20, 0]);

  return (
    <motion.a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className={windowClassName(featured, dimmed)}
      style={{ opacity, y }}
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHover?.(null)}
    >
      <WindowChrome
        site={site}
        index={index}
        featured={featured}
        showLiveBadge={showLive}
      />
    </motion.a>
  );
}

function ProductionHeading({
  compact = false,
  subtitle,
}: {
  compact?: boolean;
  subtitle: string;
}) {
  return (
    <div
      className={
        compact
          ? "mx-auto max-w-6xl text-center"
          : "mx-auto max-w-2xl text-center"
      }
    >
      <p
        className={
          compact
            ? "mb-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary sm:text-sm"
            : "mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary sm:text-sm"
        }
      >
        From prompt → production
      </p>
      <h2
        className={
          compact
            ? "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            : "mb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
        }
      >
        Compile <span className="text-primary">Reality</span>
      </h2>
      {compact ? null : (
        <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-primary sm:w-20" />
      )}
      <p
        className={
          compact
            ? "mx-auto mt-1.5 max-w-xl text-xs text-muted-foreground sm:text-sm"
            : "text-sm text-muted-foreground sm:text-base md:text-lg"
        }
      >
        {subtitle}
      </p>
    </div>
  );
}

function StaticDock() {
  const [featured, ...rest] = productionSites;

  return (
    <section
      id="production"
      className="relative overflow-hidden bg-background py-12 sm:py-16 md:py-20"
    >
      <DotPattern className="pointer-events-none absolute inset-0 z-0" />
      <div className="container relative z-10 mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <ProductionHeading subtitle="Live products shipped at WI Thinkers — open any window." />
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="h-40 md:col-span-2 lg:col-span-6 sm:h-44">
            <StaticLiveWindow site={featured} index={0} featured />
          </div>
          {rest.map((site, i) => (
            <div
              key={site.url}
              className="h-36 md:col-span-1 lg:col-span-3 sm:h-40"
            >
              <StaticLiveWindow site={site} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GhostCursor({
  progress,
  x,
  y,
}: {
  progress: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0.12, 0.18, 0.48, 0.56], [0, 1, 1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20"
      style={{ x, y, opacity }}
    >
      <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
        <path
          d="M1 1L16.5 10.2L9.4 11.6L6.8 19.5L1 1Z"
          className="fill-foreground stroke-background"
          strokeWidth="1.2"
        />
      </svg>
    </motion.div>
  );
}

function IdePanel({
  progress,
  className = "",
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const codeRef = useRef<HTMLPreElement>(null);
  const deployRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const cursorX = useMotionValue(48);
  const cursorY = useMotionValue(36);
  const visibleLinesRef = useRef(-1);
  const deployCountRef = useRef(-1);

  useMotionValueEvent(progress, "change", (v) => {
    const codeT = Math.max(0, Math.min(1, (v - 0.15) / 0.25));
    const nextLines = Math.round(codeT * CODE_LINES.length);
    if (nextLines !== visibleLinesRef.current && codeRef.current) {
      visibleLinesRef.current = nextLines;
      const rows = codeRef.current.children;
      for (let i = 0; i < rows.length; i++) {
        (rows[i] as HTMLElement).style.opacity = i < nextLines ? "1" : "0.12";
      }
    }

    const deployT = Math.max(0, Math.min(1, (v - 0.4) / 0.15));
    const nextDeploy = Math.round(deployT * DEPLOY_LINES.length);
    if (nextDeploy !== deployCountRef.current && deployRef.current) {
      deployCountRef.current = nextDeploy;
      const rows = deployRef.current.children;
      for (let i = 0; i < rows.length; i++) {
        (rows[i] as HTMLElement).style.opacity =
          i < nextDeploy ? "1" : "0.15";
      }
    }

    if (!hoveringRef.current && v >= 0.15 && v <= 0.4) {
      const t = (v - 0.15) / 0.25;
      cursorX.set(48 + t * 62);
      cursorY.set(36 + t * 134);
    }
  });

  const ideOpacity = useTransform(
    progress,
    [0, 0.06, 0.58, 0.75],
    [0, 1, 1, 0.25]
  );
  const terminalOpen = useTransform(progress, [0.38, 0.5], [0, 1]);
  const terminalHeight = useTransform(terminalOpen, (h) => `${h * 6.25}rem`);

  return (
    <motion.div
      className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-[#F7F8FA] shadow-sm dark:border-border dark:bg-card sm:rounded-2xl ${className}`}
      style={{ opacity: ideOpacity }}
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
      onMouseMove={(e) => {
        if (!hoveringRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        cursorX.set(Math.max(8, e.clientX - rect.left - 4));
        cursorY.set(Math.max(8, e.clientY - rect.top - 4));
      }}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-black/[0.06] bg-[#EEF1F5] px-3 py-2 dark:border-border dark:bg-muted/60">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/90" />
        </div>
        <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:bg-background dark:text-muted-foreground">
          ship.tsx
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <pre
          ref={codeRef}
          className="h-full overflow-hidden p-3 font-mono text-[11px] leading-5 sm:p-3.5 sm:text-xs sm:leading-5"
        >
          {CODE_LINES.map((line, i) => (
            <div key={i} style={{ opacity: 0.12 }}>
              <span className="mr-2 inline-block w-4 select-none text-right text-slate-400/70 dark:text-muted-foreground/40">
                {i + 1}
              </span>
              <span
                className={
                  line.startsWith("//")
                    ? "text-emerald-700/80 dark:text-emerald-400/70"
                    : line.includes("\"")
                      ? "text-sky-800 dark:text-sky-300/90"
                      : "text-slate-800 dark:text-foreground/85"
                }
              >
                {line || " "}
              </span>
            </div>
          ))}
        </pre>

        <GhostCursor progress={progress} x={cursorX} y={cursorY} />
      </div>

      <motion.div
        className="shrink-0 overflow-hidden border-t border-black/[0.06] bg-slate-900 dark:border-border dark:bg-black/60"
        style={{ height: terminalHeight, opacity: terminalOpen }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
            deploy terminal
          </span>
        </div>
        <div
          ref={deployRef}
          className="space-y-0.5 px-3 py-1.5 font-mono text-[11px]"
        >
          {DEPLOY_LINES.map((line) => (
            <div
              key={line.text}
              style={{ opacity: 0.15 }}
              className={
                line.tone === "ok"
                  ? "text-emerald-400"
                  : line.tone === "cmd"
                    ? "text-white/90"
                    : "text-white/45"
              }
            >
              {line.text}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
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

function CompileStage({ progress }: { progress: MotionValue<number> }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [showLive, setShowLive] = useState(false);
  const isMd = useIsMdUp();
  const [featured, ...rest] = productionSites;

  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const windowsOpacity = useTransform(progress, [0.48, 0.56], [0, 1]);
  const mobileIdeOpacity = useTransform(
    progress,
    [0, 0.06, 0.48, 0.58],
    [0, 1, 1, 0]
  );

  useMotionValueEvent(progress, "change", (v) => {
    const next = v >= 0.82;
    setShowLive((prev) => (prev === next ? prev : next));
  });

  return (
    <div className="relative flex h-[100svh] flex-col overflow-hidden bg-background">
      <DotPattern className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 shrink-0 px-3 pt-16 sm:px-4 sm:pt-20 md:px-6 lg:px-8">
        <ProductionHeading
          compact
          subtitle="Scroll to write, deploy, and materialize live products."
        />
        <div className="mx-auto mt-3 h-1 max-w-[10rem] overflow-hidden rounded-full bg-muted sm:mt-4 sm:max-w-xs">
          <motion.div
            className="h-full origin-left rounded-full bg-primary"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      {/* Desktop — single IdePanel, compact 5-card dock */}
      {isMd ? (
        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 gap-3 px-4 pb-4 pt-3 lg:gap-4 lg:px-8 lg:pb-5">
          <div className="w-[36%] min-h-0 shrink-0 lg:w-[38%]">
            <IdePanel progress={progress} />
          </div>

          <motion.div
            className="grid min-h-0 min-w-0 flex-1 grid-cols-2 grid-rows-3 gap-3 lg:gap-3.5"
            style={{ opacity: windowsOpacity }}
          >
            <div className="col-span-2 row-span-1 min-h-0">
              <AnimatedLiveWindow
                site={featured}
                index={0}
                featured
                progress={progress}
                dimmed={hovered !== null && hovered !== 0}
                onHover={setHovered}
                showLive={showLive}
              />
            </div>
            {rest.map((site, i) => (
              <div key={site.url} className="min-h-0">
                <AnimatedLiveWindow
                  site={site}
                  index={i + 1}
                  progress={progress}
                  dimmed={hovered !== null && hovered !== i + 1}
                  onHover={setHovered}
                  showLive={showLive}
                />
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        /* Mobile — IDE then compact windows; no double IdePanel */
        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pb-4 pt-2">
          <motion.div
            className="mb-2 h-[32%] min-h-0 shrink-0"
            style={{ opacity: mobileIdeOpacity }}
          >
            <IdePanel progress={progress} />
          </motion.div>

          <motion.div
            className="grid min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-2.5"
            style={{ opacity: windowsOpacity }}
          >
            <div className="col-span-2 min-h-0">
              <AnimatedLiveWindow
                site={featured}
                index={0}
                featured
                progress={progress}
                dimmed={hovered !== null && hovered !== 0}
                onHover={setHovered}
                showLive={showLive}
              />
            </div>
            {rest.map((site, i) => (
              <div key={site.url} className="min-h-0">
                <AnimatedLiveWindow
                  site={site}
                  index={i + 1}
                  progress={progress}
                  dimmed={hovered !== null && hovered !== i + 1}
                  onHover={setHovered}
                  showLive={showLive}
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function ProductionWorkSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (prefersReducedMotion) {
    return (
      <>
        <StaticDock />
        <SectionSeparator />
      </>
    );
  }

  return (
    <>
      <section id="production" className="relative bg-background">
        <div
          ref={containerRef}
          className="relative"
          style={{ height: "280vh" }}
        >
          <div className="sticky top-0 h-[100svh]">
            <CompileStage progress={scrollYProgress} />
          </div>
        </div>
      </section>
      <SectionSeparator />
    </>
  );
}
