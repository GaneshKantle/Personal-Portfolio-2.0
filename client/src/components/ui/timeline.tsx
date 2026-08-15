"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-6 lg:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative mx-auto max-w-7xl pb-16 sm:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-8 md:gap-10 md:pt-24 lg:pt-32"
          >
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row md:top-40 lg:max-w-sm">
              <div className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-background md:left-3">
                <div className="h-4 w-4 rounded-full border border-border bg-muted p-2" />
              </div>
              <h3 className="hidden text-xl font-bold text-muted-foreground md:block md:pl-20 md:text-5xl lg:text-6xl 3xl:text-7xl">
                {item.title}
              </h3>
            </div>

            <div className="relative z-10 w-full pl-14 pr-2 sm:pl-16 sm:pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-xl font-bold text-muted-foreground sm:text-2xl md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute left-7 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-blue-500 via-primary to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
