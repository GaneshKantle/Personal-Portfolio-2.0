import React from "react"
import { DotPattern } from "./DotPattern"
import { cn } from "@/lib/utils"

export function BackgroundPattern() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 overflow-hidden",
        "pointer-events-none",
        "w-full h-full"
      )}
      style={{
        maskImage: "radial-gradient(ellipse 300px circle at center, white, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 300px circle at center, white, transparent)"
      }}
    >
      <DotPattern />
    </div>
  )
}

