"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, type PointerEvent } from "react";
import { SectionHeading } from "@/components/section-heading";

const principles = [
  { title: "Sky, not flat blue", body: "Publitas blue and navy become a bright, open sky." },
  { title: "A touch of rainbow", body: "Prism light at the edges brings in the secondary colours." },
  { title: "The product stays the hero", body: "Real UI sits in clean white cards on top." },
];

// Palette sampled from the deck's visual direction slide.
const palette = [
  { name: "Navy", hex: "#043460" },
  { name: "Publitas blue", hex: "#19B0ED" },
  { name: "Yellow", hex: "#F2BF1F" },
  { name: "Orange", hex: "#F0913A" },
  { name: "Pink", hex: "#E8507E" },
  { name: "Green", hex: "#3F9D72" },
];

export function Direction() {
  // The prism follows the cursor: a hands-on way to show "add light" rather than describe it.
  const x = useMotionValue(70);
  const y = useMotionValue(30);
  const sx = useSpring(x, { stiffness: 80, damping: 18 });
  const sy = useSpring(y, { stiffness: 80, damping: 18 });
  const left = useTransform(sx, (n) => `${n}%`);
  const top = useTransform(sy, (n) => `${n}%`);
  const [copied, setCopied] = useState<string | null>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  };

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
    } catch {
      setCopied(null);
    }
    window.setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1600);
  };

  return (
    <section aria-labelledby="direction-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          onPointerMove={move}
          className="relative isolate overflow-hidden rounded-[36px] bg-[linear-gradient(170deg,#ffffff_0%,#e3f4fd_40%,#9fdcf7_100%)] p-8 sm:p-14"
        >
          <motion.div
            aria-hidden
            style={{ left, top }}
            className="prism pointer-events-none absolute -z-10 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
          />
          <div aria-hidden className="sky-tiles absolute inset-0 -z-20" />

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading id="direction-title" eyebrow="Visual direction" title="A brighter Publitas">
                Keep the brand. Add light.
              </SectionHeading>
              <div className="mt-10">
                <p className="text-sm font-bold text-navy">Click a colour to copy it.</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {palette.map((c) => (
                    <li key={c.hex}>
                      <button
                        type="button"
                        onClick={() => copy(c.hex)}
                        className="glass group flex cursor-pointer items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5"
                      >
                        <span aria-hidden className="size-8 rounded-full ring-2 ring-white" style={{ background: c.hex }} />
                        <span>
                          {c.name}
                          <span className="ml-2 font-semibold text-slate">{copied === c.hex ? "Copied" : c.hex}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="sr-only" aria-live="polite">
                  {copied ? `${copied} copied to clipboard` : ""}
                </p>
              </div>
            </div>

            <ul className="flex flex-col justify-center gap-4">
              {principles.map((p, i) => (
                <li key={p.title} className="glass rounded-3xl p-6 shadow-lg shadow-blue/10">
                  <p className="text-sm font-bold text-blue">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-display font-semibold text-navy">{p.title}</h3>
                  <p className="mt-1 font-normal text-slate">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
