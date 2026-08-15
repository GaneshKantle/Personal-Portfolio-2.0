import React from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-primary"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
