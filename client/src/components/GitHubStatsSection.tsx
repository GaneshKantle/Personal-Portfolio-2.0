import React, { useEffect, useMemo, useState } from "react";

function parseHsl(cssValue: string): { h: number; s: number; l: number } | null {
  // Expected format: "<h> <s>% <l>%", e.g. "214 90% 52%"
  const parts = cssValue.trim().split(/\s+/);
  if (parts.length < 3) return null;

  const h = Number(parts[0].replace("deg", ""));
  const s = Number(parts[1].replace("%", ""));
  const l = Number(parts[2].replace("%", ""));

  if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(l)) return null;
  return { h, s, l };
}

function hslToHex(hIn: number, sIn: number, lIn: number): string {
  // h in degrees, s/l in percentages
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

export default function GitHubStatsSection() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

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

  const urls = useMemo(() => {
    const bgHex = cssVarHex("--background") ?? "#ffffff";
    const borderHex = cssVarHex("--border") ?? "#e5e7eb";
    const ringHex = cssVarHex("--ring") ?? "#3b82f6";
    const accentHex = cssVarHex("--accent") ?? "#dc2626";
    const mutedHex = cssVarHex("--muted-foreground") ?? "#6b7280";
    const fgHex = cssVarHex("--foreground") ?? "#000000";

    const bg = bgHex.replace("#", "");
    const border = borderHex.replace("#", "");
    const ring = ringHex.replace("#", "");
    const accent = accentHex.replace("#", "");
    const muted = mutedHex.replace("#", "");
    const fg = fgHex.replace("#", "");

    // 1) Contribution heatmap
    const ghUrl = `https://ghchart.rshah.org/${ring}/${"ganeshkantle"}`;

    // 2) Streak stats card
    const streak = new URL("https://streak-stats.demolab.com/");
    streak.searchParams.set("user", "ganeshkantle");
    // Force light theme so this card matches the rest of the page.
    streak.searchParams.set("theme", "default");
    streak.searchParams.set("type", "svg");

    // Color overrides (hex without #)
    streak.searchParams.set("background", bg);
    streak.searchParams.set("border", border);
    streak.searchParams.set("stroke", border);
    streak.searchParams.set("ring", ring);
    streak.searchParams.set("fire", accent);
    streak.searchParams.set("currStreakNum", ring);
    streak.searchParams.set("sideNums", fg);
    streak.searchParams.set("currStreakLabel", muted);
    streak.searchParams.set("sideLabels", muted);
    streak.searchParams.set("dates", muted);

    return { ghUrl, streakUrl: streak.toString() };
  }, [mode]);

  return (
    //Github Section
    <section id="github-stats" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4">
            GitHub <span className="text-blue-600">Activity</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10 items-center">
          <img
            src={urls.ghUrl}
            alt="GitHub contributions heatmap"
            className="w-full max-w-[663px] h-auto"
            loading="lazy"
          />

          <img
            src={urls.streakUrl}
            alt="GitHub streak stats"
            className="w-full max-w-[495px] h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

