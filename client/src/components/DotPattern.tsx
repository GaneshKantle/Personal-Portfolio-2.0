import React from "react"
import { cn } from "@/lib/utils"

export function DotPattern({ className }: { className?: string }) {
  const patternId = `dot-pattern-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        className
      )}
    >
      <svg
        className="h-full w-full dark:opacity-30"
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
              fill="#000000"
              fillOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

