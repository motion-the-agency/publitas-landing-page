"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Smooth scrolling makes the scroll-scrubbed launch read as one continuous shot.
// Reduced-motion visitors keep native scrolling.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.09, anchors: { offset: 32 } }}>
      {children}
    </ReactLenis>
  );
}
