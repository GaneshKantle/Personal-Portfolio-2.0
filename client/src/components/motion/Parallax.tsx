import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "../../lib/utils";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

/** Subtle vertical parallax tied to scroll position within the parent section. */
export function Parallax({
  children,
  className,
  offset = 80,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function TiltOnScroll({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -4]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [16, 0, -12]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        rotateX,
        y,
        transformPerspective: 900,
        transformOrigin: "center center",
      }}
    >
      {children}
    </motion.div>
  );
}
