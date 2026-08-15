import { useEffect, useRef } from "react";

const SECTIONS = [
  { id: "home", path: "/" },
  { id: "about", path: "/about" },
  { id: "skills", path: "/skills" },
  { id: "experience", path: "/experience" },
  { id: "production", path: "/production" },
  { id: "education", path: "/education" },
  { id: "projects", path: "/projects" },
  { id: "activities", path: "/activities" },
  { id: "certificates", path: "/certificates" },
  { id: "contact", path: "/contact" },
] as const;

/**
 * Sync URL to the most-visible section via IntersectionObserver.
 * Uses replaceState so Home does not re-render on every section change.
 */
export const useScrollRouting = () => {
  const activePathRef = useRef(window.location.pathname);

  useEffect(() => {
    const elements = SECTIONS.map(({ id, path }) => {
      const el = document.getElementById(id);
      return el ? { el, path, id } : null;
    }).filter(Boolean) as { el: HTMLElement; path: string; id: string }[];

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = "home";
        let bestRatio = 0;
        for (const { id } of elements) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }

        const match = SECTIONS.find((s) => s.id === bestId);
        if (!match || match.path === activePathRef.current) return;

        activePathRef.current = match.path;
        window.history.replaceState(null, "", match.path);
      },
      {
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    for (const { el } of elements) {
      observer.observe(el);
    }

    // Deep-link: scroll to section when landing on a path other than /
    const currentPath = window.location.pathname;
    if (currentPath !== "/") {
      const target = SECTIONS.find((s) => s.path === currentPath);
      if (target) {
        const el = document.getElementById(target.id);
        if (el) {
          // Defer so layout is ready; smooth only for intentional nav
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
      }
    }

    return () => observer.disconnect();
  }, []);
};
