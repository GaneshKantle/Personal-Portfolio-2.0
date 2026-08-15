import React, { useId } from "react";
import { cn } from "@/lib/utils";

/** Dot field for section backgrounds. */
export function DotPattern({ className }: { className?: string }) {
  const reactId = useId();
  const patternId = `dot-pattern-${reactId.replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 text-foreground",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full opacity-40 dark:opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1"
              cy="1"
              r="1.5"
              fill="currentColor"
              fillOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
