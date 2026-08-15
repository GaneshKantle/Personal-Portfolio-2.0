import React from "react";
import { DotPattern } from "./DotPattern";
import { cn } from "@/lib/utils";

/** Soft global dots behind the page; each section also mounts its own DotPattern. */
export function BackgroundPattern() {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        "opacity-50"
      )}
      aria-hidden="true"
    >
      <DotPattern className="opacity-100" />
    </div>
  );
}
