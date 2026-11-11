import { useEffect, useRef, useState } from "react";
import { useAnimation } from "framer-motion";

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      {
        threshold: 0.1,
      }
    );

    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [controls]);

  return { ref, inView, controls };
}
