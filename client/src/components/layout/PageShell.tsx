import React from "react";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  /** Skip max-width / gutter when a section needs full-bleed inner content */
  bleed?: boolean;
};

/** Shared content width + fluid gutters. Section order/placement stays with the parent. */
export function PageShell({ children, className, bleed = false }: PageShellProps) {
  if (bleed) {
    return <div className={cn("w-full", className)}>{children}</div>;
  }

  return <div className={cn("page-shell", className)}>{children}</div>;
}
