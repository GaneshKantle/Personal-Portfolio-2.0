import { motion } from "framer-motion";
import { easeOutExpo } from "../../lib/motion";

export function SweepLine({
  className,
  reduced,
  duration,
  travel,
}: {
  className: string;
  reduced: boolean | null;
  duration: number;
  travel: [string, string, string];
}) {
  return (
    <motion.span
      className={className}
      animate={reduced ? undefined : { top: travel }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

function CornerMarks() {
  const mark = "pointer-events-none absolute h-2 w-2 border-foreground/40";
  return (
    <>
      <span className={`${mark} left-1.5 top-1.5 border-l border-t`} aria-hidden="true" />
      <span className={`${mark} right-1.5 top-1.5 border-r border-t`} aria-hidden="true" />
      <span className={`${mark} bottom-1.5 left-1.5 border-b border-l`} aria-hidden="true" />
      <span className={`${mark} bottom-1.5 right-1.5 border-b border-r`} aria-hidden="true" />
    </>
  );
}

export function PortraitDock({
  reduced,
  onOpen,
}: {
  reduced: boolean | null;
  onOpen: () => void;
}) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.1rem,env(safe-area-inset-bottom))]"
      initial={reduced ? false : { y: 36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 18, opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        className="pointer-events-auto group relative flex w-full max-w-[18.5rem] items-stretch overflow-hidden border border-foreground/15 bg-card shadow-[0_18px_50px_-28px_rgba(0,0,0,0.55)]"
        whileHover={reduced ? undefined : { y: -4 }}
        whileTap={reduced ? undefined : { scale: 0.985 }}
        aria-label="Show photo"
      >
        <CornerMarks />
        <span className="relative flex w-14 shrink-0 flex-col justify-between border-r border-dashed border-border bg-muted py-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="mx-auto block h-1.5 w-2.5 rounded-[1px] bg-background/90"
              aria-hidden="true"
            />
          ))}
          <span
            className="absolute inset-2 border border-border/70 bg-background/40"
            aria-hidden="true"
          />
          <SweepLine
            className="absolute inset-x-2 h-px bg-foreground/40"
            reduced={reduced}
            duration={2.6}
            travel={["18%", "82%", "18%"]}
          />
        </span>
        <span className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-3 text-left">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            Portrait · sealed
          </span>
          <span className="mt-1 text-sm font-semibold tracking-tight text-foreground">
            Wanna see how I look?
          </span>
        </span>
        <span className="flex shrink-0 items-center border-l border-border bg-foreground px-3.5 text-background transition-opacity group-hover:opacity-90">
          <span className="flex flex-col items-center gap-1">
            <i className="fas fa-arrow-up-right text-[10px]" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em]">Open</span>
          </span>
        </span>
      </motion.button>
    </motion.div>
  );
}
