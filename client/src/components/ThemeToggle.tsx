import React from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "../lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = resolvedTheme === "dark";
  const nextLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
  const tooltipLabel = isDark ? "Light mode" : "Dark mode";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const button = (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={nextLabel}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-border",
        "bg-background text-muted-foreground shadow-sm",
        "transition-colors duration-300",
        "hover:bg-muted hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolvedTheme}
          className="absolute inset-0 flex items-center justify-center"
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, rotate: -90, scale: 0.6 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, rotate: 0, scale: 1 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, rotate: 90, scale: 0.6 }
          }
          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
        >
          {isDark ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="bottom" className="hidden lg:flex">
          {tooltipLabel}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
