import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "../../lib/utils";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
  delay?: number;
};

function formatValue(n: number, decimals: number) {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString();
}

/** Counts from 0 → value once when the element enters the viewport. */
export function AnimatedCounter({
  value,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  once = true,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount: 0.25, margin: "0px 0px -8% 0px" });
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion ? formatValue(value, decimals) : formatValue(0, decimals)
  );

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setDisplay(formatValue(value, decimals));
      return;
    }

    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(formatValue(latest, decimals));
      },
      onComplete: () => {
        setDisplay(formatValue(value, decimals));
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, decimals, delay, prefersReducedMotion]);

  const label = `${prefix}${formatValue(value, decimals)}${suffix}`;

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
      aria-label={label}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
