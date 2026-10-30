"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { phases } from "@/content/proposal";

const dot = { teaser: "bg-teaser", pilot: "bg-pilot", launch: "bg-launch" } as const;
const top = { teaser: "before:bg-teaser", pilot: "before:bg-pilot", launch: "before:bg-launch" } as const;
const month = { teaser: "Nov 2026", pilot: "Dec 2026", launch: "Q1 2027" } as const;

export function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  // The track fills as the roadmap passes through the viewport, so time reads left to right.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="roadmap" className="sky-vivid relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="prism-cool pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Launch roadmap" title="From November to launch" tone="vivid">
          Publitas confirms the dates. Product signs off every feature.
        </SectionHeading>

        <div ref={ref} className="mt-16">
          <div aria-hidden className="relative mb-10 hidden h-12 lg:block">
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/60" />
            <motion.div
              style={{ scaleX: fill }}
              className="phase-rule absolute inset-x-0 top-1/2 h-1.5 origin-left -translate-y-1/2 rounded-full"
            />
            {phases.map((p, i) => (
              <div
                key={p.key}
                className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${(i + 0.5) * (100 / 3)}%` }}
              >
                <span className={`size-6 rounded-full border-4 border-white shadow-lg ${dot[p.key]}`} />
                <span className="absolute top-8 whitespace-nowrap text-xs font-display font-semibold text-navy">{month[p.key]}</span>
              </div>
            ))}
          </div>

          <ol className="grid gap-5 pt-4 lg:grid-cols-3">
            {phases.map((p, i) => (
              <li key={p.key}>
                <Reveal delay={i * 0.1} className="h-full">
                  <article
                    className={`relative h-full overflow-hidden rounded-[28px] bg-white p-8 shadow-xl shadow-sky/25 before:absolute before:inset-x-0 before:top-0 before:h-1.5 ${top[p.key]}`}
                  >
                    <p className="text-sm font-bold text-blue">{p.when}</p>
                    <h3 className="mt-2 text-3xl font-display font-semibold text-navy">
                      {p.number}
                      <span className="block text-xl font-display font-semibold text-slate">{p.name}</span>
                    </h3>
                    <p className="mt-4 font-bold text-navy">{p.milestone}</p>
                    <div className="mt-6 rounded-2xl bg-ice p-5">
                      <p className="text-sm font-display font-semibold text-navy">What we make</p>
                      <ul className="mt-3 space-y-2 text-[15px] font-normal text-ink">
                        {p.deliverables.map((d) => (
                          <li key={d} className="flex gap-3">
                            <span aria-hidden className={`mt-2 size-1.5 shrink-0 rounded-full ${dot[p.key]}`} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
