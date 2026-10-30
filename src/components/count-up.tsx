"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Figures count up once when they enter, so the eye lands on the numbers that matter.
export function CountUp({ to, prefix = "", duration = 1.6 }: { to: number; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} aria-label={`${prefix}${to.toLocaleString("en-US")}`}>
      <span aria-hidden>
        {prefix}
        {value.toLocaleString("en-US")}
      </span>
    </span>
  );
}
