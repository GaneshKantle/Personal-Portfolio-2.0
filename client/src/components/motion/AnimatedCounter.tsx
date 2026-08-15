import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
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
};

export function AnimatedCounter({
  value,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount: 0.35 });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      motionValue.set(value);
      if (ref.current) {
        const formatted =
          decimals > 0
            ? value.toFixed(decimals)
            : Math.round(value).toLocaleString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (!ref.current) return;
        const formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toLocaleString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, decimals, prefix, suffix, motionValue, prefersReducedMotion]);

  const fallback =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums inline-block", className)}
      aria-label={`${prefix}${fallback}${suffix}`}
    >
      {`${prefix}0${suffix}`}
    </motion.span>
  );
}
